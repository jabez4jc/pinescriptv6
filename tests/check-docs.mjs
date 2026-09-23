// Offline docs check: every file named in LLM_MANIFEST.md exists, and every
// relative markdown link in the docs resolves. Run: node tests/check-docs.mjs
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["concepts", "language", "reference", "visuals", "writing_scripts", "faq", "errors", "migration_guides", "primer"];
const walk = (d) => readdirSync(path.join(ROOT, d), { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

const problems = [];
const manifest = readFileSync(path.join(ROOT, "LLM_MANIFEST.md"), "utf8");
for (const [, f] of manifest.matchAll(/^- `([^`]+\.md)`/gm))
  if (!existsSync(path.join(ROOT, f))) problems.push(`manifest lists missing file: ${f}`);

const files = ["release_notes.md", "LLM_MANIFEST.md", ...DIRS.flatMap(walk)].filter((f) => f.endsWith(".md"));
for (const f of files) {
  const text = readFileSync(path.join(ROOT, f), "utf8").replace(/```[\s\S]*?```/g, "");
  for (const [, href] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|#|mailto:)/.test(href)) continue;
    if (!existsSync(path.join(ROOT, path.dirname(f), href.split("#")[0]))) problems.push(`${f}: broken link ${href}`);
  }
}
if (files.length < 100) problems.push(`only ${files.length} doc files found; expected the full manual + reference`);

if (problems.length) { console.log(`FAIL: docs check\n${problems.slice(0, 20).join("\n")}`); process.exit(1); }
