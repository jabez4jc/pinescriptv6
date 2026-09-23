---
name: pinescript-v6
description: Use for ANY TradingView Pine Script question, including quick lookups like a function's arguments or signature, and for writing, reviewing, debugging, or explaining Pine Script v6 code (indicators, strategies, libraries). Triggers on Pine Script, //@version=6, ta.*, strategy.*, request.security, plot/line/box/label drawing, repainting, or TradingView publishing questions. Uses a chunked copy of the official v6 docs so answers come from verified docs instead of training-data recall, which is frequently stale v4/v5 syntax.
---

# Pine Script v6

This skill routes into a chunked copy of TradingView's Pine Script v6 User
Manual and Reference Manual. The docs are not stored in this directory:

<!-- BEGIN docs-root -->
**Docs root:** `${CLAUDE_PLUGIN_ROOT}` (filled in by Claude Code for plugin
installs). If you see that placeholder literally instead of a path, use
`~/.pinescript-v6/`.
<!-- END docs-root -->

Treat `LLM_MANIFEST.md` in the docs root as the index. Never answer a
nontrivial Pine Script question from memory alone — look the function or
concept up in the docs first. Training data over-represents Pine v4/v5; unverified recall reliably
produces deprecated syntax (`study()`, bare `security()`,
`strategy.risk.max_position_size` misuse, old `input()` forms, etc.).

All paths below are relative to the docs root.

## Protocol

1. **Identify intent** — what is the user building or debugging (indicator,
   strategy, library, visual, execution-order question, publishing question)?
2. **Route via the manifest** — open `LLM_MANIFEST.md` and follow its routing
   table to the specific file(s). Read only what's needed; some files are
   large and meant to be consulted in slices, not loaded whole.
3. **Retrieve before writing code.** Confirm the exact function signature,
   argument names, and return type in the reference file before using it.
   Each built-in is a `### name()` heading (variables: `### name`), so jump straight to it: `grep -n -A40 '^### ta.rsi()' <docs root>/reference/ta.md`.
4. **Enforce `//@version=6`** on every script produced or modified.
5. **No hallucinated syntax** — if a function isn't found in these files, it
   doesn't exist in v6 or has been renamed. Say so; don't invent it.

## File map

| Need | File(s) |
|---|---|
| Master index / routing table | `LLM_MANIFEST.md` |
| Does built-in X exist? | `reference/INDEX.md` (every v6 built-in name) |
| Signature of `ns.name` (e.g. `ta.rsi`, `strategy.entry`, `syminfo.mintick`) | `reference/<ns>.md` |
| Unnamespaced built-ins | `reference/plot.md` (plot*, fill, hline, bgcolor, barcolor), `reference/time.md`, `reference/bar_variables.md` (open/close/bar_index...), `reference/core.md` (indicator, library, alert, na, nz...), or the same-name file (`input()` → `reference/input.md`) |
| Constants (`color.red`, `shape.triangle`, `plot.style_line`, `strategy.long`) | `reference/constants.md` |
| Types, keywords, operators, annotations | `reference/types.md`, `reference/keywords.md`, `reference/operators.md`, `reference/annotations.md` |
| Execution model, `var`/`varip`, historical vs realtime | `language/execution_model.md`, `language/variable_declarations.md` |
| Type system, qualifiers (series/simple/const) | `language/type_system.md` |
| UDTs, methods, enums, arrays/matrices/maps | `language/objects.md`, `language/methods.md`, `language/enums.md`, `language/arrays.md`, `language/matrices.md`, `language/maps.md` |
| Multi-timeframe / other symbols (`request.*`), repainting | `concepts/other_timeframes_and_data.md`, `concepts/repainting.md` |
| Strategies / backtesting | `concepts/strategies.md` + `reference/strategy.md` |
| Alerts, inputs, sessions, time, strings, libraries, bar states | `concepts/<topic>.md` |
| Visuals (plots, colors, fills, lines/boxes, labels, tables, levels) | `visuals/*.md` (`visuals/overview.md` first) |
| Style, debugging, profiling, limits, publishing | `writing_scripts/*.md` |
| Publishing house rules checklist, BBCode | `writing_scripts/publishing_guidelines.md` |
| Error codes / messages | `errors/*.md`, `concepts/common_errors.md` |
| Task recipes | `faq/*.md` |
| Converting v5 (or older) scripts | `migration_guides/to_pine_version_6.md` |
| Recent features | `release_notes.md` (newest first) |

## Routing examples

- "Write an RSI indicator" → `reference/ta.md` (`ta.rsi`) + `reference/plot.md` (`plot`, `hline`).
- "MA crossover strategy" → `reference/ta.md` (`ta.crossover`) + `reference/strategy.md`
  (`strategy.entry`) + `concepts/strategies.md`.
- "Box around the high/low of the last 10 bars" → `reference/box.md` (`box.new`) +
  `reference/ta.md` (`ta.highest`/`ta.lowest`) + `visuals/lines_and_boxes.md`.
- "Why does my variable reset every bar?" → `language/execution_model.md` +
  `language/variable_declarations.md`.
- "Higher-timeframe value without repainting" → `concepts/other_timeframes_and_data.md` +
  `concepts/repainting.md` + `reference/request.md`.
- "Convert this v5 script" → `migration_guides/to_pine_version_6.md`.

## Output conventions

- Always start scripts with `//@version=6`.
- Prefer `ta.*` namespace functions over hand-rolled math.
- Match `writing_scripts/style_guide.md` formatting (indentation, line-wrapping
  for wrapped parenthesized expressions).
- When the user reports an error message, check `errors/` and
  `concepts/common_errors.md` before guessing a fix.
- When touching strategy code, verify order-placement syntax against
  `reference/strategy.md` — this is the area most likely to still
  contain v4/v5 habits (e.g., old `strategy.risk.*` calls).

## Keeping this skill current

The docs are a snapshot of TradingView's official v6 User Manual and
Reference Manual (see the `Source:` line at the top of each file). If
something looks missing, check `release_notes.md` and the live docs, and
prefer the newer, verified behavior.

**Note for maintainers:** the docs are generated by
`scripts/sync-official-docs.mjs` (`npm run sync-docs`); don't hand-edit them.
`npx pinescript-v6 install` rewrites the docs-root block above to the
installed location.
