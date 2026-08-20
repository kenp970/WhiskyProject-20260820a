import { Whisky, FlavourRatings } from '../types';

export function getWhiskyFlavourRatings(whisky: Whisky): FlavourRatings {
  if (whisky.flavourRatings) return whisky.flavourRatings;
  
  const r = whisky.flavourRadar;
  const tags = whisky.flavourTags.join(' ').toLowerCase();
  const desc = (whisky.tastingNotes.nose + ' ' + whisky.tastingNotes.palate + ' ' + whisky.tastingNotes.finish).toLowerCase();
  
  // Smoke: based on peatSmoke & peatLevel
  let smoke = Math.round(r.peatSmoke / 10);
  if (whisky.peatLevel === 'Unpeated') smoke = 0;
  else if (whisky.peatLevel === 'Lightly Peated') smoke = Math.max(smoke, 3);
  else if (whisky.peatLevel === 'Medium Peated') smoke = Math.max(smoke, 6);
  else if (whisky.peatLevel === 'Heavily Peated') smoke = Math.max(smoke, 9);
  
  // Sweetness: 0-10
  const sweetness = Math.min(10, Math.max(1, Math.round(r.sweetHoney / 10)));
  
  // Fruit: 0-10
  const fruit = Math.min(10, Math.max(1, Math.round(r.fruitCitrus / 10)));
  
  // Spice: 0-10
  let spice = Math.min(10, Math.max(1, Math.round(r.spiceOak / 10)));
  if (tags.includes('cinnamon') || tags.includes('ginger') || tags.includes('pepper') || tags.includes('spice')) {
    spice = Math.min(10, spice + 1);
  }
  
  // Oak: 0-10
  const oak = Math.min(10, Math.max(1, Math.round((r.spiceOak * 0.6 + r.richSherry * 0.4) / 10)));
  
  // Richness: 0-10
  let richness = Math.min(10, Math.max(1, Math.round(r.richSherry / 10)));
  if (tags.includes('sherry') || tags.includes('chocolate') || tags.includes('fruitcake') || tags.includes('toffee')) {
    richness = Math.min(10, Math.max(richness, 8));
  }
  
  // Maritime: 0-10
  let maritime = 0;
  if (whisky.regionId === 'islay' || whisky.regionId === 'islands' || whisky.regionId === 'campbeltown') {
    maritime = 6;
  }
  if (desc.includes('sea salt') || desc.includes('brine') || desc.includes('maritime') || desc.includes('seaweed') || desc.includes('coastal') || desc.includes('spray')) {
    maritime = Math.min(10, maritime + 3);
  }
  if (whisky.distilleryId === 'talisker' || whisky.distilleryId === 'laphroaig' || whisky.distilleryId === 'oban' || whisky.distilleryId === 'springbank') {
    maritime = Math.max(maritime, 8);
  }
  if (whisky.peatLevel === 'Unpeated' && (whisky.regionId === 'speyside' || whisky.regionId === 'lowland')) {
    maritime = 0;
  }
  
  return {
    smoke: Math.min(10, Math.max(0, smoke)),
    sweetness: Math.min(10, Math.max(0, sweetness)),
    fruit: Math.min(10, Math.max(0, fruit)),
    spice: Math.min(10, Math.max(0, spice)),
    oak: Math.min(10, Math.max(0, oak)),
    richness: Math.min(10, Math.max(0, richness)),
    maritime: Math.min(10, Math.max(0, maritime)),
  };
}

export const WHISKIES: Whisky[] = [
  // ============ SPEYSIDE ============
  {
    id: 'macallan-sherry-oak-12',
    name: 'The Macallan 12 Year Old Sherry Oak',
    distilleryId: 'the-macallan',
    distilleryName: 'The Macallan',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '12 Years',
    abv: 43.0,
    caskType: '100% Oloroso Sherry-seasoned European Oak Casks',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'Rich dried fruits, candied ginger, vanilla pod, cinnamon, and toasted wood spice with hints of orange marmalade.',
      palate: 'Deliciously smooth and rich, dried sultanas, spiced prune, Seville orange, ginger, and polished European oak.',
      finish: 'Warm, lingering dried fruit sweetness, spicy ginger, and rich sherry wood.',
      waterDropTip: 'Add 2-3 drops of spring water to open up orange blossom and delicate nutmeg.'
    },
    flavourTags: ['Oloroso Sherry', 'Dried Fruit', 'Ginger Spice', 'Dark Orange', 'Vanilla'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 98,
      fruitCitrus: 84,
      floralGrass: 20,
      sweetHoney: 88,
      spiceOak: 92
    },
    flavourRatings: {
      smoke: 0,
      sweetness: 8,
      fruit: 8,
      spice: 9,
      oak: 9,
      richness: 10,
      maritime: 0
    },
    bottleImage: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'The gold standard of sherry-matured single malt, aged exclusively in hand-picked Oloroso casks from Jerez.',
    awards: ['Double Gold — San Francisco World Spirits Competition', '94 Points — Whisky Advocate'],
    volumeMl: 700
  },
  {
    id: 'macallan-double-cask-12',
    name: 'The Macallan 12 Year Old Double Cask',
    distilleryId: 'the-macallan',
    distilleryName: 'The Macallan',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '12 Years',
    abv: 40.0,
    caskType: 'Sherry-seasoned American & European Oak Butts',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Creamy butterscotch, toffee apple, candied orange, vanilla custard, and freshly felled oak.',
      palate: 'Deliciously honeyed, wood spices, ginger, and citrus balanced with sweet raisins and caramel.',
      finish: 'Warm oak lingers, dry and sweet with lingering spice.',
      waterDropTip: 'Add 2-3 drops of spring water to unlock orange marmalade and delicate nutmeg notes.'
    },
    flavourTags: ['Butterscotch', 'Dried Raisins', 'Vanilla', 'Sherry Oak', 'Candied Orange'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 90,
      fruitCitrus: 82,
      floralGrass: 25,
      sweetHoney: 88,
      spiceOak: 86
    },
    flavourRatings: {
      smoke: 0,
      sweetness: 9,
      fruit: 8,
      spice: 8,
      oak: 8,
      richness: 9,
      maritime: 0
    },
    bottleImage: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'A harmonious partnership of two worlds: European sherry oak for spice and American sherry oak for delicate vanilla sweetness.',
    awards: ['Gold Medal — San Francisco World Spirits Competition', '92 Points — Whisky Advocate'],
    volumeMl: 700
  },
  {
    id: 'aberlour-12',
    name: 'Aberlour 12 Year Old Double Cask Matured',
    distilleryId: 'aberlour',
    distilleryName: 'Aberlour',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '12 Years',
    abv: 40.0,
    caskType: 'Double Cask: Traditional Ex-Bourbon & Oloroso Sherry Butts',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Soft and rounded with fruity notes of red apple, sweet toffee, and toasted malt.',
      palate: 'Fine sherried character with balanced fruity aromas of ripe plum, cinnamon, warm ginger, and chocolate.',
      finish: 'Warm and lingering with sweet spice and gentle oak tannins.',
      waterDropTip: 'Enjoy neat or with a splash of water to release ripe red apples and warming cinnamon toast.'
    },
    flavourTags: ['Red Apple', 'Oloroso Sherry', 'Warm Cinnamon', 'Milk Chocolate', 'Toffee'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 88,
      fruitCitrus: 92,
      floralGrass: 40,
      sweetHoney: 88,
      spiceOak: 84
    },
    flavourRatings: {
      smoke: 0,
      sweetness: 9,
      fruit: 9,
      spice: 8,
      oak: 8,
      richness: 9,
      maritime: 0
    },
    bottleImage: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Crafted at the meeting of the rivers Lour and Spey, famous for its luxurious double-cask harmony of red fruit and sherry.',
    awards: ['Gold Medal — International Spirits Challenge', 'Double Gold — SFWSC'],
    volumeMl: 700
  },
  {
    id: 'macallan-sherry-oak-18',
    name: 'The Macallan 18 Year Old Sherry Oak',
    distilleryId: 'the-macallan',
    distilleryName: 'The Macallan',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '18 Years',
    abv: 43.0,
    caskType: '100% Hand-picked Oloroso Sherry-seasoned European Oak',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'Rich dried fruits, ginger, dark chocolate, treacle toffee, and toasted oak with hints of orange oil.',
      palate: 'Full, rich, viscous mouthfeel with sultanas, rich fruitcake, clove, cinnamon, and espresso.',
      finish: 'Extraordinarily long, dried fruit, wood smoke, and warm ginger spice.',
      waterDropTip: 'Savor neat first, then add a tiny drop of room-temperature still spring water.'
    },
    flavourTags: ['Oloroso Sherry', 'Rich Fruitcake', 'Dark Chocolate', 'Treacle Toffee', 'Cinnamon'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 100,
      fruitCitrus: 80,
      floralGrass: 15,
      sweetHoney: 85,
      spiceOak: 98
    },
    bottleImage: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'An iconic, peerless single malt matured exclusively in hand-picked Oloroso sherry oak casks from Jerez, Spain.',
    awards: ['Double Gold — International Spirits Challenge', '96 Points — Ultimate Spirits Challenge'],
    volumeMl: 700
  },
  {
    id: 'glenfiddich-12',
    name: 'Glenfiddich 12 Year Old Signature Malt',
    distilleryId: 'glenfiddich',
    distilleryName: 'Glenfiddich',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '12 Years',
    abv: 40.0,
    caskType: 'American Oak & European Oak Oloroso Sherry Casks',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Distinctively fresh and fruity with a hint of crisp orchard pear, sweet honey, and delicate floral malt.',
      palate: 'Characteristic sweet, fruity notes developing into butterscotch, cream, malt, and subtle oak flavours.',
      finish: 'A long, smooth, and mellow lingering finish with clean sweetness.',
      waterDropTip: 'Try with a splash of water to open up fresh white peach and honeysuckle.'
    },
    flavourTags: ['Fresh Orchard Pear', 'Green Apple', 'Butterscotch', 'Malt Honey', 'Creamy Oak'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 55,
      fruitCitrus: 95,
      floralGrass: 80,
      sweetHoney: 90,
      spiceOak: 65
    },
    bottleImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'The definitive benchmark Speyside single malt, loved for over a century for its signature fresh orchard pear character.',
    awards: ['Gold Medal — International Wine & Spirit Competition'],
    volumeMl: 700
  },
  {
    id: 'glenfiddich-15-solera',
    name: 'Glenfiddich 15 Year Old Solera Reserve',
    distilleryId: 'glenfiddich',
    distilleryName: 'Glenfiddich',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '15 Years',
    abv: 40.0,
    caskType: 'Ex-Bourbon, Oloroso Sherry & Virgin American Oak in Solera Vat',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Intriguingly complex aroma with sweet heather honey and vanilla fudge combined with rich dark fruits.',
      palate: 'Silky smooth, revealing layers of sherry oak, marzipan, cinnamon, and ginger. Full-bodied and bursting with flavor.',
      finish: 'Satisfyingly rich with lingering sweetness and gentle baking spices.',
      waterDropTip: 'Delightful neat in a Glencairn glass.'
    },
    flavourTags: ['Heather Honey', 'Vanilla Fudge', 'Marzipan', 'Cinnamon', 'Solera Sherry'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 82,
      fruitCitrus: 88,
      floralGrass: 60,
      sweetHoney: 96,
      spiceOak: 82
    },
    bottleImage: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Pioneering Solera vat maturation inspired by Spanish bodegas, never emptied below half capacity since 1998.',
    awards: ['Master Award — Scotch Whisky Masters', 'Gold Medal — International Spirits Challenge'],
    volumeMl: 700
  },
  {
    id: 'glenlivet-12-double-oak',
    name: 'The Glenlivet 12 Year Old Double Oak',
    distilleryId: 'the-glenlivet',
    distilleryName: 'The Glenlivet',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '12 Years',
    abv: 40.0,
    caskType: 'Traditional Oak & American White Oak Casks',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Bright, vibrant, and summer-like. Aromas of golden pineapples, vanilla cream, and summer meadow blossoms.',
      palate: 'Silky smooth with notes of ripe peaches, honeysuckle, vanilla fudge, and subtle toasted hazelnuts.',
      finish: 'Long, creamy, and wonderfully balanced with delicate oak.',
      waterDropTip: 'A single ice sphere or splash of cool water enhances its pineapple ester notes.'
    },
    flavourTags: ['Pineapple', 'Vanilla Cream', 'Honeysuckle', 'Ripe Peaches', 'Toasted Hazelnuts'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 45,
      fruitCitrus: 96,
      floralGrass: 92,
      sweetHoney: 90,
      spiceOak: 60
    },
    bottleImage: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'The historic single malt that set the legal standard for all of Speyside in 1824.',
    awards: ['Gold Medal — The Scotch Whisky Masters'],
    volumeMl: 700
  },
  {
    id: 'glenlivet-18',
    name: 'The Glenlivet 18 Year Old Batch Reserve',
    distilleryId: 'the-glenlivet',
    distilleryName: 'The Glenlivet',
    regionId: 'speyside',
    regionName: 'Speyside',
    ageStatement: '18 Years',
    abv: 43.0,
    caskType: 'First and Second-fill American Oak & Ex-Sherry Oak Butts',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'Rich and elegant. Ripe apricot, baked apples, sultanas, toasted brioche, and sandalwood.',
      palate: 'Velvety mouthfeel with bursts of winter spice, candied orange peel, dark toffee, and manuka honey.',
      finish: 'Extremely long with toasted oak, bitter cocoa, and warming ginger.',
      waterDropTip: 'Allow to breathe for 5 minutes in your glass before taking the first sip.'
    },
    flavourTags: ['Baked Apple', 'Sultanas', 'Candied Orange', 'Sandalwood', 'Toffee'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 88,
      fruitCitrus: 85,
      floralGrass: 55,
      sweetHoney: 88,
      spiceOak: 92
    },
    bottleImage: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'An opulent multi-award winning masterpiece showing sublime maturity and complex wood balance.',
    awards: ['Double Gold Medal — San Francisco World Spirits Competition (3x Winner)'],
    volumeMl: 700
  },

  // ============ ISLAY ============
  {
    id: 'ardbeg-ten',
    name: 'Ardbeg 10 Year Old',
    distilleryId: 'ardbeg',
    distilleryName: 'Ardbeg',
    regionId: 'islay',
    regionName: 'Islay',
    ageStatement: '10 Years',
    abv: 46.0,
    caskType: 'Ex-Bourbon American White Oak (Non-chill filtered)',
    peatLevel: 'Heavily Peated',
    peatPpmApprox: 55,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'A burst of intense smoky fruit — peat infused with zesty lemon, lime, dark chocolate, and smoked black pepper.',
      palate: 'An explosion of crackling peat and espresso, followed by lemon, pear, warm cinnamon, and creamy vanilla.',
      finish: 'Long and smoky with lingering tar, espresso, toasted marshmallows, and sea salt.',
      waterDropTip: 'Add 3 drops of water to reveal subtle floral heather and juicy key lime.'
    },
    flavourTags: ['Bonfire Smoke', 'Tar & Ash', 'Lemon Lime Zest', 'Espresso', 'Smoked Bacon'],
    flavourRadar: {
      peatSmoke: 98,
      richSherry: 40,
      fruitCitrus: 80,
      floralGrass: 20,
      sweetHoney: 50,
      spiceOak: 90
    },
    bottleImage: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Regarded by whisky connoisseurs as the peatiest, smokiest, yet most harmoniously complex single malt in the world.',
    awards: ['World Whisky of the Year — Jim Murray Whisky Bible', 'Double Gold — SFWSC'],
    volumeMl: 700
  },
  {
    id: 'ardbeg-uigeadail',
    name: 'Ardbeg Uigeadail',
    distilleryId: 'ardbeg',
    distilleryName: 'Ardbeg',
    regionId: 'islay',
    regionName: 'Islay',
    ageStatement: 'NAS (Cask Strength)',
    abv: 54.2,
    caskType: 'Ex-Bourbon & Old Oloroso Sherry Butts',
    peatLevel: 'Heavily Peated',
    peatPpmApprox: 55,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'Rich, heady, and decadent. Christmas cake, walnut oil, violet aromatics, and rich cedar smoke.',
      palate: 'Rich, chewy, and coating. Treacle, smoked bacon, dark raisins, winter spices, and leather.',
      finish: 'Deep, long, and smoky with dark cocoa, cured ham, and rich fruitcake.',
      waterDropTip: 'At 54.2% ABV, a good splash of water tames the fire and brings forward lush sultanas.'
    },
    flavourTags: ['Heavy Peat', 'Oloroso Sherry', 'Smoked Meat', 'Dark Chocolate', 'Christmas Pudding'],
    flavourRadar: {
      peatSmoke: 96,
      richSherry: 90,
      fruitCitrus: 65,
      floralGrass: 20,
      sweetHoney: 60,
      spiceOak: 95
    },
    bottleImage: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Named after the mystical dark loch that supplies Ardbeg with its peat-laden brewing water.',
    awards: ['World Whisky of the Year Winner', '97.5 Points — Whisky Bible'],
    volumeMl: 700
  },
  {
    id: 'lagavulin-16',
    name: 'Lagavulin 16 Year Old',
    distilleryId: 'lagavulin',
    distilleryName: 'Lagavulin',
    regionId: 'islay',
    regionName: 'Islay',
    ageStatement: '16 Years',
    abv: 43.0,
    caskType: 'Refill American Oak & European Sherry Casks',
    peatLevel: 'Heavily Peated',
    peatPpmApprox: 38,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'Intensely pungent peat smoke with sea spray, lapsang souchong tea, dried cherries, and rich dark malt.',
      palate: 'Full, rich, and dry. Peat smoke fills the mouth with gentle sweetness, sea salt, lapsang, and pipe tobacco.',
      finish: 'Immense, warming, and peaty with smoky oak, dates, and salty seaweed.',
      waterDropTip: 'Perfection neat in a crystal copita glass at room temperature.'
    },
    flavourTags: ['Lapsang Tea', 'Pipe Tobacco', 'Dried Cherries', 'Maritime Peat', 'Sea Salt'],
    flavourRadar: {
      peatSmoke: 94,
      richSherry: 80,
      fruitCitrus: 52,
      floralGrass: 15,
      sweetHoney: 62,
      spiceOak: 94
    },
    bottleImage: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'The aristocratic king of Islay malts. Sixteen years of cold Atlantic slumber craft this legendary benchmark.',
    awards: ['Double Gold — San Francisco World Spirits Competition', 'Best Single Malt 13-19 Years'],
    volumeMl: 700
  },
  {
    id: 'laphroaig-10',
    name: 'Laphroaig 10 Year Old Original',
    distilleryId: 'laphroaig',
    distilleryName: 'Laphroaig',
    regionId: 'islay',
    regionName: 'Islay',
    ageStatement: '10 Years',
    abv: 40.0,
    caskType: 'First-fill Ex-Bourbon American Oak Barrels',
    peatLevel: 'Heavily Peated',
    peatPpmApprox: 45,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Huge smoke, seaweed, medicinal iodine, and a hint of sweetness from the American bourbon oak.',
      palate: 'A surprising sweetness with hints of salt and layers of peatiness, vanilla, and cardamom.',
      finish: 'Lingering tar, maritime salt, cold campfire ember, and spicy vanilla.',
      waterDropTip: 'A splash of cold water rounds off the medicinal peak and unlocks creamy vanilla malt.'
    },
    flavourTags: ['Medicinal Iodine', 'Seaweed Kelp', 'Campfire Ash', 'Vanilla Cream', 'Cardamom'],
    flavourRadar: {
      peatSmoke: 99,
      richSherry: 42,
      fruitCitrus: 60,
      floralGrass: 22,
      sweetHoney: 48,
      spiceOak: 88
    },
    bottleImage: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'The iconic, unapologetically medicinal Islay malt that holds the Royal Warrant of HRH The Prince of Wales.',
    awards: ['Gold Medal — San Francisco World Spirits Competition'],
    volumeMl: 700
  },

  // ============ HIGHLAND ============
  {
    id: 'glenmorangie-original-10',
    name: 'Glenmorangie The Original 10 Year Old',
    distilleryId: 'glenmorangie',
    distilleryName: 'Glenmorangie',
    regionId: 'highland',
    regionName: 'Highland',
    ageStatement: '10 Years',
    abv: 40.0,
    caskType: 'First and Second-fill American White Oak Bourbon Barrels',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Citrus and ripening peaches softened by the aroma of creamy vanilla, tiramisu, and blossoming floral gardens.',
      palate: 'Silky and creamy, bursting with Mandarin orange, lemon, peach nectar, and vanilla ice cream.',
      finish: 'Clean and salivating with lingering orange zest and gentle oak spice.',
      waterDropTip: 'Delightful both neat or with a single clear ice sphere in warm weather.'
    },
    flavourTags: ['Mandarin Orange', 'Peach Nectar', 'Creamy Vanilla', 'Honeysuckle', 'Tiramisu'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 50,
      fruitCitrus: 98,
      floralGrass: 88,
      sweetHoney: 94,
      spiceOak: 70
    },
    bottleImage: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Distilled in Scotland’s tallest stills (giraffe-height) for unmatched delicacy and pure fruit esters.',
    awards: ['Gold Medal — International Spirits Challenge'],
    volumeMl: 700
  },
  {
    id: 'glenmorangie-quinta-ruban-14',
    name: 'Glenmorangie The Quinta Ruban 14 Year Old',
    distilleryId: 'glenmorangie',
    distilleryName: 'Glenmorangie',
    regionId: 'highland',
    regionName: 'Highland',
    ageStatement: '14 Years',
    abv: 46.0,
    caskType: 'Ex-Bourbon then Finished in Ruby Port Pipes from Portugal',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Dark mint chocolate, Seville oranges, sandalwood, walnut, and blackcurrant jam.',
      palate: 'Velvety and rich with Turkish delight, dark mint truffles, Seville orange marmalade, and spice.',
      finish: 'Deep, dark chocolate and cooling mint with warm berry compote.',
      waterDropTip: 'Savor neat to appreciate the velvety port wine richness.'
    },
    flavourTags: ['Dark Mint Chocolate', 'Ruby Port Wine', 'Turkish Delight', 'Blackcurrant', 'Walnut'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 88,
      fruitCitrus: 86,
      floralGrass: 60,
      sweetHoney: 90,
      spiceOak: 88
    },
    bottleImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Matured for 10 years in bourbon casks then finished for 4 full years in the finest Quintas Port pipes.',
    awards: ['Gold Outstanding — IWSC', 'Best Highland Single Malt'],
    volumeMl: 700
  },
  {
    id: 'dalmore-15',
    name: 'The Dalmore 15 Year Old',
    distilleryId: 'dalmore',
    distilleryName: 'The Dalmore',
    regionId: 'highland',
    regionName: 'Highland',
    ageStatement: '15 Years',
    abv: 40.0,
    caskType: 'Finished in 3 different styles of Sherry: Amoroso, Apostoles & Matusalem Oloroso',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'Orange marmalade, cinnamon, nutmeg, and rich treacle tart with chocolate malt.',
      palate: 'Mandarin orange, dark chocolate, vanilla bean, ginger, and crushed winter spices.',
      finish: 'Lingering dark roast coffee, spiced dark cherries, and rich oak.',
      waterDropTip: 'Add 2 drops of water to open up layers of dark chocolate truffle and espresso.'
    },
    flavourTags: ['Seville Marmalade', 'Dark Chocolate', 'Christmas Spice', 'Matusalem Sherry', 'Espresso'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 98,
      fruitCitrus: 82,
      floralGrass: 20,
      sweetHoney: 86,
      spiceOak: 95
    },
    bottleImage: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'A decadent masterpiece showcasing three different styles of Spanish sherry wood from Gonzalez Byass.',
    awards: ['Double Gold — San Francisco World Spirits Competition'],
    volumeMl: 700
  },
  {
    id: 'oban-14',
    name: 'Oban 14 Year Old',
    distilleryId: 'oban',
    distilleryName: 'Oban',
    regionId: 'highland',
    regionName: 'Highland (Western)',
    ageStatement: '14 Years',
    abv: 43.0,
    caskType: 'Refill American White Oak Barrels',
    peatLevel: 'Lightly Peated',
    peatPpmApprox: 10,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Rich sweetness and fruits — oranges, lemons, and pears with sea salt and peaty smokiness.',
      palate: 'Mouth-coating autumn fruits — dried figs, honeyed spice, smoked malt, and coastal sea salt.',
      finish: 'Smooth and long with sweet oak, dark cocoa, and lingering dry smoke.',
      waterDropTip: 'Add a single teardrop of water to emphasize the sea breeze and golden fig notes.'
    },
    flavourTags: ['Honeyed Pear', 'Sea Salt Spray', 'Dried Fig', 'Subtle Peat', 'Orange Peel'],
    flavourRadar: {
      peatSmoke: 35,
      richSherry: 65,
      fruitCitrus: 88,
      floralGrass: 68,
      sweetHoney: 90,
      spiceOak: 82
    },
    bottleImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Where the Highlands meet the Islands. A sublime balance of orchard honey, sea spray, and gentle peat.',
    awards: ['Gold Medal — San Francisco World Spirits Competition'],
    volumeMl: 700
  },

  // ============ LOWLAND ============
  {
    id: 'auchentoshan-three-wood',
    name: 'Auchentoshan Three Wood',
    distilleryId: 'auchentoshan',
    distilleryName: 'Auchentoshan',
    regionId: 'lowland',
    regionName: 'Lowland',
    ageStatement: 'NAS (Triple Matured)',
    abv: 43.0,
    caskType: 'Ex-Bourbon, Oloroso Sherry & Pedro Ximénez Sherry Casks',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Blackcurrant, brown sugar, orange, plum, and raisin with rich toasted oak.',
      palate: 'Fruit and syrup. Hazelnut with hints of cinnamon and lemon, butterscotch sweetness, and thick treacle.',
      finish: 'Fresh and fruity with long-lasting oaky sweetness and dark cherry.',
      waterDropTip: 'Neat in a tumbler or Glencairn to enjoy the deep PX sherry syrup.'
    },
    flavourTags: ['Pedro Ximénez', 'Brown Sugar', 'Hazelnut', 'Butterscotch', 'Plum'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 92,
      fruitCitrus: 84,
      floralGrass: 65,
      sweetHoney: 88,
      spiceOak: 82
    },
    bottleImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    characterSnippet: '100% triple-distilled, then matured sequentially in three distinct cask types for unmatched depth.',
    awards: ['Gold Medal — International Spirits Challenge'],
    volumeMl: 700
  },
  {
    id: 'glenkinchie-12',
    name: 'Glenkinchie 12 Year Old',
    distilleryId: 'glenkinchie',
    distilleryName: 'Glenkinchie',
    regionId: 'lowland',
    regionName: 'Lowland',
    ageStatement: '12 Years',
    abv: 43.0,
    caskType: 'Refill American White Oak Casks',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Light, floral, and fragrant. Freshly mown grass, sweet summer blossoms, lemon peel, and barley malt.',
      palate: 'Sweet and soft start leading into lemon cheesecake, honeysuckle, stewed fruits, and light ginger.',
      finish: 'Medium-length, crisp and clean with a dry, oaky, and grassy persistence.',
      waterDropTip: 'An ideal classic aperitif dram before dinner; enjoy neat.'
    },
    flavourTags: ['Fresh Cut Grass', 'Lemon Zest', 'Honeysuckle', 'Cereal Malt', 'Ginger'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 35,
      fruitCitrus: 90,
      floralGrass: 100,
      sweetHoney: 82,
      spiceOak: 60
    },
    bottleImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Known as "The Edinburgh Malt", distilling the quintessential floral, grassy elegance of the Scottish Lowlands.',
    awards: ['Gold Medal — The Scotch Whisky Masters'],
    volumeMl: 700
  },
  {
    id: 'lochlea-our-barley',
    name: 'Lochlea Our Barley Single Malt',
    distilleryId: 'lochlea',
    distilleryName: 'Lochlea',
    regionId: 'lowland',
    regionName: 'Lowland',
    ageStatement: 'NAS',
    abv: 46.0,
    caskType: 'First-Fill Bourbon, Oloroso Sherry & STR Shaved-Toasted Wine Barriques',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Pear syrup, fruit bonbons, warm farm hay, golden syrup, and toasted sourdough.',
      palate: 'Freshly harvested barley, candied orange slices, roasted macadamia nuts, and baking spice.',
      finish: 'Long, crisp, and cereal-sweet with lingering black pepper and vanilla pod.',
      waterDropTip: 'Bottled at 46% non-chill filtered; adding a drop of water highlights the toasted macadamia notes.'
    },
    flavourTags: ['Fresh Barley', 'Pear Drops', 'Toasted Macadamia', 'Golden Syrup', 'STR Wine Oak'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 65,
      fruitCitrus: 88,
      floralGrass: 85,
      sweetHoney: 88,
      spiceOak: 75
    },
    bottleImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'An authentic 100% farm-to-bottle single malt grown and distilled on the historic Robert Burns farm.',
    awards: ['Gold Medal — World Whiskies Awards'],
    volumeMl: 700
  },

  // ============ CAMPBELTOWN ============
  {
    id: 'springbank-10',
    name: 'Springbank 10 Year Old',
    distilleryId: 'springbank',
    distilleryName: 'Springbank',
    regionId: 'campbeltown',
    regionName: 'Campbeltown',
    ageStatement: '10 Years',
    abv: 46.0,
    caskType: '60% Bourbon & 40% Sherry Casks (2.5x Distilled)',
    peatLevel: 'Medium Peated',
    peatPpmApprox: 15,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'Orchard fruits (pear), vanilla, damp earth, salted butter, and a gentle maritime coastal peat breeze.',
      palate: 'Viscous, oily, and complex. Salted caramel, dried apricots, engine oil, cinnamon, and smoke.',
      finish: 'Dunnage warehouse oak, sea spray, cracked pepper, and sweet lingering malt.',
      waterDropTip: 'Give this malt 10 minutes in the glass to reveal its incredible oily layers.'
    },
    flavourTags: ['Salted Caramel', 'Engine Oil', 'Dried Apricot', 'Maritime Salt', 'Dunnage Peat'],
    flavourRadar: {
      peatSmoke: 60,
      richSherry: 75,
      fruitCitrus: 75,
      floralGrass: 40,
      sweetHoney: 72,
      spiceOak: 90
    },
    bottleImage: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'The holy grail of artisan whisky making. 100% floor malted, distilled 2.5 times and bottled without filtration.',
    awards: ['Best Scotch Campbeltown 12 Years and Under — World Whiskies Awards'],
    volumeMl: 700
  },
  {
    id: 'glen-scotia-victoriana',
    name: 'Glen Scotia Victoriana Cask Strength',
    distilleryId: 'glen-scotia',
    distilleryName: 'Glen Scotia',
    regionId: 'campbeltown',
    regionName: 'Campbeltown',
    ageStatement: 'NAS (Cask Strength)',
    abv: 54.2,
    caskType: 'Finished in Deep Charred Heavy Oak & Pedro Ximénez Casks',
    peatLevel: 'Medium Peated',
    peatPpmApprox: 20,
    priceTier: '$$$$',
    tastingNotes: {
      nose: 'An elegant nose with hints of sea spray, dark crème brûlée, cocoa, and caramelized sugar.',
      palate: 'Rich and full-bodied. Spiced blackcurrant, dark chocolate, salted toffee, and toasted oak with wood smoke.',
      finish: 'Long, dry, and sweet with cocoa, salty sea breeze, and roasted nuts.',
      waterDropTip: 'Add 4-5 drops of water to reveal decadent crème brûlée and roasted cacao.'
    },
    flavourTags: ['Crème Brûlée', 'Sea Spray', 'Deep Char Oak', 'Salted Toffee', 'Campfire Ember'],
    flavourRadar: {
      peatSmoke: 58,
      richSherry: 86,
      fruitCitrus: 72,
      floralGrass: 35,
      sweetHoney: 80,
      spiceOak: 96
    },
    bottleImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'A modern recreation of Victorian Campbeltown cask-strength whisky bottled directly from heavily charred oak.',
    awards: ['Best in Show — San Francisco World Spirits Competition (Overall Winner)'],
    volumeMl: 700
  },
  {
    id: 'kilkerran-12',
    name: 'Kilkerran 12 Year Old Single Malt',
    distilleryId: 'kilkerran',
    distilleryName: 'Glengyle / Kilkerran',
    regionId: 'campbeltown',
    regionName: 'Campbeltown',
    ageStatement: '12 Years',
    abv: 46.0,
    caskType: '70% Bourbon Barrels & 30% Oloroso Sherry Casks',
    peatLevel: 'Lightly Peated',
    peatPpmApprox: 15,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Oak notes are dominant, followed by toasted marshmallows, dried fruit pudding, cherries, and coastal breeze.',
      palate: 'Initial sweet citrus and lemon meringue, followed by sea salt, oily brine, honey, and biscuit malt.',
      finish: 'Long and salty with lingering wood smoke, honeycomb, and dark chocolate.',
      waterDropTip: 'A splash of water accentuates the lemon drizzle cake and salty ocean spray.'
    },
    flavourTags: ['Lemon Meringue', 'Toasted Marshmallow', 'Coastal Brine', 'Gentle Smoke', 'Honeycomb'],
    flavourRadar: {
      peatSmoke: 52,
      richSherry: 68,
      fruitCitrus: 84,
      floralGrass: 52,
      sweetHoney: 78,
      spiceOak: 84
    },
    bottleImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Revived from history at Glengyle distillery to preserve Campbeltown’s status as a distinct whisky capital.',
    awards: ['Gold Medal — The Scotch Whisky Masters'],
    volumeMl: 700
  },

  // ============ ISLANDS ============
  {
    id: 'highland-park-12',
    name: 'Highland Park 12 Year Old Viking Honour',
    distilleryId: 'highland-park',
    distilleryName: 'Highland Park',
    regionId: 'islands',
    regionName: 'Islands (Orkney)',
    ageStatement: '12 Years',
    abv: 40.0,
    caskType: 'Sherry-seasoned European & American Oak Casks',
    peatLevel: 'Medium Peated',
    peatPpmApprox: 20,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Heather honey sweetness, peat smoke, rich fruitcake, and Seville orange peel.',
      palate: 'Warm winter spices, dried fruits, wild honey, and aromatic heather peat smoke.',
      finish: 'Deliciously long, lingering with sweet heather and soft spicy wood smoke.',
      waterDropTip: 'Add 2 drops of water to amplify the wild honey and aromatic floral smoke.'
    },
    flavourTags: ['Heather Smoke', 'Wild Honey', 'Fruitcake', 'Seville Orange', 'Cinnamon Oak'],
    flavourRadar: {
      peatSmoke: 62,
      richSherry: 84,
      fruitCitrus: 78,
      floralGrass: 72,
      sweetHoney: 96,
      spiceOak: 85
    },
    bottleImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Crafted on Orkney using wood-free heather peat from Hobbister Moor and first-fill sherry casks.',
    awards: ['Gold Medal — World Whiskies Awards', '93 Points — Ultimate Spirits Challenge'],
    volumeMl: 700
  },
  {
    id: 'talisker-10',
    name: 'Talisker 10 Year Old',
    distilleryId: 'talisker',
    distilleryName: 'Talisker',
    regionId: 'islands',
    regionName: 'Islands (Skye)',
    ageStatement: '10 Years',
    abv: 45.8,
    caskType: 'American Oak Refill Casks',
    peatLevel: 'Medium Peated',
    peatPpmApprox: 20,
    priceTier: '$$$',
    tastingNotes: {
      nose: 'Pungent peat smoke with maritime sea spray, oyster brine, and sweet citrus lemon.',
      palate: 'A volcanic explosion of warm barley malt, dried fruits, sea salt, and spicy cracked black pepper.',
      finish: 'Huge, long, warming, and famously peppery with ocean smoke.',
      waterDropTip: 'Try neat first, then add a drop of water to taste the sweet malt beneath the pepper burst.'
    },
    flavourTags: ['Cracked Black Pepper', 'Sea Spray Brine', 'Coastal Peat', 'Sweet Barley', 'Oyster Shell'],
    flavourRadar: {
      peatSmoke: 76,
      richSherry: 48,
      fruitCitrus: 74,
      floralGrass: 38,
      sweetHoney: 65,
      spiceOak: 98
    },
    bottleImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'The iconic malt of Skye. Famously celebrated for its signature "chili catch" cracked black pepper finish.',
    awards: ['Double Gold — San Francisco World Spirits Competition', 'Best Islands Single Malt'],
    volumeMl: 700
  },
  {
    id: 'arran-10',
    name: 'Arran 10 Year Old Single Malt',
    distilleryId: 'arran',
    distilleryName: 'Arran (Lochranza)',
    regionId: 'islands',
    regionName: 'Islands (Arran)',
    ageStatement: '10 Years',
    abv: 46.0,
    caskType: 'First-fill & Refill Ex-Bourbon & Sherry Casks (Non-chill filtered)',
    peatLevel: 'Unpeated',
    peatPpmApprox: 0,
    priceTier: '$$',
    tastingNotes: {
      nose: 'Initial rush of rich vanilla sweetness giving way to kiwi, banana, cantaloupe melon, and dusting of cocoa.',
      palate: 'A classic lush mouthfeel. Cinnamon, baked apples, honeyed citrus, coconut, and toasted hazelnut.',
      finish: 'Bursting with clean orchard apple, creamy oak, and sweet malt.',
      waterDropTip: 'Unpeated and bottled at 46% ABV; a small drop of water turns this into a lush orchard bouquet.'
    },
    flavourTags: ['Green Apple', 'Tropical Kiwi', 'Vanilla Cream', 'Honeycomb', 'Toasted Hazelnut'],
    flavourRadar: {
      peatSmoke: 0,
      richSherry: 68,
      fruitCitrus: 96,
      floralGrass: 78,
      sweetHoney: 92,
      spiceOak: 72
    },
    bottleImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    characterSnippet: 'Bottled naturally without artificial colouring or chill-filtration from the pure waters of Loch na Davie.',
    awards: ['Gold Medal — San Francisco World Spirits Competition', '93 Points — Whisky Advocate'],
    volumeMl: 700
  }
];
