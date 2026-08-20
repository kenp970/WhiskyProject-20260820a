import React, { useState } from 'react';
import {
  PRODUCTION_STAGES,
  CASK_TYPES,
  TASTING_RITUAL,
  PEAT_EDUCATION,
  AGE_STATEMENTS_GUIDE,
  SCOTCH_REGULATIONS,
  GLOSSARY
} from '../data/learn';
import { REGIONS } from '../data/regions';
import {
  BookOpen,
  Droplets,
  Sparkles,
  Layers,
  ShieldCheck,
  Wine,
  Flame,
  ChevronRight,
  Check,
  HelpCircle,
  Clock,
  Compass,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type LearnTabId =
  | 'what-is-single-malt'
  | 'regions'
  | 'production'
  | 'peat'
  | 'casks'
  | 'age-statements'
  | 'tasting'
  | 'glossary';

export const LearnView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LearnTabId>('what-is-single-malt');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('speyside');

  const tabs: { id: LearnTabId; label: string; icon: any }[] = [
    { id: 'what-is-single-malt', label: '1. What is Single Malt?', icon: ShieldCheck },
    { id: 'regions', label: '2. Scotch Whisky Regions', icon: Compass },
    { id: 'production', label: '3. How Whisky is Made', icon: Flame },
    { id: 'peat', label: '4. What is Peat?', icon: Droplets },
    { id: 'casks', label: '5. Whisky Casks & Wood', icon: Layers },
    { id: 'age-statements', label: '6. Age Statements & NAS', icon: Clock },
    { id: 'tasting', label: "7. How to Taste (The 5 S's)", icon: Wine },
    { id: 'glossary', label: '8. Whisky Glossary (A–Z)', icon: BookOpen },
  ];

  const filteredGlossary = GLOSSARY.filter(item =>
    item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    item.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    item.category?.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-apple-fade pb-20">
      {/* Header Banner */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Single Malt Academy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          Learn Scotch Whisky.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          A definitive, beginner-friendly guide to understanding, appreciating, and mastering Scottish single malt whisky.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs - Apple Segmented Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1d1d1f] text-white shadow-xs'
                    : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#86868b]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: What is Single Malt? */}
        {activeSection === 'what-is-single-malt' && (
          <div className="space-y-8 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="px-3 py-1 bg-white text-[#0071e3] text-xs font-semibold rounded-full inline-block mb-2 shadow-2xs border border-black/[0.04]">
                  Scotch Whisky Regulations 2009
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                  What is Single Malt Scotch Whisky?
                </h2>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.06] text-[#1d1d1f] text-lg sm:text-xl font-normal italic leading-relaxed shadow-2xs">
                "A Scotch Whisky produced in batches at a single distillery from water and 100% malted barley without the addition of any other cereals, batch-distilled in copper pot stills, and matured in oak casks in Scotland for at least 3 years."
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-6 bg-white border border-black/[0.06] rounded-2xl space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-[#0071e3] block">1. "Single"</span>
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    Means the whisky comes exclusively from <strong className="text-[#1d1d1f] font-semibold">one single distillery</strong>. It is not blended with whiskies from any other distilleries.
                  </p>
                </div>

                <div className="p-6 bg-white border border-black/[0.06] rounded-2xl space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-[#0071e3] block">2. "Malt"</span>
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    Made strictly from <strong className="text-[#1d1d1f] font-semibold">100% malted barley</strong> (no wheat, corn, or rye). Barley is steeped and sprouted to unlock natural sugars.
                  </p>
                </div>

                <div className="p-6 bg-white border border-black/[0.06] rounded-2xl space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-[#0071e3] block">3. "Scotch"</span>
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    Must be mashed, fermented, distilled, and aged in oak casks (under 700L) entirely within <strong className="text-[#1d1d1f] font-semibold">Scotland</strong> for at least 3 years.
                  </p>
                </div>
              </div>

              {/* Legal Requirements List */}
              <div className="pt-6 border-t border-black/[0.06] space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  The 6 Cardinal Laws of Scotch Whisky
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SCOTCH_REGULATIONS.map((reg, idx) => (
                    <div key={idx} className="p-5 bg-white border border-black/[0.06] rounded-2xl flex gap-3.5 items-start shadow-2xs">
                      <div className="w-7 h-7 rounded-full bg-[#1d1d1f] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1d1d1f]">{reg.title}</h4>
                        <p className="text-xs text-[#86868b] mt-1 leading-relaxed">{reg.requirement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Scotch Whisky Regions */}
        {activeSection === 'regions' && (
          <div className="space-y-8 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#0071e3] block mb-1">
                  Geographic Terroir
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                  The 6 Scotch Whisky Regions
                </h2>
                <p className="text-sm text-[#86868b] mt-1">
                  Scotland's diverse climate, water sources, and historical traditions create distinct regional flavor personalities.
                </p>
              </div>

              {/* Region Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegionId(r.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedRegionId === r.id
                        ? 'bg-[#0071e3] text-white shadow-xs'
                        : 'bg-white text-[#1d1d1f] hover:bg-[#e8e8ed] border border-black/[0.06]'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>

              {/* Selected Region Detailed Card */}
              {(() => {
                const reg = REGIONS.find(r => r.id === selectedRegionId) || REGIONS[0];
                return (
                  <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 space-y-5 shadow-2xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-black/[0.06] pb-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">{reg.name}</h3>
                        <p className="text-xs text-[#0071e3] font-semibold mt-0.5">{reg.tagline}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#1d1d1f] text-white text-xs font-semibold rounded-full">
                        {reg.distilleriesCount}+ Active Distilleries
                      </span>
                    </div>

                    <p className="text-sm text-[#86868b] leading-relaxed">
                      {reg.fullDescription}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-[#f5f5f7] p-5 rounded-2xl border border-black/[0.04]">
                        <span className="text-xs font-bold text-[#0071e3] block mb-2">
                          Signature Flavour Profile
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {reg.typicalFlavours.map(f => (
                            <span key={f} className="px-2.5 py-1 bg-white border border-black/[0.04] text-[#1d1d1f] text-xs font-medium rounded-full shadow-2xs">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#f5f5f7] p-5 rounded-2xl border border-black/[0.04]">
                        <span className="text-xs font-bold text-[#0071e3] block mb-2">
                          Terroir & Environment
                        </span>
                        <p className="text-xs text-[#86868b] leading-relaxed">
                          {reg.terroir.climate} • {reg.terroir.waterSource}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Tab 3: How Whisky is Made */}
        {activeSection === 'production' && (
          <div className="space-y-8 animate-apple-fade">
            {/* Stage Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {PRODUCTION_STAGES.map((stg, idx) => (
                <button
                  key={stg.step}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedStageIndex === idx
                      ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-sm'
                      : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] border-transparent'
                  }`}
                >
                  <span className={`text-[11px] font-semibold block ${selectedStageIndex === idx ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                    Stage {stg.step}
                  </span>
                  <span className={`text-sm font-bold block mt-0.5 ${selectedStageIndex === idx ? 'text-white' : 'text-[#1d1d1f]'}`}>
                    {stg.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Stage Detail Card */}
            {(() => {
              const stage = PRODUCTION_STAGES[selectedStageIndex];
              return (
                <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-5 h-64 lg:h-auto bg-[#1d1d1f] relative">
                    <img
                      src={stage.image}
                      alt={stage.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                        Step {stage.step} of 5 • {stage.duration}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold mt-2">{stage.name}</h3>
                      {stage.gaelicName && (
                        <p className="text-xs text-white/80 italic mt-0.5">Gaelic: {stage.gaelicName}</p>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                    <div>
                      <span className="text-xs font-bold text-[#0071e3] block mb-1">
                        Key Purpose & Science
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold text-[#1d1d1f]">{stage.tagline}</h4>
                      <p className="text-sm text-[#86868b] mt-2 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-black/[0.06]">
                      <span className="text-xs font-bold text-[#1d1d1f] block">
                        Craft Essentials & Highlights:
                      </span>
                      <ul className="space-y-2">
                        {stage.details.map((detail, idx) => (
                          <li key={idx} className="text-xs text-[#86868b] flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Tab 4: What is Peat? */}
        {activeSection === 'peat' && (
          <div className="space-y-8 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="px-3 py-1 bg-white text-[#0071e3] text-xs font-semibold rounded-full inline-block mb-2 shadow-2xs border border-black/[0.04]">
                  Phenols & Terroir
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                  {PEAT_EDUCATION.title}
                </h2>
                <p className="text-sm text-[#86868b] mt-1">
                  {PEAT_EDUCATION.subtitle}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-black/[0.06] text-sm text-[#1d1d1f] leading-relaxed shadow-2xs">
                {PEAT_EDUCATION.summary}
              </div>

              {/* Peat Spectrum Bar */}
              <div className="bg-white p-6 rounded-2xl border border-black/[0.06] space-y-3 shadow-2xs">
                <span className="text-xs font-bold text-[#1d1d1f] block">
                  The Peat Smoke PPM Spectrum:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl">
                    <span className="text-xs font-bold text-emerald-700 block">0 PPM (Unpeated)</span>
                    <span className="text-xs font-bold text-[#1d1d1f] block mt-0.5">Glengoyne, Glenfiddich</span>
                    <span className="text-xs text-[#86868b] block mt-1">Clean hot air dried, pure barley sweetness.</span>
                  </div>

                  <div className="p-4 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl">
                    <span className="text-xs font-bold text-amber-700 block">5 - 15 PPM (Lightly Peated)</span>
                    <span className="text-xs font-bold text-[#1d1d1f] block mt-0.5">Highland Park, Benromach</span>
                    <span className="text-xs text-[#86868b] block mt-1">A gentle aromatic floral smoke backdrop.</span>
                  </div>

                  <div className="p-4 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl">
                    <span className="text-xs font-bold text-orange-700 block">20 - 35 PPM (Medium Peated)</span>
                    <span className="text-xs font-bold text-[#1d1d1f] block mt-0.5">Talisker, Bowmore, Oban</span>
                    <span className="text-xs text-[#86868b] block mt-1">Pronounced bonfire smoke & sea salt brine.</span>
                  </div>

                  <div className="p-4 bg-[#f5f5f7] border border-black/[0.04] rounded-2xl">
                    <span className="text-xs font-bold text-red-700 block">45 - 55+ PPM (Heavily Peated)</span>
                    <span className="text-xs font-bold text-[#1d1d1f] block mt-0.5">Ardbeg, Laphroaig, Port Charlotte</span>
                    <span className="text-xs text-[#86868b] block mt-1">Medicinal iodine, campfire ash, tar & cured bacon.</span>
                  </div>
                </div>
              </div>

              {/* Key Facts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {PEAT_EDUCATION.keyFacts.map((fact, idx) => (
                  <div key={idx} className="p-5 bg-white border border-black/[0.06] rounded-2xl space-y-1.5 shadow-2xs">
                    <h4 className="text-sm font-bold text-[#1d1d1f]">{fact.title}</h4>
                    <p className="text-xs text-[#86868b] leading-relaxed">{fact.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Whisky Casks & Wood */}
        {activeSection === 'casks' && (
          <div className="space-y-8 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#0071e3] block mb-1">
                  Oak Chemistry & Maturation
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                  Whisky Casks & The Science of Wood
                </h2>
                <p className="text-sm text-[#86868b] mt-1">
                  Oak wood delivers vanillin, tannins, lactones, and natural colour during years of quiet breathing in Scottish dunnage warehouses.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CASK_TYPES.map((cask) => (
                  <div key={cask.id} className="bg-white p-6 rounded-2xl border border-black/[0.06] space-y-3 shadow-2xs apple-card-hover">
                    <span className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-semibold rounded-full">
                      {cask.caskCategory} • {cask.capacityLitres}
                    </span>
                    <h3 className="text-base font-bold text-[#1d1d1f]">{cask.name}</h3>
                    <p className="text-xs text-[#86868b] leading-relaxed line-clamp-3">
                      {cask.description}
                    </p>
                    <div className="pt-2 border-t border-black/[0.06]">
                      <span className="text-xs font-bold text-[#0071e3] block mb-1.5">
                        Key Flavours:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cask.flavourContribution.slice(0, 4).map(f => (
                          <span key={f} className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-[10px] font-medium rounded-full">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Age Statements & NAS */}
        {activeSection === 'age-statements' && (
          <div className="space-y-8 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="px-3 py-1 bg-white text-[#0071e3] text-xs font-semibold rounded-full inline-block mb-2 shadow-2xs border border-black/[0.04]">
                  Label Regulations & Philosophy
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                  {AGE_STATEMENTS_GUIDE.title}
                </h2>
                <p className="text-sm text-[#86868b] mt-1">
                  {AGE_STATEMENTS_GUIDE.subtitle}
                </p>
              </div>

              {/* The Youngest Drop Law Card */}
              <div className="p-6 sm:p-8 bg-[#1d1d1f] text-white rounded-2xl space-y-2 shadow-sm">
                <span className="text-xs font-semibold text-[#0071e3] block">
                  The Golden Rule of Scottish Law
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white">The Law of the Youngest Drop</h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  {AGE_STATEMENTS_GUIDE.lawOfYoungestDrop}
                </p>
              </div>

              {/* Myths vs Facts Grid */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  Common Scotch Age Myths vs Reality
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AGE_STATEMENTS_GUIDE.mythsAndFacts.map((mf, idx) => (
                    <div key={idx} className="p-5 bg-white border border-black/[0.06] rounded-2xl space-y-2 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#ff3b30]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>MYTH: "{mf.myth}"</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-xs text-[#86868b]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] shrink-0 mt-0.5" />
                        <span><strong className="text-[#1d1d1f]">FACT:</strong> {mf.fact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: How to Taste (The 5 S's) */}
        {activeSection === 'tasting' && (
          <div className="space-y-8 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#0071e3] block mb-1">
                  Sensory Masterclass
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                  How to Taste Single Malt (The 5 S's Ritual)
                </h2>
                <p className="text-sm text-[#86868b] mt-1">
                  Unlock the layered aromas and subtle finish of fine Scotch like a master blender.
                </p>
              </div>

              <div className="space-y-4">
                {TASTING_RITUAL.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white rounded-2xl border border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="space-y-1 md:max-w-md">
                      <span className="text-base font-bold text-[#1d1d1f] block">
                        {step.step}
                      </span>
                      <p className="text-xs text-[#0071e3] font-semibold">
                        {step.action}
                      </p>
                    </div>
                    <div className="md:max-w-lg bg-[#f5f5f7] p-4 rounded-xl text-xs text-[#86868b] leading-relaxed">
                      {step.tip}
                    </div>
                  </div>
                ))}
              </div>

              {/* Water & Glassware Tip */}
              <div className="p-5 bg-white border border-black/[0.06] rounded-2xl flex gap-3.5 items-start shadow-2xs">
                <Wine className="w-5 h-5 text-[#0071e3] shrink-0 mt-0.5" />
                <div className="text-xs text-[#86868b] leading-relaxed">
                  <strong className="text-[#1d1d1f]">The Water Drop Effect:</strong> High alcohol strength can numb the tastebuds. Adding just 2–3 drops of room-temperature spring water breaks the liquid's surface tension, releasing volatile aromatic molecules (guaiacol) that instantly amplify sweetness, floral esters, and fruit notes.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Whisky Glossary */}
        {activeSection === 'glossary' && (
          <div className="space-y-6 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/[0.06] pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#0071e3] block mb-1">
                    Distillery Terms A–Z
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                    Whisky Glossary ({GLOSSARY.length} Terms)
                  </h2>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Search terms (e.g. PPM, Angels)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/[0.08] rounded-full text-xs text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3] shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGlossary.map((item) => (
                  <div
                    key={item.term}
                    className="p-5 bg-white border border-black/[0.06] rounded-2xl space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#1d1d1f]">
                        {item.term}
                      </h4>
                      {item.category && (
                        <span className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-[10px] font-semibold rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#86868b] leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
