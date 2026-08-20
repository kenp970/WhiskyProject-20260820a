import React, { useState, useMemo } from 'react';
import { WHISKIES, getWhiskyFlavourRatings } from '../data/whiskies';
import { REGIONS } from '../data/regions';
import { Whisky, RegionId } from '../types';
import { WhiskyBottleArt } from '../components/WhiskyBottleArt';
import { Search, Filter, Wine, BarChart2, Heart, ChevronRight, Sparkles, Droplets, Check, X, RotateCcw, Flame, Tag, Layers, Clock } from 'lucide-react';

interface Props {
  onSelectWhisky: (whisky: Whisky) => void;
  onAddToCompare: (whisky: Whisky) => void;
  compareList: Whisky[];
  wishlistIds: string[];
  onToggleWishlist: (whisky: Whisky) => void;
}

export const WhiskiesView: React.FC<Props> = ({
  onSelectWhisky,
  onAddToCompare,
  compareList,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [selectedCask, setSelectedCask] = useState<string>('all');
  const [selectedFlavour, setSelectedFlavour] = useState<string>('all');
  const [selectedPeat, setSelectedPeat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'abv-desc' | 'age-desc'>('name');

  // Age group helper
  const matchesAgeGroup = (ageStatement: string, group: string): boolean => {
    if (group === 'all') return true;
    const num = parseInt(ageStatement, 10);
    const isNas = isNaN(num) || ageStatement.toUpperCase().includes('NAS');

    if (group === 'NAS') return isNas;
    if (isNas) return false;

    if (group === '10-12') return num >= 10 && num <= 12;
    if (group === '13-17') return num >= 13 && num <= 17;
    if (group === '18-21') return num >= 18 && num <= 21;
    if (group === '21+') return num > 21;

    return true;
  };

  // Cask helper
  const matchesCask = (caskType: string, caskFilter: string): boolean => {
    if (caskFilter === 'all') return true;
    const c = caskType.toLowerCase();

    switch (caskFilter) {
      case 'Bourbon':
        return c.includes('bourbon') || c.includes('american white oak') || c.includes('american oak');
      case 'Sherry':
        return c.includes('sherry') || c.includes('oloroso') || c.includes('pedro ximénez') || c.includes('px') || c.includes('butt');
      case 'Port':
        return c.includes('port') || c.includes('ruby port') || c.includes('tawny');
      case 'Wine':
        return c.includes('wine') || c.includes('barrique') || c.includes('sauternes') || c.includes('str') || c.includes('bordeaux');
      case 'Rum':
        return c.includes('rum') || c.includes('caribbean');
      case 'Mixed cask':
        return (
          c.includes('double') ||
          c.includes('triple') ||
          c.includes('three wood') ||
          c.includes('solera') ||
          c.includes('mixed') ||
          c.includes('&') ||
          c.includes('finished in')
        );
      default:
        return c.includes(caskFilter.toLowerCase());
    }
  };

  // Flavour profile helper
  const matchesFlavour = (whisky: Whisky, flavourFilter: string): boolean => {
    if (flavourFilter === 'all') return true;
    const tags = whisky.flavourTags.map(t => t.toLowerCase()).join(' ');
    const desc = (
      whisky.characterSnippet +
      ' ' +
      whisky.tastingNotes.nose +
      ' ' +
      whisky.tastingNotes.palate +
      ' ' +
      whisky.tastingNotes.finish
    ).toLowerCase();
    const radar = whisky.flavourRadar;

    switch (flavourFilter) {
      case 'Smoky':
        return (
          whisky.peatLevel !== 'Unpeated' ||
          radar.peatSmoke > 20 ||
          tags.includes('smoke') ||
          tags.includes('peat') ||
          desc.includes('smoke') ||
          desc.includes('ash') ||
          desc.includes('tar') ||
          desc.includes('bonfire')
        );
      case 'Fruity':
        return (
          radar.fruitCitrus > 60 ||
          tags.includes('apple') ||
          tags.includes('pear') ||
          tags.includes('orange') ||
          tags.includes('fruit') ||
          tags.includes('peach') ||
          tags.includes('citrus') ||
          desc.includes('fruit') ||
          desc.includes('orchard') ||
          desc.includes('plum')
        );
      case 'Sweet':
        return (
          radar.sweetHoney > 70 ||
          tags.includes('honey') ||
          tags.includes('vanilla') ||
          tags.includes('caramel') ||
          tags.includes('toffee') ||
          tags.includes('butterscotch') ||
          tags.includes('sugar') ||
          desc.includes('sweet')
        );
      case 'Floral':
        return (
          radar.floralGrass > 50 ||
          tags.includes('floral') ||
          tags.includes('heather') ||
          tags.includes('blossom') ||
          tags.includes('grass') ||
          tags.includes('honeysuckle') ||
          desc.includes('floral') ||
          desc.includes('meadow')
        );
      case 'Spicy':
        return (
          radar.spiceOak > 75 ||
          tags.includes('spice') ||
          tags.includes('cinnamon') ||
          tags.includes('ginger') ||
          tags.includes('pepper') ||
          tags.includes('nutmeg') ||
          desc.includes('spice') ||
          desc.includes('peppery')
        );
      case 'Nutty':
        return (
          tags.includes('nut') ||
          tags.includes('hazelnut') ||
          tags.includes('walnut') ||
          tags.includes('almond') ||
          tags.includes('macadamia') ||
          tags.includes('marzipan') ||
          desc.includes('nutty') ||
          desc.includes('praline')
        );
      case 'Maritime':
        return (
          whisky.regionId === 'islay' ||
          whisky.regionId === 'islands' ||
          whisky.regionId === 'campbeltown' ||
          tags.includes('salt') ||
          tags.includes('brine') ||
          tags.includes('sea') ||
          tags.includes('coastal') ||
          tags.includes('seaweed') ||
          tags.includes('oyster') ||
          desc.includes('maritime') ||
          desc.includes('sea spray')
        );
      case 'Rich':
        return (
          radar.richSherry > 70 ||
          tags.includes('sherry') ||
          tags.includes('chocolate') ||
          tags.includes('fruitcake') ||
          tags.includes('treacle') ||
          tags.includes('espresso') ||
          tags.includes('raisin') ||
          desc.includes('rich') ||
          desc.includes('decadent')
        );
      default:
        return true;
    }
  };

  // Peat level helper
  const matchesPeat = (whiskyPeat: string, filterPeat: string): boolean => {
    if (filterPeat === 'all') return true;
    if (filterPeat === 'None') return whiskyPeat === 'Unpeated';
    if (filterPeat === 'Light') return whiskyPeat === 'Lightly Peated';
    if (filterPeat === 'Medium') return whiskyPeat === 'Medium Peated';
    if (filterPeat === 'Heavy') return whiskyPeat === 'Heavily Peated';
    return whiskyPeat === filterPeat;
  };

  const filteredWhiskies = useMemo(() => {
    return WHISKIES.filter(w => {
      const matchRegion = selectedRegion === 'all' || w.regionId === selectedRegion;
      const matchAge = matchesAgeGroup(w.ageStatement, selectedAgeGroup);
      const matchCask = matchesCask(w.caskType, selectedCask);
      const matchFlavour = matchesFlavour(w, selectedFlavour);
      const matchPeat = matchesPeat(w.peatLevel, selectedPeat);

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.distilleryName.toLowerCase().includes(q) ||
        w.caskType.toLowerCase().includes(q) ||
        w.flavourTags.some(t => t.toLowerCase().includes(q)) ||
        w.characterSnippet.toLowerCase().includes(q);

      return matchRegion && matchAge && matchCask && matchFlavour && matchPeat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'abv-desc') return b.abv - a.abv;
      if (sortBy === 'age-desc') {
        const getAge = (stmt: string) => {
          const num = parseInt(stmt, 10);
          return isNaN(num) ? 0 : num;
        };
        return getAge(b.ageStatement) - getAge(a.ageStatement);
      }
      return a.name.localeCompare(b.name);
    });
  }, [selectedRegion, selectedAgeGroup, selectedCask, selectedFlavour, selectedPeat, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedRegion !== 'all' ||
    selectedAgeGroup !== 'all' ||
    selectedCask !== 'all' ||
    selectedFlavour !== 'all' ||
    selectedPeat !== 'all' ||
    searchQuery.length > 0;

  const handleResetFilters = () => {
    setSelectedRegion('all');
    setSelectedAgeGroup('all');
    setSelectedCask('all');
    setSelectedFlavour('all');
    setSelectedPeat('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-10 animate-apple-fade pb-20">
      {/* Apple Flagship Header */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <Wine className="w-3.5 h-3.5" />
          <span>The Definitive Scottish Lineup</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          Whisky Explorer.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          Filter and compare iconic expressions across Scotland's six protected distilling terroirs by oak cask, age statement, and peat intensity.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Apple Filter & Search Console */}
        <div className="bg-[#f5f5f7] p-6 sm:p-8 rounded-3xl border border-black/[0.04] space-y-6">
          {/* Top Search & Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search bottles, distilleries, casks, or tasting notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/[0.06] rounded-full text-xs sm:text-sm text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Region Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as any)}
                aria-label="Filter by Region"
                className="w-full bg-white border border-black/[0.06] text-xs sm:text-sm font-medium text-[#1d1d1f] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 cursor-pointer shadow-2xs"
              >
                <option value="all">All Regions (6)</option>
                <option value="speyside">Speyside</option>
                <option value="highland">Highland</option>
                <option value="islay">Islay</option>
                <option value="lowland">Lowland</option>
                <option value="campbeltown">Campbeltown</option>
                <option value="islands">Islands</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort Whiskies"
                className="w-full bg-white border border-black/[0.06] text-xs sm:text-sm font-medium text-[#1d1d1f] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 cursor-pointer shadow-2xs"
              >
                <option value="name">Sort by Name (A–Z)</option>
                <option value="abv-desc">Sort by ABV (Highest First)</option>
                <option value="age-desc">Sort by Age Statement</option>
              </select>
            </div>
          </div>

          {/* Granular Segmented Filtering Rows */}
          <div className="space-y-3.5 pt-4 border-t border-black/[0.06]">
            {/* 1. Age Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-[#86868b] flex items-center gap-1 min-w-[70px]">
                <Clock className="w-3 h-3" /> Age:
              </span>
              {[
                { id: 'all', label: 'All Ages' },
                { id: 'NAS', label: 'NAS' },
                { id: '10-12', label: '10–12 Years' },
                { id: '13-17', label: '13–17 Years' },
                { id: '18-21', label: '18–21 Years' },
                { id: '21+', label: '21+ Years' },
              ].map(age => (
                <button
                  key={age.id}
                  onClick={() => setSelectedAgeGroup(age.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    selectedAgeGroup === age.id
                      ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                      : 'bg-white text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.04]'
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>

            {/* 2. Cask Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-[#86868b] flex items-center gap-1 min-w-[70px]">
                <Layers className="w-3 h-3" /> Cask:
              </span>
              {[
                { id: 'all', label: 'All Casks' },
                { id: 'Bourbon', label: 'Bourbon' },
                { id: 'Sherry', label: 'Sherry' },
                { id: 'Port', label: 'Port' },
                { id: 'Wine', label: 'Wine' },
                { id: 'Rum', label: 'Rum' },
                { id: 'Mixed cask', label: 'Mixed Cask' },
              ].map(cask => (
                <button
                  key={cask.id}
                  onClick={() => setSelectedCask(cask.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    selectedCask === cask.id
                      ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                      : 'bg-white text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.04]'
                  }`}
                >
                  {cask.label}
                </button>
              ))}
            </div>

            {/* 3. Flavour Profile Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-[#86868b] flex items-center gap-1 min-w-[70px]">
                <Tag className="w-3 h-3" /> Flavour:
              </span>
              {[
                { id: 'all', label: 'All Flavours' },
                { id: 'Smoky', label: 'Smoky' },
                { id: 'Fruity', label: 'Fruity' },
                { id: 'Sweet', label: 'Sweet' },
                { id: 'Floral', label: 'Floral' },
                { id: 'Spicy', label: 'Spicy' },
                { id: 'Nutty', label: 'Nutty' },
                { id: 'Maritime', label: 'Maritime' },
                { id: 'Rich', label: 'Rich' },
              ].map(flav => (
                <button
                  key={flav.id}
                  onClick={() => setSelectedFlavour(flav.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    selectedFlavour === flav.id
                      ? 'bg-[#0071e3] text-white font-semibold shadow-xs'
                      : 'bg-white text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.04]'
                  }`}
                >
                  {flav.label}
                </button>
              ))}
            </div>

            {/* 4. Peat Level Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-[#86868b] flex items-center gap-1 min-w-[70px]">
                <Flame className="w-3 h-3" /> Peat:
              </span>
              {[
                { id: 'all', label: 'All Peat' },
                { id: 'None', label: 'Unpeated' },
                { id: 'Light', label: 'Light' },
                { id: 'Medium', label: 'Medium' },
                { id: 'Heavy', label: 'Heavy' },
              ].map(peat => (
                <button
                  key={peat.id}
                  onClick={() => setSelectedPeat(peat.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                    selectedPeat === peat.id
                      ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                      : 'bg-white text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.04]'
                  }`}
                >
                  {peat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Bar & Active Filter Counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#86868b] px-1">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-[#1d1d1f] font-semibold text-sm">{filteredWhiskies.length}</strong> single malts
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] bg-[#0071e3]/10 px-2.5 py-0.5 rounded-full text-[#0071e3] font-semibold">
                Filters active
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-[#0071e3] hover:underline font-medium text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Whisky Bottle Cards Grid */}
        {filteredWhiskies.length === 0 ? (
          <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-16 text-center space-y-4 shadow-xs">
            <Wine className="w-12 h-12 mx-auto text-[#86868b]" />
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">No single malts found</h3>
              <p className="text-sm text-[#86868b] max-w-md mx-auto">
                No whiskies match your specific combination of region, age, cask, flavour, and peat filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWhiskies.map((whisky) => {
              const isCompared = compareList.some(c => c.id === whisky.id);
              const isWishlisted = wishlistIds.includes(whisky.id);

              return (
                <div
                  key={whisky.id}
                  onClick={() => onSelectWhisky(whisky)}
                  className="bg-white rounded-3xl border border-black/[0.06] apple-card-hover flex flex-col justify-between group relative overflow-hidden cursor-pointer"
                >
                  {/* Card Top */}
                  <div className="p-6">
                    {/* Bottle Canvas Frame */}
                    <div className="relative mb-5 bg-[#f5f5f7] rounded-2xl p-5 flex flex-col items-center justify-center overflow-hidden border border-black/[0.02]">
                      {/* Top Action Overlay Badges */}
                      <div className="w-full flex items-center justify-between mb-2 z-10">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[11px] font-semibold rounded-full shadow-2xs border border-black/[0.04]">
                          {whisky.regionName}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(whisky);
                            }}
                            className={`p-2 rounded-full border transition-all cursor-pointer shadow-2xs ${
                              isWishlisted
                                ? 'bg-[#ff3b30] border-[#ff3b30] text-white'
                                : 'bg-white/90 backdrop-blur-md border-black/[0.06] text-[#86868b] hover:text-[#1d1d1f]'
                            }`}
                            title={isWishlisted ? 'Saved in Cabinet' : 'Save to Cabinet'}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                          </button>

                          {/* Compare Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCompare(whisky);
                            }}
                            className={`p-2 rounded-full border transition-all cursor-pointer shadow-2xs ${
                              isCompared
                                ? 'bg-[#0071e3] border-[#0071e3] text-white'
                                : 'bg-white/90 backdrop-blur-md border-black/[0.06] text-[#86868b] hover:text-[#1d1d1f]'
                            }`}
                            title={isCompared ? 'In Compare Studio' : 'Add to Compare Studio'}
                          >
                            <BarChart2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Bottle Image with 3D drop-shadow */}
                      <div className="w-full h-48 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-out">
                        <WhiskyBottleArt
                          whisky={whisky}
                          size="md"
                          className="h-44"
                        />
                      </div>

                      {/* Peat Level and ABV Indicator */}
                      <div className="mt-3 w-full flex items-center justify-between text-[11px]">
                        <span className="px-2.5 py-0.5 bg-white rounded-full text-[#1d1d1f] font-medium border border-black/[0.04] shadow-2xs">
                          {whisky.peatLevel}
                        </span>
                        <span className="text-[#86868b] font-semibold">
                          {whisky.abv}% ABV
                        </span>
                      </div>
                    </div>

                    {/* Distillery and Age metadata */}
                    <div className="text-xs text-[#0071e3] font-semibold tracking-normal mb-1">
                      {whisky.distilleryName} • {whisky.ageStatement}
                    </div>

                    {/* Whisky Name */}
                    <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-snug line-clamp-1">
                      {whisky.name}
                    </h3>

                    {/* Short Tasting Description */}
                    <p className="text-xs text-[#86868b] line-clamp-2 mt-2 leading-relaxed">
                      "{whisky.characterSnippet}"
                    </p>

                    {/* Cask Type Specification Box */}
                    <div className="mt-3.5 bg-[#f5f5f7] p-3 rounded-2xl border border-black/[0.04] text-xs">
                      <span className="text-[10px] font-semibold text-[#86868b] block mb-0.5">
                        Cask Maturation
                      </span>
                      <p className="text-[#1d1d1f] text-xs font-medium line-clamp-1">
                        {whisky.caskType}
                      </p>
                    </div>

                    {/* Flavour Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {whisky.flavourTags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 px-6 bg-[#f5f5f7]/60 border-t border-black/[0.04] flex items-center justify-between">
                    <span className="text-xs font-medium text-[#0071e3] flex items-center gap-1 group-hover:underline">
                      <span>Inspect Tasting Notes</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCompare(whisky);
                      }}
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all cursor-pointer shadow-2xs ${
                        isCompared
                          ? 'bg-[#0071e3] text-white'
                          : 'bg-white border border-black/[0.08] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white'
                      }`}
                    >
                      {isCompared ? 'Comparing' : '+ Compare'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

