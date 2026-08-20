import React from 'react';
import { REGIONS } from '../data/regions';
import { RegionId } from '../types';
import { Compass, ArrowRight, ChevronRight, Sparkles, MapPin } from 'lucide-react';

interface Props {
  onSelectRegion: (id: RegionId) => void;
  onExploreAll: () => void;
}

export const RegionCardsSection: React.FC<Props> = ({ onSelectRegion, onExploreAll }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Section Header with Apple-style typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="text-xs font-semibold text-[#0071e3] tracking-normal mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Scottish Terroirs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f]">
            The Six Distilling Regions.
          </h2>
          <p className="text-base text-[#86868b] mt-2 max-w-2xl">
            From the honeyed orchards of Speyside to the storm-lashed peat bogs of Islay, explore how distinct microclimates shape each region's signature spirit.
          </p>
        </div>

        <button
          onClick={onExploreAll}
          className="text-sm font-medium text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto"
        >
          <span>Explore Interactive Atlas</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 Region Apple Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONS.map((region) => {
          return (
            <div
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className="group relative bg-white rounded-3xl border border-black/[0.06] overflow-hidden apple-card-hover cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Region Image Container */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#1d1d1f]">
                  <img
                    src={region.landscapeImage}
                    alt={`${region.name} landscape`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#1d1d1f] text-xs font-semibold rounded-full shadow-xs">
                      {region.name}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-normal rounded-full border border-white/15">
                      {region.distilleriesCount}+ Stills
                    </span>
                  </div>

                  {/* Region Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    {region.gaelicName && (
                      <span className="text-xs text-white/70 block font-normal">
                        {region.gaelicName}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      {region.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-[#86868b] leading-relaxed line-clamp-2">
                    {region.shortDescription}
                  </p>

                  {/* Typical Flavours Tags */}
                  <div>
                    <span className="text-xs font-semibold text-[#1d1d1f] block mb-2">
                      Key Flavour Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {region.typicalFlavours.slice(0, 4).map((flavour, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2.5 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full"
                        >
                          {flavour}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action Link */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-black/[0.04] text-xs font-semibold text-[#0071e3]">
                <span>Explore Region</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

