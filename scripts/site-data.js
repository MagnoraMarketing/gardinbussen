// Fælles data + helpers til site-generatoren.
// Rediger byer, blogindlæg og affiliate-formularens URL her.

// Affiliate-booking-link hos Gardinbus. Alle "book"-CTA'er på sitet peger
// hertil. Skift kun denne linje for at opdatere linket overalt.
const AFFILIATE_BOOK_URL = "https://www.partner-ads.com/dk/klikbanner.php?partnerid=52168&bannerid=113375&htmlurl=https://gardinbus.nu/book-gardinbus/";

const SITE = "https://www.bookgardinbussen.online";

const CITIES = [
  "København", "Aarhus", "Odense", "Aalborg", "Esbjerg",
  "Randers", "Kolding", "Horsens", "Vejle", "Roskilde",
  "Herning", "Silkeborg", "Næstved", "Fredericia", "Viborg",
  "Køge", "Holstebro", "Taastrup", "Slagelse", "Hillerød",
  "Helsingør", "Sønderborg", "Svendborg", "Holbæk", "Hjørring",
  "Frederikshavn", "Nørresundby", "Haderslev", "Ringsted", "Skive",
  "Nykøbing Falster", "Kalundborg", "Ballerup", "Frederikssund", "Greve",
  "Rødovre", "Aabenraa", "Skanderborg", "Nyborg", "Grenaa",
  "Middelfart", "Ikast", "Korsør", "Vordingborg", "Thisted",
  "Hobro", "Brønderslev", "Ringkøbing", "Frederiksværk", "Allerød",
];

const REGION = {
  "København": "Hovedstaden", "Taastrup": "Hovedstaden", "Hillerød": "Hovedstaden",
  "Helsingør": "Hovedstaden", "Ballerup": "Hovedstaden", "Frederikssund": "Hovedstaden",
  "Greve": "Hovedstaden", "Rødovre": "Hovedstaden", "Frederiksværk": "Hovedstaden",
  "Allerød": "Hovedstaden",
  "Roskilde": "Sjælland", "Næstved": "Sjælland", "Køge": "Sjælland",
  "Slagelse": "Sjælland", "Holbæk": "Sjælland", "Ringsted": "Sjælland",
  "Kalundborg": "Sjælland", "Korsør": "Sjælland", "Vordingborg": "Sjælland",
  "Nykøbing Falster": "Sjælland",
  "Odense": "Fyn", "Svendborg": "Fyn", "Nyborg": "Fyn", "Middelfart": "Fyn",
  "Esbjerg": "Syddanmark", "Kolding": "Syddanmark", "Vejle": "Syddanmark",
  "Fredericia": "Syddanmark", "Sønderborg": "Syddanmark", "Haderslev": "Syddanmark",
  "Aabenraa": "Syddanmark",
  "Aarhus": "Midtjylland", "Randers": "Midtjylland", "Horsens": "Midtjylland",
  "Herning": "Midtjylland", "Silkeborg": "Midtjylland", "Viborg": "Midtjylland",
  "Holstebro": "Midtjylland", "Skive": "Midtjylland", "Skanderborg": "Midtjylland",
  "Grenaa": "Midtjylland", "Ikast": "Midtjylland", "Ringkøbing": "Midtjylland",
  "Aalborg": "Nordjylland", "Hjørring": "Nordjylland", "Frederikshavn": "Nordjylland",
  "Nørresundby": "Nordjylland", "Thisted": "Nordjylland", "Brønderslev": "Nordjylland",
  "Hobro": "Nordjylland",
};

// Ét blogindlæg pr. gardintype.
const BLOG = [
  {
    slug: "gardiner",
    category: "Gardintyper",
    metaTitle: "Gardiner: Den komplette guide til valg af gardiner | bookgardinbussen.online",
    h1: "Gardiner — den komplette guide",
    tag: "Gardiner",
    desc: "Alt om gardiner: typer, stoffer, ophæng og hvordan du vælger de rigtige gardiner til hvert rum. Få gratis rådgivning og opmåling hjemme hos dig.",
    intro: [
      "Gardiner er en af de nemmeste måder at ændre stemningen i et rum på. De blødgør lyset, dæmper lyden, skærmer for indblik og binder indretningen sammen — og det rigtige valg afhænger af rummet, lysindfaldet og din smag.",
      "I denne guide gennemgår vi de vigtigste typer gardiner, hvordan du vælger stof, og hvad du skal være opmærksom på med ophæng og montering.",
    ],
    sections: [
      { h: "Hvornår passer gardiner bedst?", p: [
        "Løse og foldegardiner giver et blødt, indbydende udtryk og passer særligt godt i stuer, soveværelser og spiseområder. De kan bruges alene eller kombineres med f.eks. rullegardiner eller persienner, hvis du vil kunne mørklægge.",
        "Vil du fremhæve loftshøjden, hænges gardinerne højt og bredt, så de dækker mere væg end selve vinduet.",
      ]},
      { h: "Sådan vælger du det rigtige gardinstof", p: [
        "Lette, transparente stoffer slipper dagslys ind og giver et luftigt look, mens tungere stoffer skærmer bedre for lys og lyd. Til soveværelset kan du vælge et mørklæggende stof eller et foer, der lukker mere lys ude.",
        "Tænk også på vedligeholdelse: mange gardinstoffer kan vaskes skånsomt, men tjek altid vaskeanvisningen først.",
      ]},
      { h: "Ophæng: stænger, skinner og montering", p: [
        "Gardiner kan hænges i en synlig gardinstang som en detalje eller i en diskret skinne, der næsten forsvinder. Valget påvirker både udtryk og funktion.",
        "En korrekt opmåling er afgørende for et flot fald. bookgardinbussen.online måler op på stedet og monterer det hele, så resultatet sidder perfekt.",
      ]},
    ],
    faq: [
      { q: "Hvor meget stof skal der til gardiner?", a: "Som tommelfingerregel bruges 1,5–2,5 gange vinduets bredde for at få et fyldigt fald. Vi beregner det præcise stofforbrug ved opmålingen." },
      { q: "Kan gardiner vaskes?", a: "Mange gardinstoffer kan vaskes skånsomt ved lav temperatur, men det afhænger af materialet. Følg altid vaskeanvisningen, og hæng gardinerne op igen let fugtige for at undgå folder." },
      { q: "Hvad koster gardiner?", a: "Prisen afhænger af stof, mængde og ophæng. Du får et fast, uforpligtende tilbud på stedet ved vores gratis hjemmebesøg." },
    ],
  },
  {
    slug: "rullegardiner",
    category: "Gardintyper",
    metaTitle: "Rullegardiner: Guide til valg, mørklægning og montering | bookgardinbussen.online",
    h1: "Rullegardiner — enkelt, funktionelt og lækkert",
    tag: "Rullegardiner",
    desc: "Rullegardiner er enkle, funktionelle og fås også som mørklægning. Læs guiden til valg, materialer og montering — og book gratis opmåling hjemme.",
    intro: [
      "Rullegardiner er blandt de mest praktiske vinduesløsninger: rene linjer, nem betjening og god lysstyring på lidt plads. De passer til stort set alle rum og vinduestyper.",
      "Her får du overblik over varianter, materialer og hvornår rullegardiner er det rigtige valg.",
    ],
    sections: [
      { h: "Varianter af rullegardiner", p: [
        "Du kan vælge lysfiltrerende rullegardiner, der giver et blødt dagslys, eller mørklægningsrullegardiner, der lukker næsten alt lys ude — ideelt til soveværelser og børneværelser.",
        "Til køkken og bad findes fugtbestandige materialer, der tåler damp og er nemme at tørre af.",
      ]},
      { h: "Hvorfor vælge rullegardiner?", p: [
        "Rullegardiner fylder meget lidt, når de er rullet op, og giver et roligt, minimalistisk udtryk. De kan bruges alene eller kombineres med løse gardiner for et blødere look.",
        "De betjenes med kæde eller som motoriserede løsninger, så du kan styre flere gardiner på én gang.",
      ]},
      { h: "Montering og opmåling", p: [
        "Rullegardiner kan monteres i loft, på væg eller direkte i vinduesrammen. Den rigtige montage afhænger af vinduet og ønsket lystæthed.",
        "Vi måler op og monterer, så gardinet kører let og slutter tæt til kanterne.",
      ]},
    ],
    faq: [
      { q: "Kan rullegardiner mørklægge helt?", a: "Mørklægningsrullegardiner lukker langt det meste lys ude. Vil du undgå lysstriber i siderne, kan gardinet monteres, så det dækker lidt ud over vinduet — det rådgiver vi om ved besøget." },
      { q: "Kan rullegardiner motoriseres?", a: "Ja, rullegardiner fås med motor og kan styres med fjernbetjening eller app — praktisk til høje eller svært tilgængelige vinduer." },
      { q: "Passer rullegardiner i badeværelset?", a: "Ja, med fugtbestandige materialer er rullegardiner et godt valg i vådrum, fordi de er nemme at holde rene." },
    ],
  },
  {
    slug: "persienner",
    category: "Gardintyper",
    metaTitle: "Persienner: Alu eller træ? Guide til lysstyring | bookgardinbussen.online",
    h1: "Persienner — præcis lysstyring",
    tag: "Persienner",
    desc: "Persienner giver præcis kontrol over lys og indblik. Læs om alu- og træpersienner, farver og montering, og book en gratis opmåling hjemme hos dig.",
    intro: [
      "Persienner lader dig styre lyset helt præcist ved at vippe lamellerne. Du kan slippe dagslys ind uden at give indblik — eller lukke helt til.",
      "Guiden hjælper dig med at vælge mellem alu og træ og finde den rigtige løsning til dit rum.",
    ],
    sections: [
      { h: "Alupersienner vs. træpersienner", p: [
        "Alupersienner er slanke, fugtbestandige og fås i mange farver — et robust valg til køkken, bad og kontor.",
        "Træpersienner (og trælook) giver et varmt, hyggeligt udtryk med bredere lameller og passer godt i stuer og soveværelser.",
      ]},
      { h: "Lys og indblik", p: [
        "Ved at vippe lamellerne bestemmer du selv, hvor meget lys og indblik du vil have. Det gør persienner ideelle til rum, hvor lysforholdene skifter i løbet af dagen.",
        "Til vinduer, der åbnes ofte, findes løsninger, hvor persiennen sidder tæt på ruden og følger med.",
      ]},
      { h: "Farver og montering", p: [
        "Persienner fås i et bredt farveudvalg — fra diskrete toner der matcher rammen, til markante farver der bliver en detalje.",
        "Vi måler op og monterer, så lamellerne sidder lige og kører let.",
      ]},
    ],
    faq: [
      { q: "Kan persienner tåle fugt?", a: "Alupersienner tåler fugt godt og er derfor velegnede til køkken og bad. Træpersienner bør undgås i meget fugtige rum, men findes også i fugtbestandigt trælook." },
      { q: "Hvilken lamelbredde skal jeg vælge?", a: "Smalle lameller giver et fint, diskret udtryk, mens bredere lameller (typisk træ) giver et varmere look og mere frit udsyn, når de er åbne." },
      { q: "Kan persienner sidde i vinduer der åbnes?", a: "Ja, med den rette montering kan persienner sidde tæt på ruden og følge vinduet, så de ikke er i vejen." },
    ],
  },
  {
    slug: "plissegardiner",
    category: "Gardintyper",
    metaTitle: "Plisségardiner: Fleksibel skærmning til alle vinduer | bookgardinbussen.online",
    h1: "Plisségardiner — fleksible og elegante",
    tag: "Plisségardiner",
    desc: "Plisségardiner kan skærme oppefra og nedefra og passer perfekt til ovenlys og specielle vinduer. Læs guiden, og book en gratis opmåling hjemme.",
    intro: [
      "Plisségardiner er foldede stofgardiner, der fylder meget lidt og kan indstilles trinløst. De er kendt for at kunne skærme både oppefra og nedefra — perfekt, når du vil have lys ind foroven men skærme for indblik forneden.",
      "De er samtidig et af de mest fleksible valg til svære vinduer.",
    ],
    sections: [
      { h: "Skærm oppefra og nedefra", p: [
        "Med top-down/bottom-up-funktionen bestemmer du selv, hvor på vinduet gardinet skal dække. Det giver både dagslys og privatliv på samme tid.",
        "Fås i lysfiltrerende og mørklæggende stoffer, så løsningen kan tilpasses hvert rum.",
      ]},
      { h: "Perfekt til ovenlys og specielle vinduer", p: [
        "Plisségardiner findes i modeller til ovenlys, skrå vinduer, trekantede og runde vinduer, hvor almindelige gardiner ikke passer.",
        "Til ovenlys monteres de med sidewires, så gardinet holdes på plads uanset vinklen.",
      ]},
      { h: "Vedligeholdelse og montering", p: [
        "Plisséstof er nemt at holde og støves af med en let børste eller lav sugestyrke.",
        "Vi måler op og monterer, så gardinet sidder stramt og kører jævnt.",
      ]},
    ],
    faq: [
      { q: "Kan plisségardiner sidde i ovenlys?", a: "Ja, plisségardiner er et populært valg til ovenlys og monteres med sidewires, så de holdes på plads i alle vinkler." },
      { q: "Kan plisségardiner mørklægge?", a: "Ja, med mørklæggende plisséstof kan de skærme effektivt for lys — velegnet til soveværelser og børneværelser." },
      { q: "Fylder plisségardiner meget?", a: "Nej, folderne pakker tæt sammen, så gardinet fylder meget lidt, når det er trukket til side." },
    ],
  },
  {
    slug: "lamelgardiner",
    category: "Gardintyper",
    metaTitle: "Lamelgardiner: Elegant løsning til store vinduer | bookgardinbussen.online",
    h1: "Lamelgardiner — til store partier og skydedøre",
    tag: "Lamelgardiner",
    desc: "Lamelgardiner er den elegante løsning til store vinduespartier og skydedøre. Læs om funktion, stoffer og montering, og book en gratis opmåling.",
    intro: [
      "Lamelgardiner består af lodrette lameller, der kan drejes og trækkes til siden. De er skabt til store vinduespartier, skydedøre og kontorer, hvor de giver et roligt, professionelt udtryk.",
      "Her får du overblik over, hvornår lamelgardiner er det rigtige valg.",
    ],
    sections: [
      { h: "Til store flader", p: [
        "Fordi lamellerne hænger lodret og kan samles i siden, dækker lamelgardiner store flader elegant uden at virke tunge.",
        "De er ideelle til gulv-til-loft-vinduer og terrassepartier, hvor du både vil kunne skærme og gå ud.",
      ]},
      { h: "Lys og privatliv", p: [
        "Ved at dreje lamellerne styrer du lys og indblik trinløst — fra helt åbent til helt lukket.",
        "Stofferne fås i mange farver og lystætheder, inklusive mørklæggende varianter.",
      ]},
      { h: "Montering og betjening", p: [
        "Lamelgardiner monteres typisk i loft eller på væg og betjenes med kæde og snor eller som motoriseret løsning.",
        "Vi måler op og monterer, så skinnen sidder lige og lamellerne hænger perfekt.",
      ]},
    ],
    faq: [
      { q: "Passer lamelgardiner til skydedøre?", a: "Ja, lamelgardiner er et oplagt valg til skydedøre og terrassepartier, fordi lamellerne nemt kan trækkes til side, når du skal ud." },
      { q: "Kan lamelgardiner mørklægge?", a: "Med mørklæggende lamelstof kan de skærme effektivt for lys. Vil du undgå lys mellem lamellerne, rådgiver vi om alternativer ved besøget." },
      { q: "Hvor bred kan en lamelløsning være?", a: "Lamelgardiner kan dække meget brede partier og deles op, så de trækkes til én eller begge sider — det tilpasser vi til dit vindue." },
    ],
  },
  {
    slug: "gardinstaenger-og-skinner",
    category: "Gardintyper",
    metaTitle: "Gardinstænger og skinner: Sådan vælger du ophæng | bookgardinbussen.online",
    h1: "Gardinstænger og skinner — det rigtige ophæng",
    tag: "Gardinstænger & skinner",
    desc: "Gardinstang eller skinne? Guide til det rigtige ophæng til dine gardiner — udtryk, funktion og montering. Book en gratis opmåling hjemme hos dig.",
    intro: [
      "Ophænget bestemmer både, hvordan gardinerne falder, og hvordan de fremstår. Valget mellem en synlig gardinstang og en diskret skinne handler om både stil og funktion.",
      "Her hjælper vi dig med at vælge det rigtige ophæng.",
    ],
    sections: [
      { h: "Gardinstang eller skinne?", p: [
        "En gardinstang er et synligt element, der kan understrege stilen med endestykker i f.eks. metal eller træ. Den passer godt til løse gardiner med et afslappet fald.",
        "En gardinskinne er diskret og næsten usynlig — ideel, når gardinet skal være i fokus, eller når du vil have et stramt, moderne udtryk.",
      ]},
      { h: "Funktion og betjening", p: [
        "Skinner findes med glidere og kan bøjes rundt om hjørner — praktisk til karnapper og store partier. Både stænger og skinner fås med motor.",
        "Til tunge gardiner er en solid montering vigtig, så ophænget holder over tid.",
      ]},
      { h: "Montering", p: [
        "Ophæng kan monteres i loft eller på væg afhængigt af rummet og det ønskede fald.",
        "Vi måler op og monterer, så alt sidder lige og kører let — også ved lange partier.",
      ]},
    ],
    faq: [
      { q: "Skal jeg vælge stang eller skinne?", a: "Vælg en gardinstang, hvis ophænget må ses og gerne må være en detalje. Vælg en skinne, hvis den skal være diskret, eller hvis du vil kunne føre gardinet rundt om hjørner." },
      { q: "Kan ophæng bøjes rundt om hjørner?", a: "Ja, gardinskinner kan bøjes og føres rundt om f.eks. karnapvinduer, så gardinet følger væggen." },
      { q: "Kan gardinstænger og skinner motoriseres?", a: "Ja, begge dele fås med motor, så du kan trække gardinerne med fjernbetjening eller app." },
    ],
  },
  {
    slug: "moerklaegningsgardiner-efteraar",
    metaTitle: "Mørklægningsgardiner til de mørke efterårsaftener | bookgardinbussen.online",
    h1: "Mørklægningsgardiner — ro og mørke i efterårets aftener",
    tag: "Mørklægningsgardiner",
    category: "Efterår – guides & fordele",
    eyebrow: "Guide · Efterår",
    desc: "Mørklægningsgardiner lukker gadelys og træk ude om efteråret. Læs om fordele, materialer og montering — og book en gratis opmåling hjemme hos dig.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Efteråret betyder tidligere mørke og skarpt gadelys, der trænger ind gennem ruden. Mørklægningsgardiner giver dig kontrol over lyset, så du kan skabe ro og fordybelse — uanset hvad klokken er udenfor.",
      "Her ser vi på, hvornår mørklægning giver mest mening, hvilke fordele det giver i efterårs- og vintermånederne, og hvad du skal vide om stof og montering.",
    ],
    sections: [
      { h: "Fordelene ved mørklægning om efteråret", p: [
        "Når solen står lavt og går tidligt ned, bliver hjemmebiografen, sovehjørnet og læselampen for alvor taget i brug. Mørklægningsgardiner lukker forstyrrende lys ude, dæmper lyd og hjælper med at holde på varmen ved vinduet.",
        "Resultatet er et roligt, lunt rum, hvor du selv bestemmer, hvornår mørket falder på — ideelt til biografaftener og lange, mørke morgener.",
      ]},
      { h: "Fuld eller delvis mørklægning?", p: [
        "Fuld mørklægning bruger et tæt, lystæt stof, der lukker næsten alt lys ude — perfekt til soveværelse og medierum. Delvis mørklægning (dimout) dæmper lyset uden at gøre rummet helt bælgmørkt og bevarer en blødere stemning.",
        "Valget afhænger af rummet: I soveværelset vinder fuld mørklægning ofte, mens stuen kan nøjes med dimout for at bevare hyggen.",
      ]},
      { h: "Montering tæt på vinduet", p: [
        "For at få mest muligt ud af mørklægningen skal gardinet dække vinduet helt — gerne monteret så det går ud over karmen i både bredde og højde, så lyset ikke siver ind i siderne.",
        "En præcis opmåling er afgørende. Vi måler op på stedet og monterer, så mørklægningen slutter tæt hele vejen rundt.",
      ]},
    ],
    faq: [
      { q: "Lukker mørklægningsgardiner alt lys ude?", a: "Fuldt mørklæggende stoffer lukker næsten alt lys ude, når gardinet dækker vinduet helt og er monteret ud over karmen. Ellers kan der sive lidt lys ind i siderne." },
      { q: "Hjælper mørklægningsgardiner på varmen?", a: "Ja, tætte mørklægningsstoffer lægger et ekstra lag ved ruden, der dæmper træk og hjælper med at holde på varmen om efteråret og vinteren." },
      { q: "Kan mørklægning fås som rullegardin og plissé?", a: "Ja. Mørklægning fås både som gardiner, rullegardiner og plisségardiner. Ved besøget finder vi den løsning, der passer bedst til dit vindue." },
    ],
  },
  {
    slug: "hold-paa-varmen-med-gardiner",
    metaTitle: "Hold på varmen med gardiner om efteråret | bookgardinbussen.online",
    h1: "Hold på varmen — gardiner der sparer på varmeregningen",
    tag: "Hold på varmen",
    category: "Efterår – guides & fordele",
    eyebrow: "Guide · Efterår",
    desc: "Gardiner kan mindske varmetab ved vinduerne om efteråret. Læs hvordan tætte stoffer og korrekt ophæng holder på varmen — og book en gratis opmåling.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "En stor del af varmen i boligen forsvinder gennem vinduerne. Når efterårskulden sætter ind, kan de rigtige gardiner gøre en mærkbar forskel — både for komforten og for varmeregningen.",
      "I denne guide gennemgår vi, hvordan gardiner mindsker varmetab, hvilke stoffer der virker bedst, og hvordan ophænget afgør, om du reelt holder på varmen.",
    ],
    sections: [
      { h: "Sådan mister vinduerne varme", p: [
        "Ved et koldt vindue afkøles luften og synker ned langs ruden — det er den kuldenedfald, du mærker som træk ved fødderne. Et tæt gardin foran vinduet fanger den kolde luft og skaber et isolerende luftlag mellem stof og rude.",
        "Effekten er størst, når gardinet slutter tæt foroven og går helt til gulv, så den kolde luft ikke kan cirkulere frit ud i rummet.",
      ]},
      { h: "Vælg tætte, fyldige stoffer", p: [
        "Tunge, tætvævede stoffer isolerer bedre end lette. Et gardin med foer — eller decideret termofoer — lægger et ekstra lag, der bremser varmetabet uden at du behøver skifte hele gardinet.",
        "Jo fyldigere faldet er, desto flere isolerende luftlommer, så vær ikke sparsom med stofmængden.",
      ]},
      { h: "Ophæng der lukker tæt", p: [
        "For at holde på varmen skal gardinet dække vinduet helt og gerne overlappe karmen i siderne. En skinne med tæt afslutning foroven forhindrer, at den varme luft slipper op bag gardinet.",
        "Vi rådgiver om ophæng og foer ved opmålingen, så løsningen både ser godt ud og faktisk isolerer.",
      ]},
    ],
    faq: [
      { q: "Kan gardiner virkelig spare på varmen?", a: "Ja. Tætte, gulvlange gardiner skaber et isolerende luftlag ved ruden, der mindsker kuldenedfald og varmetab — særligt ved ældre vinduer." },
      { q: "Hjælper det at fore gardinerne?", a: "Et foer eller termofoer lægger et ekstra isolerende lag og forbedrer både varmeholdelse og mørklægning uden at ændre gardinets forside." },
      { q: "Skal gardinet nå helt til gulv?", a: "For bedst isolering bør gardinet gå helt til gulv og slutte tæt foroven, så den kolde luft fra ruden ikke cirkulerer ud i rummet." },
    ],
  },
  {
    slug: "termogardiner-spar-paa-varmen",
    metaTitle: "Termogardiner: spar på varmeregningen i efteråret | bookgardinbussen.online",
    h1: "Termogardiner — komfort og besparelse i den kolde tid",
    tag: "Termogardiner",
    category: "Efterår – guides & fordele",
    eyebrow: "Guide · Efterår",
    desc: "Termogardiner isolerer vinduet og mindsker træk og varmetab om efteråret. Læs om fordele, materialer og montering — og book en gratis opmåling hjemme.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Termogardiner er gardiner med et særligt isolerende foer, der bremser varmetabet gennem vinduet. I efterårs- og vintermånederne betyder det både bedre komfort og lavere varmeforbrug.",
      "Vi ser her på, hvordan termogardiner virker, hvilke fordele de giver, og hvornår de bedst kan betale sig.",
    ],
    sections: [
      { h: "Sådan virker termogardiner", p: [
        "Et termofoer består typisk af flere lag, der fanger luft og skaber en isolerende barriere mellem den kolde rude og rummet. Det mindsker kuldenedfald og hjælper radiatoren med at holde en jævn temperatur.",
        "Mange termogardiner mørklægger samtidig, så du får både isolering og lyskontrol i ét produkt.",
      ]},
      { h: "Hvor gør de mest gavn?", p: [
        "Termogardiner gør størst forskel ved ældre vinduer, store glaspartier og rum, der føles kolde eller trækkende. Soveværelser og stuer mod nord er oplagte steder at starte.",
        "Ved nyere, velisolerede vinduer er gevinsten mindre, men komforten og den behagelige stemning er der stadig.",
      ]},
      { h: "Montering for maksimal effekt", p: [
        "For at termogardinet virker, skal det slutte tæt hele vejen rundt om vinduet — gerne monteret ud over karmen og helt til gulv, så den varme luft ikke slipper ud i siderne eller foroven.",
        "Vi vurderer dine vinduer ved besøget og anbefaler det ophæng, der giver den bedste isolerende effekt.",
      ]},
    ],
    faq: [
      { q: "Hvad er forskellen på termogardiner og almindelige gardiner?", a: "Termogardiner har et isolerende foer i flere lag, der bremser varmetab og kuldenedfald ved ruden. Almindelige gardiner isolerer mindre og er mest til pynt og lyskontrol." },
      { q: "Kan termogardiner betale sig?", a: "Ja, især ved ældre vinduer og kolde rum, hvor de mindsker varmetabet mærkbart. Ved nye vinduer er besparelsen mindre, men komforten stiger." },
      { q: "Mørklægger termogardiner også?", a: "Mange termogardiner mørklægger samtidig, så du får både isolering og lyskontrol. Vi finder den rette kombination ved opmålingen." },
    ],
  },
  {
    slug: "gardiner-sovevaerelse-efteraar",
    metaTitle: "Gardiner i soveværelset om efteråret — bedre søvn i mørketiden | bookgardinbussen.online",
    h1: "Soveværelset om efteråret — gardiner til bedre søvn",
    tag: "Soveværelse om efteråret",
    category: "Efterår – guides & fordele",
    eyebrow: "Guide · Efterår",
    desc: "De rigtige gardiner giver ro, mørke og lunt soveværelse om efteråret. Læs om mørklægning, stof og montering — og book en gratis opmåling hjemme hos dig.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Om efteråret vågner vi i mørke og falder i søvn til gadelys og lave temperaturer. Soveværelset har brug for gardiner, der både lukker lyset ude og holder på varmen, så du sover trygt og godt.",
      "Her får du guiden til soveværelsets gardiner — med fokus på mørklægning, et lunt indeklima og en rolig stemning i mørketiden.",
    ],
    sections: [
      { h: "Mørke for en bedre nattesøvn", p: [
        "Selv svagt lys fra gadelamper og tidlige morgener kan forstyrre søvnen. Mørklægningsgardiner skaber det mørke, kroppen har brug for, og hjælper dig med at sove længere, når morgenerne er sorte.",
        "Vil du kunne vågne blidt, kan du kombinere mørklægning med et let gardin, så du selv styrer, hvor meget morgenlys der slipper ind.",
      ]},
      { h: "Et lunt og roligt indeklima", p: [
        "Et tæt gardin ved ruden dæmper træk og hjælper med at holde en behagelig sovetemperatur i det køligere efterår. Samtidig dæmper det lyd fra vejen, så soveværelset bliver en rolig oase.",
        "Bløde, fyldige stoffer bidrager til den lune, indpakkede fornemmelse, der gør det ekstra rart at krybe under dynen.",
      ]},
      { h: "Vælg stof og ophæng med omtanke", p: [
        "Til soveværelset er tætte, mørklæggende stoffer i afdæmpede farver ofte det bedste valg. Sørg for, at gardinet dækker vinduet helt og går ud over karmen, så lyset ikke siver ind i siderne.",
        "Vi måler op og rådgiver om stof, mørklægningsgrad og montering, så soveværelset bliver præcis så mørkt og lunt, du ønsker.",
      ]},
    ],
    faq: [
      { q: "Hvilke gardiner er bedst i soveværelset om efteråret?", a: "Tætte, mørklæggende gardiner i afdæmpede farver giver ro og mørke, holder på varmen og dæmper lyd — ideelt til søvn i den mørke tid." },
      { q: "Kan jeg stadig få morgenlys ind?", a: "Ja. Kombinér mørklægning med et let gardin, så du kan lukke blidt morgenlys ind uden at give afkald på fuld mørklægning om natten." },
      { q: "Dæmper gardiner også lyd?", a: "Fyldige, tætte stoffer dæmper lyd fra gaden og gør soveværelset roligere — en fordel især i byen og ved trafikerede veje." },
    ],
  },
  {
    slug: "gardiner-mod-traek-og-kulde",
    metaTitle: "Gardiner mod træk og kulde ved vinduerne | bookgardinbussen.online",
    h1: "Gardiner mod træk — luk kulden ude i efteråret",
    tag: "Træk og kulde",
    category: "Efterår – guides & fordele",
    eyebrow: "Guide · Efterår",
    desc: "Mærker du træk fra vinduerne om efteråret? Sådan mindsker gardiner kuldenedfald og træk. Læs guiden — og book en gratis opmåling hjemme hos dig.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Kold luft, der siver ind langs vinduerne, er en klassisk efterårsgene — særligt i ældre boliger. Det rette gardin kan mindske trækken mærkbart og gøre rummet både lunere og mere behageligt at opholde sig i.",
      "I denne guide ser vi på, hvorfor du mærker træk ved vinduet, og hvordan gardiner hjælper med at holde den kolde luft på plads.",
    ],
    sections: [
      { h: "Hvorfor mærker du træk ved vinduet?", p: [
        "Selv om vinduet er tæt, afkøles luften mod den kolde rude og synker ned mod gulvet. Det opleves som en kølig trækvind ved fødderne — også når der ikke reelt trænger luft ind udefra.",
        "Et tæt, gulvlangt gardin bremser denne bevægelse ved at fange den kolde luft mellem stof og rude.",
      ]},
      { h: "Gardiner der bremser kuldenedfald", p: [
        "Tætte, fyldige gardiner — gerne med foer — danner en isolerende barriere foran vinduet. Jo tættere gardinet slutter foroven og jo længere det når ned, desto mindre kold luft slipper ud i rummet.",
        "Kombinerer du med et rullegardin eller en plissé helt inde ved ruden, får du et ekstra lag mod kulden.",
      ]},
      { h: "Tætning kræver rigtig montering", p: [
        "Effekten mod træk afhænger af, at gardinet dækker vinduet helt og slutter tæt i toppen. En skinne med afslutning, der lukker luften inde, virker bedre end en åben stang, hvor varm luft kan stige op bagom.",
        "Ved besøget vurderer vi dine vinduer og anbefaler den løsning, der bedst holder kulden ude.",
      ]},
    ],
    faq: [
      { q: "Kan gardiner fjerne træk fra vinduet?", a: "Gardiner fjerner ikke utætheder i selve vinduet, men tætte, gulvlange gardiner mindsker kuldenedfald og den træk, du mærker ved fødderne, mærkbart." },
      { q: "Hjælper det med flere lag?", a: "Ja. Et rullegardin eller en plissé inde ved ruden kombineret med et tungt gardin udenpå giver flere isolerende lag mod kulden." },
      { q: "Hvilket ophæng er bedst mod træk?", a: "En skinne, der slutter tæt foroven, holder bedre på varmen end en åben stang, fordi den varme luft ikke kan stige op bag gardinet." },
    ],
  },
  {
    slug: "gardiner-om-efteraaret-hygge",
    metaTitle: "Gardiner om efteråret: sådan skaber du hygge og lune | bookgardinbussen.online",
    h1: "Gardiner om efteråret — hygge, lune og bløde rammer",
    tag: "Efterårshygge",
    category: "Efterår – inspiration",
    eyebrow: "Inspiration · Efterår",
    desc: "Skab efterårshygge med de rigtige gardiner. Guide til bløde stoffer, varme farver og lune rammer, der gør hjemmet klar til den mørke tid.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Når mørket falder tidligere på, og regnen trommer mod ruden, bliver hjemmet vores fristed. Gardiner er en af de hurtigste og hyggeligste måder at gøre boligen efterårsklar på — de blødgør lyset, dæmper trækken og pakker rummet ind i lune rammer.",
      "I denne guide får du inspiration til, hvordan du med stof, farve og fald skaber ægte efterårshygge — og gør stuen til et sted, du helst ikke vil forlade, når kulden sætter ind.",
    ],
    sections: [
      { h: "Bløde stoffer giver et lunt udtryk", p: [
        "Efteråret handler om tekstur. Vælg fyldige, matte stoffer som bomuld, hør eller et blødt velour, der fanger lyset og kaster bløde skygger. De giver rummet dybde og en fornemmelse af varme — også før du har tændt for radiatoren.",
        "Et rigeligt stofforbrug er nøglen til det lækre fald. Som tommelfingerregel bruges 1,5–2,5 gange vinduets bredde, så gardinet folder sig fyldigt og indbydende.",
      ]},
      { h: "Hæng gardinerne højt for at ramme stemningen", p: [
        "Hæng gardinstangen tæt på loftet og lad gardinet nå helt til gulv. Det trækker blikket opad, får rummet til at virke højere og giver den bløde, gulvlange effekt, der signalerer hjemlig ro.",
        "Lader du gardinet netop kysse gulvet — eller ligge en anelse i overlængde — får du det afslappede, luksuriøse look, der passer perfekt til efterårets hyggestemning.",
      ]},
      { h: "Lag lys på flere niveauer", p: [
        "Efterårshygge skabes af mange små lyskilder frem for ét skarpt loftslys. Lette, transparente gardiner lukker det svage dagslys blidt ind om dagen, mens et tungere lag kan trækkes for om aftenen og holde på varmen fra stearinlys og lamper.",
        "Kombinationen af to lag giver dig fuld kontrol over stemningen — fra luftig morgen til lun aften.",
      ]},
    ],
    faq: [
      { q: "Hvilke gardiner giver mest hygge om efteråret?", a: "Fyldige gardiner i bløde, matte stoffer som bomuld, hør eller velour i varme jordfarver giver den lune, indbydende stemning, de fleste forbinder med efterårshygge." },
      { q: "Hvor højt skal gardinerne hænge?", a: "Hæng stangen eller skinnen tæt på loftet og lad gardinet nå gulvet. Det får rummet til at virke højere og giver et blødt, sammenhængende udtryk." },
      { q: "Kan jeg få hjælp til at vælge stof og farve?", a: "Ja. Ved et gratis hjemmebesøg kommer vi med prøver, måler op og rådgiver om stof, farve og ophæng, så resultatet passer til netop dit rum." },
    ],
  },
  {
    slug: "efteraarsfarver-gardiner-inspiration",
    metaTitle: "Efterårsfarver til gardiner — inspiration til paletten | bookgardinbussen.online",
    h1: "Efterårsfarver til gardiner — sæt paletten sammen",
    tag: "Efterårsfarver",
    category: "Efterår – inspiration",
    eyebrow: "Inspiration · Efterår",
    desc: "Find efterårets smukkeste gardinfarver: rustrød, karrygul, oliven og varm sand. Inspiration til paletten, der gør hjemmet lunt — book en gratis opmåling.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Efterårets farver er lige uden for vinduet: rustrøde blade, karrygule marker, dybgrøn skov og varm, gylden eftermiddagssol. De samme toner klæder gardinerne og trækker naturens stemning med indenfor.",
      "Her får du inspiration til at sammensætte en efterårspalette, der gør hjemmet lunt og indbydende — uden at det bliver mørkt eller tungt.",
    ],
    sections: [
      { h: "Varme jordfarver som base", p: [
        "Rustrød, terrakotta, karrygul og varm sand er efterårets kernefarver. De giver et lunt, favnende udtryk og fungerer smukt som en blød kontrast til lyse vægge.",
        "Vil du holde det roligt, så vælg én varm jordfarve til gardinerne og lad resten af rummet være neutralt — så bliver gardinet det naturlige omdrejningspunkt.",
      ]},
      { h: "Grønne og dybe toner til ro", p: [
        "Oliven, skovgrøn og støvet flaskegrøn bringer naturen indenfor og virker afdæmpede og elegante. De passer især godt i stuer og arbejdsværelser, hvor du ønsker ro og fordybelse.",
        "Dybe toner som mørkeblå og bordeaux kan bruges som accent, hvis du tør give rummet lidt mere dramatik i den mørke tid.",
      ]},
      { h: "Sådan matcher du med rummet", p: [
        "Tænk farven sammen med gulv, møbler og lysindfald. Et rum med meget dagslys kan bære mørkere gardiner, mens et mørkere rum ofte klæder de lysere, varme sandtoner bedst.",
        "Farver ser forskellige ud i dit eget lys. Derfor tager vi prøver med ved hjemmebesøget, så du kan holde stofferne op mod netop dine vinduer.",
      ]},
    ],
    faq: [
      { q: "Hvilke farver er efterårets favoritter?", a: "Varme jordfarver som rustrød, terrakotta, karrygul og sand samt dybe grønne toner som oliven og skovgrøn er klassiske efterårsfarver til gardiner." },
      { q: "Gør mørke gardiner rummet mindre?", a: "Ikke nødvendigvis. Hænges de højt og bredt og kombineres med lyse vægge, kan mørkere gardiner tværtimod give rummet dybde og en lun stemning." },
      { q: "Kan jeg se farveprøver hjemme?", a: "Ja. Vi tager stofprøver med ved det gratis hjemmebesøg, så du kan vurdere farverne i dit eget lys, før du beslutter dig." },
    ],
  },
  {
    slug: "efteraarsklar-stue-gardiner",
    metaTitle: "Efterårsklar stue: gardiner der skaber stemning | bookgardinbussen.online",
    h1: "Gør stuen efterårsklar med de rigtige gardiner",
    tag: "Efterårsklar stue",
    category: "Efterår – inspiration",
    eyebrow: "Inspiration · Efterår",
    desc: "Gør stuen efterårsklar med gardiner, der skaber stemning og lune rammer. Inspiration til stof, farve og lag — og book en gratis opmåling hjemme hos dig.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Stuen er efterårets samlingspunkt: her drikkes te, læses bøger og ses film, mens regnen står ned udenfor. Med de rigtige gardiner forvandler du rummet til en lun ramme om alt det gode ved årstiden.",
      "Få inspiration til, hvordan du med stof, farve og et par lag gardiner giver stuen den rette efterårsstemning — uden en større ommøblering.",
    ],
    sections: [
      { h: "Skab dybde med tekstur og fald", p: [
        "Fyldige gardiner i taktile stoffer som hør, bomuld eller velour tilfører rummet dybde og en indbydende blødhed. Et generøst fald langs væggen får stuen til at føles færdig og gennemtænkt.",
        "Hæng gardinet højt og bredt, så det rammer mere væg end selve vinduet — det løfter rummet og gør loftet til at virke højere.",
      ]},
      { h: "Farver der trækker efteråret indenfor", p: [
        "Varme jordfarver, dæmpet grøn og bløde sandtoner spiller op mod efterårets lys og skaber en rolig, lun base. Hold farven i familie med puder og plaider, så stuen hænger sammen.",
        "En enkelt dybere accentfarve — bordeaux eller mørkegrøn — kan give rummet karakter uden at det bliver tungt.",
      ]},
      { h: "Lag lys for hyggelige aftener", p: [
        "Kombinér et let gardin, der filtrerer det svage dagslys, med et tungere lag til aftenen. Så kan du trække for, tænde lamperne og lukke den mørke aften ude, når hyggen skal frem.",
        "Vi hjælper dig med at sammensætte lagene og finde det rette ophæng ved et gratis hjemmebesøg.",
      ]},
    ],
    faq: [
      { q: "Hvordan gør jeg hurtigt stuen efterårsklar?", a: "Skift til fyldige gardiner i varme, taktile stoffer og hæng dem højt og bredt. Det ændrer stemningen markant uden at du behøver møblere om." },
      { q: "Skal gardinerne matche puder og plaider?", a: "Hold farverne i samme familie, så rummet hænger sammen. Gardinet kan enten tone i tone med tekstilerne eller danne en blød kontrast til væggene." },
      { q: "Kan jeg kombinere flere gardintyper i stuen?", a: "Ja. Et let gardin til dagslys plus et tungere lag til aften giver fuld kontrol over stemningen. Vi rådgiver om kombinationen ved opmålingen." },
    ],
  },
  {
    slug: "naturmaterialer-gardiner-efteraarstrends",
    metaTitle: "Naturmaterialer og teksturer: efterårets gardintrends | bookgardinbussen.online",
    h1: "Efterårets gardintrends — natur, tekstur og ro",
    tag: "Efterårets gardintrends",
    category: "Efterår – inspiration",
    eyebrow: "Inspiration · Efterår",
    desc: "Hør, bomuld og naturlige teksturer er efterårets gardintrends. Få inspiration til materialer og udtryk — og book en gratis opmåling hjemme hos dig.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Efterårets indretning trækker på naturen: rå teksturer, naturlige fibre og afdæmpede farver, der giver ro. De samme tendenser sætter tonen for årets gardiner.",
      "Her får du overblik over efterårets gardintrends — fra hør og bomuld til de teksturer og toner, der gør hjemmet varmt og nærværende.",
    ],
    sections: [
      { h: "Naturlige fibre i front", p: [
        "Hør og bomuld er tilbage for fuld kraft. De matte, let uregelmæssige overflader giver et afslappet, autentisk udtryk, der passer perfekt til efterårets rolige stemning.",
        "Hør falder tungt og elegant og patinerer smukt, mens bomuld er blødt, alsidigt og let at leve med i en travl hverdag.",
      ]},
      { h: "Tekstur frem for mønster", p: [
        "I stedet for kraftige mønstre er det teksturen, der er i fokus: vævede strukturer, fine ribber og bløde overflader, der fanger lyset og skaber liv i det ensfarvede stof.",
        "Tekstur giver rummet dybde uden at stjæle billedet — en rolig baggrund for efterårets øvrige indretning.",
      ]},
      { h: "Afdæmpede, naturnære farver", p: [
        "Paletten er hentet direkte fra landskabet: sand, ler, sten, oliven og støvet grøn. Farverne er dæmpede og varme og skaber en sammenhængende, lun helhed.",
        "Vil du følge tendensen, så vælg ét naturmateriale og lad farven tone diskret i tråd med gulv og møbler. Vi tager prøver med, så du kan mærke stofferne selv.",
      ]},
    ],
    faq: [
      { q: "Hvilke materialer er trend i efterårets gardiner?", a: "Naturlige fibre som hør og bomuld står stærkt, ofte i vævede teksturer og afdæmpede, naturnære farver som sand, ler og oliven." },
      { q: "Er mønstrede gardiner ude?", a: "Ikke helt, men tendensen går mod tekstur og struktur frem for kraftige mønstre. Det giver et roligt, tidløst udtryk, der er let at leve med." },
      { q: "Hvordan mærker jeg forskel på stofferne?", a: "Ved det gratis hjemmebesøg tager vi prøver med, så du kan føle teksturen og se materialerne i dit eget lys, før du vælger." },
    ],
  },
  {
    slug: "lagdelte-gardiner-efteraar",
    metaTitle: "Lagdelte gardiner: kombinér lys og mørklægning til efteråret | bookgardinbussen.online",
    h1: "Lagdelte gardiner — fuld kontrol over efterårets lys",
    tag: "Lagdelte gardiner",
    category: "Efterår – inspiration",
    eyebrow: "Inspiration · Efterår",
    desc: "Lagdelte gardiner kombinerer let lysfiltrering med mørklægning — perfekt til efterårets skiftende lys. Få inspiration, og book en gratis opmåling hjemme.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Book et gratis hjemmebesøg nedenfor — vi kommer med prøver og måler op.",
    intro: [
      "Efterårets lys skifter hurtigt: fra blødt formiddagslys til tidligt mørke og skarpt gadelys om aftenen. Lagdelte gardiner — layering — giver dig mulighed for at tilpasse lyset time for time.",
      "Her får du inspiration til at kombinere flere gardintyper, så du opnår både luftig dagsstemning og lun, mørklagt aften i samme vindue.",
    ],
    sections: [
      { h: "Hvad er lagdelte gardiner?", p: [
        "Layering betyder, at du kombinerer to eller flere lag ved samme vindue — for eksempel et let, transparent gardin inderst og et tungere, mørklæggende lag yderst. Hvert lag har sin egen funktion.",
        "Om dagen bruger du det lette lag til at filtrere dagslyset blidt, og om aftenen trækker du det tunge lag for og lukker mørket ude.",
      ]},
      { h: "Kombinationer der virker om efteråret", p: [
        "Et populært valg er et transparent hørgardin sammen med et tæt mørklægningsgardin. Alternativt kan et plissé- eller rullegardin inde ved ruden kombineres med et blødt gardin udenpå for både funktion og hygge.",
        "Kombinationen giver også en isolerende effekt, fordi de flere lag holder bedre på varmen ved ruden.",
      ]},
      { h: "Sådan sætter du lagene sammen", p: [
        "Vælg et roligt, lyst inderlag og et fyldigere yderlag i en varm efterårsfarve, så lagene spiller sammen. Et dobbelt ophæng — skinne eller stang med to spor — gør det nemt at trække lagene uafhængigt.",
        "Vi hjælper med at planlægge lagene og ophænget ved et gratis hjemmebesøg, så løsningen både ser flot ud og fungerer i praksis.",
      ]},
    ],
    faq: [
      { q: "Hvad er fordelen ved lagdelte gardiner?", a: "Du får fuld kontrol over lyset: et let lag filtrerer dagslyset, og et tungere lag mørklægger om aftenen. Samtidig isolerer de flere lag bedre mod kulde." },
      { q: "Hvilke lag passer sammen?", a: "Et transparent hørgardin med et mørklægningsgardin er en klassiker. Et plissé eller rullegardin ved ruden plus et blødt gardin udenpå fungerer også godt." },
      { q: "Kræver det særligt ophæng?", a: "Et dobbelt spor i skinne eller stang gør det muligt at trække lagene uafhængigt. Vi rådgiver om det rette ophæng ved opmålingen." },
    ],
  },
];

// Nyheder / inspiration (info fra gardinbus.nu/nyheder). Billeder er
// pladsholder-illustrationer, indtil rigtige fotos er tilgængelige.
const NEWS = [
  {
    slug: "plissegardiner-trendy",
    title: "Plisségardiner er trendy!",
    accent: ["#dbe2d4", "#b7cbb0"],
    link: { href: "blog/plissegardiner.html", text: "Læs guide til plisségardiner" },
    body: [
      "En af de helt store fordele ved plisségardiner er, at de kan trækkes både oppefra og nedefra. Det gør dem utrolig fleksible: du kan skærme for indblik forneden og samtidig lade dagslyset strømme ind foroven — perfekt til stuer, badeværelser og køkkener, hvor du vil have både lys og privatliv.",
      "Plisségardiner fås i et væld af farver og stoftætheder, fra lette lysfiltrerende til helt mørklæggende. De fylder næsten ingenting, når de er trukket sammen, og passer også til ovenlys og skæve vinduer. Ikke så mærkeligt, at de er et af de mest populære valg lige nu.",
    ],
  },
  {
    slug: "fordele-lamelgardiner",
    title: "Fordele ved lamelgardiner",
    accent: ["#e7ddcc", "#cbb595"],
    link: { href: "blog/lamelgardiner.html", text: "Læs guide til lamelgardiner" },
    body: [
      "Lamelgardiner har eksisteret i mange år og er stadig et populært valg — og med god grund. De lodrette lameller er skabt til store vinduespartier og skydedøre, hvor de dækker elegant uden at virke tunge, og de kan nemt trækkes til side, når du vil ud på terrassen.",
      "Ved at dreje lamellerne styrer du lys og indblik helt trinløst, og stofferne fås i alt fra lyse, luftige toner til mørklæggende varianter. Det gør lamelgardiner til en fleksibel løsning, der både er praktisk og pæn — i hjemmet såvel som på kontoret.",
    ],
  },
  {
    slug: "luxaflex-powerview",
    title: "Luxaflex PowerView – det smarte valg",
    accent: ["#dce4ec", "#9fb6cf"],
    link: { href: "book", text: "Book og hør om smarte løsninger" },
    body: [
      "Mange af vores kunder efterspørger automatiske løsninger, og med Luxaflex PowerView er du sikret gardiner, der kører helt af sig selv. Via app'en kan du åbne og lukke gardinerne, lægge tidsplaner og styre det hele fra mobilen — også når du ikke er hjemme.",
      "Motoriserede gardiner er ideelle til høje eller svært tilgængelige vinduer, og de giver både komfort og et ekstra lag tryghed, fordi hjemmet ser beboet ud. Vi rådgiver om, hvilke smarte løsninger der passer bedst til dine vinduer.",
    ],
  },
  {
    slug: "sov-bedre-moerklaegning",
    title: "Sov bedre med mørklægningsgardiner",
    accent: ["#c9cfdb", "#5a6b8a"],
    link: { href: "blog/rullegardiner.html", text: "Se mørklægning som rullegardin" },
    body: [
      "Tidligt morgenlys og lyse sommernætter kan forstyrre din søvn. Mørklægningsgardiner lukker effektivt lyset ude og hjælper kroppen med at falde til ro — særligt vigtigt i soveværelser og børneværelser.",
      "Du kan få mørklægning som rullegardiner, plisségardiner eller foerede gardiner, alt efter dit vindue og din stil. Vil du undgå lysstriber i siderne, rådgiver vi om en montering, der dækker helt til kanten.",
    ],
  },
  {
    slug: "lounge-stemning-gardiner",
    title: "Lounge-stemning med gardiner",
    accent: ["#e2ece7", "#bcd6cc" ],
    link: { href: "blog/gardiner.html", text: "Læs guide til gardiner" },
    body: [
      "Bløde gardiner gør mere end at skærme for lys — de dæmper lyd, blødgør rummet og skaber med det samme en lun lounge-stemning. Med de rette stoffer og et fald fra loft til gulv får du et rum, der føles færdigt og indbydende.",
      "Vi hjælper dig med at finde farver og strukturer, der binder din indretning sammen, og hænger gardinerne højt og bredt for at fremhæve loftshøjden og få vinduerne til at virke større.",
    ],
  },
  {
    slug: "insektnet-indeklima",
    title: "Insektnet giver bedre indeklima",
    accent: ["#e6efdc", "#8fbf6a"],
    link: { href: "book", text: "Book et besøg om insektnet" },
    body: [
      "Et godt indeklima starter med frisk luft — men åbne vinduer inviterer også insekter indenfor. Med et insektnet kan du lufte ud hele sommeren uden myg, fluer og hvepse i hjemmet.",
      "Insektnet fås som diskrete rullenet og faste rammer, der passer til både vinduer og døre, og de er nemme at betjene i hverdagen. En lille løsning, der gør en stor forskel for komforten.",
    ],
  },
];

function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function attr(s) {
  return esc(s).replace(/"/g, "&quot;");
}

// Book-knap der peger på affiliate-linket (åbner i nyt vindue).
function bookBtn(label, cls) {
  return `<a class="btn ${cls}" href="${attr(AFFILIATE_BOOK_URL)}" target="_blank" rel="noopener sponsored">${esc(label)}</a>`;
}

// CTA-kort der erstatter booking-formularen. `label` varieres pr. side, så
// call-to-actions ikke er ens overalt.
function ctaCard(label, lead) {
  return `        <div class="booking-form cta-card">
          <p class="cta-card-tag">Book online</p>
          <p class="cta-card-lead">${esc(lead)}</p>
          ${bookBtn(label, "btn-primary btn-block")}
          <p class="cta-card-note">Du sendes til Gardinbus' bookingside i et nyt vindue.</p>
        </div>`;
}

module.exports = {
  AFFILIATE_BOOK_URL, SITE, CITIES, REGION, BLOG, NEWS,
  slugify, esc, attr, bookBtn, ctaCard,
};
