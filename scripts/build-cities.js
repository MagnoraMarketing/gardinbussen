// Generator: bygger en SEO-optimeret landingsside pr. by (med FAQ +
// structured data) og fylder by-listen på forsiden + opdaterer sitemap.xml.
// Kør: node scripts/build-cities.js
//
// Byerne er de 50 største i Danmark (efter indbyggertal, byområder).

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BYER_DIR = path.join(ROOT, "byer");
const SITE = "https://bookgardinbussen.online";

const CITIES = [
  "København", "Aarhus", "Odense", "Aalborg", "Esbjerg",
  "Randers", "Kolding", "Horsens", "Vejle", "Roskilde",
  "Herning", "Silkeborg", "Næstved", "Fredericia", "Viborg",
  "Køge", "Holstebro", "Taastrup", "Slagelse", "Hillerød",
  "Helsingør", "Sønderborg", "Svendborg", "Holbæk", "Hjørring",
  "Frederikshavn", "Nørresundby", "Haderslev", "Ringsted", "Skive",
  "Nykøbing Falster", "Kalundborg", "Ballerup", "Frederikssund", "Greve",
  "Rødovre", "Aabenraa", "Skanderborg", "Nyborg", "Grenaa",
  "Middelfart", "Ikast", "Korsør", "Vordingborg", "Thisted",
  "Hobro", "Brønderslev", "Ringkøbing", "Frederiksværk", "Allerød",
];

// By -> landsdel (bruges til lidt lokal variation, så siderne ikke er
// identiske og rammer lokale søgninger bedre).
const REGION = {
  "København": "Hovedstaden", "Taastrup": "Hovedstaden", "Hillerød": "Hovedstaden",
  "Helsingør": "Hovedstaden", "Ballerup": "Hovedstaden", "Frederikssund": "Hovedstaden",
  "Greve": "Hovedstaden", "Rødovre": "Hovedstaden", "Frederiksværk": "Hovedstaden",
  "Allerød": "Hovedstaden",
  "Roskilde": "Sjælland", "Næstved": "Sjælland", "Køge": "Sjælland",
  "Slagelse": "Sjælland", "Holbæk": "Sjælland", "Ringsted": "Sjælland",
  "Kalundborg": "Sjælland", "Korsør": "Sjælland", "Vordingborg": "Sjælland",
  "Nykøbing Falster": "Sjælland",
  "Odense": "Fyn", "Svendborg": "Fyn", "Nyborg": "Fyn", "Middelfart": "Fyn",
  "Esbjerg": "Syddanmark", "Kolding": "Syddanmark", "Vejle": "Syddanmark",
  "Fredericia": "Syddanmark", "Sønderborg": "Syddanmark", "Haderslev": "Syddanmark",
  "Aabenraa": "Syddanmark",
  "Aarhus": "Midtjylland", "Randers": "Midtjylland", "Horsens": "Midtjylland",
  "Herning": "Midtjylland", "Silkeborg": "Midtjylland", "Viborg": "Midtjylland",
  "Holstebro": "Midtjylland", "Skive": "Midtjylland", "Skanderborg": "Midtjylland",
  "Grenaa": "Midtjylland", "Ikast": "Midtjylland", "Ringkøbing": "Midtjylland",
  "Aalborg": "Nordjylland", "Hjørring": "Nordjylland", "Frederikshavn": "Nordjylland",
  "Nørresundby": "Nordjylland", "Thisted": "Nordjylland", "Brønderslev": "Nordjylland",
  "Hobro": "Nordjylland",
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function attr(s) {
  return esc(s).replace(/"/g, "&quot;");
}

function faqItems(city) {
  const region = REGION[city] || "Danmark";
  return [
    {
      q: `Kører Gardinbussen til ${city}?`,
      a: `Ja. Vi dækker ${city} og resten af ${region}, og kommer gerne hjem til dig med prøver, uanset om du bor midt i ${city} eller i oplandet.`,
    },
    {
      q: `Hvad koster et hjemmebesøg i ${city}?`,
      a: `Hjemmebesøget i ${city} er gratis og helt uforpligtende. Du får et fast tilbud på stedet og bestemmer selv, om du vil gå videre.`,
    },
    {
      q: `Hvilke typer gardiner kan jeg få?`,
      a: `Vi har gardiner, rullegardiner, persienner, plisségardiner, lamelgardiner samt gardinstænger og skinner — i mange stoffer, farver og løsninger til alle vinduer.`,
    },
    {
      q: `Hvor hurtigt kan I komme til ${city}?`,
      a: `Vi ringer til dig inden for én hverdag efter din henvendelse og aftaler en tid i ${city}, der passer dig — også om aftenen eller i weekenden.`,
    },
    {
      q: `Måler og monterer I også gardinerne?`,
      a: `Ja. Vi måler professionelt op på besøget, syr gardinerne efter mål og står for hele monteringen, så du får et færdigt resultat uden besvær.`,
    },
    {
      q: `Er jeg bundet til at købe noget?`,
      a: `Nej. Både besøg, rådgivning og tilbud er uforpligtende. Du beslutter i fred og ro, om løsningen er den rigtige for dig.`,
    },
  ];
}

function faqJsonLd(city) {
  const items = faqItems(city).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));
  return JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items });
}

function faqHtml(city) {
  return faqItems(city)
    .map((f) => `          <details class="faq-item">
            <summary>${esc(f.q)}</summary>
            <p>${esc(f.a)}</p>
          </details>`)
    .join("\n");
}

function pageTemplate(city) {
  const slug = slugify(city);
  const region = REGION[city] || "Danmark";
  const url = `${SITE}/byer/${slug}.html`;
  const title = `Gardiner i ${city} | Gratis hjemmebesøg – Gardinbussen`;
  const desc = `Gardiner i ${city}? Gardinbussen kører hele gardinbutikken hjem til dig i ${city} og ${region}. Gratis opmåling, rådgivning og montering af gardiner, rullegardiner, persienner og plisségardiner. Book et uforpligtende hjemmebesøg.`;

  const business = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `Gardinbussen – ${city}`,
    description: `Mobil gardinservice i ${city} og ${region}. Vi kører hele gardinbutikken hjem til dig med opmåling, rådgivning og montering.`,
    url: url,
    email: "mail@bookgardinbussen.online",
    image: `${SITE}/assets/og-image.svg`,
    priceRange: "$$",
    areaServed: { "@type": "City", name: city },
    makesOffer: ["Gardiner", "Rullegardiner", "Persienner", "Plisségardiner", "Lamelgardiner"].map((n) => ({
      "@type": "Offer", itemOffered: { "@type": "Service", name: `${n} i ${city}` },
    })),
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
  });

  const breadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: `Gardiner i ${city}`, item: url },
    ],
  });

  return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(desc)}" />
  <meta name="keywords" content="gardiner ${attr(city)}, rullegardiner ${attr(city)}, persienner ${attr(city)}, gardinmontering ${attr(city)}, gardinbus ${attr(city)}" />
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
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../css/styles.css" />
  <script type="application/ld+json">${business}</script>
  <script type="application/ld+json">${breadcrumb}</script>
  <script type="application/ld+json">${faqJsonLd(city)}</script>
</head>
<body>
  <a class="skip-link" href="#booking">Gå til booking</a>

  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="brand" href="../index.html" aria-label="Gardinbussen forside">
        <span class="brand-text">Gardin<span>bussen</span></span>
      </a>
      <nav class="site-nav" aria-label="Hovedmenu">
        <ul class="nav-list" style="display:flex">
          <li><a href="../index.html#produkter">Produkter</a></li>
          <li><a href="../index.html#omraade">Andre byer</a></li>
          <li><a class="nav-cta" href="#booking">Book hjemmebesøg</a></li>
        </ul>
      </nav>
    </div>
  </header>

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
            <a class="btn btn-primary" href="#booking">Book gratis hjemmebesøg</a>
            <a class="btn btn-ghost" href="../index.html#produkter">Se produkter</a>
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
            <a class="btn btn-primary btn-block" href="#booking">Find en tid</a>
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
          stofferne i dit eget lys — præcis der, hvor gardinerne skal hænge. Vores
          konsulent rådgiver om stil, funktion og mørklægning, måler nøjagtigt op
          og sørger for, at alt passer til dine vinduer.
        </p>
        <p>
          Vi dækker hele ${esc(city)} og omegn i ${esc(region)}, og du får det
          hele samlet i ét besøg: stof, syning, skinner og professionel montering
          i én fast pris uden skjulte gebyrer. Uanset om du ønsker lette gardiner
          til stuen, mørklægning til soveværelset eller persienner til køkkenet,
          finder vi den rigtige løsning sammen.
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
${faqHtml(city)}
        </div>
      </div>
    </section>

    <section class="section booking" id="booking">
      <div class="container booking-inner">
        <div class="booking-copy">
          <p class="eyebrow">Book hjemmebesøg i ${esc(city)}</p>
          <h2>Gratis og uforpligtende</h2>
          <p>
            Udfyld formularen, så ringer vi til dig og aftaler en tid i
            ${esc(city)}, der passer. Du er ikke bundet til noget — besøget
            koster ikke en krone.
          </p>
          <ul class="booking-points">
            <li>Vi ringer inden for 1 hverdag</li>
            <li>Prøver og rådgivning med hjemme</li>
            <li>Fast tilbud på stedet</li>
          </ul>
          <p class="booking-alt">
            Vil du hellere skrive? Send en mail til
            <a href="mailto:mail@bookgardinbussen.online">mail@bookgardinbussen.online</a>
          </p>
        </div>

        <form class="booking-form" id="booking-form" novalidate>
          <input type="hidden" name="city" value="${attr(city)}" />
          <div class="field field-hp" aria-hidden="true">
            <label for="company">Firma (lad stå tomt)</label>
            <input type="text" id="company" name="company" tabindex="-1" autocomplete="off" />
          </div>
          <div class="field">
            <label for="name">Navn</label>
            <input type="text" id="name" name="name" autocomplete="name" required />
          </div>
          <div class="field-row">
            <div class="field">
              <label for="phone">Telefon</label>
              <input type="tel" id="phone" name="phone" autocomplete="tel" required />
            </div>
            <div class="field">
              <label for="zip">Postnr.</label>
              <input type="text" id="zip" name="zip" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="postal-code" required />
            </div>
          </div>
          <div class="field">
            <label for="email">E-mail <span class="optional">(valgfrit)</span></label>
            <input type="email" id="email" name="email" autocomplete="email" />
          </div>
          <div class="field">
            <label for="message">Hvad drømmer du om? <span class="optional">(valgfrit)</span></label>
            <textarea id="message" name="message" rows="3" placeholder="F.eks. mørklægning i soveværelset og lette gardiner i stuen"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Send og bliv ringet op</button>
          <p class="form-note" id="form-note" role="status" aria-live="polite"></p>
          <p class="form-fineprint">Vi bruger kun dine oplysninger til at kontakte dig om din henvendelse. Læs vores <a href="../privatlivspolitik.html">privatlivspolitik</a>.</p>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-bottom" style="border:0;margin:0;padding-top:1.4rem">
      <p>© <span id="year"></span> Gardinbussen. Alle rettigheder forbeholdes.</p>
      <p class="footer-credit">Lavet af <a href="https://magnoramarketing.dk/" target="_blank" rel="noopener">magnoramarketing.dk</a></p>
    </div>
  </footer>
  <script src="../js/main.js" defer></script>
</body>
</html>
`;
}

// --- kør ---
if (!fs.existsSync(BYER_DIR)) fs.mkdirSync(BYER_DIR, { recursive: true });

const listItems = [];
for (const city of CITIES) {
  const slug = slugify(city);
  fs.writeFileSync(path.join(BYER_DIR, `${slug}.html`), pageTemplate(city));
  listItems.push(`          <li><a href="byer/${slug}.html">${esc(city)}</a></li>`);
}

// Injicér by-listen på forsiden mellem markørerne
const indexPath = path.join(ROOT, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
index = index.replace(
  /<!-- CITIES:START -->[\s\S]*?<!-- CITIES:END -->/,
  `<!-- CITIES:START -->\n${listItems.join("\n")}\n          <!-- CITIES:END -->`
);
fs.writeFileSync(indexPath, index);

// Regenerér sitemap.xml (basissider + by-sider)
const staticUrls = [
  { loc: `${SITE}/`, freq: "weekly", pri: "1.0" },
  { loc: `${SITE}/privatlivspolitik.html`, freq: "yearly", pri: "0.3" },
];
const cityUrls = CITIES.map((c) => ({
  loc: `${SITE}/byer/${slugify(c)}.html`, freq: "monthly", pri: "0.7",
}));
const urls = staticUrls.concat(cityUrls)
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`)
  .join("\n");
fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`Genererede ${CITIES.length} by-sider i byer/, opdaterede index.html og sitemap.xml.`);
