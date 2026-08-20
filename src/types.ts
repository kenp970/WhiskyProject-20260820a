export type RegionId = 'speyside' | 'highland' | 'islay' | 'lowland' | 'campbeltown' | 'islands';

export interface FlavourRadar {
  peatSmoke: number; // 0 to 100
  richSherry: number; // 0 to 100
  fruitCitrus: number; // 0 to 100
  floralGrass: number; // 0 to 100
  sweetHoney: number; // 0 to 100
  spiceOak: number; // 0 to 100
}

export interface Region {
  id: RegionId;
  name: string;
  gaelicName?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  landscapeImage: string;
  mapCoordinates: { x: number; y: number }; // percentage on Scotland map
  terroir: {
    climate: string;
    waterSource: string;
    peatCharacteristics: string;
    caskTraditions: string;
  };
  typicalFlavours: string[];
  flavourProfile: FlavourRadar;
  distilleriesCount: number;
  featuredDistilleryIds: string[];
  notableWhiskies: string[];
  historicalHighlights: string;
}

export interface ProductionInfo {
  waterSource: string;
  washStills: number;
  spiritStills: number;
  annualCapacityLitres: string;
  fermentationTime: string;
  signatureCasks: string[];
  peatPpm: string;
  visitorCenter: boolean;
}

export interface Distillery {
  id: string;
  name: string;
  gaelicMeaning?: string;
  regionId: RegionId;
  regionName: string;
  foundedYear: number;
  founder: string;
  owner: string;
  location: string;
  mapCoords: { x: number; y: number }; // percentage for map pins
  heroImage: string;
  galleryImages?: string[];
  shortHistory: string;
  detailedHeritage: string;
  whiskyStyle: string;
  typicalFlavours: string[];
  flavourRadar: FlavourRadar;
  production: ProductionInfo;
  popularWhiskiesIds: string[];
  relatedDistilleryIds: string[];
  pronunciation?: string;
}

export interface FlavourRatings {
  smoke: number; // 0 to 10
  sweetness: number; // 0 to 10
  fruit: number; // 0 to 10
  spice: number; // 0 to 10
  oak: number; // 0 to 10
  richness: number; // 0 to 10
  maritime: number; // 0 to 10
}

export interface Whisky {
  id: string;
  name: string;
  distilleryId: string;
  distilleryName: string;
  regionId: RegionId;
  regionName: string;
  ageStatement: string; // "10 Years", "12 Years", "16 Years", "NAS"
  abv: number; // e.g. 43.0, 46.0, 58.2
  caskType: string;
  peatLevel: 'Unpeated' | 'Lightly Peated' | 'Medium Peated' | 'Heavily Peated';
  peatPpmApprox?: number;
  priceTier: '$' | '$$' | '$$$' | '$$$$';
  tastingNotes: {
    nose: string;
    palate: string;
    finish: string;
    waterDropTip: string;
  };
  flavourTags: string[];
  flavourRadar: FlavourRadar;
  flavourRatings?: FlavourRatings;
  bottleImage: string;
  awards?: string[];
  characterSnippet: string;
  volumeMl?: number;
}

export interface JournalEntry {
  id: string;
  whiskyId: string;
  whiskyName: string;
  distilleryName: string;
  region: string;
  rating: number; // 1 to 5 stars
  tastedAt: string; // ISO date
  personalNotes: string;
  favouriteFlavours: string[];
  wishlist: boolean;
  tasted: boolean;
  score?: number; // 0-100
}

export interface QuizAnswers {
  experienceLevel: string;
  flavourPreference: string;
  peatTolerance: string;
  caskPreference: string;
  preferredOccasion: string;
}
