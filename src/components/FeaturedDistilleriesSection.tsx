import React, { useState } from 'react';
import { DISTILLERIES } from '../data/distilleries';
import { REGIONS } from '../data/regions';
import { Distillery, RegionId } from '../types';
import { Calendar, MapPin, Sparkles, ArrowRight, ChevronRight, Eye, Layers } from 'lucide-react';

interface Props {
  onSelectDistillery: (distillery: Distillery) => void;
  onExploreAllDistilleries: () => void;
}

export const FeaturedDistilleriesSection: React.FC<Props> = ({
  onSelectDistillery,
  onExploreAllDistilleries
}) => {
  const [selectedRegionTab, setSelectedRegionTab] = useState<RegionId | 'all'>('all');

  const filteredDistilleries = selectedRegionTab === 'all'
    ? DISTILLERIES
    : DISTILLERIES.filter(d => d.regionId === selectedRegionTab);

  return (
    <section className="bg-white border-y border-black/[0.06] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#0071e3] tracking-normal mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Iconic Houses & Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f]">
              Featured Distilleries.
            </h2>
            <p className="text-base text-[#86868b] mt-2 max-w-2xl">
              Explore 18 benchmark distilleries representing the pinnacle of whisky craftsmanship across all six Scotch regions.
            </p>
          </div>

          <button
            onClick={onExploreAllDistilleries}
            className="text-sm font-medium text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto"
          >
            <span>View All 18 Distilleries</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Apple Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#f5f5f7] rounded-full overflow-x-auto mb-10 max-w-fit no-scrollbar">
          <button
            onClick={() => setSelectedRegionTab('all')}
            className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedRegionTab === 'all'
                ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            All Regions (18)
          </button>
          {REGIONS.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegionTab(r.id)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all cursor-pointer ${
                selectedRegionTab === r.id
                  ? 'bg-white text-[#1d1d1f] shadow-xs font-semibold'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Distillery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistilleries.map((distillery) => {
            return (
              <div
                key={distillery.id}
                onClick={() => onSelectDistillery(distillery)}
                className="group bg-[#f5f5f7] rounded-3xl border border-black/[0.04] overflow-hidden apple-card-hover flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Distillery Hero Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#1d1d1f]">
                    <img
                      src={distillery.heroImage}
                      alt={`${distillery.name} Distillery`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Region & Year Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#1d1d1f] text-[11px] font-semibold rounded-full shadow-xs">
                        {distillery.regionName}
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-normal rounded-full border border-white/10 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#2997ff]" /> Est. {distillery.foundedYear}
                      </span>
                    </div>

                    {/* Name on image bottom */}
                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {distillery.name}
                      </h3>
                      <p className="text-xs text-white/70 font-normal truncate">
                        {distillery.location}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Short History */}
                    <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">
                      {distillery.shortHistory}
                    </p>

                    {/* House Character */}
                    <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-2xs">
                      <span className="text-[11px] font-semibold text-[#86868b] block mb-1">
                        House Signature
                      </span>
                      <p className="text-xs font-medium text-[#1d1d1f] line-clamp-2">
                        "{distillery.whiskyStyle}"
                      </p>
                    </div>

                    {/* Flavour tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {distillery.typicalFlavours.slice(0, 3).map((flv, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2.5 py-1 bg-white border border-black/[0.04] text-[#1d1d1f] text-xs font-medium rounded-full shadow-2xs"
                        >
                          {flv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Distillery Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDistillery(distillery);
                    }}
                    className="w-full py-2.5 px-4 bg-white hover:bg-[#1d1d1f] text-[#1d1d1f] hover:text-white border border-black/[0.08] hover:border-[#1d1d1f] text-xs font-medium rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group/btn"
                  >
                    <span>Inspect House</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

