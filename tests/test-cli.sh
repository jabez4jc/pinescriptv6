#!/usr/bin/env bash
# Smoke test for bin/cli.mjs: install/uninstall against a throwaway HOME, plus
# an MCP handshake. Run: ./tests/test-cli.sh
set -euo pipefail
cd "$(dirname "$0")/.."

T=$(mktemp -d)
trap 'rm -rf "$T"' EXIT
mkdir -p "$T/.codex"
printf '# my rules\nkeep me\n' > "$T/.codex/AGENTS.md"
mkdir -p "$T/.claude" && printf '# mine\n' > "$T/.claude/CLAUDE.md"

HOME=$T node bin/cli.mjs install > /dev/null
[ -f "$T/.claude/skills/pinescript-v6/SKILL.md" ] || { echo "FAIL: skill not installed"; exit 1; }
grep -q "$T/.pinescript-v6" "$T/.claude/skills/pinescript-v6/SKILL.md" || { echo "FAIL: skill not pointed at installed docs"; exit 1; }
grep -q "$T/.pinescript-v6" "$T/.claude/agents/pinescript-developer.md" || { echo "FAIL: agent not pointed at installed docs"; exit 1; }
[ ! -e "$T/.claude/agents/pinescript-developer" ] || { echo "FAIL: stale agent bundle dir"; exit 1; }
[ -f "$T/.pinescript-v6/reference/ta.md" ] || { echo "FAIL: reference docs not installed"; exit 1; }
[ -f "$T/.pinescript-v6/MANIFEST.md" ] || { echo "FAIL: shared docs not installed"; exit 1; }
grep -q "keep me" "$T/.codex/AGENTS.md" || { echo "FAIL: clobbered user AGENTS.md"; exit 1; }
grep -q "BEGIN pinescript-v6" "$T/.claude/CLAUDE.md" || { echo "FAIL: CLAUDE.md pointer not installed"; exit 1; }
grep -q "# mine" "$T/.claude/CLAUDE.md" || { echo "FAIL: clobbered user CLAUDE.md"; exit 1; }

# Re-installing must not duplicate the managed block.
HOME=$T node bin/cli.mjs install > /dev/null
[ "$(grep -c 'BEGIN pinescript-v6' "$T/.codex/AGENTS.md")" = 1 ] || { echo "FAIL: not idempotent"; exit 1; }

HOME=$T node bin/cli.mjs uninstall > /dev/null
grep -q "pinescript-v6" "$T/.claude/CLAUDE.md" && { echo "FAIL: CLAUDE.md block not removed"; exit 1; }
grep -q "# mine" "$T/.claude/CLAUDE.md" || { echo "FAIL: CLAUDE.md user content lost"; exit 1; }
[ ! -e "$T/.pinescript-v6" ] || { echo "FAIL: docs not removed"; exit 1; }
grep -q "pinescript-v6" "$T/.codex/AGENTS.md" && { echo "FAIL: block not removed"; exit 1; }
grep -q "keep me" "$T/.codex/AGENTS.md" || { echo "FAIL: user content lost on uninstall"; exit 1; }

# MCP: tools/list must answer, and path traversal must be rejected.
OUT=$({ printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"t","version":"1"}}}' \
  '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \
  '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"pinescript_doc","arguments":{"file":"../../../etc/passwd"}}}'; sleep 3; } | node bin/cli.mjs mcp)
grep -q pinescript_search <<< "$OUT" || { echo "FAIL: mcp tools/list"; exit 1; }
grep -q "outside docs root" <<< "$OUT" || { echo "FAIL: path traversal not blocked"; exit 1; }

node tests/check-docs.mjs

echo "PASS"
