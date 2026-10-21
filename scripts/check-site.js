// Kvalitetskontrol af det færdigbyggede site. Kør efter build.js:
//   node scripts/check-site.js
// Afslutter med kode 1, hvis der findes fejl. Kontrollerer:
// - interne links og ankre peger på eksisterende filer/id'er
// - én <h1>, title (≤ 60 tegn) og meta-beskrivelse (≤ 160 tegn) pr. side
// - canonical = sidens egen URL, og ingen utilsigtet noindex
// - JSON-LD kan parses, og FAQPage-spørgsmål findes også synligt på siden
// - affiliate-links bevarer partnerid/bannerid/uid og har rel="sponsored"
// - sitemap.xml indeholder alle indekserbare sider og kun eksisterende filer
// - ingen formuleringer, der får sitet til at fremstå som gardinleverandøren

const fs = require("fs");
const path = require("path");
const { SITE, AFFILIATE_BOOK_URL } = require("./site-data");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const listHtml = (dir) => fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith(".html")).sort();
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const NOINDEX = ["tak.html", "privatlivspolitik.html", "404.html"];
const pages = ["index.html", "om-os.html", "hvorfor-gardinbussen.html", "nyheder.html", ...NOINDEX]
  .concat(listHtml("blog").map((f) => `blog/${f}`))
  .concat(listHtml("byer").map((f) => `byer/${f}`));

// Formuleringer, der ikke må forekomme (sitet udfører ikke selv servicen, og
// leverandørens vilkår må ikke gøres bedre, end de er).
const FORBIDDEN = [
  /\bvi (måler|monterer|kommer hjem|kører|syr|tager prøver)/i,
  /vores (kunder|gratis hjemmebesøg|hjemmebesøg)/i,
  /\bhos os\b/i,
  /fast (tilbud|pris) på stedet/i,
  /montering (er )?inkluderet/i,
  /skjulte gebyrer/i,
  /under et minut/i,
  /kører gardinbutikken/i,
];

const partnerParams = new URL(AFFILIATE_BOOK_URL).searchParams;
const errors = [];
const warn = [];
const err = (f, m) => errors.push(`${f}: ${m}`);

const idsCache = {};
function ids(file) {
  if (!idsCache[file]) idsCache[file] = new Set([...read(file).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  return idsCache[file];
}

for (const f of pages) {
  const html = read(f);
  const dir = path.posix.dirname(f);
  const url = f === "index.html" ? `${SITE}/` : `${SITE}/${f}`;

  // Overskrifter og metadata
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(f, `${h1} <h1>-tags`);
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  if (!title) err(f, "mangler <title>");
  else if (title.length > 60) warn.push(`${f}: title er ${title.length} tegn`);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  if (!desc) err(f, "mangler meta-beskrivelse");
  else if (desc.length > 160) warn.push(`${f}: meta-beskrivelse er ${desc.length} tegn`);

  // Canonical og robots
  if (!NOINDEX.includes(f)) {
    const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    if (canon !== url) err(f, `canonical er ${canon}, forventet ${url}`);
  }
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (noindex && !NOINDEX.includes(f)) err(f, "har noindex");

  // JSON-LD
  const visible = decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let o;
    try { o = JSON.parse(m[1]); } catch (e) { err(f, `ugyldig JSON-LD: ${e.message}`); continue; }
    if (o["@type"] === "FAQPage") {
      for (const q of o.mainEntity) if (!visible.includes(q.name)) err(f, `FAQ-spørgsmål ikke synligt: ${q.name}`);
    }
    if (o["@type"] === "Service" || o["@type"] === "LocalBusiness") err(f, `${o["@type"]}-schema (sitet leverer ikke selv servicen)`);
  }

  // Links
  for (const m of html.matchAll(/<a\s([^>]*?)href="([^"]+)"([^>]*)>/g)) {
    const attrs = m[1] + m[3];
    const href = decode(m[2]);
    if (/^(mailto:|tel:)/.test(href)) continue;
    if (/^https?:\/\/(www\.)?partner-ads\.com\//.test(href)) {
      const u = new URL(href);
      for (const k of ["partnerid", "bannerid", "uid"]) {
        if (u.searchParams.get(k) !== partnerParams.get(k)) err(f, `affiliate-link med forkert ${k}: ${href}`);
      }
      if (!/^https:\/\/gardinbus\.nu\//.test(u.searchParams.get("htmlurl") || "")) err(f, `affiliate-link uden gardinbus.nu-destination: ${href}`);
      if (!/rel="[^"]*sponsored/.test(attrs)) err(f, `affiliate-link uden rel="sponsored": ${href}`);
      continue;
    }
    if (/^https?:\/\//.test(href) && !href.startsWith(SITE)) continue;
    let [p, hash] = href.replace(SITE, "").split("#");
    let target;
    if (p === "") target = f;
    else if (p.startsWith("/")) target = p === "/" ? "index.html" : p.slice(1);
    else target = path.posix.normalize(path.posix.join(dir, p));
    if (!fs.existsSync(path.join(ROOT, target))) { err(f, `brudt link: ${href}`); continue; }
    if (hash && target.endsWith(".html") && !ids(target).has(hash)) err(f, `ankeret #${hash} findes ikke i ${target}`);
  }

  // Indhold
  for (const re of FORBIDDEN) {
    const hit = visible.match(re);
    if (hit) err(f, `forbudt formulering: "${hit[0]}"`);
  }
  if (f !== "404.html" && !NOINDEX.includes(f) && !/footer-disclosure/.test(html)) err(f, "mangler affiliate-oplysning i footer");
}

// Sitemap
const sitemap = read("sitemap.xml");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  const file = loc === `${SITE}/` ? "index.html" : loc.replace(`${SITE}/`, "");
  if (!fs.existsSync(path.join(ROOT, file))) err("sitemap.xml", `findes ikke: ${loc}`);
  if (NOINDEX.includes(file)) err("sitemap.xml", `noindex-side i sitemap: ${loc}`);
}
for (const f of pages.filter((p) => !NOINDEX.includes(p))) {
  const loc = f === "index.html" ? `${SITE}/` : `${SITE}/${f}`;
  if (!locs.includes(loc)) err("sitemap.xml", `mangler ${loc}`);
}

// robots.txt
const robots = read("robots.txt");
if (/Disallow:\s*\/\s*$/m.test(robots)) err("robots.txt", "blokerer hele sitet");
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) err("robots.txt", "mangler Sitemap-linje");

for (const w of warn) console.log(`Advarsel: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`Fejl: ${e}`);
  console.error(`\n${errors.length} fejl på ${pages.length} sider.`);
  process.exit(1);
}
console.log(`OK: ${pages.length} sider, ${locs.length} URL'er i sitemap.xml, ingen fejl (${warn.length} advarsler).`);
