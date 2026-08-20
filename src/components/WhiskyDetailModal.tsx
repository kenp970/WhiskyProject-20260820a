import React from 'react';
import { Whisky } from '../types';
import { WHISKIES, getWhiskyFlavourRatings } from '../data/whiskies';
import { FlavourRadarChart } from './FlavourRadarChart';
import { WhiskyBottleArt } from './WhiskyBottleArt';
import { X, Droplets, Award, Compass, Heart, BookOpen, Layers, BarChart2, Check, Sparkles, Flame, Shield, ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';

interface Props {
  whisky: Whisky | null;
  onClose: () => void;
  onSelectDistillery?: (distilleryId: string) => void;
  onSelectWhisky?: (whisky: Whisky) => void;
  onAddToCompare?: (whisky: Whisky) => void;
  isComparing?: boolean;
  isInWishlist?: boolean;
  onToggleWishlist?: (whisky: Whisky) => void;
  onOpenJournal?: (whisky: Whisky) => void;
}

export const WhiskyDetailModal: React.FC<Props> = ({
  whisky,
  onClose,
  onSelectDistillery,
  onSelectWhisky,
  onAddToCompare,
  isComparing = false,
  isInWishlist = false,
  onToggleWishlist,
  onOpenJournal,
}) => {
  if (!whisky) return null;

  const ratings = getWhiskyFlavourRatings(whisky);

  // Find similar whiskies based on region or flavour style
  const similarWhiskies = WHISKIES.filter(w =>
    w.id !== whisky.id &&
    (w.regionId === whisky.regionId || w.peatLevel === whisky.peatLevel)
  ).slice(0, 3);

  const ratingItems = [
    { label: 'Smoke', score: ratings.smoke, icon: '🔥' },
    { label: 'Sweetness', score: ratings.sweetness, icon: '🍯' },
    { label: 'Fruit', score: ratings.fruit, icon: '🍎' },
    { label: 'Spice', score: ratings.spice, icon: '🌶️' },
    { label: 'Oak', score: ratings.oak, icon: '🪵' },
    { label: 'Richness', score: ratings.richness, icon: '🍫' },
    { label: 'Maritime', score: ratings.maritime, icon: '🌊' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-apple-fade">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Top Header Bar with Close Button */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-black/[0.06] bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold rounded-full">
              {whisky.regionName}
            </span>
            <span className="text-xs text-[#86868b] font-medium">Single Malt Scotch Whisky</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {/* Main Showcase: Large Bottle Image + Title & Key Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Large Bottle Image Display */}
            <div className="md:col-span-5 bg-[#f5f5f7] p-8 rounded-3xl border border-black/[0.02] flex flex-col items-center justify-center relative shadow-2xs">
              <div className="w-full h-64 sm:h-72 flex items-center justify-center">
                <WhiskyBottleArt
                  whisky={whisky}
                  size="xl"
                  className="h-64 sm:h-72"
                />
              </div>
              <div className="mt-4 pt-3 border-t border-black/[0.06] w-full flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1d1d1f]">{whisky.ageStatement}</span>
                <span className="font-bold text-[#0071e3]">{whisky.abv}% ABV</span>
                <span className="px-2.5 py-0.5 bg-white text-[#1d1d1f] font-medium border border-black/[0.06] rounded-full shadow-2xs">
                  {whisky.peatLevel}
                </span>
              </div>
            </div>

            {/* Title, Distillery Link, Actions & Essence */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs text-[#0071e3] font-semibold">
                    {whisky.regionName} Single Malt
                  </span>
                  {whisky.peatPpmApprox !== undefined && whisky.peatPpmApprox > 0 && (
                    <span className="text-xs text-[#86868b] font-medium">
                      • ~{whisky.peatPpmApprox} PPM Peat
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
                  {whisky.name}
                </h2>

                {/* Distillery Link */}
                <button
                  onClick={() => {
                    if (onSelectDistillery) {
                      onSelectDistillery(whisky.distilleryId);
                    }
                  }}
                  className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 mt-1 cursor-pointer group"
                >
                  <span>Distillery: {whisky.distilleryName}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Character Snippet */}
              <p className="text-sm text-[#1d1d1f] leading-relaxed bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.03]">
                "{whisky.characterSnippet}"
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {onToggleWishlist && (
                  <button
                    onClick={() => onToggleWishlist(whisky)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      isInWishlist
                        ? 'bg-[#ff3b30] text-white shadow-xs'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] border border-black/[0.04]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current' : ''}`} />
                    {isInWishlist ? 'In Cabinet' : 'Save to Cabinet'}
                  </button>
                )}

                {onAddToCompare && (
                  <button
                    onClick={() => onAddToCompare(whisky)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      isComparing
                        ? 'bg-[#0071e3] text-white shadow-xs'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] border border-black/[0.04]'
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    {isComparing ? 'In Compare Studio' : 'Add to Compare'}
                  </button>
                )}

                {onOpenJournal && (
                  <button
                    onClick={() => onOpenJournal(whisky)}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] border border-black/[0.04] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0071e3]" /> Log Tasting
                  </button>
                )}
              </div>

              {/* Cask Information Box */}
              <div className="bg-[#f5f5f7] rounded-2xl p-4 border border-black/[0.04] space-y-0.5">
                <span className="text-[11px] font-semibold text-[#86868b] flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#0071e3]" /> Cask Maturation
                </span>
                <p className="text-sm font-medium text-[#1d1d1f]">
                  {whisky.caskType}
                </p>
              </div>
            </div>
          </div>

          {/* Flavour Ratings (0–10) Section */}
          <div className="bg-[#f5f5f7] p-6 sm:p-7 rounded-3xl border border-black/[0.04] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] pb-3">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-[#1d1d1f]">Flavour Ratings (0–10 Scale)</h3>
                <p className="text-xs text-[#86868b]">
                  Sensory intensity benchmarks assessed across key Scottish flavour dimensions.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-white border border-black/[0.06] rounded-full text-[#0071e3] shadow-2xs">
                Palate DNA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
              {ratingItems.map(item => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1d1d1f] flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    <span className="font-bold text-[#0071e3] text-sm">
                      {item.score}<span className="text-[11px] text-[#86868b] font-normal">/10</span>
                    </span>
                  </div>
                  {/* Progress Bar (0 to 10) */}
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-black/[0.04]">
                    <div
                      className="h-full bg-[#0071e3] rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasting Notes Sections (Nose, Palate, Finish) */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-tight text-[#1d1d1f]">Official Tasting Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nose */}
              <div className="bg-[#f5f5f7] p-5 rounded-2xl border border-black/[0.04] space-y-2">
                <span className="text-xs font-semibold text-[#0071e3] block">
                  👃 The Nose
                </span>
                <p className="text-xs text-[#1d1d1f] leading-relaxed">
                  {whisky.tastingNotes.nose}
                </p>
              </div>

              {/* Palate */}
              <div className="bg-[#f5f5f7] p-5 rounded-2xl border border-black/[0.04] space-y-2">
                <span className="text-xs font-semibold text-[#0071e3] block">
                  👅 The Palate
                </span>
                <p className="text-xs text-[#1d1d1f] leading-relaxed">
                  {whisky.tastingNotes.palate}
                </p>
              </div>

              {/* Finish */}
              <div className="bg-[#f5f5f7] p-5 rounded-2xl border border-black/[0.04] space-y-2">
                <span className="text-xs font-semibold text-[#1d1d1f] block">
                  ✨ The Finish
                </span>
                <p className="text-xs text-[#1d1d1f] leading-relaxed">
                  {whisky.tastingNotes.finish}
                </p>
              </div>
            </div>

            {/* Master Distiller's Water Drop Tip */}
            <div className="p-4 bg-[#0071e3]/5 border border-[#0071e3]/15 rounded-2xl flex items-start gap-3 text-xs text-[#1d1d1f]">
              <Droplets className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#0071e3] text-xs block mb-0.5">
                  Sommelier’s Water Guidance
                </span>
                <span className="text-[#1d1d1f]/85 leading-relaxed">
                  {whisky.tastingNotes.waterDropTip}
                </span>
              </div>
            </div>
          </div>

          {/* Flavour Radar Chart & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-[#f5f5f7] p-6 sm:p-7 rounded-3xl border border-black/[0.04]">
            <div className="sm:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#86868b] block mb-2">
                  Signature Flavour Descriptors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {whisky.flavourTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white border border-black/[0.04] text-xs font-medium text-[#1d1d1f] rounded-full shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {whisky.awards && whisky.awards.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-[#0071e3] block mb-1.5 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#0071e3]" /> Critical Acclaim & Awards
                  </span>
                  <ul className="space-y-1 text-xs text-[#1d1d1f]/80">
                    {whisky.awards.map((award, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-black/[0.04] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#86868b] mb-2">
                Flavour Radar Profile
              </span>
              <FlavourRadarChart radar={whisky.flavourRadar} size={180} color="#0071e3" />
            </div>
          </div>

          {/* Similar Whiskies Section */}
          {similarWhiskies.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold tracking-tight text-[#1d1d1f]">Similar Whiskies to Explore</h3>
                <span className="text-xs text-[#86868b]">Matching region or peat character</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarWhiskies.map(similar => (
                  <div
                    key={similar.id}
                    onClick={() => {
                      if (onSelectWhisky) {
                        onSelectWhisky(similar);
                      }
                    }}
                    className="bg-white p-4 rounded-2xl border border-black/[0.06] hover:border-[#0071e3] apple-card-hover cursor-pointer transition-all flex items-center gap-3.5 group shadow-2xs"
                  >
                    <div className="w-12 h-14 bg-[#f5f5f7] rounded-xl p-1 flex items-center justify-center shrink-0">
                      <WhiskyBottleArt
                        whisky={similar}
                        size="sm"
                        className="w-10 h-12"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-semibold text-[#0071e3] block truncate">
                        {similar.regionName}
                      </span>
                      <h4 className="text-xs font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors truncate">
                        {similar.name}
                      </h4>
                      <p className="text-[11px] text-[#86868b]">
                        {similar.ageStatement} • {similar.peatLevel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

