export interface ProductionStage {
  step: number;
  name: string;
  gaelicName?: string;
  tagline: string;
  description: string;
  duration: string;
  image: string;
  details: string[];
}

export interface CaskTypeInfo {
  id: string;
  name: string;
  caskCategory: 'Bourbon' | 'Sherry' | 'Port' | 'Wine' | 'Rum';
  woodSpecies: string;
  capacityLitres: string;
  previousContent: string;
  flavourContribution: string[];
  description: string;
  image: string;
  popularExamples: string[]; // whisky IDs or names
}

export const PRODUCTION_STAGES: ProductionStage[] = [
  {
    step: 1,
    name: 'Malting & Peating',
    gaelicName: 'Bhrachadh',
    tagline: 'Unlocking barley starches and infusing ancient peat smoke',
    description: 'Raw Scottish barley is steeped in cold spring water for 2–3 days and spread across traditional stone malting floors to germinate. As enzymes activate to convert insoluble starch into fermentable sugars, germination is halted by drying the green malt in a kiln. For smoky whiskies (like Islay or Campbeltown), ancient peat is burned beneath the kiln to impart signature phenolic smoke compounds (measured in PPM).',
    duration: '5 - 7 Days',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Steeping in cold spring water to reach ~45% moisture content',
      'Hand-turning across stone floors with wooden shovels to regulate rootlet temperature',
      'Kilning with clean hot air or aromatic Scottish peat fires (0 to 55+ PPM)',
      'Milling dried malted barley into "grist" (70% husks, 20% grits, 10% flour)'
    ]
  },
  {
    step: 2,
    name: 'Mashing',
    gaelicName: 'Pronnadh',
    tagline: 'Extracting sweet wort from malted barley grist',
    description: 'The milled malt (grist) is transferred into a massive circular copper or stainless steel mash tun. Pure, mineral-rich Scottish spring water is added in three successive batches at escalating temperatures (typically 64°C, 75°C, and 85°C). The hot water activates natural amylase enzymes that convert starches into fermentable sugars, yielding a sweet, sugary, cloudy liquid known as "wort". The leftover spent grain (draff) is sent to local farms as livestock feed.',
    duration: '4 - 8 Hours',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Grist mixed with pure spring water in the mash tun',
      'Natural enzymes convert barley starches into fermentable maltose sugars',
      'Sweet sugary liquid (wort) drained through perforated floor plates',
      'Cooled through heat exchangers to ~18-20°C before entering fermentation vessels'
    ]
  },
  {
    step: 3,
    name: 'Fermentation',
    gaelicName: 'Aiseag',
    tagline: 'Creating the fruity distiller’s beer ("wash") in giant washbacks',
    description: 'The cooled sweet wort is pumped into giant wooden (Oregon pine or Scottish larch) or stainless steel washbacks. Distillers pitch living yeast, sparking a lively, bubbling biological transformation. As the yeast devours barley sugars, it produces alcohol and hundreds of aromatic chemical compounds called esters. Short fermentations (~48 hrs) yield malty/cereal flavours, while long fermentations (70–110 hrs) yield lush orchard fruits, peach, and floral complexity.',
    duration: '48 - 110 Hours',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Distillers yeast pitched into warm sugary wort',
      'Vigorous bubbling creates a rustic distiller’s beer ("wash") at ~8% ABV',
      'Wood washbacks host micro-flora that amplify fruit ester formation',
      'Produces light alcohols, organic acids, and fruit bouquet'
    ]
  },
  {
    step: 4,
    name: 'Copper Pot Distillation',
    gaelicName: 'Grùdaireachd',
    tagline: 'The alchemy of copper stills, reflux, and spirit cuts',
    description: 'By Scottish law, single malt must be batch-distilled in traditional copper pot stills. In the first distillation (the Wash Still), the ~8% wash is heated until alcohol vapors rise and condense into "low wines" at ~22% ABV. In the second distillation (the Spirit Still), the stillman makes the crucial cut into three fractions: Foreshots (head), The Heart (pure spirit cut ~68-72% ABV), and Feints (tail). Only the pristine Heart goes into oak casks.',
    duration: '8 - 12 Hours per batch',
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Copper removes unwanted sulfur compounds and shapes spirit character',
      'Tall stills (e.g. Glenmorangie, 5.14m) create delicate, citrusy, light spirit with high reflux',
      'Short, squat stills with worm tubs (e.g. Mortlach, Talisker, Oban) create heavy, meaty spirit',
      'Master stillman precisely selects "The Heart" cut via the brass Spirit Safe'
    ]
  },
  {
    step: 5,
    name: 'Oak Cask Maturation',
    gaelicName: 'Aibidh ann am Fiodh',
    tagline: 'Where 60-80% of final whisky flavour and colour is born',
    description: 'The crystal-clear new-make spirit is reduced with spring water to around 63.5% ABV and filled into seasoned oak casks. By legal definition, Scotch Single Malt must be matured entirely in Scotland in oak casks with a capacity under 700 litres for a statutory minimum of 3 years (though top malts age 10 to 30+ years). Over decades, the spirit breathes in Scottish sea and glen air while extracting vanillin, tannins, lactones, and colour.',
    duration: '3 Years Minimum (10 - 25+ Years typical)',
    image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Angels’ Share: ~1.5% to 2% volume evaporates annually through the porous wood',
      'Earthen floor dunnage warehouses maintain steady Scottish temperature and humidity',
      'Oak interaction delivers 100% natural colour without artificial additives',
      'Wood breathing extracts caramel, vanilla, spice, dark fruits, and deep oak richness'
    ]
  }
];

export const CASK_TYPES: CaskTypeInfo[] = [
  {
    id: 'bourbon',
    name: 'Ex-Bourbon American Standard Barrel (ASB)',
    caskCategory: 'Bourbon',
    woodSpecies: 'Quercus alba (American White Oak)',
    capacityLitres: '200 Litres',
    previousContent: 'Kentucky Straight Bourbon Whiskey',
    flavourContribution: ['Vanilla', 'Crème Brûlée', 'Coconut', 'Caramel', 'Sweet Honey', 'Baking Spice', 'Toasted Oak'],
    description: 'Accounts for ~85% of all Scotch single malt maturation. American law dictates that bourbon must only be aged in virgin charred oak, leaving millions of high-quality seasoned barrels available to Scottish distillers. Imparts bright golden hues and sweet, creamy profiles.',
    image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=800&q=80',
    popularExamples: ['Glenfiddich 12', 'Ardbeg Ten', 'Laphroaig 10', 'Glenmorangie The Original 10']
  },
  {
    id: 'sherry-oloroso',
    name: 'Oloroso Sherry Butt',
    caskCategory: 'Sherry',
    woodSpecies: 'Quercus robur (European / Spanish Oak) or American Oak',
    capacityLitres: '500 Litres',
    previousContent: 'Dry, nutty, oxidized Spanish Oloroso Sherry wine from Jerez',
    flavourContribution: ['Dried Raisins', 'Dark Chocolate', 'Walnuts', 'Nutmeg & Clove', 'Orange Peel', 'Christmas Fruitcake'],
    description: 'The quintessential luxury Scotch cask. European oak contains rich tannins and porous wood structure that infuses deep mahogany colour and opulent dried fruitcake, leather, and dark spice.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    popularExamples: ['The Macallan 12 Double Cask', 'GlenDronach 15 Revival', 'Aberlour A\'bunadh', 'Highland Park 12']
  },
  {
    id: 'sherry-px',
    name: 'Pedro Ximénez (PX) Sherry Butt',
    caskCategory: 'Sherry',
    woodSpecies: 'Spanish European Oak',
    capacityLitres: '500 Litres',
    previousContent: 'Ultra-sweet, sun-dried Pedro Ximénez raisin dessert wine',
    flavourContribution: ['Sticky Fig', 'Treacle Syrup', 'Medjool Dates', 'Dark Plum', 'Molasses', 'Rich Cocoa', 'Espresso'],
    description: 'Known as the "King of Sherries", PX grapes are sun-dried on straw mats before pressing to concentrate sugars. Imparts intense viscosity, dark syrup sweetness, and rich festive spice.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    popularExamples: ['Ardbeg Uigeadail', 'GlenDronach 15', 'Bowmore 15']
  },
  {
    id: 'port-pipe',
    name: 'Port Pipe (Ruby & Tawny)',
    caskCategory: 'Port',
    woodSpecies: 'European Oak (Portuguese / French Oak)',
    capacityLitres: '550 - 650 Litres',
    previousContent: 'Ruby or Tawny Port Wine from the Douro Valley in Portugal',
    flavourContribution: ['Ripe Blackcurrant', 'Dark Plum', 'Turkish Delight', 'Sandalwood', 'Cranberry', 'Rose Water', 'Dark Berries'],
    description: 'Tall, elongated casks used for full maturation or secondary finishing. Imparts a romantic rosy amber or ruby hue to the single malt along with velvety red berry and mint chocolate undertones.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
    popularExamples: ['Talisker Port Ruighe', 'Glenmorangie Quinta Ruban 14', 'Balvenie 21 PortWood']
  },
  {
    id: 'wine-barrique',
    name: 'Wine Barrique & Sauternes Cask',
    caskCategory: 'Wine',
    woodSpecies: 'Quercus petraea (French Oak)',
    capacityLitres: '225 - 300 Litres',
    previousContent: 'Bordeaux Red Wine, Sauternes Sweet White Wine, or Madeira',
    flavourContribution: ['Apricot Jam', 'Poached Pear', 'Candied Ginger', 'Red Wine Tannins', 'Toasted Brioche', 'White Peach'],
    description: 'French oak barriques deliver elegant, fine-grained tannins. Sauternes wine casks impart luscious honeyed stone fruits, while red wine barriques contribute dry, tannic structure and berry acidity.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    popularExamples: ['Glenmorangie Nectar d\'Or', 'Bruichladdich Scottish Barley', 'Longrow Red']
  },
  {
    id: 'rum-cask',
    name: 'Caribbean Rum Cask',
    caskCategory: 'Rum',
    woodSpecies: 'American White Oak',
    capacityLitres: '200 - 250 Litres',
    previousContent: 'Pot-still and column-still aged Caribbean Sugar Cane Rum',
    flavourContribution: ['Tropical Pineapple', 'Ripe Banana', 'Toffee Fudge', 'Brown Demerara Sugar', 'Molasses', 'Exotic Spice'],
    description: 'Casks seasoned with tropical molasses-based rum impart a decadent, exotic sweetness with vibrant notes of grilled pineapple, banana flambe, and demerara sugar.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    popularExamples: ['Balvenie 14 Caribbean Cask', 'Glenfiddich 21 Reserva Rum Cask']
  }
];

export const TASTING_RITUAL = [
  {
    step: '1. See (Sealladh) — Colour & Legs',
    action: 'Observe in natural daylight against a neutral white background',
    tip: 'Note the natural hue: pale straw (bourbon), amber gold (refill oak), or deep mahogany (first-fill sherry). Swirl gently to watch the "legs" or "tears" run down the glass — slow, thick legs indicate higher ABV and heavy viscosity.'
  },
  {
    step: '2. Swirl (Cuairtich) — Aeration',
    action: 'Gently swirl the liquid inside a tulip-shaped Glencairn glass',
    tip: 'Aeration releases trapped alcohol esters and aroma compounds. Let the whisky sit in the glass for 1 minute for every year of its age statement to let it fully awaken.'
  },
  {
    step: '3. Sniff (Sròin) — The Nose',
    action: 'Bring the glass close with parted lips, breathing gently',
    tip: 'Keep your mouth slightly open so alcohol vapors do not overwhelm your olfactory senses. Nose at the top, center, and rim of the glass to identify top notes (citrus, floral), heart notes (honey, malt), and base notes (peat, oak, leather).'
  },
  {
    step: '4. Sip (Blasad) — The Palate',
    action: 'Take a small sip and roll it across your entire tongue for 5-10 seconds',
    tip: 'Your tongue registers different sensations across its surface: sweetness on the tip, salinity on the sides, citrus acidity, and dry bitterness/tannins at the back. Note the texture (silky, oily, creamy, or crisp).'
  },
  {
    step: '5. Savor (Fuasgladh) — The Finish & Water Drop',
    action: 'Swallow and exhale gently through your nose and mouth',
    tip: 'Notice how the flavours evolve in the lingering "finish". Does it stay warm and spicy? Does sweet vanilla return? Try adding 2-3 drops of room-temperature spring water to break surface tension and unlock secondary aromatics.'
  }
];

export const PEAT_EDUCATION = {
  title: 'What is Peat?',
  subtitle: 'The ancient botanical fuel behind Scotland’s most iconic smoky drams',
  summary: 'Peat is compressed organic vegetation (heather, sphagnum moss, sedge, bog myrtle, and roots) that has decayed underwater over thousands of years in waterlogged Scottish peat bogs.',
  keyFacts: [
    {
      title: 'Slow Geological Accumulation',
      text: 'Scottish peat accumulates at a rate of just 1 millimetre per year. A 2-metre-deep peat bank on Islay represents more than 2,000 years of botanical history.'
    },
    {
      title: 'How It Flavours the Barley',
      text: 'Green malted barley is dried over smouldering peat fires in distillery kilns. The aromatic smoke contains chemical compounds called phenols, cresols, and xylenols that bind firmly to the barley husk.'
    },
    {
      title: 'The PPM Measurement Scale',
      text: 'Phenol Parts Per Million (PPM) measures peat intensity in the malted grain. 0 PPM is completely unpeated, 5–15 PPM is lightly peated, 20–35 PPM is medium peated, and 45–55+ PPM is heavily peated (e.g. Ardbeg, Laphroaig, Octomore).'
    },
    {
      title: 'Terroir Difference: Islay vs Mainland',
      text: 'Islay peat contains high concentrations of sea spray, seaweed, and saltwater marsh plants, yielding medicinal, iodine, and maritime brine notes. Highland peat (like Orkney heather peat) contains more decomposed heather, producing floral, honeyed, aromatic smoke.'
    }
  ]
};

export const AGE_STATEMENTS_GUIDE = {
  title: 'Whisky Age Statements Demystified',
  subtitle: 'The legal truth behind the number on the bottle and NAS expressions',
  lawOfYoungestDrop: 'By Scottish law, the age statement on a bottle of Scotch Whisky MUST reflect the age of the youngest single drop of whisky in that blend or batch. If a cask of 25-year-old whisky is married with just 1% of 10-year-old whisky, the bottle can only legally declare 10 Years Old.',
  mythsAndFacts: [
    {
      myth: 'Older whisky is always superior to younger whisky.',
      fact: 'Age brings wood tannin and complexity, but past 18-25 years, oak tannins can easily overpower the distillery’s delicate spirit character. A bright, vibrant 10-12 year old can be fresher and more dynamic.'
    },
    {
      myth: 'NAS (No Age Statement) means cheap or inferior whisky.',
      fact: 'Master blenders use NAS bottlings (like Ardbeg Uigeadail or Glenmorangie Signet) to marry older, rich casks with younger, lively high-proof casks without being penalized by the youngest-drop law.'
    },
    {
      myth: 'Whisky continues to age in the glass bottle.',
      fact: 'Whisky only matures while interacting with porous oak wood and air inside a wooden barrel. Once bottled in glass, its age is permanently frozen in time.'
    },
    {
      myth: 'Darker colour means older whisky.',
      fact: 'Colour depends entirely on the previous cask content (first-fill Oloroso Sherry produces dark mahogany in just 5 years, while 20-year-old Bourbon produces light golden straw).'
    }
  ]
};

export const SCOTCH_REGULATIONS = [
  {
    title: '100% Malted Barley & Single Scottish Distillery',
    requirement: 'Must be produced exclusively from pure water and 100% malted Scottish barley at a single Scottish distillery, batch-distilled in traditional copper pot stills.'
  },
  {
    title: 'Distilled Under 94.8% ABV',
    requirement: 'Must be distilled to an alcoholic strength of less than 94.8% ABV so that the distillate retains the unmistakable aroma and taste derived from the raw barley and fermentation.'
  },
  {
    title: 'Matured Wholly in Scotland in Oak Casks',
    requirement: 'Must be matured in an excise warehouse in Scotland in oak casks of a capacity not exceeding 700 litres for a statutory minimum of at least three full years.'
  },
  {
    title: 'The Youngest Drop Law',
    requirement: 'Any age statement or vintage year displayed on the label must strictly reflect the age of the youngest constituent whisky in the bottle.'
  },
  {
    title: 'No Added Flavours or Additives',
    requirement: 'No substances may be added other than pure water and plain caramel colouring (E150a). No flavorings, sweeteners, or neutral grain alcohol are legally permitted.'
  },
  {
    title: 'Minimum Bottling Strength 40% ABV',
    requirement: 'Must be bottled at a minimum alcoholic strength of 40% ABV (80 proof).'
  }
];

export const GLOSSARY = [
  {
    term: 'Single Malt Scotch',
    category: 'Definition',
    definition: 'A whisky produced entirely at a single distillery, made exclusively from 100% malted barley, batch-distilled in copper pot stills, and matured in oak casks in Scotland for at least 3 years.'
  },
  {
    term: 'ABV (Alcohol by Volume)',
    category: 'Measurement',
    definition: 'The standard measure of how much pure alcohol is contained in a given volume of liquid. Scotch single malt must be bottled at a minimum of 40.0% ABV.'
  },
  {
    term: 'Angels’ Share',
    category: 'Maturation',
    definition: 'The ~1.5% to 2% of liquid volume and alcohol that naturally evaporates each year through the microscopic pores of oak casks into the Scottish atmosphere.'
  },
  {
    term: 'Cask Strength',
    category: 'Bottling',
    definition: 'Whisky bottled directly from the oak barrel without adding water to dilute it down to 40% or 43%. Typically ranges from 50% to 65% ABV, delivering intense flavor texture.'
  },
  {
    term: 'Chill-Filtration',
    category: 'Production',
    definition: 'The process of cooling whisky to ~0°C before filtration to remove natural fatty acids and proteins that cause cloudiness when water or ice is added. Non-Chill Filtered (NCF) whiskies retain these flavour oils.'
  },
  {
    term: 'Congeners',
    category: 'Chemistry',
    definition: 'Minor chemical compounds (esters, aldehydes, phenols, tannins, higher alcohols) produced during fermentation and distillation that provide whisky with its aroma, body, and taste.'
  },
  {
    term: 'Dram',
    category: 'Tradition',
    definition: 'A traditional Scottish measure of whisky poured for drinking. Historically 1/8 of an ounce, today it simply means a generous pour of single malt.'
  },
  {
    term: 'Dunnage Warehouse',
    category: 'Maturation',
    definition: 'A traditional low stone-walled warehouse with earthen floors and slate roofs where casks are stacked no more than 3 high. They maintain naturally cool, humid microclimates ideal for gentle aging.'
  },
  {
    term: 'Esters',
    category: 'Chemistry',
    definition: 'Aromatic compounds formed during fermentation by the reaction of alcohol and fatty acids. They produce delightful fruity notes like green apple, pear, banana, and pineapple.'
  },
  {
    term: 'Feints (Tails)',
    category: 'Distillation',
    definition: 'The final, heavier portion of spirit that comes off the copper pot still. High in fusel oils and bitter compounds; diverted back into the low wines receiver for re-distillation.'
  },
  {
    term: 'Foreshots (Heads)',
    category: 'Distillation',
    definition: 'The initial run of spirit coming off the still, containing volatile, pungent low-boiling compounds like methanol and ethyl acetate. Recycled into the next batch.'
  },
  {
    term: 'Glencairn Glass',
    category: 'Tasting',
    definition: 'The official tulip-shaped tasting glass designed to concentrate delicate whisky aromas toward the nose while fitting comfortably in the hand.'
  },
  {
    term: 'Grist',
    category: 'Production',
    definition: 'Malted barley ground in a roller mill into the optimal ratio for mashing: ~70% coarse husks, ~20% middle grits, and ~10% fine flour.'
  },
  {
    term: 'Heart of the Run',
    category: 'Distillation',
    definition: 'The pristine middle fraction of spirit cut between foreshots and feints. Only the Heart (~68-72% ABV) is collected for maturation into single malt whisky.'
  },
  {
    term: 'Lyne Arm',
    category: 'Distillation',
    definition: 'The horizontal or angled copper pipe leading from the top of the pot still swan neck to the condenser. Upward-angled lyne arms promote reflux and lighter spirit; downward arms create heavier spirit.'
  },
  {
    term: 'Mash Tun',
    category: 'Production',
    definition: 'A large circular brewing vessel with a perforated false bottom where ground grist is mixed with hot spring water to extract sweet sugary wort.'
  },
  {
    term: 'NAS (No Age Statement)',
    category: 'Bottling',
    definition: 'Whisky bottled without an explicit age number on the label, enabling the master blender to marry casks of various vintages purely to achieve a desired flavour profile.'
  },
  {
    term: 'New Make Spirit',
    category: 'Production',
    definition: 'The crystal-clear, high-proof (approx. 68–72% ABV) freshly distilled spirit before it has spent any time inside an oak cask.'
  },
  {
    term: 'PPM (Phenol Parts Per Million)',
    category: 'Measurement',
    definition: 'The scientific unit used to quantify the concentration of phenolic smoke compounds absorbed by barley during peat kilning.'
  },
  {
    term: 'Refill Cask',
    category: 'Maturation',
    definition: 'An oak cask that has already been used once or twice to mature Scotch whisky. Provides subtle wood influence, allowing the distillery’s delicate spirit character to shine through.'
  },
  {
    term: 'Slàinte Mhath (Pronounced "Slan-jeh Vah")',
    category: 'Tradition',
    definition: 'The traditional Scottish Gaelic toast meaning "Good Health!", equivalent to Cheers.'
  },
  {
    term: 'Spirit Safe',
    category: 'Distillation',
    definition: 'A locked, glass-walled brass inspection box where the stillman uses hydrometers, thermometers, and water dilution to monitor distillation without touching the taxable spirit.'
  },
  {
    term: 'Washback',
    category: 'Production',
    definition: 'A large vessel (traditionally built of Oregon pine or Scottish larch, or modern stainless steel) where wort is fermented with yeast into alcoholic wash.'
  },
  {
    term: 'Worm Tub',
    category: 'Distillation',
    definition: 'An old-fashioned condenser consisting of a coiled copper pipe submerged in a large outdoor wooden vat of cold water. Reduces copper contact, yielding richer, meatier spirit.'
  }
];
