import React, { useState } from 'react';
import { CASK_TYPES } from '../data/learn';
import { WHISKIES } from '../data/whiskies';
import { Whisky } from '../types';
import { Layers, Sparkles, Wine, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Droplets, Info } from 'lucide-react';

interface Props {
  onSelectWhisky: (whisky: Whisky) => void;
}

export const CaskExplorerView: React.FC<Props> = ({ onSelectWhisky }) => {
  const [selectedCaskCategory, setSelectedCaskCategory] = useState<'All' | 'Bourbon' | 'Sherry' | 'Port' | 'Wine' | 'Rum'>('All');
  const [activeCaskId, setActiveCaskId] = useState<string>(CASK_TYPES[0].id);

  const filteredCasks = selectedCaskCategory === 'All'
    ? CASK_TYPES
    : CASK_TYPES.filter(c => c.caskCategory === selectedCaskCategory);

  const activeCask = CASK_TYPES.find(c => c.id === activeCaskId) || CASK_TYPES[0];

  // Match whiskies from dataset for active cask
  const matchingWhiskies = WHISKIES.filter(w => {
    const c = w.caskType.toLowerCase();
    if (activeCask.caskCategory === 'Bourbon') {
      return c.includes('bourbon') || c.includes('american oak') || c.includes('oak cask');
    }
    if (activeCask.caskCategory === 'Sherry') {
      return c.includes('sherry') || c.includes('oloroso') || c.includes('pedro ximénez') || c.includes('px');
    }
    if (activeCask.caskCategory === 'Port') {
      return c.includes('port') || c.includes('ruby') || c.includes('tawny');
    }
    if (activeCask.caskCategory === 'Wine') {
      return c.includes('wine') || c.includes('sauternes') || c.includes('barrique') || c.includes('str');
    }
    if (activeCask.caskCategory === 'Rum') {
      return c.includes('rum') || c.includes('caribbean');
    }
    return false;
  }).slice(0, 6);

  const caskSizes = [
    { name: 'Quarter Cask / Firkin', volume: '45 - 50 L', wood: 'American Oak', note: 'Ultra-fast maturation, intense wood contact' },
    { name: 'American Standard Barrel (ASB)', volume: '200 L', wood: 'American White Oak', note: 'Standard for Kentucky bourbon & ~85% of Scotch' },
    { name: 'Hogshead', volume: '250 L', wood: 'American / European Oak', note: 'Reconstructed bourbon staves; Scotland’s workhorse' },
    { name: 'Barrique (Wine)', volume: '225 - 300 L', wood: 'French Oak', note: 'Used for Bordeaux, Sauternes, Burgundy wine finishes' },
    { name: 'Sherry Butt', volume: '500 L', wood: 'European / Spanish Oak', note: 'Traditional Jerez sherry vessel, dark fruit & leather' },
    { name: 'Puncheon', volume: '500 L', wood: 'European or American Oak', note: 'Squat 500L barrel for sherry or rum maturation' },
    { name: 'Port Pipe', volume: '550 - 650 L', wood: 'European Oak', note: 'Elongated Douro valley pipe for rich ruby & tawny port' },
  ];

  return (
    <div className="space-y-12 animate-apple-fade pb-20">
      {/* Header Banner */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Maturation & Cooperage Guide</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          Cask Explorer.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          Over <strong>60% to 80%</strong> of a single malt's final flavour and 100% of its natural amber color is born inside the oak cask. Discover how Bourbon, Sherry, Port, Wine, and Rum casks shape Scottish whisky.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(['All', 'Bourbon', 'Sherry', 'Port', 'Wine', 'Rum'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCaskCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCaskCategory === cat
                  ? 'bg-[#1d1d1f] text-white shadow-xs'
                  : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-black/[0.06] border border-black/[0.04]'
              }`}
            >
              {cat === 'All' ? 'All Cask Types' : `${cat} Casks`}
            </button>
          ))}
        </div>

        {/* Cask Types Grid / Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cask Type Selector */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-[#86868b] block px-1">
              Select Cask Tradition
            </span>
            {filteredCasks.map((cask) => {
              const isSelected = activeCask.id === cask.id;
              return (
                <button
                  key={cask.id}
                  onClick={() => setActiveCaskId(cask.id)}
                  className={`w-full text-left p-5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-sm'
                      : 'bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] border-black/[0.06] apple-card-hover shadow-2xs'
                  }`}
                >
                  <div>
                    <span className={`text-xs font-semibold block ${isSelected ? 'text-[#2997ff]' : 'text-[#0071e3]'}`}>
                      {cask.caskCategory} • {cask.capacityLitres}
                    </span>
                    <h3 className={`text-base font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-[#1d1d1f]'}`}>
                      {cask.name}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-black/30'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Cask Detailed Profile */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-black/[0.06] pb-4">
                <div>
                  <span className="px-3 py-1 bg-white text-[#0071e3] text-xs font-semibold rounded-full inline-block mb-2 shadow-2xs border border-black/[0.04]">
                    {activeCask.caskCategory} Maturation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
                    {activeCask.name}
                  </h2>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-[#86868b] block font-medium">Standard Capacity</span>
                  <span className="text-xl font-bold text-[#1d1d1f]">{activeCask.capacityLitres}</span>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-black/[0.04] shadow-2xs">
                <div>
                  <span className="text-xs font-semibold text-[#86868b] block">
                    Botanical Wood Species
                  </span>
                  <span className="text-sm font-bold text-[#1d1d1f]">{activeCask.woodSpecies}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#86868b] block">
                    Previous Liquid Seasoning
                  </span>
                  <span className="text-sm font-bold text-[#1d1d1f]">{activeCask.previousContent}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-[#1d1d1f]/85 leading-relaxed font-normal">
                {activeCask.description}
              </p>

              {/* Flavour Contributions */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
                  Flavour Compounds Contributed to Scotch:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCask.flavourContribution.map((flavour) => (
                    <span
                      key={flavour}
                      className="px-3.5 py-1.5 bg-white border border-black/[0.06] text-[#1d1d1f] text-xs font-medium rounded-full shadow-2xs"
                    >
                      {flavour}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matching Scottish Whiskies from our database */}
              <div className="space-y-3 pt-4 border-t border-black/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1d1d1f]">
                    Example Single Malts in our Collection Featuring this Cask ({matchingWhiskies.length}):
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {matchingWhiskies.map((whisky) => (
                    <div
                      key={whisky.id}
                      onClick={() => onSelectWhisky(whisky)}
                      className="p-3.5 bg-white hover:bg-[#fbfbfd] rounded-2xl border border-black/[0.06] apple-card-hover cursor-pointer flex items-center gap-3 group shadow-2xs"
                    >
                      <div className="w-10 h-14 bg-[#f5f5f7] rounded-xl border border-black/[0.04] p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={whisky.bottleImage}
                          alt={whisky.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold text-[#0071e3] block truncate">
                          {whisky.regionName}
                        </span>
                        <h4 className="text-xs font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate">
                          {whisky.name}
                        </h4>
                        <span className="text-[11px] text-[#86868b] block mt-0.5">
                          {whisky.ageStatement} • {whisky.abv}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cooperage & Cask Sizes Reference Table */}
        <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-4 flex-wrap gap-2">
            <div>
              <span className="text-xs font-semibold text-[#0071e3] block">
                Scottish Cooperage Standards
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                Cask Anatomy & Standard Sizes
              </h3>
            </div>
            <span className="text-xs text-[#86868b]">
              Maximum legal size permitted in Scotland is 700 Litres
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/[0.08] text-[#86868b] font-semibold text-xs">
                  <th className="p-3">Cask Name</th>
                  <th className="p-3">Typical Volume</th>
                  <th className="p-3">Botanical Wood</th>
                  <th className="p-3">Maturation Role & Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {caskSizes.map((cs, idx) => (
                  <tr key={cs.name} className="hover:bg-white/60 transition-colors">
                    <td className="p-3 font-bold text-[#1d1d1f] text-sm">{cs.name}</td>
                    <td className="p-3 font-mono font-semibold text-[#0071e3]">{cs.volume}</td>
                    <td className="p-3 text-[#1d1d1f] font-medium">{cs.wood}</td>
                    <td className="p-3 text-[#86868b] leading-relaxed">{cs.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* American vs European Oak Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-black/[0.06] space-y-3 apple-card-hover shadow-2xs">
            <span className="px-3 py-1 bg-[#f5f5f7] text-[#0071e3] text-xs font-semibold rounded-full inline-block">
              Quercus Alba
            </span>
            <h4 className="text-xl font-bold text-[#1d1d1f]">American White Oak</h4>
            <p className="text-sm text-[#86868b] leading-relaxed font-normal">
              Grown primarily in North America (Ozarks, Kentucky). Features a dense wood grain rich in vanillin and oak lactones. Delivers soft, creamy notes of vanilla custard, toasted coconut, honey, and crème brûlée with low astringent tannins.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-black/[0.06] space-y-3 apple-card-hover shadow-2xs">
            <span className="px-3 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-semibold rounded-full inline-block">
              Quercus Robur & Petraea
            </span>
            <h4 className="text-xl font-bold text-[#1d1d1f]">European & Spanish Oak</h4>
            <p className="text-sm text-[#86868b] leading-relaxed font-normal">
              Grown in Northern Spain (Galicia), France, and Central Europe. More porous wood with high natural polyphenol and tannin content. Imparts dark reddish mahogany hues, cloves, cinnamon spice, dried figs, tobacco, and intense structural body.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
