// Genererer docs/seo/url-oversigt.md ud fra det byggede site.
// Kør efter build: node scripts/url-overview.js
const fs = require("fs");
const path = require("path");
const { SITE, ROOT_PAGES } = require("./site-data");
const ROOT = path.join(__dirname, "..");
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const list = (d) => fs.readdirSync(path.join(ROOT, d)).filter((f) => f.endsWith(".html")).sort().map((f) => `${d}/${f}`);
const files = ROOT_PAGES.concat(list("blog"), list("byer"));
const rows = files.map((f) => {
  const h = fs.readFileSync(path.join(ROOT, f), "utf8");
  const title = decode((h.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const h1 = decode(((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "").replace(/<[^>]+>/g, "").trim());
  const noindex = /name="robots" content="[^"]*noindex/.test(h) || ["tak.html", "privatlivspolitik.html"].includes(f);
  const url = f === "index.html" ? "/" : `/${f}`;
  return `| ${url} | ${title.replace(/\|/g, "\\|")} | ${h1.replace(/\|/g, "\\|")} | ${noindex ? "noindex" : "index"} |`;
});
const today = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(ROOT, "docs/seo/url-oversigt.md"), `# URL-oversigt — bookgardinbussen.online

Genereret af \`scripts/url-overview.js\` fra det byggede site (${today}). ${files.length} sider. Domæne: ${SITE}

| URL | Title | H1 | Indeksering |
|---|---|---|---|
${rows.join("\n")}
`);
console.log(`docs/seo/url-oversigt.md: ${files.length} sider`);
