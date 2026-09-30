// Teknisk SEO på alle færdige HTML-filer + sitemap.xml. Køres automatisk som
// sidste trin af build.js (efter seo-sections.js).
//
// Scriptet kan køres igen og igen og gør følgende:
// - Google Search Console: indsætter <meta name="google-site-verification">
//   på alle sider, når GOOGLE_SITE_VERIFICATION er udfyldt i site-data.js
// - Bing Webmaster Tools: indsætter <meta name="msvalidate.01">, når
//   BING_SITE_VERIFICATION er udfyldt i site-data.js
// - Sprogsignal til Bing (content-language da-DK) og PNG-favicons/
//   apple-touch-icon/manifest på alle sider (Bing og Google viser favicon i
//   søgeresultaterne og foretrækker et rasterikon på mindst 48x48)
// - Kvadratisk logo (assets/logo.png) i JSON-LD i stedet for OG-billedet
// - Kortere titler og meta-beskrivelser, så Google ikke klipper dem af
// - Fjerner egen-anmeldelser (aggregateRating) fra JSON-LD, som Google ikke
//   viser for LocalBusiness og kan give en manuel handling
// - Interne links til forsiden peger på den kanoniske URL "/" i stedet for
//   /index.html (samme side under to URL'er)
// - Article dateModified og sitemap lastmod ændres kun, når siden reelt er
//   ændret (ellers bruges datoen fra seneste commit)

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { SITE, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION, attr } = require("./site-data");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
const listHtml = (dir) => fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith(".html")).sort();
const git = (cmd) => { try { return execSync(`git ${cmd}`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { return ""; } };
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const ROOT_PAGES = ["index.html", "om-os.html", "hvorfor-gardinbussen.html", "nyheder.html", "tak.html", "privatlivspolitik.html"];
const allPages = ROOT_PAGES
  .concat(listHtml("blog").map((f) => `blog/${f}`))
  .concat(listHtml("byer").map((f) => `byer/${f}`));

const TITLE_MAX = 60;
const BRAND_SUFFIX = /\s*[|–-]\s*bookgardinbussen\.online$/;

// Sæt titel i <title>, og:title og twitter:title.
function setTitle(html, title) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${attr(title)}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${attr(title)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${attr(title)}$2`);
}
function setDesc(html, desc) {
  return html
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${attr(desc)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${attr(desc)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${attr(desc)}$2`);
}
const getTitle = (html) => decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");

// ---------- håndskrevne sider ----------
const PAGE_META = {
  "index.html": {
    desc: "Book Gardinbussen: gratis og uforpligtende hjemmebesøg med prøver, opmåling og montering af gardiner, rullegardiner, persienner og plisségardiner.",
  },
  "om-os.html": {
    title: "Om os – gratis og uforpligtende hjemmebesøg | Gardinbussen",
    desc: "Mød bookgardinbussen.online og book et gratis, uforpligtende hjemmebesøg. Vi kommer med prøver, måler op og giver et fast tilbud på stedet.",
  },
  "hvorfor-gardinbussen.html": {
    title: "Hvorfor Gardinbussen? Bedste tilbud på gardiner",
    desc: "Hvorfor vælge Gardinbussen? Få det bedste tilbud på gardiner — billige eller i god kvalitet, valgt hjemme hos dig. Gratis og uforpligtende besøg.",
  },
};
for (const [rel, m] of Object.entries(PAGE_META)) {
  let html = read(rel);
  if (m.title) html = setTitle(html, m.title);
  if (m.desc) html = setDesc(html, m.desc);
  write(rel, html);
}

// ---------- alle sider ----------
for (const rel of allPages) {
  let html = read(rel);
  const inSub = rel.includes("/");

  // For lange titler: drop domænenavnet (Google viser selv sitenavnet).
  const t = getTitle(html);
  if (t.length > TITLE_MAX && BRAND_SUFFIX.test(t)) html = setTitle(html, t.replace(BRAND_SUFFIX, ""));

  // Google Search Console-verifikation.
  html = html.replace(/\n[ \t]*<meta name="google-site-verification" content="[^"]*" \/>/, "");
  if (GOOGLE_SITE_VERIFICATION) {
    html = html.replace(/(\n([ \t]*)<meta name="viewport"[^>]*\/>)/,
      `$1\n$2<meta name="google-site-verification" content="${attr(GOOGLE_SITE_VERIFICATION)}" />`);
  }

  // Bing Webmaster Tools-verifikation.
  html = html.replace(/\n[ \t]*<meta name="msvalidate\.01" content="[^"]*" \/>/, "");
  if (BING_SITE_VERIFICATION) {
    html = html.replace(/(\n([ \t]*)<meta name="viewport"[^>]*\/>)/,
      `$1\n$2<meta name="msvalidate.01" content="${attr(BING_SITE_VERIFICATION)}" />`);
  }

  // Sprogsignal: Bing bruger content-language (og ikke kun <html lang>).
  if (!/http-equiv="content-language"/.test(html)) {
    html = html.replace(/(\n([ \t]*)<meta name="viewport"[^>]*\/>)/,
      `$1\n$2<meta http-equiv="content-language" content="da-DK" />`);
  }

  // Favicons i PNG + apple-touch-icon + manifest efter SVG-ikonet.
  const pre = inSub ? "../" : "";
  html = html.replace(/\n[ \t]*<link rel="(?:icon" type="image\/png"|apple-touch-icon|manifest)[^>]*\/>/g, "");
  html = html.replace(/(\n([ \t]*)<link rel="icon" href="[^"]*favicon\.svg"[^>]*\/>)/, (m, line, ind) => line +
    `\n${ind}<link rel="icon" type="image/png" sizes="48x48" href="${pre}assets/favicon-48.png" />` +
    `\n${ind}<link rel="apple-touch-icon" href="${pre}assets/apple-touch-icon.png" />` +
    `\n${ind}<link rel="manifest" href="${pre}site.webmanifest" />`);

  // Kvadratisk logo i JSON-LD (Google kræver mindst 112x112, helst kvadratisk).
  html = html.split(`"logo":{"@type":"ImageObject","url":"${SITE}/assets/og-image.png"}`)
    .join(`"logo":{"@type":"ImageObject","url":"${SITE}/assets/logo.png","width":512,"height":512}`);
  html = html.split(`"logo": "${SITE}/assets/og-image.png"`).join(`"logo": "${SITE}/assets/logo.png"`);

  // Fjern aggregateRating fra JSON-LD (egen-anmeldelser).
  html = html.replace(/,"aggregateRating":\{"@type":"AggregateRating"[^}]*\}/g, "");
  html = html.replace(/,\s*"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[^}]*\}/g, "");

  // Forsidelinks -> kanonisk "/".
  html = html.split(`href="${SITE}/index.html#top"`).join(`href="${SITE}/"`);
  html = html.replace(inSub ? /href="\.\.\/index\.html(#[^"]*)?"/g : /href="index\.html(#[^"]*)?"/g,
    (m, hash) => `href="/${hash || ""}"`);

  write(rel, html);
}

// ---------- Article dateModified: kun ny dato ved reelle ændringer ----------
// Er indholdet uændret i forhold til seneste commit (bortset fra
// dateModified), beholdes den committede dato. Så ændrer en ny build ikke
// datoen på alle indlæg, og filen forbliver uændret i git.
const today = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const DATE_MOD = /"dateModified":"[^"]*"/;
for (const f of listHtml("blog")) {
  const rel = `blog/${f}`;
  const html = read(rel);
  const committed = git(`show HEAD:"${rel}"`);
  const m = committed && committed.match(DATE_MOD);
  if (!m || !DATE_MOD.test(html)) continue;
  const same = html.replace(DATE_MOD, "").trim() === committed.replace(DATE_MOD, "").trim();
  write(rel, html.replace(DATE_MOD, same ? m[0] : `"dateModified":"${today}"`));
}

// ---------- sitemap.xml med rigtig lastmod ----------
// lastmod = dato for seneste commit af filen; har filen ikke-committede
// ændringer (fx fra denne kørsel), bruges dags dato.
function lastmod(file) {
  const dirty = git(`status --porcelain -- "${file}"`);
  return (!dirty && git(`log -1 --format=%cs -- "${file}"`)) || today;
}
const sitemapPages = [
  { file: "index.html", loc: `${SITE}/`, freq: "weekly", pri: "1.0" },
  { file: "hvorfor-gardinbussen.html", freq: "monthly", pri: "0.8" },
  { file: "om-os.html", freq: "monthly", pri: "0.5" },
  { file: "nyheder.html", freq: "weekly", pri: "0.6" },
  { file: "blog/index.html", freq: "weekly", pri: "0.6" },
]
  .concat(listHtml("blog").filter((f) => f !== "index.html").map((f) => ({ file: `blog/${f}`, freq: "monthly", pri: "0.7" })))
  .concat(listHtml("byer").map((f) => ({ file: `byer/${f}`, freq: "monthly", pri: "0.7" })))
  .filter((p) => !/name="robots" content="noindex/.test(read(p.file)));
const urls = sitemapPages.map((p) => `  <url>
    <loc>${p.loc || `${SITE}/${p.file}`}</loc>
    <lastmod>${lastmod(p.file)}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.pri}</priority>
  </url>`).join("\n");
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

console.log(`Teknisk SEO opdateret på ${allPages.length} sider. sitemap.xml: ${sitemapPages.length} URL'er.`);
console.log(BING_SITE_VERIFICATION
  ? "Bing Webmaster Tools-verifikation indsat på alle sider."
  : "BING_SITE_VERIFICATION er tom i site-data.js — ingen msvalidate.01-tag indsat.");
console.log(GOOGLE_SITE_VERIFICATION
  ? "Google Search Console-verifikation indsat på alle sider."
  : "GOOGLE_SITE_VERIFICATION er tom i site-data.js — ingen verifikations-tag indsat.");
