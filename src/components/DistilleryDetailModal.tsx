import React from 'react';
import { Distillery, Whisky } from '../types';
import { DISTILLERIES } from '../data/distilleries';
import { WHISKIES } from '../data/whiskies';
import { FlavourRadarChart } from './FlavourRadarChart';
import { X, Calendar, MapPin, Award, Droplets, Flame, Sparkles, Compass, CheckCircle2, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';

interface Props {
  distillery: Distillery | null;
  onClose: () => void;
  onSelectWhisky?: (whisky: Whisky) => void;
  onSelectDistillery?: (distilleryId: string) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (distilleryId: string) => void;
}

export const DistilleryDetailModal: React.FC<Props> = ({
  distillery,
  onClose,
  onSelectWhisky,
  onSelectDistillery,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  if (!distillery) return null;

  const popularWhiskies = WHISKIES.filter(w => w.distilleryId === distillery.id);
  const relatedDistilleries = DISTILLERIES.filter(d => distillery.relatedDistilleryIds.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-apple-fade">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Banner with large image */}
          <div className="relative h-72 sm:h-84 w-full bg-[#1d1d1f] overflow-hidden">
            <img
              src={distillery.heroImage}
              alt={distillery.name}
              className="w-full h-full object-cover object-center opacity-80 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Top Region Badge & Wishlist button */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
              <span className="px-3 py-1 bg-white/90 text-[#1d1d1f] text-xs font-semibold rounded-full shadow-xs">
                {distillery.regionName}
              </span>
              {distillery.production.visitorCenter && (
                <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 rounded-full border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34c759]" /> Visitor Center
                </span>
              )}
            </div>

            {/* Bottom Title Bar on Hero */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  {distillery.gaelicMeaning && (
                    <p className="text-xs text-[#0071e3] font-medium tracking-wide mb-1">
                      Gaelic: {distillery.gaelicMeaning} {distillery.pronunciation ? `• "${distillery.pronunciation}"` : ''}
                    </p>
                  )}
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{distillery.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 mt-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-white/60" /> Founded {distillery.foundedYear}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-white/60" /> {distillery.location}</span>
                    <span className="text-white/70">Founder: {distillery.founder}</span>
                  </div>
                </div>

                {onToggleWishlist && (
                  <button
                    onClick={() => onToggleWishlist(distillery.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#0071e3] text-white shadow-xs'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {isWishlisted ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5" /> Saved in Wishlist
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" /> Save Distillery
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 bg-white">
            {/* Quick Style & Overview Banner */}
            <div className="bg-[#f5f5f7] rounded-2xl p-5 border border-black/[0.04]">
              <h4 className="text-xs font-semibold text-[#0071e3] mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Signature Whisky Style
              </h4>
              <p className="text-base text-[#1d1d1f] font-medium leading-relaxed">
                "{distillery.whiskyStyle}"
              </p>
            </div>

            {/* History & Heritage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">Distillery Heritage & Story</h3>
                <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed italic">
                  {distillery.shortHistory}
                </p>
                <p className="text-xs sm:text-sm text-[#1d1d1f] leading-relaxed">
                  {distillery.detailedHeritage}
                </p>

                {/* Common Flavours */}
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-[#86868b] mb-2">Common Aromas & Flavours</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {distillery.typicalFlavours.map((flv, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#f5f5f7] text-xs font-medium text-[#1d1d1f] rounded-full"
                      >
                        {flv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flavour Radar Profile */}
              <div className="md:col-span-5 bg-[#f5f5f7] rounded-3xl p-5 border border-black/[0.04] flex flex-col items-center justify-center">
                <h4 className="text-xs font-semibold text-[#0071e3] mb-2">House Flavour Profile</h4>
                <FlavourRadarChart radar={distillery.flavourRadar} size={220} color="#0071e3" />
              </div>
            </div>

            {/* Production Information Section */}
            <div className="border-t border-black/[0.06] pt-6">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-[#0071e3]" /> Stillhouse & Technicals
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                <div className="bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04]">
                  <span className="text-[11px] font-semibold text-[#86868b] block">Water Source</span>
                  <span className="text-xs font-semibold text-[#1d1d1f] block mt-1">{distillery.production.waterSource}</span>
                </div>

                <div className="bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04]">
                  <span className="text-[11px] font-semibold text-[#86868b] block">Copper Stills</span>
                  <span className="text-xs font-semibold text-[#1d1d1f] block mt-1">
                    {distillery.production.washStills} Wash / {distillery.production.spiritStills} Spirit
                  </span>
                </div>

                <div className="bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04]">
                  <span className="text-[11px] font-semibold text-[#86868b] block">Annual Capacity</span>
                  <span className="text-xs font-semibold text-[#1d1d1f] block mt-1">{distillery.production.annualCapacityLitres}</span>
                </div>

                <div className="bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04]">
                  <span className="text-[11px] font-semibold text-[#86868b] block">Fermentation Time</span>
                  <span className="text-xs font-semibold text-[#1d1d1f] block mt-1">{distillery.production.fermentationTime}</span>
                </div>

                <div className="bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04]">
                  <span className="text-[11px] font-semibold text-[#86868b] block">Peat Specification</span>
                  <span className="text-xs font-semibold text-[#1d1d1f] block mt-1">{distillery.production.peatPpm}</span>
                </div>

                <div className="bg-[#f5f5f7] p-4 rounded-2xl border border-black/[0.04] sm:col-span-2 lg:col-span-3">
                  <span className="text-[11px] font-semibold text-[#86868b] block">Signature Oak Cask Maturation</span>
                  <span className="text-xs font-semibold text-[#1d1d1f] block mt-1">
                    {distillery.production.signatureCasks.join(' • ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Popular Whiskies from this Distillery */}
            <div className="border-t border-black/[0.06] pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">Popular Single Malts</h3>
                  <p className="text-xs text-[#86868b]">Core and flagship expressions from {distillery.name}</p>
                </div>
              </div>

              {popularWhiskies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularWhiskies.map(whisky => (
                    <div
                      key={whisky.id}
                      onClick={() => onSelectWhisky && onSelectWhisky(whisky)}
                      className="bg-white rounded-3xl border border-black/[0.06] p-5 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group apple-card-hover"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-[#0071e3] mb-1">
                          <span>{whisky.ageStatement}</span>
                          <span>{whisky.abv}% ABV</span>
                        </div>
                        <h4 className="font-bold text-sm text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors line-clamp-1">
                          {whisky.name}
                        </h4>
                        <p className="text-xs text-[#86868b] line-clamp-2 mt-1">
                          {whisky.characterSnippet}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs font-semibold text-[#0071e3]">
                        <span>View Tasting Notes</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#86868b] italic">Expressions available in the main Whiskies catalogue.</p>
              )}
            </div>

            {/* Related Distilleries in this Region */}
            {relatedDistilleries.length > 0 && (
              <div className="border-t border-black/[0.06] pt-6">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#1d1d1f] mb-3">Related Distilleries</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedDistilleries.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectDistillery && onSelectDistillery(rel.id)}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f5f5f7] hover:bg-[#e8e8ed] cursor-pointer transition-colors group"
                    >
                      <img src={rel.heroImage} alt={rel.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#1d1d1f] group-hover:text-[#0071e3] truncate">{rel.name}</h4>
                        <p className="text-[10px] font-semibold text-[#0071e3]">Est. {rel.foundedYear} • {rel.regionName}</p>
                        <p className="text-[10px] text-[#86868b] truncate">{rel.whiskyStyle}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#86868b] group-hover:text-[#0071e3] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
