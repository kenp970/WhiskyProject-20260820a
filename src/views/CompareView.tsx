import React, { useState, useRef } from 'react';
import { Whisky } from '../types';
import { WHISKIES, getWhiskyFlavourRatings } from '../data/whiskies';
import { FlavourRadarChart } from '../components/FlavourRadarChart';
import {
  BarChart2,
  Plus,
  X,
  ArrowRight,
  Droplets,
  Wine,
  Sparkles,
  Layers,
  Swords,
  Compass,
  Flame,
  CheckCircle2,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface Props {
  compareList: Whisky[];
  onRemoveFromCompare: (id: string) => void;
  onAddWhisky: (whisky: Whisky) => void;
  onSetCompareList?: (whiskies: Whisky[]) => void;
  onSelectWhisky: (whisky: Whisky) => void;
  onClearCompare: () => void;
}

export const CompareView: React.FC<Props> = ({
  compareList,
  onRemoveFromCompare,
  onAddWhisky,
  onSetCompareList,
  onSelectWhisky,
  onClearCompare,
}) => {
  const [selectedToAddId, setSelectedToAddId] = useState<string>('');
  const comparisonTableRef = useRef<HTMLDivElement>(null);

  const handleAdd = (id: string) => {
    const w = WHISKIES.find(item => item.id === id);
    if (w && !compareList.some(item => item.id === w.id)) {
      if (compareList.length >= 3) {
        if (onSetCompareList) {
          onSetCompareList([...compareList.slice(1), w]);
        }
      } else {
        onAddWhisky(w);
      }
      setSelectedToAddId('');
    }
  };

  const handleLoadWhiskies = (whiskyIds: string[]) => {
    const matched = whiskyIds
      .map(id => WHISKIES.find(w => w.id === id))
      .filter((w): w is Whisky => Boolean(w));

    if (onSetCompareList) {
      onSetCompareList(matched);
    } else {
      onClearCompare();
      matched.forEach(w => onAddWhisky(w));
    }

    // Smooth scroll down to table
    setTimeout(() => {
      comparisonTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const availableWhiskies = WHISKIES.filter(w => !compareList.some(c => c.id === w.id));

  // Regional Battles Preset Data
  const REGIONAL_BATTLES = [
    {
      id: 'smoke-vs-sherry',
      title: 'Smoke vs Sherry',
      subtitle: 'Islay Peat Monster vs Speyside Sherry Benchmark',
      tag: 'Iconic Contrast',
      whiskyIds: ['lagavulin-16', 'macallan-sherry-oak-12'],
      names: ['Lagavulin 16 Year Old', 'The Macallan 12 Sherry Oak'],
      regions: ['Islay', 'Speyside'],
      description:
        'A clash of titans: Lagavulin’s pungent coastal peat, seaweed, and lapsang tea against The Macallan’s rich Oloroso sherry spice, dried sultanas, and polished European oak.',
    },
    {
      id: 'islands-vs-islay',
      title: 'Islands vs Islay',
      subtitle: 'Maritime Pepper vs Medicinal Bonfire Smoke',
      tag: 'Coastal Battle',
      whiskyIds: ['talisker-10', 'laphroaig-10'],
      names: ['Talisker 10 Year Old', 'Laphroaig 10 Year Old'],
      regions: ['Islands (Skye)', 'Islay'],
      description:
        'Explore Skye’s volcanic cracked black pepper and maritime oyster brine versus Laphroaig’s unapologetic medicinal iodine, seaweed, and cold campfire ember.',
    },
    {
      id: 'speyside-vs-highland',
      title: 'Speyside vs Highland',
      subtitle: 'Solera Honeyed Orchard vs Ruby Port Pipe Velvet',
      tag: 'Wood Finish Duel',
      whiskyIds: ['glenfiddich-15-solera', 'glenmorangie-quinta-ruban-14'],
      names: ['Glenfiddich 15 Solera', 'Glenmorangie Quinta Ruban 14'],
      regions: ['Speyside', 'Highland'],
      description:
        'Compare Glenfiddich’s warm Solera vat heather honey, marzipan, and cinnamon with Glenmorangie’s 14-year dark mint chocolate, Turkish delight, and Portuguese ruby port pipe richness.',
    },
    {
      id: 'campbeltown-vs-islay',
      title: 'Campbeltown vs Islay',
      subtitle: 'Artisan Floor-Malted Oiliness vs 55 PPM Peat Blast',
      tag: 'Heritage Smoke',
      whiskyIds: ['springbank-10', 'ardbeg-ten'],
      names: ['Springbank 10 Year Old', 'Ardbeg 10 Year Old'],
      regions: ['Campbeltown', 'Islay'],
      description:
        'Springbank’s 2.5x distilled salted caramel, engine oil, and dunnage maritime peat meets Ardbeg’s towering 55 PPM bonfire smoke, charred lemon, and espresso phenolics.',
    },
    {
      id: 'lowland-vs-speyside',
      title: 'Lowland vs Speyside',
      subtitle: 'Triple-Distilled Sweetness vs Double-Cask Orchard Fruit',
      tag: 'Elegance vs Body',
      whiskyIds: ['auchentoshan-three-wood', 'aberlour-12'],
      names: ['Auchentoshan Three Wood', 'Aberlour 12 Year Old'],
      regions: ['Lowland', 'Speyside'],
      description:
        'Auchentoshan’s ultra-smooth 100% triple-distilled Pedro Ximénez syrup and hazelnut competes with Aberlour’s plush double-cask red apples, cinnamon, and sherry wood.',
    },
  ];

  // Tour Scotland in 3 Glasses Data
  const TOUR_SCOTLAND = {
    title: 'Tour Scotland in 3 Glasses',
    tagline: 'An Educational Sensory Flight Across Scottish Terroirs',
    whiskyIds: ['glenkinchie-12', 'glenfiddich-15-solera', 'lagavulin-16'],
    steps: [
      {
        step: 1,
        name: 'Glenkinchie 12 Year Old',
        region: 'Lowland',
        style: 'Delicate, Floral & Grassy',
        keyNotes: 'Fresh cut meadow grass, lemon cheesecake, honeysuckle, and clean cereal malt.',
        teachingPoint:
          'Begin in the gentle Lowlands with unpeated, light spirit distilled in Scotland’s largest wash stills to calibrate your palate with delicate floral esters.',
        cask: 'Refill American Oak Casks',
        abv: '43.0%',
        peat: 'Unpeated (0 PPM)',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      },
      {
        step: 2,
        name: 'Glenfiddich 15 Solera Reserve',
        region: 'Speyside',
        style: 'Rich, Honeyed & Fruity',
        keyNotes: 'Heather honey, vanilla fudge, marzipan, warm cinnamon, and dark fruitcake.',
        teachingPoint:
          'Journey north to the Spey river valley, experiencing layered complexity from European sherry oak, Solera vatting, and lush orchard sweetness.',
        cask: 'Solera Vat (Bourbon, Sherry & Virgin Oak)',
        abv: '40.0%',
        peat: 'Unpeated (0 PPM)',
        image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=800&q=80',
      },
      {
        step: 3,
        name: 'Lagavulin 16 Year Old',
        region: 'Islay',
        style: 'Intense, Maritime & Peaty',
        keyNotes: 'Pungent peat smoke, seaweed, sea spray, lapsang souchong tea, and dried cherries.',
        teachingPoint:
          'Conclude in the Hebridean coast of Islay, discovering how cold Atlantic maturation and burning ancient bog peat yield bold, smoky, and iodine-rich spirit.',
        cask: 'Refill American Oak & European Sherry',
        abv: '43.0%',
        peat: 'Heavily Peated (38 PPM)',
        image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=800&q=80',
      },
    ],
  };

  const peatBadgeColors: Record<string, string> = {
    'Unpeated': 'bg-[#f5f5f7] text-[#1d1d1f] border-black/[0.06]',
    'Lightly Peated': 'bg-amber-50 text-amber-900 border-amber-200/60',
    'Medium Peated': 'bg-orange-50 text-orange-900 border-orange-200/60',
    'Heavily Peated': 'bg-[#1d1d1f] text-white border-black font-medium',
  };

  return (
    <div className="space-y-12 animate-apple-fade pb-20">
      {/* Header */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Side-by-Side Analysis & Regional Showdowns</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          Whisky Comparison.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          Compare up to 3 Scottish single malts side-by-side across ABV, oak casks, peat concentrations, flavour dimensions, and sensory notes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ======================================================== */}
        {/* SECTION 1: Tour Scotland in 3 Glasses                     */}
        {/* ======================================================== */}
        <section className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-8 sm:p-10 space-y-8 shadow-xs">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[#0071e3] text-xs font-semibold shadow-2xs">
                <Compass className="w-3.5 h-3.5" />
                <span>Sensory Flight</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                Tour Scotland in 3 Glasses
              </h2>
              <p className="text-sm sm:text-base text-[#86868b] leading-relaxed font-normal">
                The definitive educational tasting flight that teaches how single malt character evolves across Scotland — from the delicate Lowlands, through honeyed Speyside, to the coastal peat of Islay.
              </p>
            </div>

            <button
              onClick={() => handleLoadWhiskies(TOUR_SCOTLAND.whiskyIds)}
              className="px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full flex items-center gap-2 transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load 3 Glasses into Comparator</span>
            </button>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {TOUR_SCOTLAND.steps.map((glass) => (
              <div
                key={glass.step}
                className="bg-white p-6 rounded-3xl border border-black/[0.06] flex flex-col justify-between space-y-5 apple-card-hover group"
              >
                <div className="space-y-4">
                  {/* Step Badge & Region */}
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-[#1d1d1f] text-white text-xs font-bold flex items-center justify-center">
                      {glass.step}
                    </span>
                    <span className="px-3 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-semibold rounded-full">
                      {glass.region}
                    </span>
                  </div>

                  {/* Bottle Visual & Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={glass.image}
                        alt={glass.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-[#0071e3] font-semibold block mb-0.5">
                        {glass.style}
                      </span>
                      <h3 className="text-base font-bold text-[#1d1d1f] leading-snug">
                        {glass.name}
                      </h3>
                    </div>
                  </div>

                  {/* Tasting Key Notes */}
                  <p className="text-xs text-[#1d1d1f] leading-relaxed bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.03] italic">
                    "{glass.keyNotes}"
                  </p>

                  {/* Educational Sommelier Guide */}
                  <p className="text-xs text-[#86868b] leading-relaxed font-normal">
                    {glass.teachingPoint}
                  </p>
                </div>

                {/* Specs Pill */}
                <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs text-[#86868b] font-medium">
                  <span>{glass.abv}</span>
                  <span className="font-semibold text-[#1d1d1f]">{glass.peat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: Regional Battles                               */}
        {/* ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-black/[0.06] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] mb-1">
                <Swords className="w-3.5 h-3.5" />
                <span>Head-to-Head Tastings</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">
                Regional Battles
              </h2>
              <p className="text-sm text-[#86868b]">
                Curated head-to-head showdowns contrasting differing terroirs, peats, and cask styles.
              </p>
            </div>
            <span className="text-xs text-[#86868b] font-semibold">
              5 Presets Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_BATTLES.map((battle) => (
              <div
                key={battle.id}
                className="bg-white p-6 rounded-3xl border border-black/[0.06] apple-card-hover flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#f5f5f7] text-[#0071e3] text-xs font-semibold rounded-full">
                      {battle.tag}
                    </span>
                    <Swords className="w-4 h-4 text-[#86868b]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
                    {battle.title}
                  </h3>

                  <div className="text-xs font-medium text-[#1d1d1f] flex items-center gap-1.5 flex-wrap">
                    <span className="text-[#0071e3] font-semibold">{battle.names[0]}</span>
                    <span className="text-[#86868b] italic">vs</span>
                    <span className="text-[#1d1d1f] font-semibold">{battle.names[1]}</span>
                  </div>

                  <p className="text-xs text-[#86868b] leading-relaxed font-normal">
                    {battle.description}
                  </p>
                </div>

                <button
                  onClick={() => handleLoadWhiskies(battle.whiskyIds)}
                  className="w-full py-2.5 bg-[#f5f5f7] hover:bg-[#0071e3] hover:text-white text-[#1d1d1f] text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer group shadow-2xs"
                >
                  <span>Compare This Battle</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: Side-by-Side Comparison Matrix Table           */}
        {/* ======================================================== */}
        <section ref={comparisonTableRef} className="space-y-6 pt-4">
          {/* Comparator Controls Toolbar */}
          <div className="bg-[#f5f5f7] p-6 rounded-3xl border border-black/[0.04] flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-[#1d1d1f]">
                Active Comparison ({compareList.length} of 3 bottles)
              </span>
              {compareList.length > 0 && (
                <button
                  onClick={onClearCompare}
                  className="text-xs font-semibold text-[#86868b] hover:text-[#e02020] underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {compareList.length < 3 && availableWhiskies.length > 0 && (
              <div className="flex items-center gap-2">
                <select
                  value={selectedToAddId}
                  onChange={(e) => handleAdd(e.target.value)}
                  className="bg-white border border-black/[0.06] text-xs font-medium text-[#1d1d1f] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 cursor-pointer shadow-2xs"
                >
                  <option value="">+ Add bottle to compare matrix...</option>
                  {availableWhiskies.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.regionName})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {compareList.length === 0 ? (
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-16 text-center text-[#86868b] space-y-4 shadow-xs">
              <Wine className="w-12 h-12 mx-auto text-[#0071e3]" />
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  No whiskies selected
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Select up to 3 bottles from the dropdown above, click a preset <strong>Regional Battle</strong>, or load the <strong>Tour Scotland in 3 Glasses</strong> flight.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleLoadWhiskies(['lagavulin-16', 'macallan-sherry-oak-12'])}
                  className="px-5 py-2.5 bg-[#0071e3] text-white text-xs font-semibold rounded-full cursor-pointer shadow-xs"
                >
                  Load Smoke vs Sherry
                </button>
                <button
                  onClick={() => handleLoadWhiskies(TOUR_SCOTLAND.whiskyIds)}
                  className="px-5 py-2.5 bg-white border border-black/[0.06] text-[#1d1d1f] text-xs font-semibold rounded-full cursor-pointer shadow-2xs"
                >
                  Load 3-Glass Scotland Tour
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-xs">
              {/* Full Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f5f5f7] border-b border-black/[0.06]">
                      <th className="p-6 w-1/4 text-xs font-semibold text-[#86868b]">
                        Attribute / Metric
                      </th>
                      {compareList.map(w => (
                        <th key={w.id} className="p-6 text-left relative min-w-[260px] bg-white border-l border-black/[0.06]">
                          <button
                            onClick={() => onRemoveFromCompare(w.id)}
                            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#f5f5f7] hover:bg-[#1d1d1f] hover:text-white text-[#86868b] flex items-center justify-center transition-colors border border-black/[0.04] cursor-pointer"
                            title="Remove bottle"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          {/* Bottle Image Frame */}
                          <div className="w-full h-36 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] p-2 flex items-center justify-center mb-3">
                            <img
                              src={w.bottleImage}
                              alt={w.name}
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <span className="text-xs font-semibold text-[#0071e3] block">
                            {w.regionName}
                          </span>
                          <h4
                            onClick={() => onSelectWhisky(w)}
                            className="text-base font-bold text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer mt-0.5 line-clamp-2"
                          >
                            {w.name}
                          </h4>
                          <p className="text-xs text-[#86868b]">{w.distilleryName} Distillery</p>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-black/[0.06] text-xs sm:text-sm font-normal">
                    {/* Region */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        Region
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06]">
                          <span className="px-3 py-1 bg-[#1d1d1f] text-white text-xs font-semibold rounded-full">
                            {w.regionName}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Distillery */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        Distillery
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] font-medium text-[#1d1d1f]">
                          {w.distilleryName}
                        </td>
                      ))}
                    </tr>

                    {/* Age */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        Age Statement
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] font-semibold text-[#1d1d1f]">
                          {w.ageStatement}
                        </td>
                      ))}
                    </tr>

                    {/* ABV */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        ABV Strength
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] font-bold text-[#0071e3]">
                          {w.abv}% ABV
                        </td>
                      ))}
                    </tr>

                    {/* Cask */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        Cask Maturation
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] text-xs text-[#1d1d1f] leading-relaxed">
                          {w.caskType}
                        </td>
                      ))}
                    </tr>

                    {/* Peat level */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        Peat Smoke Level
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06]">
                          <span className={`px-3 py-1 border text-xs rounded-full inline-block ${peatBadgeColors[w.peatLevel] || 'bg-[#f5f5f7] text-[#1d1d1f]'}`}>
                            {w.peatLevel}
                          </span>
                          {w.peatPpmApprox !== undefined && w.peatPpmApprox > 0 && (
                            <span className="text-xs text-[#86868b] block mt-1.5">
                              Approx. ~{w.peatPpmApprox} PPM
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Flavour Radar Chart */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        Flavour Radar DNA
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06]">
                          <div className="flex flex-col items-center">
                            <FlavourRadarChart radar={w.flavourRadar} size={160} color="#0071e3" />
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Flavour Ratings Header */}
                    <tr className="bg-[#1d1d1f] text-white">
                      <td colSpan={compareList.length + 1} className="p-4 sm:px-6 text-xs font-semibold tracking-wider text-white">
                        Flavour Intensity Benchmarks (0–10 Scale)
                      </td>
                    </tr>

                    {/* Smoke */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        🔥 Smoke
                      </td>
                      {compareList.map(w => {
                        const r = getWhiskyFlavourRatings(w);
                        return (
                          <td key={w.id} className="p-6 border-l border-black/[0.06] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#1d1d1f]">{r.smoke}/10</span>
                            </div>
                            <div className="w-full h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div className="h-full bg-[#1d1d1f] rounded-full" style={{ width: `${(r.smoke / 10) * 100}%` }} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Sweetness */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        🍯 Sweetness
                      </td>
                      {compareList.map(w => {
                        const r = getWhiskyFlavourRatings(w);
                        return (
                          <td key={w.id} className="p-6 border-l border-black/[0.06] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#1d1d1f]">{r.sweetness}/10</span>
                            </div>
                            <div className="w-full h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0071e3] rounded-full" style={{ width: `${(r.sweetness / 10) * 100}%` }} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Fruitiness */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        🍎 Fruitiness
                      </td>
                      {compareList.map(w => {
                        const r = getWhiskyFlavourRatings(w);
                        return (
                          <td key={w.id} className="p-6 border-l border-black/[0.06] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#1d1d1f]">{r.fruit}/10</span>
                            </div>
                            <div className="w-full h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0071e3] rounded-full" style={{ width: `${(r.fruit / 10) * 100}%` }} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Spice */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        🌶️ Spice
                      </td>
                      {compareList.map(w => {
                        const r = getWhiskyFlavourRatings(w);
                        return (
                          <td key={w.id} className="p-6 border-l border-black/[0.06] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#1d1d1f]">{r.spice}/10</span>
                            </div>
                            <div className="w-full h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div className="h-full bg-[#1d1d1f] rounded-full" style={{ width: `${(r.spice / 10) * 100}%` }} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Oak */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        🪵 Oak
                      </td>
                      {compareList.map(w => {
                        const r = getWhiskyFlavourRatings(w);
                        return (
                          <td key={w.id} className="p-6 border-l border-black/[0.06] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#1d1d1f]">{r.oak}/10</span>
                            </div>
                            <div className="w-full h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0071e3] rounded-full" style={{ width: `${(r.oak / 10) * 100}%` }} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Richness */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        🍫 Richness
                      </td>
                      {compareList.map(w => {
                        const r = getWhiskyFlavourRatings(w);
                        return (
                          <td key={w.id} className="p-6 border-l border-black/[0.06] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#1d1d1f]">{r.richness}/10</span>
                            </div>
                            <div className="w-full h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div className="h-full bg-[#1d1d1f] rounded-full" style={{ width: `${(r.richness / 10) * 100}%` }} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Maritime Character */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        🌊 Maritime Character
                      </td>
                      {compareList.map(w => {
                        const r = getWhiskyFlavourRatings(w);
                        return (
                          <td key={w.id} className="p-6 border-l border-black/[0.06] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#1d1d1f]">{r.maritime}/10</span>
                            </div>
                            <div className="w-full h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0071e3] rounded-full" style={{ width: `${(r.maritime / 10) * 100}%` }} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Tasting Section: Nose */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        👃 The Nose
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] text-xs text-[#1d1d1f] leading-relaxed">
                          {w.tastingNotes.nose}
                        </td>
                      ))}
                    </tr>

                    {/* Tasting Section: Palate */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        👅 The Palate
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] text-xs text-[#1d1d1f] leading-relaxed">
                          {w.tastingNotes.palate}
                        </td>
                      ))}
                    </tr>

                    {/* Tasting Section: Finish */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        ✨ The Finish
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] text-xs text-[#1d1d1f] leading-relaxed">
                          {w.tastingNotes.finish}
                        </td>
                      ))}
                    </tr>

                    {/* Water Guidance */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        💧 Water Drop Tip
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06] text-xs text-[#86868b] leading-relaxed">
                          {w.tastingNotes.waterDropTip}
                        </td>
                      ))}
                    </tr>

                    {/* Action Link */}
                    <tr>
                      <td className="p-6 font-semibold text-[#1d1d1f] bg-[#f5f5f7]/60">
                        Actions
                      </td>
                      {compareList.map(w => (
                        <td key={w.id} className="p-6 border-l border-black/[0.06]">
                          <button
                            onClick={() => onSelectWhisky(w)}
                            className="w-full py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer shadow-xs"
                          >
                            View Full Bottle Dossier
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
