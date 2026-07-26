/* Fælles byggeklodser for hele sitet: header (med by-dropdown), footer,
 * affiliate-hjælpere og listen over byer. Importeres af generatorerne. */

export const BRAND = "Gardinbussen";
export const PARTNER = "52168";
export const BANNER = "115355";

/* Bookingside hos affiliate-udbyderen (angivet af ejeren) */
export const BOOK_URL = "https://gardinbus.nu/book-gardinbus/";

/* Byg et Partner-ads website-affiliatelink til en given destination (HTML-escaped &) */
export function affWeb(destUrl) {
  const base = `https://www.partner-ads.com/dk/klikbanner.php?partnerid=${PARTNER}&amp;bannerid=${BANNER}`;
  return destUrl ? `${base}&amp;htmlurl=${destUrl}` : base;
}
export const AFF_BOOK = affWeb(BOOK_URL);

export const markSVG = `<svg class="mark" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M4 6v13m16-13v13M4 19h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 6v13M10 6v13M13 6v13M16 6v13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity=".7"/></svg>`;

/* Større danske byer, som Gardinbussen dækker */
export const CITIES = [
  // Sjælland og Hovedstaden
  { slug: "koebenhavn", name: "København", region: "Sjælland", postnr: "1000–2999", oplande: ["Frederiksberg", "Valby", "Amager", "Vanløse", "Brønshøj"] },
  { slug: "roskilde", name: "Roskilde", region: "Sjælland", postnr: "4000", oplande: ["Trekroner", "Himmelev", "Viby Sjælland", "Jyllinge"] },
  { slug: "koege", name: "Køge", region: "Sjælland", postnr: "4600", oplande: ["Herfølge", "Borup", "Solrød", "Bjæverskov"] },
  { slug: "hilleroed", name: "Hillerød", region: "Sjælland", postnr: "3400", oplande: ["Nødebo", "Skævinge", "Gørløse"] },
  { slug: "helsingoer", name: "Helsingør", region: "Sjælland", postnr: "3000", oplande: ["Espergærde", "Snekkersten", "Ålsgårde"] },
  { slug: "naestved", name: "Næstved", region: "Sjælland", postnr: "4700", oplande: ["Fensmark", "Glumsø", "Fladså"] },
  { slug: "slagelse", name: "Slagelse", region: "Sjælland", postnr: "4200", oplande: ["Korsør", "Skælskør", "Sørbymagle"] },
  { slug: "holbaek", name: "Holbæk", region: "Sjælland", postnr: "4300", oplande: ["Jyderup", "Tølløse", "Regstrup"] },
  { slug: "ringsted", name: "Ringsted", region: "Sjælland", postnr: "4100", oplande: ["Benløse", "Kværkeby", "Jystrup"] },
  // Fyn
  { slug: "odense", name: "Odense", region: "Fyn", postnr: "5000", oplande: ["Bolbro", "Hjallese", "Seden", "Bellinge"] },
  { slug: "svendborg", name: "Svendborg", region: "Fyn", postnr: "5700", oplande: ["Thurø", "Vindeby", "Gudme"] },
  // Jylland
  { slug: "aarhus", name: "Aarhus", region: "Jylland", postnr: "8000", oplande: ["Risskov", "Viby J", "Åbyhøj", "Højbjerg", "Brabrand"] },
  { slug: "aalborg", name: "Aalborg", region: "Jylland", postnr: "9000", oplande: ["Nørresundby", "Hasseris", "Gistrup", "Svenstrup"] },
  { slug: "esbjerg", name: "Esbjerg", region: "Jylland", postnr: "6700", oplande: ["Sædding", "Bramming", "Tjæreborg"] },
  { slug: "randers", name: "Randers", region: "Jylland", postnr: "8900", oplande: ["Dronningborg", "Kristrup", "Assentoft"] },
  { slug: "kolding", name: "Kolding", region: "Jylland", postnr: "6000", oplande: ["Bramdrupdam", "Vonsild", "Vester Nebel"] },
  { slug: "horsens", name: "Horsens", region: "Jylland", postnr: "8700", oplande: ["Egebjerg", "Stensballe", "Lund"] },
  { slug: "vejle", name: "Vejle", region: "Jylland", postnr: "7100", oplande: ["Bredballe", "Jelling", "Børkop"] },
  { slug: "herning", name: "Herning", region: "Jylland", postnr: "7400", oplande: ["Snejbjerg", "Gjellerup", "Lind"] },
  { slug: "silkeborg", name: "Silkeborg", region: "Jylland", postnr: "8600", oplande: ["Gødvad", "Alderslyst", "Funder"] },
  { slug: "viborg", name: "Viborg", region: "Jylland", postnr: "8800", oplande: ["Overlund", "Bjerringbro", "Stoholm"] },
  { slug: "fredericia", name: "Fredericia", region: "Jylland", postnr: "7000", oplande: ["Erritsø", "Snoghøj", "Taulov"] },
  { slug: "soenderborg", name: "Sønderborg", region: "Jylland", postnr: "6400", oplande: ["Augustenborg", "Nordborg", "Gråsten"] },
  { slug: "frederikshavn", name: "Frederikshavn", region: "Jylland", postnr: "9900", oplande: ["Sæby", "Skagen", "Strandby"] },
];

export const REGIONS = ["Sjælland", "Fyn", "Jylland"];

/* By-dropdown til headeren (grupperet efter landsdel), bygget med <details> = ingen JS */
function cityDropdown(SITE_URL) {
  const cols = REGIONS.map((r) => {
    const items = CITIES.filter((c) => c.region === r)
      .map((c) => `<a href="${SITE_URL}/byer/${c.slug}.html">${c.name}</a>`)
      .join("");
    return `<div class="dropcol"><p class="dropcol__h">${r}</p>${items}</div>`;
  }).join("");
  return `<details class="dropdown">
    <summary>Landsdækkende gardinservice</summary>
    <div class="dropmenu">
      <a class="dropmenu__all" href="${SITE_URL}/byer/">Se alle byer →</a>
      <div class="dropcols">${cols}</div>
    </div>
  </details>`;
}

export function header(SITE_URL) {
  return `<header class="site">
  <nav class="nav" aria-label="Hovedmenu">
    <a class="brand" href="${SITE_URL}/">${markSVG}${BRAND}</a>
    <div class="nav-links">
      <a href="${SITE_URL}/#sortiment">Sortiment</a>
      ${cityDropdown(SITE_URL)}
      <a href="${SITE_URL}/inspiration/">Inspiration</a>
      <a href="${SITE_URL}/blog/">Guides</a>
      <a href="${SITE_URL}/#kontakt">Kontakt</a>
    </div>
    <a class="btn btn-primary" href="${SITE_URL}/#kontakt">Book hjemmebesøg</a>
  </nav>
</header>`;
}

export function footer(SITE_URL) {
  return `<footer class="site">
  <div class="wrap foot">
    <a class="brand" href="${SITE_URL}/">${markSVG}${BRAND}</a>
    <p>© ${new Date().getFullYear()} ${BRAND} · Landsdækkende gardinservice.</p>
    <div class="foot-links">
      <a href="${SITE_URL}/byer/">Byer</a>
      <a href="${SITE_URL}/inspiration/">Inspiration</a>
      <a href="${SITE_URL}/blog/">Guides</a>
      <a href="${SITE_URL}/#kontakt">Book</a>
    </div>
  </div>
  <div class="wrap">
    <p class="disclosure">Annonce: ${BRAND} er en uafhængig side. Links til Gardinbus.nu er affiliate-links, som vi kan modtage provision fra, hvis du booker eller køber. Det påvirker ikke din pris. Priser og oplysninger er vejledende.</p>
  </div>
</footer>`;
}
