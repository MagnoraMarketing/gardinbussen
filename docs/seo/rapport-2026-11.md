# SEO-, GEO- og konverteringsrapport — bookgardinbussen.online (november 2026)

Rapporten bygger videre på `rapport-2026-10.md`. Den skelner mellem
**verificeret** (kontrolleret i kode, build eller browser-test),
**indirekte verificeret** (fundet via søgemaskinens indeks) og
**anbefaling/hypotese**.

**Forbehold om data.** Udviklingsmiljøets netværkspolitik blokerede direkte
adgang til live-sitet, gardinbus.nu og gardinbussen.gratis (HTTP-tunnel 403 /
DNS ikke tilladt). Konkurrentanalysen bygger derfor på søgemaskinens indeks.
Der var ingen adgang til Google Search Console, Bing Webmaster Tools,
PageSpeed Insights (feltdata), Partner-ads eller søgeords- og backlinkværktøjer
(Ahrefs, Semrush, Keyword Planner). **Ingen søgevolumener, keyword difficulty,
placeringer eller backlinktal er angivet — de er ikke opdigtet.**

---

## 1. SEO-audit (udgangspunkt før denne runde)

Sitet er statisk HTML genereret af `scripts/build.js` på Vercel (ingen
database, ingen framework, ingen SSR nødvendig — alt indhold er i HTML'en).
Fundamentet var allerede solidt efter oktober-runden: canonical, sitemap,
robots.txt, IndexNow, Article/FAQ/Breadcrumb-schema, korrekt affiliate-mærkning
og en kvalitetskontrol (`check-site.js`).

| # | Fund | Prioritet | Status |
|---|---|---|---|
| 1 | Ingen dedikerede sider for de tre vigtigste intentioner: "gardinbus", "gratis gardinmåling", "gardiner efter mål". Forsiden forsøgte at dække alle | Høj | **Rettet** — 3 søjlesider |
| 2 | Produktguides var tynde (plissé 355 ord) uden fordele/ulemper, anvendelse og vedligehold | Høj | **Rettet** — 7 kerneguides udbygget |
| 3 | "Mørklægningsgardiner" og "soveværelset" kun dækket af efterårsindlæg (sæsonvinkel på stedsegrøn intention) | Mellem | **Rettet** — helårsguides + krydslinks |
| 4 | Huller i indholdet: duo rullegardiner, børneværelse, køkken/bad, kontor, farver, privatliv, vedligehold, "sådan vælger du", persienner vs. gardiner | Mellem | **Rettet** — 11 nye guides |
| 5 | Ingen synlig forfatter/opdateringsdato (E-E-A-T og AI-citérbarhed); dato kun i schema | Mellem | **Rettet** — byline + dato, der automatisk følger `dateModified` |
| 6 | Ingen beskrivelse af redaktionel proces | Mellem | **Rettet** — /om-os.html#redaktion |
| 7 | Brødtekst-links kun adskilt med farve (WCAG 1.4.1, Lighthouse a11y 96) | Mellem | **Rettet** — a11y 100 |
| 8 | Lange sammensatte ord (fx "Mørklægningsgardiner") gav vandret scroll på 390 px | Mellem | **Rettet** |
| 9 | Desktop-menu brød over to linjer ved 1030–1100 px | Lav | **Rettet** |
| 10 | Breadcrumb "Blog" ≠ menupunkt "Guides" | Lav | **Rettet** |
| 11 | Ingen kontrol af dublerede titler/beskrivelser eller tyndt indhold | Mellem | **Rettet** i `check-site.js` |
| 12 | Nye sider krævede manuelle lister i 4 scripts | Mellem | **Rettet** — én kilde (`site-data.js`) |
| 13 | Ingen sikkerheds-headers | Lav | **Rettet** (`vercel.json`) |
| 14 | To Google-tags: gtag.js (G-0PZWVB1XWK) hardkodet + GTM, som også indlæser G-0PZWVB1XWK → dobbelt GA4-måling | Mellem | **Rettet** — GA4 indlæses kun via GTM; `check-site.js` fejler ved direkte gtag.js |
| 15 | Kun SVG-illustrationer, ingen egne fotos | Mellem | Ikke rettet — kræver rettighedsfrie/egne fotos |
| 16 | Ingen backlinks/omtale kendt; sitet gav intet resultat i søgeindekset for "bookgardinbussen.online" | Høj | Se 90-dages-plan |
| 17 | /om-os.html har title/H1 "Om Gardinbussen – book gratis besøg …", som kan læses, som om sitet er Gardinbussen | Lav–mellem | Ikke ændret (bevidst valg i #45); siden forklarer rollerne tydeligt — overvej at omdøbe |

Duplicate content: bysiderne bruger lokale profiler og roterende tekstblokke
(fra oktober). Kontrollen fejler nu, hvis to indekserbare sider har samme title
eller meta-beskrivelse — **0 fundet** på 131 indekserbare sider.

## 2. Konkurrentanalyse (indirekte verificeret via søgeindeks)

| Aktør | Model | Observeret | Svaghed/mulighed for os |
|---|---|---|---|
| **Gardinbus.nu** (leverandør) | Gardinbus, egen virksomhed | Regionale sider (Jylland/Fyn/Sjælland + 7 byer), FAQ, erhverv, Luxaflex. Trustpilot-kategori viser ca. 4,7 og ca. 63 anmeldelser (tal ikke verificeret — **bruges ikke på sitet**) | Vi skal komplementere, ikke kopiere: dybere guides, sammenligninger, byguides |
| **gardinbussen.gratis** (Farver & Striber, Odder) | Fysisk butik + bus | Lokal SEO for Østjylland, .aspx-sider pr. produkt, priseksempler (oktober-runden) | Svage, ens titler; intet guide-indhold; kun Østjylland |
| **Bauhaus** (i samarbejde med DEBEL) | Byggemarked + gardinbus | Sider for "gardinbus" og "gardiner efter mål"; gratis uforpligtende besøg; montering som tilkøb; landsdækkende undtagen ikke-brofaste øer | Stærkt domæne — vi konkurrerer på dybde og neutral rådgivning |
| **Gardin Lis** | Ca. 20 gardinbusser (ifølge Ældre Sagen-partnerside) | Rabatsamarbejde med Ældre Sagen | Partnerskaber/medlemsfordele som kanal |
| **Botex** | Butikskæde, lokale gardinbusser (fx Herning) | Lokale "Gardinbussen"-tilbud | Lokal, fragmenteret SEO |
| **Miga Gardiner, Michael's Gardinbus, Gardinbilen (Roskilde), Gardin Jensen, Gardinbussen-Prisgaranti.dk** | Lokale gardinbusser | Pressemeddelelser (mynewsdesk), Krak/De Gule Sider-opslag | Mange små aktører → ingen dominerende informationskilde |
| **Webshops** (jem & fix, JYSK, Webgardiner) | Gardiner efter mål online | Kunden måler selv; anmeldelser nævner målefejl og ingen returret på specialmål | Vores argument: professionel opmåling mindsker risikoen |
| **Handyhand** | Markedsplads for montører | Pris for plissémontering vises; blogindlæg om gardinbus | Intention "gardinmontør" — dækket i /gardinbus.html FAQ |
| **Krak / De Gule Sider** | Kataloger | Dominerer "gardinbus i nærheden"-lignende søgninger | Lokal synlighed kræver omtale/links, ikke falske adresser |

Kilder (søgeindeks, 2026-11-03): bauhaus.dk/bolig/gardiner-persienner/gardinbus,
bauhaus.dk/gardiner-efter-mal, aeldresagen.dk (Gardin Lis-tilbud), krak.dk
(gardinbus/firmaer), visitdenmark.com (Botex Herning), mynewsdesk.com
(Miga Gardiner, Michael's Gardinbus), handyhand.dk, dk.trustpilot.com
(window_treatment_store), jemogfix.dk, trustpilot.com (Webgardiner).

**Konklusion:** Ingen af konkurrenterne har en neutral, dybdegående
informationsplatform om gardinbus, gratis opmåling og gardiner efter mål.
Det er hullet, sitet nu er bygget til at udfylde — med tydelig henvisning til
Gardinbus.nu. Backlinks og AI-synlighed kunne ikke måles (ingen værktøjer).

## 3. Keyword research

Se `keyword-map.md`. Alle søgeordene fra opgaven er mappet til én side hver.
Søgevolumen og KD er **ikke verificeret** (ingen adgang). Næste skridt: hent
volumener i Google Keyword Planner (gratis med Google Ads-konto) og
forespørgsler i GSC efter 4–6 ugers data, og udfyld kolonnerne.

Kort mapping af hovedsøgeordene:

| Søgeord | Side |
|---|---|
| gardinbus, gardinbus gratis, hvem tilbyder gratis gardinbus, gardinbus i nærheden | /gardinbus.html |
| gratis gardinmåling, gardiner med opmåling, hvor kan jeg få gratis gardinmåling | /gratis-gardinmaaling.html |
| gardiner efter mål, køb gardiner, fordele ved gardiner efter mål | /gardiner-efter-maal.html |
| gardinmåling (gør det selv), hvordan måler man op til gardiner | /blog/opmaaling-af-gardiner.html |
| gardinservice, gardinrådgivning, gardiner med professionel opmåling og montering | /gardinbus.html + /hvorfor-gardinbussen.html |
| gardinmontør | /gardinbus.html (FAQ) → planlagt guide P1 |
| plissé-, rulle-, lamel-, folde-, duo-, mørklægningsgardiner, persienner, Luxaflex | /blog/<type>.html |
| gardiner til stue/soveværelse/store vinduer/kontor | /blog/gardiner-til-<rum>.html |
| gardinbus <by> | /byer/<by>.html (+ 301 fra /gardinbus-<by>) |

## 4. SEO-sidestruktur (informationsarkitektur)

```
/                              Forside (navigation, "Kort forklaret", gardintyper, byer)
├── /gardinbus.html            Søjle: gardinbus            ← ny
├── /gratis-gardinmaaling.html Søjle: gratis gardinmåling  ← ny
├── /gardiner-efter-maal.html  Søjle/hub: gardiner efter mål ← ny
├── /hvorfor-gardinbussen.html Proces: sådan foregår et besøg
├── /blog/index.html           Guides (8 kategorier, 53 guides)
│   ├── Gardintyper            (14 — kategorisider pr. produkt)
│   ├── Valg af gardiner       (5, ny kategori)
│   ├── Rum, vinduer & opmåling (9)
│   └── Solfilm, Trends, Efterår, Pris & kvalitet
├── /byer/<by>.html            70 byguides
├── /nyheder.html
└── /om-os.html                Om sitet, #redaktion, #affiliate
```

**Valg og fravalg:**
- Produktkategorierne ligger fortsat under `/blog/<type>.html`. At oprette
  `/plissegardiner` m.fl. som nye sider ville give to sider pr. intention
  (kannibalisering) og bryde eksisterende URL'er. I stedet er
  kategorisiderne udbygget, og korte URL'er (`/plissegardiner`,
  `/rullegardiner`, `/lamelgardiner`, `/persienner`, `/moerklaegningsgardiner`,
  `/foldegardiner`, `/duo-rullegardiner`, `/gardinbus`, `/gratis-gardinmaaling`,
  `/gardiner-efter-maal`) giver 301 til den kanoniske side.
- **Ingen nye bysider.** `/gardinbus-<by>` for de 10 største byer giver 301 til
  den eksisterende byguide. Masseproducerede "gardinbus-<by>"-sider ved siden
  af "gardiner-i-<by>" ville være næsten identiske.
- `.html`-URL'erne er bevaret (ingen `cleanUrls`), så ingen indekserede URL'er
  ændres.

## 5. Teknisk SEO-rapport (verificeret)

| Område | Implementering |
|---|---|
| Titles/descriptions | Unikke på alle 131 indekserbare sider (kontrolleres); ≤ 60 / ≤ 160 tegn |
| H1–H3 | Præcis én H1 pr. side (kontrolleres); H2 med id-ankre og indholdsfortegnelse på længere guides |
| Canonical | Egen URL på alle indekserbare sider (kontrolleres) |
| Sitemap | 131 URL'er inkl. 3 søjlesider (prioritet 0.9); kladder og noindex udelades automatisk; `lastmod` fra git |
| robots.txt | Tilføjet Claude-SearchBot, Claude-User, Perplexity-User; `/api/` blokeret; sitemap-linje |
| Open Graph/Twitter | Automatisk på alle genererede sider |
| Breadcrumbs | Synlige + BreadcrumbList på guides, søjlesider og bysider ("Guides" i stedet for "Blog") |
| Redirects | 24 nye 301'ere (korte URL'er) i `vercel.json`; eksisterende bevaret |
| 404 | Uændret (rod-relative links, noindex) |
| Headers | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`; `text/plain` for llms.txt/robots.txt |
| Index/noindex | `draft: true` → `noindex, follow` + ude af sitemap, oversigter og llms.txt (testet) |
| Bing | IndexNow-workflow (uændret) pinger nye/ændrede HTML-sider ved push til `main`; `content-language`; sitemap |
| Alt-tekster | Hero-illustrationer har alt-tekst pr. guide; ingen nye billeder uden alt |

**Automatiseret SEO:** En ny guide kræver kun et objekt i `site-data.js`
(eller `guides-2026-11.js`); en ny søjleside kun et objekt i
`landing-data.js`. Build-systemet håndterer derefter metadata, canonical,
OG, Article/WebPage-, Breadcrumb- og FAQ-schema, synlig dato,
indholdsfortegnelse, sitemap, llms.txt, blogoversigt og SEO-booking-sektion.
`check-site.js` fejler ved manglende dato, dato ≠ dateModified, dublerede
titler/beskrivelser, FAQ-schema uden synligt spørgsmål, brudte links/ankre,
affiliate-links uden `rel="sponsored"`, forbudte formuleringer og kladder uden
noindex — og advarer ved under 450 ords brødtekst.

## 6. GEO/AEO-rapport

| Tiltag | Hvorfor |
|---|---|
| "Kort fortalt"-boks øverst i søjlesider og 18 guides (definition i 2–4 sætninger + nøglefakta) | AI-svar og featured snippets citerer korte, selvstændige svar |
| Sammenligningstabeller (plissé/stof, gardinbus/butik/webshop, selv/gratis opmåling, mål/standard m.fl.) | Strukturerede data, som sprogmodeller let kan udtrække |
| FAQ pr. side med FAQPage-schema, der matcher synligt indhold | AEO; kontrolleres automatisk |
| Synlig forfatter ("redaktionen"), opdateringsdato og læsetid; redaktionel proces på /om-os.html#redaktion | Troværdighed (E-E-A-T); ingen opdigtede personer |
| Faktuelle, kildeangivne udsagn (forbrugeraftalelovens undtagelse for varer efter mål, EN 13120 om snore) | Fagligt korrekte, verificerbare svar |
| Gennemsigtig affiliate-oplysning på alle sider + "ifølge Gardinbus.nu" | Tydelig rolle — vigtigt for både brugere og AI-systemer |
| llms.txt med ny sektion "Kernesider" | Kort maskinlæsbart overblik (llmstxt.org-forslaget; ikke en officiel standard — har ingen dokumenteret rangeringseffekt, men skader ikke) |
| robots.txt tillader dokumenterede AI-crawlere | OpenAI (GPTBot, OAI-SearchBot, ChatGPT-User), Anthropic (ClaudeBot, Claude-SearchBot, Claude-User), Perplexity, Google-Extended, Applebot-Extended, bingbot (Copilot), CCBot |

Ikke gjort (bevidst): ingen skjult tekst, ingen "prompt"-tekster til AI,
ingen kunstige FAQ'er uden synligt indhold, ingen Product/Review/Rating-schema
(sitet sælger ikke produkter og har ingen verificerede priser eller anmeldelser),
ingen Person-schema (ingen navngivet, verificerbar forfatter).
AI-synlighed (citater i ChatGPT/Perplexity/AI Overviews) kunne ikke måles.

## 7. Nye sider (14)

| URL | Type |
|---|---|
| /gardinbus.html | Søjleside |
| /gratis-gardinmaaling.html | Søjleside |
| /gardiner-efter-maal.html | Søjleside (hub) |
| /blog/moerklaegningsgardiner.html | Produktguide |
| /blog/duo-rullegardiner.html | Produktguide |
| /blog/saadan-vaelger-du-gardiner.html | Guide |
| /blog/persienner-eller-gardiner.html | Sammenligning |
| /blog/farver-paa-gardiner.html | Guide |
| /blog/gardiner-til-privatliv.html | Guide |
| /blog/vedligeholdelse-af-gardiner.html | Guide |
| /blog/gardiner-til-sovevaerelset.html | Rumguide |
| /blog/gardiner-til-boernevaerelset.html | Rumguide |
| /blog/gardiner-til-koekken-og-badevaerelse.html | Rumguide |
| /blog/gardiner-til-kontoret.html | Rumguide (erhverv) |

## 8. Opdaterede sider

- **Alle sider:** ny menu (Gardinbus · Gratis opmåling · Gardiner efter mål ·
  Guides · Byer · Om sitet · Book), udvidet footer, understregede links i tekst,
  ny CSS-hash.
- **Alle 53 guides:** byline med synlig dato og læsetid, "Guides"-breadcrumb,
  `articleSection` i schema, indholdsfortegnelse ved ≥ 4 afsnit.
- **7 kerneproduktguides** (gardiner, rullegardiner, plissé, persienner,
  lamel, folde, træpersienner): "Kort fortalt", fordele/ulemper, anvendelse,
  vedligehold, ekstra FAQ (`scripts/guide-upgrades.js`).
- **Forsiden:** ny title ("Book Gardinbussen – …", så søjlesiderne ejer de
  brede intentioner), sektionen "Kort forklaret", 3 nye produktkort (duo,
  screen, panel), 4 nye guidekort, mørklægningslinks → ny helårsguide.
- **/om-os.html:** ny sektion "Sådan laver vi guiderne" (#redaktion).
- **Efterårsindlæg** om mørklægning og soveværelse linker til helårsguiderne.
- **Bysider:** guidekort peger på den nye mørklægningsguide.
- `llms.txt`, `sitemap.xml`, `robots.txt`, `vercel.json`, `README.md`.

## 9. Performance (Lighthouse 12, lokalt, Chromium; GTM blokeret i testen)

| Side | Enhed | Perf. | A11y | Best pr. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| / | Mobil | 99–100 | 100 | 100 | 100 | 1,7 s | 0 | 30 ms |
| / | Desktop | 100 | 100* | 100 | 100 | 0,5 s | 0 | 0 ms |
| /gardinbus.html | Mobil | 100 | 100 | 100 | 100 | 1,7 s | 0 | 0 ms |
| /blog/moerklaegningsgardiner.html | Mobil | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| /byer/aarhus.html | Mobil | 100 | 100 | 100 | 100 | 1,5 s | 0 | 0 ms |
| /om-os.html | Mobil | 100 | 100 | 96† | 100 | — | — | — |

\*Desktop-a11y målt før link-rettelsen (96) — samme rettelse gælder.
†Leverandørens video kunne ikke hentes i testmiljøet (konsolfejl).

Forklaring: systemfonte (ingen webfonte), ~33 KB CSS, ~12 KB JS med `defer`,
SVG-illustrationer med faste dimensioner (ingen CLS), cache-busting og
1 års cache på CSS/JS. **Ikke målt:** feltdata (CrUX/PageSpeed Insights) og
effekten af GTM/gtag på live-sitet — mål det i PageSpeed Insights efter deploy.
INP kan ikke måles i laboratoriet; TBT ≈ 0 tyder på lav risiko.

## 10. Mobiltest (Playwright, Chromium)

- **Alle 134 sider × 4 bredder (360, 390, 768, 1280 px): 0 med vandret scroll.**
- Rettet undervejs: lang H1 på mørklægningsguiden (390 px), menu-ombrydning
  ved 1030–1100 px, tabeller vises nu som stablede kort under 600 px.
- Mobil bundmenu med "Book nu" og cookiebanner er uændret.

## 11. Test af bookingfunktioner

- Booking sker via Partner-ads-link til `https://gardinbus.nu/gardinbus-book/`
  (uændret). `api/booking.js` er uændret (bruges ikke af nogen side).
- Hver søjleside og guide har mindst tre bookingveje (indholds-CTA, CTA-kort i
  booking-sektionen, mobil bundmenu) + forklaring af, hvad der sker efter
  booking (formular → leverandøren ringer → besøg → tilbud).
- **Ikke testet:** klik-igennem til gardinbus.nu og registrering i Partner-ads
  (netværket var blokeret). Gør det manuelt efter deploy.

## 12. Test af affiliate-links (verificeret statisk)

- **937 affiliate-links** på 133 sider: alle med `partnerid=52168`,
  `bannerid=113375`, `uid=Hjemmeside`, gardinbus.nu-destination og
  `rel="sponsored noopener"` (0 afvigelser).
- 814 peger på bookingsiden; resten er deeplinks til produkt-, region-, FAQ-,
  erhvervs- og handelsbetingelsessider (som i oktober).
- Affiliate-oplysning i footer på alle indekserbare sider og ved hver CTA.

## 13. Fejl og mangler (kendte)

1. Konkurrent- og leverandørsider kunne ikke åbnes direkte — kun via indeks.
2. Ingen søgevolumen-, placerings-, backlink- eller AI-synlighedsdata.
3. Duo rullegardiner er ikke bekræftet i leverandørens sortiment (skrevet som
   "spørg konsulenten").
4. ~~Dobbelt GA4-måling~~ — rettet: kun GTM. Kontrollér i GA4 → Realtid efter deploy, at besøg stadig registreres (efter samtykke).
5. Ingen egne fotos; illustrationerne er generiske pr. kategori.
6. Kladder (noindex) kan stadig modtage interne links fra publicerede guides.
7. Om-sidens title "Om Gardinbussen …" kan misforstås (se audit #17).

## 14. Prioriteret 90-dages SEO-plan

**Dag 1–14 (fundament og måling)**
1. Deploy og kontrollér de 24 redirects og de 3 søjlesider live (200, canonical).
2. Verificér GSC og Bing Webmaster Tools; indsend `sitemap.xml`; anmod om
   indeksering af søjlesiderne; kør IndexNow-workflowet manuelt.
3. Klik-test bookinglinket og 3–4 deeplinks; bekræft i Partner-ads.
4. Kør PageSpeed Insights (mobil/desktop) på forside og søjlesider.
5. Bekræft i GA4 Realtid, at målingen via GTM virker efter deploy (gtag.js er fjernet), og at GA4-tagget i GTM respekterer Consent Mode.
6. Opsæt `uid` pr. sidetype i Partner-ads (fx `uid=soejle`, `uid=guide`,
   `uid=by`) for at se, hvilke sider der konverterer.

**Dag 15–45 (indhold og autoritet)**
7. Skriv P1–P5 fra `content-strategi.md` (montering, terrassedøre, nybyggeri,
   karnapper, lejebolig).
8. Hent volumener i Keyword Planner; udfyld keyword-mappet.
9. Linkbuilding: 5–10 relevante links (bolig- og indretningsblogs, lokale
   medier, boligforeninger, samarbejde med leverandøren om omtale af guides).
10. Egne eller licenserede fotos til de 7 kerneguides (med alt-tekst, WebP/AVIF).

**Dag 46–90 (optimering)**
11. Brug GSC-data: sider med mange visninger og lav CTR → test titles/descriptions.
12. Udbyg de 10 største bysider yderligere, hvor GSC viser lokal efterspørgsel.
13. Skriv P6–P10; forårsindhold (P15) klar i marts.
14. Kvartalsgennemgang af leverandørkataloget; ret tekster ved ændrede vilkår.
15. Test AI-synlighed manuelt: stil 10 faste spørgsmål ("hvad er en gardinbus",
    "gratis gardinmåling" …) i ChatGPT Search, Perplexity, Copilot og Google, og
    log, om sitet citeres. Gentag hver måned.

Ingen placeringer er garanteret. Effekten afhænger af indeksering,
konkurrence og især af links og omtale, som sitet i dag ikke har dokumenteret.
