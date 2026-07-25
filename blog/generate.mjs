/* Genererer Gardinbussens blog: 10 SEO-optimerede artikler + oversigtsside.
 * Kør:  node blog/generate.mjs
 * Indhold ligger i `articles`; skabelon/chrome bygges herunder.
 *
 * VIGTIGT: sæt SITE_URL til dit rigtige domæne, så canonical/OG bliver korrekt.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://gardinbussen.dk"; // TODO: ret til dit rigtige domæne
const BLOG_BASE = `${SITE_URL}/blog`;
const BRAND = "Gardinbussen";
const AUTHOR = "Gardinbussen Redaktionen";

// Affiliate-link (HTML-escaped & til attributter)
const AFF = "https://www.partner-ads.com/dk/klikbanner.php?partnerid=52168&amp;bannerid=115355&amp;htmlurl=https://gardinbus.nu/gardinbus-book/";

/* ---------- Genbrugelige byggeklodser ---------- */
const markSVG = `<svg class="mark" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M4 6v13m16-13v13M4 19h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 6v13M10 6v13M13 6v13M16 6v13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".7"/></svg>`;

function thumb(seed) {
  // Dekorativt, CSS/SVG-tegnet gardinmotiv — varierer farve efter seed
  const hues = ["#2F4A3E", "#3B5B4C", "#4A6152", "#284035", "#38564a"];
  const c = hues[seed % hues.length];
  return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
  <rect width="320" height="180" fill="${c}"/>
  <g opacity=".28" fill="#EDEFE9">
    ${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 20}" y="0" width="10" height="180" rx="5"/>`).join("")}
  </g>
  <rect x="0" y="0" width="320" height="10" fill="#B98A3E"/>
</svg>`;
}

const header = () => `<header class="site">
  <nav class="nav" aria-label="Hovedmenu">
    <a class="brand" href="${SITE_URL}/">${markSVG}${BRAND}</a>
    <div class="nav-links">
      <a href="${SITE_URL}/#proces">Sådan foregår det</a>
      <a href="${SITE_URL}/#sortiment">Sortiment</a>
      <a href="${BLOG_BASE}/">Guides</a>
      <a href="${SITE_URL}/#kontakt">Kontakt</a>
    </div>
    <a class="btn btn-primary" href="${SITE_URL}/#kontakt">Book hjemmebesøg</a>
  </nav>
</header>`;

const footer = () => `<footer class="site">
  <div class="wrap foot">
    <a class="brand" href="${SITE_URL}/">${markSVG}${BRAND}</a>
    <p>© ${new Date().getFullYear()} ${BRAND} · Guides om gardiner og vinduesbeklædning.</p>
    <div class="foot-links">
      <a href="${BLOG_BASE}/">Guides</a>
      <a href="${SITE_URL}/#sortiment">Sortiment</a>
      <a href="${SITE_URL}/#kontakt">Book</a>
    </div>
  </div>
  <div class="wrap">
    <p class="disclosure">Annonce: ${BRAND} er en uafhængig guide-side. Links til Gardinbus.nu er affiliate-links, som vi kan modtage provision fra, hvis du booker eller køber. Det påvirker ikke din pris. Priser og oplysninger er vejledende og kan ændre sig.</p>
  </div>
</footer>`;

function ctaBlock(a) {
  return `<aside class="cta">
    <h3>${a.ctaTitle}</h3>
    <p>${a.ctaText}</p>
    <a class="btn btn-primary" href="${AFF}" target="_blank" rel="sponsored nofollow noopener">Book gratis hjemmebesøg hos Gardinbus.nu →</a>
    <p class="fine">Gratis og uforpligtende · du sendes videre til gardinbus.nu</p>
  </aside>`;
}

function head({ title, description, canonical, jsonld }) {
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/blog/blog.css">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>
<body>`;
}

/* ---------- Artikel-render ---------- */
function renderArticle(a, all) {
  const canonical = `${BLOG_BASE}/${a.slug}.html`;
  const sections = a.sections.map((s, i) => ({ ...s, id: `afsnit-${i + 1}` }));

  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.h1,
      description: a.description,
      inLanguage: "da-DK",
      datePublished: a.date,
      dateModified: a.updated || a.date,
      author: { "@type": "Organization", name: AUTHOR },
      publisher: { "@type": "Organization", name: BRAND },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      keywords: a.keywords.join(", "),
      articleSection: a.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${BLOG_BASE}/` },
        { "@type": "ListItem", position: 3, name: a.h1, item: canonical },
      ],
    },
  ];

  const toc = `<nav class="toc" aria-label="Indhold">
    <p>I denne guide</p>
    <ol>${sections.map((s) => `<li><a href="#${s.id}">${s.h}</a></li>`).join("")}</ol>
  </nav>`;

  const body = sections
    .map((s, i) => {
      const cta = a.ctaAfter === i ? ctaBlock(a) : "";
      return `<h2 id="${s.id}">${s.h}</h2>\n${s.html}\n${cta}`;
    })
    .join("\n");

  const related = all
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3)
    .map(
      (x) => `<a class="post-card" href="${x.slug}.html">
        <span class="thumb">${thumb(x.seed)}</span>
        <span class="body">
          <span class="cat">${x.category}</span>
          <h3>${x.h1}</h3>
          <span class="read">Læs guiden →</span>
        </span>
      </a>`
    )
    .join("");

  const dateFmt = new Date(a.date).toLocaleDateString("da-DK", { year: "numeric", month: "long", day: "numeric" });

  return `${head({ title: a.title, description: a.description, canonical, jsonld })}
${header()}
<main>
  <div class="wrap">
    <nav class="crumbs" aria-label="Brødkrumme">
      <a href="${SITE_URL}/">Forside</a><span>›</span><a href="${BLOG_BASE}/">Guides</a><span>›</span>${a.category}
    </nav>
    <article class="article">
      <span class="eyebrow">${a.category}</span>
      <h1>${a.h1}</h1>
      <div class="meta">
        <span>Opdateret ${dateFmt}</span><span class="dot"></span>
        <span>${a.readingMin} min. læsning</span><span class="dot"></span>
        <span>Af ${AUTHOR}</span>
      </div>
      <p class="lead">${a.lead}</p>
      ${toc}
      ${body}
      ${a.ctaAfter == null ? ctaBlock(a) : ""}
    </article>

    <section aria-label="Relaterede guides" style="max-width:1100px;margin:56px auto 0">
      <h2 class="section-title">Læs også</h2>
      <div class="cards">${related}</div>
    </section>
  </div>
</main>
${footer()}
</body>
</html>`;
}

/* ---------- Oversigtsside ---------- */
function renderIndex(all) {
  const canonical = `${BLOG_BASE}/`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${BRAND} Guides`,
      url: canonical,
      inLanguage: "da-DK",
      publisher: { "@type": "Organization", name: BRAND },
      blogPost: all.map((a) => ({
        "@type": "BlogPosting",
        headline: a.h1,
        url: `${BLOG_BASE}/${a.slug}.html`,
        datePublished: a.date,
        description: a.description,
      })),
    },
  ];
  const cards = all
    .map(
      (a) => `<a class="post-card" href="${a.slug}.html">
      <span class="thumb">${thumb(a.seed)}</span>
      <span class="body">
        <span class="cat">${a.category}</span>
        <h3>${a.h1}</h3>
        <p>${a.description}</p>
        <span class="read">Læs guiden →</span>
      </span>
    </a>`
    )
    .join("");

  return `${head({
    title: "Guides om gardiner, mørklægning og vinduesbeklædning | " + BRAND,
    description:
      "Ekspertguides om gardiner: vælg de rigtige gardiner til stuen og soveværelset, mørklægning, opmåling, priser og trends. Book et gratis hjemmebesøg.",
    canonical,
    jsonld,
  })}
${header()}
<main>
  <div class="wrap">
    <section class="blog-hero">
      <span class="eyebrow">Guides & inspiration</span>
      <h1>Alt du skal vide om gardiner</h1>
      <p>Praktiske guides til at vælge, måle og pleje dine gardiner — og til at få det rigtige lys i hvert rum. Skrevet af folk, der klæder danske vinduer hver dag.</p>
    </section>
    <section aria-label="Alle guides" style="padding-bottom:20px">
      <div class="cards">${cards}</div>
    </section>
  </div>
</main>
${footer()}
</body>
</html>`;
}

/* =========================================================
   ARTIKLER — rigtige, brugbare tekster
   ========================================================= */
const P = (...s) => s.map((x) => `<p>${x}</p>`).join("\n");
const UL = (...items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

const articles = [
  {
    slug: "vaelg-gardiner-til-stuen",
    seed: 0,
    category: "Stuen",
    date: "2026-01-14",
    updated: "2026-07-20",
    readingMin: 6,
    title: "Sådan vælger du de rigtige gardiner til stuen (guide 2026)",
    h1: "Sådan vælger du de rigtige gardiner til stuen",
    description:
      "Guide til at vælge gardiner til stuen: lysforhold, stof, farve, fald og ophæng. Få styr på valget rum for rum — og book et gratis hjemmebesøg.",
    keywords: ["gardiner til stuen", "vælg gardiner", "gardiner stue", "gardintyper", "vinduesbeklædning stue"],
    lead:
      "Stuens gardiner gør mere end at dække vinduet. De styrer lyset, dæmper lyden, holder på varmen og sætter tonen for hele rummet. Her får du en enkel fremgangsmåde til at ramme rigtigt første gang.",
    ctaAfter: 2,
    ctaTitle: "Usikker på valget? Lad os hjælpe dig hjemme hos dig selv",
    ctaText:
      "Gardinbussen kører ud til dig med hundredvis af stofprøver, måler op og rådgiver i dit eget lys — helt gratis og uforpligtende.",
    sections: [
      {
        h: "Start med rummets lys og verdenshjørne",
        html:
          P(
            "Før du kigger på farver, så kig på lyset. Vender stuen mod syd, får du masser af sol og måske generende blænding om eftermiddagen — her er lysfiltrerende eller transparente gardiner guld værd. En nordvendt stue har et køligt, jævnt lys, hvor lette stoffer holder på det sparsomme dagslys.",
            "Tænk også på, hvornår du bruger rummet. Ser du tv om aftenen, vil du gerne kunne dæmpe genskin. Har du udsigt til naboer, vejer privatliv tungere end mørklægning."
          ),
      },
      {
        h: "Vælg funktion før farve",
        html:
          P("Gardiner løser typisk én eller flere af disse opgaver. Beslut dig for, hvad der er vigtigst, før du forelsker dig i et mønster:") +
          UL(
            "<strong>Transparente gardiner</strong> slører indblik, men lukker lys ind — perfekt som det yderste lag.",
            "<strong>Lysfiltrerende gardiner</strong> giver et blødt, dæmpet lys og en hyggelig stemning.",
            "<strong>Mørklægning</strong> er sjældent nødvendig i stuen, men rart, hvis rummet også bruges til hjemmebiograf.",
            "<strong>Foldegardiner og portièrer</strong> tilføjer tyngde, isolering og lyddæmpning."
          ),
      },
      {
        h: "Stof og fald — det, der afgør udtrykket",
        html:
          P(
            "Et gardin står og falder med stoffet. Lin giver et afslappet, let rustikt fald og en naturlig struktur. Bomuld er alsidigt og nemt at pleje. Velour og tungere vævninger giver et elegant, tungt fald og dæmper både lys og lyd.",
            "Vil du have de smukke, ensartede bølger, som man ser i indretningsmagasiner, skal du vælge et <em>wave-fald</em> og beregne rigelig stofbredde — typisk 2 til 2,5 gange vinduets bredde."
          ),
      },
      {
        h: "Farve og mønster der passer til indretningen",
        html:
          P(
            "Skal gardinerne smelte ind eller skille sig ud? Toner tæt på vægfarven får rummet til at virke større og roligere. Vil du have et markant element, kan et mønster eller en dyb farve blive stuens omdrejningspunkt — så hold resten af tekstilerne afdæmpede.",
            "Husk, at store flader af farve virker kraftigere på væggen end på en lille prøve. Se altid stoffet i rummets eget lys, både dag og aften."
          ),
      },
      {
        h: "Ophæng: skinne, stang eller plissé",
        html:
          P(
            "Ophænget bestemmer både udtryk og betjening. En diskret loftskinne trækker gardinet helt til side og får loftet til at virke højere. En synlig stang med ringe er en klassisk, dekorativ løsning. Til karnapper og skæve vinduer er plissé- eller foldegardiner ofte den mest fleksible vej."
          ),
      },
    ],
  },
  {
    slug: "moerklaegningsgardiner-guide",
    seed: 1,
    category: "Mørklægning",
    date: "2026-02-03",
    updated: "2026-07-18",
    readingMin: 7,
    title: "Mørklægningsgardiner: den komplette guide til bedre søvn",
    h1: "Mørklægningsgardiner: den komplette guide",
    description:
      "Alt om mørklægningsgardiner: typer, sådan opnår du 100 % mørke, materialer og pleje. Til soveværelse, børneværelse og hjemmebiograf.",
    keywords: ["mørklægningsgardiner", "mørklægning", "blackout gardiner", "gardiner der lukker lys ude", "bedre søvn"],
    lead:
      "Mørklægningsgardiner kan gøre en mærkbar forskel for din søvn, dit barns lur og din hjemmebiograf. Men der er stor forskel på “mørkt nok” og reelt mørke. Her er, hvad du skal vide.",
    ctaAfter: 3,
    ctaTitle: "Vil du have det helt rigtige mørke?",
    ctaText:
      "En konsulent fra Gardinbussen måler op og finder den løsning, der lukker mest lys ude i netop dit vindue — gratis og hjemme hos dig.",
    sections: [
      {
        h: "Hvad er mørklægningsgardiner — og hvad de ikke er",
        html:
          P(
            "Mørklægningsgardiner (også kaldet blackout) er fremstillet af tæt vævet eller coated stof, der blokerer stort set alt lys. De forveksles ofte med lysfiltrerende gardiner, som blot dæmper lyset. Vil du kunne sove længe om sommeren, er det mørklægning, du er ude efter.",
            "Vær opmærksom på, at selv det bedste stof ikke hjælper, hvis lyset siver ind i siderne. Det er kanterne, ikke stoffet, der oftest ødelægger mørket."
          ),
      },
      {
        h: "Typer af mørklægning",
        html:
          UL(
            "<strong>Rullegardin med mørklægning</strong> — enkelt, pladsbesparende og effektivt. Vælg en model med sidegliderskinner for bedst resultat.",
            "<strong>Plisségardin</strong> — fleksibelt, dækker skæve vinduer og ovenlys, og kan betjenes fra begge sider.",
            "<strong>Foldegardin/rullegardin i kassette</strong> — kassetten lukker lyset ude foroven.",
            "<strong>Mørklægningsgardin på skinne</strong> — tungt stof med blackout-foer, som også dæmper lyd."
          ),
      },
      {
        h: "Sådan opnår du tæt på 100 % mørke",
        html:
          P("Reelt mørke handler om at lukke lyset i fire retninger:") +
          UL(
            "Vælg <strong>sidekanaler</strong> (side channels), der fører gardinet ned langs karmen.",
            "Monter gardinet <strong>udvendigt</strong> og lad det dække godt ud over vinduet i bredden.",
            "Sørg for <strong>overlap foroven</strong> med en kassette eller et forhæng, så lyset ikke slipper ud over toppen.",
            "Kombinér eventuelt et rullegardin (tæt på ruden) med et forhæng udenpå."
          ),
      },
      {
        h: "Materialer og pleje",
        html:
          P(
            "De fleste mørklægningsstoffer tåler let aftørring med en fugtig klud eller støvsugning med møbelmundstykke. Coated blackout bør ikke maskinvaskes, da coatingen kan krakelere. Vævede mørklægningsgardiner med foer kan ofte renses skånsomt — tjek altid vaskeanvisningen."
          ),
      },
      {
        h: "Til soveværelse, børneværelse og hjemmebiograf",
        html:
          P(
            "I soveværelset prioriterer mange en kombination af mørke og et roligt udtryk. I børneværelset er sikker, snorfri betjening vigtig (læs vores guide til børneværelset). Til hjemmebiograf er både mørke og lyddæmpning i spil — her vinder tunge, foerede gardiner."
          ),
      },
    ],
  },
  {
    slug: "gardiner-til-sovevaerelset",
    seed: 2,
    category: "Soveværelse",
    date: "2026-02-20",
    updated: "2026-07-15",
    readingMin: 6,
    title: "Gardiner til soveværelset: ro, mørke og bedre søvn",
    h1: "Gardiner til soveværelset: ro, mørke og bedre søvn",
    description:
      "Sådan vælger du gardiner til soveværelset: mørklægning kontra lysdæmpning, lyddæmpning, beroligende farver og praktiske ophæng.",
    keywords: ["gardiner til soveværelset", "soveværelse gardiner", "mørklægning soveværelse", "gardiner bedre søvn"],
    lead:
      "Soveværelset er rummet, hvor gardinerne skal arbejde hårdest: de skal skabe mørke, dæmpe støj udefra og signalere ro. Her er, hvordan du vælger rigtigt.",
    ctaAfter: 3,
    ctaTitle: "Skab det perfekte sovemiljø",
    ctaText:
      "Gardinbussen hjælper dig med at finde den rette kombination af mørke og ro — vi kommer hjem til dig med prøverne.",
    sections: [
      {
        h: "Mørke og ro giver bedre søvn",
        html:
          P(
            "Selv lidt lys kan forstyrre nattesøvnen og især morgensøvnen om sommeren. Gode gardiner i soveværelset handler derfor først og fremmest om at kunne styre lyset — fra fuld mørklægning til et blødt, dæmpet morgenlys."
          ),
      },
      {
        h: "Mørklægning eller lysdæmpning?",
        html:
          P(
            "Vil du sove længe og uforstyrret, er egentlig mørklægning vejen frem. Foretrækker du at vågne naturligt med et blødt lys, kan et lysfiltrerende gardin være nok. Mange vælger begge dele: et mørklægningslag tæt på ruden og et let, dekorativt gardin udenpå."
          ),
      },
      {
        h: "Lyddæmpning med tunge stoffer",
        html:
          P(
            "Bor du ud til en trafikeret vej, kan tunge, foerede gardiner mærkbart dæmpe støjen. Jo mere stof og jo tættere vævning, desto bedre absorberes lyden. Et generøst fald med rigelig bredde forstærker effekten."
          ),
      },
      {
        h: "Beroligende farver",
        html:
          P(
            "Afdæmpede, naturlige toner — støvet grøn, blå, sand og varm grå — understøtter ro i rummet. Undgå meget kraftige kontraster, hvis du gerne vil falde til ro. Mat stof reflekterer mindre lys end blanke overflader og virker roligere."
          ),
      },
      {
        h: "Praktiske løsninger",
        html:
          P(
            "Overvej betjeningen: en let løbeskinne gør det nemt at trække for og fra hver dag, og motoriserede gardiner kan indstilles til at åbne blidt om morgenen. Til sengegavlvinduer og lave vinduer er plissé ofte den mest praktiske løsning."
          ),
      },
    ],
  },
  {
    slug: "plisse-vs-rullegardin",
    seed: 3,
    category: "Sammenligning",
    date: "2026-03-05",
    updated: "2026-07-10",
    readingMin: 5,
    title: "Plisségardiner vs. rullegardiner — hvad skal du vælge?",
    h1: "Plisségardiner vs. rullegardiner — hvad skal du vælge?",
    description:
      "Sammenligning af plisségardiner og rullegardiner: fordele, ulemper, pris, montering og hvornår du bør vælge hvad.",
    keywords: ["plisségardiner", "rullegardiner", "plissé vs rullegardin", "vælg gardintype"],
    lead:
      "Plissé og rullegardin er to af de mest populære løsninger til det moderne hjem. De ligner hinanden i pris og udtryk, men fungerer forskelligt. Her er forskellene — og hvornår du vælger hvad.",
    ctaAfter: 3,
    ctaTitle: "Se begge dele hjemme hos dig",
    ctaText:
      "I tvivl? Gardinbussen tager både plissé- og rulleprøver med, så du kan holde dem op mod dit eget vindue.",
    sections: [
      {
        h: "Kort om de to typer",
        html:
          P(
            "Et <strong>rullegardin</strong> er en glat bane, der rulles op og ned om et rør. Et <strong>plisségardin</strong> er et foldet (plisseret) stof, der trækkes sammen som en harmonika. Begge fås i lysfiltrerende og mørklæggende varianter."
          ),
      },
      {
        h: "Plissé: fordele og ulemper",
        html:
          UL(
            "✔ Fleksibelt — kan dække skæve vinduer, ovenlys og karnapper.",
            "✔ Kan betjenes fra både top og bund, så du kan dække midten og lukke lys ind foroven.",
            "✔ Kompakt pakke, når det er trukket sammen.",
            "✘ Lidt flere bevægelige dele end et rullegardin."
          ),
      },
      {
        h: "Rullegardin: fordele og ulemper",
        html:
          UL(
            "✔ Enkelt, rent udtryk og meget nemt at betjene.",
            "✔ Ofte den mest budgetvenlige løsning.",
            "✔ Fås med kassette og sideskinner til effektiv mørklægning.",
            "✘ Mindre fleksibelt på skæve eller meget brede vinduer."
          ),
      },
      {
        h: "Hvornår vælger du hvad?",
        html:
          P(
            "Vælg <strong>plissé</strong>, hvis du har ovenlys, skråvinduer, karnapper, eller vil kunne regulere både top og bund. Vælg <strong>rullegardin</strong>, hvis du vil have en enkel, prisvenlig løsning til et almindeligt firkantet vindue — for eksempel i køkken eller på kontoret."
          ),
      },
      {
        h: "Pris og montering",
        html:
          P(
            "Prisen for begge afhænger af størrelse, stof og om der er mørklægning og kassette. Montering er ligetil i begge tilfælde, men et korrekt opmålt vindue er afgørende — særligt ved indvendig montering, hvor få millimeter afgør, om gardinet passer."
          ),
      },
    ],
  },
  {
    slug: "maal-vinduer-op-til-gardiner",
    seed: 4,
    category: "Guide",
    date: "2026-03-22",
    updated: "2026-07-12",
    readingMin: 6,
    title: "Sådan måler du dine vinduer op til gardiner korrekt",
    h1: "Sådan måler du dine vinduer op til gardiner",
    description:
      "Trin-for-trin guide til at måle vinduer op til gardiner: værktøj, indvendig vs. udvendig montering og de typiske fejl, du skal undgå.",
    keywords: ["måle vinduer op", "opmåling gardiner", "mål til gardiner", "gardinmål"],
    lead:
      "Den hyppigste årsag til gardiner, der ikke passer, er en unøjagtig opmåling. Det gode er, at det ikke er svært — hvis du gør det systematisk. Her er fremgangsmåden.",
    ctaAfter: 4,
    ctaTitle: "Lad eksperten måle op",
    ctaText:
      "Vil du være helt sikker? Gardinbussen måler dine vinduer op professionelt og gratis — så passer det første gang.",
    sections: [
      {
        h: "Det skal du bruge",
        html:
          P("Brug altid et stålmålebånd — et blødt syvmålebånd giver upræcise mål. Notér målene i centimeter, og skriv altid bredde før højde.")
      },
      {
        h: "Indvendig eller udvendig montering?",
        html:
          P(
            "<strong>Indvendig montering</strong> sidder inde i vindueskarmen og giver et rent, integreret look — men kræver præcise mål og en dyb nok karm. <strong>Udvendig montering</strong> sidder på væggen eller karmen over vinduet, dækker mere og er bedst til mørklægning, fordi den lukker lys ude i siderne."
          ),
      },
      {
        h: "Sådan måler du bredden",
        html:
          P(
            "Ved indvendig montering måler du karmens indvendige bredde tre steder — foroven, i midten og forneden — og bruger det mindste mål. Ved udvendig montering lægger du typisk 10–15 cm til på hver side, så gardinet dækker godt og lukker mindst muligt lys ud i kanterne."
          ),
      },
      {
        h: "Sådan måler du højden",
        html:
          P(
            "Indvendigt måler du karmens højde tre steder og bruger det største mål (så gardinet dækker helt ned). Udvendigt bestemmer du selv, hvor højt over vinduet ophænget skal sidde, og hvor langt gardinet skal falde — til vindueskarmen, forbi den eller helt til gulv."
          ),
      },
      {
        h: "De typiske fejl",
        html:
          UL(
            "At måle ét sted i stedet for tre — vinduer er sjældent helt i vinkel.",
            "At glemme plads til ophæng, kassette eller betjening.",
            "At forveksle bredde og højde i noterne.",
            "At måle udvendig montering for smalt, så lyset siver ind i siderne."
          ),
      },
    ],
  },
  {
    slug: "gardiner-til-bornevaerelset",
    seed: 5,
    category: "Børneværelse",
    date: "2026-04-08",
    updated: "2026-07-14",
    readingMin: 5,
    title: "Gardiner til børneværelset: sikkert, mørkt og praktisk",
    h1: "Gardiner til børneværelset: sikkert, mørkt og praktisk",
    description:
      "Guide til gardiner i børneværelset: snorfri sikkerhed, effektiv mørklægning til lur og søvn, samt stoffer der er nemme at holde rene.",
    keywords: ["gardiner til børneværelset", "mørklægning børneværelse", "snorfri gardiner", "sikre gardiner børn"],
    lead:
      "I børneværelset skal gardinerne kunne tre ting: være sikre, skabe mørke til lur og nattesøvn, og tåle hverdagens slid. Her er, hvad du skal kigge efter.",
    ctaAfter: 2,
    ctaTitle: "Trygge gardiner til de mindste",
    ctaText:
      "Gardinbussen rådgiver om sikre, snorfri løsninger og god mørklægning til børneværelset — hjemme hos jer, gratis og uforpligtende.",
    sections: [
      {
        h: "Sikkerhed kommer først",
        html:
          P(
            "Løse snore og kæder udgør en kvælningsrisiko for små børn. Vælg derfor <strong>snorfri betjening</strong>, motoriserede gardiner eller løsninger med kædesikring og stramholdere. Placér altid betjeningen uden for barnets rækkevidde, og hold møbler væk fra vinduet, så barnet ikke kan klatre op."
          ),
      },
      {
        h: "Mørklægning til lur og nattesøvn",
        html:
          P(
            "God mørklægning hjælper både middagsluren og de lyse sommeraftener. Et mørklægningsrullegardin eller -plissé med sideskinner giver det bedste mørke. Kombinér gerne med et let gardin, så rummet også er hyggeligt om dagen."
          ),
      },
      {
        h: "Stoffer der er nemme at holde rene",
        html:
          P(
            "Børneværelset får fingeraftryk, mad og malestreger. Vælg slidstærke stoffer, der tåler aftørring eller vask. Undgå meget sarte materialer, og spørg altid efter vaskeanvisningen, inden du vælger."
          ),
      },
      {
        h: "Sjovt, men holdbart",
        html:
          P(
            "Det er fristende at gå efter et motiv, barnet elsker lige nu — men smag skifter hurtigt. En holdbar mellemvej er et roligt gardin i en glad farve, som kan følge med, når interesserne ændrer sig."
          ),
      },
    ],
  },
  {
    slug: "lamelgardiner-store-vinduer",
    seed: 6,
    category: "Store vinduer",
    date: "2026-04-25",
    updated: "2026-07-08",
    readingMin: 5,
    title: "Lamelgardiner til store vinduespartier og terrassedøre",
    h1: "Lamelgardiner til store vinduespartier og terrassedøre",
    description:
      "Hvorfor lamelgardiner er ideelle til store vinduer og terrassedøre: lysregulering, privatliv, materialer, betjening og montering.",
    keywords: ["lamelgardiner", "gardiner store vinduer", "gardiner terrassedør", "lameller vinduesparti"],
    lead:
      "Store vinduespartier og terrassedøre giver lys og udsigt — men også blænding og indblik. Lamelgardiner er en af de mest praktiske løsninger til netop de flader. Her er hvorfor.",
    ctaAfter: 3,
    ctaTitle: "Få styr på det store vinduesparti",
    ctaText:
      "Gardinbussen måler dit vinduesparti op og finder den rette lamelløsning — vi kommer hjem til dig med det hele.",
    sections: [
      {
        h: "Derfor lameller til store partier",
        html:
          P(
            "Lamelgardiner består af lodrette baner, der kan drejes og trækkes til side. På store flader er de nemme at betjene, dækker effektivt og giver et roligt, ensartet udtryk. De er samtidig en overkommelig løsning pr. kvadratmeter sammenlignet med mange alternativer."
          ),
      },
      {
        h: "Lysregulering og privatliv",
        html:
          P(
            "Fordi lamellerne kan drejes trinløst, kan du finregulere, hvor meget lys og indblik du slipper ind — fra fuldt åbent til næsten lukket, uden at trække gardinet helt for. Det er ideelt, når du vil bevare udsigten, men undgå eftermiddagssol eller nysgerrige blikke."
          ),
      },
      {
        h: "Materialer og bredder",
        html:
          P(
            "Lameller fås typisk i 89 mm og 127 mm bredde. Smalle lameller virker lette og moderne; brede lameller giver et mere roligt, arkitektonisk look på store flader. Stofferne spænder fra transparente til mørklæggende og fås ofte i skærmende, lysægte kvaliteter."
          ),
      },
      {
        h: "Til terrassedøren",
        html:
          P(
            "Ved terrassedøre er det vigtigt, at gardinet kan samles helt væk, så du frit kan gå ud og ind. Lameller kan trækkes til én side eller deles på midten. Vælg en bundvægt og kædeføring, der holder lamellerne rolige, også når døren åbnes."
          ),
      },
      {
        h: "Montering og betjening",
        html:
          P(
            "Lamelgardiner monteres i loft eller på væg over partiet. Til brede flader anbefales en robust skinne og eventuelt motoriseret betjening, så hverdagen bliver nem. En præcis opmåling sikrer, at lamellerne hænger lige og dækker hele partiet."
          ),
      },
    ],
  },
  {
    slug: "persienner-alu-eller-trae",
    seed: 7,
    category: "Persienner",
    date: "2026-05-12",
    updated: "2026-07-05",
    readingMin: 5,
    title: "Persienner: alu eller træ? Sådan vælger du rigtigt",
    h1: "Persienner: alu eller træ? Sådan vælger du rigtigt",
    description:
      "Aluminiumspersienner mod træpersienner: fordele, ulemper, egnethed i fugtige rum, pris og vedligehold. Få hjælp til det rigtige valg.",
    keywords: ["persienner", "aluminiumspersienner", "træpersienner", "alu eller træ persienner"],
    lead:
      "Persienner giver skarp lysstyring og et moderne udtryk. Det store spørgsmål er som regel: aluminium eller træ? Begge har klare styrker — valget afhænger af rummet.",
    ctaAfter: 4,
    ctaTitle: "Find de rette persienner",
    ctaText:
      "Gardinbussen viser dig både alu- og træpersienner hjemme hos dig og hjælper med det rigtige valg til hvert rum.",
    sections: [
      {
        h: "Aluminiumspersienner: fordele",
        html:
          UL(
            "Slanke lameller og et rent, moderne look.",
            "Meget fugtbestandige — velegnede til bad og køkken.",
            "Nemme at tørre af og holde rene.",
            "Fås i mange farver og finish, også matte og metalliske."
          ),
      },
      {
        h: "Træpersienner: fordele",
        html:
          UL(
            "Varmt, hyggeligt og naturligt udtryk.",
            "Brede lameller giver et roligt, eksklusivt look.",
            "God til stue, soveværelse og kontor.",
            "Skaber en lun stemning, som aluminium ikke helt kan matche."
          ),
      },
      {
        h: "Fugtige rum",
        html:
          P(
            "I badeværelse og over køkkenvasken bør du vælge aluminium eller kunststof, der tåler fugt og damp. Ægte træ kan slå sig i høj luftfugtighed. Vil du absolut have træets look i et fugtigt rum, findes der fugtbestandige træimitationer i kunststof."
          ),
      },
      {
        h: "Pris og vedligehold",
        html:
          P(
            "Aluminiumspersienner er ofte det mest budgetvenlige valg og kræver minimal pleje. Træpersienner ligger typisk højere i pris og tørres af med en tør eller let fugtig klud. Begge dele holder i mange år, når de betjenes forsigtigt."
          ),
      },
      {
        h: "Vores anbefaling",
        html:
          P(
            "Vælg <strong>aluminium</strong> til køkken, bad og steder, hvor pris og fugt vejer tungt. Vælg <strong>træ</strong>, hvor udtryk og varme betyder mest — stue, soveværelse og kontor. Er du i tvivl, så se lamellerne i rummets eget lys, før du beslutter dig."
          ),
      },
    ],
  },
  {
    slug: "gardintrends-2026",
    seed: 8,
    category: "Trends",
    date: "2026-06-02",
    updated: "2026-07-22",
    readingMin: 5,
    title: "Gardintrends 2026: farver, stoffer og stilarter",
    h1: "Gardintrends 2026: farver, stoffer og stilarter",
    description:
      "Årets gardintrends 2026: naturmaterialer og jordfarver, wave-fald, lag på lag, motoriserede løsninger og bæredygtige valg.",
    keywords: ["gardintrends 2026", "gardiner trends", "wave gardiner", "gardiner farver 2026", "moderne gardiner"],
    lead:
      "Gardiner er gået fra praktisk nødvendighed til bevidst indretningsvalg. Her er de retninger, der præger 2026 — og som stadig holder om nogle år.",
    ctaAfter: 4,
    ctaTitle: "Vil du med på årets trends?",
    ctaText:
      "Gardinbussen kommer forbi med de nyeste stoffer og farver, så du kan se trenden i dit eget hjem — gratis og uforpligtende.",
    sections: [
      {
        h: "Naturmaterialer og jordfarver",
        html:
          P(
            "Lin, bomuld og naturlige vævninger fortsætter fremgangen. Paletten er varm og afdæmpet: sand, ler, oliven, terrakotta og støvede grønne toner, der skaber ro og lægger sig fint op ad de rå, naturlige overflader, mange indretter med."
          ),
      },
      {
        h: "Bløde wave-fald og enkle skinner",
        html:
          P(
            "Det ensartede <em>wave</em>-fald — de bløde, stående bølger — er blevet standarden for et roligt, moderne look. Det parres med diskrete loftskinner, der næsten forsvinder, så gardinet får lov at være rummets tekstile detalje."
          ),
      },
      {
        h: "Lag på lag",
        html:
          P(
            "Kombinationen af et transparent gardin inderst og et mørklæggende eller tungere gardin yderst giver både lys om dagen og mørke om aftenen — og en dybde i vinduet, der får rummet til at virke gennemført."
          ),
      },
      {
        h: "Motoriserede og smarte løsninger",
        html:
          P(
            "Motoriserede gardiner og persienner bliver mere udbredte og prisvenlige. De kan styres med app eller tidsplan, åbne blidt om morgenen og lukke ved solnedgang — praktisk ved høje vinduer og store partier, hvor daglig betjening ellers er besværlig."
          ),
      },
      {
        h: "Bæredygtighed",
        html:
          P(
            "Flere efterspørger holdbare stoffer, genanvendte fibre og produktion tættere på hjemmet. Et kvalitetsgardin, der holder i mange år og syes efter mål, er både et grønnere og på sigt billigere valg end noget, der skal skiftes ofte."
          ),
      },
    ],
  },
  {
    slug: "hvad-koster-gardiner-efter-maal",
    seed: 9,
    category: "Pris & råd",
    date: "2026-06-20",
    updated: "2026-07-24",
    readingMin: 6,
    title: "Hvad koster gardiner efter mål? Prisguide 2026",
    h1: "Hvad koster gardiner efter mål? Prisguide 2026",
    description:
      "Prisguide til gardiner efter mål: hvad påvirker prisen, vejledende prisintervaller, efter mål vs. standard, og sådan får du mest for pengene.",
    keywords: ["hvad koster gardiner", "pris gardiner efter mål", "gardiner pris", "prisguide gardiner"],
    lead:
      "“Hvad koster gardiner?” er svært at svare kort på — prisen afhænger af stof, størrelse, ophæng og montering. Her er en gennemsigtig guide, så du ved, hvad der driver prisen, og hvordan du får mest for pengene.",
    ctaAfter: 3,
    ctaTitle: "Få et gratis, uforpligtende tilbud hjemme hos dig",
    ctaText:
      "Gardinbussen måler op og giver dig en fast pris på stedet — uden overraskelser. Book et gratis hjemmebesøg.",
    sections: [
      {
        h: "Hvad påvirker prisen?",
        html:
          P("Fire ting afgør det meste af prisen på gardiner efter mål:") +
          UL(
            "<strong>Stoffet</strong> — kvalitet, vævning og om det er mørklæggende eller foeret.",
            "<strong>Størrelsen</strong> — både bredde (stofmængde til fald) og højde.",
            "<strong>Ophænget</strong> — skinne, stang, kassette, wave-fald og eventuel motor.",
            "<strong>Montering</strong> — om den er inkluderet, og hvor mange vinduer der er tale om."
          ),
      },
      {
        h: "Vejledende prisintervaller",
        html:
          P(
            "Priser varierer meget efter stof og størrelse, men som pejlemærke ligger et enkelt rullegardin eller plissé i den lave ende, mens store, foerede mørklægningsgardiner med wave-fald og motor ligger markant højere. Den eneste præcise pris er den, du får ud fra dine konkrete mål og stofvalg."
          ) +
          `<blockquote>Tip: Bed altid om en samlet pris inkl. montering, så du kan sammenligne tilbud æble mod æble.</blockquote>`,
      },
      {
        h: "Efter mål vs. standardgardiner",
        html:
          P(
            "Færdigsyede standardgardiner er billigere fra hylden, men passer sjældent perfekt — og et gardin, der er for kort eller for smalt, taber både funktion og udtryk. Efter mål koster mere, men giver rigtigt fald, fuld dækning og en løsning, der holder i årevis."
          ),
      },
      {
        h: "Sådan får du mest for pengene",
        html:
          UL(
            "Prioritér stoffet i de rum, du bruger mest — spar eventuelt på birum.",
            "Vælg ét godt mørklægningslag frem for to halve løsninger.",
            "Få flere vinduer med i samme ombæring — det er ofte mere fordelagtigt.",
            "Få en professionel opmåling, så du undgår dyre fejlkøb."
          ),
      },
    ],
  },
];

/* ---------- Skriv filer ---------- */
for (const a of articles) {
  writeFileSync(join(__dir, `${a.slug}.html`), renderArticle(a, articles), "utf8");
  console.log("skrev", `${a.slug}.html`);
}
writeFileSync(join(__dir, "index.html"), renderIndex(articles), "utf8");
console.log("skrev index.html");
console.log(`\nFærdig: ${articles.length} artikler + oversigt.`);
