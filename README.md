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

- **Telefon/e-mail:** søg efter `70 00 00 00` og `kontakt@gardinbussen.dk` i `index.html` og udskift.
- **Dækningsområde:** rediger listen i sektionen `#omraade`.
- **Farver:** justér CSS-variablerne øverst i `css/styles.css` (`:root`).

## Bookingformular

Formularen validerer i browseren og viser en kvittering, men sender endnu
**ikke** data til en server. For at modtage henvendelser skal `js/main.js`
kobles til en backend eller en formular-tjeneste (f.eks. et `fetch`-kald til
et endpoint eller en e-mailservice).
