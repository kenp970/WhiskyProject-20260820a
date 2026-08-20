import React from 'react';
import { REGIONS } from '../data/regions';
import { ActiveTab } from './Navbar';
import { Wine, Compass, MapPin, Heart, Shield, Sparkles, ChevronRight } from 'lucide-react';

interface Props {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectRegion: (id: any) => void;
}

export const Footer: React.FC<Props> = ({ setActiveTab, onSelectRegion }) => {
  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] border-t border-black/[0.08] mt-24 text-[12px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footnote / Disclaimer section like Apple */}
        <div className="border-b border-black/[0.08] pb-6 mb-8 text-[11px] text-[#86868b] leading-relaxed space-y-2">
          <p>
            1. Single Malt Scotch Whisky is defined under the Scotch Whisky Regulations 2009 as whisky distilled exclusively from 100% malted barley at a single Scottish distillery using copper pot stills, aged in oak casks for a minimum of three years.
          </p>
          <p>
            2. Tasting notes, flavour radar metrics, and cask profiles are compiled from master distillers, sensory panels, and Scotch Whisky Association documentation. Please enjoy Scottish single malt whisky responsibly (18+ / 21+).
          </p>
        </div>

        {/* Apple Style Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10">
          
          {/* Column 1: Explore Regions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px]">Whisky Terroirs</h4>
            <ul className="space-y-2">
              {REGIONS.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => {
                      onSelectRegion(r.id);
                      setActiveTab('explore');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#1d1d1f] hover:underline transition-colors text-left cursor-pointer"
                  >
                    {r.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Distilleries & Malts */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px]">Distilleries & Bottles</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setActiveTab('distilleries'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  18 Featured Distilleries
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('whiskies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  Single Malt Expressions
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('compare'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  Compare Studio
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('flavour-map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  2D Flavour Map
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Discovery */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px]">Tools & Palate Match</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setActiveTab('discover'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  Find My Whisky Quiz
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('casks'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  Oak Cask Explorer
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('cabinet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  My Whisky Cabinet
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('cabinet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  Tasting Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Single Malt Academy */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px]">Whisky Academy</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  5 Production Stages
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  Wood Chemistry & Casks
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  The 5 S's Tasting Ritual
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1d1d1f] hover:underline cursor-pointer">
                  Scotch Whisky Regulations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Brand Summary */}
          <div className="space-y-3 col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px]">Scotland Single Malt</h4>
            <p className="text-[11px] text-[#86868b] leading-relaxed">
              Designed with precision for whisky collectors, enthusiasts, and curious palates worldwide.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#1d1d1f]">
              <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿 Slàinte Mhath</span>
            </div>
          </div>

        </div>

        {/* Apple Subfooter Strip */}
        <div className="border-t border-black/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#86868b]">
          <div>
            <span>Copyright © {new Date().getFullYear()} Scotland Single Malt Explorer. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Distillery Registry</span>
            <span>•</span>
            <span className="text-[#1d1d1f] font-medium">Scotland, UK</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

