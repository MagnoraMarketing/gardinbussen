# bookgardinbussen.online

Uafhængigt informations- og affiliatesite om gardiner, solafskærmning og
gardinbus-besøg. Sitet har guides til gardintyper, pris og kvalitet samt
byguides, og henviser via affiliate-links (Partner-ads) til **Gardinbus.nu**,
som leverer selve servicen: gratis og uforpligtende besøg med prøver,
opmåling og tilbud.

Sitet må ikke fremstå som leverandøren: skriv aldrig, at sitet selv måler op,
monterer eller kommer hjem, og brug kun leverandørfakta fra
`docs/seo/leverandoerkatalog.md` (se også `scripts/supplier.js`).

## Byg og kontrollér

```
node scripts/build.js        # genererer by-, blog- og nyhedssider, sitemap m.m.
node scripts/check-site.js   # links, metadata, schema, affiliate-links, ordvalg
```

SEO-dokumentation: `docs/seo/` (rapport, leverandørkatalog, keyword map,
URL-oversigt). Mappen udrulles ikke (`.vercelignore`).

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
