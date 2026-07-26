/* Genererer sitemap.xml og robots.txt ud fra de faktisk genererede sider.
 * Kør EFTER de andre generatorer:  node assets/seo.mjs
 * Domænet styres ét sted: SITE_URL i assets/site.mjs */
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "./site.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

function htmlFiles(dir) {
  try { return readdirSync(join(root, dir)).filter((f) => f.endsWith(".html")); }
  catch { return []; }
}

const urls = [];
const add = (path, pri) => urls.push({ loc: SITE_URL + path, pri });

add("/", "1.0");
add("/byer/", "0.9");
add("/inspiration/", "0.8");
add("/blog/", "0.8");

// Bysider
for (const f of htmlFiles("byer")) if (f !== "index.html") add(`/byer/${f}`, "0.7");
// Blogindlæg
for (const f of htmlFiles("blog")) if (f !== "index.html") add(`/blog/${f}`, "0.6");
// /partner/ udelades bevidst (noindex)

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.pri}</priority>\n  </url>`).join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(root, "sitemap.xml"), xml, "utf8");

const robots = `User-agent: *
Allow: /
Disallow: /partner/

Sitemap: ${SITE_URL}/sitemap.xml
`;
writeFileSync(join(root, "robots.txt"), robots, "utf8");

console.log(`sitemap.xml: ${urls.length} URLer · robots.txt · domæne ${SITE_URL}`);
