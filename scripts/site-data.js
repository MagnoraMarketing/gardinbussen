// Fælles data + helpers til site-generatoren.
// Rediger byer, blogindlæg og affiliate-formularens URL her.

// Affiliate-booking-link hos Gardinbus. Alle "book"-CTA'er på sitet peger
// hertil. Skift kun denne linje for at opdatere linket overalt.
const AFFILIATE_BOOK_URL = "https://gardinbus.nu/book-gardinbus/?paid=52168&pacid=6a657ff9efcc65.73307574&utm_source=partnerads&utm_medium=affiliate&utm_campaign=52168";

const SITE = "https://bookgardinbussen.online";

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
    metaTitle: "Gardiner: Den komplette guide til valg af gardiner | Gardinbussen",
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
        "En korrekt opmåling er afgørende for et flot fald. Gardinbussen måler op på stedet og monterer det hele, så resultatet sidder perfekt.",
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
    metaTitle: "Rullegardiner: Guide til valg, mørklægning og montering | Gardinbussen",
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
    metaTitle: "Persienner: Alu eller træ? Guide til lysstyring | Gardinbussen",
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
    metaTitle: "Plisségardiner: Fleksibel skærmning til alle vinduer | Gardinbussen",
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
    metaTitle: "Lamelgardiner: Elegant løsning til store vinduer | Gardinbussen",
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
    metaTitle: "Gardinstænger og skinner: Sådan vælger du ophæng | Gardinbussen",
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
  AFFILIATE_BOOK_URL, SITE, CITIES, REGION, BLOG,
  slugify, esc, attr, bookBtn, ctaCard,
};
