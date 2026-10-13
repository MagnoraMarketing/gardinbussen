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
  <meta property="og:image:alt" content="Gardinbussen – vi kører gardinbutikken hjem til dig" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${attr(title)}" />
  <meta name="twitter:description" content="${attr(desc)}" />
  <meta name="twitter:image" content="${SITE}/assets/og-image.png" />
  <link rel="icon" href="${relPrefix}assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${relPrefix}css/styles.css" />
${ld}
</head>`;
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
        <ul class="nav-list" id="nav-list">
          <li><a href="${SITE}/">Forside</a></li>
          <li><a href="/#produkter">Produkter</a></li>
          <li><a href="${relPrefix}blog/index.html">Blog</a></li>
          <li><a href="${relPrefix}nyheder.html">Nyheder</a></li>
          <li><a href="/#omraade">Byer</a></li>
          <li><a href="${relPrefix}om-os.html">Om os</a></li>
          <li><a class="nav-cta" href="${BOOK}" target="_blank" rel="noopener sponsored">Book hjemmebesøg</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function footer(relPrefix) {
  return `  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="brand-text">bookgardinbussen<span>.online</span></span>
        <p>Vi kører gardinbutikken hjem til dig.</p>
        <p>Uanset om du leder efter billige gardiner eller gardiner i god kvalitet, får du gratis rådgivning, opmåling og montering hjemme hos dig. <a href="${BOOK}" target="_blank" rel="noopener sponsored">Book Gardinbussen</a> og få et gratis, uforpligtende tilbud.</p>
      </div>
      <div class="footer-col">
        <h4>Sider</h4>
        <ul>
          <li><a href="${SITE}/">Forside</a></li>
          <li><a href="/#produkter">Produkter</a></li>
          <li><a href="${relPrefix}blog/index.html">Blog</a></li>
          <li><a href="${relPrefix}nyheder.html">Nyheder</a></li>
          <li><a href="/#omraade">Byer</a></li>
          <li><a href="${relPrefix}om-os.html">Om os</a></li>
          <li><a href="${relPrefix}hvorfor-gardinbussen.html">Hvorfor Gardinbussen</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <ul>
          <li><a href="mailto:mail@bookgardinbussen.online">mail@bookgardinbussen.online</a></li>
          <li><a href="${relPrefix}privatlivspolitik.html">Privatlivspolitik</a></li>
          <li><a href="${BOOK}" target="_blank" rel="noopener sponsored">Book hjemmebesøg</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> bookgardinbussen.online. Alle rettigheder forbeholdes.</p>
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

function cityPage(city) {
  const slug = slugify(city);
  const region = REGION[city] || "Danmark";
  const url = `${SITE}/byer/${slug}.html`;
  const p = cityProfile(city);
  const fullTitle = `Gardiner i ${city} – gratis hjemmebesøg | Gardinbussen`;
  const title = fullTitle.length > 60 ? `Gardiner i ${city} – gratis hjemmebesøg` : fullTitle;
  const homeLower = p.homes[0].title.toLowerCase();
  const desc = pick(city, [
    `Nye gardiner i ${city}? Gardinbussen kommer hjem med prøver, måler op og monterer — også i ${p.areas[0]} og ${p.areas[1]}. Gratis og uforpligtende besøg.`,
    `Gardiner, plissé og persienner i ${city} og omegn. Gratis hjemmebesøg med prøver, opmåling og fast pris — vi kender ${homeLower} i ${city}.`,
    `Book gratis besøg af Gardinbussen i ${city}: prøver, rådgivning, opmåling og montering hjemme hos dig i ${city}, ${p.areas[0]} og resten af ${region}.`,
  ]);
  const someAreas = joinDa(p.areas.slice(0, 4));
  const faq = faqBlock([
    { q: `Kører Gardinbussen til ${city}?`, a: `Ja. Vi kommer i hele ${city} og omegn — blandt andet ${someAreas} — og i resten af ${region}. Besøget foregår hjemme hos dig.` },
    { q: `Hvilke gardiner passer til ${homeLower} i ${city}?`, a: `${p.homes[0].text} Ved besøget ser vi på netop dine vinduer og anbefaler den løsning, der passer bedst.` },
    pick(city + "f1", [
      { q: `Hvad koster et hjemmebesøg i ${city}?`, a: `Besøget er gratis og uforpligtende. Du får en fast pris på stedet med opmåling og montering, og du bestemmer selv, om du vil gå videre.` },
      { q: `Er besøget i ${city} virkelig gratis?`, a: `Ja. Det koster ikke noget at få Gardinbussen på besøg i ${city}, og du forpligter dig ikke til at købe. Du får en fast pris, inden du beslutter dig.` },
      { q: `Hvad skal jeg betale for at få et tilbud i ${city}?`, a: `Ingenting. Prøver, rådgivning, opmåling og tilbud er gratis. Først hvis du siger ja til tilbuddet, betaler du for gardinerne og monteringen.` },
    ]),
    pick(city + "f2", [
      { q: `Kan I komme om aftenen eller i weekenden i ${city}?`, a: `Ja. Når du booker, vælger du selv en tid, der passer dig — også uden for almindelig arbejdstid.` },
      { q: `Hvordan booker jeg et besøg i ${city}?`, a: `Du booker online på under et minut og vælger selv dag og tidspunkt. Derefter kommer Gardinbussen hjem til dig i ${city} med prøverne.` },
      { q: `Hvor lang tid tager et besøg?`, a: `Det afhænger af, hvor mange vinduer du vil have kigget på. Vi tager os tid til at vise prøver, måle op og give et samlet tilbud, mens vi er hos dig.` },
    ]),
    pick(city + "f3", [
      { q: `Måler og monterer I også gardinerne?`, a: `Ja. Vi måler professionelt op, gardinerne laves efter mål, og vi står for monteringen, så du får et færdigt resultat uden besvær.` },
      { q: `Skal jeg selv måle mine vinduer op i ${city}?`, a: `Nej. Vi måler alle vinduer op ved besøget, så gardinerne passer præcist. Monteringen klarer vi også.` },
      { q: `Hvem sætter gardinerne op?`, a: `Det gør vi. Opmåling og montering er en del af tilbuddet, så du ikke selv skal bore eller justere noget.` },
    ]),
    pick(city + "f4", [
      { q: `Er jeg bundet til at købe noget?`, a: `Nej. Både besøg, rådgivning og tilbud er uforpligtende.` },
      { q: `Hvad hvis jeg ikke vil købe efter besøget?`, a: `Så siger du bare nej tak. Besøget i ${city} er uforpligtende, og du skylder ingenting.` },
      { q: `Kan jeg få et tilbud på hele huset på én gang?`, a: `Ja. Vi kigger gerne på alle rum ved samme besøg og giver ét samlet tilbud, så du kan se den samlede pris for hele hjemmet i ${city}.` },
    ]),
  ]);
  // Service (ikke LocalBusiness): sitet har ingen fysisk adresse, og Google
  // kræver address på LocalBusiness.
  const business = {
    "@context": "https://schema.org", "@type": "Service",
    name: `Mobil gardinservice i ${city}`,
    serviceType: "Gardiner, opmåling og montering",
    description: `Mobil gardinservice i ${city} og ${region}: gratis hjemmebesøg med prøver, opmåling, rådgivning og montering. ${p.intro}`,
    url, image: `${SITE}/assets/og-image.png`,
    provider: { "@type": "Organization", name: "bookgardinbussen.online", url: `${SITE}/`, email: "mail@bookgardinbussen.online" },
    areaServed: [{ "@type": "City", name: city }].concat(p.areas.map((a) => ({ "@type": "Place", name: a }))),
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
  const usp = pick(city + "u", [
    ["Gratis og uforpligtende hjemmebesøg", "Prøver på stoffer og farver i dit eget lys", "Præcis opmåling af alle vinduer", "Montering inkluderet i prisen", "Fast tilbud på stedet"],
    ["Rådgivning fra en gardinkonsulent hjemme hos dig", "Gardiner, plissé, persienner og solafskærmning", "Gardiner lavet efter mål", "Fast pris uden skjulte gebyrer", "Ingen købepligt"],
    ["Vi kommer med prøverne — du skal ingen steder", "Opmåling og montering klares af os", "Løsninger til alle vinduer og budgetter", "Fast tilbud, mens vi er hos dig", "Book på under et minut"],
  ]);
  const offer = pick(city + "t", [
    `Prisen på gardiner afhænger af dine vinduer, stoffet og ophænget. Derfor giver vi ikke listepriser, men en fast, uforpligtende pris på stedet, når vi har set dit hjem i ${city} og målt op. Du kan tage dig god tid til at sammenligne, før du beslutter dig.`,
    `Et godt tilbud på gardiner i ${city} kræver, at nogen har målt dine vinduer op og set lyset i rummet. Det gør vi ved det gratis besøg, hvor du også får en samlet pris på ét vindue eller hele hjemmet — med montering og uden skjulte gebyrer.`,
    `Hos Gardinbussen får du ikke et gæt, men en fast pris. Vi kommer hjem til dig i ${city}, viser prøver i alle prisklasser, måler op og regner prisen ud på stedet. Du bestemmer selv, om du vil sige ja — besøget er gratis uanset hvad.`,
  ]);
  return `${head({ title, desc, url, relPrefix: "../", jsonld: [business, breadcrumb, faq.ld] })}
<body>
  <a class="skip-link" href="#booking">Gå til booking</a>
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
          <p class="eyebrow">Mobil gardinservice i ${esc(city)} · ${esc(region)}</p>
          <h1>Gardiner i ${esc(city)} — vi kommer hjem til dig</h1>
          <p class="lead">
            ${esc(p.intro)} Gardinbussen kører hele gardinbutikken hjem til dig
            med prøver, måler op og monterer — alt sammen på ét besøg.
          </p>
          <div class="hero-actions">
            ${bookBtn(`Book gratis hjemmebesøg i ${city}`, "btn-primary")}
            <a class="btn btn-ghost" href="#boliger">Se løsninger i ${esc(city)}</a>
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

    <section class="section" id="boliger">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Boliger i ${esc(city)}</p>
          <h2>Gardinløsninger til hjemmene i ${esc(city)}</h2>
          <p class="section-sub">Vinduerne i ${esc(city)} er lige så forskellige som boligerne. Her er de løsninger, vi oftest anbefaler til de typiske hjem i byen og omegnen.</p>
        </header>
        <div class="home-grid">
${homeCards}
        </div>
        <aside class="city-tip" aria-label="Lokalt råd">
          <p class="city-tip-tag">Lokalt råd til dig i ${esc(city)}</p>
          <p>${esc(p.tip)}</p>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container city-area">
        <div class="city-area-copy legal">
          <h2>Vi kører til hele ${esc(city)} og omegn</h2>
          <p>Gardinbussen kommer hjem til dig, uanset om du bor centralt i ${esc(city)} eller i ${esc(joinDa(p.areas.slice(-3)))}. Du vælger selv tidspunktet, og vi tager prøverne med, så du kan se stof og farver præcis der, hvor gardinerne skal hænge.</p>
          <ul class="area-chips" aria-label="Områder vi kører til">${chips}</ul>
        </div>
        <dl class="city-facts">
          <div><dt>Område</dt><dd>${esc(city)} og ${esc(region)}</dd></div>
          <div><dt>Typiske boliger</dt><dd>${esc(p.homes.map((h) => h.title).join(", "))}</dd></div>
          <div><dt>Populære løsninger</dt><dd>${p.popular.map(([s, l]) => `<a href="../blog/${s}.html">${esc(l)}</a>`).join(", ")}</dd></div>
          <div><dt>Pris for besøget</dt><dd>0 kr. — gratis og uforpligtende</dd></div>
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="container legal">
        <h2>Tilbud på gardiner i ${esc(city)}</h2>
        <p>${esc(offer)}</p>
        <h3>Det får du, når Gardinbussen kommer til ${esc(city)}</h3>
        <ul class="area-list city-usp">
${usp.map((u) => `          <li>${esc(u)}</li>`).join("\n")}
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
          <p>${esc(pick(city + "b", [
            `Book dit gardinbesøg i ${city} online. Vælg en tid der passer dig — så kommer vi hjem til dig med prøver, måler op og giver et fast tilbud.`,
            `Vælg en ledig tid, så kommer Gardinbussen hjem til dig i ${city} med prøver på stoffer og løsninger. Du får et fast tilbud, mens vi er der.`,
            `Det tager under et minut at booke. Vi kommer hjem til dig i ${city}, måler op og giver dig en fast pris — helt uden købepligt.`,
          ]))}</p>
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
      ? bookBtn(item.link.text, "btn-ghost")
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
          <p class="section-sub">Bliv inspireret af de nyeste trends og løsninger — og book et gratis hjemmebesøg, når du er klar.</p>
        </header>
        <div class="news-list" id="nyheder">
${rows}
        </div>
      </div>
    </section>

    <section class="section section-alt booking" id="booking">
      <div class="container booking-inner">
        <div class="booking-copy">
          <p class="eyebrow">Book hjemmebesøg</p>
          <h2>Gratis og uforpligtende</h2>
          <p>Vælg en tid der passer dig — så kommer vi hjem til dig med prøver, måler op og giver et fast tilbud. Ingen købepligt.</p>
          <ul class="booking-points">
            <li>Gratis og uforpligtende besøg</li>
            <li>Prøver og rådgivning med hjemme</li>
            <li>Fast tilbud på stedet</li>
          </ul>
        </div>
${ctaCard("Book et gardinbesøg", "Det tager under et minut at vælge en ledig tid.")}
      </div>
    </section>
  </main>
${footer("")}`;
}

// ---------- blog ----------
function blogPost(post) {
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
    author: { "@type": "Organization", name: "bookgardinbussen.online" },
    publisher: { "@type": "Organization", name: "bookgardinbussen.online", logo: { "@type": "ImageObject", url: `${SITE}/assets/logo.png`, width: 512, height: 512 } },
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

${related}        <p class="blog-cta-note">${esc(post.ctaNote || `Vil du se ${post.tag.toLowerCase()} i dit eget hjem? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.`)}</p>
      </div>
    </article>

    <section class="section section-alt booking" id="booking">
      <div class="container booking-inner">
        <div class="booking-copy">
          <p class="eyebrow">Book hjemmebesøg</p>
          <h2>Gratis og uforpligtende</h2>
          <p>${esc(post.bookingText || "Book dit gardinbesøg online. Vælg en tid der passer dig — så kommer vi hjem med prøver, måler op og giver et fast tilbud. Ingen købepligt.")}</p>
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
${ctaCard("Book et gardinbesøg", post.ctaLead || `Se ${post.tag.toLowerCase()} i dit eget hjem — book et gratis besøg.`)}
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
          <p class="eyebrow">Hvorfor Gardinbussen</p>
          <h2>Få det bedste tilbud på gardiner — billige eller i topkvalitet</h2>
          <p class="section-sub">Læs hvorfor tusindvis af danskere vælger Gardinbussen til billige gardiner og gardiner i god kvalitet — og book dit gratis, uforpligtende besøg.</p>
        </header>
        <p class="section-cta">
          <a class="btn btn-primary" href="../hvorfor-gardinbussen.html">Se hvorfor Gardinbussen</a>
        </p>
      </div>
    </section>`);

  const itemList = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: BLOG.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/blog/${p.slug}.html`, name: p.tag })),
  };
  return `${head({
    title: "Blog: Guides og inspiration om gardiner | bookgardinbussen.online",
    desc: "Guides og inspiration om gardiner — samlet efter kategori: gardintyper, efterårsguides og inspiration. Find den rigtige løsning, og book en gratis opmåling.",
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
          <p class="section-sub">Alle vores artikler samlet efter kategori — så du hurtigt finder det, du leder efter.</p>
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
  lines.push("> Mobil gardinservice i Danmark. bookgardinbussen.online kører hele gardinbutikken hjem til kunden med gratis og uforpligtende hjemmebesøg: prøver, opmåling, rådgivning og montering af gardiner, rullegardiner, persienner, plisségardiner og lamelgardiner — i hele landet.");
  lines.push("");
  lines.push("## Om");
  lines.push("- Gratis og uforpligtende hjemmebesøg i hele Danmark");
  lines.push("- Opmåling, rådgivning og montering på stedet");
  lines.push("- Fast tilbud uden købepligt");
  lines.push(`- Forside: ${SITE}/`);
  lines.push(`- Om os: ${SITE}/om-os.html`);
  lines.push(`- Hvorfor Gardinbussen (bedste tilbud på gardiner): ${SITE}/hvorfor-gardinbussen.html`);
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
  lines.push("## Byer vi dækker");
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
