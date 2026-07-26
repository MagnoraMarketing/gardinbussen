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

- `index.html` — forsiden
- `privatlivspolitik.html` — privatlivspolitik (GDPR)
- `tak.html` — kvitteringsside
- `byer/<by>.html` — én lokal landingsside pr. by (de 50 største byer i DK)

## By-sider (lokal SEO)

De 50 by-sider genereres fra en skabelon, så de er ensartede og nemme at
opdatere samlet. Rediger by-listen eller skabelonen i
`scripts/build-cities.js` og kør:

```bash
node scripts/build-cities.js
```

Scriptet gør tre ting: skriver alle `byer/<by>.html`, indsætter by-linkene på
forsiden (mellem `<!-- CITIES:START -->` og `<!-- CITIES:END -->`) og
regenererer `sitemap.xml`. Hver by-side har lokal titel/meta, unikt indhold pr.
landsdel, en FAQ og structured data (`HomeAndConstructionBusiness`,
`BreadcrumbList` og `FAQPage` til rich snippets i Google). Booking-formularen
sender et skjult `city`-felt med, så leads viser hvilken by de kommer fra.
