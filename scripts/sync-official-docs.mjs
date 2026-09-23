#!/usr/bin/env node
// Regenerates every doc in this repo from TradingView's two official sources:
//   - the v6 User Manual  https://www.tradingview.com/pine-script-docs/
//   - the v6 Reference    https://www.tradingview.com/pine-script-reference/v6/
// Run: node scripts/sync-official-docs.mjs   (then ./scripts/sync-bundles.sh)
//
// Output is plain markdown shaped for LLM retrieval: one file per manual page,
// one reference file per built-in namespace, and a generated manifest/index. No dependencies; Node 18+ (global fetch).
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.tradingview.com";
const DOCS = `${SITE}/pine-script-docs`;
const REF = `${SITE}/pine-script-reference/v6/`;
const BUNDLES = "https://static.tradingview.com/static/bundles/";

// Hand-written files living inside generated directories; never deleted.
const KEEP = new Set(["writing_scripts/publishing_guidelines.md", "concepts/common_errors.md"]);
const SECTION_DIR = { writing: "writing_scripts", "migration-guides": "migration_guides" };
const GENERATED_DIRS = ["concepts", "language", "visuals", "writing_scripts", "faq", "errors", "migration_guides", "primer", "reference"];

// ---------------------------------------------------------------- fetching
async function get(url, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (pinescript-v6 docs sync)" } });
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return await r.text();
    } catch (e) {
      if (i >= tries) throw e;
      await new Promise((res) => setTimeout(res, 1000 * i));
    }
  }
}
async function pool(items, n, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (next < items.length) { const i = next++; out[i] = await fn(items[i], i); }
  }));
  return out;
}

// ---------------------------------------------------------------- page map
// Official URL path (e.g. "/pine-script-docs/language/loops") -> repo file.
function localFile(p) {
  const rel = p.replace(/^\/pine-script-docs\/?/, "").replace(/\/$/, "");
  if (rel === "release-notes") return "release_notes.md";
  if (rel === "welcome" || rel === "where-can-i-get-more-information") return `primer/${rel.replaceAll("-", "_")}.md`;
  const parts = rel.split("/");
  if (parts.length === 1) return null; // section index pages
  const [section, slug] = parts;
  return `${SECTION_DIR[section] || section}/${slug.replaceAll("-", "_")}.md`;
}

// Link rewriting shared by manual pages and reference text.
function rewriteHref(href, fromFile, pages) {
  if (href.startsWith("#")) return { href };
  const u = new URL(href, DOCS + "/");
  if (u.hostname.endsWith("tradingview.com") && u.pathname.startsWith("/pine-script-reference/")) return { ref: true };
  if (u.hostname.endsWith("tradingview.com") && u.pathname.startsWith("/pine-script-docs/")) {
    const target = pages.get(u.pathname.replace(/\/$/, ""));
    if (target === fromFile) return { href: u.hash || "#" };
    if (target) {
      const rel = path.posix.relative(path.posix.dirname(fromFile), target) || path.posix.basename(target);
      return { href: rel + u.hash };
    }
  }
  return { href: u.href };
}

// ---------------------------------------------------------------- HTML -> markdown
const VOID = new Set(["img", "br", "hr", "link", "meta", "input", "source", "wbr", "col", "area", "base", "embed", "track"]);
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", times: "×", rarr: "→" };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
  e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENT[e.toLowerCase()] ?? m);

function parse(html) {
  const root = { tag: "#root", attrs: {}, children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+|<)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[5] !== undefined) { stack.at(-1).children.push({ text: decode(m[5]) }); continue; }
    if (!m[2]) continue; // comment
    const tag = m[2].toLowerCase();
    if (m[1]) { // closing tag: pop to the matching element
      const i = stack.map((n) => n.tag).lastIndexOf(tag);
      if (i > 0) stack.length = i;
      continue;
    }
    const attrs = {};
    for (const a of m[3].matchAll(/([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? "");
    const node = { tag, attrs, children: [] };
    stack.at(-1).children.push(node);
    if (!VOID.has(tag) && !m[4]) stack.push(node);
    if (tag === "script" || tag === "style") { // raw text: skip to the close tag
      const end = html.indexOf(`</${tag}`, re.lastIndex);
      re.lastIndex = end < 0 ? html.length : end;
    }
  }
  return root;
}
const cls = (n) => ` ${n.attrs?.class || ""} `;
const hasCls = (n, c) => cls(n).includes(` ${c} `);
function find(n, pred) {
  if (pred(n)) return n;
  for (const c of n.children || []) { const r = find(c, pred); if (r) return r; }
  return null;
}
const rawText = (n) => n.text ?? (n.children || []).map(rawText).join("");

function toMarkdown(node, ctx) {
  const inline = (n) => {
    if (n.text !== undefined) return n.text.replace(/\s+/g, " ");
    const kids = () => n.children.map(inline).join("");
    switch (n.tag) {
      case "svg": case "img": case "script": case "style": case "link": return "";
      case "br": return "\n";
      case "code": { const t = rawText(n).replace(/\s+/g, " "); return t.includes("`") ? `\`\` ${t} \`\`` : `\`${t}\``; }
      case "strong": case "b": { const t = kids().trim(); return t ? `**${t}**` : ""; }
      case "em": case "i": { const t = kids().trim(); return t ? `*${t}*` : ""; }
      case "sup": return kids();
      case "span": return hasCls(n, "icon") ? "" : kids();
      case "a": {
        const t = kids().trim();
        if (!t) return "";
        const r = rewriteHref(n.attrs.href || "", ctx.file, ctx.pages);
        if (r.ref) return t.startsWith("`") ? t : `\`${t}\``;
        return `[${t}](${r.href})`;
      }
      default: return kids();
    }
  };
  const inl = (n) => inline(n).replace(/[ \t]+\n/g, "\n").replace(/ {2,}/g, " ").trim();

  const blocks = (n, indent = "") => {
    const out = [];
    let buf = [];
    const flush = () => { const t = buf.map(inline).join("").replace(/\s+/g, " ").trim(); if (t) out.push(t); buf = []; };
    for (const c of n.children || []) {
      if (c.text !== undefined || isInline(c)) { buf.push(c); continue; }
      flush();
      const b = block(c, indent);
      if (b) out.push(b);
    }
    flush();
    return out.join("\n\n");
  };
  const isInline = (c) => ["a", "code", "strong", "b", "em", "i", "span", "sup", "br", "img", "svg"].includes(c.tag) && !hasCls(c, "tv-informer-header");
  const fence = (lang, body) => "```" + lang + "\n" + body.replace(/\n+$/, "") + "\n```";

  const block = (n, indent) => {
    if (hasCls(n, "pagination-buttons") || hasCls(n, "breadcrumbs") || ["script", "style", "svg", "link", "img", "nav"].includes(n.tag)) return "";
    if (hasCls(n, "pine-colorizer")) return fence("pine", rawText(n));
    if (hasCls(n, "expressive-code")) {
      const pre = find(n, (x) => x.tag === "pre");
      if (!pre) return "";
      const lines = [];
      (function walk(x) { if (hasCls(x, "ec-line")) lines.push(rawText(x)); else (x.children || []).forEach(walk); })(pre);
      const lang = pre.attrs["data-language"] === "pine" ? "pine" : "";
      return fence(lang, lines.join("\n"));
    }
    if (hasCls(n, "tv-informer")) {
      const header = find(n, (x) => hasCls(x, "tv-informer-header"));
      const label = header ? rawText(header).trim() : n.attrs["aria-label"] || "Note";
      if (header) header.children = [];
      const body = blocks(find(n, (x) => hasCls(x, "tv-informer-content")) || n);
      return `> **${label}:** ` + body.split("\n").join("\n> ");
    }
    const h = /^h([1-6])$/.exec(n.tag);
    if (h) return "#".repeat(+h[1]) + " " + inl(n).replace(/\[([^\]]*)\]\(#[^)]*\)/g, "$1");
    switch (n.tag) {
      case "p": // invalid-but-real <p> wrapping blocks (callouts) must keep their structure
        return n.children.some((c) => c.tag && !isInline(c)) ? blocks(n, indent) : inl(n);
      case "pre": return fence("", rawText(n));
      case "hr": return "---";
      case "blockquote": return "> " + blocks(n).split("\n").join("\n> ");
      case "ul": case "ol": {
        let i = 0;
        return n.children.filter((c) => c.tag === "li").map((li) => {
          const marker = n.tag === "ol" ? `${++i}. ` : "- ";
          const pad = " ".repeat(marker.length);
          return marker + blocks(li).split("\n").map((l, k) => (k && l ? pad + l : l)).join("\n");
        }).join("\n");
      }
      case "table": {
        const rows = [];
        (function walk(x) { if (x.tag === "tr") rows.push(x.children.filter((c) => c.tag === "td" || c.tag === "th").map((c) => inl(c).replace(/\n/g, " ").replace(/\|/g, "\\|"))); else (x.children || []).forEach(walk); })(n);
        if (!rows.length) return "";
        const w = Math.max(...rows.map((r) => r.length));
        const line = (r) => "| " + Array.from({ length: w }, (_, k) => r[k] ?? "").join(" | ") + " |";
        return [line(rows[0]), "|" + " --- |".repeat(w), ...rows.slice(1).map(line)].join("\n");
      }
      default: return blocks(n, indent);
    }
  };
  return blocks(node).replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

// ---------------------------------------------------------------- user manual
async function syncManual(written) {
  const sitemap = await get(`${DOCS}/sitemap-0.xml`);
  const paths = [...sitemap.matchAll(/<loc>https:\/\/www\.tradingview\.com([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/\/$/, ""))
    .filter((p) => !/^\/pine-script-docs\/v\d\b/.test(p));
  const pages = new Map();
  for (const p of paths) { const f = localFile(p); if (f) pages.set(p, f); }
  const catalog = [];
  await pool([...pages], 6, async ([p, file]) => {
    const html = await get(SITE + p + "/");
    if (/<title>Redirect/.test(html)) { pages.delete(p); return; } // stub pages
    const tree = parse(html);
    const content = find(tree, (n) => n.attrs?.id === "slot-container") || find(tree, (n) => n.tag === "main");
    if (!content) throw new Error(`no content in ${p}`);
    let md = toMarkdown(content, { file, pages });
    md = md.replace(/^(# .*)\n/, `$1\n\nSource: ${SITE}${p}/\n`);
    await out(file, md, written);
    const title = (/^# (.*)$/m.exec(md) || [, file])[1];
    const intro = md.split("\n\n").find((b) => b && !/^(#|Source:|>|```|\||- )/.test(b)) || "";
    catalog.push({ file, title, desc: summarize(intro) });
  });
  return { pages, catalog };
}
function summarize(t) {
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\s+/g, " ").trim();
  const s = /^(.{40,220}?[.!?])(\s|$)/.exec(t);
  return s ? s[1] : t.slice(0, 200);
}

// ---------------------------------------------------------------- reference manual
// The reference page is an SPA: its data is a webpack chunk whose strings live
// in separate English i18n chunks. Discover both from the page, then evaluate.
async function loadReference() {
  const html = await get(REF);
  const scripts = [...html.matchAll(/src="(https:\/\/static\.tradingview\.com\/static\/bundles\/[^"]+\.js)"/g)].map((m) => m[1]);
  const code = await pool(scripts, 8, (u) => get(u));
  const runtime = code[scripts.findIndex((u) => /\/runtime\./.test(u))];
  let chunkIds, moduleId;
  for (const c of code) {
    const m = /PineLanguage\.V6:\w+=\(await Promise\.all\(\[([^\]]+)\]\)\.then\(\w+\.bind\(\w+,(\d+)\)\)\)/.exec(c);
    if (m) { chunkIds = [...m[1].matchAll(/\((\d+)\)/g)].map((x) => x[1]); moduleId = m[2]; break; }
  }
  if (!chunkIds) throw new Error("reference data chunk not found (TradingView bundle layout changed)");
  const chunkUrl = (id) => {
    const lang = new RegExp(`if\\(${id}===e\\)return"__LANG__\\."\\+e\\+"\\.([0-9a-f]+)\\.js"`).exec(runtime);
    if (lang) return `${BUNDLES}en.${id}.${lang[1]}.js`;
    const reg = new RegExp(`[{,]${id}:"([0-9a-f]+)"`).exec(runtime);
    if (reg) return `${BUNDLES}${id}.${reg[1]}.js`;
    throw new Error(`cannot resolve chunk ${id}`);
  };
  const extra = await pool(chunkIds, 6, (id) => get(chunkUrl(id)));
  const modules = {};
  const sandbox = { self: { webpackChunktradingview: { push: ([, mods]) => Object.assign(modules, mods) } } };
  vm.createContext(sandbox);
  for (const c of [...code.filter((_, i) => /\/en\./.test(scripts[i])), ...extra]) vm.runInContext(c, sandbox);
  const cache = {};
  const t = (_, o, s) => { let str = Array.isArray(s) ? s[0] : String(s); for (const [k, v] of Object.entries(o?.replace || {})) str = str.split(`{${k}}`).join(v); return str; };
  const req = (id) => {
    if (id in cache) return cache[id].exports;
    const mod = (cache[id] = { exports: {} });
    if (!modules[id]) { mod.exports = id == 383636 ? { t } : [`<<missing string ${id}>>`]; return mod.exports; }
    modules[id](mod, mod.exports, req);
    return mod.exports;
  };
  req.r = () => {};
  req.d = (target, defs) => { for (const k in defs) Object.defineProperty(target, k, { get: defs[k], enumerable: true }); };
  const data = req(moduleId).default;
  const missing = JSON.stringify(data).match(/<<missing string/g)?.length || 0;
  if (missing) console.warn(`warning: ${missing} reference strings unresolved`);
  return data;
}

// Unnamespaced built-ins are grouped by topic; everything else goes to <namespace>.md.
const PLOT = ["plot", "plotshape", "plotchar", "plotarrow", "plotbar", "plotcandle", "barcolor", "bgcolor", "fill", "hline"];
const TIME = ["time", "time_close", "time_tradingday", "timenow", "timestamp", "year", "month", "weekofyear", "dayofmonth", "dayofweek", "hour", "minute", "second"];
const BAR = ["open", "high", "low", "close", "volume", "hl2", "hlc3", "hlcc4", "ohlc4", "ask", "bid", "bar_index", "last_bar_index", "last_bar_time"];
const SAME_NAME_NS = ["input", "color", "strategy", "line", "label", "box", "table", "linefill"];
function fileFor(name) {
  if (PLOT.includes(name)) return "plot";
  if (TIME.includes(name)) return "time";
  if (BAR.includes(name)) return "bar_variables";
  if (!name.includes(".")) return SAME_NAME_NS.includes(name) ? name : "core";
  const ns = name.split(".")[0];
  return ns;
}
const TOPIC_TITLE = {
  plot: "Plotting functions (plot, plotshape, plotchar, fill, hline, bgcolor, barcolor, ...)",
  time: "Time and date built-ins (time, timestamp, year, month, dayofweek, ...)",
  bar_variables: "Bar data variables (open, high, low, close, volume, bar_index, ...)",
  core: "Core built-ins (indicator, library, alert, alertcondition, na, nz, fixnan, casts, ...)",
};

function refText(s, file, pages) {
  return String(s)
    .replace(/\[([^\]]+)\]\(#(?:fun|var|const|type|kw|op|an)_[^)]*\)/g, (_, t) => (t.includes("`") ? t : `\`${t}\``))
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, h) => {
      const r = rewriteHref(h, file, pages);
      return r.ref ? (t.includes("`") ? t : `\`${t}\``) : `[${t}](${r.href})`;
    });
}
const uniq = (a) => [...new Set(a.filter(Boolean))];

function renderEntry(items, level, file, pages) {
  const T = (s) => refText(s, file, pages);
  const e = items[0];
  const isFn = !!e.syntax && Array.isArray(e.args);
  const title = isFn && !/[^\w.]/.test(e.name) ? `${e.name}()` : e.name;
  const L = [`${"#".repeat(level)} ${title}`, ""];
  for (const d of uniq(items.flatMap((i) => i.desc || []))) L.push(T(d), "");
  const syntax = uniq(items.flatMap((i) => i.syntax || []));
  if (syntax.length) L.push("```pine", ...syntax, "```", "");
  if (e.type) L.push(`Type: \`${e.type}\``, "");
  if (isFn) {
    const args = new Map();
    for (const i of items) for (const a of i.args || []) {
      const cur = args.get(a.name) || { types: [], desc: "", required: false };
      cur.types.push(a.displayType); cur.required ||= a.required;
      if ((a.desc || "").length > cur.desc.length) cur.desc = a.desc;
      args.set(a.name, cur);
    }
    if (args.size) {
      L.push("**Arguments**", "");
      for (const [n, a] of args) L.push(`- \`${n}\` (${uniq(a.types).join(" | ")}${a.required ? "" : ", optional"}): ${T(a.desc).replace(/\n+/g, " ")}`);
      L.push("");
    }
  }
  if (e.fields?.length) {
    L.push("**Fields**", "");
    for (const f of e.fields) L.push(`- \`${f.name}\` (${f.type}): ${T(f.desc || "")}`);
    L.push("");
  }
  for (const dd of items.flatMap((i) => i.detailedDesc || [])) {
    for (const d of dd.desc || []) L.push(T(d), "");
    for (const x of dd.examples || []) L.push("```pine", x.replace(/\n+$/, ""), "```", "");
  }
  const returns = uniq(items.flatMap((i) => i.returns || []));
  if (returns.length) L.push(`**Returns:** ${returns.map(T).join(" ")}`, "");
  const remarks = uniq(items.flatMap((i) => i.remarks || []));
  if (remarks.length) L.push("**Remarks**", "", ...remarks.flatMap((r) => [T(r), ""]));
  const ex = uniq(items.flatMap((i) => i.examples || []));
  for (const x of ex) L.push("```pine", x.replace(/\n+$/, ""), "```", "");
  const see = uniq(items.flatMap((i) => i.seeAlso || [])).map(T);
  if (see.length) L.push(`**See also:** ${see.join(", ")}`, "");
  return L.join("\n");
}
function groupByName(list) {
  const m = new Map();
  for (const x of list) { if (!m.has(x.name)) m.set(x.name, []); m.get(x.name).push(x); }
  return [...m.values()];
}

async function syncReference(data, pages, written) {
  const files = new Map(); // key -> { vars: [], fns: [] }
  const bucket = (k) => files.get(k) || files.set(k, { vars: [], fns: [] }).get(k);
  for (const g of groupByName(data.variables)) bucket(fileFor(g[0].name)).vars.push(g);
  for (const g of groupByName(data.functions)) bucket(fileFor(g[0].name)).fns.push(g);
  const byName = (a, b) => a[0].name.localeCompare(b[0].name);
  const index = [];
  const catalog = [];
  for (const [key, { vars, fns }] of [...files].sort()) {
    const file = `reference/${key}.md`;
    const title = TOPIC_TITLE[key] || `\`${key}.*\` namespace`;
    const parts = [`# ${title}`, "", `Source: ${REF}`, ""];
    if (vars.length) parts.push("## Variables", "", ...vars.sort(byName).map((g) => renderEntry(g, 3, file, pages)));
    if (fns.length) parts.push("## Functions", "", ...fns.sort(byName).map((g) => renderEntry(g, 3, file, pages)));
    await out(file, parts.join("\n").replace(/\n{3,}/g, "\n\n"), written);
    const names = [...vars.map((g) => g[0].name), ...fns.map((g) => g[0].name + "()")];
    index.push([file, names]);
    catalog.push({ file, title: title.replace(/`/g, ""), desc: `${[[fns.length, "function"], [vars.length, "variable"]].filter(([n]) => n).map(([n, w]) => `${n} ${w}${n > 1 ? "s" : ""}`).join(", ")}, e.g. ${names.slice(0, 6).join(", ")}` });
  }
  const single = [
    ["constants", "Built-in constants (color.*, shape.*, plot.style_*, strategy.*, currency.*, ...)", data.constants, true],
    ["types", "Types and type qualifiers (int, float, series, simple, array, map, chart.point, footprint, ...)", data.types],
    ["keywords", "Keywords (if, switch, once, for, while, var, varip, type, enum, method, import, export, ...)", data.keywords],
    ["operators", "Operators (arithmetic, comparison, logical, ternary ?:, history [], assignment :=)", data.operators],
    ["annotations", "Compiler annotations (//@version, //@function, //@param, //@type, //@field, ...)", data.annotations],
  ];
  for (const [key, title, list, compact] of single) {
    const file = `reference/${key}.md`;
    const groups = groupByName(list);
    let body;
    if (compact) { // constants: one line each, grouped by namespace
      const byNs = new Map();
      for (const g of groups.sort(byName)) { const ns = g[0].name.includes(".") ? g[0].name.split(".")[0] : "(global)"; if (!byNs.has(ns)) byNs.set(ns, []); byNs.get(ns).push(g[0]); }
      body = [...byNs].map(([ns, cs]) => `## ${ns}\n\n` + cs.map((c) => `- \`${c.name}\` (${c.type}): ${(c.desc || []).map((d) => refText(d, file, pages)).join(" ").replace(/\s+/g, " ")}`).join("\n")).join("\n\n");
    } else body = groups.map((g) => renderEntry(g, 2, file, pages)).join("\n");
    await out(file, `# ${title}\n\nSource: ${REF}\n\n${body}\n`.replace(/\n{3,}/g, "\n\n"), written);
    index.push([file, groups.map((g) => g[0].name)]);
    catalog.push({ file, title, desc: `${groups.length} entries` });
  }
  const idx = ["# Built-in symbol index", "", "Every Pine Script v6 built-in, by the file that documents it. If a name is not listed here, it does not exist in v6.", "",
    "Lookup rule: `ns.name` lives in `reference/<ns>.md`. Unnamespaced functions/variables are in `plot.md`, `time.md`, `bar_variables.md`, `core.md`, or the same-name namespace file (e.g. `input()` in `input.md`). All constants are in `constants.md`.", ""];
  for (const [file, names] of index) idx.push(`## ${file}`, "", names.join(", "), "");
  await out("reference/INDEX.md", idx.join("\n"), written);
  return catalog;
}

// ---------------------------------------------------------------- manifest
const SECTIONS = [
  ["reference", "Reference manual (signatures, arguments, returns, examples)", "Look up exact syntax here before using any built-in. `reference/INDEX.md` lists every built-in name."],
  ["primer", "Primer", "Getting started."],
  ["language", "Language", "Syntax and semantics: types, execution model, variables, operators, loops, conditionals, functions, UDTs, methods, collections, enums."],
  ["concepts", "Concepts", "Alerts, bar states, inputs, libraries, other timeframes/data (request.*), repainting, sessions, strategies, strings, time."],
  ["visuals", "Visuals", "Plots, colors, fills, backgrounds, levels, bar plotting/coloring, lines/boxes/polylines, labels/text/shapes, tables."],
  ["writing_scripts", "Writing scripts", "Style guide, debugging, profiling/optimization, limitations, publishing."],
  ["faq", "FAQ", "Task-oriented answers and techniques."],
  ["errors", "Errors", "Compiler/runtime error and warning codes."],
  ["migration_guides", "Migration guides", "Converting older scripts; `to_pine_version_6.md` lists every v5 to v6 breaking change."],
];
async function writeManifest(catalog, written) {
  catalog.push(
    { file: "writing_scripts/publishing_guidelines.md", title: "Publishing guidelines (house rules checklist)", desc: "Condensed House Rules, visibility types, vendor requirements, and BBCode formatting for script descriptions. Hand-maintained." },
    { file: "concepts/common_errors.md", title: "Common error messages", desc: "Legacy parser/compiler messages not covered by errors/ (if statement too long, mismatched input, no viable alternative, too many local variables). Hand-maintained." },
  );
  const bySection = (dir) => catalog.filter((c) => c.file.startsWith(dir + "/")).sort((a, b) => a.file.localeCompare(b.file));
  const head = `# Pine Script v6 documentation manifest

Generated by \`scripts/sync-official-docs.mjs\` from the official [User Manual](${DOCS}/welcome/) and [Reference Manual](${REF}). Do not edit by hand.

## How to use

1. Built-in lookup: \`ns.name\` (e.g. \`ta.rsi\`, \`strategy.entry\`, \`syminfo.mintick\`) is documented in \`reference/<ns>.md\`. Unnamespaced built-ins: plotting in \`reference/plot.md\`, time/date in \`reference/time.md\`, \`open\`/\`close\`/\`bar_index\` etc. in \`reference/bar_variables.md\`, the rest in \`reference/core.md\` (or the same-name namespace file, e.g. \`input()\` in \`reference/input.md\`). All constants are in \`reference/constants.md\`.
2. If unsure whether a built-in exists, check \`reference/INDEX.md\`. Never use a name that isn't listed there.
3. For how and why (execution model, repainting, request.* behavior, strategies), read the matching page under \`language/\` or \`concepts/\`.
4. For recent features, check \`release_notes.md\`. Every script must start with \`//@version=6\`.

Common routes: execution/var/varip → \`language/execution_model.md\` · multi-timeframe/request.security → \`concepts/other_timeframes_and_data.md\` + \`concepts/repainting.md\` · backtesting → \`concepts/strategies.md\` + \`reference/strategy.md\` · drawings → \`visuals/lines_and_boxes.md\` / \`visuals/text_and_shapes.md\` · v5 → v6 → \`migration_guides/to_pine_version_6.md\` · publishing → \`writing_scripts/publishing.md\` + \`writing_scripts/publishing_guidelines.md\`.
`;
  const lines = [head];
  for (const [dir, name, blurb] of SECTIONS) {
    const items = bySection(dir);
    if (!items.length) continue;
    lines.push(`## ${name}`, "", blurb, "");
    for (const c of items) lines.push(`- \`${c.file}\`: **${c.title}.** ${c.desc}`);
    lines.push("");
  }
  lines.push("## Other", "", "- `release_notes.md`: **Release notes.** Every Pine Script change since 2020, newest first.", "");
  await out("LLM_MANIFEST.md", lines.join("\n"), written);
}

// ---------------------------------------------------------------- main
async function out(rel, text, written) {
  const p = path.join(ROOT, rel);
  await mkdir(path.dirname(p), { recursive: true });
  await writeFile(p, text.replace(/[ \t]+$/gm, "").replace(/\n*$/, "\n"));
  written.add(rel);
}
async function prune(written) {
  const removed = [];
  for (const dir of GENERATED_DIRS) {
    const walk = async (d) => {
      for (const e of await readdir(path.join(ROOT, d), { withFileTypes: true }).catch(() => [])) {
        const rel = path.posix.join(d, e.name);
        if (e.isDirectory()) { await walk(rel); continue; }
        if (rel.endsWith(".md") && !written.has(rel) && !KEEP.has(rel)) { await rm(path.join(ROOT, rel)); removed.push(rel); }
      }
    };
    await walk(dir);
  }
  return removed;
}

const written = new Set();
console.log("Fetching User Manual...");
const { pages, catalog } = await syncManual(written);
console.log(`  ${catalog.length} pages`);
console.log("Fetching Reference Manual...");
const data = await loadReference();
const refCatalog = await syncReference(data, pages, written);
console.log(`  ${data.functions.length} function overloads, ${data.variables.length} variables, ${data.constants.length} constants`);
await writeManifest([...catalog, ...refCatalog], written);
const removed = await prune(written);
console.log(`Wrote ${written.size} files${removed.length ? `; removed stale: ${removed.join(", ")}` : ""}`);
