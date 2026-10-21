# Leverandørkatalog — Gardinbus.nu

Faktuelt grundlag for indholdet på bookgardinbussen.online. Brug kun oplysninger
markeret "Må bruges". Hold kataloget i sync med `scripts/supplier.js` og
`scripts/site-data.js`.

**Metode og forbehold:** Udviklingsmiljøets netværkspolitik blokerede direkte
adgang til gardinbus.nu (og gardinbussen.gratis). Oplysningerne er derfor
kontrolleret 2026-10-21 via søgemaskinens indeks over gardinbus.nu (titler og
uddrag af de indekserede sider). Status "Indirekte verificeret" betyder: fundet
på leverandørens egne sider via indekset, men ikke åbnet direkte. Alle punkter
bør kontrolleres manuelt på gardinbus.nu ved næste gennemgang.

| # | Oplysning | Kilde-URL | Kontrolleret | Status | Må bruges | Forbehold |
|---|---|---|---|---|---|---|
| 1 | Besøg, rådgivning, opmåling og tilbud er gratis og uforpligtende | https://gardinbus.nu/faq/ , https://gardinbus.nu/ | 2026-10-21 | Indirekte verificeret | Ja | Formuleres "ifølge Gardinbus.nu" |
| 2 | Konsulenten medbringer prøver på stoffer/farver hjem til kunden | https://gardinbus.nu/produkter/ | 2026-10-21 | Indirekte verificeret | Ja | Antal prøver ("over 2.000") bruges ikke |
| 3 | Sortiment: almindelige gardiner, foldegardiner, plissé, lamelgardiner, persienner (metal og træ), rullegardiner, træpersienner, Luxaflex, solfilm, insektnet, solafskærmning | https://gardinbus.nu/produkter/ | 2026-10-21 | Indirekte verificeret | Ja | Panel-, screen-, termo-, motor-/stemme-/solcellestyring er IKKE bekræftet — skrives som generel viden + "spørg konsulenten" |
| 4 | Insektnet fås som rullegardin, plissé og skydedør | https://gardinbus.nu/insektnet-til-vinduer-og-doere/ | 2026-10-21 | Indirekte verificeret | Ja | Siden er ældre i indekset |
| 5 | Gardinerne laves efter mål; prisen afhænger af type og vinduernes størrelse | https://gardinbus.nu/produkter/ | 2026-10-21 | Indirekte verificeret | Ja | Ingen priser publiceres |
| 6 | Montering tilbydes; gratis montering kun ved bestemte bookingtider ("Gratis montering") | https://gardinbus.nu/faq/ , https://gardinbus.nu/book-gardinbus/ | 2026-10-21 | Indirekte verificeret | Ja, med betingelsen | Skriv aldrig "montering inkluderet" |
| 7 | Dækning: Jylland, Fyn og Sjælland, også mindre byer/landdistrikter; adressen bekræftes | https://gardinbus.nu/landsdaekkende-service/ , https://gardinbus.nu/gardinbussen-jylland/ | 2026-10-21 | Indirekte verificeret | Ja | En ældre side siger "hele landet" — den nyere, mere præcise formulering bruges. Bornholm og småøer er ikke bekræftet |
| 8 | Booking via formular/bookingsystem (adresse, antal vinduer); leverandøren ringer tilbage for at aftale tid | https://gardinbus.nu/faq/ , https://gardinbus.nu/book-gardinbus/ | 2026-10-21 | Indirekte verificeret | Ja | "Vælg selv tid online" bruges ikke |
| 9 | Erhverv og institutioner (kontorer, skoler, plejehjem) betjenes; gratis besøg for erhverv | https://gardinbus.nu/erhverv-og-institutioner/ | 2026-10-21 | Indirekte verificeret | Ja | — |
| 10 | Luxaflex forhandles | https://gardinbus.nu/luxaflex/ | 2026-10-21 | Indirekte verificeret | Ja | "Produceret i Danmark" bruges ikke |
| 11 | Leveringstid | /faq/ (≈3 uger), /handelsbetingelser/ (≈6 uger), regionssider (5–6 uger) | 2026-10-21 | Modstridende | **Nej** | Skriv "spørg om aktuel leveringstid" |
| 12 | Betaling (FAQ: faktura efter montering; handelsbetingelser: 50 % ved accept) | /faq/ , /handelsbetingelser/ | 2026-10-21 | Modstridende | **Nej** | Henvis til handelsbetingelserne |
| 13 | Rabat 25 % ved min. 3 gardiner + nyhedsbrev | https://gardinbus.nu/book-gardinbus/ | 2026-10-21 | Betinget/tidsbegrænset | **Nej** | Kampagner ændrer sig; en ældre side nævner en udløbet 35 %-kampagne |
| 14 | 100 % tilfredshedsgaranti | https://gardinbus.nu/ | 2026-10-21 | Uverificeret vilkår | **Nej** | Vilkår ikke fundet |
| 15 | Leverandørens adresse, telefon (70 20 40 72), e-mail, CVR | /kontakt/ | 2026-10-21 | — | **Nej** | Må ikke præsenteres som sitets egne oplysninger |
| 16 | Founder-video (wp-content/uploads/2025/04/Founder-video-kvadrat.mp4) | gardinbus.nu | 2026-10-21 | — | Med tilladelse | Embeddet fra leverandørens server, krediteret "Videoen tilhører Gardinbus.nu". Brugeren bør bekræfte, at affiliateaftalen tillader brugen |

## Leverandørsider, der linkes til (affiliate-deeplinks)

Alle går gennem det eksisterende Partner-ads-link (`partnerid=52168`,
`bannerid=113375`, `uid=Hjemmeside`); kun `htmlurl` skiftes.

| Nøgle (`scripts/supplier.js`) | Destination | Bruges på |
|---|---|---|
| book (uændret) | https://gardinbus.nu/gardinbus-book/ | Alle "Book"-knapper |
| produkter | https://gardinbus.nu/produkter/ | Forside, produktguides uden egen leverandørside |
| gardiner | https://gardinbus.nu/gardiner/ | Gardin-/stofguides |
| persienner | https://gardinbus.nu/persienner/ | Persienner, træpersienner |
| luxaflex | https://gardinbus.nu/luxaflex/ | Luxaflex, motor/smart home |
| insektnet | https://gardinbus.nu/insektnet-til-vinduer-og-doere/ | Insektnet |
| faq | https://gardinbus.nu/faq/ | Pris-guides, Om sitet |
| daekning | https://gardinbus.nu/landsdaekkende-service/ | Forsidens dækningssektion |
| erhverv | https://gardinbus.nu/erhverv-og-institutioner/ | Gardinbus-besøg-siden |
| handelsbetingelser | https://gardinbus.nu/handelsbetingelser/ | Gardinbus-besøg-siden |
| koebenhavn, aarhus, aalborg, odense, esbjerg, roskilde, vejle | gardinbussen-<by>/ | Tilsvarende bysider (+ Frederiksberg, Nørresundby) |
| sjaelland, fyn, jylland | gardinbussen-<landsdel>/ | Øvrige bysider efter landsdel |

**Skal kontrolleres:** Bookingdestinationen `/gardinbus-book/` blev sat i
commit 274db75 ("Nyt affiliate-link"). Søgeindekset kender kun
`/book-gardinbus/`. Destinationen er bevaret uændret, men bør testes i en
browser (klik → lander man på bookingformularen?). Partner-ads-deeplinks
(andet `htmlurl`) bør ligeledes testes én gang, og det bør bekræftes i
Partner-ads, at programmet tillader deeplinks.
