/* Genererer bysider (lokal SEO) + oversigt "Landsdækkende gardinservice".
 * Kør:  node byer/generate.mjs
 * VIGTIGT: sæt SITE_URL til dit rigtige domæne. */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, SITE_NAME, BRAND, CITIES, REGIONS, AFF_BOOK, BOOK_URL, header, footer } from "../assets/site.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const BASE = `${SITE_URL}/byer`;

function headTag({ title, description, canonical, jsonld }) {
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/blog/blog.css">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body>`;
}

function ctaBlock(name) {
  return `<aside class="cta">
    <h3>Book Gardinbussen i ${name}</h3>
    <p>Vælg en tid, der passer dig — så kører vi ud til dig i ${name} med stofprøverne. Gratis og helt uforpligtende.</p>
    <a class="btn btn-primary" href="${AFF_BOOK}" target="_blank" rel="sponsored nofollow noopener">Book gratis hjemmebesøg i ${name} →</a>
    <p class="fine">Du sendes videre til gardinbus.nu for at fuldføre din booking</p>
  </aside>`;
}

/* ---------- Byside ---------- */
function renderCity(c) {
  const canonical = `${BASE}/${c.slug}.html`;
  const opl = c.oplande.join(", ");
  const lastOpl = c.oplande[c.oplande.length - 1];
  const title = `Gardiner i ${c.name} – Gardinbussen kører til ${c.name} og omegn`;
  const description = `Gardinbussen kører til ${c.name} og omegn (${c.postnr}) med stofprøver, gratis opmåling og montering. Book et hjemmebesøg i ${c.name} – gardiner syet efter mål.`;

  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Gardiner syet efter mål med hjemmebesøg",
      provider: { "@type": "Organization", name: "Gardinbus.nu" },
      areaServed: { "@type": "City", name: c.name },
      url: canonical,
      inLanguage: "da-DK",
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Landsdækkende gardinservice", item: `${BASE}/` },
        { "@type": "ListItem", position: 3, name: c.name, item: canonical },
      ],
    },
  ];

  const otherCities = CITIES.filter((x) => x.region === c.region && x.slug !== c.slug).slice(0, 6);

  return `${headTag({ title, description, canonical, jsonld })}
${header(SITE_URL)}
<main>
  <div class="wrap">
    <nav class="crumbs" aria-label="Brødkrumme">
      <a href="${SITE_URL}/">Forside</a><span>›</span><a href="${BASE}/">Byer</a><span>›</span>${c.name}
    </nav>
    <article class="article">
      <span class="eyebrow">Gardinservice i ${c.name}</span>
      <h1>Gardinbus i ${c.name}</h1>
      <p class="lead">Skal du have nye gardiner i ${c.name}? Gardinbussen kører hjem til dig med hundredvis af stofprøver, måler dine vinduer op og syr gardinerne efter mål. Du slipper for at tage i butik — vi kommer til dig i hele ${c.name} og omegn.</p>

      <h2 id="daekker">Gardinbussen kører til ${c.name} og omegn</h2>
      <p>Vi dækker ${c.name} (${c.postnr}) og oplandet omkring byen — blandt andet ${opl}. Uanset om du bor midt i ${c.name} eller ude i ${lastOpl}, kommer vi forbi med bussen, så du kan se stofferne i dit eget lys og i dine egne rum.</p>
      <p>Et hjemmebesøg er gratis og helt uforpligtende. Du får professionel rådgivning om stof, farve, lysindfald og ophæng — tilpasset præcis dit hjem i ${c.name}.</p>

      ${ctaBlock(c.name)}

      <h2 id="saadan">Sådan foregår et hjemmebesøg i ${c.name}</h2>
      <ol>
        <li><strong>Book online.</strong> Vælg en tid, der passer dig — også aftener og weekender.</li>
        <li><strong>Vi kommer til dig.</strong> Bussen holder ved din dør i ${c.name}, og vi måler op og viser prøver.</li>
        <li><strong>Syet efter mål.</strong> Dine gardiner sys efter de nøjagtige mål og det stof, du vælger.</li>
        <li><strong>Vi hænger op.</strong> Vi monterer skinner og gardiner og rydder op efter os.</li>
      </ol>

      <h2 id="sortiment">Gardiner til ethvert rum i dit hjem i ${c.name}</h2>
      <p>Vi har alt til vinduet med i bussen: gardiner, rullegardiner, plisségardiner, lamelgardiner og persienner. Er du i tvivl om, hvad der passer bedst, så læs vores <a href="${SITE_URL}/blog/">guides</a> eller find stilen på <a href="${SITE_URL}/inspiration/">inspirationssiden</a> — og lad os tage snakken hjemme hos dig i ${c.name}.</p>

      <h2 id="omraade">Vi dækker ${c.name} og hele oplandet</h2>
      <p>Postnummerområde: <strong>${c.postnr}</strong>. Vi kører også til: ${opl}. Bor du lige uden for området, så ring endelig — vi kører gerne længere ud efter aftale.</p>

      ${ctaBlock(c.name)}
    </article>

    <section aria-label="Andre byer i ${c.region}" style="max-width:1100px;margin:56px auto 0">
      <h2 class="section-title">Gardinservice i andre byer i ${c.region}</h2>
      <div class="cards">
        ${otherCities
          .map(
            (x) => `<a class="post-card" href="${x.slug}.html">
          <span class="body"><span class="cat">${x.region}</span><h3>Gardinbus i ${x.name}</h3><span class="read">Se ${x.name} →</span></span>
        </a>`
          )
          .join("\n        ")}
      </div>
    </section>
  </div>
</main>
${footer(SITE_URL)}
</body>
</html>`;
}

/* ---------- Oversigt: Landsdækkende gardinservice ---------- */
function renderIndex() {
  const canonical = `${BASE}/`;
  const title = `Landsdækkende gardinservice – Gardinbussen kører i hele Danmark | ${BRAND}`;
  const description =
    "Gardinbussen kører i hele Danmark. Find din by og book et gratis hjemmebesøg — gardiner syet efter mål, leveret og monteret hjemme hos dig.";
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: canonical,
      inLanguage: "da-DK",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Landsdækkende gardinservice", item: canonical },
      ],
    },
  ];

  const groups = REGIONS.map((r) => {
    const cards = CITIES.filter((c) => c.region === r)
      .map(
        (c) => `<a class="post-card" href="${c.slug}.html">
        <span class="body"><span class="cat">${c.postnr}</span><h3>Gardinbus i ${c.name}</h3><p>${c.oplande.slice(0, 3).join(", ")} m.fl.</p><span class="read">Se ${c.name} →</span></span>
      </a>`
      )
      .join("\n      ");
    return `<h2 class="section-title" style="margin-top:40px">${r}</h2>\n<div class="cards">${cards}</div>`;
  }).join("\n");

  return `${headTag({ title, description, canonical, jsonld })}
${header(SITE_URL)}
<main>
  <div class="wrap">
    <nav class="crumbs" aria-label="Brødkrumme"><a href="${SITE_URL}/">Forside</a><span>›</span>Landsdækkende gardinservice</nav>
    <section class="blog-hero">
      <span class="eyebrow">Landsdækkende gardinservice</span>
      <h1>Gardinbussen kører i hele Danmark</h1>
      <p>Vi bringer butikken hjem til dig — med stofprøver, opmåling, syning efter mål og montering. Find din by herunder og book et gratis, uforpligtende hjemmebesøg.</p>
    </section>
    ${groups}
    <aside class="cta" style="margin-top:56px">
      <h3>Er din by ikke på listen?</h3>
      <p>Vi kører i hele landet. Book et hjemmebesøg, så finder vi en tid, der passer dig — uanset hvor i Danmark du bor.</p>
      <a class="btn btn-primary" href="${AFF_BOOK}" target="_blank" rel="sponsored nofollow noopener">Book gratis hjemmebesøg →</a>
      <p class="fine">Du sendes videre til gardinbus.nu</p>
    </aside>
  </div>
</main>
${footer(SITE_URL)}
</body>
</html>`;
}

/* ---------- Skriv ---------- */
for (const c of CITIES) {
  writeFileSync(join(__dir, `${c.slug}.html`), renderCity(c), "utf8");
}
writeFileSync(join(__dir, "index.html"), renderIndex(), "utf8");
console.log(`Skrev ${CITIES.length} bysider + index.html`);
console.log("Booking-URL brugt:", BOOK_URL);
