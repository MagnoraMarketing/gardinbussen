// Udvidelser af de centrale produktguides (kategorisider), november 2026.
// Flettes ind i BLOG i site-data.js: summary/facts ("Kort fortalt"),
// prosCons, ekstra sektioner (efter de eksisterende) og ekstra FAQ.
// Holdes adskilt, så de oprindelige tekster er lette at genkende i git.

module.exports = {
  plissegardiner: {
    summary: "Plisségardiner er gardiner af foldet stof, der kan monteres direkte i vinduesrammen og ofte styres både oppefra og nedefra. De fylder meget lidt, følger vinduet, når det åbnes, og passer til svære vinduer som skråvinduer og ovenlys. Stoffet fås fra lystransparent til fuld mørklægning.",
    facts: [
      ["Bedst til", "Soveværelse, badeværelse, skråvinduer og vinduer, der åbnes ofte"],
      ["Mørklægning", "Ja, med mørklægningsstof eller honeycomb-stof"],
      ["Montering", "I vinduesrammen, i glaslisten eller på væggen"],
    ],
    sections: [
      { h: "Hvilke stoffer findes der til plissé?", p: [
        { table: {
          caption: "Typer af plisséstof",
          head: ["Stoftype", "Lys", "Velegnet til"],
          rows: [
            ["Transparent", "Lukker meget lys ind, slører udsynet", "Stue, køkken, kontor"],
            ["Lysdæmpende", "Dæmper lyset og giver privatliv", "Stue, badeværelse, hjemmekontor"],
            ["Mørklægning", "Holder lyset ude", "Soveværelse, børneværelse"],
            ["Honeycomb (dobbelt plissé)", "Fås både lysdæmpende og mørklæggende", "Ekstra isolering mod kulde og varme"],
          ],
        }},
        "Honeycomb-stof består af to lag med luftlommer imellem, der virker isolerende. Det er især relevant i kolde vinduer og skråvinduer. Se også [plissé eller rullegardiner?](plissegardiner-eller-rullegardiner.html)",
      ]},
      { h: "Hvor passer plisségardiner bedst?", p: [
        { list: [
          "**Soveværelset:** mørklægningsplissé i rammen giver mørke uden at fylde.",
          "**Badeværelset:** plissé nedefra-op giver privatliv og lys foroven — se [gardiner til køkken og badeværelse](gardiner-til-koekken-og-badevaerelse.html).",
          "**Skråvinduer og ovenlys:** holdes på plads med sideskinner eller wires — se [gardiner til skråvinduer](gardiner-til-skraavinduer.html).",
          "**Vinduer og døre, der åbnes:** plissé monteret på rammen følger med, når vinduet åbnes.",
        ]},
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved plisségardiner",
      pros: [
        "Fylder meget lidt og kan sidde i vinduesrammen.",
        "Kan styres oppefra og nedefra — privatliv og lys på én gang.",
        "Passer til skråvinduer, ovenlys og specielle vinduesformer.",
        "Fås fra transparent til mørklægning og isolerende honeycomb.",
      ],
      cons: [
        "Folderne kan med tiden blive mindre skarpe, især i fugtige eller meget solrige vinduer.",
        "Kan normalt ikke vaskes i maskine — kun støves af og pletrenses.",
        "Det stramme udtryk er mindre blødt end løse stofgardiner.",
      ],
    },
    faq: [
      { q: "Hvordan rengør jeg plisségardiner?", a: "Støv dem af med en blød børste eller støvsugerens møbelmundstykke på lav styrke, og pletrens med en fugtig klud. Følg producentens anvisning — de fleste plisséstoffer tåler ikke vaskemaskine." },
      { q: "Er plissé eller rullegardiner bedst til mørklægning?", a: "Begge kan mørklægge godt med mørklægningsstof. Plissé sidder tættere i rammen og passer til vinduer, der åbnes; rullegardiner er enklere og ofte billigere. Se vores sammenligning af de to." },
    ],
  },

  rullegardiner: {
    summary: "Rullegardiner er glatte stofgardiner, der rulles op på en rulle foroven. De er enkle, pladsbesparende og fås i alt fra transparent stof og screen til fuld mørklægning. De passer til næsten alle rum og er et af de mest prisvenlige valg til gardiner efter mål.",
    facts: [
      ["Bedst til", "Soveværelse, børneværelse, køkken og kontor"],
      ["Mørklægning", "Ja, med mørklægningsstof — tættest med sideskinner"],
      ["Varianter", "Mørklægning, screen, solfilm, duo og transparent"],
    ],
    sections: [
      { h: "Hvor passer rullegardiner bedst?", p: [
        { list: [
          "**Soveværelset og børneværelset:** mørklægningsrullegardiner giver mørke til søvn — se [mørklægningsgardiner](moerklaegningsgardiner.html).",
          "**Køkken og kontor:** et enkelt rullegardin i et stof, der kan tørres af, eller [screen](screengardiner.html) mod blænding.",
          "**Bag løse gardiner:** et rullegardin i rammen som funktionelt lag bag hyggelige stofgardiner.",
          "**Store vinduer:** brede rullegardiner kræver kraftig rulle — overvej [lamelgardiner](lamelgardiner.html) ved meget store partier.",
        ]},
      ]},
      { h: "Vedligeholdelse af rullegardiner", p: [
        "Rul gardinet helt ned, og støvsug det med møbelmundstykket. Pletter tørres af med en fugtig klud og mild sæbe. Lad stoffet tørre helt, før du ruller det op, så du undgår skjolder. Læs mere i [vedligeholdelse af gardiner](vedligeholdelse-af-gardiner.html).",
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved rullegardiner",
      pros: [
        "Enkle, diskrete og pladsbesparende.",
        "Fås med fuld mørklægning, screen og solfilm.",
        "Ofte prisvenlige sammenlignet med andre gardiner efter mål.",
        "Lette at holde rene.",
      ],
      cons: [
        "Lys kan slippe ind langs siderne uden sideskinner.",
        "Kun op/ned — ingen trinløs lysstyring som ved persienner (undtagen duo).",
        "Brede rullegardiner kan bue lidt på midten.",
      ],
    },
    faq: [
      { q: "Hvad er forskellen på rullegardiner og duo rullegardiner?", a: "Et almindeligt rullegardin har ét lag stof og er enten oppe eller nede. Et duo rullegardin har to lag med striber, der kan forskydes, så du kan regulere lys og indkig uden at rulle det op." },
      { q: "Kan rullegardiner sidde i vinduesrammen?", a: "Ja, de fleste rullegardiner kan monteres i rammen, på væggen eller i loftet. Montering i rammen kræver nok dybde til rullen og beslagene." },
    ],
  },

  persienner: {
    summary: "Persienner er gardiner med vandrette lameller i aluminium, træ eller trælook, som kan vippes for at styre lys og indkig præcist og trækkes helt op. De er robuste, tåler fugt (især alu) og passer godt til køkken, badeværelse og kontor. De mørklægger ikke helt.",
    facts: [
      ["Materialer", "Aluminium, træ og trælook"],
      ["Bedst til", "Køkken, badeværelse, kontor og stue"],
      ["Mørklægning", "Nej — lamellerne lukker aldrig helt tæt"],
    ],
    sections: [
      { h: "Hvor passer persienner bedst?", p: [
        { list: [
          "**Køkken og badeværelse:** alupersienner tåler fugt og fedt.",
          "**Kontor og hjemmekontor:** præcis styring af blænding på skærme.",
          "**Stue:** [træpersienner](traepersienner.html) giver et varmt udtryk og kan kombineres med løse gardiner.",
        ]},
        "Er du i tvivl om persienner eller stofgardiner, så se [persienner eller gardiner?](persienner-eller-gardiner.html)",
      ]},
      { h: "Vedligeholdelse af persienner", p: [
        "Luk lamellerne, og støv af med en støvekost, en mikrofiberhandske eller støvsugerens børstemundstykke. Vend lamellerne, og gentag. Alupersienner tåler en fugtig klud; træ skal kun tørres af med en let fugtig klud.",
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved persienner",
      pros: [
        "Meget præcis styring af lys og indkig.",
        "Alupersienner tåler fugt og er lette at tørre af.",
        "Holdbare og robuste i daglig brug.",
        "Fås i mange farver og lamelbredder.",
      ],
      cons: [
        "Mørklægger ikke helt.",
        "Lamellerne samler støv og skal aftørres enkeltvis.",
        "Det stramme udtryk dæmper ikke akustik som stofgardiner.",
      ],
    },
    faq: [
      { q: "Kan persienner bruges i badeværelset?", a: "Ja, især alupersienner, som tåler fugt. Træpersienner kan slå sig i meget fugtige rum." },
      { q: "Hvordan rengør man persienner nemmest?", a: "Luk lamellerne og støv af med en mikrofiberhandske eller støvsugerens børstemundstykke. Vend dem, og gentag. Alupersienner kan tørres af med en fugtig klud." },
    ],
  },

  lamelgardiner: {
    summary: "Lamelgardiner har lodrette stoflameller, der kan drejes for at styre lyset og trækkes til side, så vinduet eller døren bliver helt fri. De er det klassiske valg til store vinduespartier, skydedøre og kontorer, og lamellerne fås i lysdæmpende og mørklæggende stof.",
    facts: [
      ["Bedst til", "Store vinduer, skydedøre, terrassedøre og kontorer"],
      ["Lysstyring", "Lamellerne drejes trinløst"],
      ["Mørklægning", "Mørklæggende lameller dæmper meget, men der er altid lidt lys i samlingerne"],
    ],
    sections: [
      { h: "Hvor passer lamelgardiner bedst?", p: [
        { list: [
          "**Skydedøre og terrassedøre:** lamellerne trækkes til side, så døren kan bruges frit.",
          "**Store glaspartier:** én løsning over hele bredden — se [gardiner til store vinduer](gardiner-til-store-vinduer.html).",
          "**Kontorer og mødelokaler:** robuste og lette at betjene for mange brugere — se [gardiner til kontoret](gardiner-til-kontoret.html).",
        ]},
      ]},
      { h: "Vedligeholdelse af lamelgardiner", p: [
        "Luk lamellerne, og støvsug dem med børstemundstykket oppefra og ned. Pletter fjernes med en fugtig klud. Nogle lameller kan tages af og vaskes — tjek producentens anvisning.",
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved lamelgardiner",
      pros: [
        "Ideelle til store vinduer og skydedøre.",
        "Trinløs lysstyring og fri passage, når de er trukket fra.",
        "Robuste og velegnede til erhverv.",
      ],
      cons: [
        "Opfattes af nogle som et mere kontoragtigt udtryk i hjemmet.",
        "Kræver plads til siden, når lamellerne er trukket fra.",
        "Giver ikke fuld mørklægning.",
      ],
    },
    faq: [
      { q: "Er lamelgardiner gammeldags?", a: "Lamelgardiner fås i dag i mange stoffer og farver, som giver et blødere udtryk end de klassiske kontorlameller. De er stadig en af de mest praktiske løsninger til store vinduer og skydedøre." },
      { q: "Kan lamelgardiner bruges til skydedøre?", a: "Ja, det er et af de mest oplagte steder, fordi lamellerne kan trækkes helt til side, så døren kan bruges frit." },
    ],
  },

  foldegardiner: {
    summary: "Foldegardiner — også kaldet romanske gardiner — er stofgardiner, der trækkes op i bløde, vandrette folder. De kombinerer stofgardinets hygge med et stramt, pladsbesparende udtryk og kan fås med foer til mørklægning og isolering.",
    facts: [
      ["Kaldes også", "Romanske gardiner"],
      ["Bedst til", "Stue, spisestue og soveværelse"],
      ["Mørklægning", "Ja, med mørklægningsfoer — lys kan slippe ind langs siderne"],
    ],
    sections: [
      { h: "Hvor passer foldegardiner bedst?", p: [
        { list: [
          "**Stuen og spisestuen:** blødt, hyggeligt udtryk uden meget stof i siderne — se [gardiner til stuen](gardiner-til-stuen.html).",
          "**Soveværelset:** med mørklægningsfoer.",
          "**Små vinduer og karnapper:** hvor løse gardiner fylder for meget.",
        ]},
      ]},
      { h: "Vedligeholdelse af foldegardiner", p: [
        "Støvsug foldegardinet med lav sugestyrke. Kan stoffet tages af mekanikken, kan det ofte vaskes skånsomt — tjek anvisningen. Mørklægningsfoer tåler typisk ikke hård vask. Se [vedligeholdelse af gardiner](vedligeholdelse-af-gardiner.html).",
      ]},
    ],
    prosCons: {
      h: "Fordele og ulemper ved foldegardiner",
      pros: [
        "Stoffets hygge med et stramt udtryk.",
        "Fylder mindre end løse gardiner.",
        "Kan fås med foer til mørklægning og isolering.",
      ],
      cons: [
        "Lys kan slippe ind langs siderne.",
        "Folderne samler lidt støv.",
        "Mindre egnede til meget brede vinduer.",
      ],
    },
    faq: [
      { q: "Hvad er forskellen på folde- og rullegardiner?", a: "Et rullegardin rulles op på en rulle og er glat. Et foldegardin trækkes op i bløde, vandrette folder og giver et blødere, mere tekstilt udtryk." },
    ],
  },

  traepersienner: {
    summary: "Træpersienner er persienner med brede lameller af træ eller trælook, som giver præcis lysstyring og et varmt, naturligt udtryk. De passer især til stuer, soveværelser og hjemmekontorer, men ægte træ bør undgås i meget fugtige rum.",
    facts: [
      ["Udtryk", "Varmt og naturligt"],
      ["Bedst til", "Stue, soveværelse og hjemmekontor"],
      ["Undgå", "Ægte træ i badeværelser med meget damp"],
    ],
    prosCons: {
      h: "Fordele og ulemper ved træpersienner",
      pros: [
        "Varmt, naturligt udtryk, der passer til nordisk indretning.",
        "Præcis styring af lys og indkig.",
        "Holdbare, når de bruges i tørre rum.",
      ],
      cons: [
        "Tungere end alupersienner — store persienner er tunge at trække op.",
        "Ægte træ tåler fugt dårligt.",
        "Mørklægger ikke helt.",
      ],
    },
    faq: [
      { q: "Kan træpersienner bruges i badeværelset?", a: "Ægte træ kan slå sig i fugtige rum. Vælg trælook i et fugtbestandigt materiale eller alupersienner til badeværelser." },
    ],
  },

  gardiner: {
    summary: "Gardiner — løse stofgardiner på stang eller skinne — giver hygge, dæmper lyd og kan med foer både mørklægge og holde på varmen. Det vigtigste valg er stoffet, mængden af stof (typisk 1,5–2,5 gange vinduets bredde) og ophænget: hængt højt og bredt får vinduet og rummet til at virke større.",
    facts: [
      ["Stofforbrug", "Typisk 1,5–2,5 × vinduets bredde"],
      ["Bedst til", "Stue, soveværelse og store vinduer"],
      ["Mørklægning", "Ja, med mørklægningsfoer"],
    ],
    prosCons: {
      h: "Fordele og ulemper ved løse gardiner",
      pros: [
        "Hygge, blødt lys og bedre akustik.",
        "Kan mørklægge og isolere med foer.",
        "Mange stoffer kan tages ned og vaskes.",
        "Få vinduet og loftet til at virke større, når de hænges højt.",
      ],
      cons: [
        "Fylder i siderne, når de er trukket fra.",
        "Kræver plads og en god skinne eller stang.",
        "Giver ikke trinløs lysstyring som persienner.",
      ],
    },
    faq: [
      { q: "Hvor højt skal gardiner hænge?", a: "Hæng gerne gardinet tæt under loftet eller 10–20 cm over vinduet. Det får loftet til at virke højere, og stoffet dækker bedre for lyset." },
    ],
  },
};
