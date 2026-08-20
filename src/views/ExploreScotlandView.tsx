import React, { useState } from 'react';
import { REGIONS } from '../data/regions';
import { DISTILLERIES } from '../data/distilleries';
import { WHISKIES } from '../data/whiskies';
import { RegionId, Region, Distillery, Whisky } from '../types';
import { InteractiveScotlandMap } from '../components/InteractiveScotlandMap';
import { FlavourRadarChart } from '../components/FlavourRadarChart';
import { Compass, MapPin, Droplets, Wind, Sparkles, ArrowRight, Eye, Layers, ShieldCheck } from 'lucide-react';

interface Props {
  selectedRegionId: RegionId;
  onSelectRegion: (id: RegionId) => void;
  onSelectDistillery: (distillery: Distillery) => void;
  onSelectWhisky: (whisky: Whisky) => void;
}

export const ExploreScotlandView: React.FC<Props> = ({
  selectedRegionId,
  onSelectRegion,
  onSelectDistillery,
  onSelectWhisky,
}) => {
  const currentRegion = REGIONS.find(r => r.id === selectedRegionId) || REGIONS[0];
  const regionDistilleries = DISTILLERIES.filter(d => d.regionId === currentRegion.id);
  const regionWhiskies = WHISKIES.filter(w => w.regionId === currentRegion.id);

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Page Header */}
      <div className="bg-[#1A3021] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={currentRegion.landscapeImage}
            alt={currentRegion.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A3021] via-[#1A3021]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#FAF9F6]/10 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Scottish Terroir & Regional Exploration</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-heading tracking-tight text-white">
            Explore Scotland's Whisky Terroir
          </h1>
          <p className="text-sm sm:text-base text-[#FAF9F6]/85 max-w-2xl mt-2 font-sans-body">
            Select a region on the interactive map below to uncover centuries of whisky craftsmanship, geological microclimates, featured distilleries, and distinctive regional flavours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Interactive Map Section */}
        <InteractiveScotlandMap
          selectedRegionId={currentRegion.id}
          onSelectRegion={onSelectRegion}
          onSelectDistillery={(id) => {
            const d = DISTILLERIES.find(dist => dist.id === id);
            if (d) onSelectDistillery(d);
          }}
        />

        {/* Selected Region Deep Dive */}
        <div className="bg-white rounded-xs border border-[#EDE3D9] border-l-4 border-l-[#C5A059] p-6 sm:p-10 shadow-xs space-y-8">
          {/* Region Title & Gaelic Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDE3D9] pb-6">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Region Profile • {currentRegion.distilleriesCount}+ Active Distilleries</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A3021] mt-1">
                {currentRegion.name} {currentRegion.gaelicName ? `(${currentRegion.gaelicName})` : ''}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#C5A059] mt-0.5 uppercase tracking-wider">
                {currentRegion.tagline}
              </p>
            </div>

            {/* Quick Region Switcher Buttons */}
            <div className="flex flex-wrap gap-1.5 bg-[#FAF9F6] p-1.5 rounded-sm border border-[#EDE3D9]">
              {REGIONS.map(r => (
                <button
                  key={r.id}
                  onClick={() => onSelectRegion(r.id)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                    r.id === currentRegion.id
                      ? 'bg-[#1A3021] text-[#C5A059] border border-[#C5A059] shadow-xs'
                      : 'text-[#2D2D2D]/70 hover:text-[#1A3021] hover:bg-[#FAF9F6]'
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column: Full Description & Flavour Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-serif text-[#1A3021]">The Character & Terroir of {currentRegion.name}</h3>
              <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
                {currentRegion.fullDescription}
              </p>
              <p className="text-xs text-[#C5A059] italic">
                Historical Context: {currentRegion.historicalHighlights}
              </p>

              {/* Typical Flavours Badges */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A3021]/60 block mb-2">
                  Signature Tasting Notes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentRegion.typicalFlavours.map((flv, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#FAF9F6] border border-[#D4AF37]/30 text-xs font-medium text-[#1A3021] rounded-xs"
                    >
                      {flv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="lg:col-span-5 bg-[#FAF9F6] p-6 rounded-xs border border-[#EDE3D9] flex flex-col items-center justify-center">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-2">Regional Flavour DNA</h4>
              <FlavourRadarChart radar={currentRegion.flavourProfile} size={240} color="#C5A059" />
            </div>
          </div>

          {/* Terroir Factors (Climate, Water, Peat, Casks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-[#EDE3D9]">
            <div className="bg-[#FAF9F6] p-4 rounded-xs border border-[#EDE3D9]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center gap-1 mb-1">
                <Wind className="w-3.5 h-3.5" /> Climate & Aging
              </span>
              <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">{currentRegion.terroir.climate}</p>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-xs border border-[#EDE3D9]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center gap-1 mb-1">
                <Droplets className="w-3.5 h-3.5" /> Water Sources
              </span>
              <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">{currentRegion.terroir.waterSource}</p>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-xs border border-[#EDE3D9]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Peat Profile
              </span>
              <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">{currentRegion.terroir.peatCharacteristics}</p>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-xs border border-[#EDE3D9]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] flex items-center gap-1 mb-1">
                <Layers className="w-3.5 h-3.5" /> Cask Traditions
              </span>
              <p className="text-xs text-[#2D2D2D]/75 leading-relaxed">{currentRegion.terroir.caskTraditions}</p>
            </div>
          </div>
        </div>

        {/* Featured Distilleries in this Region */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-serif text-[#1A3021]">
                Featured {currentRegion.name} Distilleries
              </h3>
              <p className="text-xs text-[#2D2D2D]/70">Iconic production houses of the region</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regionDistilleries.map((distillery, idx) => (
              <div
                key={distillery.id}
                className="bg-white rounded-xs border border-[#EDE3D9] border-l-4 border-l-[#C5A059] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 w-full bg-[#1A3021] overflow-hidden">
                    <img
                      src={distillery.heroImage}
                      alt={distillery.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A3021]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h4 className="text-lg font-serif">{distillery.name}</h4>
                      <p className="text-xs text-[#C5A059]">Est. {distillery.foundedYear} • {distillery.location}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <p className="text-xs text-[#2D2D2D]/75 line-clamp-2 italic">{distillery.shortHistory}</p>
                    <p className="text-xs font-serif text-[#1A3021] line-clamp-1">
                      "{distillery.whiskyStyle}"
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => onSelectDistillery(distillery)}
                    className="w-full py-2 bg-[#FAF9F6] hover:bg-[#1A3021] text-[#1A3021] hover:text-white border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer rounded-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>View Distillery Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Whiskies from that region */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-serif text-[#1A3021]">
                Whiskies from {currentRegion.name}
              </h3>
              <p className="text-xs text-[#2D2D2D]/70">Iconic single malt expressions from this region</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionWhiskies.map((whisky) => (
              <div
                key={whisky.id}
                onClick={() => onSelectWhisky(whisky)}
                className="bg-white rounded-xs border border-[#EDE3D9] border-l-4 border-l-[#1A3021] p-5 hover:shadow-md hover:border-l-[#C5A059] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#C5A059] mb-1.5 font-bold uppercase tracking-wider">
                    <span>{whisky.distilleryName}</span>
                    <span>{whisky.ageStatement} • {whisky.abv}% ABV</span>
                  </div>

                  <h4 className="text-lg font-serif text-[#1A3021] group-hover:text-[#C5A059] transition-colors line-clamp-1">
                    {whisky.name}
                  </h4>

                  <p className="text-xs text-[#2D2D2D]/75 line-clamp-2 mt-1.5 italic">
                    {whisky.characterSnippet}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {whisky.flavourTags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#FAF9F6] border border-[#EDE3D9] text-[#1A3021] text-[11px] rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#FAF9F6] flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#C5A059]">
                  <span>Explore Tasting Notes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
