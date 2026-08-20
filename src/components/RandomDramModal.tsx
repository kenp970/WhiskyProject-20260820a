import React, { useState } from 'react';
import { Whisky } from '../types';
import { getWhiskyFlavourRatings } from '../data/whiskies';
import { WhiskyBottleArt } from './WhiskyBottleArt';
import { Sparkles, Wine, Flame, Layers, ArrowRight, BarChart2, X, RefreshCw, Check, MapPin, Compass } from 'lucide-react';

interface Props {
  isOpen: boolean;
  whisky: Whisky | null;
  onClose: () => void;
  onExplore: (whisky: Whisky) => void;
  onCompare: (whisky: Whisky) => void;
  onReroll: () => void;
  dontShowAgainToday: boolean;
  onToggleDontShowAgain: (val: boolean) => void;
}

export const RandomDramModal: React.FC<Props> = ({
  isOpen,
  whisky,
  onClose,
  onExplore,
  onCompare,
  onReroll,
  dontShowAgainToday,
  onToggleDontShowAgain,
}) => {
  if (!isOpen || !whisky) return null;

  const ratings = getWhiskyFlavourRatings(whisky);

  const flavourScoreBars = [
    { label: 'Smoke', score: ratings.smoke, color: 'bg-[#86868b]' },
    { label: 'Sweetness', score: ratings.sweetness, color: 'bg-[#0071e3]' },
    { label: 'Fruit', score: ratings.fruit, color: 'bg-[#ff9500]' },
    { label: 'Spice', score: ratings.spice, color: 'bg-[#ff3b30]' },
    { label: 'Maritime', score: ratings.maritime, color: 'bg-[#5856d6]' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-apple-fade">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl border border-black/[0.08] shadow-2xl overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-white px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] flex items-center justify-center text-xl">
              🥃
            </div>
            <div>
              <span className="text-xs font-semibold text-[#0071e3] block">
                Today's Curated Single Malt
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                Random Dram of the Day
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close welcome popup"
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Bottle Image Frame */}
            <div className="w-40 sm:w-44 h-52 sm:h-56 bg-[#f5f5f7] rounded-2xl border border-black/[0.04] p-3 flex items-center justify-center relative shrink-0 shadow-xs group">
              <WhiskyBottleArt
                whisky={whisky}
                size="lg"
                className="h-48 sm:h-52"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#1d1d1f] text-white text-[10px] font-semibold rounded-full">
                {whisky.regionName}
              </span>
            </div>

            {/* Main Info */}
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <span className="text-xs font-semibold text-[#0071e3] block">
                  {whisky.distilleryName} Distillery
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] leading-snug">
                  {whisky.name}
                </h3>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                  {whisky.ageStatement}
                </span>
                <span className="px-3 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                  {whisky.abv}% ABV
                </span>
                <span className="px-3 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full">
                  {whisky.caskType}
                </span>
                <span className="px-3 py-1 bg-[#1d1d1f] text-white text-xs font-medium rounded-full">
                  {whisky.peatLevel}
                </span>
              </div>

              {/* Short Character Snippet */}
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {whisky.characterSnippet}
              </p>

              {/* Flavour Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                {whisky.flavourTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-[#f5f5f7] text-[#1d1d1f] text-[11px] font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flavour Scores Section (0-10) */}
          <div className="bg-[#f5f5f7] rounded-2xl p-5 space-y-3 border border-black/[0.04]">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
              <span className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
                Palate Flavour Scores (0–10)
              </span>
              <span className="text-xs text-[#86868b]">
                Sensory Profile
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
              {flavourScoreBars.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#1d1d1f] text-xs">{item.label}</span>
                    <span className="font-semibold text-[#1d1d1f] text-xs">{item.score}/10</span>
                  </div>
                  <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#f5f5f7] border-t border-black/[0.06] px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Don't show again today checkbox */}
          <label className="flex items-center gap-2 text-xs text-[#86868b] hover:text-[#1d1d1f] select-none cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgainToday}
              onChange={(e) => onToggleDontShowAgain(e.target.checked)}
              className="w-4 h-4 accent-[#0071e3] rounded cursor-pointer"
            />
            <span className="font-medium">Don't show this again today</span>
          </label>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onReroll}
              className="px-4 py-2 bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>🎲 Another Dram</span>
            </button>

            <button
              onClick={() => onCompare(whisky)}
              className="px-4 py-2 bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <BarChart2 className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Compare</span>
            </button>

            <button
              onClick={() => onExplore(whisky)}
              className="px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <span>Explore Whisky</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
