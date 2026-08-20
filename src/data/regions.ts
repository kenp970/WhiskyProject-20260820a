import { Region } from '../types';

export const REGIONS: Region[] = [
  {
    id: 'speyside',
    name: 'Speyside',
    gaelicName: 'Srath Spè',
    tagline: 'The Epicentre of Malt Whisky & Orchard Elegance',
    shortDescription: 'Nestled in the fertile Strathspey valley along the River Spey, producing over half of all Scottish single malts renowned for sweet, fruity, and sherried elegance.',
    fullDescription: 'Speyside is the undisputed heartland of Scottish single malt production, hosting roughly half of Scotland’s operating distilleries. Sheltered between the Cairngorms and the Moray Firth, its pure snow-melt waters, mild climate, and bountiful barley harvests foster whiskies of peerless refinement. Speyside malts range from light, honeyed, floral drams to rich, opulent, heavily sherried masterpieces celebrated across the globe.',
    landscapeImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80',
    mapCoordinates: { x: 72, y: 38 },
    terroir: {
      climate: 'Temperate microclimate sheltered by the Cairngorm mountain range, fostering gentle cask interaction.',
      waterSource: 'Crystal-clear granite and quartz springs feeding the River Spey, River Livet, and River Fiddich.',
      peatCharacteristics: 'Historically minimal or unpeated, focusing on pure malted barley and oak maturation.',
      caskTraditions: 'Pioneers of European Oloroso & Pedro Ximénez sherry butts alongside American ex-bourbon white oak.'
    },
    typicalFlavours: ['Green Apple', 'Dried Sultanas', 'Vanilla Honey', 'Nutmeg', 'Dark Chocolate', 'Floral Blossom'],
    flavourProfile: {
      peatSmoke: 10,
      richSherry: 85,
      fruitCitrus: 90,
      floralGrass: 65,
      sweetHoney: 88,
      spiceOak: 75
    },
    distilleriesCount: 50,
    featuredDistilleryIds: ['the-macallan', 'glenfiddich', 'the-glenlivet'],
    notableWhiskies: ['The Macallan Double Cask 12', 'Glenfiddich 15 Solera', 'The Glenlivet 18'],
    historicalHighlights: 'Home to the famous illicit smugglers of the Glenlivet valley in the 1800s before legal licensing in 1823 sparked the modern golden era.'
  },
  {
    id: 'highland',
    name: 'Highland',
    gaelicName: 'A\' Ghàidhealtachd',
    tagline: 'Vast Landscapes, Regal Malts & Diverse Terroirs',
    shortDescription: 'The largest whisky region in Scotland, spanning rugged mountain glens to northern coastal cliffs, creating diverse profiles from rich toffee to coastal heather.',
    fullDescription: 'Encompassing the dramatic majesty of Scotland’s mountains, ancient lochs, and sweeping coastlines, the Highlands offer an extraordinarily varied spectrum of single malts. Northern Highland malts boast rich, full-bodied waxy complexities; Eastern Highland drams are rounded and fruity; Western Highland distilleries bring gentle sea-salt breezes and maritime peat; while Central Highlands deliver delicate honey and floral notes.',
    landscapeImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
    mapCoordinates: { x: 62, y: 28 },
    terroir: {
      climate: 'Cool, mountain-influenced climate with cold damp winters and fresh summers slowing spirit maturation to perfection.',
      waterSource: 'Deep mineral-rich peat lochs, mountain streams flowing over red sandstone and heather moorlands.',
      peatCharacteristics: 'Variable peat usage; dry heather peat in the north and maritime coastal peat in the west.',
      caskTraditions: 'Innovative wood finishes including Port pipes, Sauternes wine barriques, and heavy sherry casks.'
    },
    typicalFlavours: ['Heather Honey', 'Orange Peel', 'Rich Toffee', 'Bramble Fruits', 'Gentle Maritime Salt', 'Warm Oak'],
    flavourProfile: {
      peatSmoke: 30,
      richSherry: 75,
      fruitCitrus: 80,
      floralGrass: 70,
      sweetHoney: 85,
      spiceOak: 82
    },
    distilleriesCount: 30,
    featuredDistilleryIds: ['glenmorangie', 'dalmore', 'oban'],
    notableWhiskies: ['Glenmorangie Original 10', 'Dalmore 15', 'Oban 14'],
    historicalHighlights: 'The highland clans and illicit stills carved hidden recipes in deep glens that would eventually conquer the royal courts of Britain.'
  },
  {
    id: 'islay',
    name: 'Islay',
    gaelicName: 'Ìle',
    tagline: 'The Queen of the Hebrides & Smoky Peat Legend',
    shortDescription: 'A wind-swept Atlantic island world-famous for intensely peated, maritime, and medicinal single malts fueled by ancient coastal peat bogs.',
    fullDescription: 'Islay is the spiritual home of heavy peat smoke. Though measuring only 25 miles across, this small Hebridean isle sustains some of the most worshipped distilleries on Earth. Battered by ferocious Atlantic storms, Islay’s peat is saturated with sea spray, kelp, and heather. The resulting drams deliver unmistakable bonfire smoke, tar, brine, seaweed, and medicinal iodine balanced by profound underlying sweet malt and citrus.',
    landscapeImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=80',
    mapCoordinates: { x: 28, y: 72 },
    terroir: {
      climate: 'Fierce maritime Atlantic winds, high humidity, and salty ocean air that permeates every maturation warehouse.',
      waterSource: 'Dark, peaty lochs and mossy moor springs infused with natural botanical decay and ocean minerals.',
      peatCharacteristics: 'Dense maritime moss and sea-kelp peat producing phenolics up to 50+ PPM.',
      caskTraditions: 'Ex-bourbon American oak, PX sherry casks, and French virgin oak aging in seaside dunnage warehouses.'
    },
    typicalFlavours: ['Bonfire Smoke', 'Sea Salt Brine', 'Medicinal Iodine', 'Charred Oak', 'Smoked Bacon', 'Lemon Zest'],
    flavourProfile: {
      peatSmoke: 98,
      richSherry: 60,
      fruitCitrus: 55,
      floralGrass: 25,
      sweetHoney: 45,
      spiceOak: 78
    },
    distilleriesCount: 9,
    featuredDistilleryIds: ['ardbeg', 'lagavulin', 'laphroaig'],
    notableWhiskies: ['Ardbeg 10', 'Lagavulin 16', 'Laphroaig 10'],
    historicalHighlights: 'Legend holds that Irish monks first introduced distillation to Scotland via Islay in the 14th century due to its abundance of pure water and peat.'
  },
  {
    id: 'lowland',
    name: 'Lowland',
    gaelicName: 'A\' Ghalldachd',
    tagline: 'Gentle Grassy Drams, Floral Notes & Triple Distillation',
    shortDescription: 'Rolling fertile plains and gentle river basins producing light, crisp, floral, and unpeated single malts often nicknamed "The Lowland Ladies".',
    fullDescription: 'Stretching from the Scottish border up to the Highland boundary fault line, the Lowlands are characterized by rolling green farmland, fertile agricultural fields, and historical trading hubs. Lowland single malts are celebrated for their approachable, light, grassy, and floral character. Distilleries here often champion triple distillation and unpeated malt, creating crisp aperitif drams with notes of lemon grass, honeysuckle, and creamy vanilla.',
    landscapeImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    mapCoordinates: { x: 68, y: 78 },
    terroir: {
      climate: 'Milder, sunnier agricultural climate supporting prime golden malting barley cultivation.',
      waterSource: 'Limestone-filtered, soft fresh waters from rural farmland springs and Lowland canal networks.',
      peatCharacteristics: 'Historically predominantly unpeated, showcasing clean cereal malt sweetness.',
      caskTraditions: 'First-fill bourbon casks, French red wine barriques, and virgin American oak.'
    },
    typicalFlavours: ['Fresh Cut Grass', 'Honeysuckle', 'Lemon Meringue', 'Creamy Vanilla', 'Toasted Barley', 'Ginger'],
    flavourProfile: {
      peatSmoke: 12,
      richSherry: 45,
      fruitCitrus: 82,
      floralGrass: 95,
      sweetHoney: 80,
      spiceOak: 60
    },
    distilleriesCount: 15,
    featuredDistilleryIds: ['auchentoshan', 'glenkinchie', 'lochlea'],
    notableWhiskies: ['Auchentoshan Three Wood', 'Glenkinchie 12', 'Lochlea Our Barley'],
    historicalHighlights: 'Lowland distilleries were early industrial champions supplying the booming cities of Glasgow and Edinburgh with triple-distilled pure malts.'
  },
  {
    id: 'campbeltown',
    name: 'Campbeltown',
    gaelicName: 'Ceann Loch Chille Chiarain',
    tagline: 'The Historic Victorian Whisky Capital & Oily Maritime Soul',
    shortDescription: 'Once the bustling whisky capital of the world with over 30 distilleries, now a cherished enclave known for distinctive oily, salty, and complex malts.',
    fullDescription: 'Located near the tip of the remote Kintyre peninsula, Campbeltown was historically crowned the "Whisky Capital of the World" during the Victorian era, bustling with over 30 distilleries and maritime steamships exporting Scotch to the Americas. Today, its surviving distilleries guard rare traditional handcrafted methods, producing distinctive drams renowned for heavy oils, maritime brine, engine smoke, fruit leather, and salted caramel.',
    landscapeImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    mapCoordinates: { x: 36, y: 88 },
    terroir: {
      climate: 'Wet, salty coastal microclimate surrounded by the Irish Sea and the Firth of Clyde.',
      waterSource: 'Crosshill Loch and natural springs in the Mull of Kintyre hills.',
      peatCharacteristics: 'Locally cut damp moss peat blended with coal and hardwood fires in traditional kilns.',
      caskTraditions: 'Traditional dunnage warehouses stacked on earthen floors absorbing maritime humidity for decades.'
    },
    typicalFlavours: ['Sea Spray Brine', 'Wet Slate', 'Campfire Ember', 'Salted Butter', 'Engine Oil', 'Dried Fig'],
    flavourProfile: {
      peatSmoke: 65,
      richSherry: 70,
      fruitCitrus: 60,
      floralGrass: 35,
      sweetHoney: 65,
      spiceOak: 85
    },
    distilleriesCount: 3,
    featuredDistilleryIds: ['springbank', 'glen-scotia', 'kilkerran'],
    notableWhiskies: ['Springbank 10', 'Glen Scotia Victoriana', 'Kilkerran 12'],
    historicalHighlights: 'Preserving 100% on-site floor malting, hand-tended direct-fired copper stills, and traditional family independence.'
  },
  {
    id: 'islands',
    name: 'Islands',
    gaelicName: 'Na h-Eileanan',
    tagline: 'Wild Coasts, Viking Heather & Volcanic Maritime Character',
    shortDescription: 'Covering Skye, Orkney, Mull, Jura, and Arran, producing coastal masterpieces characterized by black pepper, heather honey, and sea spray.',
    fullDescription: 'While officially classified under the broader Highland region by Scotch Whisky Regulations, the Scottish Islands possess a singular identity defined by dramatic volcanic geology, Atlantic isolation, and ancient Viking heritage. From the fiery maritime black pepper of Skye (Talisker) and the heather-smoked honey of Orkney (Highland Park) to the orchard freshness of Arran, the Islands create dramatic, coastal, and memorable drams.',
    landscapeImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    mapCoordinates: { x: 38, y: 35 },
    terroir: {
      climate: 'Hyper-oceanic, storm-swept coastlines with dramatic tide changes and relentless salty breezes.',
      waterSource: 'Cnoc nan Speireag springs and volcanic lochs flowing over basalt rocks and wild heather.',
      peatCharacteristics: 'Hobbister Moor floral heather peat in Orkney; coastal moss in Skye.',
      caskTraditions: 'Heavy use of European sherry wood, American refill casks, and bespoke wine finishing.'
    },
    typicalFlavours: ['Cracked Black Pepper', 'Heather Smoke', 'Orchard Peach', 'Salty Spray', 'Honeycomb', 'Warm Toffee'],
    flavourProfile: {
      peatSmoke: 60,
      richSherry: 68,
      fruitCitrus: 75,
      floralGrass: 58,
      sweetHoney: 82,
      spiceOak: 88
    },
    distilleriesCount: 12,
    featuredDistilleryIds: ['highland-park', 'talisker', 'arran'],
    notableWhiskies: ['Highland Park 12', 'Talisker 10', 'Arran 10'],
    historicalHighlights: 'From Viking Earls distilling on Orkney to illicit stillhouses sheltered in the Sea of the Hebrides.'
  }
];
