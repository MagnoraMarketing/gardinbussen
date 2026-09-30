// Giver Bing (og Yandex, Seznam m.fl.) besked om alle sider i sitemap.xml via
// IndexNow, så nye og opdaterede sider bliver indekseret hurtigt.
// Kør efter hver udrulning: node scripts/indexnow.js
// Kun bestemte sider: node scripts/indexnow.js index.html byer/odense.html
// (GitHub Actions kører det automatisk ved push til main, se
// .github/workflows/indexnow.yml)
// Nøglen ligger i roden som <nøgle>.txt og skal være tilgængelig på sitet.

const fs = require("fs");
const path = require("path");
const https = require("https");
const { SITE } = require("./site-data");

const ROOT = path.join(__dirname, "..");
const KEY = "8c4c0a4947b8991ead0c7f2bb237ac03";

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const inSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const files = process.argv.slice(2);
const urlList = files.length
  ? files.map((f) => (f === "index.html" ? `${SITE}/` : `${SITE}/${f}`)).filter((u) => inSitemap.includes(u))
  : inSitemap;
if (!urlList.length) { console.log("Ingen indekserbare sider ændret — IndexNow springes over."); process.exit(0); }

const body = JSON.stringify({
  host: new URL(SITE).host,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList,
});

if (process.env.INDEXNOW_DRY_RUN) { console.log(urlList); process.exit(0); }
const req = https.request("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body) },
}, (res) => {
  console.log(`IndexNow svarede ${res.statusCode} for ${urlList.length} URL'er (200/202 = modtaget).`);
  res.resume();
});
req.on("error", (e) => { console.error("IndexNow fejlede:", e.message); process.exitCode = 1; });
req.end(body);
