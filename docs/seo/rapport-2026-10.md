# SEO-rapport — bookgardinbussen.online (oktober 2026)

Rapporten skelner mellem **verificeret** (kontrolleret i koden eller i det
byggede site), **indirekte verificeret** (fundet på leverandørens/konkurrentens
sider via søgemaskinens indeks) og **anbefaling/hypotese**.

Vigtigt forbehold: Udviklingsmiljøets netværkspolitik blokerede direkte adgang
til gardinbus.nu, gardinbussen.gratis og det live site. Leverandør- og
konkurrentanalysen bygger derfor på søgemaskinens indeks (titler og uddrag af
indekserede sider). Der var ingen adgang til Google Search Console, Bing
Webmaster Tools, Partner-ads eller søgeords- og backlinkværktøjer. Der er ikke
påstået nogen forbedrede placeringer.

## A. Projektanalyse (verificeret)

- **Framework:** Statisk HTML/CSS/JS uden framework, hostet på Vercel
  (`vercel.json`: redirects fra vercel.app og /index.html, cache- og
  noindex-headers). Ingen database.
- **Generering:** `node scripts/build.js` bygger 70 bysider (`byer/`), 37
  blogindlæg + oversigt (`blog/`), `nyheder.html` (11 artikler) og `llms.txt` ud
  fra `scripts/site-data.js` og `scripts/city-profiles.js`. Derefter indsætter
  `seo-sections.js` en SEO-sektion på alle sider, og `seo-technical.js` styrer
  titler, verifikations-tags, GTM, favicons, cache-busting, datoer og
  `sitemap.xml`. Forside, om-os, hvorfor-gardinbussen, tak, privatlivspolitik og
  404 er håndskrevne.
- **Metadata/canonical:** Sættes i skabelonerne; canonical = egen URL på alle
  indekserbare sider. tak/privatlivspolitik/404 er noindex (via header i
  `vercel.json`).
- **Strukturerede data:** Organization + WebSite (forside), BreadcrumbList,
  Article (blog), FAQPage, ItemList.
- **Analytics:** GA4 (`G-0PZWVB1XWK`, hardkodet i skabelonen) og Google Tag
  Manager (`GTM-WPMBZL4K`). Begge er bevaret uændret.
- **Affiliate:** Ét Partner-ads-link (`partnerid=52168`, `bannerid=113375`,
  `uid=Hjemmeside`, destination `https://gardinbus.nu/gardinbus-book/`).
- **IndexNow:** GitHub Actions-workflow sender ændrede sider ved push til main.
- **Andet:** `api/booking.js` (serverless-formular-endpoint, bruges ikke af
  nogen side i dag), mobil bundmenu og bus-widget i `js/main.js`.
- **Tests:** Der fandtes ingen. Der er tilføjet `scripts/check-site.js` (se K).

## B. Leverandøranalyse — Gardinbus.nu (indirekte verificeret)

Undersøgte sider (via indeks): forside, /produkter/, /gardiner/, /persienner/,
/luxaflex/, /insektnet-til-vinduer-og-doere/, /faq/, /kontakt/,
/book-gardinbus/, /landsdaekkende-service/, /gardinbussen-jylland/, -sjaelland/,
-fyn/, -koebenhavn/, -aarhus/, -aalborg-gardinbus-nu/, -odense/, -esbjerg/,
-roskilde/, -vejle/, /erhverv-og-institutioner/, /handelsbetingelser/,
/gardinbussen-priser/, /se-vores-gardinloesninger, montering af lamelgardiner
og persienner, nyheder (bæredygtige gardiner).

Det fulde katalog med kilde, dato, status og forbehold ligger i
[`leverandoerkatalog.md`](leverandoerkatalog.md). Brugt i indholdet:

- Besøg, rådgivning, opmåling og tilbud er gratis og uforpligtende.
- Sortimentet (gardiner, folde-, plissé-, lamelgardiner, persienner,
  rullegardiner, træpersienner, Luxaflex, solfilm, insektnet).
- Dækning: Jylland, Fyn og Sjælland — adressen bekræftes ved booking.
- Booking via formular; leverandøren ringer og aftaler tid.
- Montering tilbydes; gratis kun ved udvalgte bookingtider.
- Erhverv og institutioner.

**Ikke brugt** (modstridende eller betinget): leveringstider (3 vs. 5–6 vs. 6
uger), betalingsvilkår (faktura efter montering vs. 50 % forud), rabat (25 % ved
min. 3 gardiner + nyhedsbrev), "100 % tilfredshedsgaranti", leverandørens
kontaktoplysninger.

## C. Konkurrentanalyse — Gardinbussen.gratis (indirekte verificeret)

Observeret via indeks:

- Drives af Farver & Striber ApS med fysisk butik i Odder; tlf. og åbningstider
  vises. Egen virksomhed (ikke affiliate) — stærke tillidssignaler (adresse,
  galleri, referencer, egne priseksempler).
- Lokal SEO er målrettet Østjylland: titler som "Opmåling af gardiner nær Aarhus,
  Skanderborg & Horsens", "Lamelgardiner i Aarhus, Skanderborg, Horsens & Vejle".
- Separate sider for opmåling, montering, plissé, lamel, persienner,
  foldegardiner, markiser, erhverv, priser/kampagner og FAQ (.aspx-URL'er).
- Konkrete priseksempler (fx plissé 100×100 cm før/efter rabat).
- Leveringstid i FAQ: ca. 14 dage.
- Svagheder: flere titler er blot "Gardinbus"/"Gardiner" (fx gardinbus.aspx,
  vi-tilbyder.aspx, priser-kampagner.aspx) — svage, ens titler; FAQ-svar på
  "hvor kører gardinbussen?" og "hvordan booker jeg?" var tomme i indekset;
  lokalt fokus på Østjylland efterlader resten af landet; ingen tydelig
  guide-/blogsektion fundet.

Kræver yderligere data: søgevolumener, faktiske placeringer, trafik og
backlinkprofil (ingen adgang til værktøjer — intet er opdigtet).

**Hvor bookgardinbussen.online kan vinde:** flere og dybere guides (37 vs. ingen
fundet), byguides i hele landet (70), tydeligere forklaring af bookingforløbet,
ærlig sammenligning af pris/kvalitet og transparens om affiliate-rollen.

## D. Teknisk SEO

Fundet og rettet (verificeret):

1. **Vildledende Service-schema** på alle 114 sider (via `seo-sections.js`) og
   på bysiderne (med bookgardinbussen.online som "provider" af gardinservice).
   Fjernet; bysider har nu WebPage + BreadcrumbList + FAQPage.
2. **FAQPage-schema uden synlig FAQ** på om-os og hvorfor-gardinbussen. Nu
   matcher schema altid synlige spørgsmål (kontrolleres automatisk).
3. **Organization-schema** beskrev sitet som "mobil gardinservice" med
   `makesOffer`/`areaServed`. Rettet til korrekt beskrivelse.
4. **Forsidens title** var over 60 tegn i praksis og fokuserede på "Book
   Gardinbussen". Ny: "Gardiner efter mål – guides og gratis gardinbus-besøg".
5. **404-siden** brugte relative links, der brydes på dybe stier — nu
   rod-relative.
6. **Mobil:** vandret scroll på /om-os.html (langt ord i H1 og i en
   to-kolonne-liste) rettet.
7. **Håndskrevne sider** havde egne kopier af menu/footer, der var drevet fra
   skabelonen (fx opdigtede "Åbningstider"). `build.js` synkroniserer nu menu
   og footer på dem.

Kontrolleret uden behov for ændring: robots.txt (tillader alt undtagen /api/,
sitemap-linje), sitemap (112 kanoniske URL'er, ingen noindex-sider), canonical
på alle sider, ingen utilsigtet noindex, alle sider er statisk HTML (H1,
indhold, links og metadata kræver ikke JavaScript), IndexNow-opsætning.

## E. Forsiden

- Ny H1 "Find de rigtige gardiner til dine vinduer" og intro, der forklarer
  sitets rolle (guides) og leverandørens rolle (besøg).
- **Fjernet:** opdigtede tal ("2.500+ opsatte gardiner", "4,9/5") og tre
  navngivne kundeanmeldelser uden kilde; "Montering inkluderet"; "Vi kører
  gardinbutikken hjem til dig".
- Ny sektion "Om bookgardinbussen.online" med affiliate-oplysning.
- Trin-for-trin om, hvordan et besøg hos Gardinbus.nu foregår.
- Ny FAQ (8 spørgsmål) med interne links til pris-, kvalitets- og
  mørklægningsguides; FAQ-schema matcher.
- Links til produktudvalget og dækningssiden hos Gardinbus.nu (affiliate).

## F. Produktsider

Produktkategorierne er blogguides under "Gardintyper" og "Solfilm &
solafskærmning" (18 sider) + forsidens 15 produktkort. **Alle 18 er gennemgået
og forbedret**: korrekt afsender, nye titler/beskrivelser (≤ 60/≤ 155 tegn), én
ny praktisk sektion pr. side (fx typiske fejl, fordele/ulemper, tjekliste) og en
knap til den tilsvarende side hos Gardinbus.nu, hvor den findes (gardiner,
persienner, Luxaflex, insektnet) — ellers produktoversigten. Produkter, som
ikke er bekræftet i leverandørens sortiment (panel-, screen-, termogardiner,
motor-/stemme-/solcellestyring, gardinstænger), beskrives som generel viden
med "spørg konsulenten, om løsningen kan leveres".

## G. Blogindlæg

**37 fundet, 37 gennemgået, 37 forbedret, 0 slettet.** Alle slugs, kategorier
og eksisterende sektioner er bevaret; 33 har fået én ny sektion. Rettet
overalt: "vi måler op/monterer/kommer hjem", "vores kunder", "fast tilbud på
stedet", "montering inkluderet/ingen skjulte gebyrer", "book på under et
minut", præcise uverificerede tal (fx "op til 85 % varme", "99 % UV"). Hvert
indlæg har fået et `supplier`-felt, der styrer, hvilken side hos Gardinbus.nu
CTA'en lander på. De 11 nyhedsartikler er rettet tilsvarende.

## H. Bysider

**70 fundet, 70 gennemgået og forbedret, alle URL'er bevaret.** Ny skabelon:

- Ærlig dækning: "Gardinbus.nu oplyser, at de dækker hele <landsdel> …
  Leverandøren bekræfter din adresse" + link til leverandørens regionale side
  (egen byside for København, Aarhus, Aalborg, Odense, Esbjerg, Roskilde, Vejle;
  ellers Jylland/Fyn/Sjælland).
- Ny lokal tjekliste "Afklar dette før besøget i <by>" (roterer, så nabobyer
  ikke er identiske), korrekt FAQ (pris, booking, montering, hvem står bag).
- Bevaret: lokale profiler (boligtyper, bydele, lokalt råd), naboby-links.
- Fjernet: "Montering inkluderet", "fast tilbud på stedet", "vi kører til …".
- Ingen opdigtede lokale kontorer, medarbejdere, anmeldelser eller projekter.

Forbehold: Maribo og Nykøbing Falster (Lolland-Falster) er placeret under
Sjælland; leverandørens titel nævner "Sjælland, Jylland, Fyn og øer", men
dækningen af Lolland-Falster er ikke eksplicit bekræftet.

## I. Affiliate-links

- **Kontrolleret:** 824 affiliate-links på 115 sider (automatisk i
  `check-site.js`): alle bevarer `partnerid=52168`, `bannerid=113375`,
  `uid=Hjemmeside`, peger på gardinbus.nu og har `rel="sponsored noopener"`.
- **Bookinglinket er uændret** (`/gardinbus-book/`).
- **Nyt:** deeplinks til relevante sider hos Gardinbus.nu via samme
  Partner-ads-link (kun `htmlurl` skiftes) — `scripts/supplier.js`.
- **Affiliate-oplysning:** kort tekst i footeren på alle sider, note ved hver
  CTA-boks og en fuld forklaring på /om-os.html#affiliate.
- Ikke testet (ingen netværksadgang): om destinationerne svarer 200, og om
  Partner-ads registrerer klik på deeplinks.

## J. Ændrede filer

| Fil | Hvorfor |
|---|---|
| `scripts/supplier.js` (ny) | Leverandørsider, affiliate-deeplinks, landsdel/regional side pr. by, oplysningstekster |
| `scripts/site-data.js` | Omskrevet indhold i 37 blogindlæg og 11 nyheder; `bookBtn`/`ctaCard` med destination og oplysning |
| `scripts/build.js` | Menu, footer (affiliate-oplysning), ny byskabelon, blog-/nyheds-CTA'er, schema, llms.txt, synk af håndskrevne sider |
| `scripts/seo-sections.js` | Korrekt SEO-sektion; Service-schema fjernet |
| `scripts/seo-technical.js` | Nye titler/beskrivelser til forside, om-os, gardinbus-besøg |
| `scripts/city-profiles.js` | Kommentar (ingen dækningspåstand) |
| `scripts/check-site.js` (ny) | Automatisk kvalitetskontrol |
| `index.html`, `om-os.html`, `hvorfor-gardinbussen.html`, `tak.html`, `privatlivspolitik.html` | Omskrevet (se E og L) |
| `css/styles.css` | Små stilarter til oplysninger + mobilrettelse |
| `blog/*`, `byer/*`, `nyheder.html`, `llms.txt`, `sitemap.xml`, `404.html` | Genereret af build |
| `docs/seo/*`, `.vercelignore` | Dokumentation (udelades fra udrulningen) |

## K. Test (verificeret)

- `node scripts/build.js` kører uden fejl; en ny kørsel giver ingen yderligere
  ændringer (idempotent).
- `node scripts/check-site.js`: 115 sider, 0 fejl, 0 advarsler. Kontrollerer
  interne links og ankre, én H1, title/description-længde, canonical, noindex,
  JSON-LD-syntaks, FAQ-schema mod synligt indhold, affiliate-parametre og
  `rel="sponsored"`, sitemap mod filer, robots.txt og forbudte formuleringer.
  Scriptet er selv testet ved at indsætte et brudt link, et forkert anker, en
  forbudt formulering og et link uden `sponsored` — alle blev fanget.
- Playwright (Chromium) på 390 px og 1280 px: ingen vandret scroll på forside,
  by-, blog-, om-, privatlivs-, tak- og 404-sider (efter rettelse).
- Ikke gennemført: HTTP-statuskoder på live-sitet, Core Web Vitals/PageSpeed,
  Googles Rich Results Test og klik-test af affiliate-links (kræver
  netværksadgang).

## L. Resterende opgaver, der kræver ekstern adgang

1. **Google Search Console:** verificér domænet (`GOOGLE_SITE_VERIFICATION` i
   `scripts/site-data.js`), indsend sitemap, hent forespørgsler/placeringer og
   udfyld keyword-mappet.
2. **Bing Webmaster Tools:** importér fra GSC, indsend sitemap.
3. **Partner-ads:** bekræft at `/gardinbus-book/` er den korrekte landingsside
   (søgeindekset kender kun `/book-gardinbus/`), at deeplinks er tilladt og
   registreres, og om `uid` kan bruges til at måle hvilke sider der konverterer.
4. **Cookie-samtykke:** Løst med et eget cookiebanner og Google Consent Mode v2
   (statistik afvist som standard, valget gemmes, "Cookieindstillinger" i
   footeren). Konfigurér GTM-tags til at respektere consent, og få evt. en
   jurist til at se teksten igennem.
5. **Founder-videoen** fra gardinbus.nu: bekræft at I må vise den.
6. **Gennemgå leverandørkataloget** direkte på gardinbus.nu (især dækning af
   Lolland-Falster og produktudvalget).
7. **PageSpeed/CrUX:** mål Core Web Vitals før/efter på live-sitet.

## M. De 10 vigtigste næste SEO-opgaver

| # | Opgave | Forventet effekt | Indsats |
|---|---|---|---|
| 1 | Verificér GSC + Bing, indsend sitemap, hent baseline-data | Høj (forudsætning for alt andet) | Lav |
| 2 | Klik-test bookinglinket og deeplinks i Partner-ads | Høj (konvertering/provision) | Lav |
| 3 | Tjek i GTM, at alle tags respekterer Consent Mode (banner er implementeret) | Høj (jura/tillid) | Lav |
| 4 | Udbyg de 10 største bysider med mere lokalt indhold (fx typiske vinduestyper pr. bydel) | Mellem–høj | Mellem |
| 5 | ✅ Udført (#41): 5 nye guides — opmåling, plissé vs. rullegardiner, skråvinduer, store vinduer, stuen — linket fra forside, relaterede guides og bysider | Mellem–høj | — |
| 6 | Egne fotos/illustrationer pr. produktguide (i dag én illustration pr. kategori) | Mellem | Mellem |
| 7 | Brug `uid` i Partner-ads-links pr. sidetype for at måle konvertering | Mellem | Lav |
| 8 | Linkbuilding: lokale/bolig-medier og indretningsblogs | Mellem–høj (konkurrencen har fysisk virksomhed og ældre domæne — hypotese) | Høj |
| 9 | Overvej færre gentagne bookingknapper pr. side (i dag ca. 6) og A/B-test | Lav–mellem | Lav |
| 10 | Kvartalsvis gennemgang af leverandørkataloget og årstal i trendindlæg | Lav–mellem (korrekthed/tillid) | Lav |
