# Gardinbussen

Hjemmeside for **Gardinbussen** — den mobile gardinservice, der kører hele
gardinbutikken hjem til kunden med prøver, opmåling, rådgivning og montering.

## Om siden

En let, selvstændig statisk hjemmeside uden byggeværktøj. Alt kører i browseren:

- **`index.html`** — al struktur og indhold (hero, sådan foregår det, produkter, område, anmeldelser, booking, footer)
- **`css/styles.css`** — design, layout og responsivt udseende
- **`js/main.js`** — mobilmenu, årstal i footer og validering af bookingformularen
- **`assets/`** — favicon m.m.

## Kør lokalt

Åbn `index.html` direkte i browseren, eller start en lokal server:

```bash
python3 -m http.server 8000
# åbn derefter http://localhost:8000
```

## Sådan tilpasser du indholdet

- **E-mail:** søg efter `mail@bookgardinbussen.online` i `index.html` og udskift.
- **Dækningsområde:** rediger listen i sektionen `#omraade`.
- **Farver:** justér CSS-variablerne øverst i `css/styles.css` (`:root`).

## Bookingformular

Formularen sender via `fetch` en POST til serverless-endpointet
**`api/booking.js`** (Vercel-funktion). Den validerer i browseren *og* på
serveren, har et honeypot-felt mod spam, og kvitterer til brugeren.

For at modtage henvendelser på e-mail sættes disse miljøvariabler i Vercel
(Project → Settings → Environment Variables):

| Variabel | Beskrivelse |
| --- | --- |
| `RESEND_API_KEY` | API-nøgle fra [Resend](https://resend.com) |
| `BOOKING_TO` | Modtager-e-mail (hvor henvendelser sendes hen) |
| `BOOKING_FROM` | Afsender, f.eks. `Gardinbussen <booking@bookgardinbussen.online>` (valgfri) |

Er nøglerne ikke sat, virker formularen stadig — henvendelsen valideres,
kvitteres og logges i funktionens log, så intet går tabt inden e-mail kobles på.

## SEO

- OpenGraph-, Twitter- og canonical-tags samt JSON-LD (`HomeAndConstructionBusiness`) i `index.html`
- `sitemap.xml`, `robots.txt` og `site.webmanifest`
- Delbart forhåndsvisningsbillede i `assets/og-image.svg` (udskift gerne med en PNG for bredest mulig understøttelse på sociale medier)

## Sider

- `index.html` — forsiden (inkl. indlejret founder-video nederst)
- `om-os.html` — Om os-side med indlejret founder-video
- `nyheder.html` — nyheder & inspiration (genereres fra `NEWS` i `scripts/site-data.js`)
- `privatlivspolitik.html` — privatlivspolitik (GDPR)
- `tak.html` — kvitteringsside
- `byer/<by>.html` — én lokal landingsside pr. by (de 50 største byer i DK)

## Generering af sider (by-sider + blog)

By-sider og blog genereres fra fælles data, så alt er ensartet og nemt at
opdatere samlet. Data ligger i `scripts/site-data.js` (byer, blogindlæg og
den delte formular-komponent), og `scripts/build.js` bygger det hele:

```bash
node scripts/build.js
```

Scriptet:

- skriver alle `byer/<by>.html` (50 største byer i DK) og `blog/<type>.html`
  (én guide pr. gardintype) samt `blog/index.html`
- indsætter by-linkene på forsiden mellem `<!-- CITIES:START -->` og
  `<!-- CITIES:END -->`
- regenererer `sitemap.xml` med forside, blog, privatlivspolitik og alle
  by-/blog-sider

**SEO:** hver by-side og blogartikel har lokal/relevant titel + meta, unikt
indhold, en FAQ og structured data — `HomeAndConstructionBusiness`,
`Article`, `BreadcrumbList` og `FAQPage` (giver rich snippets i Google).

**Leads:** booking-formularen sender et skjult `city`- eller `source`-felt med,
så du kan se om et lead kom fra en by-side eller en blogartikel.

### Affiliate-booking (Gardinbus)

Kontaktformularen er indtil videre erstattet af "book"-CTA'er, der sender
brugeren til Gardinbus' affiliate-bookingside. Linket ligger ét sted:
`AFFILIATE_BOOK_URL` i `scripts/site-data.js`. Skift den linje og kør
`node scripts/build.js` for at opdatere alle by- og blogsider; på `index.html`
optræder samme link i menu, hero, produktkort, område og booking-sektionen.

Vil du senere tilbage til den indbyggede formular, findes den stadig i git-
historikken sammen med `api/booking.js` (serverless-endpoint), der er bevaret.
