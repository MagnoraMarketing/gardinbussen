/* Genererer Gardinbussens inspirationsside.
 * Kør:  node inspiration/generate.mjs
 * Deler stylesheet med bloggen (/blog/blog.css) + lidt galleri-CSS.
 *
 * VIGTIGT: sæt SITE_URL til dit rigtige domæne (canonical/OG/sitemap).
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, SITE_NAME, BRAND, header, footer } from "../assets/site.mjs";

const __dir = dirname(fileURLToPath(import.meta.url));
const AFF = "https://www.partner-ads.com/dk/klikbanner.php?partnerid=52168&amp;bannerid=115355&amp;htmlurl=https://gardinbus.nu/gardinbus-book/";

/* Stiliseret rum-scene tegnet i SVG — varierer efter vægfarve og gardinfarve */
function scene(wall, curtain, floor) {
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
  <rect width="400" height="300" fill="${wall}"/>
  <rect x="0" y="250" width="400" height="50" fill="${floor}"/>
  <!-- vindue -->
  <rect x="150" y="60" width="100" height="150" rx="3" fill="#dfe7ea" stroke="rgba(0,0,0,.12)"/>
  <line x1="200" y1="60" x2="200" y2="210" stroke="rgba(0,0,0,.12)"/>
  <line x1="150" y1="135" x2="250" y2="135" stroke="rgba(0,0,0,.12)"/>
  <!-- stang -->
  <rect x="120" y="50" width="160" height="7" rx="3.5" fill="#B98A3E"/>
  <!-- gardiner -->
  <path d="M128 55 C128 120 134 190 130 255 C146 250 158 255 166 250 C162 190 166 120 166 55 Z" fill="${curtain}"/>
  <path d="M272 55 C272 120 266 190 270 255 C254 250 242 255 234 250 C238 190 234 120 234 55 Z" fill="${curtain}"/>
  <g stroke="rgba(0,0,0,.18)" stroke-width="1.5" fill="none" opacity=".5">
    <path d="M138 57 C138 120 144 190 140 250"/>
    <path d="M152 57 C152 120 158 190 154 250"/>
    <path d="M262 57 C262 120 256 190 260 250"/>
    <path d="M248 57 C248 120 242 190 246 250"/>
  </g>
</svg>`;
}

const looks = [
  { id: "lyst-luftigt", tag: "Stue", title: "Lyst og luftigt", wall: "#EDE7DC", curtain: "#F2EEE6", floor: "#C9B79A",
    text: "Transparente linnedgardiner slører indblik uden at stjæle dagslyset. Perfekt til den lyse stue, hvor du vil bevare udsigten." },
  { id: "blodt-morke", tag: "Soveværelse", title: "Blødt mørke", wall: "#2E3A46", curtain: "#39505E", floor: "#20303A",
    text: "Foerede mørklægningsgardiner i dybe toner skaber ro og fuldt mørke — den bedste ramme om en god nats søvn." },
  { id: "skandinavisk-ro", tag: "Skandinavisk", title: "Skandinavisk ro", wall: "#F2F1ED", curtain: "#E7E4DC", floor: "#D8CBB4",
    text: "Enkle rullegardiner og en afdæmpet palette giver det rene, nordiske look, hvor lyset og formerne får lov at tale." },
  { id: "naturlige-toner", tag: "Naturmaterialer", title: "Naturlige toner", wall: "#E3DED0", curtain: "#8C9A6E", floor: "#B49A72",
    text: "Jordfarver og naturlig struktur i lin og bomuld skaber varme. Oliven, ler og sand er årets afdæmpede favoritter." },
  { id: "store-vinduer", tag: "Store vinduer", title: "Store vinduespartier", wall: "#E8E9E4", curtain: "#C7CBC2", floor: "#B8AE9C",
    text: "Lamelgardiner styrer lyset trinløst på brede partier og terrassedøre — og kan samles helt væk, når du vil ud." },
  { id: "klassisk-elegance", tag: "Klassisk", title: "Klassisk elegance", wall: "#EAE3D6", curtain: "#6E4A3A", floor: "#9C8464",
    text: "Foldegardiner med bløde wave-fald og en synlig messingstang giver et tidløst, elegant udtryk til stuen." },
  { id: "koekken", tag: "Køkken", title: "Praktisk i køkkenet", wall: "#EDEDE7", curtain: "#B5C2C4", floor: "#CFC6B4",
    text: "Aluminiumspersienner tåler damp og fedt, tørres nemt af og giver skarp lysstyring over køkkenvasken." },
  { id: "bornevaerelset", tag: "Børneværelse", title: "Trygt børneværelse", wall: "#EAE0E6", curtain: "#9FB8C9", floor: "#D3C4B0",
    text: "Snorfri mørklægning i glade, rolige farver — sikkert for de mindste og godt for både lur og nattesøvn." },
  { id: "lag-paa-lag", tag: "Lag på lag", title: "Lag på lag", wall: "#E6E2D8", curtain: "#4E6152", floor: "#BBAA8F",
    text: "Et transparent gardin inderst og et mørklæggende yderst giver lys om dagen, mørke om aftenen — og dybde i vinduet." },
];

function card(l) {
  return `<article class="look" id="${l.id}">
    <div class="look__img">${scene(l.wall, l.curtain, l.floor)}</div>
    <div class="look__body">
      <span class="cat">${l.tag}</span>
      <h3>${l.title}</h3>
      <p>${l.text}</p>
      <a class="look__cta" href="${AFF}" target="_blank" rel="sponsored nofollow noopener">Book bussen og få dette look →</a>
    </div>
  </article>`;
}

const canonical = `${SITE_URL}/inspiration/`;
const title = `Inspiration til gardiner — stil, farver og looks | ${BRAND}`;
const description =
  "Bliv inspireret til gardiner rum for rum: lyst og luftigt, blødt mørke, skandinavisk ro, naturlige toner og store vinduespartier. Book bussen og få looket hjem.";

const jsonld = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonical,
    inLanguage: "da-DK",
    isPartOf: { "@type": "WebSite", name: BRAND, url: `${SITE_URL}/` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Inspiration", item: canonical },
    ],
  },
];

const chips = looks
  .map((l) => `<a class="chip" href="#${l.id}">${l.title}</a>`)
  .join("");

const html = `<!doctype html>
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
<style>
  .insp-hero{padding:clamp(48px,7vw,84px) 0 clamp(20px,3vw,32px);text-align:center}
  .insp-hero h1{font-size:clamp(2.2rem,5vw,3.4rem);letter-spacing:-.02em;margin:.3em 0 .3em}
  .insp-hero p{max-width:62ch;margin:0 auto;color:var(--fg-soft);font-size:1.15rem}
  .chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:26px auto 0;max-width:900px}
  .chip{text-decoration:none;font-size:.9rem;font-weight:600;color:var(--fg-soft);
    border:1px solid var(--line);border-radius:999px;padding:.5em 1em;background:var(--surface);transition:all .15s ease}
  .chip:hover{color:var(--fg);border-color:var(--fg)}
  .gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:14px 0 10px}
  @media (max-width:860px){.gallery{grid-template-columns:repeat(2,1fr)}}
  @media (max-width:560px){.gallery{grid-template-columns:1fr}}
  .look{scroll-margin-top:90px;background:var(--card);border:1px solid var(--line);border-radius:var(--r);
    overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;
    transition:transform .18s ease,box-shadow .2s ease}
  .look:hover{transform:translateY(-4px)}
  @media (prefers-reduced-motion:reduce){.look:hover{transform:none}}
  .look__img{aspect-ratio:4/3}
  .look__img svg{width:100%;height:100%;display:block}
  .look__body{padding:22px 24px;display:flex;flex-direction:column;gap:9px;flex:1}
  .look__body .cat{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--brass-deep)}
  :root[data-theme="dark"] .look__body .cat{color:var(--brass)}
  .look__body h3{font-size:1.3rem}
  .look__body p{margin:0;color:var(--fg-soft);font-size:.97rem}
  .look__cta{margin-top:auto;padding-top:8px;font-weight:700;font-size:.92rem;text-decoration:none;color:var(--loden)}
  :root[data-theme="dark"] .look__cta{color:var(--brass)}
  .look__cta:hover{text-decoration:underline}
  .insp-cta{background:var(--loden-deep);color:#EDEFE9;border-radius:calc(var(--r) + 6px);
    padding:clamp(30px,5vw,56px);text-align:center;margin:56px 0 10px;box-shadow:var(--shadow)}
  .insp-cta h2{color:#F4F5EF;font-size:clamp(1.6rem,3.2vw,2.2rem);margin-bottom:.4em}
  .insp-cta p{color:#C6D2C9;max-width:54ch;margin:0 auto 1.4em}
  .insp-cta .fine{font-size:.82rem;color:#9fb0a4;margin:1em auto 0}
</style>
</head>
<body>
${header(SITE_URL)}
<main>
  <div class="wrap">
    <nav class="crumbs" aria-label="Brødkrumme">
      <a href="${SITE_URL}/">Forside</a><span>›</span>Inspiration
    </nav>
    <section class="insp-hero">
      <span class="eyebrow">Inspiration</span>
      <h1>Find dit gardin-look</h1>
      <p>Bliv inspireret rum for rum — fra lyst og luftigt til blødt mørke. Når du har fundet stilen, kommer Gardinbussen hjem til dig med prøverne og gør resten.</p>
      <div class="chips">${chips}</div>
    </section>

    <section aria-label="Inspirationsgalleri">
      <div class="gallery">
        ${looks.map(card).join("\n        ")}
      </div>
    </section>

    <section class="insp-cta">
      <h2>Kan du se det for dig?</h2>
      <p>Book et gratis hjemmebesøg, så tager Gardinbussen stofprøverne med hjem til dig og hjælper dig med at ramme præcis det look, du drømmer om.</p>
      <a class="btn btn-primary" href="${AFF}" target="_blank" rel="sponsored nofollow noopener">Book gratis hjemmebesøg hos Gardinbus.nu →</a>
      <p class="fine">Gratis og uforpligtende · du sendes videre til gardinbus.nu</p>
    </section>
  </div>
</main>
${footer(SITE_URL)}
</body>
</html>`;

writeFileSync(join(__dir, "index.html"), html, "utf8");
console.log("skrev inspiration/index.html med", looks.length, "looks");
