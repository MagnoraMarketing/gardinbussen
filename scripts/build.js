// Site-generator for hele sitet. Kør: node scripts/build.js
//
// Bygger ud fra scripts/site-data.js:
// - byer/*.html (én side pr. by i CITIES) + forsidens by-liste
// - blog/*.html (én side pr. indlæg i BLOG) + blog/index.html
// - nyheder.html (NEWS, illustrationer i scripts/news-art/)
// - llms.txt (til AI-søgemaskiner)
// og kører derefter seo-sections.js (SEO-sektion på alle sider) og
// seo-technical.js (titler, Search Console, forsidelinks, sitemap.xml).
//
// Forside, om-os, hvorfor-gardinbussen, tak og privatlivspolitik er
// håndskrevne; build.js rører kun forsidens by-liste (CITIES:START/END).
// Ny by: tilføj den i site-data.js (CITIES/REGION) og i city-profiles.js.
// Nyt blogindlæg: tilføj det i site-data.js. Kør derefter build.js.
// BUILD_DATE=ÅÅÅÅ-MM-DD overstyrer dags dato (dateModified/lastmod).

const fs = require("fs");
const path = require("path");
const D = require("./site-data");
const { HOME_TYPES, CITY_PROFILES } = require("./city-profiles");

const ROOT = path.join(__dirname, "..");
const BYER_DIR = path.join(ROOT, "byer");
const BLOG_DIR = path.join(ROOT, "blog");
const { SITE, CITIES, REGION, BLOG, NEWS, slugify, esc, attr, bookBtn, ctaCard, AFFILIATE_BOOK_URL } = D;
const { affiliateUrl, landsdel, citySupplierKey, DISCLOSURE_SHORT } = require("./supplier");
const BOOK = attr(AFFILIATE_BOOK_URL); // klar til href="" i skabeloner

// ---------- fælles skabelon-dele ----------
function head({ title, desc, url, relPrefix, jsonld, ogType = "website" }) {
  const ld = jsonld.map((o) => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-0PZWVB1XWK"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-0PZWVB1XWK');
  </script>
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(desc)}" />
  <meta name="theme-color" content="#2f5d50" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="bookgardinbussen.online" />
  <meta property="og:locale" content="da_DK" />
  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/assets/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="bookgardinbussen.online – guides til gardiner og gratis gardinbus-besøg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${attr(title)}" />
  <meta name="twitter:description" content="${attr(desc)}" />
  <meta name="twitter:image" content="${SITE}/assets/og-image.png" />
  <link rel="icon" href="${relPrefix}assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${relPrefix}css/styles.css" />
${ld}
</head>`;
}

function navList(relPrefix) {
  return `<ul class="nav-list" id="nav-list">
          <li><a href="${SITE}/">Forside</a></li>
          <li><a href="/#produkter">Produkter</a></li>
          <li><a href="${relPrefix}blog/index.html">Guides</a></li>
          <li><a href="${relPrefix}nyheder.html">Nyheder</a></li>
          <li><a href="/#omraade">Byer</a></li>
          <li><a href="${relPrefix}om-os.html">Om sitet</a></li>
          <li><a class="nav-cta" href="${BOOK}" target="_blank" rel="sponsored noopener" title="Åbner Gardinbus.nu (affiliate-link)">Book gratis besøg</a></li>
        </ul>`;
}

function header(relPrefix) {
  return `  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="bookgardinbussen.online forside">
        <span class="brand-text">bookgardinbussen<span>.online</span></span>
      </a>
      <nav class="site-nav" aria-label="Hovedmenu">
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-list">
          <span class="sr-only">Menu</span>
          <span class="nav-toggle-bar" aria-hidden="true"></span>
        </button>
        ${navList(relPrefix)}
      </nav>
    </div>
  </header>`;
}

function footerHtml(relPrefix) {
  return `  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="brand-text">bookgardinbussen<span>.online</span></span>
        <p>Uafhængige guides til gardiner, solafskærmning og gratis gardinbus-besøg.</p>
        <p>Besøg, prøver, opmåling og tilbud leveres af Gardinbus.nu. Du kan <a href="${BOOK}" target="_blank" rel="sponsored noopener">booke et gratis, uforpligtende besøg hos Gardinbus.nu</a>.</p>
        <p class="footer-disclosure">${esc(DISCLOSURE_SHORT)} <a href="${relPrefix}om-os.html#affiliate">Læs mere om, hvordan sitet tjener penge</a>.</p>
      </div>
      <div class="footer-col">
        <h2 class="footer-title">Sider</h2>
        <ul>
          <li><a href="${SITE}/">Forside</a></li>
          <li><a href="/#produkter">Produkter</a></li>
          <li><a href="${relPrefix}blog/index.html">Guides</a></li>
          <li><a href="${relPrefix}nyheder.html">Nyheder</a></li>
          <li><a href="/#omraade">Byer</a></li>
          <li><a href="${relPrefix}hvorfor-gardinbussen.html">Sådan foregår et gardinbus-besøg</a></li>
          <li><a href="${relPrefix}om-os.html">Om sitet</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-title">Kontakt</h2>
        <ul>
          <li><a href="mailto:mail@bookgardinbussen.online">mail@bookgardinbussen.online</a></li>
          <li><a href="${relPrefix}om-os.html#affiliate">Affiliate-oplysning</a></li>
          <li><a href="${relPrefix}privatlivspolitik.html">Privatlivs- og cookiepolitik</a></li>
          <li><a href="#" data-cookie-settings>Cookieindstillinger</a></li>
          <li><a href="${BOOK}" target="_blank" rel="sponsored noopener">Book besøg hos Gardinbus.nu</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> bookgardinbussen.online. Alle rettigheder forbeholdes.</p>
      <p class="footer-credit">Lavet af <a href="https://magnoramarketing.dk/" target="_blank" rel="noopener">magnoramarketing.dk</a></p>
    </div>
  </footer>`;
}

function footer(relPrefix) {
  return `${footerHtml(relPrefix)}
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
// Hver by har en lokal profil i scripts/city-profiles.js (intro, bydele,
// typiske boliger og et lokalt råd), så siderne ikke blot er samme tekst med
// nyt bynavn. Faste tekstblokke varieres med pick(), så nabobyer ikke får
// identiske afsnit.

// Vælg en tekstvariant ud fra en streng (samme by -> samme variant).
function pick(key, variants) {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return variants[h % variants.length];
}

const joinDa = (xs) => xs.length > 1 ? `${xs.slice(0, -1).join(", ")} og ${xs[xs.length - 1]}` : xs[0];

function cityProfile(city) {
  const p = CITY_PROFILES[city];
  if (!p) throw new Error(`Mangler profil i city-profiles.js for ${city}`);
  const homes = p.homes.map((k) => {
    if (!HOME_TYPES[k]) throw new Error(`Ukendt boligtype "${k}" for ${city}`);
    return { key: k, ...HOME_TYPES[k] };
  });
  // Populære løsninger: første endnu ikke valgte link fra hver boligtype.
  const popular = [];
  for (const h of homes) {
    const l = h.links.find(([s]) => !popular.some(([q]) => q === s));
    if (l) popular.push(l);
  }
  return { ...p, homes, popular };
}

// Navn på leverandørens regionale side til link-tekst.
const SUPPLIER_AREA_LABEL = {
  koebenhavn: "København", aarhus: "Aarhus", aalborg: "Aalborg", odense: "Odense",
  esbjerg: "Esbjerg", roskilde: "Roskilde", vejle: "Vejle",
  fyn: "Fyn", sjaelland: "Sjælland", jylland: "Jylland",
};

// Spørgsmål, der er gode at afklare før et besøg. Hver by får fem i
// forskellig rækkefølge.
const BEFORE_VISIT = [
  "Hvilke rum og vinduer skal have nyt — og hvad er det vigtigste: mørklægning, indkigsværn, varme eller udseende?",
  "Skal gardinet sidde i vinduesrammen, på væggen over vinduet eller i loftet?",
  "Åbnes vinduet ofte, eller er der en altan- eller terrassedør, der skal kunne bruges frit?",
  "Har du et prisniveau, du gerne vil holde dig inden for? Sig det gerne, så konsulenten kan vise prøver i den rigtige ende.",
  "Ønsker du montering? Spørg, hvilke betingelser der gælder for montering på det tidspunkt, du booker.",
  "Bor du til leje eller i andelsbolig? Tjek, om du må bore i vægge, lofter og karme.",
];

function cityPage(city) {
  const slug = slugify(city);
  const region = REGION[city] || "Danmark";
  const part = landsdel(city, region);
  const supplierKey = citySupplierKey(city, region);
  const supplierLabel = SUPPLIER_AREA_LABEL[supplierKey];
  const url = `${SITE}/byer/${slug}.html`;
  const p = cityProfile(city);
  const fullTitle = `Gardiner i ${city} – gratis hjemmebesøg og guide`;
  const title = fullTitle.length > 60 ? `Gardiner i ${city} – gratis hjemmebesøg` : fullTitle;
  const homeLower = p.homes[0].title.toLowerCase();
  // Meta-beskrivelse: én af tre varianter, men aldrig over 155 tegn (Google klipper).
  const descs = [
    `Nye gardiner i ${city}? Se løsninger til boligerne i ${p.areas[0]} og omegn, og book et gratis besøg med prøver og opmåling hos Gardinbus.nu.`,
    `Gardiner, plissé og persienner i ${city}: guide til ${homeLower} og info om gratis, uforpligtende gardinbus-besøg fra Gardinbus.nu.`,
    `Guide til gardiner i ${city}: typiske vinduer, gode løsninger og sådan booker du et gratis besøg med prøver og opmåling i ${part}.`,
    `Guide til gardiner i ${city} og sådan booker du et gratis, uforpligtende besøg med prøver og opmåling hos Gardinbus.nu.`,
  ];
  const fits = descs.slice(0, 3).filter((d) => d.length <= 155);
  const desc = fits.length ? pick(city, fits) : descs[3];
  const someAreas = joinDa(p.areas.slice(0, 4));
  const faq = faqBlock([
    { q: `Kører gardinbussen til ${city}?`, a: `Gardinbus.nu oplyser, at deres gardinbusser dækker hele ${part} — også mindre byer og landområder. ${city} og områder som ${someAreas} ligger i det område. Leverandøren bekræfter din adresse, når du booker.` },
    { q: `Hvilke gardiner passer til ${homeLower} i ${city}?`, a: `${p.homes[0].text} Ved et besøg kan du få konsulentens vurdering af netop dine vinduer.` },
    pick(city + "f1", [
      { q: `Hvad koster et besøg i ${city}?`, a: `Ifølge Gardinbus.nu er besøg, rådgivning, opmåling og tilbud gratis og uforpligtende. Du betaler kun, hvis du takker ja til tilbuddet.` },
      { q: `Er besøget i ${city} virkelig gratis?`, a: `Ja, Gardinbus.nu oplyser, at besøget, rådgivningen, opmålingen og tilbuddet er gratis og uforpligtende. Du kan sige nej tak uden at skylde noget.` },
      { q: `Hvad skal jeg betale for at få et tilbud i ${city}?`, a: `Ingenting for selve tilbuddet. Gardinbus.nu oplyser, at besøg, opmåling og tilbud er gratis. Først hvis du accepterer tilbuddet, betaler du for gardinerne efter leverandørens betingelser.` },
    ]),
    pick(city + "f2", [
      { q: `Hvordan booker jeg et besøg i ${city}?`, a: `Du udfylder bookingformularen hos Gardinbus.nu med adresse og antal vinduer. Leverandøren kontakter dig derefter for at aftale et tidspunkt.` },
      { q: `Hvordan aftaler jeg en tid i ${city}?`, a: `Når du har sendt en booking via Gardinbus.nu, kontakter leverandøren dig for at finde et tidspunkt, der passer. Har du særlige ønsker til tidspunkt, så skriv det i bookingen.` },
    ]),
    pick(city + "f3", [
      { q: `Kan jeg få gardinerne monteret i ${city}?`, a: `Ja, Gardinbus.nu tilbyder montering. Leverandøren oplyser, at montering er gratis ved udvalgte bookingtider — ellers fremgår prisen af tilbuddet. Tjek betingelserne, når du booker.` },
      { q: `Skal jeg selv måle mine vinduer op?`, a: `Nej. Opmålingen er en del af det gratis besøg fra Gardinbus.nu, så gardinerne kan laves efter mål. Det er en god idé at have overvejet, hvor gardinet skal sidde (ramme, væg eller loft).` },
    ]),
    { q: "Hvem står bag denne side?", a: "bookgardinbussen.online er et uafhængigt guide-site, der samarbejder med Gardinbus.nu som affiliate-partner. Besøg, tilbud og levering aftales direkte med Gardinbus.nu." },
  ]);
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage",
    name: title, description: desc, url, inLanguage: "da-DK",
    isPartOf: { "@type": "WebSite", name: "bookgardinbussen.online", url: `${SITE}/` },
    about: { "@type": "Place", name: city },
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: `Gardiner i ${city}`, item: url },
    ],
  };
  const homeCards = p.homes.map((h) => `          <article class="home-card">
            <p class="home-card-tag">Typisk i ${esc(city)}</p>
            <h3>${esc(h.title)}</h3>
            <p>${esc(h.text)}</p>
            <p class="home-card-links">${h.links.map(([s, l]) => `<a href="../blog/${s}.html">${esc(l)}</a>`).join(" ")}</p>
          </article>`).join("\n");
  const chips = p.areas.map((a) => `<li>${esc(a)}</li>`).join("");
  const start = [...city].reduce((n, ch) => n + ch.charCodeAt(0), 0) % BEFORE_VISIT.length;
  const checklist = BEFORE_VISIT.slice(start).concat(BEFORE_VISIT.slice(0, start)).slice(0, 5);
  const offer = pick(city + "t", [
    `Prisen på gardiner afhænger af vinduernes størrelse, gardintypen og stoffet. Derfor findes der ikke én listepris — et retvisende tilbud kræver, at nogen har set dine vinduer i ${city} og målt op. Det er netop formålet med det gratis besøg fra Gardinbus.nu, hvor du får et uforpligtende tilbud og kan tage dig tid til at sammenligne.`,
    `Et godt tilbud på gardiner i ${city} starter med en præcis opmåling. Ved besøget fra Gardinbus.nu viser konsulenten prøver i forskellige prisklasser, måler op og giver et uforpligtende tilbud på ét vindue eller hele boligen. Montering kan tilvælges — tjek betingelserne i tilbuddet.`,
    `Vil du sammenligne priser på gardiner i ${city}, så bed om et tilbud, der viser gardintype, stof, mål og montering hver for sig. Så kan du holde det op mod andre tilbud. Besøget fra Gardinbus.nu er gratis og uforpligtende, så det koster ikke noget at få et konkret tal at sammenligne med.`,
  ]);
  return `${head({ title, desc, url, relPrefix: "../", jsonld: [webPage, breadcrumb, faq.ld] })}
<body>
  <a class="skip-link" href="#main">Gå til indhold</a>
${header("../")}
  <main id="main">
    <nav class="breadcrumb container" aria-label="Sti">
      <a href="/">Forside</a> <span aria-hidden="true">›</span>
      <a href="/#omraade">Byer</a> <span aria-hidden="true">›</span>
      <span>${esc(city)}</span>
    </nav>

    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Gardinguide til ${esc(city)} · ${esc(part)}</p>
          <h1>Gardiner i ${esc(city)} — guide og gratis hjemmebesøg</h1>
          <p class="lead">
            ${esc(p.intro)} Her får du overblik over de gardinløsninger, der passer
            til boligerne i ${esc(city)}, og hvordan du kan få besøg af en gardinbus
            fra Gardinbus.nu med prøver og opmåling.
          </p>
          <div class="hero-actions">
            ${bookBtn(`Book gratis besøg i ${city}`, "btn-primary")}
            <a class="btn btn-ghost" href="#boliger">Se løsninger i ${esc(city)}</a>
          </div>
          <ul class="hero-badges">
            <li>Gratis besøg og opmåling</li>
            <li>Uforpligtende tilbud</li>
            <li>Leveres af Gardinbus.nu</li>
          </ul>
        </div>
        <div class="hero-card">
          <div class="hero-card-inner">
            <p class="hero-card-tag">Sådan foregår det</p>
            <ol class="hero-steps">
              <li><span>1</span> Du booker hos Gardinbus.nu</li>
              <li><span>2</span> Leverandøren aftaler en tid med dig</li>
              <li><span>3</span> Prøver, opmåling og et uforpligtende tilbud</li>
            </ol>
            ${bookBtn("Gå til booking", "btn-primary btn-block")}
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="boliger">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Boliger i ${esc(city)}</p>
          <h2>Gardinløsninger til hjemmene i ${esc(city)}</h2>
          <p class="section-sub">Vinduerne i ${esc(city)} er lige så forskellige som boligerne. Her er de løsninger, der ofte giver mening til de typiske hjem i byen og omegnen.</p>
        </header>
        <div class="home-grid">
${homeCards}
        </div>
        <aside class="city-tip" aria-label="Lokalt råd">
          <p class="city-tip-tag">Råd til dig i ${esc(city)}</p>
          <p>${esc(p.tip)}</p>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container city-area">
        <div class="city-area-copy legal">
          <h2>Kommer gardinbussen til ${esc(city)}?</h2>
          <p>Gardinbus.nu oplyser, at deres gardinbusser kører i hele ${esc(part)} — også i mindre byer og landområder. ${esc(city)} ligger i ${esc(part)}, så du kan som udgangspunkt booke et besøg, uanset om du bor centralt eller i ${esc(joinDa(p.areas.slice(-3)))}. Leverandøren bekræfter din adresse, når du booker.</p>
          <p><a href="${attr(affiliateUrl(supplierKey))}" target="_blank" rel="sponsored noopener">Læs Gardinbus.nu's side om ${esc(supplierLabel)}</a></p>
          <ul class="area-chips" aria-label="Bydele og nabobyer">${chips}</ul>
        </div>
        <dl class="city-facts">
          <div><dt>Område</dt><dd>${esc(city)} · ${esc(part)}</dd></div>
          <div><dt>Typiske boliger</dt><dd>${esc(p.homes.map((h) => h.title).join(", "))}</dd></div>
          <div><dt>Populære løsninger</dt><dd>${p.popular.map(([s, l]) => `<a href="../blog/${s}.html">${esc(l)}</a>`).join(", ")}</dd></div>
          <div><dt>Besøget</dt><dd>Gratis og uforpligtende (ifølge Gardinbus.nu)</dd></div>
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="container legal">
        <h2>Tilbud på gardiner i ${esc(city)}</h2>
        <p>${esc(offer)}</p>
        <h3>Afklar dette før besøget i ${esc(city)}</h3>
        <ul class="area-list city-usp">
${checklist.map((u) => `          <li>${esc(u)}</li>`).join("\n")}
        </ul>
        <p>Læs mere i guiderne <a href="../blog/opmaaling-af-gardiner.html">Før opmåling af gardiner</a> og <a href="../blog/hvad-koster-gardiner.html">Hvad koster gardiner?</a>.</p>
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
          <p class="eyebrow">Book besøg i ${esc(city)}</p>
          <h2>Gratis og uforpligtende besøg fra Gardinbus.nu</h2>
          <p>${esc(pick(city + "b", [
            `Du booker besøget i ${city} hos Gardinbus.nu. Leverandøren kontakter dig for at aftale en tid og kommer derefter med prøver, måler op og giver et uforpligtende tilbud.`,
            `Når du har booket hos Gardinbus.nu, aftaler leverandøren en tid med dig. Ved besøget i ${city} ser du prøverne i dit eget lys og får et uforpligtende tilbud.`,
          ]))}</p>
          <ul class="booking-points">
            <li>Gratis besøg, rådgivning og opmåling</li>
            <li>Prøver på stoffer og farver i dit eget hjem</li>
            <li>Uforpligtende tilbud</li>
          </ul>
          <p class="booking-alt">
            Spørgsmål om booking, tilbud og levering besvares af Gardinbus.nu.
            Spørgsmål til denne side: <a href="mailto:mail@bookgardinbussen.online">mail@bookgardinbussen.online</a>
          </p>
        </div>
${ctaCard(`Book besøg i ${city}`, `Gå videre til Gardinbus.nu og book et gratis besøg i ${city}.`)}
      </div>
    </section>
  </main>
${footer("../")}`;
}

// ---------- nyheder ----------
// Tekst med links skrevet som [tekst](url) -> HTML.
function inline(text) {
  return esc(text).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => `<a href="${attr(href)}">${label}</a>`);
}

function newsArt(item) {
  const artFile = path.join(__dirname, "news-art", `${item.slug}.svg`);
  if (fs.existsSync(artFile)) {
    return `<svg class="news-art" viewBox="0 0 600 400" role="img" aria-label="${attr(item.title)}">
${fs.readFileSync(artFile, "utf8")}      </svg>`;
  }
  const [a, b] = item.accent || ["#dbe2d4", "#b7cbb0"];
  return `<svg class="news-art" viewBox="0 0 600 400" role="img" aria-label="${attr(item.title)}">
        <rect width="600" height="400" fill="${a}"/>
        <rect x="70" y="50" width="460" height="300" rx="12" fill="#ffffff" opacity="0.35"/>
        <g fill="${b}">
          <rect x="90" y="66" width="26" height="270" rx="6"/>
          <rect x="126" y="66" width="26" height="270" rx="6"/>
          <rect x="162" y="66" width="26" height="270" rx="6"/>
          <rect x="198" y="66" width="26" height="270" rx="6"/>
          <rect x="234" y="66" width="26" height="270" rx="6"/>
          <rect x="270" y="66" width="26" height="270" rx="6"/>
          <rect x="306" y="66" width="26" height="270" rx="6"/>
          <rect x="342" y="66" width="26" height="270" rx="6"/>
          <rect x="378" y="66" width="26" height="270" rx="6"/>
          <rect x="414" y="66" width="26" height="270" rx="6"/>
          <rect x="450" y="66" width="26" height="270" rx="6"/>
          <rect x="486" y="66" width="26" height="270" rx="6"/>
        </g>
        <rect x="62" y="44" width="476" height="14" rx="7" fill="${b}"/>
      </svg>`;
}

function newsPage() {
  const url = `${SITE}/nyheder.html`;
  const rows = NEWS.map((item) => {
    const paras = item.body.map((p) => `          <p>${esc(p)}</p>`).join("\n");
    const offer = item.offer
      ? `\n          <h3>${esc(item.offer.h)}</h3>\n          <p>${inline(item.offer.text)}</p>`
      : "";
    const related = item.related && item.related.length ? `
          <div class="news-related">
            <p>Læs også</p>
            <div class="news-related-links">
${item.related.map((r) => `            <a href="${attr(r.href)}">${esc(r.label)}</a>`).join("\n")}
            </div>
          </div>` : "";
    const link = item.link.href === "book"
      ? bookBtn(item.link.text, "btn-ghost", item.supplier)
      : `<a class="btn btn-ghost" href="${item.link.href}">${esc(item.link.text)}</a>`;
    return `      <article class="news-row" id="${item.slug}">
        <div class="news-media">
          ${newsArt(item)}
        </div>
        <div class="news-text">
          <h2>${esc(item.title)}</h2>
${paras}${offer}
          <p class="news-actions">${link}</p>${related}
        </div>
      </article>`;
  }).join("\n");

  const itemList = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: NEWS.map((n, i) => ({ "@type": "ListItem", position: i + 1, name: n.title, url: `${url}#${n.slug}` })),
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Nyheder", item: url },
    ],
  };
  return `${head({
    title: "Nyheder & inspiration om gardiner | Gardinbussen",
    desc: "Nyheder og inspiration om gardiner: plisségardiner, lamelgardiner, motoriserede løsninger, mørklægning, insektnet og hyggelige gardinløsninger til hjemmet.",
    url, relPrefix: "", jsonld: [itemList, breadcrumb],
  })}
<body>
  <a class="skip-link" href="#nyheder">Gå til indhold</a>
${header("")}
  <main id="main">
    <nav class="breadcrumb container" aria-label="Sti">
      <a href="/">Forside</a> <span aria-hidden="true">›</span>
      <span>Nyheder</span>
    </nav>

    <section class="section">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Nyheder & inspiration</p>
          <h1>Nyt om gardiner, lys og indeklima</h1>
          <p class="section-sub">Bliv inspireret af trends og løsninger til vinduerne — og se, hvordan du kan få et gratis besøg med prøver fra Gardinbus.nu, når du er klar.</p>
        </header>
        <div class="news-list" id="nyheder">
${rows}
        </div>
      </div>
    </section>

    <section class="section section-alt booking" id="booking">
      <div class="container booking-inner">
        <div class="booking-copy">
          <p class="eyebrow">Gratis hjemmebesøg</p>
          <h2>Se løsningerne i dit eget hjem</h2>
          <p>Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor en konsulent viser prøver, måler op og giver et tilbud. Du booker hos Gardinbus.nu, som derefter kontakter dig for at aftale en tid.</p>
          <ul class="booking-points">
            <li>Gratis besøg, rådgivning og opmåling</li>
            <li>Prøver på stoffer og farver i dit eget lys</li>
            <li>Uforpligtende tilbud</li>
          </ul>
        </div>
${ctaCard("Book et gardinbesøg", "Gå videre til Gardinbus.nu og book et gratis besøg.")}
      </div>
    </section>
  </main>
${footer("")}`;
}

// ---------- blog ----------
// Knaptekst til leverandørsiden, som indlæggets `supplier` peger på.
const SUPPLIER_CTA = {
  gardiner: "Se gardiner hos Gardinbus.nu",
  persienner: "Se persienner hos Gardinbus.nu",
  luxaflex: "Se Luxaflex hos Gardinbus.nu",
  insektnet: "Se insektnet hos Gardinbus.nu",
  produkter: "Se produktudvalget hos Gardinbus.nu",
  faq: "Læs Gardinbus.nu's svar på ofte stillede spørgsmål",
  book: "Gå til booking hos Gardinbus.nu",
};

function blogPost(post) {
  if (!SUPPLIER_CTA[post.supplier || "book"]) throw new Error(`Ukendt supplier "${post.supplier}" i blog/${post.slug}`);
  const url = `${SITE}/blog/${post.slug}.html`;
  const faq = faqBlock(post.faq);
  const block = (p) => typeof p === "string"
    ? `        <p>${esc(p)}</p>`
    : `        <ul class="area-list city-usp">\n${p.list.map((li) => `          <li>${esc(li)}</li>`).join("\n")}\n        </ul>`;
  const pullQuote = post.pullQuote
    ? `\n        <div class="pull-quote">\n          <p>${esc(post.pullQuote)}</p>\n        </div>`
    : "";
  const sectionsHtml = post.sections.map((s, i) =>
    `        <h2>${esc(s.h)}</h2>\n${s.p.map(block).join("\n")}${i === 0 ? pullQuote : ""}`
  ).join("\n");
  const cat = BLOG_CATEGORIES.find((c) => c.name === post.category);
  const hero = cat && cat.img
    ? `    <div class="container">\n      <img class="article-hero" src="../assets/blog/${cat.img}" alt="${attr(`${cat.alt} – ${post.tag}`)}" fetchpriority="high" decoding="async" width="1200" height="400" />\n    </div>\n\n`
    : "";
  const related = post.related ? `        <div class="related-reads">
          <h2>Læs også</h2>
          <p>${esc(post.related.text)}</p>
          <div class="related-grid">
${post.related.links.map((l) => `          <a class="related-card" href="${l.slug}.html"><span>${esc(l.label)}</span><em>Læs guiden →</em></a>`).join("\n")}
          </div>
        </div>

` : "";
  const introHtml = post.intro.map((p) => `        <p class="lead">${esc(p)}</p>`).join("\n");
  const article = {
    "@context": "https://schema.org", "@type": "Article",
    headline: post.h1, description: post.desc, image: `${SITE}/assets/og-image.png`,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Redaktionen på bookgardinbussen.online", url: `${SITE}/om-os.html` },
    publisher: { "@type": "Organization", name: "bookgardinbussen.online", url: `${SITE}/`, logo: { "@type": "ImageObject", url: `${SITE}/assets/logo.png`, width: 512, height: 512 } },
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/index.html` },
      { "@type": "ListItem", position: 3, name: post.tag, item: url },
    ],
  };
  return `${head({ title: post.metaTitle, desc: post.desc, url, relPrefix: "../", jsonld: [article, breadcrumb, faq.ld], ogType: "article" })}
<body>
  <a class="skip-link" href="#booking">Gå til booking</a>
${header("../")}
  <main id="main">
    <nav class="breadcrumb container" aria-label="Sti">
      <a href="/">Forside</a> <span aria-hidden="true">›</span>
      <a href="index.html">Blog</a> <span aria-hidden="true">›</span>
      <span>${esc(post.tag)}</span>
    </nav>

${hero}    <article class="section">
      <div class="container legal">
        <p class="eyebrow">${esc(post.eyebrow || `Guide · ${post.tag}`)}</p>
        <h1>${esc(post.h1)}</h1>
${introHtml}
${sectionsHtml}

        <h2>Ofte stillede spørgsmål</h2>
        <div class="faq">
${faq.html}
        </div>

${related}        <p class="blog-cta-note">${esc(post.ctaNote || `Vil du se ${post.tag.toLowerCase()} i dit eget hjem? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.`)}</p>
        <p class="blog-supplier-link">${bookBtn(SUPPLIER_CTA[post.supplier || "book"], "btn-ghost", post.supplier)}</p>
      </div>
    </article>

    <section class="section section-alt booking" id="booking">
      <div class="container booking-inner">
        <div class="booking-copy">
          <p class="eyebrow">Gratis hjemmebesøg</p>
          <h2>Få et uforpligtende tilbud fra Gardinbus.nu</h2>
          <p>${esc(post.bookingText || "Du booker besøget hos Gardinbus.nu. Leverandøren kontakter dig for at aftale en tid og kommer derefter med prøver, måler op og giver et uforpligtende tilbud.")}</p>
          <ul class="booking-points">
            <li>Gratis besøg, rådgivning og opmåling</li>
            <li>Prøver på stoffer og farver i dit eget lys</li>
            <li>Uforpligtende tilbud</li>
          </ul>
          <p class="booking-alt">
            Spørgsmål om booking, tilbud og levering besvares af Gardinbus.nu.
            Spørgsmål til artiklen: <a href="mailto:mail@bookgardinbussen.online">mail@bookgardinbussen.online</a>
          </p>
        </div>
${ctaCard("Book et gardinbesøg", post.ctaLead || `Se ${post.tag.toLowerCase()} i dit eget hjem — book et gratis besøg hos Gardinbus.nu.`)}
      </div>
    </section>
  </main>
${footer("../")}`;
}

// Kategorier vises i denne rækkefølge på blog-oversigten, hver med sin egen
// overskrift og undertekst. Nye kategorier tilføjes blot her.
// img/alt er illustrationen øverst i hvert indlæg i kategorien (assets/blog/).
const BLOG_CATEGORIES = [
  { name: "Gardintyper", sub: "Produktguides til hver type gardin — find den løsning der passer til dine vinduer.",
    img: "gardintyper.svg", alt: "Illustration af gardiner ved et vindue" },
  { name: "Rum, vinduer & opmåling", sub: "Guides til bestemte rum og vinduer — og til det, du skal overveje før opmåling.",
    img: "gardintyper.svg", alt: "Illustration af gardiner ved et vindue" },
  { name: "Solfilm & solafskærmning", sub: "Hold varmen og solen ude: guider til solfilm, privatlivsfilm og solafskærmning til dine vinduer.",
    img: "solafskaermning.svg", alt: "Illustration af solafskærmning og solfilm på et vindue" },
  { name: "Trends & smart home", sub: "De nyeste trends i hjemmet — fra motoriserede gardiner til smarte løsninger for lys og varme.",
    img: "smart-home.svg", alt: "Illustration af smart home-styring af gardiner" },
  { name: "Efterår – guides & fordele", sub: "Praktiske guider til gardiner om efteråret: mørklægning, varme og et lunt indeklima.",
    img: "efteraar-guides.svg", alt: "Illustration af gardiner om efteråret" },
  { name: "Efterår – inspiration", sub: "Inspiration til efterårets stemning, farver og trends i hjemmet.",
    img: "efteraar-inspiration.svg", alt: "Illustration af efterårets farvepalet til gardiner" },
  { name: "Pris & kvalitet", sub: "Hjælp til at vælge mellem billige gardiner og gardiner i god kvalitet.",
    img: "pris-kvalitet.svg", alt: "Illustration af pris og kvalitet" },
];

function blogIndex() {
  const url = `${SITE}/blog/index.html`;
  const card = (p) => `          <a class="blog-card" href="${p.slug}.html">
            <h3>${esc((p.card && p.card.title) || p.tag)}</h3>
            <p>${esc((p.card && p.card.desc) || p.desc)}</p>
            <span class="blog-card-link">Læs mere →</span>
          </a>`;

  // Grupper indlæg efter kategori. Ukendte/ukategoriserede lander til sidst.
  const seen = new Set(BLOG_CATEGORIES.map((c) => c.name));
  const cats = [...BLOG_CATEGORIES];
  for (const p of BLOG) {
    const c = p.category || "Andet";
    if (!seen.has(c)) { seen.add(c); cats.push({ name: c, sub: "" }); }
  }

  const sections = cats.map((cat, idx) => {
    const posts = BLOG.filter((p) => (p.category || "Andet") === cat.name);
    if (!posts.length) return "";
    const gridId = idx === 0 ? ' id="blog-list"' : "";
    const sub = cat.sub ? `\n          <p class="section-sub">${esc(cat.sub)}</p>` : "";
    return `    <section class="section${idx % 2 ? "" : " section-alt"}">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Kategori</p>
          <h2>${esc(cat.name)}</h2>${sub}
        </header>
        <div class="blog-grid"${gridId}>
${posts.map(card).join("\n")}
        </div>
      </div>
    </section>`;
  }).filter(Boolean);
  sections.push(`    <section class="section${sections.length % 2 ? "" : " section-alt"}">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Gratis hjemmebesøg</p>
          <h2>Sådan får du et tilbud på gardiner — billige eller i god kvalitet</h2>
          <p class="section-sub">Læs, hvordan et gratis og uforpligtende besøg fra Gardinbus.nu foregår, hvad du kan forvente, og hvad du med fordel kan afklare på forhånd.</p>
        </header>
        <p class="section-cta">
          <a class="btn btn-primary" href="../hvorfor-gardinbussen.html">Sådan foregår et gardinbus-besøg</a>
        </p>
      </div>
    </section>`);

  const itemList = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: BLOG.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/blog/${p.slug}.html`, name: p.tag })),
  };
  return `${head({
    title: "Blog: Guides og inspiration om gardiner | bookgardinbussen.online",
    desc: "Uafhængige guides om gardiner: gardintyper, solafskærmning, mørklægning, pris og kvalitet. Find den rigtige løsning til dine vinduer.",
    url, relPrefix: "../", jsonld: [itemList],
  })}
<body>
  <a class="skip-link" href="#blog-list">Gå til indhold</a>
${header("../")}
  <main id="main">
    <nav class="breadcrumb container" aria-label="Sti">
      <a href="/">Forside</a> <span aria-hidden="true">›</span>
      <span>Blog</span>
    </nav>

    <section class="section">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Blog</p>
          <h1>Guides og inspiration om gardiner</h1>
          <p class="section-sub">Alle vores guides samlet efter kategori — fra valg af gardintype til solafskærmning, pris og kvalitet.</p>
        </header>
      </div>
    </section>

${sections.join("\n\n")}
  </main>
${footer("../")}`;
}

// ---------- llms.txt (til AI-søgemaskiner: llmstxt.org) ----------
function llmsTxt() {
  const lines = [];
  lines.push("# bookgardinbussen.online");
  lines.push("");
  lines.push("> Uafhængigt dansk guide-site om gardiner, solafskærmning og gratis gardinbus-besøg. bookgardinbussen.online er et informations- og affiliatesite og henviser via affiliate-links til Gardinbus.nu, som leverer selve servicen: gratis og uforpligtende hjemmebesøg med prøver, opmåling og tilbud.");
  lines.push("");
  lines.push("## Om");
  lines.push("- bookgardinbussen.online udfører ikke selv opmåling, produktion eller montering");
  lines.push("- Leverandør: Gardinbus.nu (https://gardinbus.nu/) — oplyser at dække Jylland, Fyn og Sjælland");
  lines.push("- Ifølge Gardinbus.nu er besøg, rådgivning, opmåling og tilbud gratis og uforpligtende");
  lines.push("- Sitet kan modtage provision, når besøgende booker via affiliate-links (Partner-ads)");
  lines.push(`- Forside: ${SITE}/`);
  lines.push(`- Om sitet og affiliate-oplysning: ${SITE}/om-os.html`);
  lines.push(`- Sådan foregår et gardinbus-besøg: ${SITE}/hvorfor-gardinbussen.html`);
  lines.push("- Kontakt: mail@bookgardinbussen.online");
  lines.push("");
  for (const cat of BLOG_CATEGORIES) {
    const posts = BLOG.filter((p) => (p.category || "Andet") === cat.name);
    if (!posts.length) continue;
    lines.push(`## ${cat.name}`);
    for (const p of posts) {
      lines.push(`- [${(p.card && p.card.title) || p.tag}](${SITE}/blog/${p.slug}.html): ${p.llmsDesc || p.desc}`);
    }
    lines.push("");
  }
  lines.push("## Byguides");
  lines.push(CITIES.map((c) => `- [${c}](${SITE}/byer/${slugify(c)}.html)`).join("\n"));
  lines.push("");
  return lines.join("\n");
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

// Håndskrevne sider får samme menu og footer som de genererede, så
// navigation og affiliate-oplysning er ens overalt.
for (const f of ["index.html", "om-os.html", "hvorfor-gardinbussen.html", "tak.html", "privatlivspolitik.html", "404.html"]) {
  const file = path.join(ROOT, f);
  // 404.html vises under vilkårlige stier, så den skal have rod-relative links.
  const pre = f === "404.html" ? "/" : "";
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<ul class="nav-list" id="nav-list">[\s\S]*?<\/ul>/, () => navList(pre))
    .replace(/  <footer class="site-footer">[\s\S]*?<\/footer>/, () => footerHtml(pre));
  fs.writeFileSync(file, html);
}

// blog
for (const post of BLOG) {
  fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.html`), blogPost(post));
}
fs.writeFileSync(path.join(BLOG_DIR, "index.html"), blogIndex());

// nyheder
fs.writeFileSync(path.join(ROOT, "nyheder.html"), newsPage());

// llms.txt (AI-søgemaskiner)
fs.writeFileSync(path.join(ROOT, "llms.txt"), llmsTxt());

// SEO-sektioner, teknisk SEO og sitemap.xml (kører efter skabelonerne).
const { execFileSync } = require("child_process");
for (const script of ["seo-sections.js", "seo-technical.js"]) {
  execFileSync(process.execPath, [path.join(__dirname, script)], { stdio: "inherit" });
}

console.log(`Genererede ${CITIES.length} by-sider og ${BLOG.length} blogindlæg. Opdaterede index.html, nyheder.html, llms.txt og sitemap.xml.`);
console.log(`Alle book-CTA'er peger på: ${AFFILIATE_BOOK_URL}`);
