import React from 'react';
import { ActiveTab } from './Navbar';
import { Compass, Sparkles, Wine, ArrowRight, ChevronRight, ShieldCheck, Flame, Layers, MapPin } from 'lucide-react';

interface Props {
  setActiveTab: (tab: ActiveTab) => void;
  onExploreScotland: () => void;
  onDiscoverWhisky: () => void;
  onFindMyWhisky: () => void;
}

export const HeroSection: React.FC<Props> = ({
  setActiveTab,
  onExploreScotland,
  onDiscoverWhisky,
  onFindMyWhisky,
}) => {
  return (
    <div className="relative overflow-hidden bg-[#000000] text-white">
      {/* Background with ultra-subtle atmospheric highlands texture and ambient lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2400&q=85"
          alt="Scottish Highlands and misty glens"
          className="w-full h-full object-cover object-center opacity-25 scale-100"
        />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#000000]/60 to-[#000000]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />
        
        {/* Apple subtle radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0071e3]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Apple Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] text-[#2997ff] text-[12px] font-medium tracking-normal animate-apple-fade">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Definitive Digital Atlas of Scottish Whisky</span>
          </div>

          {/* Apple Hero Typography */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.04]">
            Scotland Single Malt.
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#86868b] max-w-3xl mx-auto">
            Crafted by Highlands, Islands, and Time.
          </p>

          <p className="text-base sm:text-lg text-[#a1a1a6] font-normal leading-relaxed max-w-2xl mx-auto pt-1">
            Experience 140+ distilleries across 6 terroirs, interactive 2D flavour spectrums, wood chemistry, and personalized dram matching.
          </p>

          {/* Apple Style CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onExploreScotland}
              className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm transition-all shadow-lg hover:shadow-[#0071e3]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Scotland</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onFindMyWhisky}
              className="px-6 py-3 rounded-full bg-white/[0.1] hover:bg-white/[0.15] text-white font-medium text-sm border border-white/[0.15] transition-all backdrop-blur-lg flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#2997ff]" />
              <span>Palate Matcher</span>
            </button>

            <button
              onClick={onDiscoverWhisky}
              className="px-6 py-3 rounded-full bg-transparent hover:bg-white/[0.06] text-[#2997ff] font-medium text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Browse Single Malts</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Apple Product Spotlight Bento / Triad Hero Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {/* Card 1: Speyside Heritage */}
          <div 
            onClick={() => setActiveTab('whiskies')}
            className="group relative rounded-3xl bg-[#161617] border border-white/[0.08] p-6 overflow-hidden transition-all duration-300 hover:border-white/[0.2] hover:bg-[#1d1d1f] cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-[#86868b] font-medium">
              <span className="flex items-center gap-1.5 text-[#2997ff]">
                <MapPin className="w-3.5 h-3.5" /> Speyside
              </span>
              <span>Sherry Cask</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white group-hover:text-[#2997ff] transition-colors">
                The Macallan 18 Double Cask
              </h3>
              <p className="text-xs text-[#86868b] mt-1 line-clamp-2">
                Dried fruits, ginger spice, and rich Spanish oak sweetness from the banks of the River Spey.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <span className="text-xs text-[#86868b]">43% ABV • 18 Years</span>
              <span className="text-xs text-[#2997ff] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Inspect <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Card 2: Islay Peat Benchmark */}
          <div 
            onClick={() => setActiveTab('whiskies')}
            className="group relative rounded-3xl bg-[#161617] border border-white/[0.08] p-6 overflow-hidden transition-all duration-300 hover:border-white/[0.2] hover:bg-[#1d1d1f] cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-[#86868b] font-medium">
              <span className="flex items-center gap-1.5 text-[#ff9500]">
                <Flame className="w-3.5 h-3.5" /> Islay
              </span>
              <span>Peated Malt</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white group-hover:text-[#ff9500] transition-colors">
                Lagavulin 16 Year Old
              </h3>
              <p className="text-xs text-[#86868b] mt-1 line-clamp-2">
                Pungent peat smoke, iodine, seaweed, and deep lapsang souchong tea richness.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <span className="text-xs text-[#86868b]">43% ABV • Heavy Smoke</span>
              <span className="text-xs text-[#ff9500] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Inspect <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Card 3: Highlands & Islands */}
          <div 
            onClick={() => setActiveTab('whiskies')}
            className="group relative rounded-3xl bg-[#161617] border border-white/[0.08] p-6 overflow-hidden transition-all duration-300 hover:border-white/[0.2] hover:bg-[#1d1d1f] cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-[#86868b] font-medium">
              <span className="flex items-center gap-1.5 text-[#30d158]">
                <Sparkles className="w-3.5 h-3.5" /> Islands
              </span>
              <span>Maritime Heather</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white group-hover:text-[#30d158] transition-colors">
                Highland Park 18 Viking Pride
              </h3>
              <p className="text-xs text-[#86868b] mt-1 line-clamp-2">
                Orkney aromatic heather peat, honey blossom, toasted oak, and spiced marmalade.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <span className="text-xs text-[#86868b]">43% ABV • Balanced</span>
              <span className="text-xs text-[#30d158] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Inspect <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Apple Keynote Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto pt-8 border-t border-white/[0.08]">
          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight block">6</span>
            <span className="text-xs font-normal text-[#86868b] block mt-1">Distinct Terroir Regions</span>
          </div>

          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight block">140+</span>
            <span className="text-xs font-normal text-[#86868b] block mt-1">Active Distilleries</span>
          </div>

          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight block">100%</span>
            <span className="text-xs font-normal text-[#86868b] block mt-1">Copper Pot Stills</span>
          </div>

          <div className="text-center">
            <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight block">Radar</span>
            <span className="text-xs font-normal text-[#86868b] block mt-1">7-Axis Flavour Profiling</span>
          </div>
        </div>

      </div>
    </div>
  );
};

