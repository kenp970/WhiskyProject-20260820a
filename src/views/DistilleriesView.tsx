import React, { useState, useMemo } from 'react';
import { DISTILLERIES } from '../data/distilleries';
import { REGIONS } from '../data/regions';
import { Distillery, RegionId } from '../types';
import { Search, Calendar, MapPin, Eye, Filter, ArrowUpDown, Sparkles, ChevronRight, X } from 'lucide-react';

interface Props {
  onSelectDistillery: (distillery: Distillery) => void;
}

export const DistilleriesView: React.FC<Props> = ({ onSelectDistillery }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'founded-asc' | 'founded-desc' | 'name-asc'>('founded-asc');

  const filteredDistilleries = useMemo(() => {
    return DISTILLERIES.filter(d => {
      const matchesRegion = selectedRegion === 'all' || d.regionId === selectedRegion;
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.regionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.whiskyStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.typicalFlavours.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRegion && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'founded-asc') return a.foundedYear - b.foundedYear;
      if (sortBy === 'founded-desc') return b.foundedYear - a.foundedYear;
      return a.name.localeCompare(b.name);
    });
  }, [selectedRegion, searchQuery, sortBy]);

  return (
    <div className="space-y-10 animate-apple-fade pb-20">
      {/* Header Banner */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Distillery Architecture & Heritage</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          Scottish Distilleries.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          Explore 18 iconic distilleries across Scotland — their stillhouses, unique fermentation methods, water sources, and signature house styles.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls Bar: Search & Region Filter & Sorting */}
        <div className="bg-[#f5f5f7] p-6 sm:p-8 rounded-3xl border border-black/[0.04] space-y-4">
          <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search distilleries by name, flavour, or style..."
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

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#86868b] whitespace-nowrap flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white border border-black/[0.06] text-xs font-medium text-[#1d1d1f] rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 cursor-pointer shadow-2xs"
              >
                <option value="founded-asc">Founded (Oldest First)</option>
                <option value="founded-desc">Founded (Newest First)</option>
                <option value="name-asc">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-black/[0.04] scrollbar-none">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-3.5 py-1.5 text-xs rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedRegion === 'all'
                  ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                  : 'bg-white text-[#1d1d1f] hover:bg-black/[0.04] border border-black/[0.04]'
              }`}
            >
              All (18)
            </button>
            {REGIONS.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3.5 py-1.5 text-xs rounded-full whitespace-nowrap transition-all cursor-pointer ${
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

        {/* Distillery Cards Grid */}
        {filteredDistilleries.length === 0 ? (
          <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-16 text-center text-[#86868b] space-y-4 shadow-xs">
            <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">No distilleries found</h3>
            <p className="text-sm">Try resetting your filters or clearing your search term.</p>
            <button
              onClick={() => { setSelectedRegion('all'); setSearchQuery(''); }}
              className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistilleries.map((distillery) => {
              return (
                <div
                  key={distillery.id}
                  onClick={() => onSelectDistillery(distillery)}
                  className="group bg-white rounded-3xl border border-black/[0.06] overflow-hidden apple-card-hover flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-[#1d1d1f]">
                      <img
                        src={distillery.heroImage}
                        alt={distillery.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                          {distillery.regionName}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#1d1d1f] text-xs font-medium rounded-full flex items-center gap-1 shadow-2xs">
                          <Calendar className="w-3 h-3 text-[#0071e3]" /> Est. {distillery.foundedYear}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <h3 className="text-2xl font-bold tracking-tight leading-tight drop-shadow-xs">
                          {distillery.name}
                        </h3>
                        <p className="text-xs text-white/80 font-medium truncate mt-0.5">
                          {distillery.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">{distillery.shortHistory}</p>

                      <div className="bg-[#f5f5f7] p-3.5 rounded-2xl border border-black/[0.03]">
                        <span className="text-[10px] font-semibold text-[#0071e3] block mb-0.5">
                          House Character
                        </span>
                        <p className="text-xs font-medium text-[#1d1d1f] line-clamp-2">
                          "{distillery.whiskyStyle}"
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-semibold text-[#86868b] block mb-1.5">
                          Key Flavour Descriptors
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {distillery.typicalFlavours.slice(0, 3).map((flv, fIdx) => (
                            <span
                              key={fIdx}
                              className="px-2.5 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full"
                            >
                              {flv}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="w-full py-2.5 px-4 bg-[#f5f5f7] group-hover:bg-[#0071e3] text-[#1d1d1f] group-hover:text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all shadow-2xs">
                      <span>Explore Distillery & Stillhouse</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
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

