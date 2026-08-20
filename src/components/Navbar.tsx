import React, { useState } from 'react';
import { Search, Compass, Wine, Layers, Sparkles, BookOpen, Heart, Menu, X, BarChart2, Map, Flame, Award, ChevronRight } from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'explore'
  | 'distilleries'
  | 'whiskies'
  | 'compare'
  | 'flavour-map'
  | 'casks'
  | 'discover'
  | 'learn'
  | 'cabinet';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenRandomDram?: () => void;
  savedCount: number;
  compareCount: number;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenRandomDram,
  savedCount,
  compareCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Overview', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'explore', label: 'Terroir & Maps', icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'distilleries', label: 'Distilleries', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'whiskies', label: 'Single Malts', icon: <Wine className="w-3.5 h-3.5" /> },
    { id: 'compare', label: 'Compare', icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { id: 'flavour-map', label: 'Flavour Spectrum', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'casks', label: 'Oak & Casks', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'discover', label: 'Palate Quiz', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'learn', label: 'Academy', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'cabinet', label: 'Cabinet', icon: <Heart className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Apple Minimal Announcement Ribbon */}
      <div className="bg-[#1d1d1f] text-[#f5f5f7] text-[12px] py-2 px-4 text-center font-normal flex items-center justify-center gap-2 border-b border-white/[0.08]">
        <span className="text-[#86868b]">Scotland Single Malt Explorer</span>
        <span className="text-white/30 hidden sm:inline">•</span>
        <span className="text-white hidden sm:inline">The definitive digital guide to 140+ distilleries, terroir & flavour alchemy.</span>
        {onOpenRandomDram && (
          <button
            onClick={onOpenRandomDram}
            className="text-[#2997ff] hover:underline font-medium ml-1 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Dram of the Day</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Primary Apple Glass Navigation Bar */}
      <div className="bg-[rgba(255,255,255,0.85)] backdrop-blur-2xl border-b border-black/[0.08] text-[#1d1d1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Apple-style Brand Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-[#0071e3] transition-colors">
                <span>🥃</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
                  Scotland Single Malt
                </span>
                <span className="text-[11px] font-normal text-[#86868b] tracking-normal">
                  Explorer
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[12px] font-medium text-[#1d1d1f]/80">
              {mainNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                        : 'text-[#1d1d1f]/80 hover:text-[#1d1d1f] hover:bg-black/[0.04]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.id === 'cabinet' && savedCount > 0 && (
                      <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                        isActive ? 'bg-[#0071e3] text-white' : 'bg-[#0071e3] text-white'
                      }`}>
                        {savedCount}
                      </span>
                    )}
                    {item.id === 'compare' && compareCount > 0 && (
                      <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                        isActive ? 'bg-[#ff9500] text-white' : 'bg-[#ff9500] text-white'
                      }`}>
                        {compareCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="h-8 px-3 rounded-full bg-black/[0.05] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-normal flex items-center gap-2 transition-colors cursor-pointer"
                aria-label="Quick Search"
              >
                <Search className="w-3.5 h-3.5 text-[#86868b]" />
                <span className="hidden sm:inline text-[#86868b]">Search</span>
                <kbd className="hidden sm:inline text-[10px] text-[#86868b] bg-white px-1.5 py-0.5 rounded shadow-2xs border border-black/5 font-mono">⌘K</kbd>
              </button>

              <button
                onClick={() => handleNavClick('cabinet')}
                className="h-8 w-8 rounded-full bg-black/[0.05] hover:bg-black/[0.08] text-[#1d1d1f] flex items-center justify-center relative transition-colors cursor-pointer"
                aria-label="Cabinet"
                title="My Whisky Cabinet"
              >
                <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-[#ff2d55] fill-[#ff2d55]' : 'text-[#1d1d1f]'}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0071e3] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-8 w-8 rounded-full bg-black/[0.05] hover:bg-black/[0.08] flex items-center justify-center text-[#1d1d1f] cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Apple Chapter Ribbon (Sub-Navigation for easy fast-switching on desktop & tablet) */}
      <div className="bg-[#f5f5f7]/95 border-b border-black/[0.06] overflow-x-auto no-scrollbar hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center space-x-6 text-[12px] font-normal text-[#86868b]">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'text-[#0071e3] font-semibold'
                  : 'hover:text-[#1d1d1f]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.08] bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-apple-fade">
          {mainNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#0071e3] text-white font-semibold'
                    : 'text-[#1d1d1f] hover:bg-black/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-[#86868b]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.id === 'cabinet' && savedCount > 0 && (
                  <span className="px-2 py-0.5 bg-white text-[#0071e3] text-[10px] font-bold rounded-full">
                    {savedCount}
                  </span>
                )}
                {item.id === 'compare' && compareCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#ff9500] text-white text-[10px] font-bold rounded-full">
                    {compareCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

