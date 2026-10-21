// Lokale profiler til bysiderne (byer/*.html), så hver side får sit eget
// indhold i stedet for samme skabelontekst med et nyt bynavn.
//
// HOME_TYPES: boligtyper med anbefalede gardinløsninger (vises som kort).
// CITY_PROFILES[by]:
//   intro: 1–2 sætninger om byens boliger og vinduer (hero + lokal sektion)
//   areas: bydele, forstæder og nabobyer (vises som områder på bysiden)
//   homes: tre nøgler fra HOME_TYPES, mest typiske først
//   tip:   et lokalt råd til netop denne by
// Ny by: tilføj den i CITIES/REGION i site-data.js og her, og kør build.js.

const HOME_TYPES = {
  lejlighed: {
    title: "Ældre etagelejligheder",
    text: "Høje vinduer, dybe karme og ofte flere fag. Plisségardiner monteret i rammen holder vindueskarmen fri, og gulvlange foldegardiner fremhæver lofthøjden.",
    links: [["plissegardiner", "Plisségardiner"], ["foldegardiner", "Foldegardiner"], ["gardiner-til-stuen", "Gardiner til stuen"]],
  },
  nybyg: {
    title: "Nye boliger med store glaspartier",
    text: "Gulv-til-loft-vinduer og altandøre kræver løsninger til store flader: lamel- eller panelgardiner, screen mod sol og blænding — og gerne motorstyring.",
    links: [["gardiner-til-store-vinduer", "Store vinduer"], ["lamelgardiner", "Lamelgardiner"], ["screengardiner", "Screengardiner"], ["motoriserede-gardiner-smart-home", "Motoriserede gardiner"]],
  },
  villa: {
    title: "Villaer og parcelhuse",
    text: "Mange vinduer i forskellige størrelser. Rullegardiner og persienner i soveværelser og køkken, bløde gardiner i stuen — samlet i ét tilbud på hele huset.",
    links: [["rullegardiner", "Rullegardiner"], ["persienner", "Persienner"], ["gardiner", "Gardiner"]],
  },
  raekkehus: {
    title: "Rækkehuse",
    text: "Naboerne bor tæt på, og indkig er ofte det største problem. Plisségardiner, der kan køres både op og ned, eller privatlivsfilm giver privatliv uden at lukke dagslyset ude.",
    links: [["plissegardiner", "Plisségardiner"], ["privatlivsfilm-til-vinduer", "Privatlivsfilm"]],
  },
  byhus: {
    title: "Ældre byhuse",
    text: "Sprossede vinduer, lave karme og skæve mål kræver gardiner syet præcist efter mål. Plissé i hver rude eller klassiske foldegardiner passer til husets stil.",
    links: [["plissegardiner", "Plisségardiner"], ["foldegardiner", "Foldegardiner"], ["gardinstaenger-og-skinner", "Gardinstænger og skinner"]],
  },
  sommerhus: {
    title: "Sommerhuse",
    text: "Store vinduer mod sol og natur. Træpersienner, insektnet og solcelledrevne gardiner, der ikke kræver en stikkontakt ved vinduet, er populære valg.",
    links: [["traepersienner", "Træpersienner"], ["insektnet-til-vinduer-og-doere", "Insektnet"], ["solcelledrevne-gardiner", "Solcelledrevne gardiner"]],
  },
  kyst: {
    title: "Boliger ved vandet",
    text: "Vand og himmel giver skarpt lys og blænding. Screengardiner og solfilm dæmper sol og varme, men bevarer udsigten, du har betalt for.",
    links: [["screengardiner", "Screengardiner"], ["solfilm-til-vinduer", "Solfilm"]],
  },
  land: {
    title: "Landejendomme og gårde",
    text: "Store rum, gamle vinduer og kolde vintre. Termogardiner og tunge, foerede gardiner holder på varmen og dæmper træk i vinterhalvåret.",
    links: [["termogardiner-spar-paa-varmen", "Termogardiner"], ["hold-paa-varmen-med-gardiner", "Hold på varmen"]],
  },
  etage: {
    title: "Etageboliger",
    text: "Standardvinduer, hvor pris og funktion vejer tungt. Rullegardiner med mørklægning og persienner giver meget for pengene og er nemme at holde.",
    links: [["rullegardiner", "Rullegardiner"], ["moerklaegningsgardiner-efteraar", "Mørklægning"], ["billige-gardiner-eller-god-kvalitet", "Pris og kvalitet"]],
  },
};

const CITY_PROFILES = {
  "København": {
    intro: "Fra brokvarterernes klassiske etagelejligheder på Østerbro, Nørrebro og Vesterbro til de nye boliger i Ørestad, Sydhavnen og Nordhavn har København nogle af landets mest forskelligartede vinduer.",
    areas: ["Østerbro", "Nørrebro", "Vesterbro", "Amager", "Valby", "Vanløse", "Brønshøj", "Nordhavn", "Ørestad", "Sydhavnen"],
    homes: ["lejlighed", "nybyg", "villa"],
    tip: "I mange københavnske lejligheder kan genboen se direkte ind. Plisségardiner, der kan køres oppefra og ned, skærmer den nederste del af vinduet, mens dagslyset stadig kommer ind foroven.",
  },
  "Aarhus": {
    intro: "Aarhus spænder fra Latinerkvarterets gamle byhuse og Frederiksbjergs etagelejligheder til de nye boliger på Aarhus Ø med store glaspartier ud mod bugten.",
    areas: ["Frederiksbjerg", "Trøjborg", "Aarhus Ø", "Risskov", "Viby", "Højbjerg", "Åbyhøj", "Brabrand", "Egå"],
    homes: ["lejlighed", "nybyg", "villa"],
    tip: "På Aarhus Ø og langs bugten giver vandet skarpt lys og blænding. Screengardiner dæmper solen uden at tage udsigten.",
  },
  "Odense": {
    intro: "Odense har både de små, gamle byhuse i H.C. Andersen-kvarteret, etagelejligheder omkring centrum og store parcelhuskvarterer i forstæderne.",
    areas: ["Bolbro", "Hunderup", "Dalum", "Bellinge", "Tarup", "Hjallese", "Næsby", "Vollsmose"],
    homes: ["byhus", "lejlighed", "villa"],
    tip: "Gamle byhuse har ofte vinduer med skæve mål og lave karme. Her er en præcis opmåling og gardiner syet efter mål ekstra vigtigt.",
  },
  "Aalborg": {
    intro: "Aalborg har gamle etagelejligheder i midtbyen og Vestbyen, nyt byggeri langs havnefronten ved Limfjorden og villakvarterer i Hasseris og Vejgaard.",
    areas: ["Hasseris", "Vejgaard", "Vestbyen", "Gug", "Aalborg Øst", "Svenstrup", "Nørresundby"],
    homes: ["lejlighed", "nybyg", "villa"],
    tip: "Boliger ved Limfjorden får meget lys fra vandet. Lysdæmpende rullegardiner eller screen giver ro i stuen uden at lukke fjordudsigten ude.",
  },
  "Esbjerg": {
    intro: "Esbjerg er en forholdsvis ung havneby med klassiske murstensvillaer, rækkehuse og lejligheder tæt på havnen og Vadehavet.",
    areas: ["Jerne", "Gjesing", "Sædding", "Hjerting", "Tarp", "Bramming"],
    homes: ["villa", "raekkehus", "kyst"],
    tip: "Den vestjyske blæst kan mærkes i ældre vinduer. Tætsluttende termogardiner eller plissé med honeycomb-struktur dæmper træk og kulde.",
  },
  "Randers": {
    intro: "Randers har en gammel bykerne med byhuse og lejligheder, store villakvarterer på begge sider af Gudenåen og nyere boligområder i udkanten af byen.",
    areas: ["Vorup", "Kristrup", "Paderup", "Dronningborg", "Assentoft", "Spentrup"],
    homes: ["villa", "byhus", "etage"],
    tip: "Sydvendte stuer i parcelhusene kan blive varme om sommeren. Solfilm eller screengardiner holder varmen ude uden at gøre stuen mørk.",
  },
  "Kolding": {
    intro: "Kolding har ældre byhuse omkring Koldinghus, villaer i de bakkede kvarterer omkring byen og nye lejligheder tæt på fjorden.",
    areas: ["Seest", "Bramdrupdam", "Sønder Bjert", "Vamdrup", "Lunderskov", "Christiansfeld"],
    homes: ["villa", "nybyg", "byhus"],
    tip: "Mange villaer ligger på skrånende grunde med store vinduer mod udsigten. Lamel- eller panelgardiner er gode til de brede partier.",
  },
  "Horsens": {
    intro: "Horsens rummer etagelejligheder i midtbyen, store villakvarterer og et voksende antal nye boliger ved havnen og fjorden.",
    areas: ["Stensballe", "Hatting", "Torsted", "Lund", "Brædstrup", "Gedved"],
    homes: ["villa", "nybyg", "lejlighed"],
    tip: "I nyt byggeri ved havnen er altandøre og store vinduer standard. Panelgardiner glider let til side, så du nemt kommer ud på altanen.",
  },
  "Vejle": {
    intro: "Vejle ligger i ådalen med villaer på skrænterne, ældre byhuse i midtbyen og moderne byggeri ved havnen og fjorden.",
    areas: ["Bredballe", "Grejsdalen", "Hover", "Jelling", "Børkop", "Give", "Tørring"],
    homes: ["villa", "nybyg", "byhus"],
    tip: "Boliger på skrænterne har ofte høje vinduer, der er svære at nå. Motoriserede eller solcelledrevne gardiner gør dem nemme at betjene.",
  },
  "Roskilde": {
    intro: "Roskilde har en historisk bymidte omkring domkirken, mange villa- og rækkehuskvarterer og nyere boligområder i Musicon og Trekroner.",
    areas: ["Himmelev", "Trekroner", "Musicon", "Svogerslev", "Vindinge", "Viby Sjælland", "Jyllinge"],
    homes: ["villa", "raekkehus", "nybyg"],
    tip: "I rækkehusområderne ligger haverne tæt. Plisségardiner med to stoffer — et lystransparent og et mørklæggende — giver både privatliv og god søvn.",
  },
  "Herning": {
    intro: "Herning har villakvarterer, rækkehuse og nyere lejligheder omkring bymidten — og mange familier i parcelhuse og på landejendomme uden for byen.",
    areas: ["Gullestrup", "Tjørring", "Lind", "Sunds", "Aulum", "Ikast"],
    homes: ["villa", "raekkehus", "land"],
    tip: "I parcelhuse fra 70'erne sidder der ofte brede stuevinduer. Lamelgardiner eller en lang gardinskinne med foldegardiner klæder de store flader.",
  },
  "Silkeborg": {
    intro: "Silkeborg ligger mellem søer og skov, og mange boliger har store vinduer mod naturen — fra villaer ved søerne til nye lejligheder tæt på bymidten.",
    areas: ["Gødvad", "Funder", "Virklund", "Sejs-Svejbæk", "Them", "Kjellerup"],
    homes: ["villa", "nybyg", "raekkehus"],
    tip: "Med skov og sø lige uden for vinduet vil de fleste bevare udsigten. Screen og plissé, der kan køres oppefra, giver lys og privatliv uden at skærme for naturen.",
  },
  "Næstved": {
    intro: "Næstved har en gammel købstadskerne, store parcelhuskvarterer og mange landejendomme i det sydsjællandske opland.",
    areas: ["Fensmark", "Holme-Olstrup", "Herlufmagle", "Karrebæksminde", "Glumsø", "Rønnede"],
    homes: ["villa", "byhus", "land"],
    tip: "På landejendommene er stuerne ofte store og vinduerne gamle. Foerede gardiner fra gulv til loft gør rummet lunere og mere hyggeligt.",
  },
  "Fredericia": {
    intro: "Fredericia har de karakteristiske lige gader inden for voldene med ældre byhuse og lejligheder, og villakvarterer uden for byen.",
    areas: ["Erritsø", "Taulov", "Snoghøj", "Bredstrup", "Skærbæk"],
    homes: ["byhus", "villa", "raekkehus"],
    tip: "I de ældre huse inden for voldene sidder vinduerne tæt på fortovet. Plissé, der kan køres oppefra og ned, giver privatliv mod gaden.",
  },
  "Viborg": {
    intro: "Viborg har en historisk bykerne omkring domkirken, villaer ned mod søerne og mange landejendomme i omegnen.",
    areas: ["Overlund", "Bjerringbro", "Stoholm", "Karup", "Løgstrup", "Ørum"],
    homes: ["byhus", "villa", "land"],
    tip: "Villaerne ved søerne har ofte vinduer mod vest, hvor eftermiddagssolen står lavt ind. Persienner gør det nemt at styre lyset præcist.",
  },
  "Køge": {
    intro: "Køge har en af landets bedst bevarede købstadskerner, nye boliger ved havnen og store villa- og rækkehuskvarterer.",
    areas: ["Ølby", "Herfølge", "Ejby", "Borup", "Strøby", "Solrød"],
    homes: ["byhus", "nybyg", "raekkehus"],
    tip: "I de gamle købmandsgårde og byhuse skal gardinerne passe til husets stil. Klassiske foldegardiner på en diskret skinne er et sikkert valg.",
  },
  "Holstebro": {
    intro: "Holstebro har villaer, rækkehuse og etagebyggeri tæt på Storåen og en bymidte med mange lejligheder.",
    areas: ["Mejrup", "Tvis", "Vinderup", "Ulfborg", "Struer"],
    homes: ["villa", "raekkehus", "etage"],
    tip: "Vestenvinden mærkes i ældre vinduer om efteråret. Termogardiner eller foerede gardiner dæmper trækken mærkbart.",
  },
  "Taastrup": {
    intro: "Taastrup har store rækkehus- og parcelhuskvarterer samt etagebyggeri tæt på stationen.",
    areas: ["Høje-Taastrup", "Hedehusene", "Fløng", "Vridsløsemagle", "Albertslund"],
    homes: ["raekkehus", "villa", "etage"],
    tip: "I rækkehusene sidder soveværelserne ofte mod en lys sti eller vej. Mørklæggende rullegardiner med sideskinner holder gadelyset ude.",
  },
  "Slagelse": {
    intro: "Slagelse har en gammel købstadskerne, store parcelhuskvarterer og mange landejendomme i det vestsjællandske opland.",
    areas: ["Vemmelev", "Dalmose", "Slots Bjergby", "Skælskør", "Korsør", "Sorø"],
    homes: ["villa", "byhus", "land"],
    tip: "I parcelhusene er stuen ofte husets største rum. To lag — et let gardin og et tungere til aften — giver både dagslys og lune aftener.",
  },
  "Hillerød": {
    intro: "Hillerød har villaer og rækkehuse omkring Frederiksborg Slot og skovene, og flere nye boligområder i udkanten af byen.",
    areas: ["Ullerød", "Nødebo", "Gadevang", "Skævinge", "Frederiksværk"],
    homes: ["villa", "raekkehus", "nybyg"],
    tip: "I de nye boligområder er vinduerne store og ofte vendt mod syd. Screengardiner tager varmen og blændingen uden at gøre rummet mørkt.",
  },
  "Helsingør": {
    intro: "Helsingør har en gammel bykerne med smalle byhuse, villaer langs Øresundskysten og store rækkehusområder.",
    areas: ["Snekkersten", "Espergærde", "Hellebæk", "Ålsgårde", "Hornbæk", "Humlebæk"],
    homes: ["byhus", "kyst", "raekkehus"],
    tip: "Langs Øresund står morgensolen ind over vandet. Plissé eller screen i soveværelser mod øst giver en roligere morgen.",
  },
  "Sønderborg": {
    intro: "Sønderborg ligger ved Alssund med boliger tæt på vandet, villakvarterer og ældre huse omkring slottet.",
    areas: ["Dybbøl", "Ulkebøl", "Augustenborg", "Nordborg", "Broager", "Gråsten"],
    homes: ["kyst", "villa", "byhus"],
    tip: "Ved Alssund giver vandet ekstra lys og varme i stuer mod syd. Solfilm eller screen beskytter møbler og gulve mod falmning.",
  },
  "Svendborg": {
    intro: "Svendborg har stejle gader med gamle byhuse, villaer med udsigt over Svendborgsund og sommerhuse på Tåsinge og Thurø.",
    areas: ["Thurø", "Tåsinge", "Skårup", "Stenstrup", "Vester Skerninge", "Faaborg"],
    homes: ["byhus", "kyst", "sommerhus"],
    tip: "I de gamle byhuse sidder vinduerne ofte i flere højder på skrånende gader. Plissé i hver ramme giver et ensartet udtryk udefra.",
  },
  "Holbæk": {
    intro: "Holbæk har villaer på bakkerne ned mod fjorden, rækkehuse og etagebyggeri samt mange landejendomme i omegnen.",
    areas: ["Tølløse", "Jyderup", "Vipperød", "Tuse", "Svinninge", "Mørkøv"],
    homes: ["villa", "kyst", "land"],
    tip: "Villaerne med fjordudsigt har ofte store panoramavinduer. Lamelgardiner kan drejes, så du styrer lyset uden at miste udsigten.",
  },
  "Hjørring": {
    intro: "Hjørring har villakvarterer, ældre byhuse i midtbyen og mange sommerhuse og landejendomme ude mod Vesterhavet.",
    areas: ["Vrå", "Sindal", "Tårs", "Lønstrup", "Løkken", "Hirtshals"],
    homes: ["villa", "sommerhus", "land"],
    tip: "I sommerhusene mod Vesterhavet er insektnet og solcelledrevne gardiner populære, fordi de passer til huse, der ikke altid er beboet.",
  },
  "Frederikshavn": {
    intro: "Frederikshavn er en havneby med villaer og rækkehuse, lejligheder tæt på havnen og sommerhuse langs kysten mod Skagen.",
    areas: ["Sæby", "Strandby", "Elling", "Ålbæk", "Skagen"],
    homes: ["villa", "kyst", "sommerhus"],
    tip: "De nordjyske sommernætter er lyse og lange. Mørklæggende rullegardiner eller plissé i soveværelset giver bedre søvn hele sommeren.",
  },
  "Nørresundby": {
    intro: "Nørresundby ligger på nordsiden af Limfjorden med villaer, rækkehuse og lejligheder — mange med udsigt over fjorden til Aalborg.",
    areas: ["Lindholm", "Løvvangen", "Vestbjerg", "Vodskov", "Aalborg"],
    homes: ["kyst", "villa", "raekkehus"],
    tip: "Boliger med sydvendt fjordudsigt får meget sol. Screengardiner dæmper lyset, mens du stadig kan se over fjorden.",
  },
  "Haderslev": {
    intro: "Haderslev har en gammel bykerne med byhuse omkring domkirken, villaer ved Haderslev Dam og landejendomme i oplandet.",
    areas: ["Vojens", "Gram", "Hammelev", "Christiansfeld", "Sønderballe"],
    homes: ["byhus", "villa", "land"],
    tip: "I de gamle byhuse er vinduerne ofte opdelt med sprosser. Plissé monteret direkte på rammen følger vinduets opdeling pænt.",
  },
  "Ringsted": {
    intro: "Ringsted ligger centralt på Sjælland med parcelhuse, rækkehuse og nye boligområder tæt på motorvej og bane.",
    areas: ["Benløse", "Vetterslev", "Haraldsted", "Kværkeby", "Sorø"],
    homes: ["villa", "raekkehus", "nybyg"],
    tip: "Bor du tæt på motorvej eller bane, kan tunge, foerede gardiner også dæmpe lidt af lyden udefra — og gøre rummet mere roligt.",
  },
  "Skive": {
    intro: "Skive har villaer ned mod Skive Fjord, ældre lejligheder i midtbyen og mange landejendomme på Salling.",
    areas: ["Resen", "Balling", "Roslev", "Glyngøre", "Durup"],
    homes: ["kyst", "villa", "land"],
    tip: "På Salling ligger mange gårde åbent i landskabet med vind fra flere sider. Termogardiner holder bedre på varmen i de kolde måneder.",
  },
  "Nykøbing Falster": {
    intro: "Nykøbing Falster har en gammel købstadskerne, villaer ved Guldborgsund og mange sommerhuse og landejendomme på Falster.",
    areas: ["Sundby", "Væggerløse", "Marielyst", "Nørre Alslev", "Stubbekøbing", "Sakskøbing"],
    homes: ["byhus", "kyst", "sommerhus"],
    tip: "I sommerhusene ved Marielyst er træpersienner og insektnet et populært par: lys og luft om dagen, ingen myg om aftenen.",
  },
  "Kalundborg": {
    intro: "Kalundborg har en middelalderlig bykerne, villakvarterer langs fjorden og mange sommerhuse og landejendomme i omegnen.",
    areas: ["Røsnæs", "Svebølle", "Høng", "Gørlev", "Ubby", "Jerslev"],
    homes: ["byhus", "kyst", "sommerhus"],
    tip: "Ude på Røsnæs og langs fjorden er lyset skarpt fra vandet. Solfilm på de mest udsatte vinduer holder varmen ude, uden at du skal trække for.",
  },
  "Ballerup": {
    intro: "Ballerup har store rækkehus- og parcelhuskvarterer samt etagebyggeri fra 1960'erne og 70'erne.",
    areas: ["Skovlunde", "Måløv", "Smørum", "Herlev", "Værløse"],
    homes: ["raekkehus", "villa", "etage"],
    tip: "I mange rækkehuse fra 60'erne og 70'erne er vinduerne i standardmål. Det gør rullegardiner og plissé til en prisvenlig løsning til hele huset.",
  },
  "Frederikssund": {
    intro: "Frederikssund ligger ved Roskilde Fjord med villaer, rækkehuse og sommerhuse i Hornsherred og omegn.",
    areas: ["Jægerspris", "Slangerup", "Skibby", "Oppe Sundby", "Ølstykke"],
    homes: ["villa", "kyst", "sommerhus"],
    tip: "Boliger ud mod Roskilde Fjord har ofte vestvendte vinduer med aftensol. Persienner eller screen dæmper den lave sol, så du stadig kan se ud.",
  },
  "Greve": {
    intro: "Greve har store parcelhus- og rækkehuskvarterer og mange boliger tæt på stranden langs Køge Bugt.",
    areas: ["Greve Strand", "Hundige", "Karlslunde", "Tune", "Solrød"],
    homes: ["villa", "raekkehus", "kyst"],
    tip: "Parcelhusene i Greve har ofte en lang stue med udgang til haven. Lamel- eller panelgardiner foran terrassedøren er nemme at skyde til side.",
  },
  "Rødovre": {
    intro: "Rødovre har klassiske parcelhuse, rækkehuse og etagebyggeri — mange boliger er fra efterkrigstiden og frem til 70'erne.",
    areas: ["Islev", "Hvidovre", "Vanløse", "Glostrup", "Brøndby"],
    homes: ["villa", "raekkehus", "etage"],
    tip: "I ældre parcelhuse sidder radiatoren ofte under vinduet. Gardiner, der slutter ved karmen, eller plissé i rammen lader varmen komme ud i rummet.",
  },
  "Aabenraa": {
    intro: "Aabenraa ligger ved fjorden med en gammel bykerne, villaer på skrænterne og boliger med udsigt over vandet.",
    areas: ["Rødekro", "Løjt Kirkeby", "Kliplev", "Tinglev", "Padborg"],
    homes: ["byhus", "kyst", "villa"],
    tip: "Villaerne på skrænterne ser ud over fjorden, og vinduerne er ofte store. Lamelgardiner kan vinkles, så du styrer lyset og bevarer udsigten.",
  },
  "Skanderborg": {
    intro: "Skanderborg ligger ved søen med villaer, rækkehuse og mange nye boligområder for børnefamilier.",
    areas: ["Stilling", "Hørning", "Ry", "Galten", "Låsby"],
    homes: ["villa", "nybyg", "raekkehus"],
    tip: "I nye børnefamiliehuse er mørklægning i børneværelserne et af de mest efterspurgte ønsker — især i de lyse sommermåneder.",
  },
  "Nyborg": {
    intro: "Nyborg har en historisk bykerne omkring slottet, villakvarterer og boliger med udsigt over Storebælt.",
    areas: ["Ullerslev", "Ørbæk", "Hjulby", "Kerteminde"],
    homes: ["byhus", "kyst", "villa"],
    tip: "Med udsigt over Storebælt står solen direkte ind ad vinduet. Screengardiner tager blændingen og lader dig følge skibene på vandet.",
  },
  "Grenaa": {
    intro: "Grenaa har villaer og rækkehuse tæt på byen og et stort antal sommerhuse langs kysten på Djursland.",
    areas: ["Ørum", "Trustrup", "Gjerrild", "Bønnerup Strand", "Ebeltoft"],
    homes: ["villa", "sommerhus", "kyst"],
    tip: "Mange sommerhuse på Djursland har ingen stikkontakter ved vinduerne. Solcelledrevne gardiner kan styres fra mobilen uden ny el-installation.",
  },
  "Middelfart": {
    intro: "Middelfart ligger ved Lillebælt med villaer på skrænterne, ældre byhuse i centrum og mange boliger med vandudsigt.",
    areas: ["Strib", "Nørre Aaby", "Ejby", "Gelsted", "Fredericia"],
    homes: ["kyst", "villa", "byhus"],
    tip: "Med udsigt over Lillebælt er det udsigten, du vil bevare. Plissé, der kan køres oppefra og ned, giver privatliv forneden og frit udsyn foroven.",
  },
  "Ikast": {
    intro: "Ikast har parcelhuskvarterer, rækkehuse og nyere boligområder — og mange familier i landsbyerne omkring byen.",
    areas: ["Bording", "Engesvang", "Isenvad", "Herning", "Brande"],
    homes: ["villa", "raekkehus", "land"],
    tip: "I nyere parcelhuse er der ofte ovenlysvinduer i køkken og alrum. Plissé eller rullegardiner til ovenlys, gerne med motor, gør dem nemme at styre.",
  },
  "Korsør": {
    intro: "Korsør ligger ved Storebælt med villaer, lejligheder tæt på havnen og sommerhuse langs kysten.",
    areas: ["Halsskov", "Tårnborg", "Skælskør", "Slagelse"],
    homes: ["kyst", "villa", "sommerhus"],
    tip: "Ved Storebælt kan blæsten mærkes i ældre vinduer. Plissé med honeycomb-struktur danner en isolerende luftlomme foran ruden.",
  },
  "Vordingborg": {
    intro: "Vordingborg har en gammel bykerne ved Gåsetårnet, villakvarterer og mange landejendomme og sommerhuse på Sydsjælland og Møn.",
    areas: ["Nyråd", "Præstø", "Kalvehave", "Stege", "Lundby"],
    homes: ["byhus", "villa", "sommerhus"],
    tip: "I sommerhusene på Møn er træpersienner et populært valg, fordi de passer til naturen og tåler at hænge i et hus, der ikke altid er opvarmet.",
  },
  "Thisted": {
    intro: "Thisted ligger ved Limfjorden med villaer, rækkehuse og landejendomme — og sommerhuse ud mod Vesterhavet i Thy.",
    areas: ["Hurup", "Snedsted", "Hanstholm", "Klitmøller", "Nykøbing Mors"],
    homes: ["villa", "land", "sommerhus"],
    tip: "I sommerhusene i Thy giver insektnet frisk luft uden myg, og træpersienner passer til det naturlige udtryk ved klitterne.",
  },
  "Hobro": {
    intro: "Hobro ligger i bunden af Mariager Fjord med villaer på skrænterne, ældre byhuse og landejendomme i omegnen.",
    areas: ["Mariager", "Arden", "Rold", "Øster Hurup", "Randers"],
    homes: ["kyst", "villa", "byhus"],
    tip: "Villaerne på skrænterne ned mod fjorden har ofte store vinduer i flere etager. Motoriserede gardiner gør de højtsiddende vinduer nemme at betjene.",
  },
  "Brønderslev": {
    intro: "Brønderslev har parcelhuskvarterer, rækkehuse og mange landejendomme i Vendsyssel.",
    areas: ["Dronninglund", "Hjallerup", "Asaa", "Jerslev", "Hjørring"],
    homes: ["villa", "raekkehus", "land"],
    tip: "På landejendommene i Vendsyssel er vinduerne ofte gamle og kolde. Termogardiner er en hurtig måde at få et lunere hjem på.",
  },
  "Ringkøbing": {
    intro: "Ringkøbing har en hyggelig gammel bykerne, villaer ved fjorden og et væld af sommerhuse ved Vesterhavet.",
    areas: ["Hvide Sande", "Søndervig", "Tarm", "Skjern", "Videbæk"],
    homes: ["byhus", "sommerhus", "kyst"],
    tip: "I sommerhusene ved Søndervig og Hvide Sande er solcelledrevne gardiner og insektnet populære til huse, der lejes ud eller står tomme i perioder.",
  },
  "Frederiksværk": {
    intro: "Frederiksværk har ældre byhuse fra byens industrihistorie, villakvarterer og mange sommerhuse ved Arresø og Kattegatkysten.",
    areas: ["Hundested", "Liseleje", "Asserbo", "Ølsted", "Melby"],
    homes: ["byhus", "sommerhus", "villa"],
    tip: "I sommerhusene ved Liseleje og Asserbo er træpersienner populære: de giver skygge, passer til naturen og holder mange år.",
  },
  "Allerød": {
    intro: "Allerød har villaer og rækkehuse omgivet af skov og grønne områder — mange med store vinduer mod haven.",
    areas: ["Lillerød", "Blovstrød", "Lynge", "Birkerød", "Hillerød"],
    homes: ["villa", "raekkehus", "nybyg"],
    tip: "Når haven og skoven er udsigten, er lyse, lystransparente gardiner populære — de blødgør lyset uden at lukke det grønne ude.",
  },
  "Frederiksberg": {
    intro: "Frederiksberg er kendetegnet ved markante boligkarréer, høje vinduespartier og hyggelige gårdmiljøer — og ved villakvartererne omkring Frederiksberg Have.",
    areas: ["Frederiksberg C", "Vanløse", "Valby", "Vesterbro", "Nørrebro"],
    homes: ["lejlighed", "villa", "nybyg"],
    tip: "I karréernes høje lejligheder klæder gulvlange gardiner hængt helt oppe ved loftet rummet. Kombinér med plissé i rammen, hvis du vil kunne mørklægge.",
  },
  "Gentofte": {
    intro: "Gentofte er kendt for store villaer med klassiske vinduer i flere fag — fra Hellerup og Charlottenlund til Ordrup og Jægersborg.",
    areas: ["Hellerup", "Charlottenlund", "Ordrup", "Jægersborg", "Vangede", "Gentofte"],
    homes: ["villa", "kyst", "lejlighed"],
    tip: "Klassiske villavinduer med mange fag ser roligst ud med plissé monteret i hver ramme. Til stuen giver foerede foldegardiner et elegant fald.",
  },
  "Lyngby": {
    intro: "Lyngby spænder fra de grønne villakvarterer i Virum og Sorgenfri til lejlighederne tæt på bymidten og Lyngby Sø.",
    areas: ["Kongens Lyngby", "Virum", "Sorgenfri", "Taarbæk", "Bagsværd"],
    homes: ["villa", "lejlighed", "raekkehus"],
    tip: "Mange villaer i Lyngby har store vinduer mod haven og skoven. Screengardiner dæmper eftermiddagssolen uden at skjule det grønne.",
  },
  "Hørsholm": {
    intro: "Hørsholm har rækkehuse og villaer tæt på kysten og skovene — fra Rungsted til Kokkedal.",
    areas: ["Rungsted", "Kokkedal", "Nivå", "Birkerød", "Usserød"],
    homes: ["raekkehus", "villa", "kyst"],
    tip: "I de mange atriumhuse og rækkehuse vender vinduerne ind mod en fælles have. Plissé i to lag giver privatliv og dagslys på samme tid.",
  },
  "Ishøj": {
    intro: "Ishøj har både etagebyggeri, parcelhuskvarterer og boliger tæt på Ishøj Strand og Køge Bugt.",
    areas: ["Ishøj Strand", "Vallensbæk", "Greve", "Hvidovre", "Brøndby"],
    homes: ["etage", "villa", "kyst"],
    tip: "I etageboligerne giver mørklæggende rullegardiner meget for pengene — især i soveværelser, der vender ud mod lyse stier og parkeringspladser.",
  },
  "Glostrup": {
    intro: "Glostrup har parcelhuse, rækkehuse og lejligheder tæt på indfaldsvejene og stationen.",
    areas: ["Hvissinge", "Albertslund", "Brøndby", "Rødovre", "Ejby"],
    homes: ["villa", "etage", "raekkehus"],
    tip: "Bor du ud til en befærdet vej, kan tunge, foerede gardiner gøre soveværelset mørkere og en anelse mere stille.",
  },
  "Herlev": {
    intro: "Herlev har rækkehuse, villaer og etagebyggeri side om side — fra Hjortespring til kvartererne omkring Herlev Bymidte.",
    areas: ["Hjortespring", "Ballerup", "Gladsaxe", "Værløse", "Skovlunde"],
    homes: ["raekkehus", "villa", "etage"],
    tip: "I rækkehusene sidder vinduerne ofte i samme standardmål. Det gør det nemt at få ens plissé- eller rullegardiner i alle rum til en god samlet pris.",
  },
  "Ribe": {
    intro: "Ribe har Danmarks ældste bykerne med mange bevaringsværdige huse, villakvarterer og landejendomme i marsklandet.",
    areas: ["Vester Vedsted", "Bramming", "Gram", "Esbjerg"],
    homes: ["byhus", "villa", "land"],
    tip: "I de fredede og bevaringsværdige huse skal gardinerne passe til de gamle vinduer. Plissé i rammen er diskret udefra og kræver ingen indgreb i karmen.",
  },
  "Varde": {
    intro: "Varde har hyggelige villakvarterer og et opland med landejendomme og sommerhuse helt ud til Vesterhavet ved Blåvand.",
    areas: ["Oksbøl", "Blåvand", "Ølgod", "Grindsted", "Esbjerg"],
    homes: ["villa", "sommerhus", "land"],
    tip: "I sommerhusene ved Blåvand er insektnet og solcelledrevne gardiner praktiske, fordi de fungerer, også når huset ikke er beboet.",
  },
  "Tønder": {
    intro: "Tønder har en historisk bykerne med gamle gavlhuse og et opland med landsbyer og landejendomme i marsken.",
    areas: ["Højer", "Løgumkloster", "Skærbæk", "Bredebro"],
    homes: ["byhus", "land", "villa"],
    tip: "I de gamle gavlhuse er vinduerne ofte små og dybe. Plissé eller rullegardiner monteret i lysningen giver et stramt og pænt resultat.",
  },
  "Aars": {
    intro: "Aars ligger i Himmerland med parcelhuskvarterer, rækkehuse og mange landejendomme i omegnen.",
    areas: ["Farsø", "Løgstør", "Nibe", "Hobro"],
    homes: ["villa", "land", "raekkehus"],
    tip: "I parcelhusene er det typisk stuen mod syd, der skal skærmes. Persienner gør det nemt at vinkle lyset hen over dagen.",
  },
  "Skagen": {
    intro: "Skagen har de karakteristiske gule byhuse, sommerhuse i klitterne og et lys, der er kendt langt ud over landets grænser.",
    areas: ["Gammel Skagen", "Kandestederne", "Ålbæk", "Hirtshals", "Frederikshavn"],
    homes: ["byhus", "sommerhus", "kyst"],
    tip: "Skagens skarpe lys er smukt, men kan give blænding og falmede møbler. Screengardiner eller solfilm skåner interiøret og bevarer lyset.",
  },
  "Hirtshals": {
    intro: "Hirtshals har havnenære boliger, villakvarterer og sommerhuse langs kysten mod Tornby og Løkken.",
    areas: ["Tornby", "Tversted", "Løkken", "Hjørring", "Skagen"],
    homes: ["kyst", "sommerhus", "villa"],
    tip: "Ved Vesterhavet kommer vinden ofte fra vest. Tætsluttende termo- eller plisségardiner hjælper på trækken fra ældre vinduer.",
  },
  "Ebeltoft": {
    intro: "Ebeltoft har en hyggelig bykerne med gamle huse og store sommerhusområder på Mols og ned mod Ebeltoft Vig.",
    areas: ["Femmøller", "Øer", "Rønde", "Grenaa", "Aarhus"],
    homes: ["byhus", "sommerhus", "kyst"],
    tip: "I sommerhusene på Mols er der ofte store glaspartier mod vandet. Lamelgardiner eller screen dæmper solen og bevarer udsigten.",
  },
  "Struer": {
    intro: "Struer har villakvarterer, der løber ned mod Limfjorden, rækkehuse og boliger tæt på havnen.",
    areas: ["Hjerm", "Holstebro", "Lemvig", "Skive"],
    homes: ["kyst", "villa", "raekkehus"],
    tip: "Med vestvendte vinduer mod fjorden står aftensolen lavt ind. Persienner eller screen dæmper den uden at lukke fjorden ude.",
  },
  "Lemvig": {
    intro: "Lemvig ligger i en dal ned mod Limfjorden med boliger på skrænterne og et åbent vestjysk landskab omkring byen.",
    areas: ["Thyborøn", "Harboøre", "Struer", "Holstebro"],
    homes: ["kyst", "land", "villa"],
    tip: "Husene på skrænterne har ofte vinduer i flere højder. Solcelledrevne gardiner gør de svært tilgængelige vinduer nemme at betjene.",
  },
  "Faaborg": {
    intro: "Faaborg har en bevaringsværdig bykerne med gamle købmandshuse og udsigt over det sydfynske øhav.",
    areas: ["Millinge", "Svendborg", "Assens", "Odense"],
    homes: ["byhus", "kyst", "sommerhus"],
    tip: "I de gamle huse i bykernen er vinduerne små og ofte sprossede. Plissé i hver ramme bevarer husets karakter udefra.",
  },
  "Kerteminde": {
    intro: "Kerteminde har havnenære boliger, villaer og mange sommerhuse langs kysten og på Hindsholm.",
    areas: ["Munkebo", "Hindsholm", "Nyborg", "Odense"],
    homes: ["kyst", "sommerhus", "villa"],
    tip: "I havnenære boliger er indkig fra forbipasserende ofte et tema. Privatlivsfilm eller plissé oppefra og ned løser det uden at stjæle lys.",
  },
  "Sorø": {
    intro: "Sorø har villakvarterer omkring søerne, en grøn bymidte med ældre huse og landejendomme i det midtsjællandske landskab.",
    areas: ["Dianalund", "Fjenneslev", "Ringsted", "Slagelse"],
    homes: ["villa", "byhus", "land"],
    tip: "Villaerne ved Sorø Sø har ofte store vinduer mod vandet. Lyse foldegardiner og screen giver et roligt udtryk og dæmper lyset fra søen.",
  },
  "Maribo": {
    intro: "Maribo har boliger tæt på Maribosøerne, en hyggelig bymidte og mange landejendomme på Lolland.",
    areas: ["Nakskov", "Rødby", "Sakskøbing", "Nykøbing Falster"],
    homes: ["villa", "byhus", "land"],
    tip: "På landejendommene på Lolland er det ofte de store, kolde stuer, der trænger. Termogardiner holder bedre på varmen i vinterhalvåret.",
  },
};

module.exports = { HOME_TYPES, CITY_PROFILES };
