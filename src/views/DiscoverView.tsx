import React, { useState } from 'react';
import { WHISKIES, getWhiskyFlavourRatings } from '../data/whiskies';
import { Whisky } from '../types';
import { Sparkles, Compass, CheckCircle2, RotateCcw, ArrowRight, Wine, Flame, Layers, Check, BarChart2, Heart } from 'lucide-react';

interface Props {
  onSelectWhisky: (whisky: Whisky) => void;
  onAddToCompare?: (whisky: Whisky) => void;
  onToggleWishlist?: (whisky: Whisky) => void;
  wishlistIds?: string[];
}

export const DiscoverView: React.FC<Props> = ({
  onSelectWhisky,
  onAddToCompare,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [smokePreference, setSmokePreference] = useState<'None' | 'Light' | 'Medium' | 'Heavy'>('None');
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>(['Fruit', 'Vanilla']);
  const [bodyPreference, setBodyPreference] = useState<'Light' | 'Medium' | 'Rich'>('Medium');
  const [caskPreference, setCaskPreference] = useState<'Bourbon' | 'Sherry' | 'Port' | 'Wine' | 'Rum' | 'No Preference'>('No Preference');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const availableFlavours = [
    { id: 'Fruit', label: 'Fresh & Dried Fruit', icon: '🍎' },
    { id: 'Vanilla', label: 'Vanilla & Custard', icon: '🍦' },
    { id: 'Chocolate', label: 'Dark Chocolate & Cocoa', icon: '🍫' },
    { id: 'Caramel', label: 'Caramel & Toffee', icon: '🍯' },
    { id: 'Spice', label: 'Baking Spice & Cinnamon', icon: '🪵' },
    { id: 'Smoke', label: 'Peat Smoke & Campfire', icon: '🔥' },
    { id: 'Maritime', label: 'Sea Salt & Coastal Brine', icon: '🌊' },
    { id: 'Floral', label: 'Heather & Wildflowers', icon: '🌸' },
    { id: 'Nutty', label: 'Toasted Oak & Walnuts', icon: '🌰' },
  ];

  const handleToggleFlavour = (flavorId: string) => {
    if (selectedFlavours.includes(flavorId)) {
      if (selectedFlavours.length > 1) {
        setSelectedFlavours(prev => prev.filter(f => f !== flavorId));
      }
    } else {
      setSelectedFlavours(prev => [...prev, flavorId]);
    }
  };

  const calculateMatches = () => {
    return WHISKIES.map(w => {
      let score = 40;
      const ratings = getWhiskyFlavourRatings(w);
      const tags = w.flavourTags.map(t => t.toLowerCase()).join(' ');
      const desc = (w.characterSnippet + ' ' + w.tastingNotes.nose + ' ' + w.tastingNotes.palate).toLowerCase();

      // 1. Smoke matching
      if (smokePreference === 'None') {
        if (w.peatLevel === 'Unpeated') score += 35;
        else if (w.peatLevel === 'Lightly Peated') score += 5;
        else score -= 30;
      } else if (smokePreference === 'Light') {
        if (w.peatLevel === 'Lightly Peated' || w.peatLevel === 'Unpeated') score += 30;
        else if (w.peatLevel === 'Medium Peated') score += 15;
        else score -= 10;
      } else if (smokePreference === 'Medium') {
        if (w.peatLevel === 'Medium Peated') score += 35;
        else if (w.peatLevel === 'Lightly Peated' || w.peatLevel === 'Heavily Peated') score += 20;
      } else if (smokePreference === 'Heavy') {
        if (w.peatLevel === 'Heavily Peated') score += 40;
        else if (w.peatLevel === 'Medium Peated') score += 15;
        else score -= 25;
      }

      // 2. Flavours matching
      selectedFlavours.forEach(f => {
        const lower = f.toLowerCase();
        if (lower === 'fruit' && (ratings.fruit >= 6 || tags.includes('fruit') || tags.includes('apple') || tags.includes('citrus'))) score += 10;
        if (lower === 'vanilla' && (ratings.sweetness >= 6 || tags.includes('vanilla') || tags.includes('honey'))) score += 10;
        if (lower === 'chocolate' && (ratings.richness >= 6 || tags.includes('chocolate') || tags.includes('cocoa'))) score += 10;
        if (lower === 'caramel' && (tags.includes('toffee') || tags.includes('caramel') || tags.includes('butterscotch'))) score += 10;
        if (lower === 'spice' && (ratings.spice >= 6 || tags.includes('cinnamon') || tags.includes('spice'))) score += 10;
        if (lower === 'smoke' && (ratings.smoke >= 5 || tags.includes('smoke') || tags.includes('peat'))) score += 10;
        if (lower === 'maritime' && (ratings.maritime >= 5 || tags.includes('brine') || tags.includes('sea salt') || tags.includes('maritime'))) score += 10;
        if (lower === 'floral' && (w.flavourRadar.floralGrass >= 60 || tags.includes('floral') || tags.includes('heather'))) score += 10;
        if (lower === 'nutty' && (tags.includes('nut') || tags.includes('walnut') || tags.includes('almond'))) score += 10;
      });

      // 3. Body style
      if (bodyPreference === 'Light') {
        if (ratings.richness <= 4 || w.flavourRadar.floralGrass > 65) score += 20;
        else if (ratings.richness >= 8) score -= 15;
      } else if (bodyPreference === 'Medium') {
        if (ratings.richness >= 4 && ratings.richness <= 7) score += 20;
      } else if (bodyPreference === 'Rich') {
        if (ratings.richness >= 7 || w.caskType.toLowerCase().includes('sherry')) score += 25;
        else if (ratings.richness <= 4) score -= 15;
      }

      // 4. Cask preference
      if (caskPreference !== 'No Preference') {
        const caskLow = caskPreference.toLowerCase();
        if (w.caskType.toLowerCase().includes(caskLow)) {
          score += 20;
        } else {
          score -= 5;
        }
      }

      const matchPct = Math.min(99, Math.max(62, score));
      return {
        whisky: w,
        matchPct,
        ratings,
      };
    })
    .sort((a, b) => b.matchPct - a.matchPct)
    .slice(0, 3); // Return top 3 recommendations
  };

  const matches = calculateMatches();

  const handleReset = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-12 animate-apple-fade pb-20">
      {/* Header Banner */}
      <div className="pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Palate Matcher</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f]">
          Find My Whisky.
        </h1>
        <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mt-3 font-normal leading-relaxed">
          Answer 4 quick sensory questions to find the top 3 Scottish single malts calibrated to your exact taste preferences.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isSubmitted ? (
          <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-10 shadow-xs space-y-8">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#1d1d1f] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {currentStep}
                </span>
                <span className="text-xs font-semibold text-[#0071e3]">
                  Question {currentStep} of 4
                </span>
              </div>
              <span className="text-xs text-[#86868b] font-medium">
                {currentStep === 1 ? 'Smoke & Peat' : currentStep === 2 ? 'Flavour Profiles' : currentStep === 3 ? 'Body & Texture' : 'Oak Cask Type'}
              </span>
            </div>

            {/* Question 1: How much smoke do you like? */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-apple-fade">
                <div>
                  <span className="text-xs font-semibold text-[#0071e3] block">Question 1</span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mt-1">
                    How much smoke do you like in your whisky?
                  </h3>
                  <p className="text-sm text-[#86868b] mt-1">
                    Scottish peat smoke can range from gentle honeyed warmth to intense coastal campfire and iodine.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'None', title: 'None (Unpeated)', desc: 'Zero smoke. Pure barley, fresh orchard fruit, honey, and clean oak maturation.', icon: '🌿' },
                    { id: 'Light', title: 'Light Smoke', desc: 'A subtle whisper of aromatic smoke and gentle coastal warmth balanced with fruit.', icon: '🍃' },
                    { id: 'Medium', title: 'Medium Smoke', desc: 'Noticeable heather peat, maritime sea salt, and cured woodsmoke.', icon: '🪵' },
                    { id: 'Heavy', title: 'Heavy Smoke (Peat Monster)', desc: 'Bold bonfire smoke, peat embers, medicinal brine, tar, and robust intensity.', icon: '🔥' },
                  ].map((opt) => {
                    const isSelected = smokePreference === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSmokePreference(opt.id as any)}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex gap-3.5 items-start ${
                          isSelected
                            ? 'bg-white text-[#1d1d1f] border-[#0071e3] shadow-md ring-2 ring-[#0071e3]/30'
                            : 'bg-white text-[#1d1d1f] hover:bg-[#fafafc] border-black/[0.06] shadow-2xs'
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-[#1d1d1f]">
                              {opt.title}
                            </h4>
                            {isSelected && <Check className="w-4 h-4 text-[#0071e3]" />}
                          </div>
                          <p className="text-xs text-[#86868b] mt-1 leading-relaxed">
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 2: Which flavours do you prefer? */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-apple-fade">
                <div>
                  <span className="text-xs font-semibold text-[#0071e3] block">Question 2</span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mt-1">
                    Which flavours do you prefer?
                  </h3>
                  <p className="text-sm text-[#86868b] mt-1">
                    Select your favorite tasting notes (choose 1 or more that appeal to your palate).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {availableFlavours.map((item) => {
                    const isSelected = selectedFlavours.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleFlavour(item.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white text-[#1d1d1f] border-[#0071e3] shadow-md ring-2 ring-[#0071e3]/30'
                            : 'bg-white text-[#1d1d1f] hover:bg-[#fafafc] border-black/[0.06] shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-xs font-semibold text-[#1d1d1f]">
                            {item.label}
                          </span>
                        </div>
                        {isSelected ? (
                          <Check className="w-4 h-4 text-[#0071e3] shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-black/[0.15] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 3: Body & Texture Preference */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-apple-fade">
                <div>
                  <span className="text-xs font-semibold text-[#0071e3] block">Question 3</span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mt-1">
                    Do you prefer your whisky Light, Medium, or Rich?
                  </h3>
                  <p className="text-sm text-[#86868b] mt-1">
                    This determines spirit weight, oiliness, and mouthfeel density.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'Light', title: 'Light & Crisp', desc: 'Delicate mouthfeel, floral notes, crisp green apples, grassy, and refreshing.', icon: '🍃' },
                    { id: 'Medium', title: 'Balanced Medium', desc: 'Harmonious fruit and oak, honeyed malt, vanilla, and gentle rounded spices.', icon: '⚖️' },
                    { id: 'Rich', title: 'Deep & Rich', desc: 'Heavy, oily, mouth-coating viscosity, dark fruits, chocolate, and opulent sherry oak.', icon: '🍇' },
                  ].map((opt) => {
                    const isSelected = bodyPreference === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBodyPreference(opt.id as any)}
                        className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white text-[#1d1d1f] border-[#0071e3] shadow-md ring-2 ring-[#0071e3]/30'
                            : 'bg-white text-[#1d1d1f] hover:bg-[#fafafc] border-black/[0.06] shadow-2xs'
                        }`}
                      >
                        <div className="space-y-2">
                          <span className="text-2xl">{opt.icon}</span>
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-bold text-[#1d1d1f]">
                              {opt.title}
                            </h4>
                            {isSelected && <Check className="w-4 h-4 text-[#0071e3]" />}
                          </div>
                          <p className="text-xs text-[#86868b] leading-relaxed">
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 4: Preferred Cask Maturation */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-apple-fade">
                <div>
                  <span className="text-xs font-semibold text-[#0071e3] block">Question 4</span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mt-1">
                    Preferred Cask Maturation:
                  </h3>
                  <p className="text-sm text-[#86868b] mt-1">
                    The type of oak cask that imparts the dominant character and color.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'Bourbon', title: 'Ex-Bourbon Barrel', desc: 'Vanilla, coconut, bright honey, crème brûlée' },
                    { id: 'Sherry', title: 'Sherry Cask (Oloroso / PX)', desc: 'Dried raisins, Christmas cake, dark chocolate' },
                    { id: 'Port', title: 'Port Cask', desc: 'Ruby berries, red plums, dark cherries, spice' },
                    { id: 'Wine', title: 'Wine / Sauternes Cask', desc: 'Stone fruit, apricot jam, gentle French oak' },
                    { id: 'Rum', title: 'Caribbean Rum Cask', desc: 'Tropical pineapple, banana, demerara sugar' },
                    { id: 'No Preference', title: 'No Preference', desc: 'Surprise me with any expert cask profile' },
                  ].map((opt) => {
                    const isSelected = caskPreference === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCaskPreference(opt.id as any)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white text-[#1d1d1f] border-[#0071e3] shadow-md ring-2 ring-[#0071e3]/30'
                            : 'bg-white text-[#1d1d1f] hover:bg-[#fafafc] border-black/[0.06] shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#1d1d1f]">
                            {opt.title}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#0071e3]" />}
                        </div>
                        <span className="text-[11px] text-[#86868b] leading-relaxed">
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-black/[0.06]">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-5 py-2.5 bg-white border border-black/[0.08] hover:bg-black/[0.04] text-[#1d1d1f] rounded-full text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="px-7 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal My 3 Matched Whiskies</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Recommendation Results Screen */
          <div className="space-y-8 animate-apple-fade">
            <div className="bg-[#f5f5f7] rounded-3xl border border-black/[0.04] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-white text-[#0071e3] text-xs font-semibold rounded-full inline-block mb-2 shadow-2xs border border-black/[0.04]">
                  Taste Profile Calibrated
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
                  Your 3 Personalized Single Malts.
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] mt-1">
                  Based on: {smokePreference} Smoke • {bodyPreference} Body • {selectedFlavours.join(', ')} • {caskPreference} Cask
                </p>
              </div>

              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-white hover:bg-black/[0.04] text-[#1d1d1f] border border-black/[0.08] text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Retake Quiz</span>
              </button>
            </div>

            {/* Top 3 Matching Whisky Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matches.map(({ whisky, matchPct, ratings }, idx) => (
                <div
                  key={whisky.id}
                  className="bg-white rounded-3xl border border-black/[0.06] apple-card-hover p-6 shadow-2xs flex flex-col justify-between relative group"
                >
                  {/* Match Rank & Percentage Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-[#1d1d1f] text-white text-[11px] font-semibold rounded-full">
                      #{idx + 1} Best Match
                    </span>
                    <span className="text-xs font-bold text-[#0071e3] bg-[#0071e3]/10 px-3 py-1 rounded-full">
                      {matchPct}% Match
                    </span>
                  </div>

                  {/* Bottle Image */}
                  <div
                    onClick={() => onSelectWhisky(whisky)}
                    className="w-full h-48 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] p-3 flex items-center justify-center cursor-pointer group-hover:bg-[#f0f0f2] transition-colors mb-4"
                  >
                    <img
                      src={whisky.bottleImage}
                      alt={whisky.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-2 flex-1">
                    <span className="text-xs font-semibold text-[#0071e3] block">
                      {whisky.regionName} • {whisky.distilleryName}
                    </span>
                    <h4
                      onClick={() => onSelectWhisky(whisky)}
                      className="text-lg font-bold text-[#1d1d1f] hover:text-[#0071e3] cursor-pointer transition-colors leading-tight"
                    >
                      {whisky.name}
                    </h4>
                    <p className="text-xs text-[#86868b] line-clamp-2 italic">
                      "{whisky.characterSnippet}"
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                        {whisky.ageStatement}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                        {whisky.abv}% ABV
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#1d1d1f] text-white text-xs font-medium rounded-full">
                        {whisky.peatLevel}
                      </span>
                    </div>

                    {/* Flavour tags */}
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {whisky.flavourTags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-[10px] font-medium rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-4 border-t border-black/[0.06] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectWhisky(whisky)}
                      className="flex-1 px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Explore Bottle</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {onAddToCompare && (
                      <button
                        onClick={() => onAddToCompare(whisky)}
                        title="Add to Compare"
                        aria-label="Add to comparison matrix"
                        className="p-2.5 border border-black/[0.08] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-full transition-colors cursor-pointer"
                      >
                        <BarChart2 className="w-4 h-4 text-[#0071e3]" />
                      </button>
                    )}

                    {onToggleWishlist && (
                      <button
                        onClick={() => onToggleWishlist(whisky)}
                        title={wishlistIds.includes(whisky.id) ? 'Saved in Cabinet' : 'Save to Cabinet'}
                        aria-label="Toggle cabinet bookmark"
                        className={`p-2.5 border rounded-full transition-colors cursor-pointer ${
                          wishlistIds.includes(whisky.id)
                            ? 'bg-[#ff3b30] text-white border-[#ff3b30]'
                            : 'border-black/[0.08] hover:border-[#ff3b30] text-black/40 hover:text-[#ff3b30]'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
