import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { RegionCardsSection } from './components/RegionCardsSection';
import { FeaturedDistilleriesSection } from './components/FeaturedDistilleriesSection';
import { DistilleryDetailModal } from './components/DistilleryDetailModal';
import { WhiskyDetailModal } from './components/WhiskyDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { RandomDramModal } from './components/RandomDramModal';

import { ExploreScotlandView } from './views/ExploreScotlandView';
import { DistilleriesView } from './views/DistilleriesView';
import { WhiskiesView } from './views/WhiskiesView';
import { CompareView } from './views/CompareView';
import { FlavourExplorerView } from './views/FlavourExplorerView';
import { CaskExplorerView } from './views/CaskExplorerView';
import { DiscoverView } from './views/DiscoverView';
import { LearnView } from './views/LearnView';
import { MyWhiskyView, TastingEntry } from './views/MyWhiskyView';

import { REGIONS } from './data/regions';
import { DISTILLERIES } from './data/distilleries';
import { WHISKIES } from './data/whiskies';
import { RegionId, Region, Distillery, Whisky } from './types';
import { Compass, BookOpen, Sparkles, ArrowRight, Layers } from 'lucide-react';

export function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('speyside');

  // Modals State
  const [activeDistilleryModal, setActiveDistilleryModal] = useState<Distillery | null>(null);
  const [activeWhiskyModal, setActiveWhiskyModal] = useState<Whisky | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRandomDramOpen, setIsRandomDramOpen] = useState(false);

  // Random Dram of the Day State
  const [todayRandomDram, setTodayRandomDram] = useState<Whisky>(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    try {
      const savedDate = localStorage.getItem('scotland_whisky_random_dram_date');
      const savedId = localStorage.getItem('scotland_whisky_random_dram_id');
      if (savedDate === todayStr && savedId) {
        const found = WHISKIES.find(w => w.id === savedId);
        if (found) return found;
      }
    } catch (e) {
      console.error(e);
    }
    // Pick random whisky
    const randIdx = Math.floor(Math.random() * WHISKIES.length);
    const chosen = WHISKIES[randIdx];
    try {
      localStorage.setItem('scotland_whisky_random_dram_date', todayStr);
      localStorage.setItem('scotland_whisky_random_dram_id', chosen.id);
    } catch (e) {
      console.error(e);
    }
    return chosen;
  });

  const [dontShowAgainToday, setDontShowAgainToday] = useState<boolean>(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    try {
      const dismissed = localStorage.getItem('scotland_whisky_random_dram_dismissed_date');
      return dismissed === todayStr;
    } catch {
      return false;
    }
  });

  // Welcome popup trigger: show after 1.5 seconds if on home page and not dismissed today
  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const dismissed = localStorage.getItem('scotland_whisky_random_dram_dismissed_date') === todayStr;
    if (!dismissed && activeTab === 'home') {
      const timer = setTimeout(() => {
        setIsRandomDramOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleToggleDontShowAgain = (val: boolean) => {
    setDontShowAgainToday(val);
    const todayStr = new Date().toISOString().slice(0, 10);
    try {
      if (val) {
        localStorage.setItem('scotland_whisky_random_dram_dismissed_date', todayStr);
      } else {
        localStorage.removeItem('scotland_whisky_random_dram_dismissed_date');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRerollRandomDram = () => {
    const others = WHISKIES.filter(w => w.id !== todayRandomDram.id);
    const next = others[Math.floor(Math.random() * others.length)] || WHISKIES[0];
    setTodayRandomDram(next);
    const todayStr = new Date().toISOString().slice(0, 10);
    try {
      localStorage.setItem('scotland_whisky_random_dram_date', todayStr);
      localStorage.setItem('scotland_whisky_random_dram_id', next.id);
    } catch (e) {
      console.error(e);
    }
  };

  // Compare List State
  const [compareList, setCompareList] = useState<Whisky[]>([
    WHISKIES[0], // Macallan 12 Double Cask
    WHISKIES[6], // Ardbeg Ten
  ]);

  // Saved Cabinet Wishlist State (persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('scotland_whisky_cabinet');
      return saved ? JSON.parse(saved) : ['macallan-double-cask-12', 'ardbeg-ten', 'talisker-10'];
    } catch {
      return ['macallan-double-cask-12', 'ardbeg-ten', 'talisker-10'];
    }
  });

  // Tasting Journal Logs State (persisted in localStorage)
  const [tastingJournal, setTastingJournal] = useState<TastingEntry[]>(() => {
    try {
      const saved = localStorage.getItem('scotland_whisky_journal');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sample-log-1',
          whiskyId: 'macallan-double-cask-12',
          whiskyName: 'The Macallan 12 Year Old Double Cask',
          distilleryName: 'The Macallan',
          rating: 5,
          date: '18 May 2024',
          noseNotes: 'Creamy butterscotch, candied orange peel, warm oak woodspice, vanilla custard.',
          palateNotes: 'Honeyed fruitcake, milk chocolate, ginger warmth, balanced wood tannins.',
          finishNotes: 'Long and lingering with dried raisins and silky oak spice.',
          waterAdded: true,
          overallImpression: 'The quintessential benchmark for sherry-matured Speyside single malt.',
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('scotland_whisky_cabinet', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('scotland_whisky_journal', JSON.stringify(tastingJournal));
    } catch (e) {
      console.error(e);
    }
  }, [tastingJournal]);

  // Wishlist toggle handler
  const handleToggleWishlist = (whisky: Whisky) => {
    setWishlistIds(prev =>
      prev.includes(whisky.id) ? prev.filter(id => id !== whisky.id) : [...prev, whisky.id]
    );
  };

  // Compare handlers
  const handleAddToCompare = (whisky: Whisky) => {
    if (compareList.some(w => w.id === whisky.id)) {
      setCompareList(prev => prev.filter(w => w.id !== whisky.id));
    } else {
      if (compareList.length >= 3) {
        setCompareList(prev => [...prev.slice(1), whisky]);
      } else {
        setCompareList(prev => [...prev, whisky]);
      }
    }
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(w => w.id !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Journal handlers
  const handleAddJournalEntry = (entry: TastingEntry) => {
    setTastingJournal(prev => [entry, ...prev]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setTastingJournal(prev => prev.filter(item => item.id !== id));
  };

  // Direct Navigation Jump Helpers
  const handleSelectRegion = (id: RegionId) => {
    setSelectedRegionId(id);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDistilleryById = (distilleryId: string) => {
    const d = DISTILLERIES.find(dist => dist.id === distilleryId);
    if (d) {
      setActiveWhiskyModal(null);
      setActiveDistilleryModal(d);
    }
  };

  const savedWhiskies = WHISKIES.filter(w => wishlistIds.includes(w.id));

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D] flex flex-col font-sans-body antialiased selection:bg-[#C5A059]/30 selection:text-[#1A3021]">
      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRandomDram={() => setIsRandomDramOpen(true)}
        savedCount={wishlistIds.length}
        compareCount={compareList.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Hero Section */}
            <HeroSection
              setActiveTab={setActiveTab}
              onExploreScotland={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDiscoverWhisky={() => {
                setActiveTab('whiskies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onFindMyWhisky={() => {
                setActiveTab('discover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Explore by Region Section */}
            <RegionCardsSection
              onSelectRegion={handleSelectRegion}
              onExploreAll={() => {
                setActiveTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Distilleries Section */}
            <FeaturedDistilleriesSection
              onSelectDistillery={(d) => setActiveDistilleryModal(d)}
              onExploreAllDistilleries={() => {
                setActiveTab('distilleries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Scotland Whisky Discovery Teaser Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="bg-[#1A3021] rounded-xs p-8 sm:p-12 text-white border border-[#C5A059]/40 relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="px-3.5 py-1 bg-[#C5A059] text-[#1A3021] text-[10px] font-bold uppercase tracking-[0.2em] rounded-xs inline-block">
                    Interactive Single Malt Experience
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif leading-tight">
                    Not Sure Where to Begin Your Single Malt Journey?
                  </h3>
                  <p className="text-sm sm:text-base text-[#FAF9F6]/85 leading-relaxed font-sans-body">
                    Take our 60-second sensory quiz or explore our 2D flavour map to find the perfect Scottish single malts calibrated to your personal palate.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('discover');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08e49] text-[#1A3021] text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#1A3021]" />
                      <span>Take "Find My Whisky" Quiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('flavour-map');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-[#3D4D42] hover:bg-[#2C3830] text-white border border-[#C5A059]/40 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Compass className="w-4 h-4 text-[#C5A059]" />
                      <span>Explore 2D Flavour Map</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'explore' && (
          <ExploreScotlandView
            selectedRegionId={selectedRegionId}
            onSelectRegion={setSelectedRegionId}
            onSelectDistillery={(d) => setActiveDistilleryModal(d)}
            onSelectWhisky={(w) => setActiveWhiskyModal(w)}
          />
        )}

        {activeTab === 'distilleries' && (
          <DistilleriesView
            onSelectDistillery={(d) => setActiveDistilleryModal(d)}
          />
        )}

        {activeTab === 'whiskies' && (
          <WhiskiesView
            onSelectWhisky={(w) => setActiveWhiskyModal(w)}
            onAddToCompare={handleAddToCompare}
            compareList={compareList}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'compare' && (
          <CompareView
            compareList={compareList}
            onRemoveFromCompare={handleRemoveFromCompare}
            onAddWhisky={(w) => setCompareList(prev => prev.some(item => item.id === w.id) ? prev : [...prev, w])}
            onSetCompareList={(list) => setCompareList(list)}
            onSelectWhisky={(w) => setActiveWhiskyModal(w)}
            onClearCompare={handleClearCompare}
          />
        )}

        {activeTab === 'flavour-map' && (
          <FlavourExplorerView
            onSelectWhisky={(w) => setActiveWhiskyModal(w)}
            onAddToCompare={handleAddToCompare}
          />
        )}

        {activeTab === 'casks' && (
          <CaskExplorerView
            onSelectWhisky={(w) => setActiveWhiskyModal(w)}
          />
        )}

        {activeTab === 'discover' && (
          <DiscoverView
            onSelectWhisky={(w) => setActiveWhiskyModal(w)}
            onAddToCompare={handleAddToCompare}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}

        {activeTab === 'learn' && (
          <LearnView />
        )}

        {activeTab === 'cabinet' && (
          <MyWhiskyView
            savedWhiskies={savedWhiskies}
            onRemoveFromSaved={(id) => setWishlistIds(prev => prev.filter(wId => wId !== id))}
            onSelectWhisky={(w) => setActiveWhiskyModal(w)}
            tastingJournal={tastingJournal}
            onAddJournalEntry={handleAddJournalEntry}
            onDeleteJournalEntry={handleDeleteJournalEntry}
          />
        )}
      </main>

      {/* Global Random Dram of the Day Welcome Modal */}
      <RandomDramModal
        isOpen={isRandomDramOpen}
        whisky={todayRandomDram}
        onClose={() => setIsRandomDramOpen(false)}
        onExplore={(w) => {
          setIsRandomDramOpen(false);
          setActiveWhiskyModal(w);
        }}
        onCompare={(w) => {
          setIsRandomDramOpen(false);
          if (!compareList.some(item => item.id === w.id)) {
            setCompareList(prev => [...prev.slice(0, 2), w]);
          }
          setActiveTab('compare');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onReroll={handleRerollRandomDram}
        dontShowAgainToday={dontShowAgainToday}
        onToggleDontShowAgain={handleToggleDontShowAgain}
      />

      {/* Global Modals */}
      <DistilleryDetailModal
        distillery={activeDistilleryModal}
        onClose={() => setActiveDistilleryModal(null)}
        onSelectWhisky={(w) => {
          setActiveDistilleryModal(null);
          setActiveWhiskyModal(w);
        }}
      />

      <WhiskyDetailModal
        whisky={activeWhiskyModal}
        onClose={() => setActiveWhiskyModal(null)}
        onSelectWhisky={(w) => setActiveWhiskyModal(w)}
        onSelectDistillery={handleSelectDistilleryById}
        onAddToCompare={handleAddToCompare}
        isComparing={activeWhiskyModal ? compareList.some(w => w.id === activeWhiskyModal.id) : false}
        isInWishlist={activeWhiskyModal ? wishlistIds.includes(activeWhiskyModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenJournal={(whisky) => {
          setActiveWhiskyModal(null);
          setActiveTab('cabinet');
        }}
      />

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRegion={(id) => {
          setSelectedRegionId(id);
          setActiveTab('explore');
        }}
        onSelectDistillery={handleSelectDistilleryById}
        onSelectWhisky={(w) => setActiveWhiskyModal(w)}
      />

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectRegion={handleSelectRegion}
      />
    </div>
  );
}

export default App;
