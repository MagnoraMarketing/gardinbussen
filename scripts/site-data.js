// Fælles data + helpers til site-generatoren.
// Rediger byer, blogindlæg og affiliate-formularens URL her.

// Affiliate-booking-link hos Gardinbus. Alle "book"-CTA'er på sitet peger
// hertil. Skift kun denne linje for at opdatere linket overalt.
const AFFILIATE_BOOK_URL = "https://www.partner-ads.com/dk/klikbanner.php?partnerid=52168&bannerid=113375&uid=Hjemmeside&htmlurl=https://gardinbus.nu/gardinbus-book/";

const SITE = "https://www.bookgardinbussen.online";

// Leverandør-sider og affiliate-deeplinks (se scripts/supplier.js).
const { affiliateUrl, DISCLOSURE_CTA } = require("./supplier");

// Google Search Console: indsæt koden fra "HTML-tag"-metoden her (kun
// værdien i content="..."), og kør node scripts/seo-technical.js. Tom = intet
// tag (fx når domænet er verificeret via DNS eller Google Analytics).
const GOOGLE_SITE_VERIFICATION = "";

// Bing Webmaster Tools: indsæt koden fra "HTML Meta Tag"-metoden her (kun
// værdien i <meta name="msvalidate.01" content="...">), og kør
// node scripts/seo-technical.js. Tom = intet tag (fx ved import fra Google
// Search Console, som ikke kræver et tag).
const BING_SITE_VERIFICATION = "";

// Google Tag Manager: container-ID (GTM-XXXXXXX). Indsættes øverst i <head>
// og lige efter <body> på alle sider af seo-technical.js. Tom = ingen GTM.
const GTM_ID = "GTM-WPMBZL4K";

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
  "Frederiksberg", "Gentofte", "Lyngby", "Hørsholm", "Ishøj",
  "Glostrup", "Herlev", "Ribe", "Varde", "Tønder",
  "Aars", "Skagen", "Hirtshals", "Ebeltoft", "Struer",
  "Lemvig", "Faaborg", "Kerteminde", "Sorø", "Maribo",
];

const REGION = {
  "København": "Hovedstaden", "Taastrup": "Hovedstaden", "Hillerød": "Hovedstaden",
  "Helsingør": "Hovedstaden", "Ballerup": "Hovedstaden", "Frederikssund": "Hovedstaden",
  "Greve": "Hovedstaden", "Rødovre": "Hovedstaden", "Frederiksværk": "Hovedstaden",
  "Allerød": "Hovedstaden", "Frederiksberg": "Hovedstaden", "Gentofte": "Hovedstaden",
  "Lyngby": "Hovedstaden", "Hørsholm": "Hovedstaden", "Ishøj": "Hovedstaden",
  "Glostrup": "Hovedstaden", "Herlev": "Hovedstaden",
  "Roskilde": "Sjælland", "Næstved": "Sjælland", "Køge": "Sjælland",
  "Slagelse": "Sjælland", "Holbæk": "Sjælland", "Ringsted": "Sjælland",
  "Kalundborg": "Sjælland", "Korsør": "Sjælland", "Vordingborg": "Sjælland",
  "Nykøbing Falster": "Sjælland", "Sorø": "Sjælland", "Maribo": "Sjælland",
  "Odense": "Fyn", "Svendborg": "Fyn", "Nyborg": "Fyn", "Middelfart": "Fyn",
  "Esbjerg": "Syddanmark", "Kolding": "Syddanmark", "Vejle": "Syddanmark",
  "Fredericia": "Syddanmark", "Sønderborg": "Syddanmark", "Haderslev": "Syddanmark",
  "Aabenraa": "Syddanmark", "Ribe": "Syddanmark", "Varde": "Syddanmark",
  "Tønder": "Syddanmark", "Faaborg": "Syddanmark", "Kerteminde": "Syddanmark",
  "Aarhus": "Midtjylland", "Randers": "Midtjylland", "Horsens": "Midtjylland",
  "Herning": "Midtjylland", "Silkeborg": "Midtjylland", "Viborg": "Midtjylland",
  "Holstebro": "Midtjylland", "Skive": "Midtjylland", "Skanderborg": "Midtjylland",
  "Grenaa": "Midtjylland", "Ikast": "Midtjylland", "Ringkøbing": "Midtjylland",
  "Ebeltoft": "Midtjylland", "Struer": "Midtjylland", "Lemvig": "Midtjylland",
  "Aalborg": "Nordjylland", "Hjørring": "Nordjylland", "Frederikshavn": "Nordjylland",
  "Nørresundby": "Nordjylland", "Thisted": "Nordjylland", "Brønderslev": "Nordjylland",
  "Hobro": "Nordjylland", "Aars": "Nordjylland", "Skagen": "Nordjylland",
  "Hirtshals": "Nordjylland",
};

// Blogindlæg. Rækkefølgen styrer blog-oversigten og llms.txt.
// sections[].p: afsnit (tekst) eller { list: [...] } for en punktliste.
// Valgfrit: eyebrow, card ({ title, desc } på blog-oversigten, hvis de
// skal afvige fra tag/desc), pullQuote (citat efter første afsnit), related
// ("Læs også"-boks), ctaNote, ctaLead, bookingText og llmsDesc (beskrivelse i
// llms.txt, hvis den skal afvige fra desc). Illustrationen følger kategorien
// (BLOG_CATEGORIES i build.js).
const BLOG = [
  {
    slug: "gardiner",
    category: "Gardintyper",
    metaTitle: "Gardiner: Guide til typer, stof og ophæng",
    h1: "Gardiner — guide til typer, stof og ophæng",
    tag: "Gardiner",
    supplier: "gardiner",
    desc: "Guide til gardiner: typer, stoffer, ophæng og valg til hvert rum. Se også, hvordan du får gratis rådgivning og opmåling hjemme via Gardinbus.nu.",
    intro: [
      "Gardiner er en af de nemmeste måder at ændre stemningen i et rum på. De blødgør lyset, dæmper lyden, skærmer for indblik og binder indretningen sammen — og det rigtige valg afhænger af rummet, lysindfaldet og din smag.",
      "I denne guide gennemgår vi de vigtigste typer gardiner, hvordan du vælger stof, og hvad du skal være opmærksom på med ophæng, opmåling og montering.",
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
        "En korrekt opmåling er afgørende for et flot fald. Gardinbus.nu syr gardinerne efter mål og tilbyder både opmåling og montering — spørg ved booking, hvilke betingelser der gælder for montering.",
      ]},
      { h: "Typiske fejl ved valg af gardiner", p: [
        "For lidt stof: gardiner, der kun lige dækker vinduet, ser flade ud. Regn med mere bredde end selve vinduet, så stoffet kan falde i folder.",
        "Ophænget sidder for lavt: hænges gardinet lige over rammen, virker rummet lavere. Højere og bredere giver luft og lys.",
        "Stoffet passer ikke til rummet: et tyndt stof i soveværelset giver ikke mørke, og et tungt stof i en lille stue kan virke massivt. Se stofprøverne i dit eget lys, før du beslutter dig.",
      ]},
    ],
    pullQuote: "Gardiner blødgør lyset, dæmper lyden og binder indretningen sammen — i ét greb.",
    faq: [
      { q: "Hvor meget stof skal der til gardiner?", a: "Som tommelfingerregel bruges 1,5–2,5 gange vinduets bredde for at få et fyldigt fald. Det præcise stofforbrug afhænger af stof og ophæng og beregnes ved opmålingen." },
      { q: "Kan gardiner vaskes?", a: "Mange gardinstoffer kan vaskes skånsomt ved lav temperatur, men det afhænger af materialet. Følg altid vaskeanvisningen, og hæng gardinerne op igen let fugtige for at undgå folder." },
      { q: "Hvad koster gardiner?", a: "Prisen afhænger af stof, mængde, ophæng og vinduernes størrelse. Ved et gratis besøg fra Gardinbus.nu måler konsulenten op, og du får et uforpligtende tilbud." },
    ],
    related: {
      text: "Leder du efter gardiner, står valget ofte mellem billige gardiner i lette stoffer og gardiner i god kvalitet med tungere fald og længere holdbarhed. Uanset budget kan du få rådgivning om stof, ophæng og montering ved et besøg, så løsningen passer til netop dit rum og dine vinduer.",
      links: [
        { slug: "rullegardiner", label: "Rullegardiner" },
        { slug: "persienner", label: "Persienner" },
        { slug: "gardiner-til-stuen", label: "Gardiner til stuen" },
      ],
    },
    ctaNote: "Vil du se gardinstoffer i dit eget lys? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med stofprøver og opmåling.",
  },
  {
    slug: "rullegardiner",
    category: "Gardintyper",
    metaTitle: "Rullegardiner: Guide til valg, mørklægning og montering",
    h1: "Rullegardiner — enkle, funktionelle og lette at betjene",
    tag: "Rullegardiner",
    supplier: "produkter",
    desc: "Rullegardiner er enkle og fås også som mørklægning. Læs om varianter, materialer og montering — og hvordan du får rullegardiner målt op gratis hjemme.",
    intro: [
      "Rullegardiner er blandt de mest praktiske vinduesløsninger: rene linjer, nem betjening og god lysstyring på lidt plads. De passer til stort set alle rum og vinduestyper.",
      "Her får du overblik over varianter, materialer og hvornår rullegardiner er det rigtige valg — og hvad du skal være opmærksom på ved montering.",
    ],
    sections: [
      { h: "Varianter af rullegardiner", p: [
        "Du kan vælge lysfiltrerende rullegardiner, der giver et blødt dagslys, eller mørklægningsrullegardiner, der lukker næsten alt lys ude — ideelt til soveværelser og børneværelser.",
        "Til køkken og bad findes fugtbestandige materialer, der tåler damp og er nemme at tørre af.",
      ]},
      { h: "Hvorfor vælge rullegardiner?", p: [
        "Rullegardiner fylder meget lidt, når de er rullet op, og giver et roligt, minimalistisk udtryk. De kan bruges alene eller kombineres med løse gardiner for et blødere look.",
        "De betjenes typisk med kæde. Motoriserede rullegardiner findes også på markedet — er det et ønske, så spørg konsulenten, om løsningen kan leveres til dine vinduer.",
      ]},
      { h: "Montering og opmåling", p: [
        "Rullegardiner kan monteres i loft, på væg eller direkte i vinduesrammen. Den rigtige montage afhænger af vinduet og ønsket lystæthed.",
        "Gardinbus.nu laver rullegardiner efter mål og tilbyder opmåling og montering, så gardinet kører let og slutter tæt til kanterne.",
      ]},
      { h: "Tjekliste før du vælger rullegardin", p: [
        "Skal rummet mørklægges helt, eller er blødt dagslys nok? Det afgør stoftypen.",
        "Åbnes vinduet ofte? Så kan montering i rammen være mere praktisk end på væggen.",
        "Er der fugt i rummet? Vælg i så fald et materiale, der tåler damp og kan tørres af.",
      ]},
    ],
    pullQuote: "Rene linjer og god lysstyring på lidt plads — rullegardiner passer til stort set alle rum.",
    faq: [
      { q: "Kan rullegardiner mørklægge helt?", a: "Mørklægningsrullegardiner lukker langt det meste lys ude. Vil du undgå lysstriber i siderne, kan gardinet monteres, så det dækker lidt ud over vinduet — du kan bede om rådgivning om det ved besøget." },
      { q: "Kan rullegardiner motoriseres?", a: "Motoriserede rullegardiner findes og kan være praktiske til høje eller svært tilgængelige vinduer. Spørg konsulenten, om en motorløsning kan leveres til dine vinduer." },
      { q: "Passer rullegardiner i badeværelset?", a: "Ja, med fugtbestandige materialer er rullegardiner et godt valg i vådrum, fordi de er nemme at holde rene." },
    ],
    related: {
      text: "Rullegardiner er blandt de mest populære og billige gardiner, fordi de er enkle, holdbare og nemme at holde rene. Vil du investere lidt mere, fås de også i tykke mørklægningsstoffer af god kvalitet, der skærmer effektivt for lys.",
      links: [
        { slug: "persienner", label: "Persienner" },
        { slug: "plissegardiner", label: "Plisségardiner" },
        { slug: "plissegardiner-eller-rullegardiner", label: "Plissé eller rullegardiner?" },
      ],
    },
    ctaNote: "Vil du se rullegardiner i dit eget vindue? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },
  {
    slug: "persienner",
    category: "Gardintyper",
    metaTitle: "Persienner: Alu eller træ? Guide til lysstyring",
    h1: "Persienner — præcis lysstyring i alu eller træ",
    tag: "Persienner",
    supplier: "persienner",
    desc: "Persienner giver præcis kontrol over lys og indblik. Læs om alu- og træpersienner, lamelbredde, farver og montering — og få gratis opmåling hjemme.",
    intro: [
      "Persienner lader dig styre lyset helt præcist ved at vippe lamellerne. Du kan slippe dagslys ind uden at give indblik — eller lukke helt til.",
      "Guiden hjælper dig med at vælge mellem alu og træ, finde den rigtige lamelbredde og vælge en løsning, der passer til rummet.",
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
        "Persienner fra Gardinbus.nu laves efter mål, og leverandøren tilbyder montering, så lamellerne sidder lige og kører let.",
      ]},
      { h: "Fordele og ulemper ved persienner", p: [
        "Fordele: meget præcis lysstyring, lille pladsforbrug og velegnede til fugtige rum (alu).",
        "Ulemper: lamellerne samler støv og skal tørres af jævnligt, og de mørklægger ikke helt, fordi der altid slipper lidt lys ind mellem lamellerne.",
      ]},
    ],
    pullQuote: "Vip lamellerne, og du styrer lyset præcist — uden at lukke helt af for udsigten.",
    faq: [
      { q: "Kan persienner tåle fugt?", a: "Alupersienner tåler fugt godt og er derfor velegnede til køkken og bad. Træpersienner bør undgås i meget fugtige rum, men findes også i fugtbestandigt trælook." },
      { q: "Hvilken lamelbredde skal jeg vælge?", a: "Smalle lameller giver et fint, diskret udtryk, mens bredere lameller (typisk træ) giver et varmere look og mere frit udsyn, når de er åbne." },
      { q: "Kan persienner sidde i vinduer der åbnes?", a: "Ja, med den rette montering kan persienner sidde tæt på ruden og følge vinduet, så de ikke er i vejen." },
    ],
    related: {
      text: "Persienner giver den mest præcise lysstyring af alle gardintyper: vip lamellerne til den vinkel, der passer, uden at give afkald på udsigten. De findes i alt fra billige alu-persienner til modeller i god kvalitet med bredere, mere robuste lameller.",
      links: [
        { slug: "plissegardiner", label: "Plisségardiner" },
        { slug: "lamelgardiner", label: "Lamelgardiner" },
        { slug: "gardinstaenger-og-skinner", label: "Gardinstænger & skinner" },
      ],
    },
    ctaNote: "Vil du sammenligne alu- og træpersienner hjemme? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },
  {
    slug: "plissegardiner",
    category: "Gardintyper",
    metaTitle: "Plisségardiner: Fleksible til ovenlys og skrå vinduer",
    h1: "Plisségardiner — fleksible og elegante",
    tag: "Plisségardiner",
    supplier: "produkter",
    desc: "Plisségardiner kan skærme oppefra og nedefra og passer til ovenlys og specielle vinduer. Læs om stoffer, funktion og montering i guiden.",
    intro: [
      "Plisségardiner er foldede stofgardiner, der fylder meget lidt og kan indstilles trinløst. De er kendt for at kunne skærme både oppefra og nedefra — perfekt, når du vil have lys ind foroven men skærme for indblik forneden.",
      "De er samtidig et af de mest fleksible valg til svære vinduer som ovenlys, skrå og specielt formede vinduer.",
    ],
    sections: [
      { h: "Skærm oppefra og nedefra", p: [
        "Med top-down/bottom-up-funktionen bestemmer du selv, hvor på vinduet gardinet skal dække. Det giver både dagslys og privatliv på samme tid.",
        "Fås i lysfiltrerende og mørklæggende stoffer, så løsningen kan tilpasses hvert rum.",
      ]},
      { h: "Perfekt til ovenlys og specielle vinduer", p: [
        "Plisségardiner findes i modeller til ovenlys, skrå vinduer, trekantede og runde vinduer, hvor almindelige gardiner ikke passer.",
        "Til ovenlys monteres de med sidewires, så gardinet holdes på plads uanset vinklen. Har du et særligt vindue, så spørg konsulenten, hvilke modeller der kan leveres.",
      ]},
      { h: "Vedligeholdelse og montering", p: [
        "Plisséstof er nemt at holde og støves af med en let børste eller lav sugestyrke.",
        "Gardinbus.nu laver plisségardiner efter mål og tilbyder montering, så gardinet sidder stramt og kører jævnt.",
      ]},
    ],
    pullQuote: "Skærm for indblik forneden, og lad lyset strømme ind foroven — samtidig.",
    faq: [
      { q: "Kan plisségardiner sidde i ovenlys?", a: "Ja, plisségardiner er et populært valg til ovenlys og monteres med sidewires, så de holdes på plads i alle vinkler." },
      { q: "Kan plisségardiner mørklægge?", a: "Ja, med mørklæggende plisséstof kan de skærme effektivt for lys — velegnet til soveværelser og børneværelser." },
      { q: "Fylder plisségardiner meget?", a: "Nej, folderne pakker tæt sammen, så gardinet fylder meget lidt, når det er trukket op." },
    ],
    related: {
      text: "Plisségardiner er den fleksible løsning til skæve vinduer og ovenlys, fordi de kan skærme både oppefra og nedefra. De fås i et bredt spænd af stofkvaliteter, fra lette og prisvenlige stoffer til tætte mørklægningsstoffer i god kvalitet.",
      links: [
        { slug: "lamelgardiner", label: "Lamelgardiner" },
        { slug: "gardinstaenger-og-skinner", label: "Gardinstænger & skinner" },
        { slug: "gardiner-til-skraavinduer", label: "Gardiner til skråvinduer" },
      ],
    },
    ctaNote: "Vil du se plisségardiner i dit eget vindue? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },
  {
    slug: "lamelgardiner",
    category: "Gardintyper",
    metaTitle: "Lamelgardiner: Til store vinduer og skydedøre",
    h1: "Lamelgardiner — til store partier og skydedøre",
    tag: "Lamelgardiner",
    supplier: "produkter",
    desc: "Lamelgardiner er en elegant løsning til store vinduespartier og skydedøre. Læs om funktion, stoffer, mørklægning og montering i vores guide.",
    intro: [
      "Lamelgardiner består af lodrette lameller, der kan drejes og trækkes til siden. De er skabt til store vinduespartier, skydedøre og kontorer, hvor de giver et roligt, professionelt udtryk.",
      "Her får du overblik over, hvornår lamelgardiner er det rigtige valg, og hvad du skal overveje før du bestiller.",
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
        "Lamelgardiner monteres typisk i loft eller på væg og betjenes med kæde og snor. Motoriserede varianter findes også — spørg konsulenten, om det kan leveres.",
        "Gardinbus.nu laver lamelgardiner efter mål og tilbyder montering, så skinnen sidder lige og lamellerne hænger pænt.",
      ]},
      { h: "Overvej før du vælger lamelgardiner", p: [
        "Hvilken side skal lamellerne samles i? Ved en skydedør bør de samles væk fra den side, du går ud ad.",
        "Er der radiator eller vindueskarm under vinduet? Det påvirker, hvor langt lamellerne kan gå ned.",
        "Skal rummet mørklægges? Der slipper altid lidt lys ind mellem lamellerne, så overvej en anden gardintype i soveværelset.",
      ]},
    ],
    pullQuote: "Lodrette lameller, der drejes og trækkes til siden — skabt til de helt store vinduer.",
    faq: [
      { q: "Passer lamelgardiner til skydedøre?", a: "Ja, lamelgardiner er et oplagt valg til skydedøre og terrassepartier, fordi lamellerne nemt kan trækkes til side, når du skal ud." },
      { q: "Kan lamelgardiner mørklægge?", a: "Med mørklæggende lamelstof kan de skærme effektivt for lys. Vil du helt undgå lys mellem lamellerne, kan du spørge konsulenten om alternativer ved besøget." },
      { q: "Hvor bred kan en lamelløsning være?", a: "Lamelgardiner kan dække meget brede partier og deles op, så de trækkes til én eller begge sider. Løsningen tilpasses dit vindue ved opmålingen." },
    ],
    related: {
      text: "Lamelgardiner er den professionelle løsning til store vinduespartier, skydedøre og kontorer. De lodrette lameller giver et roligt udtryk og præcis lysstyring, og findes i stofkvaliteter fra prisvenlige til mere robuste, langtidsholdbare varianter.",
      links: [
        { slug: "gardinstaenger-og-skinner", label: "Gardinstænger & skinner" },
        { slug: "foldegardiner", label: "Foldegardiner" },
        { slug: "gardiner-til-store-vinduer", label: "Gardiner til store vinduer" },
      ],
    },
    ctaNote: "Har du et stort vinduesparti eller en skydedør? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },
  {
    slug: "gardinstaenger-og-skinner",
    category: "Gardintyper",
    metaTitle: "Gardinstænger og skinner: Sådan vælger du ophæng",
    h1: "Gardinstænger og skinner — det rigtige ophæng",
    tag: "Gardinstænger & skinner",
    supplier: "gardiner",
    desc: "Gardinstang eller skinne? Guide til det rigtige ophæng til dine gardiner — udtryk, funktion, højde og montering, så gardinet falder pænt.",
    intro: [
      "Ophænget bestemmer både, hvordan gardinerne falder, og hvordan de fremstår. Valget mellem en synlig gardinstang og en diskret skinne handler om både stil og funktion.",
      "I denne guide gennemgår vi forskellene, så du kan vælge det ophæng, der passer til dine gardiner og dit rum.",
    ],
    sections: [
      { h: "Gardinstang eller skinne?", p: [
        "En gardinstang er et synligt element, der kan understrege stilen med endestykker i f.eks. metal eller træ. Den passer godt til løse gardiner med et afslappet fald.",
        "En gardinskinne er diskret og næsten usynlig — ideel, når gardinet skal være i fokus, eller når du vil have et stramt, moderne udtryk.",
      ]},
      { h: "Funktion og betjening", p: [
        "Skinner findes med glidere og kan bøjes rundt om hjørner — praktisk til karnapper og store partier. Både stænger og skinner findes også med motor på markedet.",
        "Til tunge gardiner er en solid montering vigtig, så ophænget holder over tid.",
      ]},
      { h: "Montering", p: [
        "Ophæng kan monteres i loft eller på væg afhængigt af rummet og det ønskede fald.",
        "Bestiller du gardiner via Gardinbus.nu, kan du ved besøget spørge konsulenten, hvilket ophæng der passer, og om det kan leveres og monteres sammen med gardinerne.",
      ]},
      { h: "Typiske fejl ved ophæng", p: [
        "For kort stang eller skinne: gardinet kan ikke trækkes helt fri af vinduet og stjæler lys. Lad ophænget gå et stykke ud til hver side.",
        "For svage beslag til tunge stoffer: ophænget bøjer eller river sig løs over tid. Tjek væggens materiale, og brug passende rawplugs.",
        "Glemt plads til åbning: sidder ophænget for tæt på et indadgående vindue, kan vinduet ikke åbnes frit.",
      ]},
    ],
    pullQuote: "Ophænget bestemmer, hvordan gardinet falder — og hvordan hele vinduet opleves.",
    faq: [
      { q: "Skal jeg vælge stang eller skinne?", a: "Vælg en gardinstang, hvis ophænget må ses og gerne må være en detalje. Vælg en skinne, hvis den skal være diskret, eller hvis du vil kunne føre gardinet rundt om hjørner." },
      { q: "Kan ophæng bøjes rundt om hjørner?", a: "Ja, gardinskinner kan bøjes og føres rundt om f.eks. karnapvinduer, så gardinet følger væggen." },
      { q: "Kan gardinstænger og skinner motoriseres?", a: "Motoriserede stænger og skinner findes, så gardinerne kan trækkes med fjernbetjening eller app. Spørg konsulenten, om en motorløsning kan leveres til dit projekt." },
    ],
    related: {
      text: "Det rigtige ophæng er lige så vigtigt som selve gardinet. Uanset om du vælger en synlig gardinstang eller en diskret skinne, bør løsningen passe til dit udtryk, dit vindue og dit budget — og du kan bede om rådgivning om ophæng ved et besøg.",
      links: [
        { slug: "foldegardiner", label: "Foldegardiner" },
        { slug: "traepersienner", label: "Træpersienner" },
        { slug: "insektnet-til-vinduer-og-doere", label: "Insektnet" },
      ],
    },
    ctaNote: "Overvejer du nye gardiner og ophæng? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver, rådgivning og opmåling.",
  },
  {
    slug: "foldegardiner",
    category: "Gardintyper",
    metaTitle: "Foldegardiner: Bløde folder og elegant fald",
    h1: "Foldegardiner — bløde folder og et elegant fald",
    tag: "Foldegardiner",
    supplier: "produkter",
    desc: "Foldegardiner samler stoffet i bløde, vandrette folder. Læs om stof, mørklægning, montering og forskellen på folde- og rullegardiner i guiden.",
    intro: [
      "Foldegardiner (også kaldet romangardiner) forener stofgardinets blødhed med rullegardinets funktion. Når du hæver gardinet, samler stoffet sig i pæne, vandrette folder, og trukket ned danner det en glat, rolig flade for vinduet.",
      "Her får du overblik over, hvornår foldegardiner er det rigtige valg, hvilke stoffer der passer bedst, og hvad du skal vide om montering.",
    ],
    sections: [
      { h: "Hvad er foldegardiner?", p: [
        "Foldegardiner er stofgardiner, der hæves og sænkes med et snoretræk. Stoffet er syet med skjulte stivere, så det folder sig ensartet sammen foroven — et mere afdæmpet og struktureret udtryk end løse gardiner, der hænger frit.",
        "De giver den lune tekstilfornemmelse i et format, der fylder lidt og virker ryddeligt — oplagt til både stue, køkken og soveværelse.",
      ]},
      { h: "Stof, lys og mørklægning", p: [
        "Lette, lysfiltrerende stoffer giver et blødt dagslys, mens tætte stoffer og foer skærmer mere for lys og indblik. Til soveværelset kan et mørklæggende foer give ro og mørke.",
        "Stof, farve og struktur vælges, så gardinet spiller sammen med resten af indretningen — fra diskret ensfarvet til et markant mønster som blikfang.",
      ]},
      { h: "Montering og opmåling", p: [
        "Foldegardiner kan monteres i loftet, på væggen eller direkte i vinduesrammen, afhængigt af vinduet og det ønskede fald. En præcis opmåling er afgørende for, at folderne lægger sig jævnt.",
        "Gardinbus.nu laver foldegardiner efter mål og tilbyder opmåling og montering, så gardinet hænger lige, folder sig pænt og betjenes let.",
      ]},
    ],
    pullQuote: "Hævet danner stoffet bløde, vandrette folder — trukket ned en glat, rolig flade.",
    faq: [
      { q: "Hvad er forskellen på foldegardiner og rullegardiner?", a: "Begge hæves og sænkes, men foldegardiner er af blødt stof, der samler sig i vandrette folder, mens rullegardiner ruller op om en stang og har et mere stramt, minimalistisk udtryk." },
      { q: "Kan foldegardiner mørklægge?", a: "Ja. Med et tæt stof eller et mørklæggende foer skærmer foldegardiner effektivt for lys — velegnet til soveværelser og medierum." },
      { q: "Kan foldegardiner motoriseres?", a: "Motoriserede foldegardiner findes og kan være praktiske til høje eller svært tilgængelige vinduer. Spørg konsulenten, om en motorløsning kan leveres." },
    ],
    related: {
      text: "Foldegardiner, også kaldet romangardiner, samler stoffets blødhed med rullegardinets funktion i én løsning. De findes i stofkvaliteter fra lette og prisvenlige til tunge mørklægningsstoffer i god kvalitet, der giver et roligt, elegant udtryk.",
      links: [
        { slug: "traepersienner", label: "Træpersienner" },
        { slug: "insektnet-til-vinduer-og-doere", label: "Insektnet" },
        { slug: "luxaflex", label: "Luxaflex" },
      ],
    },
    ctaNote: "Vil du mærke stofferne til foldegardiner hjemme? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med stofprøver og opmåling.",
  },
  {
    slug: "traepersienner",
    category: "Gardintyper",
    metaTitle: "Træpersienner: Varme lameller og naturligt look",
    h1: "Træpersienner — varmt, naturligt look med bred lamel",
    tag: "Træpersienner",
    supplier: "persienner",
    desc: "Træpersienner giver et varmt udtryk med brede lameller og præcis lysstyring. Læs om farver, lamelbredde, fugt og montering i vores guide.",
    intro: [
      "Træpersienner tilføjer varme og naturlig karakter til vinduet. De brede lameller i træ eller trælook giver et hyggeligt, indbydende udtryk og et frit udsyn, når de er åbne — samtidig med at du styrer lys og indblik helt præcist.",
      "Her ser vi på fordelene ved træpersienner, hvilken lamelbredde og farve du skal vælge, og hvor de passer bedst ind.",
    ],
    sections: [
      { h: "Derfor vælger mange træpersienner", p: [
        "Træ har en lun, naturlig overflade, der bløder rummet op på en anden måde end slanke alupersienner. De brede lameller giver et roligt, eksklusivt look og et generøst udsyn, når de vippes åbne.",
        "Ved at dreje lamellerne styrer du trinløst, hvor meget lys og indblik du vil have — fra fuldt dagslys til næsten helt lukket.",
      ]},
      { h: "Farver, lamelbredde og trælook", p: [
        "Træpersienner fås i alt fra lyse, naturlige trætoner til mørke og malede farver, så de kan matche gulv, møbler eller vinduesrammen. Bredere lameller understreger det markante, rolige udtryk.",
        "Ægte træ passer bedst i tørre rum som stue, soveværelse og kontor. Til køkken og bad — hvor der er fugt — anbefaler vi at overveje fugtbestandigt trælook, der ligner træ, men tåler damp.",
      ]},
      { h: "Montering og opmåling", p: [
        "Træpersienner kan monteres i loft, på væg eller i vinduesrammen. Den rette montering afhænger af vinduet, og om persiennen skal kunne følge et vindue, der åbnes.",
        "Træpersienner er en del af sortimentet hos Gardinbus.nu, som laver dem efter mål og tilbyder montering, så lamellerne sidder lige og kører jævnt op og ned.",
      ]},
      { h: "Pleje af træpersienner", p: [
        "Støv lamellerne af jævnligt med en tør klud, en støvekost eller støvsugerens børstemundstykke — med lamellerne lukket.",
        "Undgå at vaske ægte træ med meget vand, da det kan give skjolder eller få træet til at slå sig. En let fugtig klud er nok til pletter.",
      ]},
    ],
    pullQuote: "Brede lameller i træ giver et hyggeligt udtryk og frit udsyn, når de åbnes.",
    faq: [
      { q: "Kan træpersienner tåle fugt?", a: "Ægte træ bør undgås i meget fugtige rum. Vil du have trælook i køkken eller bad, findes fugtbestandige varianter, der ligner træ, men tåler damp." },
      { q: "Hvilken lamelbredde skal jeg vælge til træpersienner?", a: "Bredere lameller giver et markant, roligt udtryk og mere frit udsyn, når de er åbne. Ved et besøg kan du se prøver og få rådgivning om den bredde, der passer til dit vindue." },
      { q: "Hvad er forskellen på træ- og alupersienner?", a: "Træpersienner giver et varmt, naturligt look med brede lameller, mens alupersienner er slanke, fugtbestandige og mere diskrete. Valget afhænger af rum, stil og fugt." },
    ],
    related: {
      text: "Træpersienner tilfører et varmt, naturligt udtryk, som mange foretrækker frem for alu-persienner. Lamelbredde og træsort afgør både prisen og kvaliteten, så det kan betale sig at se prøverne i dit eget lys, før du vælger.",
      links: [
        { slug: "insektnet-til-vinduer-og-doere", label: "Insektnet" },
        { slug: "luxaflex", label: "Luxaflex" },
        { slug: "panelgardiner", label: "Panelgardiner" },
      ],
    },
    ctaNote: "Vil du se træpersienner op ad dit eget vindue? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },
  {
    slug: "insektnet-til-vinduer-og-doere",
    category: "Gardintyper",
    metaTitle: "Insektnet til vinduer og døre: Frisk luft uden insekter",
    h1: "Insektnet til vinduer og døre — luft ud uden insekter",
    tag: "Insektnet",
    supplier: "insektnet",
    desc: "Insektnet til vinduer og døre holder myg, fluer og hvepse ude. Læs om rullenet, plissénet og skydedørsløsninger — og hvordan du vælger rigtigt.",
    intro: [
      "Frisk luft er en af de bedste veje til et godt indeklima — men åbne vinduer og døre inviterer også insekter indenfor. Insektnet lader dig lufte ud hele sommeren uden myg, fluer og hvepse i hjemmet.",
      "Her får du overblik over de forskellige typer insektnet til vinduer og døre, og hvad du skal vælge imellem.",
    ],
    sections: [
      { h: "Typer af insektnet", p: [
        "Til vinduer er diskrete rullenet et populært valg — nettet er næsten usynligt og skærmer for insekter uden at tage meget lys eller udsyn. Rullenettet trækkes for, når du har brug for det, og pakkes væk i en kassette resten af tiden. Faste rammer er et alternativ til vinduer, hvor nettet kan sidde hele sæsonen.",
        "Til døre og terrassedøre findes rullenet, plissénet og skydedørsløsninger, der glider til side, så du nemt kan gå ud og ind. Gardinbus.nu tilbyder insektnet til både vinduer og døre som rullegardin, plissé og skydedør.",
      ]},
      { h: "Bedre indeklima og komfort", p: [
        "Med insektnet kan du holde vinduerne åbne længere og lufte grundigt ud — det hjælper med at få fugt ud og forbedrer luftkvaliteten indenfor, uden at du behøver bekymre dig om insekter.",
        "Det er en lille, diskret løsning, der gør en stor forskel i hverdagen — særligt i soveværelset, køkkenet og ved terrassedøren.",
      ]},
      { h: "Montering og opmåling", p: [
        "Insektnet tilpasses det enkelte vindue eller den enkelte dør, så det slutter tæt og holder insekterne ude. Den rette løsning afhænger af, om åbningen bruges ofte, og om den skal kunne pakkes væk.",
        "Ved et besøg måler konsulenten op, og leverandøren tilbyder montering, så nettet sidder præcist og er nemt at betjene i dagligdagen.",
      ]},
      { h: "Sådan vælger du den rigtige type", p: [
        "Vindue, der åbnes af og til: rullenet, der kan trækkes for efter behov og ellers er skjult.",
        "Dør, du går igennem mange gange om dagen: plissénet eller skydedørsløsning, der er let at åbne og lukke.",
        "Tag stilling til farven på kassette og ramme, så nettet matcher karm og vinduesramme.",
      ]},
    ],
    pullQuote: "Frisk luft uden gæster: insektnet holder myg og fluer ude, mens du lufter ud.",
    faq: [
      { q: "Kan man se insektnettet, når det sidder på?", a: "Moderne insektnet er lavet af et fint, næsten usynligt net, der kun tager minimalt lys og udsyn. Rullenet kan desuden pakkes helt væk i en kassette, når du ikke bruger det." },
      { q: "Findes der insektnet til terrassedøre?", a: "Ja. Til døre og terrassedøre findes rullenet, plissénet og skydedørsløsninger, der glider til side, så du let kan gå ud og ind, mens insekterne holdes ude." },
      { q: "Kan insektnet tilpasses alle vinduer?", a: "Insektnet laves efter mål til det enkelte vindue eller den enkelte dør. Ved opmålingen vurderer konsulenten, hvilken løsning der passer og slutter tæt." },
    ],
    related: {
      text: "Insektnet er et prisvenligt supplement til dine gardiner, der lader dig lufte ud hele sommeren uden myg og fluer i hjemmet. Løsningerne spænder fra enkle rullenet til mere robuste løsninger i god kvalitet, som holder i mange sæsoner.",
      links: [
        { slug: "luxaflex", label: "Luxaflex" },
        { slug: "panelgardiner", label: "Panelgardiner" },
        { slug: "screengardiner", label: "Screengardiner" },
      ],
    },
    ctaNote: "Vil du have insektnet målt op til dine vinduer og døre? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med opmåling og tilbud.",
  },
  {
    slug: "luxaflex",
    category: "Gardintyper",
    metaTitle: "Luxaflex: Premium gardiner og PowerView-styring",
    h1: "Luxaflex — premium gardiner og smart styring",
    tag: "Luxaflex",
    supplier: "luxaflex",
    desc: "Luxaflex er et kendt gardinmærke i den høje ende med bl.a. plissé, persienner og PowerView-motorstyring. Læs om produkter, fordele og pris.",
    intro: [
      "Luxaflex er et af de mest kendte gardinmærker og står for gennemtænkt design og holdbare materialer. Mærket er et oplagt valg, når du vil have en løsning i den høje ende.",
      "Her ser vi på, hvad der kendetegner Luxaflex, og hvorfor mærket er et populært valg til både lysstyring, isolering og smart home.",
    ],
    sections: [
      { h: "Kvalitet og unikke produkter", p: [
        "Luxaflex har et bredt program — fra plissé og persienner til rullegardiner og de kendte Duette-honeycomb-gardiner, hvis cellestruktur kan hjælpe med at isolere vinduet. Materialer og mekanik er i den høje ende og bygget til at holde.",
        "Programmet dækker stort set alle vinduestyper, så du kan få et ensartet, gennemført udtryk i hele boligen med produkter fra samme mærke.",
      ]},
      { h: "PowerView — smart styring", p: [
        "Med Luxaflex PowerView bliver gardinerne motoriserede og kan styres med fjernbetjening, app eller tidsplaner. Du kan lade gardinerne åbne blidt om morgenen og lukke ved solnedgang — helt automatisk.",
        "Den automatiske styring giver komfort, kan hjælpe med at holde varmen ude på de varmeste timer og får hjemmet til at se beboet ud, når du er væk. Er PowerView interessant for dig, så spørg konsulenten, om det kan leveres til dine vinduer.",
      ]},
      { h: "Rådgivning, opmåling og montering", p: [
        "Luxaflex-løsninger vælges ud fra vinduet, lysforholdene og dine ønsker til komfort og isolering. Gardinbus.nu har Luxaflex i sortimentet, og ved et gratis besøg kan du få rådgivning om, hvilke produkter der passer til dit hjem.",
        "Konsulenten måler op, og leverandøren tilbyder montering — spørg ved booking, hvilke vilkår der gælder.",
      ]},
      { h: "Fordele og ulemper ved Luxaflex", p: [
        "Fordele: gennemtænkt mekanik, holdbare materialer, et bredt program til næsten alle vinduestyper og mulighed for smart styring.",
        "Ulemper: prisen ligger typisk over almindelige gardiner, og motorløsninger kræver strøm eller batterier samt lidt opsætning.",
      ]},
    ],
    pullQuote: "Gennemtænkt design og holdbare materialer — det er kernen i Luxaflex.",
    faq: [
      { q: "Hvad er Luxaflex?", a: "Luxaflex er et kendt gardinmærke med et bredt program af plissé, persienner, rullegardiner og isolerende Duette-honeycomb-gardiner samt PowerView-motorstyring." },
      { q: "Hvad er Luxaflex PowerView?", a: "PowerView er Luxaflex' system til motoriserede gardiner. Du styrer gardinerne med fjernbetjening, app eller tidsplaner, så de kan åbne og lukke automatisk." },
      { q: "Er Luxaflex dyrere end almindelige gardiner?", a: "Luxaflex ligger i den højere ende på kvalitet og pris, men mange vælger mærket for holdbarheden og de smarte løsninger. Prisen afhænger af produkt og vinduernes størrelse, og du kan få et uforpligtende tilbud ved et gratis besøg fra Gardinbus.nu." },
    ],
    related: {
      text: "Luxaflex er et oplagt valg for dig, der vil have gardiner i den høje ende — med produkter som Duette-honeycomb og PowerView-motorstyring. Det er ikke de billigste gardiner på markedet, men til gengæld kendt for holdbarhed.",
      links: [
        { slug: "panelgardiner", label: "Panelgardiner" },
        { slug: "screengardiner", label: "Screengardiner" },
        { slug: "gardiner", label: "Gardiner" },
      ],
    },
    ctaNote: "Vil du se Luxaflex-løsninger i dit eget hjem? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },
  {
    slug: "panelgardiner",
    category: "Gardintyper",
    metaTitle: "Panelgardiner: guide til store vinduer og skydedøre",
    h1: "Panelgardiner — enkel afskærmning til store vinduer og skydedøre",
    tag: "Panelgardiner",
    supplier: "produkter",
    desc: "Panelgardiner glider til side på en skinne og passer til brede vinduer og skydedøre. Læs om stof, antal paneler, skinne og typiske fejl før du vælger.",
    intro: [
      "Har du et bredt vinduesparti, en altandør eller en skydedør, kan panelgardiner være en enkel løsning. De lige stofbaner glider til side på en skinne og giver et roligt, minimalistisk udtryk uden folder.",
      "I denne guide gennemgår vi, hvad panelgardiner er, hvornår de er det rigtige valg, hvad du skal overveje ved stof og skinne — og hvilke fejl du med fordel kan undgå.",
    ],
    sections: [
      { h: "Hvad er panelgardiner?", p: [
        "Panelgardiner er lige, stive stofbaner, der hænger fra en skinne foroven og glider vandret til side, ligesom paneler i en skydedørsløsning. Hvert panel kan trækkes helt fra eller overlappe de andre for at dæmpe lyset.",
        "Løsningen er særligt velegnet til brede vinduer, hvor traditionelle gardiner kan blive tunge og uoverskuelige at betjene i hverdagen.",
      ]},
      { h: "Hvornår er panelgardiner det rigtige valg?", p: [
        "Panelgardiner fungerer godt foran skydedøre og altandøre, hvor de skal kunne åbnes og lukkes ofte uden at være i vejen. De er også et populært valg til store vinduespartier i stuer og kontorer, hvor du ønsker et enkelt og nutidigt udtryk.",
        "Da panelerne glider til side i stedet for at blive trukket op, kræver de sjældent meget plads i højden, hvilket gør dem praktiske under skunk eller lavtsiddende lofter.",
      ]},
      { h: "Stof og udtryk", p: [
        "Panelgardiner findes typisk i transparente, halvtransparente og mørklægningsstoffer, alt efter om du ønsker lysfiltrering, privatliv eller fuld mørklægning. Farver og teksturer kan matches til resten af boligens indretning.",
        "Fordi panelerne hænger lige, opstår der ikke folder som ved traditionelle gardiner — det giver et rent og ordentligt look, der passer til det moderne hjem.",
      ]},
      { h: "Montering", p: [
        "Panelgardiner monteres på en specialskinne med flere spor, der tilpasses vinduets eller dørens bredde. Skinnen kan sidde i loft eller på væg, og antallet af paneler afhænger af, hvor bredt partiet er, og hvor meget panelerne skal overlappe.",
        "Præcis opmåling er afgørende, så skinne og paneler passer til vindue eller dør, og betjeningen bliver let. Panelgardiner er ikke en del af de produkttyper, Gardinbus.nu oplyser på sin side — spørg derfor konsulenten ved et besøg, om løsningen kan leveres, eller om fx lamelgardiner eller almindelige gardiner på skinne dækker samme behov.",
      ]},
      { h: "Typiske fejl ved panelgardiner", p: [
        "For få paneler: Er der for få spor eller paneler, kan de ikke stables tæt nok, og en del af vinduet forbliver dækket, når gardinet er trukket fra. Tjek, hvor stor en stakkebredde du kan acceptere ved siden af vinduet.",
        "Forkert stoftæthed: Et let, transparent stof giver ikke privatliv om aftenen. Overvej, om rummet primært skal have lysfiltrering, indkigsbeskyttelse eller mørklægning.",
        "Skinnen sidder for lavt: Monteres skinnen for tæt på karmen, kan panelerne ramme dørhåndtag eller vindueskarm. Lidt ekstra højde og bredde giver et pænere fald og bedre betjening.",
      ]},
    ],
    pullQuote: "Lige stofbaner, der glider til side på en skinne — et roligt, minimalistisk udtryk.",
    faq: [
      { q: "Hvad er panelgardiner?", a: "Panelgardiner består af lige, hængende stofbaner, der glider til side på en skinne. De egner sig især til store vinduespartier, altandøre og skydedøre, hvor traditionelle gardiner kan blive tunge at betjene." },
      { q: "Hvor mange paneler skal jeg bruge?", a: "Antallet afhænger af vinduets bredde, hvor meget panelerne skal overlappe, og hvor meget plads de må fylde, når de er trukket fra. Få et konkret bud ved opmålingen, så bredder og antal passer til netop dit vindue." },
      { q: "Kan panelgardiner motoriseres?", a: "Motoriserede skinner findes generelt til panelgardiner og kan være praktiske ved meget brede partier. Om løsningen kan leveres, må du afklare med konsulenten ved besøget." },
    ],
    related: {
      text: "Panelgardiner er en enkel løsning til brede vinduespartier og skydedøre, hvor traditionelle gardiner kan blive tunge at betjene. De lige stofbaner giver et roligt, nutidigt udtryk uden folder.",
      links: [
        { slug: "screengardiner", label: "Screengardiner" },
        { slug: "gardiner", label: "Gardiner" },
        { slug: "rullegardiner", label: "Rullegardiner" },
      ],
    },
    ctaNote: "Overvejer du panelgardiner til dit vinduesparti eller din skydedør? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor du kan spørge konsulenten, hvilke løsninger der kan leveres.",
  },
  {
    slug: "screengardiner",
    category: "Gardintyper",
    metaTitle: "Screengardiner: solafskærmning der bevarer udsigten",
    h1: "Screengardiner — solafskærmning der bevarer udsigten",
    tag: "Screengardiner",
    supplier: "produkter",
    desc: "Screengardiner filtrerer sollys og dæmper blænding, uden at du mister udsigten. Læs om åbenhedsgrad, stoffarve og placering, før du vælger løsning.",
    intro: [
      "Vil du dæmpe sol og varme uden at lukke helt for udsigten, er screengardiner et godt bud. Det gennemsigtige, vævede stof filtrerer lyset i stedet for at blokere det helt.",
      "I denne guide forklarer vi, hvordan screengardiner fungerer, hvad åbenhedsgrad og stoffarve betyder, og hvordan du vælger den rigtige løsning til dine vinduer.",
    ],
    sections: [
      { h: "Hvad er en screengardin?", p: [
        "Screengardiner er rullegardiner i et fintvævet, gennemsigtigt stof. I stedet for at lukke helt af for lyset, filtrerer stoffet solens stråler og dæmper blænding, mens du stadig kan se ud gennem vinduet.",
        "Løsningen er populær i stuer, kontorer og vinduespartier med meget sol, hvor du gerne vil beholde dagslyset og udsigten året rundt.",
      ]},
      { h: "Åbenhedsgrad og vævning", p: [
        "Stoffets åbenhedsgrad afgør, hvor meget lys og udsyn der slipper igennem. En lav åbenhedsgrad giver mere skygge, privatliv og varmeafvisning, mens en høj åbenhedsgrad bevarer mest udsigt og dagslys.",
        "Vælg vævning ud fra vinduets orientering, hvor meget sol det får, og om du prioriterer udsigt eller afskærmning højest. Et sydvendt vindue har typisk brug for en tættere vævning end et nordvendt.",
      ]},
      { h: "Stoffarve: lys eller mørk?", p: [
        "Farven på screen-stoffet påvirker både udsyn og varme. Mørke stoffer giver som regel det klareste udsyn og mindst blænding, fordi de absorberer lyset, mens lyse stoffer reflekterer mere af solens varme, men kan virke mere slørede at kigge igennem.",
        "Vælg derfor efter, hvad der betyder mest i rummet: udsigt og skærmarbejde taler for mørkere nuancer, mens varmeafvisning taler for lysere.",
      ]},
      { h: "Solafskærmning og varme", p: [
        "Screengardiner reflekterer og absorberer en del af solens varme, inden den når ind i rummet. Det kan mærkes på varme sommerdage, hvor stuen ellers ville blive hurtigt opvarmet.",
        "Kombineret med den rigtige placering kan screengardiner reducere behovet for at trække gardinerne helt for, når solen står på.",
      ]},
      { h: "Montering og styring", p: [
        "Screengardiner monteres som almindelige rullegardiner, i karm eller på væg/loft, og kan tilpasses de fleste vinduestyper. Generelt findes de også med motor, så de kan styres med fjernbetjening, app eller tidsplan.",
        "Screengardiner står ikke som en særskilt produkttype i leverandørens oplyste sortiment, men rullegardiner og solafskærmning gør. Spørg konsulenten ved et besøg fra Gardinbus.nu, om et screen-stof kan leveres til dine vinduer.",
      ]},
    ],
    pullQuote: "Det gennemsigtige, vævede stof filtrerer lyset — du beholder udsigten, mens solen dæmpes.",
    faq: [
      { q: "Hvad er en screengardin?", a: "En screengardin er en rullegardin i et gennemsigtigt, vævet stof, der filtrerer sollys og dæmper varme, uden at du mister udsigten helt ud gennem vinduet." },
      { q: "Hvad betyder åbenhedsgraden i stoffet?", a: "Åbenhedsgraden angiver, hvor meget lys og udsyn stoffet slipper igennem. En lav åbenhedsgrad giver mere skygge og privatliv, mens en høj åbenhedsgrad bevarer mere udsigt og dagslys." },
      { q: "Kan screengardiner motoriseres?", a: "Screengardiner findes generelt med motor, så de kan styres med fjernbetjening, app eller tidsplan. Om en motoriseret løsning kan leveres, bør du afklare med konsulenten." },
    ],
    related: {
      text: "Screengardiner er et smart alternativ, hvis du vil dæmpe sol og varme uden at gå på kompromis med udsigten. Vævningens åbenhedsgrad afgør både pris og funktion, fra lette varianter til tætte solafskærmningsstoffer.",
      links: [
        { slug: "gardiner", label: "Gardiner" },
        { slug: "rullegardiner", label: "Rullegardiner" },
        { slug: "persienner", label: "Persienner" },
      ],
    },
    ctaNote: "Vil du dæmpe solen uden at miste udsigten? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling — spørg konsulenten om screen-stoffer.",
  },
  {
    slug: "solfilm-til-vinduer",
    category: "Solfilm & solafskærmning",
    metaTitle: "Solfilm til vinduer: hold varmen ude om sommeren",
    h1: "Solfilm til vinduer — hold varmen ude og beskyt mod UV",
    tag: "Solfilm til vinduer",
    supplier: "produkter",
    eyebrow: "Guide · Solfilm",
    desc: "Solfilm reflekterer solens varme og dæmper UV, før det når ind i rummet. Læs om filmtyper, indvendig eller udvendig montering, og hvornår solfilm passer.",
    intro: [
      "Store vinduespartier giver lys og udsigt, men om sommeren kan de også gøre boligen ubehageligt varm. Solfilm til vinduer er et af de mest efterspurgte tiltag mod overophedning — en tynd, næsten usynlig folie, der reflekterer en del af solens varme, før den trænger ind i rummet.",
      "I denne guide ser vi på, hvordan solfilm virker, hvad den kan og ikke kan, og hvornår solfilm er det rigtige valg frem for — eller sammen med — gardiner.",
    ],
    sections: [
      { h: "Sådan reducerer solfilm varmen", p: [
        "Solfilm er belagt med et tyndt, reflekterende lag, der kaster en del af solens infrarøde varmestråling tilbage. Afhængigt af filmtype og montering kan varmeindstrålingen reduceres markant, så rummet holdes køligere på solrige dage.",
        "Det mærkes tydeligst i rum mod syd og vest og bag store glasfacader, hvor solen ellers hurtigt hæver temperaturen. Med solfilm kan du tage toppen af varmen — uden at trække for.",
      ]},
      { h: "Energi og UV-beskyttelse", p: [
        "Når solfilmen holder varmen ude om sommeren, kan behovet for køling falde, og visse film isolerer også en smule om vinteren. Hvor meget det betyder for energiforbruget, afhænger af boligen, vinduerne og filmtypen.",
        "Solfilm blokerer samtidig størstedelen af solens UV-stråler. Det hjælper med at beskytte møbler, gulve, gardiner og kunst mod at falme.",
      ]},
      { h: "Indvendig eller udvendig — og sammen med gardiner", p: [
        "Solfilm kan monteres på rudens inder- eller yderside. Udvendig montering giver som regel den bedste varmeafvisning, fordi solen reflekteres, før den varmer glasset op, mens indvendig film er mere beskyttet og nem at vedligeholde.",
        "Solfilm og gardiner udelukker ikke hinanden. Filmen tager varme og UV om dagen, mens gardiner, plissé eller rullegardiner giver mørklægning, lyddæmpning og hygge. Gardinbus.nu har solfilm i sortimentet, og ved et uforpligtende besøg kan du få rådgivning om den kombination, der passer til dine vinduer.",
      ]},
      { h: "Før du vælger solfilm", p: [
        "Tjek ruden: På visse energiruder og termoruder kan en forkert filmtype give ujævn opvarmning af glasset. Spørg derfor, om filmen er egnet til netop din rudetype.",
        "Overvej udseendet: Nogle film er næsten usynlige, andre har et let spejlende eller tonet udtryk udefra. Det kan have betydning i etagebyggeri eller i bevaringsværdige huse.",
        "Tænk aftenen med: Solfilm giver ikke mørklægning eller privatliv om aftenen, så de fleste kombinerer med gardiner eller persienner.",
      ]},
    ],
    pullQuote: "En tynd, næsten usynlig folie, der reflekterer solens varme, før den trænger ind.",
    faq: [
      { q: "Hvor meget varme kan solfilm holde ude?", a: "Det afhænger af filmtype, vinduets orientering og om filmen sidder ind- eller udvendigt. En god solfilm kan reducere varmeindstrålingen markant, men spørg efter de konkrete egenskaber for den film, du får tilbudt." },
      { q: "Blokerer solfilm også UV-stråler?", a: "Ja. De fleste solfilm blokerer størstedelen af solens UV-stråler, hvilket hjælper med at beskytte møbler, gulve og gardiner mod at falme." },
      { q: "Skal jeg vælge solfilm eller gardiner?", a: "Det er ikke enten-eller. Solfilm tager varme og UV, mens gardiner giver mørklægning, lyd­dæmpning og stemning. Ofte er den bedste løsning en kombination, og du kan bede om rådgivning ved et gratis besøg fra Gardinbus.nu." },
    ],
    related: {
      text: "Solfilm til vinduer er en effektiv måde at dæmpe overophedning på. En tynd, næsten usynlig folie reflekterer en del af solens varme, før den når ind i rummet — og beskytter samtidig møbler og gulve mod UV.",
      links: [
        { slug: "solfilm-eller-gardiner", label: "Solfilm eller gardiner" },
        { slug: "privatlivsfilm-til-vinduer", label: "Privatlivsfilm" },
        { slug: "solfilmsrullegardiner", label: "Solfilmsrullegardiner" },
      ],
    },
    ctaNote: "Vil du dæmpe varmen og skærme for solen? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor en konsulent rådgiver om solfilm og solafskærmning til dine vinduer.",
    ctaLead: "Få styr på solafskærmningen — book et gratis besøg.",
  },
  {
    slug: "solfilm-eller-gardiner",
    category: "Solfilm & solafskærmning",
    metaTitle: "Solfilm eller gardiner? Vælg den rette solafskærmning",
    h1: "Solfilm eller gardiner? Sådan vælger du den rette solafskærmning",
    tag: "Solfilm eller gardiner",
    supplier: "produkter",
    eyebrow: "Guide · Solafskærmning",
    desc: "Solfilm eller gardiner mod varme og sol? Sammenlign varmeafvisning, lys, privatliv og økonomi, og find ud af, hvornår en kombination giver mest mening.",
    intro: [
      "Når solen bager, er det store spørgsmål ofte: skal jeg vælge solfilm eller gardiner? Begge dele skærmer for solen, men de løser opgaven på hver sin måde — og den bedste løsning afhænger af, hvad der generer dig mest: varme, lys, indblik eller blænding.",
      "Her sammenligner vi solfilm og gardiner på de punkter, der betyder mest, så du nemmere kan vælge den rette solafskærmning til dit hjem.",
    ],
    sections: [
      { h: "Varmeafvisning: hvor stopper varmen bedst?", p: [
        "Solfilm er svær at slå på ren varmeafvisning. Den reflekterer solens varmestråler ved selve ruden og kan holde en betydelig del af varmen ude, uden at du behøver trække noget for — udsigten og dagslyset bevares.",
        "Gardiner skærmer også for solen, men et stofgardin, der har absorberet varmen, kan selv blive varmt og afgive den til rummet. Vil du primært bekæmpe overophedning bag store ruder, står solfilm stærkest.",
      ]},
      { h: "Lys, mørklægning og stemning", p: [
        "Her vinder gardinerne. Med gardiner, plissé eller rullegardiner styrer du lyset trinløst — fra luftig dagslysfiltrering til fuld mørklægning i soveværelset. Solfilm sidder derimod fast og giver samme dæmpning hele døgnet.",
        "Gardiner tilføjer også blødhed, farve og lyddæmpning til rummet. Skal vinduet både skærme for sol og bidrage til indretning og hygge, er tekstil det oplagte valg.",
      ]},
      { h: "Privatliv, pris og den kombinerede løsning", p: [
        "Både solfilm og gardiner kan skærme for indblik: spejlende eller mat solfilm gør det svært at kigge ind om dagen, mens gardiner dækker, når de er trukket for. Solfilm er typisk en engangsudgift pr. rude, mens gardiner er en del af indretningen, som mange skifter over tid.",
        "For mange er svaret begge dele: solfilm mod varme og UV kombineret med gardiner til lys, mørklægning og stemning. Gardinbus.nu fører både solfilm og gardiner, så ved et gratis besøg kan konsulenten se på lysindfald og vinduer og foreslå en samlet løsning.",
      ]},
      { h: "Hurtig beslutningshjælp", p: [
        "Vælg solfilm, hvis problemet primært er varme, UV og blænding i dagtimerne, og du vil bevare udsigten.",
        "Vælg gardiner, hvis du har brug for mørklægning, privatliv om aftenen eller et blødere udtryk i rummet.",
        "Vælg begge, hvis du har store syd- eller vestvendte ruder i rum, du også bruger om aftenen — fx stue eller soveværelse.",
      ]},
    ],
    pullQuote: "Den bedste løsning afhænger af, hvad der generer dig mest: varme, lys, indblik eller blænding.",
    faq: [
      { q: "Hvad skærmer bedst mod varme — solfilm eller gardiner?", a: "Solfilm skærmer bedst mod ren varme, fordi den reflekterer solens stråler ved ruden, før de varmer rummet op. Gardiner skygger, men et opvarmet stof kan selv afgive varme til rummet." },
      { q: "Kan jeg både få solfilm og gardiner?", a: "Ja, og det er ofte den bedste løsning. Solfilm tager varme og UV, mens gardiner giver mørklægning, lyddæmpning og stemning. De to supplerer hinanden fint." },
      { q: "Hvad er billigst i længden?", a: "Solfilm er typisk en engangsudgift pr. rude, mens gardiner både er en del af indretningen og kan skiftes over tid. Prisen afhænger af løsning og vinduernes størrelse — et uforpligtende tilbud fra leverandøren giver det konkrete overblik." },
    ],
    related: {
      text: "Solfilm eller gardiner? Begge løsninger skærmer for solen, men på hver sin måde. Solfilm er ofte en vedligeholdelsesfri løsning mod varme, mens gardiner giver dig fleksibel kontrol over lys og privatliv time for time.",
      links: [
        { slug: "privatlivsfilm-til-vinduer", label: "Privatlivsfilm" },
        { slug: "solfilmsrullegardiner", label: "Solfilmsrullegardiner" },
        { slug: "solfilm-mod-falmede-mobler", label: "Solfilm mod falmede møbler" },
      ],
    },
    ctaNote: "I tvivl om solfilm eller gardiner? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor konsulenten ser på dine vinduer og viser prøver.",
    ctaLead: "Usikker på valget? Book et gratis besøg og få rådgivning.",
  },
  {
    slug: "privatlivsfilm-til-vinduer",
    category: "Solfilm & solafskærmning",
    metaTitle: "Privatlivsfilm til vinduer: skærm for indblik, bevar lyset",
    h1: "Privatlivsfilm til vinduer — skærm for indblik uden at miste lyset",
    tag: "Privatlivsfilm",
    supplier: "produkter",
    eyebrow: "Guide · Solfilm",
    desc: "Privatlivsfilm skærmer for indblik, men lader lyset komme ind. Læs om spejlfilm, mat film og frostfilm, og hvordan de virker om dagen og om aftenen.",
    intro: [
      "Bor du ud til en travl vej, tæt på naboen eller i stueetagen, kan følelsen af at være på udstilling gå ud over roen i hjemmet. Privatlivsfilm til vinduer er et populært svar: en folie, der gør det svært at kigge ind, mens du stadig kan nyde lyset indefra.",
      "Her ser vi på de forskellige typer privatlivsfilm, hvordan de virker om dagen og aftenen, og hvornår film eller gardiner giver den bedste skærmning.",
    ],
    sections: [
      { h: "Sådan virker privatlivsfilm", p: [
        "Privatlivsfilm arbejder med lys. Spejlfilm reflekterer dagslyset, så ruden virker som et spejl udefra, mens du kan se ud — praktisk mod indblik på solrige dage. Mat film og frostfilm slører ruden som frostet glas og skærmer hele døgnet, uden at tage alt lyset.",
        "Filmen lader dagslyset trænge ind, så rummet ikke bliver mørkt, som det kan blive bag et trukket gardin. Du får altså både privatliv og et lyst hjem på samme tid.",
      ]},
      { h: "Dag og aften — vær opmærksom på lyset", p: [
        "Spejlfilm virker, når der er mest lys udenfor. Om aftenen, når du tænder lyset indenfor og det er mørkt ude, vendes effekten, og man kan lettere se ind. Derfor kombinerer mange spejlfilm med et gardin, der trækkes for om aftenen.",
        "Mat film og frostfilm skærmer derimod stabilt både dag og nat og er et godt valg til badeværelse, entré og vinduer helt nede ved gaden, hvor du ønsker fast sløring.",
      ]},
      { h: "Hvilken film til hvilket rum?", p: [
        "Badeværelse og toilet: Mat film eller frostfilm, så sløringen holder døgnet rundt.",
        "Stue i stueetagen: Spejlfilm mod indblik om dagen kombineret med gardiner eller plissé til aftenen — eller en mat film kun på den nederste del af ruden, så du bevarer udsigten foroven.",
        "Hoveddør og entré: Frostfilm eller dekorfilm på glaspartier giver privatliv uden at gøre gangen mørk.",
      ]},
      { h: "Film, gardiner — eller begge dele", p: [
        "Privatlivsfilm er en diskret, permanent løsning, der ikke fylder ved vinduet. Gardiner, plissé og lamelgardiner giver til gengæld fleksibilitet: du vælger selv, hvornår du skærmer for indblik, og hvornår du åbner helt op.",
        "Ofte er kombinationen stærkest — film til den daglige sløring og gardiner til aften og mørklægning. Gardinbus.nu har solfilm i sortimentet; spørg konsulenten ved besøget, hvilke typer privatlivsfilm der kan leveres til dine ruder.",
      ]},
    ],
    pullQuote: "En folie, der gør det svært at kigge ind, mens du fortsat nyder lyset indefra.",
    faq: [
      { q: "Kan man se ind gennem privatlivsfilm om aftenen?", a: "Spejlfilm skærmer bedst om dagen. Når det er mørkt ude og du har lys tændt inde, vendes effekten, så man lettere kan se ind — derfor kombineres spejlfilm ofte med et gardin. Mat film og frostfilm skærmer stabilt hele døgnet." },
      { q: "Lukker privatlivsfilm lyset ude?", a: "Nej, det er netop fordelen. Privatlivsfilm lader dagslyset trænge ind, så rummet forbliver lyst, samtidig med at den skærmer for indblik." },
      { q: "Er film eller gardiner bedst til privatliv?", a: "Film giver en permanent, diskret sløring, mens gardiner giver fleksibel skærmning, du selv styrer. Mange vælger begge dele, og du kan få rådgivning om kombinationen ved et gratis besøg fra leverandøren." },
    ],
    related: {
      text: "Privatlivsfilm til vinduer er en enkel løsning, hvis du bor tæt på naboen eller ud til en trafikeret vej. Filmen gør det svært at kigge ind, mens du stadig nyder lyset indefra.",
      links: [
        { slug: "solfilmsrullegardiner", label: "Solfilmsrullegardiner" },
        { slug: "solfilm-mod-falmede-mobler", label: "Solfilm mod falmede møbler" },
        { slug: "solafskaermning-hjemmekontor", label: "Solafskærmning til hjemmekontoret" },
      ],
    },
    ctaNote: "Vil du skærme for indblik uden at lukke lyset ude? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med rådgivning om solfilm, gardiner og solafskærmning.",
    ctaLead: "Skab privatliv ved vinduerne — book et gratis besøg.",
  },
  {
    slug: "solfilmsrullegardiner",
    category: "Solfilm & solafskærmning",
    metaTitle: "Solfilmsrullegardiner: reflekterer varmen, skærmer for sol",
    h1: "Solfilmsrullegardiner — reflekterer varmen og skærmer for solen",
    tag: "Solfilmsrullegardiner",
    supplier: "produkter",
    eyebrow: "Guide · Solafskærmning",
    desc: "Solfilmsrullegardiner kaster en del af solens varme tilbage og dæmper blænding, uden at lukke udsigten helt. Læs om stoftyper, tæthed og placering.",
    intro: [
      "Vil du have solfilmens varmeafvisning kombineret med et gardin, du selv kan trække op og ned? Så er solfilmsrullegardiner et oplagt valg. Stoffet er belagt med et reflekterende lag, der kaster en del af solens varme tilbage — ligesom solfilm — men i et fleksibelt rullegardin.",
      "Her får du overblik over, hvordan solfilmsrullegardiner virker, hvor de gør størst nytte, og hvad du skal vælge imellem.",
    ],
    sections: [
      { h: "Det bedste fra to verdener", p: [
        "Solfilmsrullegardiner forener solfilmens varmeafvisning med rullegardinets fleksibilitet. Den reflekterende bagside kaster en stor del af solens varme og blænding tilbage, så rummet holdes køligere — og du kan trække gardinet op, når solen er væk.",
        "Modsat en fast solfilm bestemmer du selv, hvornår afskærmningen er nede. Det gør solfilmsrullegardiner velegnede til rum, hvor solen kun generer på bestemte tidspunkter af dagen.",
      ]},
      { h: "Skærmvej og screen-stof", p: [
        "Mange solfilmsrullegardiner laves i et screen-stof med en åben vævning. Det dæmper blænding og varme, men bevarer et sløret udsyn, så du stadig kan ane haven eller gaden udenfor — praktisk ved skærmarbejde og i stuer med udsigt.",
        "Til soveværelset findes tættere varianter og mørklæggende versioner, hvis du både vil holde varmen ude om dagen og mørket inde om natten.",
      ]},
      { h: "Hvor gør de størst nytte?", p: [
        "Solfilmsrullegardiner er oplagte til hjemmekontoret, hvor sol i skærmen generer, og til store ruder mod syd og vest, hvor varmen hurtigt bygger op. De er også et fint valg til vinterhaver og udestuer.",
        "Jo tættere gardinet slutter til kanterne, jo bedre virker det, så præcis opmåling betyder meget. Gardinbus.nu leverer rullegardiner efter mål og har solafskærmning i sortimentet — spørg konsulenten ved besøget, hvilke reflekterende stoffer der kan leveres, og få vist prøver.",
      ]},
      { h: "Fordele og ulemper", p: [
        "Fordele: Du styrer selv, hvornår der er afskærmning; gardinet kan trækkes helt op og giver fri udsigt; og det kan kombineres med mørklægning i samme rullegardin eller som et ekstra lag.",
        "Ulemper: Et indvendigt gardin holder ikke varmen lige så effektivt ude som en udvendig løsning, fordi solen allerede er passeret glasset. Og den reflekterende bagside kan give et teknisk udtryk udefra, som ikke passer til alle facader.",
      ]},
    ],
    pullQuote: "Solens varme kastes tilbage af det reflekterende stof — i et rullegardin, du selv styrer.",
    faq: [
      { q: "Hvad er forskellen på solfilm og solfilmsrullegardiner?", a: "Solfilm sidder fast på ruden hele tiden, mens solfilmsrullegardiner har et reflekterende stof i et rullegardin, du selv kan trække op og ned. Du får varmeafvisning kombineret med fleksibilitet." },
      { q: "Kan man se ud gennem et solfilmsrullegardin?", a: "Med et screen-stof bevares et sløret udsyn, så du kan ane omgivelserne, mens blænding og varme dæmpes. Vil du have fuld skærmning, findes tættere og mørklæggende varianter." },
      { q: "Hvor egner solfilmsrullegardiner sig bedst?", a: "De er velegnede til hjemmekontor, store sydvendte ruder, vinterhaver og udestuer, hvor solen giver varme og blænding på bestemte tidspunkter." },
    ],
    related: {
      text: "Solfilmsrullegardiner kombinerer solfilmens varmeafvisning med et fleksibelt rullegardin, du selv kan trække op og ned. Løsningen koster typisk mere end almindelig solfilm, men giver til gengæld større fleksibilitet i hverdagen.",
      links: [
        { slug: "solfilm-mod-falmede-mobler", label: "Solfilm mod falmede møbler" },
        { slug: "solafskaermning-hjemmekontor", label: "Solafskærmning til hjemmekontoret" },
        { slug: "solfilm-til-vinduer", label: "Solfilm til vinduer" },
      ],
    },
    ctaNote: "Vil du have varmeafvisning i et gardin, du selv styrer? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor konsulenten viser prøver og måler op.",
    ctaLead: "Dæmp varme og blænding — book et gratis besøg.",
  },
  {
    slug: "solfilm-mod-falmede-mobler",
    category: "Solfilm & solafskærmning",
    metaTitle: "Solfilm mod falmede møbler og gulve: sådan virker det",
    h1: "Solfilm mod falmede møbler og gulve",
    tag: "Solfilm mod falmede møbler",
    supplier: "produkter",
    eyebrow: "Guide · Solfilm",
    desc: "UV-stråler kan falme møbler, gulve og tæpper. Læs hvorfor det sker, hvordan solfilm dæmper UV-belastningen, og hvilke rum der har mest gavn af den.",
    intro: [
      "Har du lagt mærke til, at sofaen, gulvet eller gardinerne har skiftet farve tættest på vinduet? Det er som regel sollys, der langsomt falmer materialerne — og det kan i høj grad forebygges med solfilm.",
      "Her ser vi på, hvorfor møbler og gulve falmer, hvordan solfilm beskytter indboet, og hvordan du kombinerer den med gardiner.",
    ],
    sections: [
      { h: "Hvorfor falmer møbler og gulve?", p: [
        "UV-stråler og en del af det synlige sollys nedbryder farvepigmenter i stof, træ, gulve og kunstværker over tid. Effekten sker langsomt, men er svær at gøre om, når skaden først er sket.",
        "Særligt sydvendte og vestvendte vinduer med mange solindfaldstimer udsætter møbler og gulve for en stor UV-belastning år efter år.",
      ]},
      { h: "Sådan beskytter solfilm", p: [
        "Solfilm monteres direkte på ruden og blokerer størstedelen af UV-strålerne, samtidig med at en del af varmen og blændingen fra solen reduceres. Mange film er næsten usynlige og påvirker dagslyset i rummet begrænset.",
        "Fordi filmen sidder på selve ruden, beskytter den alt i rummet — møbler, gulve, tæpper og indretning — uden at du skal huske at trække gardiner for hver dag. Bemærk dog, at synligt lys også bidrager til falmning, så solfilm mindsker risikoen, men fjerner den ikke helt.",
      ]},
      { h: "Hvilke rum har mest gavn?", p: [
        "Stuer og spisestuer med store, solrige vinduer er typisk der, hvor falmning ses tydeligst — især på sofaer, spiseborde og trægulve. Også kontorer og rum med kunst eller specielle møbler kan have stor gavn af beskyttelsen.",
        "Prioritér de vinduer, der får mest direkte sol: kig efter mod syd og vest, og læg mærke til, hvor solen rammer gulv og møbler i løbet af dagen.",
      ]},
      { h: "Kombinér med gardiner", p: [
        "Solfilm og gardiner supplerer hinanden godt: filmen giver en konstant grundbeskyttelse, mens gardiner eller persienner kan trækkes for på de mest solrige timer for ekstra skygge og privatliv.",
        "Gardinbus.nu har både solfilm, gardiner og persienner i sortimentet, så du kan få rådgivning om den samlede løsning ved et gratis besøg med opmåling.",
      ]},
    ],
    pullQuote: "UV-stråler nedbryder farvepigmenter langsomt — solfilm blokerer størstedelen af dem.",
    faq: [
      { q: "Kan sollys virkelig falme møbler indendørs?", a: "Ja. UV-stråler og til dels synligt lys nedbryder farvepigmenter i stof, træ og gulve over tid, så de falmer eller skifter nuance — også selvom solen ikke skinner direkte på dem hele dagen." },
      { q: "Hvor meget UV blokerer solfilm?", a: "De fleste solfilm blokerer størstedelen af UV-strålerne, hvilket mindsker falmning af møbler, gulve og tekstiler over tid. Spørg efter de konkrete egenskaber for den film, du overvejer." },
      { q: "Bliver rummet mørkere med solfilm?", a: "Mange solfilm er næsten usynlige og påvirker dagslyset begrænset, mens andre er tonede. Du kan beholde lyset og udsigten og samtidig reducere varme, blænding og UV-belastning." },
    ],
    related: {
      text: "Solfilm er en effektiv forebyggelse mod falmede møbler, gulve og tæpper. Filmen blokerer størstedelen af UV-strålerne og beskytter alt i rummet — ofte billigere end at udskifte falmede møbler senere.",
      links: [
        { slug: "solafskaermning-hjemmekontor", label: "Solafskærmning til hjemmekontoret" },
        { slug: "solfilm-til-vinduer", label: "Solfilm til vinduer" },
        { slug: "solfilm-eller-gardiner", label: "Solfilm eller gardiner" },
      ],
    },
    ctaNote: "Vil du beskytte dine møbler og gulve mod falmning? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med rådgivning om solfilm og opmåling.",
    ctaLead: "Beskyt dine møbler og gulve — book et gratis besøg.",
  },
  {
    slug: "solafskaermning-hjemmekontor",
    category: "Solfilm & solafskærmning",
    metaTitle: "Solafskærmning til hjemmekontoret: undgå blænding og varme",
    h1: "Solafskærmning til hjemmekontoret — undgå blænding og varme",
    tag: "Solafskærmning til hjemmekontoret",
    supplier: "produkter",
    eyebrow: "Guide · Hjemmekontor",
    desc: "Reflekser på skærmen og et overophedet kontor? Læs om solafskærmning til hjemmekontoret — solfilm, persienner og gardiner — og hvordan du kombinerer dem.",
    intro: [
      "Sidder du med generende reflekser på skærmen eller en stue, der bliver alt for varm midt på dagen? Den rigtige solafskærmning gør en stor forskel for både komfort og koncentration, når du arbejder hjemmefra.",
      "Her ser vi på, hvordan blænding og varme påvirker arbejdsdagen, hvilke løsninger der hjælper, og hvordan du placerer skrivebordet smartest i forhold til vinduet.",
    ],
    sections: [
      { h: "Blænding og skærmreflekser", p: [
        "Direkte sollys eller kraftigt dagslys fra et vindue ved siden af eller bag skærmen giver ofte reflekser og blænding, der gør det anstrengende at se skærmen tydeligt. Det kan resultere i, at du sidder skævt eller flytter dig unødigt gennem dagen.",
        "En god solafskærmning dæmper det direkte lys, uden at kontoret bliver mørkt og uinspirerende at arbejde i.",
      ]},
      { h: "Temperatur og koncentration", p: [
        "Et solrigt kontor kan hurtigt blive for varmt, især i sommerhalvåret, hvilket går ud over koncentrationen og gør det ubehageligt at sidde ved skrivebordet i længere tid.",
        "Ved at reducere varmen fra solen kan du holde et mere stabilt og behageligt indeklima i det rum, hvor du arbejder.",
      ]},
      { h: "Løsninger: solfilm, persienner og gardiner", p: [
        "Solfilm på ruden giver en konstant grundbeskyttelse mod varme og UV, uden at du skal huske at justere noget i løbet af dagen. Persienner, lamelgardiner og plissé giver dig mulighed for at finjustere lysindfaldet, alt efter hvor solen står.",
        "Mange vælger en kombination: solfilm som fast beskyttelse og persienner eller gardiner til at styre det direkte lys på de mest solrige timer. Ved et gratis besøg fra Gardinbus.nu kan du se prøver og få rådgivning om, hvad der passer til dit hjemmekontor.",
      ]},
      { h: "Placér skrivebordet rigtigt", p: [
        "Stil gerne skrivebordet, så vinduet er på siden af dig — ikke bag skærmen og ikke bag dig. Lys bagfra giver reflekser i skærmen, og lys forfra giver blænding i øjnene.",
        "Vælg en afskærmning, der kan reguleres i højden eller vinklen, så du kan lukke det direkte sollys ude og stadig beholde dagslyset i rummet. Persienner og plissé, der kan køres oppefra og ned, er praktiske her.",
      ]},
    ],
    pullQuote: "Reflekser på skærmen og en overophedet stue går ud over koncentrationen — det kan afhjælpes.",
    faq: [
      { q: "Hvorfor reflekterer skærmen om dagen?", a: "Direkte sollys eller kraftigt dagslys fra et vindue ved siden af eller bag skærmen skaber blænding og reflekser, som gør det svært at se skærmen tydeligt." },
      { q: "Hvad er bedst til hjemmekontoret — solfilm, gardiner eller persienner?", a: "Det afhænger af behovet. Solfilm giver en konstant grundbeskyttelse mod varme og blænding, mens persienner og gardiner giver dig mulighed for at justere lysindfaldet time for time. Ofte er en kombination den bedste løsning." },
      { q: "Kan solafskærmning gøre kontoret for mørkt?", a: "Ikke hvis løsningen vælges rigtigt. Persienner og plissé kan justeres trinløst, og mange solfilm er næsten usynlige, så du beholder dagslyset uden generende blænding." },
    ],
    related: {
      text: "God solafskærmning til hjemmekontoret behøver ikke koste en formue. Fra solfilm til persienner og gardiner — den rette kombination dæmper blænding og varme, så du kan koncentrere dig om arbejdet.",
      links: [
        { slug: "solfilm-til-vinduer", label: "Solfilm til vinduer" },
        { slug: "solfilm-eller-gardiner", label: "Solfilm eller gardiner" },
        { slug: "privatlivsfilm-til-vinduer", label: "Privatlivsfilm" },
      ],
    },
    ctaNote: "Vil du gøre hjemmekontoret mere behageligt at arbejde i? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor konsulenten viser prøver og måler op.",
    ctaLead: "Gør hjemmekontoret behageligt — book et gratis besøg.",
  },
  {
    slug: "motoriserede-gardiner-smart-home",
    category: "Trends & smart home",
    metaTitle: "Motoriserede gardiner: smart home-styring af lys og varme",
    h1: "Motoriserede gardiner — smart home-styring af lys og varme",
    tag: "Motoriserede gardiner",
    supplier: "luxaflex",
    eyebrow: "Trend · Smart home",
    desc: "Motoriserede gardiner styres med app, tidsplan eller stemme. Læs hvordan de virker, hvad de kræver, og hvornår de giver mening i dit hjem.",
    intro: [
      "Motoriserede gardiner er en af de tydeligste trends inden for boligindretning lige nu. Med et enkelt tryk — eller helt automatisk — styrer du lys, varme og privatliv, og de høje eller svært tilgængelige vinduer bliver pludselig nemme at betjene.",
      "I denne guide ser vi på, hvordan motoriserede gardiner virker, hvad de kan i et smart home, og hvornår de er investeringen værd.",
    ],
    sections: [
      { h: "App, tidsplan og stemmestyring", p: [
        "Motoriserede gardiner betjenes med fjernbetjening, app eller stemme og kan lægges på tidsplaner. Du kan lade gardinerne åbne blidt om morgenen og lukke ved solnedgang — helt automatisk, hver dag.",
        "Systemer som Luxaflex PowerView og lignende løsninger kobler sig på det smarte hjem og kan styre flere gardiner på én gang, så hele boligen følger samme rytme.",
      ]},
      { h: "Lys, varme og energi på autopilot", p: [
        "Med sensorer og tidsstyring kan gardinerne lukke, når solen står højest, og holde varmen ude på de varmeste timer — et fint supplement til solfilm og anden solafskærmning. Om vinteren kan de omvendt lukke om aftenen og holde bedre på varmen.",
        "Den automatiske styring kan bidrage til et mere stabilt indeklima og et lavere energiforbrug, fordi gardinerne reagerer på dagen uden, at du behøver tænke over det. Hvor stor effekten er, afhænger af boligen, vinduerne og gardintypen.",
      ]},
      { h: "Komfort, tryghed og montering", p: [
        "Motoriserede gardiner er oplagte til høje vinduer, ovenlys og store partier, hvor manuel betjening er besværlig. De giver også tryghed: når gardinerne bevæger sig efter en tidsplan, ser hjemmet beboet ud, selv når du er væk.",
        "Løsningerne fås generelt både med ledning og genopladeligt batteri. Gardinbus.nu forhandler Luxaflex; spørg konsulenten ved et gratis og uforpligtende besøg, hvilke motoriserede løsninger der kan leveres til netop dine vinduer.",
      ]},
      { h: "Tjekliste før du vælger motor", p: [
        "Strøm: Er der en stikkontakt eller eltilslutning i nærheden, eller er batteri det mest realistiske?",
        "System: Hvilket smart home-system bruger du i forvejen (Alexa, Google Home, Apple HomeKit), og skal gardinerne kunne kobles på det?",
        "Prioritering: Start gerne med de vinduer, hvor motor giver mest værdi — høje vinduer, ovenlys og store glaspartier — frem for at motorisere hele boligen på én gang.",
      ]},
    ],
    pullQuote: "Med et enkelt tryk — eller helt automatisk — styrer du lys, varme og privatliv.",
    faq: [
      { q: "Hvordan styrer man motoriserede gardiner?", a: "De styres med fjernbetjening, app eller stemme og kan lægges på tidsplaner, så de åbner og lukker automatisk. Flere gardiner kan styres samtidig." },
      { q: "Kræver motoriserede gardiner ledning?", a: "Ikke nødvendigvis. Mange løsninger på markedet fås med genopladeligt batteri, så du undgår at trække strøm frem. Spørg konsulenten ved besøget, hvilke varianter der kan leveres." },
      { q: "Kan motoriserede gardiner spare energi?", a: "De kan bidrage. Med tidsplaner og sensorer kan de lukke for solen på de varmeste timer og holde på varmen om aftenen, hvilket giver et mere stabilt indeklima. Effekten afhænger af bolig og vinduer." },
    ],
    related: {
      text: "Prisen på motoriserede gardiner spænder bredt — fra enkle basismotorer til smart home-løsninger med app- og stemmestyring. Ved et besøg kan du få et uforpligtende tilbud og rådgivning om, hvilket niveau der passer til dit hjem og dit budget.",
      links: [
        { slug: "solcelledrevne-gardiner", label: "Solcelledrevne gardiner" },
        { slug: "gardiner-stemmestyring-smart-home", label: "Gardiner med stemmestyring" },
      ],
    },
    ctaNote: "Vil du styre gardinerne med app og tidsplaner? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor en konsulent viser Luxaflex-løsninger og måler op.",
    ctaLead: "Gør dine gardiner smarte — book et gratis besøg.",
  },
  {
    slug: "solcelledrevne-gardiner",
    category: "Trends & smart home",
    metaTitle: "Solcelledrevne gardiner: motorisering uden stikkontakt",
    h1: "Solcelledrevne gardiner — motorisering uden stikkontakt",
    tag: "Solcelledrevne gardiner",
    supplier: "produkter",
    eyebrow: "Guide · Smart home",
    desc: "Solcelledrevne gardiner oplader sig selv med dagslys og kræver ingen stikkontakt. Læs hvordan de virker, og hvilke vinduer de passer bedst til.",
    intro: [
      "Vil du have motoriserede gardiner uden at trække kabler eller være afhængig af en stikkontakt tæt på vinduet? Solcelledrevne gardiner løser problemet ved at oplade sig selv med dagslys.",
      "Her ser vi på, hvordan teknologien fungerer, hvilke vinduer den passer til, og hvornår den er et godt alternativ til kabelforbundne løsninger.",
    ],
    sections: [
      { h: "Sådan fungerer solcelledrevne gardiner", p: [
        "En lille solcelle er monteret på skinnen eller karmen og oplader et indbygget batteri med dagslys. Batteriet driver motoren, der åbner og lukker gardinet, helt uden at gardinet skal tilsluttes en stikkontakt.",
        "Fordi solcellen kan oplade ved almindeligt dagslys — ikke kun direkte sol — fungerer løsningen i mange vindueplaceringer, også dem der ikke får sol hele dagen.",
      ]},
      { h: "Fordele frem for kabelforbundne løsninger", p: [
        "Den største fordel er, at du slipper for at trække kabler eller placere en stikkontakt tæt på vinduet. Det gør solcelledrevne gardiner særligt praktiske ved ovenlysvinduer, høje vinduer og steder, hvor eltilslutning er besværlig eller dyr.",
        "Det gør også løsningen enklere at eftermontere i eksisterende boliger, uden at der skal laves om på el-installationen.",
      ]},
      { h: "Egnede vinduer og placeringer", p: [
        "Solcelledrevne gardiner er velegnede til mange vinduer, men fungerer bedst, hvor solcellen får en rimelig mængde dagslys — for eksempel ovenlys, altandøre og standardvinduer uden tung skygge fra bygninger eller træer hele dagen.",
        "Ved nordvendte vinduer eller vinduer i dyb skygge kan en kabelforbundet motor eller et genopladeligt batteri være et mere sikkert valg. Solcelledrevne gardiner er ikke et fast produkt i leverandørens sortiment, så spørg konsulenten, om løsningen kan leveres til dine vinduer.",
      ]},
      { h: "Drift og vedligeholdelse", p: [
        "Batteriet er som regel dimensioneret til at holde gardinet kørende i længere perioder, men i de mørkeste måneder kan opladningen være mindre. Ud over det kræver løsningen typisk kun, at solcellen holdes ren for støv og snavs.",
        "Mange løsninger kan tilsluttes en app eller et smart home-system, så du styrer gardinerne med fjernbetjening, tidsplan eller stemme — ligesom kabelforbundne motoriserede gardiner.",
      ]},
    ],
    pullQuote: "En lille solcelle oplader batteriet med dagslys — helt uden stikkontakt.",
    faq: [
      { q: "Hvordan fungerer solcelledrevne gardiner?", a: "En lille solcelle sidder på skinnen eller karmen og oplader et indbygget batteri med dagslys. Batteriet driver motoren, så gardinet kan styres uden at være tilsluttet en stikkontakt." },
      { q: "Kræver de meget sol for at fungere?", a: "Nej, moderne solceller kan også oplade ved almindeligt dagslys. I meget skyggefulde vinduer og i de mørkeste måneder kan opladningen dog være begrænset, så placeringen har betydning." },
      { q: "Kan solcelledrevne gardiner styres med app eller tidsplan?", a: "Mange løsninger kan tilsluttes en app eller et smart home-system, så du kan styre gardinerne med fjernbetjening, tidsplan eller stemme, ligesom kabelforbundne motoriserede gardiner." },
      { q: "Kan jeg få solcelledrevne gardiner via Gardinbus.nu?", a: "Solcelledrevne gardiner er ikke bekræftet som et særskilt produkt hos leverandøren. Spørg konsulenten ved besøget, om en solcelledrevet eller anden motoriseret løsning kan leveres." },
    ],
    related: {
      text: "Solcelledrevne gardiner er en smart mellemvej: du får motorisering uden eltrækning, og løsningen kan være enklere at eftermontere end kabelforbundne systemer. Batteriet oplader sig selv med almindeligt dagslys.",
      links: [
        { slug: "gardiner-stemmestyring-smart-home", label: "Gardiner med stemmestyring" },
        { slug: "motoriserede-gardiner-smart-home", label: "Motoriserede gardiner" },
      ],
    },
    ctaNote: "Overvejer du motoriserede gardiner uden stikkontakt? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor du kan spørge konsulenten, hvilke løsninger der kan leveres.",
  },
  {
    slug: "gardiner-stemmestyring-smart-home",
    category: "Trends & smart home",
    metaTitle: "Gardiner med stemmestyring: Alexa og Google Home",
    h1: "Gardiner med stemmestyring — sådan kommer du i gang",
    tag: "Gardiner med stemmestyring",
    supplier: "luxaflex",
    eyebrow: "Guide · Smart home",
    desc: "Styr gardinerne med stemmen via Alexa, Google Home eller HomeKit. Læs hvordan stemmestyring virker, og hvad du skal bruge for at komme i gang.",
    intro: [
      "Har du hænderne fulde af madlavning eller børn, kan det være praktisk bare at sige \"luk gardinerne i stuen\" i stedet for at finde en fjernbetjening. Stemmestyrede gardiner gør netop det muligt.",
      "Her ser vi på, hvordan stemmestyring fungerer, hvilke systemer der typisk understøttes, og hvad du skal bruge for at komme i gang.",
    ],
    sections: [
      { h: "Sådan fungerer stemmestyring", p: [
        "Motoriserede gardiner forbindes til et smart home-system, typisk via en hub eller en app, der herefter kobles sammen med en stemmeassistent. Når forbindelsen er sat op, kan du åbne, lukke eller justere gardinerne ved at give en simpel stemmekommando.",
        "Du kan navngive gardinerne efter rum eller funktion, så det er nemt at huske kommandoerne — for eksempel \"luk gardinerne i soveværelset\" eller \"åbn stuegardinerne\".",
      ]},
      { h: "Alexa, Google Home og andre systemer", p: [
        "Mange motoriserede gardiner på markedet understøtter Amazon Alexa og Google Home, og en del fungerer også med Apple HomeKit eller andre populære systemer. Det gør det muligt at bygge videre på det smart home-setup, du allerede har.",
        "Tjek altid, at motor og hub matcher det system, du ønsker at bruge. Gardinbus.nu forhandler Luxaflex, men stemmestyring er ikke bekræftet som et særskilt produkt — spørg konsulenten, om løsningen kan leveres og spiller sammen med dit system.",
      ]},
      { h: "Kombinér med tidsplaner og sensorer", p: [
        "Stemmestyring er praktisk til de spontane justeringer, men mange vælger også at sætte faste tidsplaner op, så gardinerne åbner om morgenen og lukker om aftenen af sig selv. Nogle løsninger kan desuden reagere på sollys eller temperatur.",
        "På den måde får du det bedste fra begge verdener: automatik i hverdagen og stemmestyring, når du har brug for at ændre noget her og nu.",
      ]},
      { h: "Det skal du have styr på", p: [
        "Motoriserede gardiner: Stemmestyring kræver, at gardinet har en motor — et manuelt gardin kan ikke styres med stemmen alene.",
        "Hub eller bro: Mange systemer kræver en hub, der forbinder gardinerne med dit wifi og din stemmeassistent.",
        "Stabilt netværk: Sørg for god wifi-dækning i de rum, hvor gardinerne og hubben skal sidde.",
      ]},
    ],
    pullQuote: "“Luk gardinerne i stuen” — og det er gjort, uden at røre en fjernbetjening.",
    faq: [
      { q: "Hvordan fungerer stemmestyring af gardiner?", a: "Motoriserede gardiner forbindes til et smart home-system som Alexa eller Google Home via en hub eller en app. Herefter kan du åbne, lukke eller justere gardinerne ved at give en stemmekommando til din højttaler eller telefon." },
      { q: "Skal jeg have Alexa eller Google Home for at bruge stemmestyring?", a: "Du skal have en stemmeassistent, og mange motoriserede gardiner understøtter Alexa, Google Home og lignende systemer. Spørg konsulenten, hvilken løsning der kan leveres og passer til det system, du har." },
      { q: "Kan stemmestyring kombineres med tidsplaner?", a: "Ja, du kan sagtens bruge stemmestyring til enkeltstående justeringer og samtidig have faste tidsplaner eller sensorer, der styrer gardinerne automatisk resten af dagen." },
    ],
    related: {
      text: "Stemmestyring kobles typisk på et motoriseret gardin, du allerede har eller overvejer. Mange løsninger fungerer med Alexa, Google Home og lignende systemer, så du kan styre gardinerne uden at røre en fjernbetjening.",
      links: [
        { slug: "motoriserede-gardiner-smart-home", label: "Motoriserede gardiner" },
        { slug: "solcelledrevne-gardiner", label: "Solcelledrevne gardiner" },
      ],
    },
    ctaNote: "Vil du høre, om stemmestyrede gardiner kan leveres til dit hjem? Gardinbus.nu tilbyder et gratis besøg, hvor konsulenten viser Luxaflex-løsninger og måler op.",
    ctaLead: "Gør dine gardiner smarte — book et gratis besøg.",
  },
  {
    slug: "moerklaegningsgardiner-efteraar",
    category: "Efterår – guides & fordele",
    metaTitle: "Mørklægningsgardiner til de mørke efterårsaftener",
    h1: "Mørklægningsgardiner — ro og mørke i efterårets aftener",
    tag: "Mørklægningsgardiner",
    supplier: "gardiner",
    eyebrow: "Guide · Efterår",
    desc: "Mørklægningsgardiner lukker gadelys ude og dæmper træk om efteråret. Læs om fuld mørklægning vs. dimout, stofvalg og korrekt montering.",
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
        "En præcis opmåling er afgørende. Gardinbus.nu tilbyder et gratis besøg, hvor en konsulent måler op, så gardinet kan laves efter mål; montering kan også aftales med leverandøren.",
      ]},
      { h: "Typiske fejl ved mørklægning", p: [
        "For smalt gardin: Slutter gardinet lige ved karmen, siver lyset ind i siderne. Læg gerne nogle centimeter til på hver side.",
        "Lys foroven: En åben stang lader lys slippe ind over gardinet — en skinne eller en kappe tæt på loftet lukker bedre.",
        "Forkert rum til dimout: Dimout er hyggeligt i stuen, men giver sjældent det mørke, der skal til i et soveværelse.",
      ]},
    ],
    pullQuote: "Mørklægningsgardiner giver dig kontrol over lyset — uanset hvad klokken er udenfor.",
    faq: [
      { q: "Lukker mørklægningsgardiner alt lys ude?", a: "Fuldt mørklæggende stoffer lukker næsten alt lys ude, når gardinet dækker vinduet helt og er monteret ud over karmen. Ellers kan der sive lidt lys ind i siderne." },
      { q: "Hjælper mørklægningsgardiner på varmen?", a: "Ja, tætte mørklægningsstoffer lægger et ekstra lag ved ruden, der dæmper træk og hjælper med at holde på varmen om efteråret og vinteren." },
      { q: "Kan mørklægning fås som rullegardin og plissé?", a: "Mørklægning findes både som gardiner, rullegardiner og plisségardiner. Ved et besøg kan du få rådgivning om, hvilken løsning der passer bedst til dit vindue." },
    ],
    related: {
      text: "Mørklægningsgardiner er en af de mest populære løsninger mod gadelys og tidligt mørke om efteråret. Vælger du et tykkere stof i god kvalitet, får du samtidig bedre isolering og mindre træk fra vinduet.",
      links: [
        { slug: "hold-paa-varmen-med-gardiner", label: "Hold på varmen" },
        { slug: "termogardiner-spar-paa-varmen", label: "Termogardiner" },
        { slug: "gardiner-sovevaerelse-efteraar", label: "Soveværelse om efteråret" },
      ],
    },
    ctaNote: "Vil du se mørklægningsstoffer i dit eget vindue? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
  },
  {
    slug: "hold-paa-varmen-med-gardiner",
    category: "Efterår – guides & fordele",
    metaTitle: "Hold på varmen med gardiner om efteråret",
    h1: "Hold på varmen — gardiner der mindsker varmetabet",
    tag: "Hold på varmen",
    supplier: "gardiner",
    eyebrow: "Guide · Efterår",
    desc: "Gardiner kan mindske varmetab og kuldenedfald ved vinduerne. Læs hvordan tætte stoffer, foer og det rigtige ophæng holder bedre på varmen.",
    intro: [
      "En betydelig del af varmen i boligen kan forsvinde gennem vinduerne. Når efterårskulden sætter ind, kan de rigtige gardiner gøre en mærkbar forskel for komforten — og bidrage til en lavere varmeregning.",
      "I denne guide gennemgår vi, hvordan gardiner mindsker varmetab, hvilke stoffer der virker bedst, og hvordan ophænget afgør, om du reelt holder på varmen.",
    ],
    sections: [
      { h: "Sådan mister vinduerne varme", p: [
        "Ved et koldt vindue afkøles luften og synker ned langs ruden — det er den kuldenedfald, du mærker som træk ved fødderne. Et tæt gardin foran vinduet fanger den kolde luft og skaber et isolerende luftlag mellem stof og rude.",
        "Effekten er størst, når gardinet slutter tæt foroven og går helt til gulv, så den kolde luft ikke kan cirkulere frit ud i rummet.",
      ]},
      { h: "Vælg tætte, fyldige stoffer", p: [
        "Tunge, tætvævede stoffer isolerer bedre end lette. Et gardin med foer — eller et decideret termofoer — lægger et ekstra lag, der bremser varmetabet.",
        "Jo fyldigere faldet er, desto flere isolerende luftlommer, så vær ikke sparsom med stofmængden.",
      ]},
      { h: "Ophæng der lukker tæt", p: [
        "For at holde på varmen skal gardinet dække vinduet helt og gerne overlappe karmen i siderne. En skinne med tæt afslutning foroven forhindrer, at den varme luft slipper op bag gardinet.",
        "Husk, at gardinet ikke må dække radiatoren under vinduet — så sender du varmen op bag stoffet i stedet for ud i rummet. Ved et besøg fra Gardinbus.nu kan du få rådgivning om stof og ophæng, før gardinerne laves efter mål.",
      ]},
      { h: "Små vaner, der gør en forskel", p: [
        "Træk gardinerne for, når det bliver mørkt, og åbn dem igen om dagen, så solens varme kan komme ind.",
        "Kombinér et rullegardin eller en plissé inde ved ruden med et tungt gardin udenpå for et ekstra isolerende lag.",
        "Luft kort og effektivt ud i stedet for at lade et vindue stå på klem i timevis.",
      ]},
    ],
    pullQuote: "De rigtige gardiner kan gøre en mærkbar forskel — både for komforten og for varmeregningen.",
    faq: [
      { q: "Kan gardiner virkelig spare på varmen?", a: "Tætte, gulvlange gardiner skaber et isolerende luftlag ved ruden, der mindsker kuldenedfald og varmetab — særligt ved ældre vinduer. Hvor meget det betyder for regningen, afhænger af boligen." },
      { q: "Hjælper det at fore gardinerne?", a: "Et foer eller termofoer lægger et ekstra isolerende lag og forbedrer både varmeholdelse og mørklægning uden at ændre gardinets forside." },
      { q: "Skal gardinet nå helt til gulv?", a: "For bedst isolering bør gardinet gå helt til gulv og slutte tæt foroven, så den kolde luft fra ruden ikke cirkulerer ud i rummet. Undgå dog at dække radiatoren." },
    ],
    related: {
      text: "En betydelig del af boligens varmetab kan ske gennem vinduerne, og de rigtige gardiner kan gøre en mærkbar forskel. Selv enkle gardiner i tætte stoffer hjælper, men vil du optimere isoleringen, er gardiner i god kvalitet med foer et godt valg.",
      links: [
        { slug: "termogardiner-spar-paa-varmen", label: "Termogardiner" },
        { slug: "gardiner-sovevaerelse-efteraar", label: "Soveværelse om efteråret" },
        { slug: "gardiner-mod-traek-og-kulde", label: "Træk og kulde" },
      ],
    },
    ctaNote: "Vil du se tætte, fyldige stoffer i dit eget hjem? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor konsulenten viser prøver og måler op.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
  },
  {
    slug: "termogardiner-spar-paa-varmen",
    category: "Efterår – guides & fordele",
    metaTitle: "Termogardiner: hold på varmen i den kolde tid",
    h1: "Termogardiner — komfort og mindre varmetab i den kolde tid",
    tag: "Termogardiner",
    supplier: "gardiner",
    eyebrow: "Guide · Efterår",
    desc: "Termogardiner har et isolerende foer, der mindsker træk og varmetab ved vinduet. Læs hvordan de virker, og hvor de gør størst gavn i boligen.",
    intro: [
      "Termogardiner er gardiner med et særligt isolerende foer, der bremser varmetabet gennem vinduet. I efterårs- og vintermånederne kan det give bedre komfort og bidrage til et lavere varmeforbrug.",
      "Vi ser her på, hvordan termogardiner virker, hvilke fordele de giver, og hvornår de giver mest mening.",
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
        "Termogardiner er ikke bekræftet som et særskilt produkt hos Gardinbus.nu, men leverandøren laver gardiner efter mål. Spørg konsulenten ved besøget, om et termofoer eller et tilsvarende tæt foer kan leveres til dine gardiner.",
      ]},
      { h: "Fordele og ulemper", p: [
        "Fordele: mindre kuldenedfald og træk, ofte indbygget mørklægning og en lunere fornemmelse i rummet.",
        "Ulemper: tungere stof og mindre lysindfald, når gardinet er trukket for, og en højere pris end et let, ufóret gardin.",
        "Alternativ: Et almindeligt gardin med tæt foer kan give en del af samme effekt, hvis et egentligt termogardin ikke er muligt.",
      ]},
    ],
    pullQuote: "Et isolerende foer bremser varmetabet — bedre komfort i den kolde tid.",
    faq: [
      { q: "Hvad er forskellen på termogardiner og almindelige gardiner?", a: "Termogardiner har et isolerende foer i flere lag, der bremser varmetab og kuldenedfald ved ruden. Almindelige gardiner isolerer mindre og er mest til pynt og lyskontrol." },
      { q: "Kan termogardiner betale sig?", a: "De giver mest ved ældre vinduer og kolde rum, hvor de kan mindske varmetabet mærkbart. Ved nye vinduer er gevinsten mindre, men komforten stiger. Den reelle besparelse afhænger af boligen." },
      { q: "Mørklægger termogardiner også?", a: "Mange termogardiner mørklægger samtidig, så du får både isolering og lyskontrol. Spørg konsulenten ved besøget, hvilke foer- og stofkombinationer der kan leveres." },
    ],
    related: {
      text: "Termogardiner har et isolerende foer, der bremser varmetabet gennem vinduet mere end et let, ufóret gardin. De koster typisk lidt mere, men kan være en god investering i kolde rum og ved ældre vinduer.",
      links: [
        { slug: "gardiner-sovevaerelse-efteraar", label: "Soveværelse om efteråret" },
        { slug: "gardiner-mod-traek-og-kulde", label: "Træk og kulde" },
        { slug: "gardiner-fugt-kondens-efteraar", label: "Gardiner og fugt om efteråret" },
      ],
    },
    ctaNote: "Vil du høre om tætte, isolerende gardiner til dine vinduer? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
  },
  {
    slug: "gardiner-sovevaerelse-efteraar",
    category: "Efterår – guides & fordele",
    metaTitle: "Gardiner i soveværelset om efteråret – bedre søvn",
    h1: "Soveværelset om efteråret — gardiner til bedre søvn",
    tag: "Soveværelse om efteråret",
    supplier: "gardiner",
    eyebrow: "Guide · Efterår",
    desc: "De rigtige gardiner giver mørke, ro og et lunt soveværelse om efteråret. Læs om mørklægning, stofvalg og ophæng, der lukker lyset ude.",
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
        "Gardinbus.nu tilbyder et gratis besøg, hvor konsulenten tager prøver med og måler op, så du kan vælge stof og mørklægningsgrad i dit eget soveværelse.",
      ]},
      { h: "Tjekliste til soveværelset", p: [
        "Hvor mørkt skal der være? Fuld mørklægning til lette sovere og skiftende arbejdstider, dimout hvis du foretrækker at vågne med lidt lys.",
        "Lag på lag: Et mørklægningsrullegardin eller en plissé ved ruden kombineret med et stofgardin giver både mørke og en blød stemning.",
        "Ventilation: Lad der være lidt luft mellem gardin og rude, så fugt fra nattens vejrtrækning ikke samler sig på glasset.",
      ]},
    ],
    pullQuote: "Gardiner, der lukker lyset ude og holder på varmen — så du sover trygt og godt.",
    faq: [
      { q: "Hvilke gardiner er bedst i soveværelset om efteråret?", a: "Tætte, mørklæggende gardiner i afdæmpede farver giver ro og mørke, holder på varmen og dæmper lyd — ideelt til søvn i den mørke tid." },
      { q: "Kan jeg stadig få morgenlys ind?", a: "Ja. Kombinér mørklægning med et let gardin, så du kan lukke blidt morgenlys ind uden at give afkald på fuld mørklægning om natten." },
      { q: "Dæmper gardiner også lyd?", a: "Fyldige, tætte stoffer dæmper lyd fra gaden og gør soveværelset roligere — en fordel især i byen og ved trafikerede veje." },
    ],
    related: {
      text: "Soveværelset har brug for gardiner, der både lukker lyset ude og holder på varmen om efteråret. Mørklægningsgardiner i god kvalitet er ofte det bedste valg, men selv et billigere alternativ kan gøre en mærkbar forskel for søvnen.",
      links: [
        { slug: "gardiner-mod-traek-og-kulde", label: "Træk og kulde" },
        { slug: "gardiner-fugt-kondens-efteraar", label: "Gardiner og fugt om efteråret" },
        { slug: "moerklaegningsgardiner-efteraar", label: "Mørklægningsgardiner" },
      ],
    },
    ctaNote: "Vil du se mørklæggende stoffer i dit eget soveværelse? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
  },
  {
    slug: "gardiner-mod-traek-og-kulde",
    category: "Efterår – guides & fordele",
    metaTitle: "Gardiner mod træk og kulde ved vinduerne",
    h1: "Gardiner mod træk — luk kulden ude i efteråret",
    tag: "Træk og kulde",
    supplier: "gardiner",
    eyebrow: "Guide · Efterår",
    desc: "Mærker du træk fra vinduerne om efteråret? Læs hvorfor kuldenedfald opstår, og hvordan tætte gardiner og det rigtige ophæng mindsker trækken.",
    intro: [
      "Kold luft langs vinduerne er en klassisk efterårsgene — særligt i ældre boliger. Det rette gardin kan mindske trækken mærkbart og gøre rummet både lunere og mere behageligt at opholde sig i.",
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
        "Ved et gratis besøg fra Gardinbus.nu kan du få dine vinduer målt op og rådgivning om, hvilken gardinløsning der bedst holder kulden ude.",
      ]},
      { h: "Gardin eller tætningsliste?", p: [
        "Mærker du en egentlig luftstrøm ved karmen, når det blæser, er vinduet utæt — så hjælper nye tætningslister eller en tømrer mere end et gardin.",
        "Mærker du kun kulde ved fødderne på stille dage, er det typisk kuldenedfald, og her er tætte gardiner en enkel og effektiv løsning.",
      ]},
    ],
    pullQuote: "Det rette gardin kan mindske trækken mærkbart og gøre rummet lunere at opholde sig i.",
    faq: [
      { q: "Kan gardiner fjerne træk fra vinduet?", a: "Gardiner fjerner ikke utætheder i selve vinduet, men tætte, gulvlange gardiner kan mindske kuldenedfald og den træk, du mærker ved fødderne, mærkbart." },
      { q: "Hjælper det med flere lag?", a: "Ja. Et rullegardin eller en plissé inde ved ruden kombineret med et tungt gardin udenpå giver flere isolerende lag mod kulden." },
      { q: "Hvilket ophæng er bedst mod træk?", a: "En skinne, der slutter tæt foroven, holder bedre på varmen end en åben stang, fordi den varme luft ikke kan stige op bag gardinet." },
    ],
    related: {
      text: "Træk fra vinduerne er en klassisk efterårsgene, særligt i ældre boliger. Tætte gardiner i god kvalitet, monteret helt ud til karmen, kan mindske trækken mærkbart — ofte en billigere løsning end at udskifte selve vinduerne.",
      links: [
        { slug: "gardiner-fugt-kondens-efteraar", label: "Gardiner og fugt om efteråret" },
        { slug: "moerklaegningsgardiner-efteraar", label: "Mørklægningsgardiner" },
        { slug: "hold-paa-varmen-med-gardiner", label: "Hold på varmen" },
      ],
    },
    ctaNote: "Vil du lukke kulden ude ved vinduerne? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor en konsulent viser prøver og måler op.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg.",
  },
  {
    slug: "gardiner-fugt-kondens-efteraar",
    category: "Efterår – guides & fordele",
    metaTitle: "Gardiner og fugt om efteråret: undgå kondens og skimmel",
    h1: "Gardiner og fugt om efteråret — undgå kondens og skimmel",
    tag: "Gardiner og fugt om efteråret",
    supplier: "produkter",
    eyebrow: "Guide · Efterår",
    desc: "Kolde ruder og høj luftfugtighed giver kondens og skimmel om efteråret. Læs hvordan du vælger og bruger gardiner, så fugten kan slippe væk.",
    intro: [
      "Dugget rude om morgenen eller en anelse skimmellugt fra vindueskarmen? Det er et klassisk efterårsproblem, når varm indeluft møder kolde ruder. Med den rigtige brug af gardiner kan du mindske problemet.",
      "Her ser vi på, hvorfor kondens opstår, og hvordan du undgår, at gardinerne forværrer fugtproblemer.",
    ],
    sections: [
      { h: "Hvorfor opstår kondens om efteråret?", p: [
        "Når varm, fugtig luft fra rummet møder en kold rude, kondenserer fugten til vanddråber på glasset og karmen. Om efteråret bliver temperaturforskellen mellem inde og ude større, hvilket øger risikoen for kondens.",
        "Ubehandlet kondens kan over tid give råd i trærammer og skimmelvækst i og omkring vindueskarmen, især hvis fugten ikke får lov at tørre ud igen.",
      ]},
      { h: "Gardiners rolle for luftcirkulation", p: [
        "Tætte gardiner, der hænger helt ind til en kold rude uden plads til luft imellem, kan i nogle tilfælde forværre kondensproblemet, fordi den fugtige luft ikke cirkulerer og tørrer ud som den skal.",
        "Ved at sikre lidt afstand mellem gardin og rude — og lufte jævnligt ud — får fugten bedre mulighed for at forsvinde, i stedet for at samle sig på glasset og karmen.",
      ]},
      { h: "Sådan undgår du skimmel", p: [
        "Luft kort og effektivt ud et par gange dagligt, og undgå at gardinerne blokerer helt for luftstrømmen ved vinduet. Tjek jævnligt karm og glasliste for fugt, især i soveværelser og badeværelser, hvor luftfugtigheden ofte er højere.",
        "I særligt fugtige rum kan det være en fordel at vælge gardintyper, der er nemme at lufte ud eller tørre af, frem for tunge stoffer, der holder på fugten.",
      ]},
      { h: "Valg af materiale og montering", p: [
        "I køkken og badeværelse er persienner og rullegardiner ofte et godt valg, da de er nemme at rengøre og ikke suger fugt til sig som tekstiler kan. I stuer og soveværelser handler det mere om at sikre korrekt montering og lidt luft til vinduet.",
        "Gardinbus.nu tilbyder et gratis besøg med prøver og opmåling, hvor du kan bede om rådgivning om materiale og montering til netop dine rum.",
      ]},
    ],
    pullQuote: "Tætte gardiner uden luftcirkulation kan forværre kondens — den rette afstand gør forskellen.",
    faq: [
      { q: "Hvorfor opstår der kondens på vinduerne om efteråret?", a: "Når varm, fugtig luft fra rummet møder en kold rude, kondenserer fugten til vanddråber. Det sker oftere om efteråret, når temperaturforskellen mellem inde og ude bliver større." },
      { q: "Kan gardiner give mere kondens på vinduerne?", a: "Tætte gardiner, der hænger helt ind til en kold rude uden luftcirkulation, kan i nogle tilfælde forværre kondens. Med lidt afstand og regelmæssig udluftning mindsker du problemet." },
      { q: "Hvilket gardinmateriale er bedst i fugtige rum?", a: "I fugtige rum som badeværelse og køkken er det en fordel at vælge stoffer, der tåler fugt godt, eller løsninger som persienner og rullegardiner, der er nemme at tørre af og lufte ud." },
    ],
    related: {
      text: "Fugt og kondens på vinduerne er et klassisk efterårsproblem, når varm indeluft møder kolde ruder. Den rigtige afstand mellem gardin og rude, kombineret med et materiale der tåler fugt, mindsker risikoen for skimmel.",
      links: [
        { slug: "moerklaegningsgardiner-efteraar", label: "Mørklægningsgardiner" },
        { slug: "hold-paa-varmen-med-gardiner", label: "Hold på varmen" },
        { slug: "termogardiner-spar-paa-varmen", label: "Termogardiner" },
      ],
    },
    ctaNote: "Vil du have rådgivning om gardiner til fugtige rum? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor konsulenten viser prøver på persienner og rullegardiner.",
    ctaLead: "Få rådgivning om gardiner til fugtige rum — book et gratis besøg.",
  },
  {
    slug: "gardiner-om-efteraaret-hygge",
    category: "Efterår – inspiration",
    metaTitle: "Gardiner om efteråret: sådan skaber du hygge og lune",
    h1: "Gardiner om efteråret — hygge, lune og bløde rammer",
    tag: "Efterårshygge",
    supplier: "book",
    eyebrow: "Inspiration · Efterår",
    desc: "Skab efterårshygge med de rigtige gardiner: bløde stoffer, varme farver, højt ophæng og lag af lys, der gør hjemmet klar til den mørke tid.",
    intro: [
      "Når mørket falder tidligere på, og regnen trommer mod ruden, bliver hjemmet vores fristed. Gardiner er en af de hurtigste og hyggeligste måder at gøre boligen efterårsklar på — de blødgør lyset, dæmper trækken og pakker rummet ind i lune rammer.",
      "I denne guide gennemgår vi, hvordan du med stof, farve, fald og ophæng skaber ægte efterårshygge — og gør stuen til et sted, du helst ikke vil forlade, når kulden sætter ind.",
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
      { h: "Typiske fejl, der stjæler hyggen", p: [
        { list: [
          "For lidt stof: et stramt, fladt gardin virker koldt — giv det fylde nok til bløde folder.",
          "For kort længde: gardiner, der slutter midt på væggen, får loftet til at virke lavere.",
          "Kun ét tykt lag: uden et let lag bliver dagene mørke, når du vil skærme for indkig.",
          "Stearinlys for tæt på stoffet: hold altid god afstand mellem levende lys og gardiner.",
        ] },
      ]},
    ],
    pullQuote: "Gardiner blødgør lyset, dæmper trækken og pakker rummet ind i lune rammer.",
    faq: [
      { q: "Hvilke gardiner giver mest hygge om efteråret?", a: "Fyldige gardiner i bløde, matte stoffer som bomuld, hør eller velour i varme jordfarver giver den lune, indbydende stemning, de fleste forbinder med efterårshygge." },
      { q: "Hvor højt skal gardinerne hænge?", a: "Hæng stangen eller skinnen tæt på loftet og lad gardinet nå gulvet. Det får rummet til at virke højere og giver et blødt, sammenhængende udtryk." },
      { q: "Kan jeg få hjælp til at vælge stof og farve?", a: "Ja. Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor en konsulent viser stof- og farveprøver hjemme hos dig og måler vinduerne op. Her kan du også få rådgivning om ophæng." },
    ],
    related: {
      text: "Gardiner er en af de hurtigste måder at gøre boligen efterårsklar på. Bløde, varme stoffer i god kvalitet dæmper både lys og lyd og pakker rummet ind i lune rammer, når mørket falder tidligere på.",
      links: [
        { slug: "efteraarsfarver-gardiner-inspiration", label: "Efterårsfarver" },
        { slug: "efteraarsklar-stue-gardiner", label: "Efterårsklar stue" },
        { slug: "nye-gardiner-til-efteraaret", label: "Nye gardiner til efteråret" },
      ],
    },
    ctaNote: "Vil du gøre dine vinduer efterårsklar? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med stofprøver og opmåling.",
    ctaLead: "Gør vinduerne efterårsklar — book et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "efteraarsfarver-gardiner-inspiration",
    category: "Efterår – inspiration",
    metaTitle: "Efterårsfarver til gardiner — inspiration til paletten",
    h1: "Efterårsfarver til gardiner — sæt paletten sammen",
    tag: "Efterårsfarver",
    supplier: "gardiner",
    eyebrow: "Inspiration · Efterår",
    desc: "Find efterårets smukkeste gardinfarver: rustrød, karrygul, oliven og varm sand. Inspiration til en palette, der gør hjemmet lunt uden at blive tungt.",
    intro: [
      "Efterårets farver er lige uden for vinduet: rustrøde blade, karrygule marker, dybgrøn skov og varm, gylden eftermiddagssol. De samme toner klæder gardinerne og trækker naturens stemning med indenfor.",
      "Her får du inspiration til at sammensætte en efterårspalette, der gør hjemmet lunt og indbydende — uden at det bliver mørkt eller tungt — og gode råd til at teste farverne, før du vælger.",
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
        "Farver ser forskellige ud i dit eget lys. Ved et besøg fra Gardinbus.nu medbringer konsulenten stofprøver, så du kan holde farverne op mod netop dine vinduer.",
      ]},
      { h: "Tjekliste: test farven, før du vælger", p: [
        { list: [
          "Se prøven ved vinduet både om formiddagen og i aftenlys med lamperne tændt.",
          "Hold prøven op mod gulv, sofa og vægfarve — ikke kun mod en hvid baggrund.",
          "Vær opmærksom på, at stærkt sollys over tid kan blege mættede farver; spørg til stoffets lysægthed.",
        ] },
      ]},
    ],
    pullQuote: "Rustrøde blade, karrygule marker og varm eftermiddagssol — de samme toner klæder gardinerne.",
    faq: [
      { q: "Hvilke farver er efterårets favoritter?", a: "Varme jordfarver som rustrød, terrakotta, karrygul og sand samt dybe grønne toner som oliven og skovgrøn er klassiske efterårsfarver til gardiner." },
      { q: "Gør mørke gardiner rummet mindre?", a: "Ikke nødvendigvis. Hænges de højt og bredt og kombineres med lyse vægge, kan mørkere gardiner tværtimod give rummet dybde og en lun stemning." },
      { q: "Kan jeg se farveprøver hjemme?", a: "Ja. Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor konsulenten medbringer prøver på stoffer og farver, så du kan vurdere dem i dit eget lys." },
    ],
    related: {
      text: "Efterårets farver — rustrød, karrygul, oliven og varm sand — klæder gardinerne og trækker naturens stemning indenfor. Du behøver ikke skifte alle gardiner ud; selv et enkelt sæt i en varm efterårsfarve kan løfte hele rummets stemning.",
      links: [
        { slug: "efteraarsklar-stue-gardiner", label: "Efterårsklar stue" },
        { slug: "naturmaterialer-gardiner-efteraarstrends", label: "Efterårets gardintrends" },
        { slug: "lagdelte-gardiner-efteraar", label: "Lagdelte gardiner" },
      ],
    },
    ctaNote: "Vil du se efterårsfarverne i dit eget lys? Gardinbus.nu tilbyder et gratis besøg, hvor konsulenten viser farveprøver og måler op.",
    ctaLead: "Se farverne hjemme — book et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "efteraarsklar-stue-gardiner",
    category: "Efterår – inspiration",
    metaTitle: "Efterårsklar stue: gardiner der skaber stemning",
    h1: "Gør stuen efterårsklar med de rigtige gardiner",
    tag: "Efterårsklar stue",
    supplier: "book",
    eyebrow: "Inspiration · Efterår",
    desc: "Gør stuen efterårsklar med gardiner, der skaber stemning og lune rammer. Inspiration til stof, farve og lag — uden at du skal møblere om.",
    intro: [
      "Stuen er efterårets samlingspunkt: her drikkes te, læses bøger og ses film, mens regnen står ned udenfor. Med de rigtige gardiner forvandler du rummet til en lun ramme om alt det gode ved årstiden.",
      "Få inspiration til, hvordan du med stof, farve og et par lag gardiner giver stuen den rette efterårsstemning — uden en større ommøblering.",
    ],
    sections: [
      { h: "Skab dybde med tekstur og fald", p: [
        "Fyldige gardiner i taktile stoffer som hør, bomuld eller velour tilfører rummet dybde og en indbydende blødhed. Et generøst fald langs væggen får stuen til at føles færdig og gennemtænkt.",
        "Hæng gardinet højt og bredt, så det rammer mere væg end selve vinduet — det løfter rummet og får loftet til at virke højere.",
      ]},
      { h: "Farver der trækker efteråret indenfor", p: [
        "Varme jordfarver, dæmpet grøn og bløde sandtoner spiller op mod efterårets lys og skaber en rolig, lun base. Hold farven i familie med puder og plaider, så stuen hænger sammen.",
        "En enkelt dybere accentfarve — bordeaux eller mørkegrøn — kan give rummet karakter uden at det bliver tungt.",
      ]},
      { h: "Lag lys for hyggelige aftener", p: [
        "Kombinér et let gardin, der filtrerer det svage dagslys, med et tungere lag til aftenen. Så kan du trække for, tænde lamperne og lukke den mørke aften ude, når hyggen skal frem.",
        "Er du i tvivl om kombinationen, kan du bede om rådgivning om lag og ophæng ved et gratis besøg fra Gardinbus.nu, hvor konsulenten også måler vinduerne op.",
      ]},
      { h: "Tjekliste før du vælger gardiner til stuen", p: [
        { list: [
          "Hvor meget indkig er der fra vej eller naboer om aftenen?",
          "Står tv eller skærm, så sollyset genererer om eftermiddagen?",
          "Sidder radiatoren under vinduet? Så kan gulvlange gardiner hindre varmen i at cirkulere.",
          "Mål højden fra loft til gulv, så du kender den mulige gardinlængde.",
        ] },
      ]},
    ],
    pullQuote: "Med de rigtige gardiner forvandler du stuen til en lun ramme om efteråret.",
    faq: [
      { q: "Hvordan gør jeg hurtigt stuen efterårsklar?", a: "Skift til fyldige gardiner i varme, taktile stoffer og hæng dem højt og bredt. Det ændrer stemningen markant uden at du behøver møblere om." },
      { q: "Skal gardinerne matche puder og plaider?", a: "Hold farverne i samme familie, så rummet hænger sammen. Gardinet kan enten tone i tone med tekstilerne eller danne en blød kontrast til væggene." },
      { q: "Kan jeg kombinere flere gardintyper i stuen?", a: "Ja. Et let gardin til dagslys plus et tungere lag til aften giver fuld kontrol over stemningen. Ved et gratis og uforpligtende besøg fra Gardinbus.nu kan du få rådgivning om kombinationen." },
    ],
    related: {
      text: "Stuen er efterårets samlingspunkt, og de rigtige gardiner forvandler rummet til en lun ramme om årstiden. Kombinér et lysfiltrerende stof med et tættere, varmere lag for både stemning og funktion — også på et fornuftigt budget.",
      links: [
        { slug: "naturmaterialer-gardiner-efteraarstrends", label: "Efterårets gardintrends" },
        { slug: "lagdelte-gardiner-efteraar", label: "Lagdelte gardiner" },
        { slug: "gardiner-om-efteraaret-hygge", label: "Efterårshygge" },
      ],
    },
    ctaNote: "Vil du gøre stuen efterårsklar? Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor en konsulent viser prøver og måler op.",
    ctaLead: "Gør stuen efterårsklar — book et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "naturmaterialer-gardiner-efteraarstrends",
    category: "Efterår – inspiration",
    metaTitle: "Efterårets gardintrends: naturmaterialer og tekstur",
    h1: "Efterårets gardintrends — natur, tekstur og ro",
    tag: "Efterårets gardintrends",
    supplier: "gardiner",
    eyebrow: "Inspiration · Efterår",
    desc: "Hør, bomuld og naturlige teksturer er efterårets gardintrends. Få inspiration til materialer, farver og udtryk samt fordele og ulemper ved hvert stof.",
    intro: [
      "Efterårets indretning trækker på naturen: rå teksturer, naturlige fibre og afdæmpede farver, der giver ro. De samme tendenser sætter tonen for årets gardiner.",
      "Her får du overblik over efterårets gardintrends — fra hør og bomuld til de teksturer og toner, der gør hjemmet varmt og nærværende — og hvad du skal vide om materialerne i hverdagen.",
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
        "Vil du følge tendensen, så vælg ét naturmateriale og lad farven tone diskret i tråd med gulv og møbler. Ved et besøg fra Gardinbus.nu kan du mærke stofprøverne selv, før du vælger.",
      ]},
      { h: "Fordele og ulemper ved naturmaterialer", p: [
        { list: [
          "Hør: smukt, tungt fald og naturlig struktur — men krøller let, og ren hør kan krympe ved vask.",
          "Bomuld: blødt, alsidigt og nemt at vedligeholde — men kan falme i stærkt, direkte sollys.",
          "Blandinger med syntetiske fibre: ofte mere formstabile og nemmere at vaske, med et lignende naturligt udtryk.",
        ] },
        "Tjek altid vaskeanvisningen og spørg, om stoffet er egnet til et solrigt vindue.",
      ]},
    ],
    pullQuote: "Rå teksturer og naturlige fibre giver ro — og sætter tonen for årets gardintrends.",
    faq: [
      { q: "Hvilke materialer er trend i efterårets gardiner?", a: "Naturlige fibre som hør og bomuld står stærkt, ofte i vævede teksturer og afdæmpede, naturnære farver som sand, ler og oliven." },
      { q: "Er mønstrede gardiner ude?", a: "Ikke helt, men tendensen går mod tekstur og struktur frem for kraftige mønstre. Det giver et roligt, tidløst udtryk, der er let at leve med." },
      { q: "Hvordan mærker jeg forskel på stofferne?", a: "Det bedste er at se og føle dem i dit eget hjem. Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor konsulenten medbringer stofprøver, så du kan sammenligne teksturer i dit eget lys." },
    ],
    related: {
      text: "Efterårets indretningstrends trækker på naturen: rå teksturer, naturlige fibre som hør og bomuld, og afdæmpede farver, der giver ro. De samme tendenser sætter tonen for årets gardiner, fra prisvenlige bomuldskvaliteter til tungere hørstoffer i god kvalitet.",
      links: [
        { slug: "lagdelte-gardiner-efteraar", label: "Lagdelte gardiner" },
        { slug: "gardiner-om-efteraaret-hygge", label: "Efterårshygge" },
        { slug: "gardinmode-trends-2026", label: "Gardinmode 2026" },
      ],
    },
    ctaNote: "Vil du mærke hør og bomuld i dit eget vindue? Gardinbus.nu tilbyder et gratis besøg med stofprøver og opmåling.",
    ctaLead: "Mærk stofferne hjemme — book et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "lagdelte-gardiner-efteraar",
    category: "Efterår – inspiration",
    metaTitle: "Lagdelte gardiner: kombinér lys og mørklægning",
    h1: "Lagdelte gardiner — fuld kontrol over efterårets lys",
    tag: "Lagdelte gardiner",
    supplier: "produkter",
    eyebrow: "Inspiration · Efterår",
    desc: "Lagdelte gardiner kombinerer let lysfiltrering med mørklægning — ideelt til efterårets skiftende lys. Se kombinationer, der virker, og få råd om ophæng.",
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
        "Flere lag kan desuden give en let isolerende effekt, fordi luften mellem lagene holder lidt bedre på varmen ved ruden.",
      ]},
      { h: "Sådan sætter du lagene sammen", p: [
        "Vælg et roligt, lyst inderlag og et fyldigere yderlag i en varm efterårsfarve, så lagene spiller sammen. Et dobbelt ophæng — skinne eller stang med to spor — gør det nemt at trække lagene uafhængigt.",
        "Vil du have hjælp til planlægningen, tilbyder Gardinbus.nu et gratis og uforpligtende besøg, hvor konsulenten måler op og kan rådgive om lag og ophæng. Spørg konsulenten, hvilke ophængsløsninger der kan leveres til dit vindue.",
      ]},
      { h: "Typiske fejl ved lagdelte gardiner", p: [
        { list: [
          "Lagene kolliderer: plissé eller rullegardin i lysningen kræver plads nok til, at gardinet udenpå kan trækkes frit.",
          "For ens lag: to lige tunge stoffer giver ingen reel forskel på dag- og aftenstemning.",
          "Glemte vinduesgreb: tjek, at du stadig kan åbne vinduet, når begge lag er monteret.",
        ] },
      ]},
    ],
    pullQuote: "Fra blødt formiddagslys til skarpt gadelys — lagdelte gardiner tilpasser sig hele dagen.",
    faq: [
      { q: "Hvad er fordelen ved lagdelte gardiner?", a: "Du får fuld kontrol over lyset: et let lag filtrerer dagslyset, og et tungere lag mørklægger om aftenen. Samtidig kan flere lag holde lidt bedre på varmen ved ruden." },
      { q: "Hvilke lag passer sammen?", a: "Et transparent hørgardin med et mørklægningsgardin er en klassiker. Et plissé eller rullegardin ved ruden plus et blødt gardin udenpå fungerer også godt." },
      { q: "Kræver det særligt ophæng?", a: "Et dobbelt spor i skinne eller stang gør det muligt at trække lagene uafhængigt. Ved et besøg fra Gardinbus.nu kan du få rådgivning om ophænget og spørge, hvilke løsninger der kan leveres." },
    ],
    related: {
      text: "Lagdelte gardiner, layering, giver dig mulighed for at tilpasse lyset time for time, fra blødt formiddagslys til tidligt mørke om aftenen. Kombinér et let, lysfiltrerende stof med et tættere mørklægningslag i god kvalitet for maksimal fleksibilitet.",
      links: [
        { slug: "gardiner-om-efteraaret-hygge", label: "Efterårshygge" },
        { slug: "efteraarsfarver-gardiner-inspiration", label: "Efterårsfarver" },
        { slug: "efteraarsklar-stue-gardiner", label: "Efterårsklar stue" },
      ],
    },
    ctaNote: "Vil du kombinere plissé, rullegardin og gardiner i samme vindue? Gardinbus.nu tilbyder et gratis besøg med prøver og opmåling.",
    ctaLead: "Planlæg lagene — book et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "billige-gardiner-eller-god-kvalitet",
    category: "Pris & kvalitet",
    metaTitle: "Billige gardiner eller god kvalitet? Sådan vælger du",
    h1: "Billige gardiner eller gardiner i god kvalitet? Sådan vælger du rigtigt",
    tag: "Billige gardiner eller god kvalitet",
    supplier: "faq",
    eyebrow: "Guide · Pris & kvalitet",
    desc: "Billige gardiner eller god kvalitet? Ærligt overblik over hvad der driver prisen, tegn på kvalitet, og hvor det betaler sig at spare — rum for rum.",
    card: { title: "Billige gardiner eller god kvalitet?", desc: "Skal du vælge billige gardiner eller gardiner i god kvalitet? Få et ærligt overblik over prisfaktorer, kvalitetstegn og hvor det giver mening at spare." },
    llmsDesc: "Ærlig guide til billige gardiner vs. gardiner i god kvalitet: hvad der driver prisen, hvordan du genkender kvalitet, hvor det betaler sig at spare, og hvordan du sammenligner tilbud. Henviser til Gardinbus.nu for gratis, uforpligtende besøg med prøver, opmåling og tilbud.",
    intro: [
      "\"Billige gardiner\" og \"gardiner i god kvalitet\" lyder som to modsatrettede søgninger — men de fleste, der leder efter det ene, ender med at spørge sig selv om det andet. Her får du et ærligt, praktisk overblik, så du kan vælge det rigtige til dit hjem og dit budget.",
      "Vi gennemgår, hvad der faktisk driver prisen, hvordan du genkender kvalitet, og hvor det giver mening at spare. Vil du se forskellen med egne øjne, tilbyder leverandøren Gardinbus.nu et gratis og uforpligtende besøg, hvor en konsulent viser prøver og måler op.",
    ],
    sections: [
      { h: "Hvad koster billige gardiner?", p: [
        "Der findes ingen fast kvadratmeterpris på gardiner. Prisen afhænger primært af gardintype, vinduernes størrelse, stofkvalitet, stofmængde og ophæng. De enkleste løsninger er typisk rullegardiner i ensfarvet stof eller plisségardiner, mens fyldige, foerede gardiner til gulv og motoriserede løsninger ligger i den anden ende af skalaen.",
        "Derfor opgiver vi ikke vejledende priser her — de ville hurtigt være misvisende. Hos leverandøren laves gardinerne efter mål, og prisen afhænger af type og vinduernes størrelse. Den sikreste vej til en reel pris er et uforpligtende tilbud på dine konkrete vinduer, så du kan sammenligne med andre muligheder, før du beslutter dig.",
      ]},
      { h: "Hvornår er gardiner \"god kvalitet\"?", p: [
        "Kvalitet handler sjældent kun om prisskiltet. Se efter disse tegn, når du vurderer, om et gardin er i god kvalitet:",
        { list: [
          "Tæt, tungt stof med et pænt, ensartet fald",
          "Syet eller vægtet underkant, så gardinet hænger lige",
          "Solid syning i sømme, folder og kanter",
          "Ophæng og montering tilpasset præcist til vinduet",
          "Jævnt løbende mekanik i rulle- og lamelgardiner",
          "Farveægte stof, der ikke falmer hurtigt i sollys",
        ] },
        "Kendte mærker som Luxaflex er et eksempel på gardiner i den mere eksklusive ende af skalaen med et bredt udvalg af stoffer og betjeningsløsninger. Luxaflex indgår i leverandørens sortiment — spørg konsulenten, hvilke varianter og betjeningsformer der kan leveres til dine vinduer.",
      ]},
      { h: "Er dyre gardiner altid bedre end billige?", p: [
        "Nej. Prisen afspejler ofte stoftæthed, mærke og mekanik — men et billigere stof kan sagtens være det rigtige valg til et rum, du sjældent bruger, mens et lidt dyrere stof giver mere værdi et sted, du opholder dig meget, som stuen eller soveværelset. Det handler om at matche kvaliteten til, hvor meget gardinet skal holde til, og hvor længe du forventer det skal hænge.",
      ]},
      { h: "Hvor kan du spare — og hvor betaler kvalitet sig?", p: [
        { list: [
          "Spar typisk i gæsteværelse, depot og bryggers, hvor gardinet bruges sjældent og udsættes for lidt slid.",
          "Prioritér kvalitet i soveværelset, hvis mørklægning er vigtig — her mærker du forskellen hver nat.",
          "Prioritér kvalitet i sydvendte vinduer, hvor sollys hurtigt kan blege og nedbryde et billigt stof.",
          "Prioritér robust mekanik i børneværelser og vinduer, der betjenes mange gange om dagen.",
        ] },
        "En billig løsning, der skal udskiftes efter kort tid, kan ende med at blive dyrere end et bedre valg fra starten — især hvis du også skal betale for ny montering.",
      ]},
      { h: "Sådan får du det bedste forhold mellem pris og kvalitet", p: [
        "Den mest almindelige fejl er at vælge stof ud fra et billede på en skærm. Farver og strukturer ser helt anderledes ud i dit eget lys, og et stof, der virker billigt på et foto, kan føles helt anderledes i hånden. Det er en af grundene til, at et hjemmebesøg med fysiske prøver giver et bedre beslutningsgrundlag end et billede.",
        "Mange vælger at blande løsninger bevidst: billigere stoffer i rum, der bruges mindre, og lidt højere kvalitet i de rum, hvor gardinerne skal holde til daglig brug og meget dagslys. Ved et besøg fra Gardinbus.nu kan konsulenten måle flere rum op, og du kan bede om et uforpligtende tilbud på hele hjemmet — så kan du selv sammenligne pris og kvalitet, før du vælger.",
        "Når du sammenligner tilbud, så tjek, om montering er med, eller om den koster ekstra. Hos leverandøren gælder gratis montering kun ved bestemte bookingtider, så spørg ind til betingelserne for netop din aftale.",
      ]},
    ],
    pullQuote: "De fleste, der leder efter billige gardiner, ender med at spørge sig selv om kvaliteten.",
    faq: [
      { q: "Hvor finder jeg billige gardiner i Danmark?", a: "Billige standardgardiner fås i mange butikker, men passer ikke altid til dine vinduer. Vil du sammenligne skræddersyede løsninger i forskellige prisklasser, tilbyder Gardinbus.nu et gratis og uforpligtende besøg, hvor du kan se og føle stofferne hjemme og få et tilbud på dine konkrete mål." },
      { q: "Hvad kendetegner gardiner i god kvalitet?", a: "Gardiner i god kvalitet har typisk et tættere, tungere stof med et pænt fald, en syet eller vægtet underkant, solid syning i sømme og folder, samt et ophæng og en montering, der er tilpasset præcist til vinduet. Mekanismer i rulle- og lamelgardiner bør køre jævnt uden at binde." },
      { q: "Er dyre gardiner altid bedre end billige gardiner?", a: "Nej, ikke nødvendigvis. Prisen afspejler ofte stoftæthed, mærke og mekanik, men et billigere stof kan sagtens være det rigtige valg til fx et gæsteværelse, mens et lidt dyrere stof giver mere værdi et sted, du bruger meget, som stuen eller soveværelset." },
      { q: "Kan jeg få et samlet tilbud på flere rum?", a: "Ja, du kan bede om, at konsulenten måler flere rum op ved samme besøg og giver et uforpligtende tilbud. Så kan du blande billigere og dyrere løsninger og se den samlede pris, før du beslutter dig." },
      { q: "Er montering med i prisen?", a: "Det afhænger af aftalen. Leverandøren tilbyder montering, men gratis montering gælder kun ved bestemte bookingtider. Spørg til betingelserne, når du modtager dit tilbud." },
    ],
    related: {
      text: "“Billige gardiner” eller “gardiner i god kvalitet” — de fleste ender med at spørge sig selv om begge dele. Svaret afhænger af rum, brug og budget; læs videre om prisfaktorer og kvalitetstegn, så du kan finde den rette balance.",
      links: [
        { slug: "hvad-koster-gardiner", label: "Hvad koster gardiner?" },
        { slug: "tegn-paa-god-kvalitet-gardiner", label: "7 tegn på god kvalitet" },
      ],
    },
    ctaNote: "Vil du se forskellen på billige gardiner og god kvalitet med egne øjne? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver, opmåling og tilbud.",
    ctaLead: "Sammenlign prisklasser hjemme — book et gratis besøg hos Gardinbus.nu.",
    bookingText: "Du booker via formularen hos Gardinbus.nu, hvorefter leverandøren kontakter dig for at aftale en tid. Besøg, opmåling og tilbud er gratis og uforpligtende.",
  },
  {
    slug: "hvad-koster-gardiner",
    category: "Pris & kvalitet",
    metaTitle: "Hvad koster gardiner? Prisfaktorer forklaret",
    h1: "Hvad koster gardiner? Det styrer prisen",
    tag: "Hvad koster gardiner",
    supplier: "faq",
    eyebrow: "Guide · Pris & kvalitet",
    desc: "Hvad koster gardiner? Se hvad der styrer prisen — stof, mængde, gardintype og ophæng — og hvordan du får et uforpligtende tilbud på dine egne vinduer.",
    card: { title: "Hvad koster gardiner?", desc: "Se hvad der styrer prisen på gardiner — stof, mængde, gardintype og ophæng — og hvordan du får et uforpligtende tilbud på netop dine vinduer." },
    llmsDesc: "Prisguide til gardiner: hvad der styrer prisen (stof, mængde, gardintype, ophæng, montering), hvorfor der sjældent findes faste listepriser, og hvordan man får et uforpligtende tilbud via et gratis besøg fra Gardinbus.nu.",
    intro: [
      "\"Hvad koster gardiner?\" er et af de mest søgte spørgsmål om gardiner — og det ærlige svar er, at det afhænger af flere faktorer. Her får du et overblik over, hvad der styrer prisen, så du ved, hvad du skal kigge efter, uanset hvilken type gardin du overvejer.",
      "Gardiner efter mål har sjældent en fast listepris, fordi prisen afhænger af dine vinduers størrelse og de valg, du træffer undervejs. Den mest retvisende pris får du derfor ved at få dine vinduer målt op og få et konkret tilbud.",
    ],
    sections: [
      { h: "Stof og stoftæthed", p: [
        "Den største prisforskel ligger i selve stoffet. Lette, ensfarvede stoffer i polyester hører til de billigste, mens tunge, mørklæggende stoffer eller stoffer med mønster og struktur koster mere. Foerede gardiner og stoffer med vægtet underkant ligger typisk også højere, fordi der bruges mere materiale og arbejde på hver bane.",
      ]},
      { h: "Mængde af stof", p: [
        "Jo bredere og højere dit vindue er, jo mere stof skal der bruges — og for et fyldigt fald bruges der typisk 1,5–2,5 gange vinduets bredde. Store vinduespartier og gulv-til-loft-løsninger koster derfor naturligt mere end et enkelt, lille vindue.",
      ]},
      { h: "Gardintype", p: [
        "Gardintypen spiller også ind. Et enkelt rullegardin i standardstof er typisk billigere end et fyldigt, foeret foldegardin, mens plisségardiner, lamelgardiner og persienner i træ eller metal ligger forskelligt alt efter materiale, betjening og størrelse. Sammenlign derfor altid samme type og samme vinduesmål, når du vurderer priser.",
      ]},
      { h: "Ophæng: stang, skinne eller motor", p: [
        "En synlig gardinstang er ofte det mest prisvenlige valg, mens en diskret skinne typisk koster lidt mere i materialer. Motoriseret ophæng lægger et ekstra lag oveni for selve motoren og styringen, men kan nøjes med at blive valgt til de vinduer, hvor det giver mest værdi. Er motorstyring interessant, så spørg konsulenten, om det kan leveres til den gardintype, du overvejer.",
      ]},
      { h: "Opmåling og montering", p: [
        "Hos Gardinbus.nu er besøget, opmålingen og tilbuddet gratis og uforpligtende. Montering tilbydes også, men om den er gratis eller koster ekstra, afhænger af leverandørens betingelser — fx kan gratis montering være knyttet til bestemte bookingtider. Tjek derfor, hvad der står om montering i dit tilbud og i leverandørens handelsbetingelser, før du siger ja.",
      ]},
      { h: "Sådan sammenligner du tilbud", p: [
        "Når du har et tilbud i hånden, er det nemmere at vurdere prisen, hvis du ved, hvad du skal kigge efter:",
        { list: [
          "Står det tydeligt, hvilke vinduer, mål og stoffer prisen dækker?",
          "Er ophæng (stang eller skinne) med i prisen, eller er det en separat post?",
          "Hvad står der om montering og eventuel kørsel?",
          "Sammenligner du samme gardintype og samme stofkvalitet på tværs af tilbud?",
        ]},
      ]},
      { h: "Sådan får du den præcise pris", p: [
        "Fordi prisen afhænger af dine konkrete vinduer og dine valg af stof og ophæng, er den bedste måde at få et retvisende tal på at få vinduerne målt op. Ved et gratis besøg fra Gardinbus.nu medbringer konsulenten prøver, måler op og giver dig et uforpligtende tilbud, som du kan tage stilling til i ro og mag.",
      ]},
    ],
    pullQuote: "Prisen på gardiner afhænger af flere faktorer — her er dem, du skal kigge efter.",
    faq: [
      { q: "Hvad er det, der bestemmer prisen på gardiner?", a: "Prisen bestemmes primært af stoftype og -tæthed, hvor meget stof der skal bruges til vinduet, gardintypen, valg af ophæng (stang, skinne eller motor) samt montering. To vinduer i samme størrelse kan derfor koste forskelligt, alt efter stofvalget." },
      { q: "Er motoriserede gardiner meget dyrere?", a: "Ja, motorstyring lægger typisk ekstra oveni prisen for selve stoffet og ophænget, fordi der tilføjes en motor og styring. Du kan ofte nøjes med at motorisere de vinduer, hvor det giver mest værdi. Spørg konsulenten, om motorløsninger kan leveres til den type, du ønsker." },
      { q: "Koster det ekstra at få gardinerne målt op og monteret?", a: "Opmåling ved besøget fra Gardinbus.nu er gratis og uforpligtende. Montering tilbydes også, men om den koster ekstra afhænger af leverandørens betingelser og fremgår af tilbuddet og handelsbetingelserne." },
      { q: "Kan jeg få en præcis pris uden at bestille noget?", a: "Ja. Ved et gratis og uforpligtende besøg måler konsulenten dine vinduer op og viser prøver på de stoffer, du er interesseret i. Derefter får du et tilbud, som du selv bestemmer, om du vil tage imod." },
    ],
    related: {
      text: "“Hvad koster gardiner?” er et af de mest søgte spørgsmål om gardiner. Prisen afhænger af stof, mængde, gardintype, ophæng og montering og spænder fra billige gardiner i lette stoffer til dyrere løsninger i god kvalitet med foer og motorstyring.",
      links: [
        { slug: "tegn-paa-god-kvalitet-gardiner", label: "7 tegn på god kvalitet" },
        { slug: "billige-gardiner-eller-god-kvalitet", label: "Billige gardiner eller god kvalitet?" },
      ],
    },
    ctaNote: "Vil du kende prisen på gardiner til dine egne vinduer? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver, opmåling og tilbud.",
    ctaLead: "Få et uforpligtende tilbud på dine gardiner — book et gratis besøg.",
    bookingText: "Du booker besøget via Gardinbus.nu's bookingformular, hvorefter leverandøren kontakter dig for at aftale en tid. Besøg, opmåling og tilbud er gratis og uforpligtende.",
  },
  {
    slug: "tegn-paa-god-kvalitet-gardiner",
    category: "Pris & kvalitet",
    metaTitle: "7 tegn på gardiner i god kvalitet | bookgardinbussen.online",
    h1: "7 tegn på gardiner i god kvalitet",
    tag: "7 tegn på gardiner i god kvalitet",
    supplier: "gardiner",
    eyebrow: "Guide · Pris & kvalitet",
    desc: "Sådan kender du gardiner i god kvalitet: 7 konkrete tegn at kigge og føle efter i stof, syning, ophæng og mekanik — før du vælger nye gardiner.",
    card: { title: "7 tegn på god kvalitet", desc: "Sådan kender du gardiner i god kvalitet fra dårlige. 7 konkrete tegn at kigge og føle efter i stof, syning, ophæng og mekanik." },
    llmsDesc: "7 konkrete tegn på gardiner i god kvalitet — stoftæthed, fald, underkant, syning, ophæng, mekanik og farveægthed — og hvordan man tjekker dem på stofprøver i sit eget hjem.",
    intro: [
      "Kvalitet kan være svær at vurdere på et billede eller en prisseddel. Her er 7 konkrete tegn, du kan kigge — og føle — efter, så du ved, om et gardin er bygget til at holde.",
    ],
    sections: [
      { h: "1. Tæt, tungt stof", p: [
        "Hold stoffet op mod lyset. Et tætvævet, tungt stof lukker mere lys ude og falder tungere end et tyndt, gennemsigtigt stof. Det er ofte det første, du mærker med det samme, når du sammenligner to stoffer i hånden.",
      ]},
      { h: "2. Pænt, ensartet fald", p: [
        "God kvalitet viser sig, når gardinet hænger — stoffet skal falde jævnt uden at bukle eller stå ud fra sig selv. Et stof af lavere kvalitet mister ofte formen efter kort tids brug.",
      ]},
      { h: "3. Syet eller vægtet underkant", p: [
        "En syet søm eller en vægtet kant for neden hjælper gardinet med at hænge lige og undgå at flagre. Det er en lille detalje, der gør stor forskel for det færdige udtryk.",
      ]},
      { h: "4. Solid syning i sømme og folder", p: [
        "Kig efter jævne, tætte sting uden løse tråde. Folderne foroven bør sidde symmetrisk og ensartet — skæve eller ujævne folder er ofte et tegn på hurtigt, billigt syarbejde.",
      ]},
      { h: "5. Ophæng og montering tilpasset præcist", p: [
        "Selv det bedste stof ser billigt ud, hvis det er hængt forkert op. Et ophæng, der er målt og monteret præcist til vinduet — uden gab i siderne eller skæve stænger — er et tegn på kvalitetshåndværk lige så meget som selve stoffet.",
      ]},
      { h: "6. Jævnt løbende mekanik", p: [
        "Til rulle- og lamelgardiner: mekanismen bør køre glat og lydløst, uden at binde eller sætte sig fast. En mekanik af god kvalitet holder til daglig brug i årevis uden at skulle justeres.",
      ]},
      { h: "7. Farveægte stof", p: [
        "Kvalitetsstoffer er behandlet, så farven holder sig i sollys over tid. Billigere stoffer kan blegne eller skifte nuance efter få måneder ved et sydvendt vindue.",
      ]},
      { h: "Typiske fejl, når kvaliteten vurderes", p: [
        { list: [
          "At bedømme stoffet ud fra et foto eller en skærm, hvor farve og tæthed ser anderledes ud",
          "At se på stoffet alene og glemme ophæng og mekanik, som ofte er det, der slides først",
          "At vælge et lyst, tyndt stof til et sydvendt vindue uden at spørge til farveægthed",
          "At sammenligne priser på tværs af gardintyper i stedet for samme type og samme mål",
        ]},
      ]},
      { h: "Sådan tjekker du de 7 tegn selv", p: [
        "Den bedste måde at vurdere kvalitet på er at se og mærke stoffet i dit eget hjem, i dit eget lys — ikke på et billede online. Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor en konsulent medbringer prøver på stoffer og farver, så du kan tjekke tegnene selv, før du beslutter dig.",
      ]},
    ],
    pullQuote: "7 konkrete tegn, du kan kigge og føle efter, så du ved, om gardinet holder.",
    faq: [
      { q: "Hvordan kan jeg mærke, om et gardinstof er god kvalitet?", a: "Et kvalitetsstof føles tæt og tungt i hånden, falder pænt uden at krølle, og farven virker dyb og ensartet frem for tynd og gennemsigtig i lyset. Det er lettest at vurdere på en fysisk prøve i dit eget lys." },
      { q: "Betyder en dyr pris altid god kvalitet?", a: "Ikke nødvendigvis, men prisen afspejler ofte stoftæthed, mærke og mekanik. De 7 tegn i denne guide er en bedre rettesnor end prisen alene, når du skal vurdere kvaliteten." },
      { q: "Kan jeg selv tjekke kvaliteten, før jeg bestiller?", a: "Ja, du kan kigge efter de samme 7 tegn i alle gardiner, du støder på. Den sikreste måde er at se og føle stoffet i dit eget hjem — fx ved et gratis besøg fra Gardinbus.nu, hvor konsulenten medbringer prøver." },
    ],
    related: {
      text: "Kvalitet kan være svær at vurdere på en prisseddel alene. Uanset om du overvejer billige gardiner eller vil investere i gardiner i god kvalitet, er der konkrete tegn i stof, syning og ophæng, du kan kigge og føle efter.",
      links: [
        { slug: "billige-gardiner-eller-god-kvalitet", label: "Billige gardiner eller god kvalitet?" },
        { slug: "hvad-koster-gardiner", label: "Hvad koster gardiner?" },
      ],
    },
    ctaNote: "Vil du mærke kvaliteten selv? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor konsulenten viser stofprøver og måler op.",
    ctaLead: "Se og mærk kvaliteten selv — book et gratis besøg.",
  },
  {
    slug: "nye-gardiner-til-efteraaret",
    category: "Efterår – guides & fordele",
    metaTitle: "Nye gardiner til efteråret: sådan vælger du rigtigt",
    h1: "Nye gardiner til efteråret — sådan vælger du rigtigt",
    tag: "Nye gardiner til efteråret",
    supplier: "book",
    eyebrow: "Guide · Efterår",
    card: { title: "Nye gardiner til efteråret", desc: "Hvornår skal du skifte, hvilke typer passer til den mørke tid, og hvordan undgår du de klassiske fejlkøb? Tjekliste til før du bestiller." },
    desc: "Nye gardiner til efteråret? Se hvilke gardintyper der dæmper kulde, mørklægger og skaber hygge — plus en tjekliste, så du undgår de klassiske fejlkøb.",
    llmsDesc: "Guide til at vælge nye gardiner til efteråret: hvorfor man skifter, hvilke gardintyper der passer til den mørke tid (mørklægning, isolerende plissé, lagdelte gardiner), tjekliste før køb og gratis, uforpligtende besøg med opmåling via Gardinbus.nu.",
    intro: [
      "Når dagene bliver kortere, og kulden kryber ind ad vinduerne, opdager mange, at sommerens lette gardiner ikke længere slår til. Efteråret er derfor et af de mest oplagte tidspunkter at skifte til nye gardiner — og med god grund.",
      "I denne guide får du et klart overblik over, hvilke gardiner der passer til den mørke tid, hvad du skal tænke over, før du køber, og hvordan du undgår de klassiske fejlkøb. Når du er klar, kan du booke et gratis besøg, hvor en konsulent fra Gardinbus.nu viser prøver og måler op.",
    ],
    sections: [
      { h: "Hvorfor skifte til nye gardiner om efteråret?", p: [
        "Efteråret stiller helt andre krav til dine vinduer end sommeren. Om sommeren handler det om at holde solen og varmen ude. Om efteråret handler det om at holde på varmen, lukke mørket ude om aftenen og skabe lune, rolige rammer indenfor.",
        "Nye gardiner kan derfor gøre en mærkbar forskel på både komfort og stemning. Et tættere stof dæmper kulden fra ruden, et mørklægningsgardin giver bedre søvn, når gadelyset tændes tidligt, og et blødere stof ændrer hele rummets udtryk.",
        { list: [
          "Hold bedre på varmen og dæmp træk fra vinduerne",
          "Mørklæg soveværelset, når aftenerne bliver lange",
          "Skjul indkig, når lyset er tændt tidligt på aftenen",
          "Giv stuen et lunt, hyggeligt udtryk til den mørke tid",
        ]},
      ]},
      { h: "De bedste gardintyper til den mørke tid", p: [
        "Der findes ikke én rigtig løsning til alle rum. De fleste får det bedste resultat ved at vælge gardintype efter, hvad rummet skal bruges til:",
        { list: [
          "Stuen: fyldige foldegardiner i bomuld, hør eller velour — gerne kombineret med et let lag til dagslyset",
          "Soveværelset: mørklægningsgardiner eller mørklæggende rullegardiner, der slutter tæt om vinduet",
          "Kolde vinduer: tykke, foerede gardiner eller plisségardiner med honeycomb-struktur, der danner en isolerende luftlomme",
          "Køkken og bad: rullegardiner eller persienner, der tåler fugt og er nemme at holde rene",
          "Store vinduespartier: lamelgardiner, der kan styre både lys og indkig",
        ]},
        "Mange vælger en lagdelt løsning, hvor et let gardin filtrerer det svage dagslys, mens et tungere gardin trækkes for om aftenen. Det giver fuld kontrol over både lys, varme og stemning. Overvejer du særlige løsninger som termogardiner eller panelgardiner, så spørg konsulenten, om de kan leveres.",
      ]},
      { h: "Tjekliste: det skal du tænke over, før du køber", p: [
        "De fleste fejlkøb skyldes forkerte mål eller et stof, der så anderledes ud på skærmen end i virkeligheden. Gå denne tjekliste igennem, før du bestiller nye gardiner:",
        { list: [
          "Mål både bredde og højde — og beslut, om gardinet skal sidde i eller uden for vinduesrammen",
          "Beregn stofforbrug: til foldegardiner bruges typisk 1,5–2,5 gange vinduets bredde",
          "Vælg ophæng, der kan bære et tungere efterårsstof",
          "Tjek stoffets lystæthed i dit eget lys — ikke kun på et foto",
          "Overvej, om gardinet skal kunne vaskes, og hvor meget sol det skal tåle",
          "Tænk farven sammen med gulv, vægge og møbler",
        ]},
        "Det er netop her, et besøg gør en forskel. Ved et gratis besøg fra Gardinbus.nu måler konsulenten vinduerne op og viser prøverne i dit eget lys, og du får et uforpligtende tilbud — så du undgår at gætte.",
      ]},
      { h: "Hvornår skal du bestille dine efterårsgardiner?", p: [
        "Jo tidligere, jo bedre. Efteråret er en populær tid for nye gardiner, og mange ønsker at have dem hængende, før de mørkeste måneder og julen sætter ind. Gardiner efter mål skal produceres, så der går typisk lidt tid fra opmåling til levering — spørg leverandøren om den aktuelle leveringstid.",
        "Booker du et gratis besøg i god tid, øger du chancen for at have dine nye gardiner oppe, når efterårsaftenerne for alvor bliver lange.",
      ]},
    ],
    pullQuote: "Om efteråret handler det om at holde på varmen, lukke mørket ude og skabe lune rammer indenfor.",
    faq: [
      { q: "Hvilke gardiner er bedst til efteråret?", a: "Det afhænger af rummet. Til stuen er fyldige foldegardiner i bløde stoffer populære, til soveværelset mørklægningsgardiner, og til kolde vinduer tykke, foerede gardiner eller plisségardiner med isolerende honeycomb-struktur. Mange vælger en kombination af et let og et tungere lag." },
      { q: "Kan nye gardiner hjælpe på varmeregningen?", a: "Tætsluttende og tykkere gardiner kan dæmpe træk og kulde fra vinduerne, især om aftenen og natten, når de er trukket for. Hvor stor effekten er, afhænger af vinduerne, stoffet og hvor tæt gardinet slutter." },
      { q: "Hvornår skal jeg bestille nye gardiner til efteråret og julen?", a: "Gerne så tidligt som muligt. Gardiner efter mål skal produceres, så der går typisk noget tid fra opmåling til levering. Book et besøg i god tid, og spørg til den aktuelle leveringstid." },
      { q: "Hvad koster det at få nye gardiner målt op?", a: "Hos Gardinbus.nu er besøget, opmålingen og rådgivningen gratis og uforpligtende. Du får et tilbud og bestemmer selv, om du vil gå videre." },
    ],
    related: {
      text: "Nye gardiner til efteråret handler om varme, mørke og hygge. Læs videre om de løsninger, der gør den største forskel i den mørke tid.",
      links: [
        { slug: "termogardiner-spar-paa-varmen", label: "Termogardiner" },
        { slug: "moerklaegningsgardiner-efteraar", label: "Mørklægningsgardiner" },
        { slug: "gardinmode-trends-2026", label: "Gardinmode 2026" },
      ],
    },
    ctaNote: "Klar til nye gardiner før de mørke måneder? Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor konsulenten viser prøver og måler op.",
    ctaLead: "Få nye gardiner op før mørket — book et gratis besøg.",
    bookingText: "Du booker via Gardinbus.nu's bookingformular, og leverandøren kontakter dig derefter for at aftale en tid. Besøget med prøver, opmåling og tilbud er gratis og uden købepligt.",
  },
  {
    slug: "gardinmode-trends-2026",
    category: "Efterår – inspiration",
    metaTitle: "Gardinmode 2026: årets gardintrends til efterår og vinter",
    h1: "Gardinmode 2026 — årets gardintrends til efterår og vinter",
    tag: "Gardinmode 2026",
    supplier: "book",
    eyebrow: "Inspiration · Mode & trends",
    card: { title: "Gardinmode 2026: efterår og vinter", desc: "Varme farver, taktile stoffer, gulvlange gardiner og lag på lag. Se årets gardintrends — og hvordan du bruger dem derhjemme." },
    desc: "Gardinmode 2026: varme farver, taktile stoffer, gulvlange gardiner og lag på lag. Se årets gardintrends, og hvordan du bruger dem i dit eget hjem.",
    llmsDesc: "Overblik over gardinmode og gardintrends i efteråret og vinteren 2026: varme jordfarver, taktile naturstoffer, gulvlange gardiner hængt højt, lagdelte løsninger og diskret teknik — og hvordan man ser stofprøver hjemme via et gratis besøg fra Gardinbus.nu.",
    intro: [
      "Gardiner er gået fra at være en praktisk detalje til at være en af de vigtigste brikker i indretningen. Ligesom tøjmoden skifter med sæsonen, gør gardinmoden det også — og efteråret og vinteren 2026 handler om varme, tekstur og ro.",
      "Her får du et overblik over de tendenser, der præger gardinmoden i år, og gode råd til, hvordan du bruger dem i dit eget hjem — uden at det føles som en midlertidig dille.",
    ],
    sections: [
      { h: "Trend 1: Varme farver afløser det kølige grå", p: [
        "De kølige grå toner, der har domineret i mange år, viger for varmere nuancer. Karamel, terrakotta, rustrød, varm sand og støvede grønne toner som oliven og salvie går igen i både møbler, tekstiler og gardiner.",
        "Vil du holde det tidløst, så vælg en varm, neutral base som sand eller havre til gardinerne, og lad puder og plaider bære de stærkere efterårsfarver. Så kan du nemt skifte udtryk fra sæson til sæson.",
      ]},
      { h: "Trend 2: Taktile stoffer og naturlige fibre", p: [
        "Overfladen er lige så vigtig som farven. Hør, hørblandinger, bouclé-agtige strukturer, grov bomuld og blød velour giver gardinerne dybde og gør rummet mere indbydende at opholde sig i.",
        "Naturlige fibre og stoffer med synlig struktur passer til tidens ønske om et roligt, jordnært hjem. Træpersienner og bambus-look er også med til at bringe naturen ind ad vinduet.",
      ]},
      { h: "Trend 3: Gulvlange gardiner hængt helt oppe ved loftet", p: [
        "Det korte gardin, der stopper ved vindueskarmen, er på vej ud i stuer og soveværelser. Moden er gardiner, der hænges så højt som muligt og når helt ned til gulvet — gerne i bredden, så de dækker mere væg end selve vinduet.",
        "Det får lofthøjden til at virke større, vinduerne til at virke bredere og giver rummet et roligt, hotel-lignende udtryk. Skinner monteret i eller tæt på loftet understøtter det rene look.",
      ]},
      { h: "Trend 4: Lag på lag", p: [
        "Lagdeling er årets mest praktiske trend. Et let, lystransparent gardin kombineres med et tungere stof eller et plissé- eller rullegardin. Resultatet er et blødt, gennemtænkt udtryk og fuld kontrol over lys, indkig og varme.",
        "Prøv fx en transparent voile mod ruden og et fyldigt foldegardin i en varm farve udenpå — eller et mørklæggende rullegardin skjult bag et luftigt hørgardin i soveværelset.",
      ]},
      { h: "Trend 5: Diskret teknik og motoriserede gardiner", p: [
        "Smarte løsninger er blevet en del af gardinmoden — men teknikken skal helst ikke kunne ses. Motoriserede gardiner, der fx styres med app, gør det nemt at trække for, når mørket falder på, uden at gå på kompromis med udtrykket. Er det interessant for dig, så spørg konsulenten, hvilke styringsmuligheder der kan leveres.",
      ]},
      { h: "Typiske fejl, når man følger trends", p: [
        { list: [
          "At vælge en stærk trendfarve til de store gardiner, så udtrykket hurtigt føles dateret — lad hellere puder og plaider bære farven",
          "At hænge gulvlange gardiner op uden at måle fra skinnen til gulvet, så de enten svæver eller slæber",
          "At bestille stof ud fra et foto i stedet for at se prøven op ad egne vægge og møbler",
        ]},
      ]},
      { h: "Sådan bruger du årets gardinmode derhjemme", p: [
        "Du behøver ikke skifte alle gardiner på én gang. Start med det rum, du bruger mest — typisk stuen — og vælg én eller to trends, der passer til din stil. En ny farve og et højere, gulvlangt ophæng kan ændre rummet markant.",
        "Trends ser meget forskellige ud på et billede og i dit eget lys. Ved et gratis besøg fra Gardinbus.nu medbringer konsulenten prøver på stoffer og farver, så du kan se dem op ad dine egne vægge og møbler, før du beslutter dig.",
      ]},
    ],
    pullQuote: "Efteråret og vinteren 2026 handler om varme, tekstur og ro.",
    faq: [
      { q: "Hvad er moderne gardiner i 2026?", a: "Gardinmoden i 2026 handler om varme jordfarver, taktile naturstoffer som hør og velour, gulvlange gardiner hængt højt ved loftet og lagdelte løsninger, der kombinerer et let og et tungere gardin." },
      { q: "Hvilke farver er moderne til gardiner i år?", a: "Varme nuancer som karamel, terrakotta, rustrød, varm sand og støvet grøn er populære. Vil du have et tidløst valg, er varme neutrale farver som sand og havre et sikkert udgangspunkt." },
      { q: "Er korte gardiner gået af mode?", a: "I stuer og soveværelser foretrækker mange i dag gulvlange gardiner hængt højt, fordi det får rummet til at virke større. Korte løsninger som rullegardiner og plisségardiner er dog stadig oplagte i køkken, bad og vinduer over møbler." },
      { q: "Kan jeg se årets gardintrends hjemme hos mig selv?", a: "Ja. Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor konsulenten medbringer prøver på stoffer og farver og måler op. Du kan samtidig bede om rådgivning om, hvordan trends passer til dit hjem." },
    ],
    related: {
      text: "Gardinmoden handler om farver, materialer og måden gardinerne hænges på. Få mere inspiration til efterårets udtryk her.",
      links: [
        { slug: "efteraarsfarver-gardiner-inspiration", label: "Efterårsfarver" },
        { slug: "lagdelte-gardiner-efteraar", label: "Lagdelte gardiner" },
        { slug: "nye-gardiner-til-efteraaret", label: "Nye gardiner til efteråret" },
      ],
    },
    ctaNote: "Vil du se årets gardinmode i dit eget hjem? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver på stoffer og farver.",
    ctaLead: "Se årets gardintrends hjemme hos dig — book et gratis besøg.",
    bookingText: "Du booker via Gardinbus.nu's bookingformular, og leverandøren kontakter dig for at aftale en tid. Besøget med prøver, opmåling og et uforpligtende tilbud er gratis.",
  },
  {
    slug: "opmaaling-af-gardiner",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Opmåling af gardiner: Det skal du overveje først",
    h1: "Opmåling af gardiner — det skal du overveje, før du måler op",
    tag: "Opmåling af gardiner",
    supplier: "faq",
    eyebrow: "Guide · Opmåling",
    desc: "Skal gardinet sidde i rammen, på væggen eller i loftet? Se hvad du skal afklare før opmåling af gardiner – og typiske fejl, du undgår.",
    card: { title: "Før opmåling af gardiner", desc: "Placering, funktion og typiske fejl: det skal du have styr på, før dine vinduer bliver målt op til gardiner efter mål." },
    intro: [
      "Gardiner efter mål bliver kun så gode som opmålingen bag dem. Men før nogen finder målebåndet frem, er der en række valg, der afgør, hvilke mål der overhovedet skal tages: hvor gardinet skal sidde, hvad det skal kunne, og hvordan vinduet bruges i hverdagen.",
      "I denne guide gennemgår vi de beslutninger, der er gode at have truffet før opmålingen — uanset om du selv måler, eller om en konsulent måler op ved et besøg.",
    ],
    sections: [
      { h: "1. Hvad skal gardinet kunne?", p: [
        "Start med formålet, fordi det styrer både gardintype og placering. Skal gardinet mørklægge, skærme for indblik, holde på varmen, dæmpe sol og blænding — eller primært pynte?",
        { list: [
          "Mørklægning: gardinet skal dække tæt og gerne lidt ud over vinduet",
          "Indkigsværn: overvej plissé, der kan køres både oppefra og nedefra",
          "Sol og blænding: let lysdæmpende stof, persienner eller solfilm",
          "Hygge og akustik: løse gardiner eller foldegardiner i tættere stof",
        ] },
      ]},
      { h: "2. I rammen, på væggen eller i loftet?", p: [
        "Montering i vinduesrammen holder vindueskarmen fri og giver et stramt, moderne udtryk — men kræver nok dybde i rammen, og der kan slippe lys ind langs kanterne.",
        "Montering på væggen over vinduet dækker mere og lukker bedre for lyset. Løse gardiner hængt i loftet eller højt på væggen får rummet til at virke højere.",
        "Valget ændrer, hvilke mål der skal tages: i rammen måles den indvendige bredde og højde, på væggen måles det område, gardinet skal dække, inklusive overlap.",
      ]},
      { h: "3. Hvordan bruges vinduet?", p: [
        "Åbnes vinduet ofte, skal gardinet ikke være i vejen for håndtaget eller ramme, når vinduet går op. Ved altan- og terrassedøre skal du kunne komme frit ud og ind.",
        "Plissé og persienner, der sidder i selve rammen og følger med, når vinduet åbnes, er ofte en god løsning her. Løse gardiner kræver plads til at blive trukket helt til side.",
      ]},
      { h: "4. Typiske fejl ved opmåling", p: [
        { list: [
          "At måle ét sted: vinduer er sjældent helt lige — mål bredde og højde flere steder",
          "At glemme håndtag, radiatorer og vindueskarme, der kan stå i vejen",
          "At bestille løse gardiner i vinduets bredde: et fyldigt fald kræver typisk 1,5–2,5 gange bredden i stof",
          "At blande mål for montering i rammen og på væggen",
        ] },
        "Har du gamle eller skæve vinduer, er det en fordel at få målt op af en, der gør det til daglig. Ved et gratis besøg fra Gardinbus.nu måler konsulenten vinduerne op, så gardinerne kan laves efter mål.",
      ]},
      { h: "Tjekliste før opmålingen", p: [
        { list: [
          "Hvilke rum og vinduer skal have nyt?",
          "Hvad er det vigtigste for hvert vindue: mørke, indkigsværn, varme eller udseende?",
          "Skal gardinet sidde i rammen, på væggen eller i loftet?",
          "Er du lejer eller i andelsbolig? Tjek, om du må bore",
          "Har du et prisniveau, du vil holde dig inden for?",
        ] },
      ]},
    ],
    pullQuote: "De vigtigste beslutninger om gardiner bliver truffet, før målebåndet kommer frem.",
    faq: [
      { q: "Skal jeg selv måle mine vinduer op til gardiner efter mål?", a: "Det kan du, men så har du selv ansvaret for, at målene passer. Ved et besøg fra Gardinbus.nu er opmålingen gratis og en del af besøget." },
      { q: "Hvor meget bredere end vinduet skal et gardin være?", a: "Løse gardiner kræver typisk 1,5–2,5 gange vinduets bredde i stof for et fyldigt fald. Rullegardiner og plissé på væggen dækker gerne lidt ud over vinduet i hver side for at lukke bedre for lyset." },
      { q: "Er det bedst at montere gardinet i rammen?", a: "Det afhænger af formålet. I rammen giver et stramt udtryk og en fri karm, mens montering på væggen dækker bedre og mørklægger mere effektivt." },
      { q: "Hvad skal jeg have klar til et opmålingsbesøg?", a: "Gør dig klart, hvilke vinduer der skal have nyt, og hvad hvert gardin skal kunne. Sørg for, at der er fri adgang til vinduerne." },
    ],
    related: {
      text: "Når du ved, hvad gardinet skal kunne, og hvor det skal sidde, er det lettere at vælge type. Læs videre om prisen og om de gardintyper, der passer til netop dine vinduer.",
      links: [
        { slug: "hvad-koster-gardiner", label: "Hvad koster gardiner?" },
        { slug: "plissegardiner-eller-rullegardiner", label: "Plissé eller rullegardiner?" },
        { slug: "gardinstaenger-og-skinner", label: "Gardinstænger & skinner" },
      ],
    },
    ctaNote: "Vil du have dine vinduer målt op? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
    ctaLead: "Få dine vinduer målt op ved et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "plissegardiner-eller-rullegardiner",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Plisségardiner eller rullegardiner? Sådan vælger du",
    h1: "Plisségardiner eller rullegardiner? Forskelle og valg",
    tag: "Plissé eller rullegardiner",
    supplier: "produkter",
    eyebrow: "Sammenligning · Gardintyper",
    desc: "Plisségardiner eller rullegardiner? Sammenlign lysstyring, mørklægning, udseende og vinduestyper, og find den løsning, der passer til dit rum.",
    card: { title: "Plissé eller rullegardiner?", desc: "Lysstyring, mørklægning, udseende og vinduestyper: en ærlig sammenligning af de to mest populære gardintyper." },
    intro: [
      "Plisségardiner og rullegardiner er to af de mest valgte løsninger til moderne boliger. Begge er enkle, fylder lidt og fås i både lysdæmpende og mørklæggende stoffer — men de opfører sig forskelligt i hverdagen.",
      "Her sammenligner vi de to typer punkt for punkt, så du kan vælge den, der passer bedst til hvert rum.",
    ],
    sections: [
      { h: "Den korte forskel", p: [
        "Et rullegardin er en glat stofbane, der rulles op på en rulle i toppen. Et plisségardin er et foldet stof, der samles i en pakke, og som ofte kan køres både oppefra og nedefra.",
        "Rullegardinet giver den roligste, mest grafiske flade. Plisségardinet giver mere fleksibel lysstyring og passer til flere vinduestyper.",
      ]},
      { h: "Lys og indkigsværn", p: [
        "Den største fordel ved plissé er muligheden for at dække den nederste del af vinduet og lade lyset komme ind foroven. Det er praktisk i stueetagen, i rækkehuse og i badeværelser, hvor indkig er et problem.",
        "Et rullegardin dækker oppefra og ned. Vil du have både dagslys og privatliv, kan det kombineres med et lystransparent stof eller med løse gardiner.",
      ]},
      { h: "Mørklægning", p: [
        "Begge fås med mørklæggende stof. Rullegardinet kan monteres på væggen, så det dækker lidt ud over vinduet og mindsker lysstriber i siderne.",
        "Plisségardiner monteres ofte i rammen. Det giver et pænt udtryk, men der kan slippe lidt lys ind langs kanterne — spørg konsulenten, hvordan løsningen kan monteres, hvis fuld mørklægning er vigtig.",
      ]},
      { h: "Vinduestyper", p: [
        "Plissé er det mest fleksible valg til skrå vinduer, ovenlys og specielle former, fordi det kan holdes på plads med sidewires. Rullegardiner er bedst til almindelige, rektangulære vinduer og brede partier.",
        "Til vinduer, der åbnes ofte, er en løsning i rammen, der følger med vinduet, praktisk — det gælder især plissé.",
      ]},
      { h: "Fordele og ulemper side om side", p: [
        { list: [
          "Plissé + kan køres oppefra og nedefra; + passer til skrå og specielle vinduer; − folderne samler støv lidt lettere",
          "Rullegardin + rolig, glat flade; + let at holde rent; + godt til brede vinduer; − dækker kun oppefra og ned",
          "Begge: fås lysdæmpende og mørklæggende, laves efter mål og fylder lidt, når de er trukket op",
        ] },
        "Mange vælger begge dele: plissé i stuen og på badeværelset, rullegardiner i sove- og børneværelser.",
      ]},
    ],
    pullQuote: "Plissé giver fleksibel lysstyring — rullegardinet giver den roligste flade.",
    faq: [
      { q: "Hvad er billigst: plisségardiner eller rullegardiner?", a: "Det afhænger af stof, størrelse og betjening. Enkle rullegardiner i standardstof hører ofte til de billigste løsninger, men prisen varierer — bed om et tilbud på begge typer til dine vinduer." },
      { q: "Hvad er bedst til soveværelset?", a: "Begge kan mørklægge. Et mørklæggende rullegardin monteret på væggen lukker typisk bedst for lyset i siderne, mens plissé er godt, hvis du også vil kunne styre indkig." },
      { q: "Kan plisségardiner sidde i vinduer, der åbnes?", a: "Ja, plissé monteret i rammen følger med, når vinduet åbnes, og er ikke i vejen for håndtaget." },
      { q: "Kan jeg få begge typer hos Gardinbus.nu?", a: "Ja. Ifølge Gardinbus.nu omfatter sortimentet både plisségardiner og rullegardiner, og en konsulent kan vise prøver på begge ved et gratis besøg." },
    ],
    related: {
      text: "Læs de fulde guider til de to gardintyper, og se, hvordan de passer til skrå vinduer og ovenlys.",
      links: [
        { slug: "plissegardiner", label: "Plisségardiner" },
        { slug: "rullegardiner", label: "Rullegardiner" },
        { slug: "gardiner-til-skraavinduer", label: "Gardiner til skråvinduer" },
      ],
    },
    ctaNote: "I tvivl mellem plissé og rullegardiner? Ved et gratis besøg fra Gardinbus.nu kan du se prøver på begge i dit eget vindue.",
    ctaLead: "Se plissé og rullegardiner side om side — book et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "gardiner-til-skraavinduer",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Gardiner til skråvinduer og ovenlys: Guide",
    h1: "Gardiner til skråvinduer og ovenlys",
    tag: "Gardiner til skråvinduer",
    supplier: "produkter",
    eyebrow: "Guide · Specielle vinduer",
    desc: "Skråvinduer og ovenlys kræver gardiner, der bliver siddende i vinklen. Se hvilke typer der virker, hvad du skal måle, og typiske fejl.",
    card: { title: "Skråvinduer og ovenlys", desc: "Hvilke gardiner bliver siddende i vinklen? Guide til plissé, mørklægning og opmåling af skrå vinduer og ovenlys." },
    intro: [
      "Skråvinduer og ovenlys giver masser af dagslys under taget — men også varme om sommeren, lys om natten og et gardinproblem: almindelige gardiner hænger lodret og følger ikke vinduets vinkel.",
      "Her gennemgår vi, hvilke gardintyper der fungerer i skrå vinduer, hvad du skal være opmærksom på, og hvordan du undgår de typiske fejl.",
    ],
    sections: [
      { h: "Hvorfor almindelige gardiner ikke virker", p: [
        "Et løst gardin eller et almindeligt rullegardin falder lige ned på grund af tyngdekraften. I et skråt vindue hænger det derfor ud fra ruden og dækker ikke. Løsningen er gardiner, der holdes fast i siderne, så de følger vinduets hældning.",
      ]},
      { h: "Gardintyper, der fungerer i skrå vinduer", p: [
        { list: [
          "Plissé med sidewires eller skinner: holdes på plads i alle vinkler og kan ofte stoppes, hvor du vil",
          "Rullegardiner med sideskinner: glat flade, der føres i skinner langs siderne",
          "Mørklægningsgardiner med skinner: til sove- og børneværelser under taget",
          "Udvendig solafskærmning: dæmper varmen, før den når ruden",
        ] },
        "Mange ovenlysvinduer har deres egne, mærkespecifikke gardiner. Spørg konsulenten, hvilke løsninger der kan leveres til netop dit vindue.",
      ]},
      { h: "Varme, lys og søvn under taget", p: [
        "Rum under taget bliver hurtigt varme, fordi solen står direkte på ruden. Et lyst, reflekterende stof eller udvendig afskærmning dæmper varmen bedst. Om natten giver et mørklæggende stof i skinner den mest effektive mørklægning.",
        "Overvej også, om gardinet skal kunne betjenes uden stige — høje ovenlys kan fås med stang, elektrisk betjening eller lignende.",
      ]},
      { h: "Typiske fejl", p: [
        { list: [
          "At vælge et gardin uden sidestyring, der hænger ud fra ruden",
          "At glemme, at ovenlysvinduer ofte kræver mål fra en bestemt type og størrelse af vindue",
          "At vælge et mørkt stof, der optager varme, i et sydvendt tagvindue",
          "At placere betjeningen, så den ikke kan nås",
        ] },
      ]},
    ],
    pullQuote: "Et gardin til et skråt vindue skal holdes fast i siderne — ellers falder det bare lodret ned.",
    faq: [
      { q: "Hvilke gardiner passer til skråvinduer?", a: "Plissé med sidewires og rullegardiner eller mørklægning i sideskinner er de mest brugte løsninger, fordi de følger vinduets vinkel." },
      { q: "Kan man mørklægge et ovenlysvindue?", a: "Ja, med et mørklæggende gardin, der føres i skinner langs siderne. Det lukker langt bedre for lyset end et løst gardin." },
      { q: "Hvordan holder jeg varmen ude fra et tagvindue?", a: "Et lyst eller reflekterende stof hjælper, men udvendig afskærmning stopper varmen, før den når ruden. Solfilm er en anden mulighed." },
      { q: "Kan Gardinbus.nu levere gardiner til mit ovenlys?", a: "Plissé indgår i Gardinbus.nu's sortiment, men løsninger til ovenlys afhænger af vinduets type og størrelse. Spørg konsulenten ved besøget." },
    ],
    related: {
      text: "Plissé er ofte det mest fleksible valg til skrå og specielle vinduer. Læs mere om plissé, mørklægning og solfilm.",
      links: [
        { slug: "plissegardiner", label: "Plisségardiner" },
        { slug: "moerklaegningsgardiner-efteraar", label: "Mørklægningsgardiner" },
        { slug: "solfilm-til-vinduer", label: "Solfilm til vinduer" },
      ],
    },
    ctaNote: "Har du skråvinduer eller ovenlys? Ved et gratis besøg fra Gardinbus.nu kan du spørge konsulenten, hvilke løsninger der passer til dine vinduer.",
    ctaLead: "Få rådgivning om skråvinduer og ovenlys ved et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "gardiner-til-store-vinduer",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Gardiner til store vinduer og glaspartier: Guide",
    h1: "Gardiner til store vinduer og glaspartier",
    tag: "Gardiner til store vinduer",
    supplier: "produkter",
    eyebrow: "Guide · Store vinduer",
    desc: "Store vinduer, glaspartier og skydedøre kræver andre løsninger end standardvinduer. Se hvilke gardintyper der virker, og hvad du skal overveje.",
    card: { title: "Store vinduer og glaspartier", desc: "Lamelgardiner, løse gardiner, rullegardiner i flere fag eller persienner: sådan vælger du til store vinduespartier." },
    intro: [
      "Store vinduespartier, gulv-til-loft-vinduer og skydedøre giver lys og udsigt — men også udfordringer med blænding, varme, indkig om aftenen og ekko i rummet. Og et gardin, der er perfekt til et almindeligt vindue, kan være upraktisk på fire meter glas.",
      "Her gennemgår vi de gardintyper, der fungerer bedst på store flader, og hvad du skal tænke over, før du vælger.",
    ],
    sections: [
      { h: "Gardintyper til store vinduer", p: [
        { list: [
          "Lamelgardiner: lodrette lameller, der kan vendes og trækkes til siden — gode til skydedøre",
          "Løse gardiner på skinne: bløde, gulvlange og gode for akustikken i store rum",
          "Rullegardiner eller plissé i flere fag: hvert fag betjenes for sig, så du kan dække præcis, hvor solen står på",
          "Persienner: præcis lysstyring, bedst til fag af moderat bredde",
        ] },
        "Panelgardiner er også et oplagt valg til store partier; spørg konsulenten, om de kan leveres.",
      ]},
      { h: "Ét stort gardin eller flere fag?", p: [
        "Ét bredt gardin giver et roligt udtryk, men bliver tungt og kan være upraktisk at betjene. Flere smallere fag gør det muligt at skærme for solen ét sted og bevare udsigten et andet — og hvert gardin bliver lettere.",
        "Ved skydedøre er det vigtigt, at gardinet kan trækkes helt fri af døråbningen.",
      ]},
      { h: "Sol, varme og blænding", p: [
        "Store sydvendte vinduer kan give meget varme om sommeren. Lysdæmpende stof, persienner eller solfilm tager toppen af solen, uden at rummet bliver mørkt. Løse gardiner i tættere stof hjælper om aftenen og vinteren, hvor de også kan holde lidt bedre på varmen.",
      ]},
      { h: "Typiske fejl", p: [
        { list: [
          "At undervurdere stofforbruget: løse gardiner kræver typisk 1,5–2,5 gange bredden i stof",
          "At vælge én stor bane, der er svær at betjene",
          "At glemme, at gardinet skal kunne trækkes helt fri af en skydedør",
          "At vælge en skinne eller stang, der ikke er dimensioneret til vægten",
        ] },
        "På store partier betyder en præcis opmåling meget for både udseende og funktion.",
      ]},
    ],
    pullQuote: "På store glaspartier er flere smallere fag ofte smartere end ét stort gardin.",
    faq: [
      { q: "Hvilke gardiner er bedst til store vinduer?", a: "Lamelgardiner og løse gardiner på skinne er klassiske valg. Rullegardiner eller plissé i flere fag giver mere fleksibel lysstyring." },
      { q: "Hvilke gardiner passer til en skydedør?", a: "Lamelgardiner og løse gardiner på skinne kan trækkes helt til siden, så døren kan bruges frit." },
      { q: "Bliver store gardiner dyre?", a: "Prisen stiger med størrelse og stofforbrug. Flere enkle fag kan være billigere end én stor specialløsning — bed om tilbud på begge dele." },
      { q: "Kan jeg få et tilbud på store vinduer?", a: "Ja. Ved et gratis besøg fra Gardinbus.nu måler konsulenten partierne op og giver et uforpligtende tilbud." },
    ],
    related: {
      text: "Læs mere om de gardintyper, der fungerer bedst på store flader og skydedøre.",
      links: [
        { slug: "lamelgardiner", label: "Lamelgardiner" },
        { slug: "panelgardiner", label: "Panelgardiner" },
        { slug: "gardinstaenger-og-skinner", label: "Gardinstænger & skinner" },
      ],
    },
    ctaNote: "Har du store vinduer eller en skydedør? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
    ctaLead: "Få dine store vinduer målt op ved et gratis besøg hos Gardinbus.nu.",
  },
  {
    slug: "gardiner-til-stuen",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Gardiner til stuen: Sådan vælger du type og stof",
    h1: "Gardiner til stuen — type, stof og ophæng",
    tag: "Gardiner til stuen",
    supplier: "gardiner",
    eyebrow: "Guide · Stuen",
    desc: "Find de rigtige gardiner til stuen: lys, indkig, hygge og akustik. Se hvilke typer og stoffer der passer, og hvordan du kombinerer dem.",
    card: { title: "Gardiner til stuen", desc: "Lys, indkig, hygge og akustik: sådan vælger du gardintype, stof og ophæng til stuen — og kombinerer dem." },
    intro: [
      "Stuen er det rum, hvor gardinerne skal kunne mest: lukke dagslys ind, skærme for indkig om aftenen, dæmpe sol på tv'et og gøre rummet hyggeligt og mindre rungende. Derfor ender mange med en kombination af to typer.",
      "Her får du overblik over de gardintyper og stoffer, der passer til stuen, og hvordan du sætter dem sammen.",
    ],
    sections: [
      { h: "Hvad skal gardinerne i stuen kunne?", p: [
        { list: [
          "Dagslys: lette, lystransparente stoffer eller plissé, der kan køres oppefra og ned",
          "Indkig om aftenen: tættere stof, der kan trækkes for",
          "Sol og blænding på skærmen: persienner, lysdæmpende rullegardiner eller solfilm",
          "Akustik og hygge: løse gardiner i fyldige stoffer dæmper ekko",
        ] },
      ]},
      { h: "Gardintyper til stuen", p: [
        "Løse gardiner eller foldegardiner er klassikeren i stuen — de blødgør rummet og kan hænges højt og bredt for at få vinduerne til at virke større.",
        "Plisségardiner og persienner er gode, hvis indkig og lysstyring er det vigtigste, og de kan kombineres med løse gardiner i siderne.",
      ]},
      { h: "Kombinér to lag", p: [
        "En udbredt løsning er et funktionelt lag tæt på ruden (plissé, rullegardin eller persienne) kombineret med løse gardiner foran. Det funktionelle lag styrer lyset i dagtimerne, mens de løse gardiner giver hygge og privatliv om aftenen.",
        "Læg mærke til, at to lag kræver plads til ophæng — enten et dobbelt spor eller to separate ophæng.",
      ]},
      { h: "Stof og farve", p: [
        "Farver ser forskellige ud i butikken og i din egen stue. Hold prøver op ved vinduet på forskellige tidspunkter af dagen, og se dem op mod gulv, vægge og møbler.",
        "Lyse, naturlige stoffer giver et let udtryk; tungere stoffer giver mere hygge og dæmper lyden bedre.",
      ]},
      { h: "Typiske fejl", p: [
        { list: [
          "At hænge gardinerne lige over vinduet i stedet for højt — det får loftet til at virke lavere",
          "At spare på stoffet, så gardinerne ser flade ud",
          "At vælge farve ud fra et billede på skærmen",
          "At glemme, hvordan tv-skærm og sofa står i forhold til solen",
        ] },
      ]},
    ],
    pullQuote: "Stuen kræver ofte to lag: ét til lyset om dagen og ét til hyggen om aftenen.",
    faq: [
      { q: "Hvilke gardiner er bedst til stuen?", a: "Det afhænger af lys og indkig. Mange vælger løse gardiner for hygge og akustik kombineret med plissé, rullegardiner eller persienner til lysstyring." },
      { q: "Skal gardinerne i stuen gå til gulvet?", a: "Gulvlange gardiner giver et roligt, eksklusivt udtryk og får rummet til at virke højere. Korte gardiner kan være praktiske over radiatorer eller vindueskarme, der bruges." },
      { q: "Hvordan undgår jeg genskin på tv'et?", a: "Persienner, lysdæmpende rullegardiner eller plissé gør det muligt at dæmpe solen uden at mørklægge hele stuen." },
      { q: "Kan jeg se stofprøver i min egen stue?", a: "Ja. Ved et gratis besøg fra Gardinbus.nu medbringer konsulenten prøver, så du kan se stofferne i dit eget lys." },
    ],
    related: {
      text: "Læs videre om de gardintyper, der passer bedst i stuen, og om at lægge lag på lag.",
      links: [
        { slug: "foldegardiner", label: "Foldegardiner" },
        { slug: "lagdelte-gardiner-efteraar", label: "Lagdelte gardiner" },
        { slug: "efteraarsklar-stue-gardiner", label: "Efterårsklar stue" },
      ],
    },
    ctaNote: "Vil du se gardiner til stuen i dit eget lys? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
    ctaLead: "Se stofferne i din egen stue — book et gratis besøg hos Gardinbus.nu.",
  },
];

// Nyheder / inspiration (info fra gardinbus.nu/nyheder).
// Illustrationen hentes fra scripts/news-art/<slug>.svg (indholdet af <svg>);
// findes filen ikke, tegnes en simpel gardin-illustration i accent-farverne.
// offer.text må indeholde links skrevet som [tekst](url).
const NEWS = [
  {
    slug: "plissegardiner-trendy",
    title: "Plisségardiner er trendy!",
    accent: ["#dbe2d4", "#b7cbb0"],
    supplier: "produkter",
    link: { href: "blog/plissegardiner.html", text: "Læs guide til plisségardiner" },
    body: [
      "En af de helt store fordele ved plisségardiner er, at de kan trækkes både oppefra og nedefra. Det gør dem meget fleksible: du kan skærme for indblik forneden og samtidig lade dagslyset strømme ind foroven — oplagt i stuer, badeværelser og køkkener, hvor du vil have både lys og privatliv.",
      "Plisségardiner fås i mange farver og stoftætheder, fra lette lysfiltrerende til mørklæggende. De fylder meget lidt, når de er trukket sammen, og kan også bruges til ovenlys og skæve vinduer. Ikke så mærkeligt, at de er et af de mest populære valg lige nu.",
    ],
    offer: {
      h: "Tilbud på plisségardiner",
      text: "Gardinbus.nu tilbyder et gratis og uforpligtende besøg, hvor en konsulent viser prøver på plisségardiner, måler op og derefter giver et uforpligtende tilbud. Prisen afhænger af type og vinduernes størrelse; lette stoffer er ofte et godt sted at starte, hvis budgettet er stramt, mens tættere, mørklæggende stoffer typisk koster mere. Er plisségardiner ikke helt det rette, kan du ved besøget spørge til alternativer som [rullegardiner](blog/rullegardiner.html) eller [lamelgardiner](blog/lamelgardiner.html).",
    },
    related: [
      { href: "blog/foldegardiner.html", label: "Foldegardiner" },
      { href: "blog/lamelgardiner.html", label: "Lamelgardiner" },
    ],
  },
  {
    slug: "fordele-lamelgardiner",
    title: "Fordele ved lamelgardiner",
    accent: ["#e7ddcc", "#cbb595"],
    supplier: "produkter",
    link: { href: "blog/lamelgardiner.html", text: "Læs guide til lamelgardiner" },
    body: [
      "Lamelgardiner har eksisteret i mange år og er stadig et populært valg — og med god grund. De lodrette lameller egner sig godt til store vinduespartier og skydedøre, hvor de dækker elegant uden at virke tunge, og de kan nemt trækkes til side, når du vil ud på terrassen.",
      "Ved at dreje lamellerne styrer du lys og indblik trinløst, og stofferne fås i alt fra lyse, luftige toner til mørklæggende varianter. Det gør lamelgardiner til en fleksibel løsning, der både er praktisk og pæn — i hjemmet såvel som på kontoret.",
    ],
    offer: {
      h: "Tilbud på lamelgardiner",
      text: "Ved et gratis besøg fra Gardinbus.nu medbringer konsulenten prøver på lamelgardiner, måler dit vinduesparti eller din skydedør op, og du får efterfølgende et uforpligtende tilbud. Lamelgardiner hører generelt til blandt de mere prisvenlige løsninger, især hvis du vælger enklere stoffer — men prisen afhænger altid af type og mål. Har du i stedet brug for finere lysstyring til mindre vinduer, kan [plisségardiner](blog/plissegardiner.html) eller [rullegardiner](blog/rullegardiner.html) være et godt alternativ.",
    },
    related: [
      { href: "blog/persienner.html", label: "Persienner" },
      { href: "blog/traepersienner.html", label: "Træpersienner" },
    ],
  },
  {
    slug: "luxaflex-powerview",
    title: "Luxaflex PowerView – det smarte valg",
    accent: ["#dce4ec", "#9fb6cf"],
    supplier: "luxaflex",
    link: { href: "blog/luxaflex.html", text: "Læs guide til Luxaflex" },
    body: [
      "Automatiske gardinløsninger er blevet et af de mere søgte emner, og Luxaflex PowerView er et eksempel på et system, hvor gardinerne kan køre af sig selv. Via en app kan du typisk åbne og lukke gardinerne, lægge tidsplaner og styre det hele fra mobilen — også når du ikke er hjemme.",
      "Motoriserede gardiner er praktiske til høje eller svært tilgængelige vinduer, og tidsstyring kan få hjemmet til at se beboet ud, mens du er væk. Gardinbus.nu forhandler Luxaflex — spørg konsulenten, om PowerView-løsningen kan leveres til netop dine vinduer.",
    ],
    offer: {
      h: "Tilbud på motoriserede gardiner",
      text: "Motoriserede løsninger er en større investering end manuelle gardiner, så det giver mening at få et konkret og uforpligtende tilbud, før du beslutter dig. Gardinbus.nu tilbyder et gratis besøg med prøver og opmåling, hvor du kan spørge til mulighederne. Vil du holde budgettet nede, kan du overveje at kombinere en motoriseret løsning ét sted i hjemmet med manuelle [gardiner](blog/gardiner.html) eller [rullegardiner](blog/rullegardiner.html) andre steder.",
    },
    related: [
      { href: "blog/luxaflex.html", label: "Luxaflex" },
      { href: "blog/motoriserede-gardiner-smart-home.html", label: "Motoriserede gardiner" },
    ],
  },
  {
    slug: "sov-bedre-moerklaegning",
    title: "Sov bedre med mørklægningsgardiner",
    accent: ["#c9cfdb", "#5a6b8a"],
    supplier: "produkter",
    link: { href: "blog/rullegardiner.html", text: "Se mørklægning som rullegardin" },
    body: [
      "Tidligt morgenlys og lyse sommernætter kan forstyrre din søvn. Mørklægningsgardiner holder lyset ude og hjælper kroppen med at falde til ro — særligt vigtigt i soveværelser og børneværelser.",
      "Mørklægning findes som rullegardiner, plisségardiner eller forede gardiner, alt efter dit vindue og din stil. Vil du undgå lysstriber i siderne, er det en god idé at spørge til en montering, der dækker helt ud til kanten.",
    ],
    offer: {
      h: "Tilbud på mørklægningsgardiner",
      text: "Gardinbus.nu tilbyder et gratis, uforpligtende besøg, hvor en konsulent viser prøver på mørklæggende stoffer, måler op og giver et uforpligtende tilbud. Simple [rullegardiner](blog/rullegardiner.html) er ofte den billigste vej til mørklægning, mens forede gardiner eller mørklæggende [plisségardiner](blog/plissegardiner.html) typisk koster mere til gengæld for et blødere udtryk. Du kan bede om rådgivning ved besøget om, hvilken løsning der passer til dit budget.",
    },
    related: [
      { href: "blog/moerklaegningsgardiner-efteraar.html", label: "Mørklægningsgardiner" },
      { href: "blog/gardiner-sovevaerelse-efteraar.html", label: "Soveværelse om efteråret" },
    ],
  },
  {
    slug: "lounge-stemning-gardiner",
    title: "Lounge-stemning med gardiner",
    accent: ["#e2ece7", "#bcd6cc"],
    supplier: "gardiner",
    link: { href: "blog/gardiner.html", text: "Læs guide til gardiner" },
    body: [
      "Bløde gardiner gør mere end at skærme for lys — de dæmper lyd, blødgør rummet og skaber hurtigt en lun lounge-stemning. Med de rette stoffer og et fald fra loft til gulv får du et rum, der føles færdigt og indbydende.",
      "Vælg farver og strukturer, der binder indretningen sammen, og overvej at hænge gardinerne højt og bredt. Det fremhæver loftshøjden og kan få vinduerne til at virke større.",
    ],
    offer: {
      h: "Tilbud på gardiner til stuen",
      text: "Skal stuen have et nyt udtryk, kan du booke et gratis besøg hos Gardinbus.nu, hvor konsulenten medbringer stofprøver og måler op, så du får et uforpligtende tilbud på gardiner syet efter mål. Du behøver ikke vælge de dyreste stoffer for at opnå en hyggelig stemning — lette, luftige stoffer kan sagtens gøre det, eventuelt suppleret med [lamelgardiner](blog/lamelgardiner.html) eller [rullegardiner](blog/rullegardiner.html) ved de vinduer, hvor du har brug for mere lysstyring.",
    },
    related: [
      { href: "blog/foldegardiner.html", label: "Foldegardiner" },
      { href: "blog/gardiner-om-efteraaret-hygge.html", label: "Efterårshygge" },
    ],
  },
  {
    slug: "insektnet-indeklima",
    title: "Insektnet giver bedre indeklima",
    accent: ["#e6efdc", "#8fbf6a"],
    supplier: "insektnet",
    link: { href: "blog/insektnet-til-vinduer-og-doere.html", text: "Læs guide til insektnet" },
    body: [
      "Et godt indeklima starter med frisk luft — men åbne vinduer inviterer også insekter indenfor. Med et insektnet kan du lufte ud hele sommeren uden at få myg, fluer og hvepse ind i hjemmet.",
      "Insektnet fås blandt andet som rullegardin, plissé og skydedør, så der findes løsninger til både vinduer og døre, og de er nemme at betjene i hverdagen. En lille løsning, der kan gøre en stor forskel for komforten.",
    ],
    offer: {
      h: "Tilbud på insektnet",
      text: "Gardinbus.nu tilbyder insektnet til vinduer og døre, og du kan få et gratis og uforpligtende tilbud efter et besøg med opmåling. Prisen afhænger af typen af net og størrelsen på dine vinduer og døre. Står du alligevel over for nye gardiner, kan det være praktisk at bede om et samlet tilbud på både insektnet og fx [plisségardiner](blog/plissegardiner.html) eller [lamelgardiner](blog/lamelgardiner.html) ved samme besøg.",
    },
    related: [
      { href: "blog/insektnet-til-vinduer-og-doere.html", label: "Insektnet" },
      { href: "blog/privatlivsfilm-til-vinduer.html", label: "Privatlivsfilm" },
    ],
  },
  {
    slug: "rullegardiner-til-hvert-rum",
    title: "Rullegardiner til ethvert rum",
    supplier: "produkter",
    link: { href: "blog/rullegardiner.html", text: "Læs guide til rullegardiner" },
    body: [
      "Rullegardiner er en af de mest alsidige gardinløsninger. De er enkle at betjene, fylder næsten ingenting og passer lige så godt i køkkenet og badeværelset som i børneværelset. Med mange farver og stoffer at vælge imellem kan du style dem, så de matcher resten af boligen — eller lade dem stå diskrete og enkle.",
      "Ønsker du mørklægning, lysfiltrering eller bare et rent, minimalistisk udtryk, findes der en rullegardin-løsning til det. De er også et oplagt valg, hvis du skal indrette et rum helt forfra og gerne vil have noget, der er nemt at holde rent.",
    ],
    offer: {
      h: "Få et uforpligtende tilbud fra Gardinbus.nu",
      text: "Gardinbus.nu tilbyder et gratis besøg, hvor en konsulent viser prøver på rullegardiner i forskellige farver og stoftætheder, måler dine vinduer op og derefter giver et uforpligtende tilbud. Mangler du inspiration til andre rum, kan du samtidig spørge til [persienner](blog/persienner.html) eller [plisségardiner](blog/plissegardiner.html) som alternativ.",
    },
    related: [
      { href: "blog/plissegardiner.html", label: "Plisségardiner" },
      { href: "blog/solfilmsrullegardiner.html", label: "Solfilmsrullegardiner" },
    ],
  },
  {
    slug: "praecis-lys-persienner",
    title: "Præcis lysstyring med persienner",
    supplier: "persienner",
    link: { href: "blog/persienner.html", text: "Læs guide til persienner" },
    body: [
      "Persienner giver dig fin kontrol over lys og indblik. Ved at vinkle lamellerne kan du lukke solen ude, mens du stadig får dagslys ind, eller dreje dem helt i for fuldt privatliv.",
      "Både metal- og træpersienner findes i mange farver og bredder, så der er løsninger til både kontoret og de private rum i hjemmet. De er robuste, lette at rengøre og et klassisk valg, der sjældent går af mode.",
    ],
    offer: {
      h: "Få et uforpligtende tilbud på persienner",
      text: "Hos Gardinbus.nu kan du booke et gratis hjemmebesøg, hvor konsulenten medbringer prøver på persienner i forskellige farver og materialer, måler op og giver et uforpligtende tilbud. Overvejer du i stedet [træpersienner](blog/traepersienner.html) eller [lamelgardiner](blog/lamelgardiner.html), kan du spørge til dem ved samme besøg.",
    },
    related: [
      { href: "blog/traepersienner.html", label: "Træpersienner" },
      { href: "blog/lamelgardiner.html", label: "Lamelgardiner" },
    ],
  },
  {
    slug: "blodt-udtryk-foldegardiner",
    title: "Det bløde udtryk med foldegardiner",
    supplier: "produkter",
    link: { href: "blog/foldegardiner.html", text: "Læs guide til foldegardiner" },
    body: [
      "Foldegardiner samler stoffet i bløde, vandrette folder, når de trækkes op — et roligt og elegant udtryk, der passer godt til stuen og soveværelset. De giver et varmere og mere tekstilrigt look end et rent rullegardin, uden at være tunge at betjene.",
      "Med det rette stofvalg kan foldegardiner både dæmpe lyd, filtrere dagslys og skabe en hyggelig stemning i rummet. De er også et godt valg, hvis du vil style et vindue lidt mere personligt.",
    ],
    offer: {
      h: "Få et uforpligtende tilbud på foldegardiner",
      text: "Ved et gratis besøg fra Gardinbus.nu kan du mærke stofferne og se farverne i dit eget lys, og når konsulenten har målt op, får du et uforpligtende tilbud. Er du i tvivl om stilen, kan du samtidig se på [gardiner](blog/gardiner.html) eller [plisségardiner](blog/plissegardiner.html) som alternativ.",
    },
    related: [
      { href: "blog/gardiner.html", label: "Gardiner" },
      { href: "blog/plissegardiner.html", label: "Plisségardiner" },
    ],
  },
  {
    slug: "hold-varmen-solfilm",
    title: "Hold varmen og solen ude med solfilm",
    supplier: "produkter",
    link: { href: "blog/solfilm-til-vinduer.html", text: "Læs guide til solfilm" },
    body: [
      "Bliver stuen eller soveværelset til et drivhus, når solen skinner? Solfilm på ruderne kan reducere varmeindstrålingen markant og skærme for en stor del af solens UV-stråler, afhængigt af filmtype — uden at du behøver gå på kompromis med dagslyset eller udsigten.",
      "Solfilm findes i flere styrker og udtryk, fra næsten usynlig til let spejlende, og kan kombineres med gardiner eller persienner for bedre kontrol over lys og varme hen over dagen. Et oplagt emne at undersøge, hvis sommeren plejer at blive for varm indenfor.",
    ],
    offer: {
      h: "Få et uforpligtende tilbud på solfilm",
      text: "Gardinbus.nu har solfilm i sortimentet, og ved et gratis besøg kan du se prøver og få råd om, hvilken styrke der passer til dine vinduer, inden du modtager et uforpligtende tilbud. Skal solfilmen kombineres med tekstiler, kan du samtidig spørge til [rullegardiner](blog/rullegardiner.html) eller [persienner](blog/persienner.html).",
    },
    related: [
      { href: "blog/solfilm-eller-gardiner.html", label: "Solfilm eller gardiner" },
      { href: "blog/termogardiner-spar-paa-varmen.html", label: "Termogardiner" },
    ],
  },
  {
    slug: "rigtige-ophaeng-gardiner",
    title: "Det rigtige ophæng gør hele forskellen",
    supplier: "gardiner",
    link: { href: "blog/gardinstaenger-og-skinner.html", text: "Læs guide til gardinstænger og skinner" },
    body: [
      "Selv de flotteste gardiner kommer ikke til deres ret uden det rigtige ophæng. En gardinstang med ringe giver et blødt, hængende fald, mens en skinne gemmer sig diskret og giver et mere stramt, moderne udtryk — begge dele har deres egen stemning.",
      "Vælger du en stang eller skinne i den rigtige bredde og hænger den lidt højere og bredere end selve vinduet, kan rummet virke både højere og bredere. Et lille greb, der kan løfte hele indretningen.",
    ],
    offer: {
      h: "Få et uforpligtende tilbud på gardiner",
      text: "Overvejer du nye gardiner, tilbyder Gardinbus.nu et gratis besøg med prøver og opmåling, hvor du også kan spørge til ophæng og montering — og om den løsning, du ønsker, kan leveres. Herefter får du et uforpligtende tilbud. Leder du efter nye tekstiler, kan du læse mere om [gardiner](blog/gardiner.html) eller [foldegardiner](blog/foldegardiner.html).",
    },
    related: [
      { href: "blog/gardiner.html", label: "Gardiner" },
      { href: "blog/luxaflex.html", label: "Luxaflex" },
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

// Knap til Gardinbus.nu via affiliate-linket (åbner i nyt vindue). `key` er
// en side i SUPPLIER_PAGES (scripts/supplier.js); uden key = bookingsiden.
function bookBtn(label, cls, key) {
  return `<a class="btn ${cls}" href="${attr(affiliateUrl(key))}" target="_blank" rel="sponsored noopener">${esc(label)}</a>`;
}

// CTA-kort ved siden af booking-teksten. `label` varieres pr. side, så
// call-to-actions ikke er ens overalt.
function ctaCard(label, lead, key) {
  return `        <div class="booking-form cta-card">
          <p class="cta-card-tag">Videre til Gardinbus.nu</p>
          <p class="cta-card-lead">${esc(lead)}</p>
          ${bookBtn(label, "btn-primary btn-block", key)}
          <p class="cta-card-note">${esc(DISCLOSURE_CTA)}</p>
        </div>`;
}

module.exports = {
  affiliateUrl, AFFILIATE_BOOK_URL, SITE, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION, GTM_ID, CITIES, REGION, BLOG, NEWS,
  slugify, esc, attr, bookBtn, ctaCard,
};
