// Site-generator: bygger by-sider (lokal SEO) + blog (én artikel pr.
// gardintype), opdaterer forsidens by-liste og regenererer sitemap.xml.
// Kør: node scripts/build.js

const fs = require("fs");
const path = require("path");
const D = require("./site-data");

const ROOT = path.join(__dirname, "..");
const BYER_DIR = path.join(ROOT, "byer");
const BLOG_DIR = path.join(ROOT, "blog");
const { SITE, CITIES, REGION, BLOG, slugify, esc, attr, bookBtn, ctaCard, AFFILIATE_BOOK_URL } = D;
const BOOK = attr(AFFILIATE_BOOK_URL); // klar til href="" i skabeloner

// ---------- fælles skabelon-dele ----------
function head({ title, desc, url, relPrefix, jsonld }) {
  const ld = jsonld.map((o) => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(desc)}" />
  <meta name="theme-color" content="#2f5d50" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Gardinbussen" />
  <meta property="og:locale" content="da_DK" />
  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/assets/og-image.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${attr(title)}" />
  <meta name="twitter:description" content="${attr(desc)}" />
  <meta name="twitter:image" content="${SITE}/assets/og-image.svg" />
  <link rel="icon" href="${relPrefix}assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${relPrefix}css/styles.css" />
${ld}
</head>`;
}

function header(relPrefix) {
  return `  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="brand" href="${relPrefix}index.html" aria-label="Gardinbussen forside">
        <span class="brand-text">Gardin<span>bussen</span></span>
      </a>
      <nav class="site-nav" aria-label="Hovedmenu">
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-list">
          <span class="sr-only">Menu</span>
          <span class="nav-toggle-bar" aria-hidden="true"></span>
        </button>
        <ul class="nav-list" id="nav-list">
          <li><a href="${relPrefix}index.html">Forside</a></li>
          <li><a href="${relPrefix}index.html#produkter">Produkter</a></li>
          <li><a href="${relPrefix}blog/index.html">Blog</a></li>
          <li><a href="${relPrefix}index.html#omraade">Byer</a></li>
          <li><a href="${relPrefix}om-os.html">Om os</a></li>
          <li><a class="nav-cta" href="${BOOK}" target="_blank" rel="noopener sponsored">Book hjemmebesøg</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function footer(relPrefix) {
  return `  <footer class="site-footer">
    <div class="container footer-bottom" style="border:0;margin:0;padding-top:1.4rem">
      <p>© <span id="year"></span> Gardinbussen. Alle rettigheder forbeholdes.</p>
      <p class="footer-credit">Lavet af <a href="https://magnoramarketing.dk/" target="_blank" rel="noopener">magnoramarketing.dk</a></p>
    </div>
  </footer>
  <script src="${relPrefix}js/main.js" defer></script>
</body>
</html>
`;
}

function faqBlock(items) {
  const html = items.map((f) => `          <details class="faq-item">
            <summary>${esc(f.q)}</summary>
            <p>${esc(f.a)}</p>
          </details>`).join("\n");
  const ld = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return { html, ld };
}

// ---------- by-sider ----------
function cityPage(city) {
  const slug = slugify(city);
  const region = REGION[city] || "Danmark";
  const url = `${SITE}/byer/${slug}.html`;
  const title = `Gardiner i ${city} | Gratis hjemmebesøg – Gardinbussen`;
  const desc = `Gardiner i ${city}? Gardinbussen kører hele gardinbutikken hjem til dig i ${city} og ${region}. Gratis opmåling, rådgivning og montering af gardiner, rullegardiner, persienner og plisségardiner. Book et uforpligtende hjemmebesøg.`;
  const faq = faqBlock([
    { q: `Kører Gardinbussen til ${city}?`, a: `Ja. Vi dækker ${city} og resten af ${region}, og kommer gerne hjem til dig med prøver, uanset om du bor midt i ${city} eller i oplandet.` },
    { q: `Hvad koster et hjemmebesøg i ${city}?`, a: `Hjemmebesøget i ${city} er gratis og helt uforpligtende. Du får et fast tilbud på stedet og bestemmer selv, om du vil gå videre.` },
    { q: `Hvilke typer gardiner kan jeg få?`, a: `Vi har gardiner, rullegardiner, persienner, plisségardiner, lamelgardiner samt gardinstænger og skinner — i mange stoffer, farver og løsninger til alle vinduer.` },
    { q: `Hvor hurtigt kan I komme til ${city}?`, a: `Vi ringer til dig inden for én hverdag og aftaler en tid i ${city}, der passer dig — også om aftenen eller i weekenden.` },
    { q: `Måler og monterer I også gardinerne?`, a: `Ja. Vi måler professionelt op, syr gardinerne efter mål og står for hele monteringen, så du får et færdigt resultat uden besvær.` },
    { q: `Er jeg bundet til at købe noget?`, a: `Nej. Både besøg, rådgivning og tilbud er uforpligtende.` },
  ]);
  const business = {
    "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness",
    name: `Gardinbussen – ${city}`,
    description: `Mobil gardinservice i ${city} og ${region}.`,
    url, email: "mail@bookgardinbussen.online", image: `${SITE}/assets/og-image.svg`, priceRange: "$$",
    areaServed: { "@type": "City", name: city },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: `Gardiner i ${city}`, item: url },
    ],
  };
  return `${head({ title, desc, url, relPrefix: "../", jsonld: [business, breadcrumb, faq.ld] })}
<body>
  <a class="skip-link" href="#booking">Gå til booking</a>
${header("../")}
  <main id="main">
    <nav class="breadcrumb container" aria-label="Sti">
      <a href="../index.html">Forside</a> <span aria-hidden="true">›</span>
      <a href="../index.html#omraade">Byer</a> <span aria-hidden="true">›</span>
      <span>${esc(city)}</span>
    </nav>

    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Mobil gardinservice i ${esc(city)}</p>
          <h1>Gardiner i ${esc(city)} — vi kommer hjem til dig</h1>
          <p class="lead">
            Bor du i ${esc(city)} eller i ${esc(region)}? Gardinbussen kører hele
            gardinbutikken hjem til dig med et bredt udvalg af stoffer og
            løsninger. Vi måler op, rådgiver og monterer — alt sammen på ét besøg.
          </p>
          <div class="hero-actions">
            ${bookBtn(`Book gratis hjemmebesøg i ${city}`, "btn-primary")}
            <a class="btn btn-ghost" href="../blog/index.html">Læs vores guides</a>
          </div>
          <ul class="hero-badges">
            <li>Gratis opmåling i ${esc(city)}</li>
            <li>Ingen købepligt</li>
            <li>Montering inkluderet</li>
          </ul>
        </div>
        <div class="hero-card">
          <div class="hero-card-inner">
            <p class="hero-card-tag">Sådan booker du</p>
            <ol class="hero-steps">
              <li><span>1</span> Vælg en dag der passer dig</li>
              <li><span>2</span> Vi kommer hjem med prøver</li>
              <li><span>3</span> Du får et fast tilbud på stedet</li>
            </ol>
            ${bookBtn("Find en ledig tid", "btn-primary btn-block")}
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container legal">
        <h2>Gardiner og gardinmontering i ${esc(city)}</h2>
        <p>
          Med Gardinbussen slipper du for at slæbe tunge prøvebøger frem og
          tilbage. Vi kommer hjem til dig i ${esc(city)}, hvor du kan se
          stofferne i dit eget lys — præcis der, hvor gardinerne skal hænge.
        </p>
        <p>
          Vi dækker hele ${esc(city)} og omegn i ${esc(region)}, og du får det
          hele samlet i ét besøg: stof, syning, skinner og professionel montering
          i én fast pris uden skjulte gebyrer.
        </p>
        <h3>Det får du hjem til ${esc(city)}</h3>
        <ul class="area-list city-usp">
          <li>Gratis og uforpligtende hjemmebesøg</li>
          <li>Personlig rådgivning og opmåling</li>
          <li>Gardiner syet efter mål</li>
          <li>Professionel montering inkluderet</li>
          <li>Fast tilbud på stedet</li>
          <li>Bredt udvalg af stoffer og farver</li>
        </ul>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container legal">
        <h2>Ofte stillede spørgsmål om gardiner i ${esc(city)}</h2>
        <div class="faq">
${faq.html}
        </div>
      </div>
    </section>

    <section class="section booking" id="booking">
      <div class="container booking-inner">
        <div class="booking-copy">
          <p class="eyebrow">Book hjemmebesøg i ${esc(city)}</p>
          <h2>Gratis og uforpligtende</h2>
          <p>Book dit gardinbesøg i ${esc(city)} online. Vælg en tid der passer dig — så kommer vi hjem til dig med prøver, måler op og giver et fast tilbud.</p>
          <ul class="booking-points">
            <li>Gratis og uforpligtende besøg</li>
            <li>Prøver og rådgivning med hjemme</li>
            <li>Fast tilbud på stedet</li>
          </ul>
          <p class="booking-alt">
            Vil du hellere skrive? Send en mail til
            <a href="mailto:mail@bookgardinbussen.online">mail@bookgardinbussen.online</a>
          </p>
        </div>
${ctaCard(`Book gardinbesøg i ${city}`, `Vælg en ledig tid i ${city} — det tager under et minut.`)}
      </div>
    </section>
  </main>
${footer("../")}`;
}

// ---------- blog ----------
function blogPost(post) {
  const url = `${SITE}/blog/${post.slug}.html`;
  const faq = faqBlock(post.faq);
  const sectionsHtml = post.sections.map((s) =>
    `        <h2>${esc(s.h)}</h2>\n${s.p.map((p) => `        <p>${esc(p)}</p>`).join("\n")}`
  ).join("\n");
  const introHtml = post.intro.map((p) => `        <p class="lead">${esc(p)}</p>`).join("\n");
  const article = {
    "@context": "https://schema.org", "@type": "Article",
    headline: post.h1, description: post.desc, image: `${SITE}/assets/og-image.svg`,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Gardinbussen" },
    publisher: { "@type": "Organization", name: "Gardinbussen", logo: { "@type": "ImageObject", url: `${SITE}/assets/og-image.svg` } },
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/index.html` },
      { "@type": "ListItem", position: 3, name: post.tag, item: url },
    ],
  };
  return `${head({ title: post.metaTitle, desc: post.desc, url, relPrefix: "../", jsonld: [article, breadcrumb, faq.ld] })}
<body>
  <a class="skip-link" href="#booking">Gå til booking</a>
${header("../")}
  <main id="main">
    <nav class="breadcrumb container" aria-label="Sti">
      <a href="../index.html">Forside</a> <span aria-hidden="true">›</span>
      <a href="index.html">Blog</a> <span aria-hidden="true">›</span>
      <span>${esc(post.tag)}</span>
    </nav>

    <article class="section">
      <div class="container legal">
        <p class="eyebrow">Guide · ${esc(post.tag)}</p>
        <h1>${esc(post.h1)}</h1>
${introHtml}
${sectionsHtml}

        <h2>Ofte stillede spørgsmål</h2>
        <div class="faq">
${faq.html}
        </div>

        <p class="blog-cta-note">Vil du se ${esc(post.tag.toLowerCase())} i dit eget hjem? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.</p>
      </div>
    </article>

    <section class="section section-alt booking" id="booking">
      <div class="container booking-inner">
        <div class="booking-copy">
          <p class="eyebrow">Book hjemmebesøg</p>
          <h2>Gratis og uforpligtende</h2>
          <p>Book dit gardinbesøg online. Vælg en tid der passer dig — så kommer vi hjem med prøver, måler op og giver et fast tilbud. Ingen købepligt.</p>
          <ul class="booking-points">
            <li>Gratis og uforpligtende besøg</li>
            <li>Prøver og rådgivning med hjemme</li>
            <li>Fast tilbud på stedet</li>
          </ul>
          <p class="booking-alt">
            Vil du hellere skrive? Send en mail til
            <a href="mailto:mail@bookgardinbussen.online">mail@bookgardinbussen.online</a>
          </p>
        </div>
${ctaCard("Book et gardinbesøg", `Se ${post.tag.toLowerCase()} i dit eget hjem — book et gratis besøg.`)}
      </div>
    </section>
  </main>
${footer("../")}`;
}

function blogIndex() {
  const url = `${SITE}/blog/index.html`;
  const cards = BLOG.map((p) => `          <a class="blog-card" href="${p.slug}.html">
            <h3>${esc(p.tag)}</h3>
            <p>${esc(p.desc)}</p>
            <span class="blog-card-link">Læs guide →</span>
          </a>`).join("\n");
  const itemList = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: BLOG.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/blog/${p.slug}.html`, name: p.tag })),
  };
  return `${head({
    title: "Blog: Guides til gardiner, rullegardiner og persienner | Gardinbussen",
    desc: "Guides om gardiner, rullegardiner, persienner, plisségardiner, lamelgardiner og ophæng. Find den rigtige løsning til dine vinduer — og book en gratis opmåling.",
    url, relPrefix: "../", jsonld: [itemList],
  })}
<body>
  <a class="skip-link" href="#blog-list">Gå til indhold</a>
${header("../")}
  <main id="main">
    <nav class="breadcrumb container" aria-label="Sti">
      <a href="../index.html">Forside</a> <span aria-hidden="true">›</span>
      <span>Blog</span>
    </nav>

    <section class="section">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Blog</p>
          <h1>Guides til hver type gardin</h1>
          <p class="section-sub">Bliv klogere på de forskellige gardintyper, og find den løsning der passer til dine vinduer.</p>
        </header>
        <div class="blog-grid" id="blog-list">
${cards}
        </div>
      </div>
    </section>
  </main>
${footer("../")}`;
}

// ---------- kør ----------
if (!fs.existsSync(BYER_DIR)) fs.mkdirSync(BYER_DIR, { recursive: true });
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

// by-sider + forsidens by-liste
const listItems = [];
for (const city of CITIES) {
  const slug = slugify(city);
  fs.writeFileSync(path.join(BYER_DIR, `${slug}.html`), cityPage(city));
  listItems.push(`          <li><a href="byer/${slug}.html">${esc(city)}</a></li>`);
}
const indexPath = path.join(ROOT, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
index = index.replace(
  /<!-- CITIES:START -->[\s\S]*?<!-- CITIES:END -->/,
  `<!-- CITIES:START -->\n${listItems.join("\n")}\n          <!-- CITIES:END -->`
);
fs.writeFileSync(indexPath, index);

// blog
for (const post of BLOG) {
  fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.html`), blogPost(post));
}
fs.writeFileSync(path.join(BLOG_DIR, "index.html"), blogIndex());

// sitemap
const urls = [
  { loc: `${SITE}/`, freq: "weekly", pri: "1.0" },
  { loc: `${SITE}/om-os.html`, freq: "monthly", pri: "0.5" },
  { loc: `${SITE}/blog/index.html`, freq: "weekly", pri: "0.6" },
  { loc: `${SITE}/privatlivspolitik.html`, freq: "yearly", pri: "0.3" },
]
  .concat(BLOG.map((p) => ({ loc: `${SITE}/blog/${p.slug}.html`, freq: "monthly", pri: "0.7" })))
  .concat(CITIES.map((c) => ({ loc: `${SITE}/byer/${slugify(c)}.html`, freq: "monthly", pri: "0.7" })))
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`)
  .join("\n");
fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`Genererede ${CITIES.length} by-sider og ${BLOG.length} blogindlæg. Opdaterede index.html og sitemap.xml.`);
console.log(`Alle book-CTA'er peger på: ${AFFILIATE_BOOK_URL}`);
