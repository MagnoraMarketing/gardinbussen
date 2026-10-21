// SEO-sektion "Få et gratis besøg og et tilbud på …" (Gardinbus.nu) på alle
// sider + tekniske SEO-opdateringer (sitemap med lastmod, datoer i
// Article-schema, PNG-delingsbillede).
//
// Scriptet retter direkte i de færdige HTML-filer og kan køres igen og igen:
// sektionen ligger mellem <!-- SEO-BOOK:START --> og <!-- SEO-BOOK:END --> og
// udskiftes ved hver kørsel. Køres automatisk af build.js.

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { SITE, CITIES, REGION, slugify, esc, bookBtn } = require("./site-data");

const ROOT = path.join(__dirname, "..");
const START = "<!-- SEO-BOOK:START -->";
const END = "<!-- SEO-BOOK:END -->";

// ---------- emner pr. blogindlæg ----------
// product: det man får pris på ("få pris på …")
// intro:   én sætning om, hvorfor et besøg giver mening for netop dette emne
// related: slugs på andre guides, der linkes til
const BLOG_TOPICS = {
  "gardiner": { product: "nye gardiner", intro: "Gardiner skal ses i dit eget lys og måles præcist op, før du kan få et flot fald og en retvisende pris.", related: ["foldegardiner", "gardinstaenger-og-skinner", "hvad-koster-gardiner"] },
  "rullegardiner": { product: "nye rullegardiner", intro: "Rullegardiner skal passe millimeterpræcist i vinduet, og stoffet bestemmer, hvor meget lys der slipper igennem.", related: ["solfilmsrullegardiner", "moerklaegningsgardiner-efteraar", "plissegardiner"] },
  "persienner": { product: "nye persienner", intro: "Persienner fås i mange lamelbredder, farver og materialer, og det er lettest at vælge, når du kan se prøverne i dit eget vindue.", related: ["traepersienner", "plissegardiner", "lamelgardiner"] },
  "plissegardiner": { product: "nye plisségardiner", intro: "Plisségardiner kan monteres i vinduesrammen, og stoffet findes i alt fra lystransparent til helt mørklæggende.", related: ["rullegardiner", "persienner", "luxaflex"] },
  "lamelgardiner": { product: "nye lamelgardiner", intro: "Lamelgardiner til store vinduespartier og skydedøre skal måles præcist op, så lamellerne falder rigtigt og kan køre frit.", related: ["panelgardiner", "screengardiner", "persienner"] },
  "gardinstaenger-og-skinner": { product: "gardinstænger og skinner", intro: "Det rigtige ophæng afhænger af loft, væg og gardinets vægt, og det er nemmest at vælge, når nogen ser rummet med egne øjne.", related: ["gardiner", "foldegardiner", "motoriserede-gardiner-smart-home"] },
  "foldegardiner": { product: "nye foldegardiner", intro: "Foldegardiner kræver det rette stofforbrug og det rigtige ophæng for at få bløde, ensartede folder.", related: ["gardiner", "gardinstaenger-og-skinner", "lagdelte-gardiner-efteraar"] },
  "traepersienner": { product: "nye træpersienner", intro: "Træpersienner findes i mange træsorter og farver, og det er en stor fordel at se dem op ad dine egne møbler og gulve.", related: ["persienner", "naturmaterialer-gardiner-efteraarstrends", "plissegardiner"] },
  "insektnet-til-vinduer-og-doere": { product: "insektnet til vinduer og døre", intro: "Insektnet skal tilpasses den enkelte ramme og dør, så det slutter tæt og er nemt at betjene i hverdagen.", related: ["plissegardiner", "rullegardiner", "screengardiner"] },
  "luxaflex": { product: "Luxaflex-gardiner", intro: "Luxaflex spænder fra klassiske rullegardiner til motoriserede PowerView-løsninger, og en gennemgang hjemme hos dig gør valget meget nemmere.", related: ["motoriserede-gardiner-smart-home", "gardiner-stemmestyring-smart-home", "plissegardiner"] },
  "moerklaegningsgardiner-efteraar": { product: "mørklægningsgardiner", intro: "Mørklægning virker kun, hvis gardinet slutter tæt om vinduet, så en præcis opmåling er afgørende.", related: ["gardiner-sovevaerelse-efteraar", "rullegardiner", "plissegardiner"] },
  "hold-paa-varmen-med-gardiner": { product: "varmebesparende gardiner", intro: "Hvor meget varme gardinerne holder på, afhænger af stof, foer og hvor tæt de sidder, og det vurderes bedst ved dit eget vindue.", related: ["termogardiner-spar-paa-varmen", "gardiner-mod-traek-og-kulde", "plissegardiner"] },
  "termogardiner-spar-paa-varmen": { product: "nye termogardiner", intro: "Termogardiner skal passe tæt til vinduet for at isolere, så opmålingen betyder meget for både komfort og besparelse.", related: ["hold-paa-varmen-med-gardiner", "gardiner-mod-traek-og-kulde", "moerklaegningsgardiner-efteraar"] },
  "gardiner-sovevaerelse-efteraar": { product: "nye gardiner til soveværelset", intro: "I soveværelset handler det om mørke, ro og lune, og den rette kombination af gardin og mørklægning afhænger af dine vinduer.", related: ["moerklaegningsgardiner-efteraar", "lagdelte-gardiner-efteraar", "termogardiner-spar-paa-varmen"] },
  "gardiner-mod-traek-og-kulde": { product: "gardiner mod træk og kulde", intro: "Træk fra vinduerne kan ofte dæmpes med tætsluttende gardiner og det rigtige ophæng, når løsningen tilpasses dit hjem.", related: ["hold-paa-varmen-med-gardiner", "termogardiner-spar-paa-varmen", "gardiner-fugt-kondens-efteraar"] },
  "gardiner-om-efteraaret-hygge": { product: "nye gardiner til efteråret", intro: "Efterårets hygge starter ved vinduerne, og stoffer, farver og lag vælges bedst i det lys, du har derhjemme.", related: ["efteraarsfarver-gardiner-inspiration", "efteraarsklar-stue-gardiner", "lagdelte-gardiner-efteraar"] },
  "efteraarsfarver-gardiner-inspiration": { product: "gardiner i efterårsfarver", intro: "Farver ser meget forskellige ud i butikkens lys og dit eget, så det er en stor hjælp at se prøverne op ad dine vægge og møbler.", related: ["naturmaterialer-gardiner-efteraarstrends", "efteraarsklar-stue-gardiner", "gardiner-om-efteraaret-hygge"] },
  "efteraarsklar-stue-gardiner": { product: "nye gardiner til stuen", intro: "Stuen er husets samlingspunkt, og gardinerne skal både give hygge, lys og ro, tilpasset netop dine vinduer.", related: ["gardiner-om-efteraaret-hygge", "lagdelte-gardiner-efteraar", "foldegardiner"] },
  "naturmaterialer-gardiner-efteraarstrends": { product: "gardiner i naturmaterialer", intro: "Hør, bomuld og træ skal føles og ses i virkeligheden, før du vælger, og det gør du bedst hjemme hos dig selv.", related: ["traepersienner", "efteraarsfarver-gardiner-inspiration", "gardiner"] },
  "lagdelte-gardiner-efteraar": { product: "lagdelte gardinløsninger", intro: "Lagdelte gardiner kombinerer flere typer, og det kræver et samlet overblik over vindue, ophæng og lysbehov.", related: ["gardiner", "rullegardiner", "moerklaegningsgardiner-efteraar"] },
  "solfilm-til-vinduer": { product: "solfilm til dine vinduer", intro: "Solfilm vælges ud fra vinduernes retning, glastype og hvor meget varme og lys du vil holde ude.", related: ["solfilm-eller-gardiner", "solfilm-mod-falmede-mobler", "privatlivsfilm-til-vinduer"] },
  "solfilm-eller-gardiner": { product: "solfilm eller gardiner", intro: "Om solfilm, gardiner eller en kombination er bedst, afhænger af rummet, udsigten og solens indfald, og det vurderes bedst på stedet.", related: ["solfilm-til-vinduer", "solfilmsrullegardiner", "screengardiner"] },
  "privatlivsfilm-til-vinduer": { product: "privatlivsfilm til vinduer", intro: "Privatlivsfilm skal balancere indkig og dagslys, og det rigtige valg afhænger af, hvor tæt naboerne bor.", related: ["solfilm-til-vinduer", "plissegardiner", "rullegardiner"] },
  "solfilmsrullegardiner": { product: "nye solfilmsrullegardiner", intro: "Solfilmsrullegardiner skal passe præcist til vinduet og vælges ud fra, hvor meget sol og varme du vil holde ude.", related: ["rullegardiner", "solfilm-til-vinduer", "screengardiner"] },
  "motoriserede-gardiner-smart-home": { product: "motoriserede gardiner", intro: "Motoriserede gardiner kræver planlægning af strøm, styring og ophæng, og det er nemmest at få overblik ved et besøg.", related: ["gardiner-stemmestyring-smart-home", "solcelledrevne-gardiner", "luxaflex"] },
  "billige-gardiner-eller-god-kvalitet": { product: "gardiner i den rette kvalitet", intro: "Den bedste balance mellem pris og kvalitet finder du, når du kan sammenligne stofferne side om side i dit eget hjem.", related: ["tegn-paa-god-kvalitet-gardiner", "hvad-koster-gardiner", "gardiner"] },
  "gardiner-fugt-kondens-efteraar": { product: "gardiner til fugtige rum", intro: "Stofvalg og afstand til ruden har betydning for fugt og kondens, og det vurderes bedst ved dine egne vinduer.", related: ["gardiner-mod-traek-og-kulde", "hold-paa-varmen-med-gardiner", "rullegardiner"] },
  "gardiner-stemmestyring-smart-home": { product: "gardiner med stemmestyring", intro: "Stemmestyrede gardiner skal kobles til dit smart home, og en gennemgang hjemme hos dig sikrer, at alt spiller sammen.", related: ["motoriserede-gardiner-smart-home", "solcelledrevne-gardiner", "luxaflex"] },
  "hvad-koster-gardiner": { product: "nye gardiner", intro: "Den præcise pris kræver en opmåling og et valg af stof og ophæng, og det får du samlet på ét gratis besøg.", related: ["billige-gardiner-eller-god-kvalitet", "tegn-paa-god-kvalitet-gardiner", "gardiner"] },
  "panelgardiner": { product: "nye panelgardiner", intro: "Panelgardiner til store vinduer og skydedøre skal have den rigtige skinne og bredde, og det kræver en præcis opmåling.", related: ["lamelgardiner", "screengardiner", "gardinstaenger-og-skinner"] },
  "screengardiner": { product: "nye screengardiner", intro: "Screenstoffets åbningsgrad bestemmer, hvor meget sol der holdes ude, og hvor meget af udsigten du bevarer.", related: ["solfilmsrullegardiner", "solafskaermning-hjemmekontor", "rullegardiner"] },
  "solafskaermning-hjemmekontor": { product: "solafskærmning til hjemmekontoret", intro: "Blænding på skærmen og varme om eftermiddagen løses bedst med en løsning, der er tilpasset netop dit kontors vinduer.", related: ["screengardiner", "solfilm-til-vinduer", "persienner"] },
  "solcelledrevne-gardiner": { product: "solcelledrevne gardiner", intro: "Solcelledrevne gardiner kræver hverken stikkontakt eller elektriker, men placeringen af solcellen skal planlægges.", related: ["motoriserede-gardiner-smart-home", "gardiner-stemmestyring-smart-home", "luxaflex"] },
  "solfilm-mod-falmede-mobler": { product: "solfilm mod falmning", intro: "Hvor meget UV-lys der skal filtreres fra, afhænger af vinduernes retning og de møbler og gulve, du vil beskytte.", related: ["solfilm-til-vinduer", "solfilm-eller-gardiner", "screengardiner"] },
  "nye-gardiner-til-efteraaret": { product: "nye gardiner til efteråret", intro: "Efterårets gardiner skal holde på varmen, mørklægge og skabe hygge, og den rigtige løsning afhænger af dine vinduer og rum.", related: ["hold-paa-varmen-med-gardiner", "gardiner-sovevaerelse-efteraar", "efteraarsklar-stue-gardiner"] },
  "gardinmode-trends-2026": { product: "moderne gardiner", intro: "Årets farver og stoffer skal ses i dit eget lys og op ad dine egne møbler, før du ved, hvilke trends der passer til dit hjem.", related: ["naturmaterialer-gardiner-efteraarstrends", "efteraarsklar-stue-gardiner", "motoriserede-gardiner-smart-home"] },
  "tegn-paa-god-kvalitet-gardiner": { product: "gardiner i god kvalitet", intro: "Kvalitet skal mærkes og ses, så det er en fordel at have prøverne i hånden hjemme hos dig.", related: ["billige-gardiner-eller-god-kvalitet", "hvad-koster-gardiner", "gardiner"] },
};

// Faste guides, som ikke-blogsider linker til.
const CORE_GUIDES = ["gardiner", "rullegardiner", "plissegardiner", "hvad-koster-gardiner"];

// ---------- hjælpere ----------
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
const listHtml = (dir) => fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith(".html")).sort();
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Vælg en tekstvariant ud fra en streng, så nabosider ikke får identisk tekst.
function pick(key, variants) {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return variants[h % variants.length];
}

function h1Of(html) {
  const m = html.match(/<h1>([\s\S]*?)<\/h1>/);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

// Titel på en guide til link-kort: første del af h1 før tankestreg.
function guideTitle(slug) {
  const h1 = h1Of(read(`blog/${slug}.html`));
  return h1.split(/ — | – |\? /)[0].replace(/\?$/, "?");
}

function guideCards(slugs, prefix) {
  return slugs
    .filter((s) => fs.existsSync(path.join(ROOT, "blog", `${s}.html`)))
    .map((s) => `          <a class="related-card" href="${prefix}${s}.html"><span>${guideTitle(s)}</span><em>Læs guiden →</em></a>`)
    .join("\n");
}

// Selve sektionen. `topic` er fx "nye rullegardiner"; `where` fx " i Køge".
// Sektionen beskriver leverandørens (Gardinbus.nu) gratis besøg — sitet selv
// udfører ikke besøg, opmåling eller montering.
function section({ key, topic, where = "", intro, relatedHtml, relatedTitle, extraHtml = "", alt }) {
  const heading = `Få et gratis besøg${where} og et tilbud på ${topic}`;
  const body = pick(key, [
    `Gardinbus.nu tilbyder et gratis og uforpligtende besøg${where}, hvor en konsulent tager prøver med, viser stoffer og løsninger i dit eget lys, måler vinduerne op og giver et tilbud på ${topic}. Du forpligter dig ikke til noget.`,
    `Du behøver ikke køre rundt til flere butikker for at få pris på ${topic}. Ved et gratis besøg fra Gardinbus.nu${where} får du prøver, rådgivning og opmåling hjemme hos dig — og et uforpligtende tilbud, du kan sammenligne med andre.`,
    `Med en gardinbus fra Gardinbus.nu kommer prøverne hjem til dig${where}. Konsulenten måler op, rådgiver ud fra dine vinduer og din indretning og giver et uforpligtende tilbud på ${topic}. Besøget er gratis.`,
  ]);
  const cls = alt ? "section section-alt seo-book" : "section seo-book";
  return `${START}
    <section class="${cls}" aria-labelledby="gratis-besoeg-titel">
      <div class="container legal">
        <p class="eyebrow">Gratis besøg fra Gardinbus.nu</p>
        <h2 id="gratis-besoeg-titel">${esc(heading)}</h2>
        <p>${esc(intro)}</p>
        <p>${esc(body)}</p>
        <h3>Sådan får du et tilbud på ${esc(topic)}</h3>
        <ol class="seo-book-steps">
          <li><strong>Book hos Gardinbus.nu.</strong> Udfyld bookingformularen med adresse og antal vinduer.</li>
          <li><strong>Aftal en tid.</strong> Leverandøren kontakter dig og finder et tidspunkt, der passer.</li>
          <li><strong>Se prøverne${esc(where)}.</strong> Konsulenten måler op og giver et uforpligtende tilbud — du bestemmer selv, om du vil gå videre.</li>
        </ol>
        <p class="seo-book-cta">${bookBtn(`Book gratis besøg${where}`, "btn-primary")}</p>
        <p class="seo-book-note">Linket fører til Gardinbus.nu og er et affiliate-link.</p>
${extraHtml}        <h3>${esc(relatedTitle)}</h3>
        <div class="related-grid">
${relatedHtml}
        </div>
      </div>
    </section>
    ${END}`;
}

// Indsæt/udskift sektionen lige før booking-sektionen (eller før </main>).
function inject(html, block) {
  html = html.replace(new RegExp(`\\s*${START}[\\s\\S]*?${END}`), "");
  const m = html.match(/\n[ \t]*<section class="[^"]*\bbooking\b[^"]*" id="booking">/) || html.match(/\n[ \t]*<\/main>/);
  const at = m.index + 1; // start på ankerlinjen
  return `${html.slice(0, at).replace(/\s*$/, "")}\n\n    ${block}\n\n${html.slice(at)}`;
}

// Skal sektionen have lys eller sandfarvet baggrund? Modsat af sektionen før.
function wantsAlt(html) {
  const cut = html.search(/<section class="[^"]*\bbooking\b[^"]*" id="booking">/);
  const before = (cut > 0 ? html.slice(0, cut) : html.slice(0, html.indexOf("</main>")))
    .replace(new RegExp(`${START}[\\s\\S]*?${END}`), "");
  const all = [...before.matchAll(/<(?:section|article) class="([^"]*)"/g)];
  const last = all.length ? all[all.length - 1][1] : "";
  return !/section-alt/.test(last);
}

// ---------- byer ----------
const cityFiles = listHtml("byer");
const cities = cityFiles.map((f) => {
  const slug = f.replace(/\.html$/, "");
  const name = CITIES.find((c) => slugify(c) === slug) || h1Of(read(`byer/${f}`)).replace(/^Gardiner i /, "").replace(/ — .*$/, "");
  return { file: f, slug, name, region: REGION[name] || "Danmark" };
});

for (const c of cities) {
  const f = `byer/${c.file}`;
  let html = read(f);
  const neighbours = cities.filter((o) => o.region === c.region && o.slug !== c.slug);
  // Roter listen, så hver by linker til forskellige naboer.
  const start = neighbours.length ? (cities.indexOf(c) % neighbours.length) : 0;
  const near = neighbours.slice(start).concat(neighbours.slice(0, start)).slice(0, 8);
  const nearHtml = near.length
    ? `        <h3>Byguides i nærheden af ${esc(c.name)}</h3>
        <p class="news-related-links">
${near.map((o) => `          <a href="${o.slug}.html">Gardiner i ${esc(o.name)}</a>`).join("\n")}
        </p>
`
    : "";
  const intro = pick(c.slug, [
    `Skal du have nye gardiner, rullegardiner eller persienner i ${c.name}? Den nemmeste vej til en præcis pris er en opmåling af dine egne vinduer.`,
    `Mange i ${c.name} vil gerne kende prisen på nye gardiner, før de beslutter sig. Et retvisende tilbud kræver, at nogen har set vinduerne og målt op.`,
    `Bor du i ${c.name}, kan du få prøver på gardiner, plisségardiner, persienner og meget mere vist hjemme hos dig i stedet for i en butik.`,
  ]);
  html = inject(html, section({
    key: c.slug, topic: "nye gardiner", where: ` i ${c.name}`, intro,
    relatedTitle: `Guides til dig, der skal have nye gardiner i ${c.name}`,
    relatedHtml: guideCards(pick(c.slug + "g", [
      ["gardiner", "plissegardiner", "hvad-koster-gardiner"],
      ["rullegardiner", "persienner", "billige-gardiner-eller-god-kvalitet"],
      ["lamelgardiner", "moerklaegningsgardiner-efteraar", "tegn-paa-god-kvalitet-gardiner"],
    ]), "../blog/"),
    extraHtml: nearHtml,
    alt: wantsAlt(html),
  }));
  write(f, html);
}

// ---------- blog ----------
for (const f of listHtml("blog")) {
  if (f === "index.html") continue;
  const slug = f.replace(/\.html$/, "");
  const t = BLOG_TOPICS[slug];
  if (!t) throw new Error(`Mangler emne i BLOG_TOPICS for blog/${f}`);
  let html = read(`blog/${f}`);
  const bigCities = ["koebenhavn", "aarhus", "odense", "aalborg", "esbjerg", "vejle", "roskilde", "kolding"];
  const cityLinks = bigCities
    .map((s) => cities.find((c) => c.slug === s))
    .filter(Boolean)
    .map((c) => `          <a href="../byer/${c.slug}.html">Gardiner i ${esc(c.name)}</a>`)
    .join("\n");
  html = inject(html, section({
    key: slug, topic: t.product, intro: t.intro,
    relatedTitle: "Flere guides, der hjælper dig med at vælge",
    relatedHtml: guideCards(t.related, ""),
    extraHtml: `        <h3>Byguides: gardiner i din by</h3>
        <p class="news-related-links">
${cityLinks}
          <a href="../index.html#omraade">Se alle byer</a>
        </p>
`,
    alt: wantsAlt(html),
  }));
  write(`blog/${f}`, html);
}

// ---------- øvrige sider ----------
const OTHER = [
  { file: "index.html", prefix: "blog/", topic: "nye gardiner", intro: "Har du læst dig frem til, hvilken gardintype du er interesseret i? Så er næste skridt at se prøverne i dit eget lys og få dine vinduer målt op, så du kan få en præcis pris." },
  { file: "om-os.html", prefix: "blog/", topic: "nye gardiner", intro: "Vores guides hjælper dig med at blive klogere på gardiner. Når du vil have en konkret pris, kan du gå videre til Gardinbus.nu, der tilbyder gratis besøg med prøver og opmåling." },
  { file: "hvorfor-gardinbussen.html", prefix: "blog/", topic: "nye gardiner", intro: "Et godt tilbud på gardiner bygger på en præcis opmåling og stoffer, du faktisk har set og mærket. Det er formålet med et gratis besøg fra Gardinbus.nu." },
  { file: "nyheder.html", prefix: "blog/", topic: "nye gardiner og solafskærmning", intro: "Har du fået lyst til en af løsningerne ovenfor? Så kan du se dem i dit eget hjem, før du bestemmer dig." },
  { file: "blog/index.html", prefix: "", topic: "nye gardiner", intro: "Når du har læst dig klog på gardintyper, stoffer og solafskærmning, er næste skridt at se løsningerne i dit eget hjem og få en præcis pris." },
];
for (const p of OTHER) {
  let html = read(p.file);
  html = inject(html, section({
    key: p.file, topic: p.topic, intro: p.intro,
    relatedTitle: "Populære guides om gardiner",
    relatedHtml: guideCards(CORE_GUIDES.slice(0, 3), p.prefix),
    alt: wantsAlt(html),
  }));
  write(p.file, html);
}

// ---------- git-datoer ----------
function gitDate(file, first) {
  try {
    const out = execSync(`git log ${first ? "--diff-filter=A --follow" : "-1"} --format=%cs -- "${file}"`, { cwd: ROOT }).toString().trim().split("\n");
    return first ? out[out.length - 1] : out[0];
  } catch { return ""; }
}
const today = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

// ---------- Article-schema: datoer + PNG-billede ----------
for (const f of listHtml("blog")) {
  if (f === "index.html") continue;
  const rel = `blog/${f}`;
  let html = read(rel);
  const published = gitDate(rel, true) || today;
  html = html.replace(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema.org","@type":"Article"[\s\S]*?)<\/script>/, (m, json) => {
    const o = JSON.parse(json);
    o.image = `${SITE}/assets/og-image.png`;
    o.datePublished = o.datePublished || published;
    o.dateModified = today; // rettes af seo-technical.js, hvis indholdet er uændret
    o.inLanguage = "da-DK";
    return `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
  });
  write(rel, html);
}

// ---------- delingsbillede: SVG -> PNG på alle sider ----------
const allPages = ["index.html", "om-os.html", "hvorfor-gardinbussen.html", "nyheder.html", "tak.html", "privatlivspolitik.html"]
  .concat(listHtml("blog").map((f) => `blog/${f}`))
  .concat(listHtml("byer").map((f) => `byer/${f}`));
for (const f of allPages) {
  let html = read(f);
  html = html.split(`${SITE}/assets/og-image.svg`).join(`${SITE}/assets/og-image.png`);
  if (!html.includes('property="og:image:width"')) {
    html = html.replace(/(\n([ \t]*)<meta property="og:image" content="[^"]*" \/>)/,
      `$1\n$2<meta property="og:image:width" content="1200" />\n$2<meta property="og:image:height" content="630" />\n$2<meta property="og:image:alt" content="bookgardinbussen.online – guides til gardiner og gratis gardinbus-besøg" />`);
  }
  write(f, html);
}

// sitemap.xml genereres af scripts/seo-technical.js (kør den bagefter).

console.log(`SEO-sektion på ${cities.length} bysider, ${Object.keys(BLOG_TOPICS).length} blogindlæg og ${OTHER.length} øvrige sider.`);
