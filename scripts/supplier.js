// Leverandøren bag affiliate-linkene: Gardinbus.nu ("Gardinbussen").
//
// bookgardinbussen.online er et selvstændigt informations- og
// affiliatesite. Selve servicen (besøg, prøver, opmåling, tilbud, montering)
// leveres af Gardinbus.nu. Brug kun oplysninger herfra i teksterne, og hold
// dem i sync med docs/seo/leverandoerkatalog.md.
//
// Alle links til Gardinbus.nu går gennem det eksisterende Partner-ads-link
// (partnerid/bannerid/uid bevares). Kun htmlurl — destinationen hos
// Gardinbus.nu — skiftes, så linket lander på den relevante side.

const SUPPLIER_NAME = "Gardinbus.nu";
const SUPPLIER_HOME = "https://gardinbus.nu/";

// Sider hos Gardinbus.nu, som er fundet i søgemaskinernes indeks
// 2026-10-21 (direkte adgang var ikke mulig fra udviklingsmiljøet). Se
// docs/seo/leverandoerkatalog.md. Tilføj kun en side her, når URL'en er
// kontrolleret.
const SUPPLIER_PAGES = {
  produkter: "produkter/",
  gardiner: "gardiner/",
  persienner: "persienner/",
  luxaflex: "luxaflex/",
  insektnet: "insektnet-til-vinduer-og-doere/",
  faq: "faq/",
  daekning: "landsdaekkende-service/",
  erhverv: "erhverv-og-institutioner/",
  inspiration: "se-vores-gardinloesninger",
  monteringLamel: "lamelgardiner/montering-af-lamelgardiner/",
  monteringPersienner: "persienner/montering-af-persienner/",
  handelsbetingelser: "handelsbetingelser/",
  // Regionale sider
  koebenhavn: "gardinbussen-koebenhavn/",
  sjaelland: "gardinbussen-sjaelland/",
  jylland: "gardinbussen-jylland/",
  fyn: "gardinbussen-fyn/",
  aalborg: "gardinbussen-aalborg-gardinbus-nu/",
  aarhus: "gardinbussen-aarhus/",
  roskilde: "gardinbussen-roskilde/",
  esbjerg: "gardinbussen-esbjerg/",
  odense: "gardinbussen-odense/",
  vejle: "gardinbussen-vejle/",
};

// Affiliate-link til en side hos Gardinbus.nu. Uden nøgle = bookingsiden
// (det eksisterende AFFILIATE_BOOK_URL, uændret).
function affiliateUrl(key) {
  // Hentes først her, fordi site-data.js selv indlæser denne fil.
  const { AFFILIATE_BOOK_URL } = require("./site-data");
  if (!key || key === "book") return AFFILIATE_BOOK_URL;
  const p = SUPPLIER_PAGES[key];
  if (!p) throw new Error(`Ukendt leverandørside "${key}" (se scripts/supplier.js)`);
  return AFFILIATE_BOOK_URL.replace(/htmlurl=[^&]*$/, `htmlurl=${SUPPLIER_HOME}${p}`);
}

// Hvilken regional side hos Gardinbus.nu passer til en by? Bynavne med en
// egen side hos leverandøren får den; ellers landsdelens side.
const CITY_SUPPLIER_PAGE = {
  "København": "koebenhavn", "Frederiksberg": "koebenhavn",
  "Aarhus": "aarhus", "Aalborg": "aalborg", "Nørresundby": "aalborg",
  "Odense": "odense", "Esbjerg": "esbjerg", "Roskilde": "roskilde", "Vejle": "vejle",
};
// Landsdel (Jylland/Fyn/Sjælland) ud fra region. Faaborg og Kerteminde ligger
// på Fyn, selv om de hører til Region Syddanmark.
const ON_FYN = ["Faaborg", "Kerteminde"];
function landsdel(city, region) {
  if (region === "Fyn" || ON_FYN.includes(city)) return "Fyn";
  if (region === "Hovedstaden" || region === "Sjælland") return "Sjælland";
  return "Jylland";
}
function citySupplierKey(city, region) {
  return CITY_SUPPLIER_PAGE[city] || { Fyn: "fyn", Sjælland: "sjaelland", Jylland: "jylland" }[landsdel(city, region)];
}

// Kort, ensartet affiliate-oplysning til footer og CTA-bokse.
const DISCLOSURE_SHORT = "Annoncelinks: Knapper til Gardinbus.nu er affiliate-links via Partner-ads. Booker du gennem dem, kan bookgardinbussen.online modtage provision.";
const DISCLOSURE_CTA = "Du sendes videre til Gardinbus.nu (affiliate-link). Booking, tilbud og levering aftales direkte med Gardinbus.nu.";

module.exports = {
  SUPPLIER_NAME, SUPPLIER_HOME, SUPPLIER_PAGES, affiliateUrl, landsdel, citySupplierKey,
  DISCLOSURE_SHORT, DISCLOSURE_CTA,
};
