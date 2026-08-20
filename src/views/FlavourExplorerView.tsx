import React, { useState, useMemo } from 'react';
import { WHISKIES, getWhiskyFlavourRatings } from '../data/whiskies';
import { REGIONS } from '../data/regions';
import { Whisky, RegionId } from '../types';
import { WhiskyBottleArt } from '../components/WhiskyBottleArt';
import { Compass, Sparkles, Filter, Wine, Flame, Layers, Eye, BarChart2, Check, ArrowRight, Info } from 'lucide-react';

interface Props {
  onSelectWhisky: (whisky: Whisky) => void;
  onAddToCompare?: (whisky: Whisky) => void;
}

export const FlavourExplorerView: React.FC<Props> = ({
  onSelectWhisky,
  onAddToCompare,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [selectedPeat, setSelectedPeat] = useState<string>('all');
  const [hoveredWhisky, setHoveredWhisky] = useState<Whisky | null>(null);
  const [highlightedQuadrant, setHighlightedQuadrant] = useState<string | null>(null);

  // Compute 2D coordinates for each whisky
  // X: Delicate (0%) -> Smoky (100%) based on peatSmoke and peatLevel
  // Y: Light (0% at top) -> Rich (100% at bottom) based on richSherry, oak, sweetness, and complexity
  const mappedWhiskies = useMemo(() => {
    return WHISKIES.map((whisky) => {
      const r = whisky.flavourRadar;
      const ratings = getWhiskyFlavourRatings(whisky);

      // X: Smoke coordinate (0 to 100)
      let x = r.peatSmoke;
      if (whisky.peatLevel === 'Unpeated') x = Math.min(x, 15);
      if (whisky.peatLevel === 'Heavily Peated') x = Math.max(x, 82);

      // Y: Richness coordinate (0 = very light/crisp, 100 = very rich/sherried/heavy)
      // Lightness is driven by floralGrass & fruitCitrus, Richness by richSherry, spiceOak, sweetness
      let richnessScore = (r.richSherry * 0.45) + (ratings.richness * 3.5) + (r.sweetHoney * 0.2);
      // Reduce richness if ultra light and delicate floral
      if (r.floralGrass > 70 && r.richSherry < 40) richnessScore -= 15;
      const y = Math.min(92, Math.max(8, richnessScore));

      // Determine quadrant
      // X < 50 => Delicate, X >= 50 => Smoky
      // Y < 50 => Light, Y >= 50 => Rich
      let quadrant = 'light-delicate';
      if (x < 50 && y < 50) quadrant = 'light-delicate';
      else if (x >= 50 && y < 50) quadrant = 'light-smoky';
      else if (x < 50 && y >= 50) quadrant = 'rich-delicate';
      else quadrant = 'rich-smoky';

      return {
        whisky,
        x: Math.min(92, Math.max(8, x)),
        y: y, // 0 = Light (top), 100 = Rich (bottom)
        quadrant,
        ratings,
      };
    });
  }, []);

  // Filtered whiskies
  const filteredWhiskies = useMemo(() => {
    return mappedWhiskies.filter(({ whisky, quadrant }) => {
      if (selectedRegion !== 'all' && whisky.regionId !== selectedRegion) return false;
      if (selectedPeat !== 'all' && whisky.peatLevel !== selectedPeat) return false;
      if (highlightedQuadrant && quadrant !== highlightedQuadrant) return false;
      return true;
    });
  }, [mappedWhiskies, selectedRegion, selectedPeat, highlightedQuadrant]);

  const quadrantsInfo = [
    {
      id: 'light-delicate',
      title: 'Light & Delicate',
      sub: 'Crisp, grassy, fresh orchard apples, floral blossoms & clean malt',
      xRange: 'Delicate (Left)',
      yRange: 'Light (Top)',
      color: 'border-emerald-500/30 bg-emerald-50/20 text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800',
      count: mappedWhiskies.filter(m => m.quadrant === 'light-delicate').length,
    },
    {
      id: 'light-smoky',
      title: 'Light & Smoky',
      sub: 'Coastal sea spray, lemon zest, gentle peat smoke & mineral crispness',
      xRange: 'Smoky (Right)',
      yRange: 'Light (Top)',
      color: 'border-sky-500/30 bg-sky-50/20 text-sky-900',
      badge: 'bg-sky-100 text-sky-800',
      count: mappedWhiskies.filter(m => m.quadrant === 'light-smoky').length,
    },
    {
      id: 'rich-delicate',
      title: 'Rich & Delicate',
      sub: 'Oloroso sherry, dried raisins, Christmas fruitcake, dark honey & warm oak',
      xRange: 'Delicate (Left)',
      yRange: 'Rich (Bottom)',
      color: 'border-amber-500/30 bg-amber-50/20 text-amber-900',
      badge: 'bg-amber-100 text-amber-800',
      count: mappedWhiskies.filter(m => m.quadrant === 'rich-delicate').length,
    },
    {
      id: 'rich-smoky',
      title: 'Rich & Smoky',
      sub: 'Campfire embers, tar, dark chocolate, cured bacon, brine & bonfire smoke',
      xRange: 'Smoky (Right)',
      yRange: 'Rich (Bottom)',
      color: 'border-orange-500/30 bg-orange-50/20 text-orange-900',
      badge: 'bg-orange-100 text-orange-800',
      count: mappedWhiskies.filter(m => m.quadrant === 'rich-smoky').length,
    },
  ];

  return (
    <div className="space-y-12 animate-apple-fade pb-20">
      {/* Header Banner */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>2D Sensory Matrix</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          Flavour Explorer Map.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          Navigate Scotland's single malts across two sensory spectrums: from <strong>Delicate to Smoky</strong> (horizontal) and from <strong>Light to Rich</strong> (vertical).
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filters and Controls */}
        <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#86868b] flex items-center gap-1.5 whitespace-nowrap">
                <Filter className="w-3.5 h-3.5 text-[#0071e3]" />
                Filter by Region:
              </span>
            </div>

            {/* Peat Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#86868b]">
                Peat Level:
              </span>
              <select
                value={selectedPeat}
                onChange={(e) => setSelectedPeat(e.target.value)}
                className="bg-white text-[#1d1d1f] border border-black/[0.06] px-4 py-2 text-xs font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 cursor-pointer shadow-2xs"
              >
                <option value="all">All Peat Levels</option>
                <option value="Unpeated">Unpeated</option>
                <option value="Lightly Peated">Lightly Peated</option>
                <option value="Medium Peated">Medium Peated</option>
                <option value="Heavily Peated">Heavily Peated</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-black/[0.04] scrollbar-none">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                selectedRegion === 'all'
                  ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                  : 'bg-white text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.04]'
              }`}
            >
              All Regions ({WHISKIES.length})
            </button>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  selectedRegion === r.id
                    ? 'bg-[#0071e3] text-white font-semibold shadow-xs'
                    : 'bg-white text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.04]'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Quadrant Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quadrantsInfo.map((q) => {
            const isSelected = highlightedQuadrant === q.id;
            return (
              <button
                key={q.id}
                onClick={() => setHighlightedQuadrant(isSelected ? null : q.id)}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'ring-2 ring-[#0071e3] shadow-md bg-white border-[#0071e3]'
                    : 'bg-white border-black/[0.06] apple-card-hover shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#1d1d1f]">
                    {q.title}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[#0071e3]">
                    {q.count} drams
                  </span>
                </div>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {q.sub}
                </p>
                <div className="mt-4 text-[10px] text-[#0071e3] font-semibold flex items-center justify-between">
                  <span>{q.xRange} • {q.yRange}</span>
                  {isSelected && <span className="font-bold">Active ✓</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* The 2D Interactive Flavour Map Canvas */}
        <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-[#86868b] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3] inline-block" />
              <span className="font-semibold text-[#1d1d1f]">Showing {filteredWhiskies.length} Whiskies</span>
              <span>— Hover on a bottle pin for sensory notes, or click to open full profile</span>
            </div>
            {highlightedQuadrant && (
              <button
                onClick={() => setHighlightedQuadrant(null)}
                className="text-xs font-semibold text-[#0071e3] hover:underline cursor-pointer"
              >
                Clear Quadrant Filter (Show All)
              </button>
            )}
          </div>

          {/* 2D Coordinate Box */}
          <div className="relative w-full h-[520px] sm:h-[620px] bg-white rounded-2xl border border-black/[0.06] overflow-hidden select-none shadow-inner">
            {/* Axis Labels */}
            {/* Top: Light */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-[#1d1d1f] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs">
              ▲ Light / Delicate Body
            </div>

            {/* Bottom: Rich */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-[#1d1d1f] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs">
              ▼ Rich / Full-Bodied Oak & Sherry
            </div>

            {/* Left: Delicate */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 -rotate-90 origin-center bg-[#1d1d1f] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs whitespace-nowrap">
              ◄ Delicate / Floral / Unpeated
            </div>

            {/* Right: Smoky */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rotate-90 origin-center bg-[#1d1d1f] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs whitespace-nowrap">
              ► Smoky / Peated / Maritime
            </div>

            {/* Grid Crosshairs */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/[0.08] pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/[0.08] pointer-events-none" />

            {/* Subtle Quadrant Watermarks */}
            <div className="absolute top-10 left-14 text-black/[0.04] font-bold text-2xl sm:text-3xl tracking-tight pointer-events-none">
              Light & Delicate
            </div>
            <div className="absolute top-10 right-14 text-black/[0.04] font-bold text-2xl sm:text-3xl tracking-tight pointer-events-none text-right">
              Light & Smoky
            </div>
            <div className="absolute bottom-10 left-14 text-black/[0.04] font-bold text-2xl sm:text-3xl tracking-tight pointer-events-none">
              Rich & Delicate
            </div>
            <div className="absolute bottom-10 right-14 text-black/[0.04] font-bold text-2xl sm:text-3xl tracking-tight pointer-events-none text-right">
              Rich & Smoky
            </div>

            {/* Bottle Pins */}
            {filteredWhiskies.map(({ whisky, x, y, ratings }) => {
              const isHovered = hoveredWhisky?.id === whisky.id;
              return (
                <div
                  key={whisky.id}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onMouseEnter={() => setHoveredWhisky(whisky)}
                  onMouseLeave={() => setHoveredWhisky(null)}
                  onClick={() => onSelectWhisky(whisky)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-20 group`}
                >
                  {/* Pin Dot / Bottle Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center shadow-sm bg-white p-0.5 ${
                      isHovered
                        ? 'scale-125 border-[#0071e3] ring-4 ring-[#0071e3]/30 z-30'
                        : 'border-black/[0.1] hover:scale-115'
                    }`}
                  >
                    <WhiskyBottleArt
                      whisky={whisky}
                      size="sm"
                      className="w-5 h-6"
                    />
                  </div>

                  {/* Bottle Label Pin Badge */}
                  <div
                    className={`whitespace-nowrap px-2 py-0.5 rounded-full text-[10px] font-medium tracking-normal absolute top-full left-1/2 -translate-x-1/2 mt-1 pointer-events-none transition-all shadow-xs ${
                      isHovered
                        ? 'bg-[#1d1d1f] text-white opacity-100 scale-105 z-40'
                        : 'bg-white/95 text-[#1d1d1f] border border-black/[0.08] opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    {whisky.name.replace('The ', '').split(' ')[0]} {whisky.ageStatement}
                  </div>
                </div>
              );
            })}

            {/* Hover Tooltip Overlay Card */}
            {hoveredWhisky && (
              <div className="absolute top-4 right-4 z-40 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-black/[0.08] shadow-2xl p-4 animate-apple-fade pointer-events-none">
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-18 bg-[#f5f5f7] border border-black/[0.04] p-1 rounded-xl flex items-center justify-center shrink-0">
                    <WhiskyBottleArt
                      whisky={hoveredWhisky}
                      size="sm"
                      className="w-12 h-16"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[#0071e3] block truncate">
                      {hoveredWhisky.distilleryName} • {hoveredWhisky.regionName}
                    </span>
                    <h4 className="text-sm font-bold text-[#1d1d1f] truncate">
                      {hoveredWhisky.name}
                    </h4>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                        {hoveredWhisky.ageStatement}
                      </span>
                      <span className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                        {hoveredWhisky.abv}% ABV
                      </span>
                      <span className="px-2 py-0.5 bg-[#1d1d1f] text-white text-xs font-medium rounded-full">
                        {hoveredWhisky.peatLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#86868b] mt-2.5 line-clamp-2 italic leading-relaxed">
                  "{hoveredWhisky.characterSnippet}"
                </p>

                <div className="flex flex-wrap gap-1 mt-2.5">
                  {hoveredWhisky.flavourTags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-[10px] font-medium rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-black/[0.04] flex justify-between items-center text-xs font-semibold text-[#0071e3]">
                  <span>Click to view full dossier</span>
                  <span>➜</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Whiskies Table by Selected Quadrant */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                Plotted Whiskies in Collection ({filteredWhiskies.length})
              </h3>
              <p className="text-sm text-[#86868b]">
                Click on any single malt to view full tasting notes, flavour radar, distillery history, and pairings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWhiskies.map(({ whisky, quadrant, ratings }) => (
              <div
                key={whisky.id}
                onClick={() => onSelectWhisky(whisky)}
                className="bg-white rounded-3xl border border-black/[0.06] apple-card-hover p-5 shadow-2xs cursor-pointer flex gap-4 items-center group"
              >
                <div className="w-16 h-20 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <WhiskyBottleArt
                    whisky={whisky}
                    size="sm"
                    className="w-12 h-18"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-[#0071e3] block truncate">
                    {whisky.regionName} • {whisky.distilleryName}
                  </span>
                  <h4 className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate">
                    {whisky.name}
                  </h4>
                  <div className="flex gap-1.5 mt-1">
                    <span className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-[11px] font-medium rounded-full">
                      {whisky.ageStatement}
                    </span>
                    <span className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-[11px] font-medium rounded-full">
                      {whisky.abv}%
                    </span>
                    <span className="px-2 py-0.5 bg-[#1d1d1f] text-white text-[11px] font-medium rounded-full">
                      {whisky.peatLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#86868b]">
                    <span>Smoke: <strong className="text-[#1d1d1f]">{ratings.smoke}/10</strong></span>
                    <span>Sweet: <strong className="text-[#1d1d1f]">{ratings.sweetness}/10</strong></span>
                    <span>Fruit: <strong className="text-[#1d1d1f]">{ratings.fruit}/10</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
