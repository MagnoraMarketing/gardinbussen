// Nye guides (november 2026). Lægges ind i BLOG i site-data.js.
// Samme format som de øvrige indlæg (se kommentaren over BLOG i
// site-data.js) + valgfrit: summary/facts ("Kort fortalt"), prosCons,
// tabeller/trin i sections (se contentBlock i build.js) og topic (bruges af
// seo-sections.js, så nye indlæg ikke kræver en ekstra liste).
//
// Produkter, der ikke er bekræftet i Gardinbus.nu's sortiment (fx duo
// rullegardiner), beskrives som generel viden med "spørg konsulenten".

module.exports = [
  // ------------------------------------------------------------------
  {
    slug: "moerklaegningsgardiner",
    category: "Gardintyper",
    metaTitle: "Mørklægningsgardiner: Komplet guide til mørke rum",
    h1: "Mørklægningsgardiner — komplet guide til et mørkt soveværelse",
    tag: "Mørklægningsgardiner",
    supplier: "gardiner",
    desc: "Mørklægningsgardiner forklaret: fuld mørklægning vs. dimout, de bedste typer, montering uden lysindfald og typiske fejl. Guide før du vælger.",
    summary: "Mørklægningsgardiner er gardiner i et lystæt stof, der holder dagslys, gadelys og tidlig morgensol ude. Det mørkeste resultat får du med et rullegardin eller plisségardin i mørklægningsstof, der sidder tæt i vinduesrammen — evt. kombineret med løse gardiner, der dækker kanterne. Afgørende er ikke kun stoffet, men hvor tæt gardinet slutter om vinduet.",
    facts: [
      ["Mørkest", "Rullegardin eller plissé i mørklægningsstof, monteret tæt i rammen"],
      ["Dimout", "Dæmper lyset kraftigt, men er ikke helt lystæt"],
      ["Største fejl", "Lysindfald langs siderne og over gardinet"],
      ["Bedst til", "Soveværelse, børneværelse, hjemmebiograf og skiftende arbejdstider"],
    ],
    intro: [
      "Om sommeren står solen op, før de fleste har lyst, og om vinteren lyser gadelamper og biler ind ad vinduet. Begge dele kan forstyrre søvnen — især for børn og for dem, der arbejder om natten.",
      "Mørklægningsgardiner løser problemet, men kun hvis du vælger den rigtige type og monterer den rigtigt. Her er det, du skal vide.",
    ],
    sections: [
      { h: "Fuld mørklægning eller dimout?", p: [
        "Producenter bruger forskellige betegnelser, men overordnet findes der to niveauer:",
        { list: [
          "**Fuld mørklægning (blackout):** Stoffet er lystæt, typisk med en belægning eller flere lag. Rummet bliver så mørkt, som monteringen tillader.",
          "**Dimout eller lysdæmpende:** Stoffet dæmper lyset kraftigt, men et svagt lys trænger igennem. Det er nok for mange voksne, men ikke for alle børn eller lyssky sovere.",
        ]},
        "Hold et stofprøve op mod et vindue i dagslys. Kan du se lyset gennem stoffet, er det ikke fuld mørklægning — uanset hvad etiketten siger.",
      ]},
      { h: "De bedste typer mørklægningsgardiner", p: [
        { table: {
          caption: "Typer af mørklægningsgardiner",
          head: ["Type", "Mørklægning", "Kendetegn"],
          rows: [
            ["[Rullegardin](rullegardiner.html) i mørklægningsstof", "Meget god", "Enkel, billig og pladsbesparende — tættest i rammen eller med sideskinner"],
            ["[Plisségardin](plissegardiner.html) i mørklægningsstof", "Meget god", "Sidder i rammen og kan bruges på vinduer, der åbnes; findes med honeycomb-stof"],
            ["Løse [gardiner](gardiner.html) med mørklægningsfoer", "God", "Blødt udtryk, dæmper lyd og dækker kanterne, når de hænges bredt og højt"],
            ["[Foldegardiner](foldegardiner.html) med mørklægningsfoer", "God", "Elegant, men lys kan slippe ind langs siderne"],
            ["[Persienner](persienner.html)", "Begrænset", "Lameller lukker aldrig helt tæt — ikke en mørklægningsløsning alene"],
          ],
        }},
        "Den mørkeste løsning er ofte en kombination: et mørklægningsrullegardin eller plissé i rammen og løse gardiner foran, der tager det sidste lys langs kanterne og giver et blødere udtryk.",
      ]},
      { h: "Sådan undgår du lysindfald langs kanterne", p: [
        "De fleste skuffelser skyldes ikke stoffet, men monteringen. Lys finder vej gennem selv små sprækker:",
        { list: [
          "**Montering i rammen** giver en tæt pasform, men efterlader en lille sprække i siderne. Sideskinner eller en profil kan lukke den.",
          "**Montering på væggen** skal gå mindst 5–10 cm ud over vinduet i alle sider for at dække lyset — mere, hvis der er langt fra væg til rude.",
          "**Toppen** er et klassisk hul: En kappe eller kassette over rullegardinet lukker lyset over rullen ude.",
          "**Løse gardiner** skal hænges fra loftet eller tæt under loftet og gå et godt stykke forbi vinduet i siderne.",
        ]},
        "Fordi millimeterne betyder så meget, er mørklægning et af de steder, hvor en [professionel opmåling](../gratis-gardinmaaling.html) giver mest værdi.",
      ]},
      { h: "Mørklægning til skråvinduer og ovenlys", p: [
        "Skråvinduer og ovenlys lukker meget lys ind, fordi de vender mod himlen. Her skal gardinet holdes på plads i vinklen, typisk med sideskinner eller et beslag, der passer til netop din vinduestype. Læs mere i guiden [gardiner til skråvinduer](gardiner-til-skraavinduer.html).",
      ]},
      { h: "Typiske fejl ved valg af mørklægningsgardiner", p: [
        { list: [
          "At vælge dimout, når man har brug for fuld mørklægning.",
          "At måle til lysmålet, når gardinet skal sidde på væggen — så bliver det for smalt.",
          "At glemme lysindfaldet over rullen.",
          "At vælge en mørk farve mod gaden i tro om, at det giver mere mørke. Det er belægningen, ikke farven, der afgør det — og en lys bagside reflekterer mere varme om sommeren.",
        ]},
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved mørklægningsgardiner",
      pros: [
        "Bedre søvn i lyse sommernætter og ved gadelys.",
        "Dæmper varme fra sollys om sommeren og giver lidt ekstra isolering om vinteren.",
        "Giver fuldt privatliv om aftenen.",
        "Fås i mange typer, farver og stoffer.",
      ],
      cons: [
        "Rummet bliver mørkt om dagen, hvis gardinet ikke kombineres med et lysere lag.",
        "Kræver præcis opmåling og montering for at virke.",
        "Mørklægningsstof er ofte stivere og tungere end almindeligt gardinstof.",
      ],
    },
    faq: [
      { q: "Hvilke gardiner mørklægger bedst?", a: "Rullegardiner og plisségardiner i mørklægningsstof, monteret tæt i vinduesrammen, giver typisk det mørkeste resultat. Kombinér gerne med løse gardiner, der dækker kanterne." },
      { q: "Hvad er forskellen på mørklægning og dimout?", a: "Mørklægning (blackout) er lystæt stof. Dimout dæmper lyset kraftigt, men et svagt lys trænger stadig igennem." },
      { q: "Kan mørklægningsgardiner holde på varmen?", a: "Tætsluttende mørklægningsgardiner kan mindske varmetab og træk ved vinduet og holde solvarme ude om sommeren. Effekten afhænger af stof, foer og hvor tæt gardinet sidder." },
      { q: "Hvordan undgår jeg lys langs siderne?", a: "Brug sideskinner eller profiler ved montering i rammen, eller monter gardinet på væggen, så det går godt ud over vinduet i alle sider. En kassette over rullen lukker lyset i toppen ude." },
    ],
    related: {
      text: "Mørklægning handler om både stof, gardintype og rum. Læs videre her.",
      links: [
        { slug: "gardiner-til-sovevaerelset", label: "Gardiner til soveværelset" },
        { slug: "gardiner-til-boernevaerelset", label: "Gardiner til børneværelset" },
        { slug: "plissegardiner-eller-rullegardiner", label: "Plissé eller rullegardiner?" },
      ],
    },
    topic: { product: "mørklægningsgardiner", intro: "Mørklægning virker kun, hvis gardinet slutter tæt om vinduet, så en præcis opmåling er afgørende.", related: ["gardiner-til-sovevaerelset", "rullegardiner", "plissegardiner"] },
    ctaNote: "Vil du se mørklægningsstoffer i dit eget vindue? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },

  // ------------------------------------------------------------------
  {
    slug: "duo-rullegardiner",
    category: "Gardintyper",
    metaTitle: "Duo rullegardiner: Sådan virker de – fordele og ulemper",
    h1: "Duo rullegardiner — lys og indkig styret med to lag stof",
    tag: "Duo rullegardiner",
    supplier: "produkter",
    desc: "Duo rullegardiner har to lag stof med striber, der kan forskydes. Læs hvordan de virker, hvor de passer, fordele og ulemper, og hvordan du holder dem rene.",
    summary: "Et duo rullegardin (også kaldet zebra-, dag-og-nat- eller double-rullegardin) består af ét langt stof, der løber to gange rundt om rullen, med skiftevis tætte og transparente striber. Når striberne forskydes, går gardinet fra åbent udsyn til lukket indkigsværn — uden at du skal rulle det op. Det er ikke en fuld mørklægning.",
    facts: [
      ["Kaldes også", "Zebra-, dag-og-nat- eller double-rullegardin"],
      ["Princip", "To lag stof med striber, der forskydes i forhold til hinanden"],
      ["Bedst til", "Stue, køkken, kontor og hjemmekontor"],
      ["Ikke til", "Fuld mørklægning"],
    ],
    intro: [
      "Duo rullegardiner er blevet populære, fordi de løser et klassisk dilemma: Du vil gerne have lys ind, men ikke have naboerne kiggende med. Et almindeligt rullegardin er enten oppe eller nede — et duo rullegardin kan stå imellem.",
    ],
    sections: [
      { h: "Sådan virker et duo rullegardin", p: [
        "Stoffet har vandrette striber, der skiftevis er tætte og transparente. Fordi stoffet hænger i to lag, kan du forskyde striberne: Står de transparente striber ud for hinanden, ser du igennem. Står de tætte striber over de transparente, er gardinet lukket.",
        "Du kan stadig rulle hele gardinet op, når du vil have fri udsigt. Betjeningen sker typisk med kæde, men findes også med motor.",
      ]},
      { h: "Hvor passer duo rullegardiner bedst?", p: [
        { list: [
          "**Stuen:** Dæmper blænding på tv-skærmen og giver privatliv om aftenen uden at lukke helt af.",
          "**Køkken og alrum:** Moderne, enkelt udtryk, der ikke fylder.",
          "**Kontor og [hjemmekontor](solafskaermning-hjemmekontor.html):** Lyset kan reguleres i løbet af dagen.",
          "**Vinduer mod gade eller nabo:** Indkigsværn uden at gøre rummet mørkt.",
        ]},
        "I soveværelset er et duo rullegardin sjældent nok alene, fordi de transparente striber lukker lys ind. Her er et [mørklægningsgardin](moerklaegningsgardiner.html) et bedre valg.",
      ]},
      { h: "Duo rullegardin, almindeligt rullegardin eller persienne?", p: [
        { table: {
          caption: "Duo rullegardiner sammenlignet med rullegardiner og persienner",
          head: ["", "Duo rullegardin", "Rullegardin", "Persienne"],
          rows: [
            ["Lysregulering", "Trinløst via striberne", "Op/ned", "Trinløst via lamellerne"],
            ["Indkigsværn med lys", "God", "Kun med transparent stof", "God"],
            ["Mørklægning", "Ikke fuld", "Mulig med mørklægningsstof", "Ikke fuld"],
            ["Rengøring", "Støvsug eller tør af", "Støvsug eller tør af", "Hver lamel skal aftørres"],
            ["Udtryk", "Moderne, grafisk", "Enkelt, neutralt", "Klassisk eller varmt (træ)"],
          ],
        }},
      ]},
      { h: "Rengøring og vedligeholdelse", p: [
        "Støv duo rullegardinet af med en blød børste eller støvsugerens møbelmundstykke, mens det er rullet ned og lukket. Pletter tørres forsigtigt af med en fugtig klud og mild sæbe — gnid ikke, da belægningen kan tage skade. Læs også vores guide til [vedligeholdelse af gardiner](vedligeholdelse-af-gardiner.html).",
      ]},
      { h: "Kan duo rullegardiner leveres via gardinbussen?", p: [
        "Duo rullegardiner er ikke nævnt særskilt i Gardinbus.nu's sortiment, som vi har gennemgået. Rullegardiner indgår i sortimentet, så spørg konsulenten ved besøget, om en duo-løsning kan leveres til dine vinduer.",
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved duo rullegardiner",
      pros: [
        "Indkigsværn og dagslys på samme tid.",
        "Moderne og pladsbesparende.",
        "Nem betjening og nem at holde ren.",
      ],
      cons: [
        "Giver ikke fuld mørklægning.",
        "Det grafiske stribemønster passer ikke til alle stilarter.",
        "Lys kan slippe ind langs siderne som ved andre rullegardiner.",
      ],
    },
    faq: [
      { q: "Hvad er et duo rullegardin?", a: "Et rullegardin med to lag stof i skiftevis tætte og transparente striber. Ved at forskyde striberne regulerer du lys og indkig uden at rulle gardinet op." },
      { q: "Kan duo rullegardiner mørklægge?", a: "Nej, ikke helt. De transparente striber lukker lys ind, også når gardinet er lukket. Vælg et mørklægningsrullegardin eller plissé, hvis du har brug for mørke." },
      { q: "Er duo rullegardiner det samme som zebragardiner?", a: "Ja. Duo, zebra, dag-og-nat og double er forskellige navne for samme princip." },
    ],
    related: {
      text: "Overvejer du duo rullegardiner, kan disse guides hjælpe dig med at sammenligne.",
      links: [
        { slug: "rullegardiner", label: "Rullegardiner" },
        { slug: "persienner-eller-gardiner", label: "Persienner eller gardiner?" },
        { slug: "gardiner-til-privatliv", label: "Gardiner til privatliv" },
      ],
    },
    topic: { product: "nye rullegardiner", intro: "Duo rullegardiner skal passe præcist i vinduet, og stribernes bredde ser du bedst i dit eget lys.", related: ["rullegardiner", "persienner", "gardiner-til-privatliv"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "saadan-vaelger-du-gardiner",
    category: "Valg af gardiner",
    metaTitle: "Sådan vælger du de rigtige gardiner – trin for trin",
    h1: "Sådan vælger du de rigtige gardiner — en guide i fem trin",
    tag: "Sådan vælger du gardiner",
    supplier: "book",
    desc: "Sådan vælger du de rigtige gardiner: Start med rummets behov, vælg gardintype, stof, farve og ophæng, og få målene rigtige. Guide med tjekliste.",
    summary: "Start med funktionen, ikke med stoffet: Afgør for hvert rum, om gardinet skal give mørke, privatliv, solafskærmning, varme eller blot udseende. Vælg derefter gardintype, så stof og farve, og til sidst ophæng og monteringssted. Mål op til sidst — eller få målt op gratis — når du ved, hvor gardinet skal sidde.",
    facts: [
      ["Trin 1", "Hvad skal gardinet kunne i rummet?"],
      ["Trin 2", "Vælg gardintype"],
      ["Trin 3", "Vælg stof og farve i dit eget lys"],
      ["Trin 4–5", "Ophæng og opmåling"],
    ],
    intro: [
      "Mange begynder med farven eller et billede fra et magasin. Det er forståeligt, men det er den mest almindelige grund til, at nye gardiner skuffer: De er pæne, men de mørklægger ikke, de lukker for meget lys ude, eller de passer ikke til vinduet.",
      "Følg i stedet de fem trin her. Så ender du med gardiner, der både ser godt ud og gør det, du har brug for.",
    ],
    sections: [
      { h: "Trin 1: Hvad skal gardinet kunne?", p: [
        "Skriv for hvert rum, hvad der er vigtigst. Typisk er det ét eller to af disse behov:",
        { table: {
          caption: "Behov og gode gardintyper",
          head: ["Behov", "Gode løsninger"],
          rows: [
            ["Mørke til søvn", "[Mørklægningsgardiner](moerklaegningsgardiner.html), plissé eller rullegardin i mørklægningsstof"],
            ["Privatliv med dagslys", "[Duo rullegardiner](duo-rullegardiner.html), persienner, plissé der styres nedefra-op"],
            ["Sol og blænding", "[Screengardiner](screengardiner.html), [solfilm](solfilm-til-vinduer.html), lyse rullegardiner"],
            ["Varme og træk", "Løse gardiner med foer, [termogardiner](termogardiner-spar-paa-varmen.html), honeycomb-plissé"],
            ["Hygge og akustik", "Løse [gardiner](gardiner.html) og [foldegardiner](foldegardiner.html) i stof"],
          ],
        }},
      ]},
      { h: "Trin 2: Vælg gardintype", p: [
        "Når behovet er på plads, indsnævrer du typerne. Overvej også vinduet: Skal det kunne åbnes? Er det en terrassedør, et [stort glasparti](gardiner-til-store-vinduer.html) eller et [skråvindue](gardiner-til-skraavinduer.html)? Plissé og rullegardiner i rammen følger vinduet, når det åbnes, mens løse gardiner og lamelgardiner kræver plads til siden.",
        "I tvivl mellem to? Se [plissé eller rullegardiner](plissegardiner-eller-rullegardiner.html) og [persienner eller gardiner](persienner-eller-gardiner.html).",
      ]},
      { h: "Trin 3: Vælg stof og farve i dit eget lys", p: [
        "Farver ændrer sig markant med lyset. Et hvidt stof kan virke koldt mod nord og gulligt i aftensol, og en grå nuance kan blive næsten blå. Se derfor altid stofprøver i det rum, gardinet skal hænge i — både om dagen og om aftenen. Læs mere i guiden [sådan vælger du farver på gardiner](farver-paa-gardiner.html).",
        "Tænk også over materialet: Hør og bomuld giver et naturligt fald, polyester er let at vedligeholde, og i fugtige rum er et fugtbestandigt stof en fordel.",
      ]},
      { h: "Trin 4: Ophæng og monteringssted", p: [
        "Skal gardinet sidde i vinduesrammen, på væggen eller i loftet? Rammen giver et stramt udtryk og lader karmen være fri. Væggen og loftet får vinduet og loftshøjden til at virke større og dækker bedre for lyset. Se også [gardinstænger og skinner](gardinstaenger-og-skinner.html).",
      ]},
      { h: "Trin 5: Opmåling", p: [
        "Først når monteringsstedet er besluttet, giver det mening at måle op. Du kan [måle op selv](opmaaling-af-gardiner.html) — men ved mange vinduer, mørklægning eller specielle vinduer kan [gratis gardinmåling](../gratis-gardinmaaling.html) spare dig for dyre fejl, fordi gardiner efter mål normalt ikke kan returneres.",
      ]},
      { h: "Tjekliste før du bestiller", p: [
        { list: [
          "Har jeg skrevet behovet ned for hvert rum?",
          "Har jeg set stofprøverne i rummet — både dag og aften?",
          "Er monteringssted og betjeningsside besluttet?",
          "Er målene taget tre steder i bredde og højde?",
          "Har jeg et skriftligt tilbud pr. vindue med montering, leveringstid og betaling?",
        ]},
      ]},
    ],
    faq: [
      { q: "Hvordan vælger jeg de rigtige gardiner?", a: "Start med, hvad gardinet skal kunne i rummet (mørke, privatliv, solafskærmning, varme eller udseende). Vælg derefter gardintype, stof og farve, og til sidst ophæng og opmåling." },
      { q: "Hvilke gardiner er bedst til stuen?", a: "Mange vælger en kombination: løse gardiner eller foldegardiner for hygge og akustik, og plissé, persienner eller duo rullegardiner til at styre lys og indkig." },
      { q: "Skal gardiner sidde i rammen eller på væggen?", a: "I rammen giver et stramt udtryk og fri vindueskarm. På væggen eller i loftet dækker bedre for lyset og får vinduet til at virke større. Valget afhænger af vinduet og af, hvad gardinet skal kunne." },
    ],
    related: {
      text: "Når du har styr på behovet, hjælper disse guides dig videre.",
      links: [
        { href: "../gardiner-efter-maal.html", label: "Gardiner efter mål" },
        { slug: "farver-paa-gardiner", label: "Farver på gardiner" },
        { slug: "opmaaling-af-gardiner", label: "Opmåling af gardiner" },
      ],
    },
    topic: { product: "nye gardiner", intro: "Det er langt lettere at vælge gardiner, når du kan se stofferne i dit eget lys og få rådgivning ved dine egne vinduer.", related: ["gardiner", "opmaaling-af-gardiner", "hvad-koster-gardiner"] },
    ctaNote: "Vil du have hjælp til valget ved dine egne vinduer? Gardinbus.nu tilbyder et gratis, uforpligtende besøg med prøver og opmåling.",
  },

  // ------------------------------------------------------------------
  {
    slug: "persienner-eller-gardiner",
    category: "Valg af gardiner",
    metaTitle: "Persienner eller gardiner? Sådan vælger du",
    h1: "Persienner eller gardiner — hvad passer bedst til dit rum?",
    tag: "Persienner eller gardiner",
    supplier: "persienner",
    desc: "Persienner eller gardiner? Sammenlign lysstyring, privatliv, mørklægning, akustik, rengøring og udtryk – og se, hvornår en kombination er bedst.",
    summary: "Persienner er bedst, når du vil styre lys og indkig præcist og har brug for en løsning, der tåler fugt og er nem at holde ren. Gardiner i stof er bedst til hygge, akustik og et blødt udtryk — og med foer også til mørklægning og varme. I stuer og soveværelser er en kombination af begge ofte den bedste løsning.",
    facts: [
      ["Vælg persienner til", "Præcis lysstyring, køkken, bad og kontor"],
      ["Vælg gardiner til", "Hygge, akustik, mørklægning med foer og varme"],
      ["Kombinér i", "Stue og soveværelse"],
    ],
    intro: [
      "Spørgsmålet kommer ofte op, når man flytter eller renoverer: Skal vinduerne have persienner eller gardiner? Svaret afhænger af rummet, og af hvad du vil opnå.",
    ],
    sections: [
      { h: "Sammenligning: persienner og gardiner", p: [
        { table: {
          caption: "Persienner sammenlignet med gardiner i stof",
          head: ["", "Persienner", "Gardiner i stof"],
          rows: [
            ["Lysstyring", "Meget præcis — lamellerne vippes", "Trukket for eller fra"],
            ["Privatliv med dagslys", "God", "Med transparent stof"],
            ["Mørklægning", "Ikke fuld", "God med mørklægningsfoer"],
            ["Akustik", "Ingen dæmpning", "Dæmper efterklang"],
            ["Fugt", "Alu tåler fugt godt", "Afhænger af stoffet"],
            ["Rengøring", "Lamellerne støver til", "Kan ofte vaskes"],
            ["Udtryk", "Stramt og grafisk — eller varmt i træ", "Blødt og hyggeligt"],
          ],
        }},
      ]},
      { h: "Hvornår er persienner det bedste valg?", p: [
        { list: [
          "I køkken og badeværelse, hvor fugt og fedt gør stof upraktisk.",
          "På kontorer og hjemmekontorer, hvor blænding på skærmen skal styres i løbet af dagen.",
          "Når du vil have privatliv uden at miste dagslyset.",
          "Når du ønsker et stramt, minimalistisk udtryk — eller et varmt udtryk med [træpersienner](traepersienner.html).",
        ]},
        "Læs mere i guiden til [persienner](persienner.html).",
      ]},
      { h: "Hvornår er gardiner det bedste valg?", p: [
        { list: [
          "I stuen, hvor stof giver hygge og dæmper lyden i rummet.",
          "I soveværelset, hvor gardiner med foer kan mørklægge og holde på varmen.",
          "Ved store vinduer og høje lofter, hvor gardiner fra loft til gulv giver ro og højde.",
        ]},
        "Læs mere i guiden til [gardiner](gardiner.html).",
      ]},
      { h: "Det bedste fra begge verdener", p: [
        "Mange vælger persienner eller et plisségardin i rammen til den daglige lysstyring og løse gardiner foran til hygge og aftenmørke. Det koster lidt mere, men giver et fleksibelt resultat og et rum, der ikke føles goldt. Se også [lagdelte gardiner](lagdelte-gardiner-efteraar.html).",
      ]},
    ],
    faq: [
      { q: "Er persienner eller gardiner bedst til soveværelset?", a: "Gardiner med mørklægningsfoer — eller et mørklægningsrullegardin kombineret med gardiner — mørklægger bedre end persienner, hvis lameller aldrig lukker helt tæt." },
      { q: "Hvad er nemmest at holde rent?", a: "Gardiner i vaskbart stof kan tages ned og vaskes. Persienner skal støves af regelmæssigt, men tåler en fugtig klud — især alupersienner." },
      { q: "Kan man kombinere persienner og gardiner?", a: "Ja, og det er ofte den bedste løsning i stue og soveværelse: persienner eller plissé til lysstyring og gardiner til hygge og mørke." },
    ],
    related: {
      text: "Vil du dykke ned i typerne, så start her.",
      links: [
        { slug: "persienner", label: "Persienner" },
        { slug: "gardiner", label: "Gardiner" },
        { slug: "duo-rullegardiner", label: "Duo rullegardiner" },
      ],
    },
    topic: { product: "persienner og gardiner", intro: "Forskellen på persienner og gardiner ses bedst ved dit eget vindue, hvor du kan sammenligne lameller og stoffer side om side.", related: ["persienner", "gardiner", "traepersienner"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "farver-paa-gardiner",
    category: "Valg af gardiner",
    metaTitle: "Farver på gardiner: Sådan vælger du den rigtige farve",
    h1: "Sådan vælger du farver på gardiner",
    tag: "Farver på gardiner",
    supplier: "gardiner",
    desc: "Hvilken farve skal gardinerne have? Guide til farvevalg efter lys, vinduesretning og indretning – og hvorfor du altid skal se stofprøver i dit eget lys.",
    summary: "Vælg gardinfarve ud fra rummets lys og funktion: Lyse, neutrale farver giver luft og lys og er sikre i de fleste rum; mørkere og varme farver giver hygge og ro, især i soveværelset. Rum mod nord har gavn af varme toner, rum mod syd kan bære kølige. Se altid stofprøven i rummet — farver ændrer sig markant med lyset.",
    intro: [
      "Farven er det første, man lægger mærke til ved et gardin, og det sværeste at fortryde. Et gardin dækker en stor flade og påvirker lyset i hele rummet, så en nuance, der så rolig ud på skærmen, kan virke helt anderledes på væggen.",
    ],
    sections: [
      { h: "Lyset bestemmer, hvordan farven ser ud", p: [
        "Rum mod nord får et køligt, jævnt lys, der får kolde farver til at virke endnu koldere. Her fungerer varme hvide, sand, beige og jordfarver godt. Rum mod syd får varmt, kraftigt lys, som kan bære kølige grå og blå nuancer — og som bleger stoffer hurtigere. Mod vest kommer det varme aftenlys, der forstærker gule og røde toner.",
        "Om aftenen ser du gardinet i kunstigt lys. Kig derfor på prøven både om dagen og under dine egne lamper.",
      ]},
      { h: "Neutrale, mørke eller kulørte gardiner?", p: [
        { list: [
          "**Neutrale og lyse (hvid, off-white, sand, lysegrå):** Sikre valg, der giver luft og lys og passer til skiftende indretning.",
          "**Mørke (antracit, mørkegrøn, mørkeblå):** Giver ro og hygge og fremhæver vinduet — men kan gøre et lille rum mindre.",
          "**Kulørte (okker, rust, salvie):** Giver personlighed. Vælg gerne en farve, der allerede findes i rummet, fx i en pude eller et tæppe.",
        ]},
        "Er du til trends, så se [gardinmode 2026](gardinmode-trends-2026.html) og [efterårsfarver](efteraarsfarver-gardiner-inspiration.html).",
      ]},
      { h: "Farven udefra", p: [
        "Gardinets bagside ses fra gaden. Mange vælger en ensartet, lys bagside på tværs af boligen, så facaden virker rolig. I etageejendomme og andelsboliger kan der være regler for, hvordan gardiner må se ud udefra — tjek husordenen.",
      ]},
      { h: "Sådan tester du farven rigtigt", p: [
        { steps: [
          "Hold prøven op ved vinduet, ikke midt i rummet.",
          "Se den om formiddagen, om eftermiddagen og om aftenen.",
          "Hold den op mod væggen, gulvet og de største møbler.",
          "Kig på prøven med lyset bagfra — sådan ser du gardinet, når det er trukket for.",
        ]},
        "Det er her, et hjemmebesøg gør en forskel: Ved et [gardinbus-besøg](../gardinbus.html) ser du stofprøverne i dit eget lys i stedet for i en butik.",
      ]},
    ],
    faq: [
      { q: "Hvilken farve gardiner er mest tidløs?", a: "Hvide, off-white, sand og lysegrå nuancer er de mest tidløse, fordi de passer til skiftende indretning og giver et lyst rum." },
      { q: "Skal gardiner matche væggen?", a: "Ikke nødvendigvis. En nuance lysere eller mørkere end væggen giver et roligt udtryk; en kontrastfarve fremhæver vinduet. Tag udgangspunkt i farver, der allerede findes i rummet." },
      { q: "Falmer mørke gardiner hurtigere?", a: "Kraftige og mørke farver viser falmning tydeligere, især i vinduer mod syd og vest. Et foer eller solfilm kan beskytte stoffet." },
    ],
    related: {
      text: "Farven er kun én del af valget. Læs også:",
      links: [
        { slug: "saadan-vaelger-du-gardiner", label: "Sådan vælger du gardiner" },
        { slug: "gardiner-til-stuen", label: "Gardiner til stuen" },
        { slug: "solfilm-mod-falmede-mobler", label: "Solfilm mod falmning" },
      ],
    },
    topic: { product: "gardiner i den rigtige farve", intro: "Farver ser meget forskellige ud i butikkens lys og dit eget, så det er en stor hjælp at se prøverne op ad dine vægge og møbler.", related: ["efteraarsfarver-gardiner-inspiration", "gardiner", "gardiner-til-stuen"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "gardiner-til-privatliv",
    category: "Valg af gardiner",
    metaTitle: "Gardiner til privatliv: Undgå indkig uden at miste lys",
    h1: "Gardiner til privatliv — undgå indkig uden at miste lyset",
    tag: "Gardiner til privatliv",
    supplier: "produkter",
    desc: "Sådan får du mere privatliv med gardiner: plissé nedefra-op, duo rullegardiner, persienner, transparente gardiner og film – og hvad der virker om aftenen.",
    summary: "Den bedste løsning mod indkig, der bevarer dagslyset, er en gardintype, der dækker den nederste del af vinduet eller filtrerer udsynet: plisségardiner, der styres nedefra-op, duo rullegardiner, persienner eller transparente gardiner. Husk, at de fleste transparente løsninger kun virker om dagen — når det er mørkt udenfor og lyst inde, kan man se ind.",
    facts: [
      ["Dag og lys", "Plissé nedefra-op, duo rullegardiner, persienner, transparente gardiner"],
      ["Aften", "Kræver et tæt stof eller lukkede lameller"],
      ["Uden gardin", "Mat eller frostet [privatlivsfilm](privatlivsfilm-til-vinduer.html)"],
    ],
    intro: [
      "I tæt byggeri, i stueetager og ved vinduer mod vej eller sti er indkig en af de hyppigste grunde til at købe gardiner. Udfordringen er at skærme sig uden at gøre rummet mørkt.",
    ],
    sections: [
      { h: "Dag eller aften — det er to forskellige problemer", p: [
        "Om dagen er der mere lys ude end inde, så transparente stoffer, film og vippede lameller skærmer godt. Om aftenen vender det: Med lyset tændt inde kan man se gennem de fleste transparente løsninger. Derfor har mange brug for to ting — noget til dagen og noget, der kan lukkes helt om aftenen.",
      ]},
      { h: "De bedste løsninger mod indkig", p: [
        { table: {
          caption: "Løsninger mod indkig",
          head: ["Løsning", "Om dagen", "Om aftenen", "Dagslys"],
          rows: [
            ["[Plissé](plissegardiner.html) nedefra-op", "Dækker den nederste del", "Kan lukkes helt", "Lys ind foroven"],
            ["[Duo rullegardin](duo-rullegardiner.html)", "Striberne lukkes delvist", "Lukkes helt — men ikke mørkt", "Godt"],
            ["[Persienner](persienner.html)", "Lamellerne vippes opad", "Lukkes helt", "Godt"],
            ["Transparente [gardiner](gardiner.html)", "Godt", "Begrænset", "Meget godt"],
            ["[Privatlivsfilm](privatlivsfilm-til-vinduer.html)", "Godt (mat/frost)", "Mat film virker også om aftenen", "Godt"],
          ],
        }},
        { tip: "Spejlfilm virker kun, når det er lysest på den side, man kigger fra. Om aftenen med lys tændt inde kan man se ind." },
      ]},
      { h: "Løsninger til bestemte rum", p: [
        { list: [
          "**Badeværelse:** Mat privatlivsfilm eller plissé i fugtbestandigt stof. Se [gardiner til køkken og badeværelse](gardiner-til-koekken-og-badevaerelse.html).",
          "**Stue i stueplan:** Plissé nedefra-op eller caféløsning, så du ser himlen, men ikke vejen.",
          "**Soveværelse:** Et tæt stof eller mørklægning, der giver privatliv døgnet rundt.",
          "**Terrassedøre:** [Lamelgardiner](lamelgardiner.html) eller panelgardiner, der kan drejes eller trækkes til side.",
        ]},
      ]},
    ],
    faq: [
      { q: "Hvilke gardiner giver privatliv og lys på samme tid?", a: "Plisségardiner, der kan styres nedefra-op, duo rullegardiner og persienner med vippede lameller giver indkigsværn uden at gøre rummet mørkt." },
      { q: "Kan man se ind gennem transparente gardiner om aftenen?", a: "Ofte ja. Når det er mørkt udenfor og lyst inde, bliver de fleste transparente stoffer gennemsigtige. Kombinér med et tættere lag, der kan trækkes for om aftenen." },
      { q: "Er privatlivsfilm et alternativ til gardiner?", a: "Ja, især i badeværelser og ved hoveddøre. Mat og frostet film skærmer både dag og aften, mens spejlfilm kun virker om dagen." },
    ],
    related: {
      text: "Find den løsning, der passer til dit vindue.",
      links: [
        { slug: "privatlivsfilm-til-vinduer", label: "Privatlivsfilm" },
        { slug: "plissegardiner", label: "Plisségardiner" },
        { slug: "duo-rullegardiner", label: "Duo rullegardiner" },
      ],
    },
    topic: { product: "gardiner mod indkig", intro: "Hvor meget indkigsværn du har brug for, afhænger af afstanden til naboer og vej, og det vurderes bedst ved dine egne vinduer.", related: ["privatlivsfilm-til-vinduer", "plissegardiner", "persienner"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "vedligeholdelse-af-gardiner",
    category: "Valg af gardiner",
    metaTitle: "Vedligeholdelse af gardiner: Rengøring af alle typer",
    h1: "Sådan vedligeholder du dine gardiner — rengøring af alle typer",
    tag: "Vedligeholdelse af gardiner",
    supplier: "produkter",
    desc: "Sådan rengør du gardiner, plissé, rullegardiner, persienner og lamelgardiner – uden at ødelægge stof og mekanik. Praktisk guide med tjekliste.",
    summary: "De fleste gardiner holder længst, hvis de støves af jævnligt med en blød børste eller støvsugerens møbelmundstykke. Løse gardiner kan ofte vaskes skånsomt efter vaskeanvisningen, mens plissé, rullegardiner og lameller med belægning kun bør pletrenses med en fugtig klud. Læs altid producentens anvisning først.",
    facts: [
      ["Løse gardiner", "Skånevask efter anvisning, hæng op let fugtige"],
      ["Plissé og rullegardiner", "Støvsug og pletrens — ikke i vaskemaskinen"],
      ["Persienner", "Tør lamellerne af med en fugtig klud"],
      ["Mekanik", "Tjek snore, kæder og beslag en gang om året"],
    ],
    intro: [
      "Gardiner samler støv, røg og pollen, og i køkkenet også fedt. Med lidt vedligeholdelse holder de både farven og funktionen i mange år — men forkert rengøring kan ødelægge belægninger, plisséfolder og mekanik på få minutter.",
    ],
    sections: [
      { h: "Rengøring efter gardintype", p: [
        { table: {
          caption: "Sådan rengør du de forskellige gardintyper",
          head: ["Gardintype", "Løbende", "Grundig rengøring"],
          rows: [
            ["Løse gardiner og [foldegardiner](foldegardiner.html)", "Ryst eller støvsug", "Vask efter anvisningen — ofte skånevask ved lav temperatur"],
            ["[Plisségardiner](plissegardiner.html)", "Blød børste eller støvsuger", "Pletrens med fugtig klud; nogle stoffer tåler forsigtig håndvask — tjek anvisningen"],
            ["[Rullegardiner](rullegardiner.html)", "Støvsug med gardinet rullet ned", "Tør af med fugtig klud og mild sæbe; rul først op, når det er tørt"],
            ["[Persienner](persienner.html) (alu)", "Støvekost eller handske", "Fugtig klud på hver lamel"],
            ["[Træpersienner](traepersienner.html)", "Tør støveklud", "Let fugtig klud — undgå at gennemvæde træet"],
            ["[Lamelgardiner](lamelgardiner.html)", "Støvsug med lamellerne lukket", "Pletrens; nogle lameller kan tages af og vaskes — tjek anvisningen"],
          ],
        }},
      ]},
      { h: "Gode råd, der forlænger levetiden", p: [
        { list: [
          "Tjek vaskeanvisningen, før du vasker — især ved mørklægning og belagte stoffer.",
          "Hæng løse gardiner op igen let fugtige, så de retter sig ud uden strygning.",
          "Rul aldrig et vådt rullegardin op — det kan give skjolder og mug.",
          "Brug ikke stærke rengøringsmidler eller skuresvampe på belægninger.",
          "Tjek snore, kæder, fjedre og beslag en gang om året, og stram løse skruer.",
          "Hold øje med falmning i vinduer mod syd og vest — [solfilm](solfilm-mod-falmede-mobler.html) eller et foer kan beskytte stoffet.",
        ]},
      ]},
      { h: "Fugt, kondens og mug", p: [
        "I badeværelser og ved kolde ruder kan fugt samle sig mellem gardin og glas. Luft ud dagligt, lad gardinerne være lidt fri af ruden, og vælg fugtbestandige stoffer i vådrum. Læs mere i guiden om [gardiner, fugt og kondens](gardiner-fugt-kondens-efteraar.html).",
      ]},
    ],
    faq: [
      { q: "Kan plisségardiner vaskes i vaskemaskine?", a: "Normalt ikke. Plissé støvsuges og pletrenses med en fugtig klud. Nogle stoffer tåler forsigtig håndvask, men tjek altid producentens anvisning." },
      { q: "Hvor ofte skal gardiner vaskes?", a: "Det afhænger af rummet. Løse gardiner i stuer og soveværelser vaskes typisk én til to gange om året, i køkkener oftere. Støv af løbende." },
      { q: "Hvordan rengør jeg et rullegardin?", a: "Rul det helt ned, støvsug med møbelmundstykket, og tør pletter af med en fugtig klud og mild sæbe. Lad det tørre helt, før du ruller det op." },
    ],
    related: {
      text: "Vil du vælge gardiner, der er lette at vedligeholde?",
      links: [
        { slug: "tegn-paa-god-kvalitet-gardiner", label: "Tegn på god kvalitet" },
        { slug: "gardiner-til-koekken-og-badevaerelse", label: "Køkken og badeværelse" },
        { slug: "persienner-eller-gardiner", label: "Persienner eller gardiner?" },
      ],
    },
    topic: { product: "gardiner, der er lette at holde", intro: "Hvor let et gardin er at vedligeholde, afhænger af stof og belægning, og det er en god idé at spørge til, når du ser prøverne.", related: ["tegn-paa-god-kvalitet-gardiner", "gardiner-fugt-kondens-efteraar", "persienner"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "gardiner-til-sovevaerelset",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Gardiner til soveværelset: Mørke, ro og bedre søvn",
    h1: "Gardiner til soveværelset — mørke, ro og bedre søvn",
    tag: "Gardiner til soveværelset",
    supplier: "gardiner",
    desc: "De bedste gardiner til soveværelset: mørklægning, lag, akustik og varme. Se hvilke typer der passer til dine vinduer, og hvilke fejl du skal undgå.",
    summary: "Det bedste gardin til soveværelset er en løsning, der mørklægger tæt: et rullegardin eller plisségardin i mørklægningsstof i rammen, gerne kombineret med løse gardiner foran, der dækker kanterne og dæmper lyd. Lyse sommermorgener og gadelys er de største søvnforstyrrere, så tæt montering betyder mere end farven.",
    facts: [
      ["Mørkest", "Mørklægningsrullegardin eller plissé + løse gardiner"],
      ["Bonus", "Løse gardiner dæmper lyd og træk"],
      ["Undgå", "Dimout, hvis du er lysfølsom, og lysindfald i toppen"],
    ],
    intro: [
      "Soveværelset er det rum, hvor gardinerne gør mest for din hverdag. Et mørkt, roligt rum gør det lettere at falde i søvn og blive liggende, når solen står op før kl. fem om sommeren.",
      "Denne guide er den helårs udgave. Leder du efter sæsonråd, så se vores artikel om [gardiner til soveværelset om efteråret](gardiner-sovevaerelse-efteraar.html).",
    ],
    sections: [
      { h: "Mørklægning er det vigtigste", p: [
        "Vælg et stof med fuld mørklægning, hvis du er lysfølsom, har børn, der skal sove om aftenen, eller arbejder i skiftende vagter. Dimout er et kompromis, der passer til dem, der blot vil dæmpe morgenlyset. Læs om forskellen i guiden til [mørklægningsgardiner](moerklaegningsgardiner.html).",
      ]},
      { h: "Gode løsninger til soveværelset", p: [
        { table: {
          caption: "Gardinløsninger til soveværelset",
          head: ["Løsning", "Fordele", "Opmærksomhed"],
          rows: [
            ["Mørklægningsrullegardin", "Meget mørkt, enkelt og pladsbesparende", "Lys kan slippe ind langs siderne"],
            ["Plissé i mørklægningsstof", "Sidder i rammen, følger vinduet, når det åbnes", "Vælg honeycomb-stof for ekstra isolering"],
            ["Løse gardiner med foer", "Hygge, akustik og varme", "Skal hænges højt og bredt"],
            ["Kombination (rullegardin/plissé + gardiner)", "Mørkest og mest fleksibel", "Højere pris"],
          ],
        }},
      ]},
      { h: "Ro, akustik og varme", p: [
        "Tunge stofgardiner dæmper efterklang og en del af lyden udefra, og de kan mindske træk fra kolde ruder. Hænges de fra loftet og ned til gulvet, virker rummet også højere og roligere. Se også [gardiner mod træk og kulde](gardiner-mod-traek-og-kulde.html).",
      ]},
      { h: "Typiske fejl i soveværelset", p: [
        { list: [
          "Gardinet sidder lige over rammen, så lyset strømmer ind i toppen.",
          "Gardinet er målt til lysmålet, selv om det hænger på væggen — så er det for smalt.",
          "Der er valgt et pænt, men tyndt stof, der ikke mørklægger.",
          "Ovenlys og skråvinduer er glemt — de lukker mest lys ind af alle. Se [gardiner til skråvinduer](gardiner-til-skraavinduer.html).",
        ]},
      ]},
    ],
    faq: [
      { q: "Hvilke gardiner er bedst til soveværelset?", a: "Et mørklægningsrullegardin eller plissé i mørklægningsstof, monteret tæt i rammen, eventuelt kombineret med løse gardiner foran. Det giver mørke, ro og et blødt udtryk." },
      { q: "Hvilken farve skal gardiner i soveværelset have?", a: "Det er belægningen, ikke farven, der mørklægger. Vælg en farve, der giver ro — mange foretrækker dæmpede, varme nuancer — og en lys bagside mod vinduet, der reflekterer solvarme." },
      { q: "Kan gardiner hjælpe på varmen i soveværelset?", a: "Ja. Tætte gardiner med foer kan mindske træk og varmetab om vinteren og holde solvarme ude om sommeren." },
    ],
    related: {
      text: "Flere guides til et mørkere og roligere soveværelse:",
      links: [
        { slug: "moerklaegningsgardiner", label: "Mørklægningsgardiner" },
        { slug: "termogardiner-spar-paa-varmen", label: "Termogardiner" },
        { slug: "gardiner-til-boernevaerelset", label: "Gardiner til børneværelset" },
      ],
    },
    topic: { product: "nye gardiner til soveværelset", intro: "I soveværelset handler det om mørke og ro, og den rette kombination af gardin og mørklægning afhænger af dine vinduer.", related: ["moerklaegningsgardiner", "termogardiner-spar-paa-varmen", "gardiner-til-boernevaerelset"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "gardiner-til-boernevaerelset",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Gardiner til børneværelset: Mørke og sikre løsninger",
    h1: "Gardiner til børneværelset — mørke, sikre og holdbare",
    tag: "Gardiner til børneværelset",
    supplier: "produkter",
    desc: "Gardiner til børneværelset: mørklægning til lur og lyse aftener, børnesikker betjening uden løse snore og stoffer, der tåler hverdagen. Guide og tjekliste.",
    summary: "Gardiner til børneværelset skal kunne mørklægge — så børn kan sove til middag og falde i søvn på lyse sommeraftener — og de skal være børnesikre. Vælg snoreløs betjening, fjeder eller motor, eller sørg for, at snore og kæder er strammet fast og uden for børns rækkevidde. Vælg robuste, vaskbare stoffer.",
    facts: [
      ["Vigtigst", "Mørklægning og børnesikker betjening"],
      ["Sikkerhed", "Ingen løse snore eller kæder inden for rækkevidde"],
      ["Stof", "Robust og let at holde rent"],
    ],
    intro: [
      "Et barn, der skal sove kl. 19 en junidag, har brug for mørke. Men børneværelset stiller også krav, som andre rum ikke gør: Gardinerne skal være sikre, og de skal kunne holde til, at nogen hiver i dem.",
    ],
    sections: [
      { h: "Sikkerhed først: snore og kæder", p: [
        "Løse snore og kæder på gardiner er en kendt kvælningsrisiko for små børn. Den europæiske standard for indvendige gardiner (EN 13120) stiller derfor krav til sikkerheden ved snore og kæder, og nye produkter leveres typisk med sikkerhedsanordninger. Det bedste er dog at undgå løse snore helt i børneværelset:",
        { list: [
          "Vælg snoreløs betjening, fjederbetjening eller motor, hvor det er muligt.",
          "Har gardinet kæde eller snor, så monter en kædestrammer eller snoreholder, så løkken er stram og fast.",
          "Placér senge, kommoder og stole væk fra vinduet, så børn ikke kan klatre op til snorene.",
          "Tjek ældre gardiner — mange er lavet før de nuværende krav.",
        ]},
        "Spørg til børnesikker betjening, når du får et tilbud.",
      ]},
      { h: "Mørklægning til lur og lyse aftener", p: [
        "Et rullegardin eller plissé i mørklægningsstof i rammen giver det mørkeste resultat, og løse gardiner foran tager lyset langs kanterne. Læs mere i guiden til [mørklægningsgardiner](moerklaegningsgardiner.html).",
      ]},
      { h: "Stof og farve, der holder", p: [
        "Vælg stoffer, der kan vaskes eller tørres af, og som ikke viser fingeraftryk. Et neutralt basisgardin holder i mange år, mens farver og mønstre kan komme på i puder og tæpper, som er lettere at skifte, når barnet bliver ældre.",
      ]},
      { h: "Tjekliste til børneværelset", p: [
        { list: [
          "Fuld mørklægning — ikke dimout — hvis barnet skal sove i dagslys.",
          "Snoreløs, fjeder- eller motorbetjening, eller fastgjorte kæder.",
          "Robust, vaskbart stof.",
          "Ingen møbler under vinduet, der inviterer til klatring.",
        ]},
      ]},
    ],
    faq: [
      { q: "Hvilke gardiner er sikrest til børneværelset?", a: "Gardiner uden løse snore og kæder — fx med fjederbetjening, snoreløs betjening eller motor. Har gardinet kæde, skal den strammes fast med en kædestrammer uden for børns rækkevidde." },
      { q: "Hvilke gardiner mørklægger bedst på børneværelset?", a: "Et mørklægningsrullegardin eller plissé i rammen kombineret med løse gardiner, der dækker kanterne." },
      { q: "Kan jeg gøre mine gamle gardiner børnesikre?", a: "Ofte ja, med kædestrammere og snoreholdere. Er gardinerne gamle, kan det være en god idé at udskifte dem med en snoreløs løsning." },
    ],
    related: {
      text: "Flere guides til rolige og mørke soverum:",
      links: [
        { slug: "gardiner-til-sovevaerelset", label: "Gardiner til soveværelset" },
        { slug: "moerklaegningsgardiner", label: "Mørklægningsgardiner" },
        { slug: "rullegardiner", label: "Rullegardiner" },
      ],
    },
    topic: { product: "gardiner til børneværelset", intro: "Mørklægning og børnesikker betjening skal passe til netop dit barns vindue, og det er lettest at afklare ved et besøg.", related: ["moerklaegningsgardiner", "rullegardiner", "gardiner-til-sovevaerelset"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "gardiner-til-koekken-og-badevaerelse",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Gardiner til køkken og badeværelse: Tåler fugt og fedt",
    h1: "Gardiner til køkken og badeværelse — løsninger, der tåler fugt",
    tag: "Gardiner til køkken og bad",
    supplier: "persienner",
    desc: "Gardiner til køkken og badeværelse skal tåle fugt, damp og fedt. Se de bedste typer – alupersienner, plissé, rullegardiner og film – og hvordan du vælger.",
    summary: "I køkken og badeværelse er de bedste gardiner dem, der tåler fugt og er lette at tørre af: alupersienner, plisségardiner og rullegardiner i fugtbestandigt stof samt privatlivsfilm. Løse stofgardiner og træ kan bruges, men kræver god udluftning og mere vedligeholdelse.",
    facts: [
      ["Bedst", "Alupersienner, plissé og rullegardiner i fugtbestandigt stof"],
      ["Bad", "Privatlivsfilm eller plissé nedefra-op mod indkig"],
      ["Undgå", "Træ og tunge stoffer i rum med meget damp"],
    ],
    intro: [
      "Køkken og badeværelse er de to rum, hvor gardiner har det hårdest. Damp, kondens, fedt og hyppig rengøring stiller krav til materialet — og i badeværelset er privatliv ofte vigtigere end lys.",
    ],
    sections: [
      { h: "Gode løsninger til køkkenet", p: [
        { list: [
          "**[Alupersienner](persienner.html):** Tåler fugt og fedt og kan tørres af med en klud.",
          "**[Rullegardiner](rullegardiner.html):** Enkle og diskrete — vælg et stof, der kan tørres af.",
          "**[Duo rullegardiner](duo-rullegardiner.html):** Moderne lysstyring i alrummet.",
          "**Caféløsning eller plissé nedefra-op:** Skærmer for indkig mod vejen og lukker lys ind foroven.",
        ]},
        "Undgå tunge stofgardiner tæt på komfur og emhætte — de samler fedt og lugt.",
      ]},
      { h: "Gode løsninger til badeværelset", p: [
        { list: [
          "**[Plisségardiner](plissegardiner.html)** i fugtbestandigt stof, gerne nedefra-op, så du har privatliv og lys.",
          "**Alupersienner:** Robuste og lette at holde rene.",
          "**[Privatlivsfilm](privatlivsfilm-til-vinduer.html):** Mat eller frostet film skærmer døgnet rundt uden gardin.",
        ]},
        "Træpersienner og naturstoffer kan slå sig eller få skjolder i fugtige rum. Vælg i stedet trælook i et fugtbestandigt materiale, hvis du ønsker udtrykket.",
      ]},
      { h: "Sammenligning af løsninger til fugtige rum", p: [
        { table: {
          caption: "Gardinløsninger til køkken og badeværelse",
          head: ["Løsning", "Tåler fugt", "Privatliv", "Rengøring"],
          rows: [
            ["Alupersienner", "Meget godt", "Godt — lamellerne vippes", "Fugtig klud"],
            ["Plissé i fugtbestandigt stof", "Godt", "Godt — især nedefra-op", "Støvsug og pletrens"],
            ["Rullegardin i aftørbart stof", "Godt", "Kun når det er rullet ned", "Fugtig klud"],
            ["Privatlivsfilm (mat/frost)", "Meget godt", "Døgnet rundt", "Som glas"],
            ["Løse stofgardiner", "Afhænger af stoffet", "Med tæt stof", "Skal vaskes oftere"],
            ["Træpersienner", "Dårligt i damp", "Godt", "Let fugtig klud"],
          ],
        }},
        "Har du et vindue over køkkenvasken eller i bruseområdet, så nævn det ved opmålingen — det har betydning for både materiale og monteringssted.",
      ]},
      { h: "Fugt og mug — sådan undgår du problemer", p: [
        "Luft ud efter bad og madlavning, lad gardinet være lidt fri af ruden, og tør kondens af ruden. Læs mere i guiden om [gardiner, fugt og kondens](gardiner-fugt-kondens-efteraar.html) og om [vedligeholdelse af gardiner](vedligeholdelse-af-gardiner.html).",
      ]},
    ],
    faq: [
      { q: "Hvilke gardiner er bedst til badeværelset?", a: "Plisségardiner i fugtbestandigt stof, alupersienner og privatlivsfilm. De tåler fugt og giver privatliv uden at gøre rummet mørkt." },
      { q: "Kan man have træpersienner i køkkenet?", a: "Det kan gå i et godt udluftet køkken væk fra komfuret, men træ tåler fugt og fedt dårligere end alu. Trælook i fugtbestandigt materiale er et alternativ." },
      { q: "Hvordan undgår jeg mug i gardinerne?", a: "Luft ud dagligt, lad gardinerne hænge lidt fri af ruden, og vælg fugtbestandige stoffer i vådrum. Rul aldrig et vådt rullegardin op." },
    ],
    related: {
      text: "Flere guides til praktiske rum:",
      links: [
        { slug: "persienner", label: "Persienner" },
        { slug: "gardiner-til-privatliv", label: "Gardiner til privatliv" },
        { slug: "vedligeholdelse-af-gardiner", label: "Vedligeholdelse af gardiner" },
      ],
    },
    topic: { product: "gardiner til køkken og bad", intro: "I fugtige rum skal stof og mekanik vælges med omhu, og det er lettest at få råd ved dine egne vinduer.", related: ["persienner", "plissegardiner", "privatlivsfilm-til-vinduer"] },
  },

  // ------------------------------------------------------------------
  {
    slug: "gardiner-til-kontoret",
    category: "Rum, vinduer & opmåling",
    metaTitle: "Gardiner til kontoret: Blænding, varme og indkig",
    h1: "Gardiner til kontoret — mindre blænding, varme og indkig",
    tag: "Gardiner til kontoret",
    supplier: "erhverv",
    desc: "Gardiner og solafskærmning til kontorer, mødelokaler og hjemmekontor: lamelgardiner, screen, persienner og mørklægning. Guide til valg og opmåling.",
    summary: "På kontoret skal gardinerne først og fremmest fjerne blænding på skærme, holde solvarme ude og give privatliv i mødelokaler. Lamelgardiner, screengardiner, persienner og rullegardiner er de mest brugte løsninger, fordi de er robuste og nemme at betjene. Gardinbus.nu oplyser, at de også besøger virksomheder og institutioner gratis.",
    facts: [
      ["Blænding", "Screengardiner, persienner, lamelgardiner"],
      ["Mødelokaler", "Mørklægning til projektor og privatliv"],
      ["Erhverv", "Gardinbus.nu besøger også kontorer, skoler og plejehjem"],
    ],
    intro: [
      "Et kontor med for meget sol bliver varmt, og skærmene bliver svære at læse. Et mødelokale med glasvægge mod gangen giver ingen ro. Det rigtige gardin gør begge dele bedre — og på arbejdspladser skal løsningen også tåle daglig brug af mange forskellige mennesker.",
    ],
    sections: [
      { h: "De mest brugte løsninger på kontorer", p: [
        { table: {
          caption: "Gardinløsninger til kontorer",
          head: ["Løsning", "Bedst til", "Kendetegn"],
          rows: [
            ["[Lamelgardiner](lamelgardiner.html)", "Store vinduespartier og glasfacader", "Lodrette lameller, der drejes og trækkes til side"],
            ["[Screengardiner](screengardiner.html)", "Blænding på skærme", "Filtrerer lyset og bevarer udsynet"],
            ["[Persienner](persienner.html)", "Præcis lysstyring", "Robuste og lette at rengøre"],
            ["[Rullegardiner](rullegardiner.html) i mørklægning", "Mødelokaler med projektor", "Enkelt og effektivt"],
            ["[Solfilm](solfilm-til-vinduer.html)", "Varme og UV", "Supplement til gardiner"],
          ],
        }},
      ]},
      { h: "Blænding og varme", p: [
        "Blænding kommer især fra lav sol mod øst og vest. Screengardiner og persienner fjerner blændingen uden at gøre rummet mørkt. Varme holdes bedst ude, før den kommer gennem glasset — her kan [solfilm](solfilm-til-vinduer.html) supplere gardinerne. Arbejder du hjemme, så se også [solafskærmning til hjemmekontoret](solafskaermning-hjemmekontor.html).",
      ]},
      { h: "Det skal du tænke på i erhvervsbyggeri", p: [
        { list: [
          "Robust betjening, der tåler mange brugere — overvej motor ved store partier.",
          "Ensartet udtryk på facaden.",
          "Rengøring og vedligeholdelse i dagligdagen.",
          "Krav til brandhæmmende materialer kan gælde i visse bygninger — spørg til det, hvis det er relevant.",
          "Planlæg montering uden for arbejdstid, hvis det er muligt.",
        ]},
      ]},
      { h: "Gardinbus til erhverv og institutioner", p: [
        "Gardinbus.nu oplyser, at de også betjener kontorer, skoler, plejehjem og andre institutioner, og at besøget også er gratis for erhverv. Konsulenten kan vise prøver og måle op på stedet, så I får et samlet tilbud på alle vinduer.",
      ]},
    ],
    faq: [
      { q: "Hvilke gardiner er bedst mod blænding på skærme?", a: "Screengardiner og persienner fjerner blændingen uden at gøre rummet mørkt. Lamelgardiner er et godt valg ved store vinduespartier." },
      { q: "Kan en gardinbus komme ud til en virksomhed?", a: "Ja. Gardinbus.nu oplyser, at de også besøger kontorer, skoler, plejehjem og institutioner, og at besøget er gratis for erhverv." },
      { q: "Hvilke gardiner passer til mødelokaler?", a: "Rullegardiner i mørklægningsstof til projektor og skærme, og lamelgardiner eller persienner til glasvægge, hvor I har brug for privatliv." },
    ],
    related: {
      text: "Flere guides til arbejdspladser og hjemmekontor:",
      links: [
        { slug: "solafskaermning-hjemmekontor", label: "Solafskærmning til hjemmekontoret" },
        { slug: "screengardiner", label: "Screengardiner" },
        { slug: "lamelgardiner", label: "Lamelgardiner" },
      ],
    },
    topic: { product: "gardiner til kontoret", intro: "På kontorer og i institutioner er der ofte mange vinduer, og et samlet tilbud kræver, at nogen ser lokalerne og måler op.", related: ["lamelgardiner", "screengardiner", "solafskaermning-hjemmekontor"] },
    ctaNote: "Skal virksomheden eller institutionen have nye gardiner? Gardinbus.nu oplyser, at de også tilbyder gratis besøg til erhverv.",
  },
];
