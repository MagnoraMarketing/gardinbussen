# Gardinbussen

Hjemmeside for **Gardinbussen** — en mobil gardinservice, der kører hele
gardinbutikken hjem til kunden. I stedet for at kunden selv skal ud og handle
gardiner, kommer Gardinbussen hjem med prøver, måler op, rådgiver og
monterer — helt gratis og uforpligtende.

Siden præsenterer konceptet, de forskellige gardintyper og
solafskærmningsløsninger, dækningsområdet i Danmark, og gør det nemt for
besøgende at booke et gratis hjemmebesøg.

## Søgemaskiner (Google og Bing)

1. **Google Search Console:** tilføj domænet, vælg "HTML-tag", indsæt koden i
   `GOOGLE_SITE_VERIFICATION` i `scripts/site-data.js`, kør
   `node scripts/seo-technical.js` og push. Indsend derefter
   `https://www.bookgardinbussen.online/sitemap.xml`.
2. **Bing Webmaster Tools:** enten "Importér fra Google Search Console" (intet
   tag nødvendigt) eller indsæt koden fra "HTML Meta Tag" i
   `BING_SITE_VERIFICATION` og kør scriptet som ovenfor. Indsend sitemap.
3. **IndexNow:** ved hvert push til `main` sender GitHub Actions de ændrede
   sider til Bing via IndexNow (`.github/workflows/indexnow.yml`). Alle sider
   kan sendes manuelt med `node scripts/indexnow.js`.
