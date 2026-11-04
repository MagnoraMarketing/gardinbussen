// Søjlesider i roden af sitet (fx /gardinbus.html). Bygges af build.js med
// landingPage(). Hver side har én klar søgeintention (se
// docs/seo/keyword-map.md), så de ikke konkurrerer med forsiden eller med
// guiderne i /blog/.
//
// Felter: slug, metaTitle (≤ 60 tegn), desc (≤ 155 tegn), h1, crumb, eyebrow,
// about (emner til schema), summary + facts ("Kort fortalt"-boksen, der giver
// et direkte svar til søgemaskiner og AI-svar), intro, sections (se
// contentBlock i build.js), prosCons, faq, related, cards, ctaNote, ctaLead.
// draft: true = bygges med noindex og holdes ude af sitemap og oversigter.
//
// Leverandørfakta må kun komme fra docs/seo/leverandoerkatalog.md.

const BIG_CITIES = [
  ["koebenhavn", "København"], ["aarhus", "Aarhus"], ["odense", "Odense"], ["aalborg", "Aalborg"],
  ["esbjerg", "Esbjerg"], ["roskilde", "Roskilde"], ["kolding", "Kolding"], ["vejle", "Vejle"],
  ["randers", "Randers"], ["silkeborg", "Silkeborg"],
];
const cityLinks = BIG_CITIES.map(([s, n]) => `[${n}](byer/${s}.html)`).join(", ");

module.exports = [
  // ------------------------------------------------------------------
  {
    slug: "gardinbus",
    metaTitle: "Gardinbus: Sådan fungerer en gratis gardinbus",
    desc: "Hvad er en gardinbus, hvad koster den, og hvad får du ud af besøget? Guide til gratis gardinbus med prøver og opmåling – og hvordan du booker.",
    h1: "Gardinbus – sådan fungerer den, og hvad får du ud af et besøg?",
    crumb: "Gardinbus",
    eyebrow: "Guide · Gardinbus",
    about: ["Gardinbus", "Gardiner efter mål", "Opmåling af gardiner"],
    summary: "En gardinbus er en gardinbutik på hjul: En konsulent kører ud til din adresse med prøver på stoffer og gardintyper, rådgiver ved dine egne vinduer, måler op og giver et tilbud på gardiner efter mål. Hos Gardinbus.nu, som dette site henviser til, er besøget, opmålingen og tilbuddet ifølge leverandøren gratis og uforpligtende.",
    facts: [
      ["Hvad er det?", "En gardinkonsulent med prøver, der kommer hjem til dig"],
      ["Pris for besøget", "Gratis og uforpligtende hos Gardinbus.nu (ifølge leverandøren)"],
      ["Dækning", "Jylland, Fyn og Sjælland ifølge Gardinbus.nu — din adresse bekræftes ved booking"],
      ["Du betaler", "Kun for de gardiner, du vælger at bestille"],
    ],
    intro: [
      "Ordet gardinbus dækker over en enkel idé: I stedet for at du tager mål med i butikken, tager butikken prøverne med hjem til dig. Det lyder som en lille forskel, men det ændrer to ting, der ofte går galt, når man køber gardiner — farverne ser anderledes ud i dit eget lys, og målene bliver taget af en, der gør det hver dag.",
      "Her forklarer vi, hvordan et gardinbus-besøg foregår, hvad det koster, hvornår det giver mest mening, og hvad du bør tjekke, før du siger ja til et tilbud.",
    ],
    sections: [
      { h: "Hvad er en gardinbus?", p: [
        "En gardinbus er en mobil gardinforretning. Konsulenten har en bil eller varevogn fyldt med stofprøver, lameller, farvekort og eksempler på betjening og beslag. Ved besøget går I rundt til de vinduer, der skal have nyt, og ser på løsningerne der, hvor de skal hænge.",
        "Flere danske gardinforhandlere kører i dag med gardinbusser, og vilkårene er ikke ens. Nogle tager penge for opmåling eller kørsel, andre har gratis besøg, og montering kan være inkluderet, tilkøb eller betinget af tidspunktet. Derfor er det en god idé at kende spørgsmålene i tjeklisten længere nede.",
        "bookgardinbussen.online er ikke selv en gardinbus. Sitet er en uafhængig guide, der henviser til Gardinbus.nu, som står for booking, besøg, opmåling, tilbud og levering.",
      ]},
      { h: "Sådan foregår et gardinbus-besøg trin for trin", p: [
        { steps: [
          "**Booking:** Du udfylder Gardinbus.nu's bookingformular med adresse og cirka antal vinduer.",
          "**Tidsaftale:** Leverandøren kontakter dig og aftaler et tidspunkt, der passer.",
          "**Prøver og rådgivning:** Konsulenten viser stoffer, farver og gardintyper ved dine vinduer, så du ser dem i dit eget lys.",
          "**Opmåling:** Vinduerne måles op, og I aftaler, om gardinerne skal sidde i rammen, på væggen eller i loftet.",
          "**Tilbud:** Du får et uforpligtende tilbud og bestemmer selv, om du vil bestille.",
          "**Levering og montering:** Aftales med Gardinbus.nu, hvis du takker ja. Spørg til betingelserne for montering, når du booker.",
        ]},
        "Vil du have hele forløbet beskrevet med råd til, hvordan du får det bedste tilbud, så læs [sådan foregår et gardinbus-besøg](hvorfor-gardinbussen.html).",
      ]},
      { h: "Hvad koster en gardinbus?", p: [
        "Selve besøget koster ifølge Gardinbus.nu ikke noget, og det gør opmålingen og tilbuddet heller ikke. Du betaler først, hvis du vælger at bestille gardiner.",
        "Prisen på gardinerne afhænger af gardintype, stof, størrelse og betjening — et stort lamelgardin til en skydedør koster noget andet end et plisségardin til et badeværelsesvindue. Derfor kan ingen give en præcis pris uden at kende målene. Læs mere om prisniveauer og prisfaktorer i guiden [hvad koster gardiner?](blog/hvad-koster-gardiner.html).",
        { tip: "Montering er ikke automatisk gratis. Ifølge Gardinbus.nu er montering gratis ved bestemte bookingtider — spørg derfor, hvad der gælder for det tidspunkt, du booker." },
      ]},
      { h: "Gardinbus, butik eller webshop?", p: [
        "Der er tre almindelige måder at købe gardiner efter mål på. Ingen af dem er altid bedst — det afhænger af, hvor mange vinduer du har, og hvor sikker du er på mål og løsning.",
        { table: {
          caption: "Sammenligning af tre måder at købe gardiner efter mål på",
          head: ["", "Gardinbus", "Fysisk butik", "Webshop"],
          rows: [
            ["Prøver", "Vises i dit eget lys", "Vises i butikkens lys", "Små prøver med posten (hos nogle)"],
            ["Opmåling", "Konsulenten måler op", "Du måler selv, eller butikken kommer ud (varierer)", "Du måler selv"],
            ["Rådgivning", "Ved dine egne vinduer", "Ud fra dine mål og billeder", "Chat, telefon eller vejledninger"],
            ["Din tid", "Én aftale hjemme", "Kørsel og måske flere besøg", "Fleksibelt, men du gør arbejdet"],
            ["Risiko ved målefejl", "Mindre — målene tages af fagfolk", "Afhænger af, hvem der måler", "Din egen — gardiner efter mål kan som regel ikke returneres"],
          ],
        }},
      ]},
      { h: "Hvornår giver en gardinbus mest mening?", p: [
        "Et besøg er især værd at bruge, når opgaven er lidt mere end ét standardvindue:",
        { list: [
          "Du skal have gardiner til mange vinduer eller et helt hus på én gang.",
          "Du har [store vinduer eller skydedøre](blog/gardiner-til-store-vinduer.html), hvor fejl i målene bliver dyre.",
          "Du har [skråvinduer eller ovenlys](blog/gardiner-til-skraavinduer.html), som kræver den rigtige løsning til vinduestypen.",
          "Du er i tvivl om, hvorvidt gardinet skal sidde i rammen eller på væggen.",
          "Du vil have [mørklægning](blog/moerklaegningsgardiner.html), der slutter tæt — her betyder millimeterne noget.",
          "Du er flyttet ind i en ny bolig og vil se flere løsninger side om side.",
          "Du skal have gardiner til en virksomhed, skole eller institution.",
        ]},
        "Omvendt kan du sagtens klare dig uden, hvis du blot skal have et enkelt rullegardin i et standardvindue og er tryg ved at [måle op selv](blog/opmaaling-af-gardiner.html).",
      ]},
      { h: "Tjekliste: Det skal du spørge om, før du booker en gardinbus", p: [
        "Uanset hvilken gardinbus du vælger, giver disse spørgsmål dig et tilbud, du kan sammenligne:",
        { list: [
          "Er besøg, opmåling og tilbud gratis — også hvis jeg ikke bestiller?",
          "Hvad koster montering, og hvornår er den inkluderet?",
          "Hvad er den aktuelle leveringstid?",
          "Hvornår og hvordan skal der betales?",
          "Hvem bærer ansvaret, hvis et gardin ikke passer?",
          "Er tilbuddet skriftligt og specificeret pr. vindue (produkt, stof, mål, betjening)?",
          "Hvilken garanti og reklamationsret gælder?",
        ]},
        "For Gardinbus.nu finder du de gældende vilkår i leverandørens handelsbetingelser — læs dem, før du accepterer et tilbud.",
      ]},
      { h: "Gardinbus i nærheden — kommer den til din by?", p: [
        "Gardinbus.nu oplyser, at de dækker Jylland, Fyn og Sjælland, også mindre byer og landdistrikter. Din adresse bekræftes, når du booker. Dækning af Bornholm og mindre øer er ikke bekræftet — spørg leverandøren, hvis du bor der.",
        `I vores byguides kan du se typiske boliger og gardinløsninger i dit område, fx ${cityLinks}. Alle 70 byguides finder du på [forsiden](/#omraade).`,
      ]},
    ],
    faq: [
      { q: "Er en gardinbus gratis?", a: "Det afhænger af udbyderen. Hos Gardinbus.nu er besøget, rådgivningen, opmålingen og tilbuddet ifølge leverandøren gratis og uforpligtende. Du betaler kun, hvis du bestiller gardiner." },
      { q: "Skal jeg købe noget, når gardinbussen har været der?", a: "Nej. Tilbuddet er uforpligtende, så du kan tage dig tid til at overveje det og sammenligne med andre tilbud." },
      { q: "Hvad er forskellen på en gardinbus og en gardinmontør?", a: "En gardinbus sælger gardiner: konsulenten viser prøver, måler op og giver et tilbud. En gardinmontør sætter gardiner op, som allerede er købt. Nogle gardinbusser tilbyder også montering — hos Gardinbus.nu tilbydes montering, men den er kun gratis ved bestemte bookingtider." },
      { q: "Hvad skal jeg forberede før besøget?", a: "Tænk over, hvilke rum og vinduer der skal have nyt, og hvad der er vigtigst i hvert rum: mørklægning, indkigsværn, varme eller udseende. Ryd vindueskarmene, og find ud af, om du må bore, hvis du bor til leje eller i andelsbolig." },
      { q: "Kommer gardinbussen også til erhverv?", a: "Ja. Gardinbus.nu oplyser, at de også besøger kontorer, skoler, plejehjem og andre institutioner, og at besøget også er gratis for erhverv." },
      { q: "Er bookgardinbussen.online det samme som Gardinbus.nu?", a: "Nej. bookgardinbussen.online er et selvstændigt guide-site, der henviser til Gardinbus.nu via affiliate-links. Booking, besøg, tilbud og levering aftales direkte med Gardinbus.nu." },
    ],
    related: {
      text: "Vil du blive klogere, før du booker? Disse sider hænger tæt sammen med et gardinbus-besøg.",
      links: [
        { href: "hvorfor-gardinbussen.html", label: "Sådan foregår et gardinbus-besøg" },
        { href: "gratis-gardinmaaling.html", label: "Gratis gardinmåling" },
        { href: "gardiner-efter-maal.html", label: "Gardiner efter mål" },
      ],
    },
    ctaNote: "Klar til at se prøverne i dit eget lys? Book et gratis og uforpligtende besøg hos Gardinbus.nu — leverandøren ringer og aftaler en tid.",
    ctaLead: "Book et gratis besøg med prøver, opmåling og et uforpligtende tilbud hos Gardinbus.nu.",
    llmsDesc: "Hvad en gardinbus er, hvordan et besøg foregår, hvad det koster, og hvad du bør spørge om, før du booker.",
  },

  // ------------------------------------------------------------------
  {
    slug: "gratis-gardinmaaling",
    metaTitle: "Gratis gardinmåling – få dine vinduer målt op hjemme",
    desc: "Gratis opmåling af gardiner: hvad er inkluderet, hvorfor det kan betale sig, og hvad du skal tjekke i tilbuddet bagefter. Sådan booker du det.",
    h1: "Gratis gardinmåling – få dine vinduer målt op af en fagperson",
    crumb: "Gratis gardinmåling",
    eyebrow: "Guide · Gratis opmåling",
    about: ["Opmåling af gardiner", "Gardiner efter mål", "Gardinbus"],
    summary: "Gratis gardinmåling betyder, at en gardinkonsulent kommer hjem og måler dine vinduer op uden beregning — som regel som en del af et besøg, hvor du også ser prøver og får et tilbud. Via Gardinbus.nu er besøg, opmåling og tilbud ifølge leverandøren gratis og uforpligtende, så du betaler kun, hvis du siger ja til tilbuddet.",
    facts: [
      ["Pris for opmålingen", "0 kr. hos Gardinbus.nu (ifølge leverandøren)"],
      ["Forpligtelse", "Ingen — tilbuddet er uforpligtende"],
      ["Det bliver målt", "Bredde, højde, monteringssted, betjeningsside og forhindringer"],
      ["Bagefter", "Du får et tilbud og beslutter selv"],
    ],
    intro: [
      "Gardiner efter mål er kun så gode som målene, de er lavet efter. Et plisségardin, der er fem millimeter for bredt, passer ikke ind i rammen, og et mørklægningsgardin, der er for smalt, lukker lys ind i siderne. Derfor er opmålingen det vigtigste — og mest undervurderede — trin, når du køber gardiner.",
      "Her kan du læse, hvad en gratis gardinmåling indeholder, hvornår den kan betale sig, og hvad du bør tjekke i tilbuddet bagefter.",
    ],
    sections: [
      { h: "Hvad indeholder en gratis gardinmåling?", p: [
        "Ved en gratis gardinmåling kommer en konsulent hjem til dig og måler de vinduer op, der skal have nye gardiner. Hos Gardinbus.nu sker det ved samme besøg, hvor du ser prøver og får rådgivning, og du får et uforpligtende tilbud ud fra målene.",
        "Det gratis dækker besøget, rådgivningen, opmålingen og tilbuddet. Selve gardinerne betaler du naturligvis for, hvis du bestiller, og montering er ifølge Gardinbus.nu kun gratis ved bestemte bookingtider. Spørg derfor til montering, når du booker.",
      ]},
      { h: "Hvorfor kan det betale sig at få målt op professionelt?", p: [
        "Der er tre gode grunde til at lade en fagperson tage målene:",
        { list: [
          "**Du kan som udgangspunkt ikke fortryde.** Varer, der er fremstillet efter dine mål, er efter forbrugeraftaleloven normalt undtaget fra den almindelige fortrydelsesret. Et forkert mål er derfor dyrt.",
          "**Producenterne har hver deres fradrag.** Hvor meget der skal trækkes fra for beslag og frigang, varierer fra produkt til produkt. Det ved konsulenten, men det står sjældent tydeligt i en webshop.",
          "**Monteringsstedet er en beslutning.** Skal gardinet sidde i rammen, på væggen eller i loftet? Svaret afhænger af vinduets dybde, håndtag, radiatorer og hvor meget lys du vil lukke ude — og det er lettest at afgøre på stedet.",
        ]},
        { tip: "Spørg i tilbuddet, hvem der bærer ansvaret, hvis et gardin ikke passer. Når leverandøren selv har målt op, er det naturligt at få det afklaret, før du accepterer." },
      ]},
      { h: "Det bliver der målt, når konsulenten kommer", p: [
        { list: [
          "**Lysmål eller udvendigt mål:** Indvendigt i rammen (fx plissé og rullegardiner i rammen) eller udvendigt på væggen.",
          "**Dybde og fals:** Er der plads til beslag og profil i vinduets dybde?",
          "**Højde fra loft til gulv:** Ved løse gardiner og foldegardiner, der skal hænge fra loftet.",
          "**Forhindringer:** Vindueshåndtag, greb, radiatorer, vindueskarme og lister.",
          "**Betjening:** Hvilken side snoren eller kæden skal sidde i, og om der skal være motor.",
          "**Vinduestype:** Fx skråvinduer, ovenlys, terrassedøre og skydedøre, som kræver særlige løsninger.",
        ]},
        "Vil du forstå målene selv — eller måle op til et enkelt vindue — så har vi en trin-for-trin-guide til [opmåling af gardiner](blog/opmaaling-af-gardiner.html).",
      ]},
      { h: "Selv opmåling eller gratis gardinmåling?", p: [
        { table: {
          caption: "Sammenligning af selv opmåling og gratis gardinmåling",
          head: ["", "Du måler selv", "Gratis gardinmåling"],
          rows: [
            ["Pris", "Gratis", "Gratis via Gardinbus.nu (ifølge leverandøren)"],
            ["Tid", "Du skal sætte dig ind i fradrag og monteringstyper", "Konsulenten måler, mens I ser prøver"],
            ["Risiko for fejl", "Din egen", "Mindre — målene tages af fagfolk"],
            ["Rådgivning", "Vejledninger og chat", "Ved dine egne vinduer"],
            ["Passer bedst til", "Et enkelt standardvindue", "Flere vinduer, store glaspartier, skråvinduer og mørklægning"],
          ],
        }},
      ]},
      { h: "Sådan forbereder du dig til opmålingen", p: [
        { list: [
          "Lav en liste over rum og vinduer, og skriv hvad der er vigtigst i hvert rum: mørke, privatliv, varme eller udseende.",
          "Ryd vindueskarmene, så konsulenten kan komme til.",
          "Bor du til leje eller i andelsbolig, så tjek, om du må bore i vægge, lofter og karme.",
          "Gem et par billeder af gardiner, du godt kan lide — det gør rådgivningen mere præcis.",
          "Overvej et budget, og sig det gerne. Så kan konsulenten vise prøver i den rigtige ende.",
          "Sørg for, at alle, der skal være med til at beslutte, kan være hjemme.",
        ]},
      ]},
      { h: "Tjek dette i tilbuddet bagefter", p: [
        "Et godt tilbud er specificeret, så du kan sammenligne det med andre:",
        { list: [
          "Mål, produkt, stof og farve for hvert vindue.",
          "Betjening (snor, kæde, fjeder eller motor) og monteringssted.",
          "Pris for montering, og om den er inkluderet.",
          "Leveringstid og betalingsbetingelser.",
          "Garanti og reklamationsret.",
        ]},
        "Gardinbus.nu's egne vilkår står i leverandørens handelsbetingelser. Læs dem, før du accepterer.",
      ]},
      { h: "Sådan booker du gratis gardinmåling", p: [
        { steps: [
          "Klik på en af knapperne til Gardinbus.nu, og udfyld bookingformularen med adresse og antal vinduer.",
          "Leverandøren ringer og aftaler en tid.",
          "Konsulenten kommer med prøver, måler op og giver et uforpligtende tilbud.",
        ]},
        "Gardinbus.nu oplyser, at de dækker Jylland, Fyn og Sjælland. Se, hvad der gælder i dit område, i vores [byguides](/#omraade), og læs mere om, [hvad en gardinbus er](gardinbus.html).",
      ]},
    ],
    faq: [
      { q: "Er gardinmålingen virkelig gratis?", a: "Ja, ifølge Gardinbus.nu er besøg, rådgivning, opmåling og tilbud gratis og uforpligtende. Du betaler kun for de gardiner, du vælger at bestille. Montering er kun gratis ved bestemte bookingtider." },
      { q: "Skal jeg bestille gardiner efter opmålingen?", a: "Nej. Tilbuddet er uforpligtende, og du bestemmer selv, om du vil gå videre." },
      { q: "Kan jeg ikke bare måle op selv?", a: "Jo, til enkle vinduer kan du sagtens. Men gardiner efter mål kan normalt ikke returneres, og fradrag for beslag varierer fra produkt til produkt. Ved mange vinduer, store glaspartier, skråvinduer eller mørklægning er en professionel opmåling ofte den sikreste vej." },
      { q: "Hvad sker der, hvis gardinet ikke passer?", a: "Det afhænger af leverandørens vilkår, og hvem der har taget målene. Spørg, før du accepterer tilbuddet, og læs leverandørens handelsbetingelser." },
      { q: "Kan der også måles op til skråvinduer og ovenlys?", a: "Nævn skråvinduer og ovenlys, når du booker, så konsulenten kan medbringe de rette prøver, og spørg, hvilke løsninger der kan leveres til netop din vinduestype." },
      { q: "Tilbydes gratis gardinmåling i hele landet?", a: "Gardinbus.nu oplyser, at de dækker Jylland, Fyn og Sjælland, også mindre byer. Din adresse bekræftes ved booking. Bornholm og mindre øer er ikke bekræftet." },
    ],
    related: {
      text: "Disse guides hjælper dig med at blive klar til opmålingen.",
      links: [
        { href: "blog/opmaaling-af-gardiner.html", label: "Sådan måler du op til gardiner" },
        { href: "gardiner-efter-maal.html", label: "Gardiner efter mål" },
        { href: "blog/hvad-koster-gardiner.html", label: "Hvad koster gardiner?" },
      ],
    },
    ctaNote: "Vil du have dine vinduer målt op uden beregning? Book et gratis og uforpligtende besøg hos Gardinbus.nu.",
    ctaLead: "Få dine vinduer målt op gratis og et uforpligtende tilbud — book hos Gardinbus.nu.",
    llmsDesc: "Hvad gratis gardinmåling indeholder, hvorfor professionel opmåling kan betale sig, og hvad du bør tjekke i tilbuddet.",
  },

  // ------------------------------------------------------------------
  {
    slug: "gardiner-efter-maal",
    metaTitle: "Gardiner efter mål – typer, pris og opmåling",
    desc: "Guide til gardiner efter mål: hvilke typer der findes, hvad prisen afhænger af, hvordan du måler op, og hvornår gratis opmåling hjemme kan betale sig.",
    h1: "Gardiner efter mål – guide til typer, pris og opmåling",
    crumb: "Gardiner efter mål",
    eyebrow: "Guide · Gardiner efter mål",
    about: ["Gardiner efter mål", "Plisségardiner", "Rullegardiner", "Persienner", "Lamelgardiner"],
    summary: "Gardiner efter mål bliver produceret til præcis dine vinduer i stedet for i faste standardstørrelser. Det giver en tættere pasform, bedre mørklægning og et pænere resultat, men kræver korrekte mål — og varer lavet efter dine mål kan som udgangspunkt ikke returneres. Prisen afhænger især af gardintype, stof, størrelse og betjening.",
    facts: [
      ["Typer", "Plissé, rullegardiner, duo, persienner, lamel, folde- og løse gardiner"],
      ["Prisen afhænger af", "Type, stof, mål, betjening og montering"],
      ["Opmåling", "Selv — eller gratis hjemme via Gardinbus.nu"],
      ["Returret", "Som udgangspunkt ingen fortrydelsesret på varer lavet efter mål"],
    ],
    intro: [
      "Standardgardiner er billige og lette at få fat i, men danske vinduer følger sjældent standardmålene. Især i ældre boliger, nybyggeri med store glaspartier og huse med skråvinduer ender man ofte med gardiner, der enten er for små, skal skæres til eller lukker lys ind i siderne.",
      "Gardiner efter mål løser det problem. Her får du overblik over typerne, hvad prisen afhænger af, og hvordan du får målene rigtige første gang.",
    ],
    sections: [
      { h: "Hvad er gardiner efter mål?", p: [
        "Gardiner efter mål — også kaldet skræddersyede gardiner eller gardiner i specialmål — bliver produceret ud fra de mål, du eller en konsulent har taget af dine vinduer. Bredde og højde passer derfor præcist, og du kan typisk selv vælge stof, farve, betjeningsside og beslag.",
        "Standardgardiner fås i faste størrelser, og nogle typer kan afkortes en smule i bredden. Det er en god løsning til et enkelt vindue i et standardmål, men pasformen bliver sjældent lige så tæt.",
      ]},
      { h: "Gardiner efter mål eller standardmål?", p: [
        { table: {
          caption: "Gardiner efter mål sammenlignet med standardmål",
          head: ["", "Efter mål", "Standardmål"],
          rows: [
            ["Pasform", "Præcis til vinduet", "Nærmeste størrelse — evt. afkortning"],
            ["Udvalg", "Bredt udvalg af stoffer, farver og betjening", "Begrænset til lagerførte varer"],
            ["Mørklægning", "Tæt pasform giver mindre lysindfald i siderne", "Ofte lysindfald langs kanterne"],
            ["Pris", "Højere", "Lavere"],
            ["Returret", "Som udgangspunkt ingen fortrydelsesret", "Almindelig returret ved køb på nettet"],
            ["Levering", "Produceres efter bestilling", "Typisk på lager"],
          ],
        }},
      ]},
      { h: "Typer af gardiner efter mål", p: [
        "Næsten alle gardintyper kan fås efter mål. Her er de mest udbredte — og hvad de er bedst til:",
        { table: {
          caption: "De mest udbredte typer gardiner efter mål",
          head: ["Gardintype", "Kendetegn", "Velegnet til"],
          rows: [
            ["[Plisségardiner](blog/plissegardiner.html)", "Foldet stof, kan monteres i rammen og styres oppefra og nedefra", "Badeværelse, soveværelse, skråvinduer"],
            ["[Rullegardiner](blog/rullegardiner.html)", "Glat stof på en rulle, enkel betjening", "Alle rum, mørklægning"],
            ["[Duo rullegardiner](blog/duo-rullegardiner.html)", "To lag stof med striber, der kan forskydes", "Stue, køkken, kontor"],
            ["[Persienner](blog/persienner.html)", "Vandrette lameller i alu eller træ", "Køkken, bad, kontor"],
            ["[Træpersienner](blog/traepersienner.html)", "Brede lameller i træ eller trælook", "Stue, soveværelse"],
            ["[Lamelgardiner](blog/lamelgardiner.html)", "Lodrette lameller, der kan drejes og trækkes til side", "Store vinduer, skydedøre, kontorer"],
            ["[Foldegardiner](blog/foldegardiner.html)", "Stoffet samles i bløde, vandrette folder", "Stue, spisestue, soveværelse"],
            ["[Gardiner](blog/gardiner.html)", "Løse stofgardiner på stang eller skinne", "Stue, soveværelse, store vinduer"],
            ["[Mørklægningsgardiner](blog/moerklaegningsgardiner.html)", "Lystæt stof eller foer", "Soveværelse, børneværelse"],
          ],
        }},
        "Er du i tvivl mellem to typer, så se vores sammenligninger: [plissé eller rullegardiner](blog/plissegardiner-eller-rullegardiner.html) og [persienner eller gardiner](blog/persienner-eller-gardiner.html).",
      ]},
      { h: "Hvad koster gardiner efter mål?", p: [
        "Der findes ingen fast pris, fordi gardiner efter mål prissættes ud fra det enkelte vindue. Det er især disse faktorer, der afgør prisen:",
        { list: [
          "**Gardintype:** En simpel rullegardinløsning og et motoriseret lamelgardin ligger i hver sin ende af skalaen.",
          "**Størrelse:** Større vinduer kræver mere stof og kraftigere mekanik.",
          "**Stof og materiale:** Mørklægning, brandhæmmende stof, træ og naturmaterialer påvirker prisen.",
          "**Betjening:** Snor og kæde er billigst; fjeder, børnesikre løsninger og motor koster mere.",
          "**Montering:** Om du selv sætter op, eller om du betaler for montering.",
        ]},
        "Læs mere i guiden [hvad koster gardiner?](blog/hvad-koster-gardiner.html) og om forskellen på [billige gardiner og god kvalitet](blog/billige-gardiner-eller-god-kvalitet.html).",
      ]},
      { h: "Sådan får du målene rigtige", p: [
        { steps: [
          "Beslut, om gardinet skal sidde i vinduesrammen, på væggen eller i loftet.",
          "Mål bredden tre steder (top, midte, bund) og højden tre steder (venstre, midte, højre) med en stålmåler.",
          "Brug det mindste mål ved montering i rammen — og læg til i begge sider ved montering på væggen.",
          "Notér forhindringer som håndtag, radiatorer og vindueskarme.",
          "Tjek producentens vejledning for fradrag, før du bestiller.",
        ]},
        "Hele fremgangsmåden står i guiden [opmåling af gardiner](blog/opmaaling-af-gardiner.html). Vil du hellere have en fagperson til at måle op, kan du få [gratis gardinmåling](gratis-gardinmaaling.html) via Gardinbus.nu.",
      ]},
      { h: "Gardiner efter mål til hvert rum", p: [
        { list: [
          "[Gardiner til stuen](blog/gardiner-til-stuen.html): lys, hygge og privatliv — ofte i lag.",
          "[Gardiner til soveværelset](blog/gardiner-til-sovevaerelset.html): mørklægning og ro.",
          "[Gardiner til børneværelset](blog/gardiner-til-boernevaerelset.html): mørke og børnesikker betjening.",
          "[Gardiner til køkken og badeværelse](blog/gardiner-til-koekken-og-badevaerelse.html): fugt, fedt og indkig.",
          "[Gardiner til kontoret](blog/gardiner-til-kontoret.html): blænding på skærme og varme.",
          "[Gardiner til store vinduer](blog/gardiner-til-store-vinduer.html) og [skråvinduer](blog/gardiner-til-skraavinduer.html).",
        ]},
      ]},
      { h: "Tre måder at bestille gardiner efter mål på", p: [
        "Du kan bestille gardiner efter mål i en fysisk butik, i en webshop eller via en gardinbus, hvor en konsulent kommer hjem til dig. Webshoppen er ofte billigst, men du bærer selv risikoen for målene. Butikken giver rådgivning, men prøverne ser du i butikkens lys. Gardinbussen samler rådgivning, prøver og opmåling hjemme hos dig — læs mere om, [hvordan en gardinbus fungerer](gardinbus.html).",
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved gardiner efter mål",
      pros: [
        "Præcis pasform — også i ældre boliger og ved store eller skæve vinduer.",
        "Bedre mørklægning og mindre lysindfald langs kanterne.",
        "Stort udvalg af stoffer, farver og betjeningsformer.",
        "Kan monteres pænt i vinduesrammen.",
      ],
      cons: [
        "Højere pris end standardgardiner.",
        "Produceres efter bestilling, så der er leveringstid.",
        "Som udgangspunkt ingen fortrydelsesret — målene skal være rigtige.",
      ],
    },
    faq: [
      { q: "Hvad er gardiner efter mål?", a: "Gardiner, der produceres ud fra målene på dine egne vinduer i stedet for i faste standardstørrelser. De passer derfor præcist, og du kan typisk vælge stof, farve og betjening." },
      { q: "Kan jeg returnere gardiner efter mål?", a: "Som udgangspunkt nej. Varer, der er fremstillet efter forbrugerens specifikationer, er normalt undtaget fra fortrydelsesretten i forbrugeraftaleloven. Reklamationsretten ved fejl gælder stadig." },
      { q: "Hvor lang leveringstid er der på gardiner efter mål?", a: "Det varierer mellem leverandører og produkter, fordi gardinerne produceres efter bestilling. Spørg om den aktuelle leveringstid, når du får tilbuddet." },
      { q: "Hvilke gardiner efter mål er bedst til mørklægning?", a: "Rullegardiner og plisségardiner i mørklægningsstof, der sidder tæt i rammen, giver typisk det mørkeste resultat. Løse gardiner med mørklægningsfoer kan kombineres for at dække kanterne." },
      { q: "Er gardiner efter mål dyre?", a: "De koster mere end standardgardiner, men prisen spænder vidt afhængigt af type, stof, størrelse og betjening. Et tilbud baseret på dine egne mål er den eneste måde at få en præcis pris på." },
      { q: "Kan jeg få gardiner efter mål målt op gratis?", a: "Ja. Via Gardinbus.nu er besøg, opmåling og tilbud ifølge leverandøren gratis og uforpligtende." },
    ],
    related: {
      text: "Find den gardintype, der passer til dine vinduer — eller få dem målt op gratis.",
      links: [
        { href: "gratis-gardinmaaling.html", label: "Gratis gardinmåling" },
        { href: "blog/saadan-vaelger-du-gardiner.html", label: "Sådan vælger du de rigtige gardiner" },
        { href: "blog/hvad-koster-gardiner.html", label: "Hvad koster gardiner?" },
      ],
    },
    cards: null,
    ctaNote: "Vil du have gardiner efter mål uden selv at måle op? Gardinbus.nu tilbyder et gratis og uforpligtende besøg med prøver og opmåling.",
    ctaLead: "Se gardiner efter mål i dit eget lys — book et gratis besøg med opmåling hos Gardinbus.nu.",
    llmsDesc: "Overblik over gardiner efter mål: typer, prisfaktorer, opmåling, returret og fordele/ulemper sammenlignet med standardmål.",
  },
];
