import React, { useState, useMemo } from 'react';
import { REGIONS } from '../data/regions';
import { DISTILLERIES } from '../data/distilleries';
import { WHISKIES } from '../data/whiskies';
import { Region, Distillery, Whisky } from '../types';
import { Search, X, MapPin, Wine, Flame, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectRegion: (id: any) => void;
  onSelectDistillery: (id: string) => void;
  onSelectWhisky: (whisky: Whisky) => void;
}

export const QuickSearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectRegion,
  onSelectDistillery,
  onSelectWhisky
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return { regions: [], distilleries: [], whiskies: [] };
    const q = query.toLowerCase();

    const matchedRegions = REGIONS.filter(
      r => r.name.toLowerCase().includes(q) || r.shortDescription.toLowerCase().includes(q) || r.typicalFlavours.some(f => f.toLowerCase().includes(q))
    );

    const matchedDistilleries = DISTILLERIES.filter(
      d => d.name.toLowerCase().includes(q) || d.regionName.toLowerCase().includes(q) || d.whiskyStyle.toLowerCase().includes(q) || d.typicalFlavours.some(f => f.toLowerCase().includes(q))
    );

    const matchedWhiskies = WHISKIES.filter(
      w => w.name.toLowerCase().includes(q) || w.distilleryName.toLowerCase().includes(q) || w.caskType.toLowerCase().includes(q) || w.flavourTags.some(t => t.toLowerCase().includes(q))
    );

    return { regions: matchedRegions, distilleries: matchedDistilleries, whiskies: matchedWhiskies };
  }, [query]);

  if (!isOpen) return null;

  const totalResults = results.regions.length + results.distilleries.length + results.whiskies.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xl flex items-start justify-center p-4 pt-16 sm:pt-24 animate-apple-fade">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#86868b]" />
          <input
            type="text"
            placeholder="Search regions, distilleries, expressions, or flavours..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg text-[#1d1d1f] placeholder-[#86868b] focus:outline-none font-normal"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#86868b] hover:text-[#1d1d1f] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-[11px] font-semibold text-[#86868b] hover:text-[#1d1d1f] px-2.5 py-1 bg-[#f5f5f7] rounded-full border border-black/[0.04] cursor-pointer">
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-5">
          {!query.trim() ? (
            <div className="py-6 text-center text-xs text-[#86868b] space-y-3">
              <p className="font-semibold text-[#1d1d1f] text-sm">Quick suggestions to explore:</p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Speyside', 'Lagavulin', 'Oloroso Sherry', 'Campbeltown', 'Highland Park', 'Triple Distilled'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-[#f5f5f7] hover:bg-[#e8e8ed] rounded-full text-[#1d1d1f] text-xs font-medium transition-colors border border-black/[0.04] cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-sm text-[#86868b]">
              No results found for "{query}". Try searching for a region name, distillery, or flavour tag like "Vanilla" or "Smoke".
            </div>
          ) : (
            <>
              {/* Regions */}
              {results.regions.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#0071e3] mb-2 px-1">Regions ({results.regions.length})</h4>
                  <div className="space-y-1.5">
                    {results.regions.map(r => (
                      <div
                        key={r.id}
                        onClick={() => { onSelectRegion(r.id); onClose(); }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#f5f5f7] hover:bg-[#e8e8ed] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                            <MapPin className="w-4 h-4 text-[#0071e3]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#1d1d1f]">{r.name} Region</p>
                            <p className="text-[11px] text-[#86868b] line-clamp-1">{r.tagline}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#86868b]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Distilleries */}
              {results.distilleries.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#0071e3] mb-2 px-1">Distilleries ({results.distilleries.length})</h4>
                  <div className="space-y-1.5">
                    {results.distilleries.map(d => (
                      <div
                        key={d.id}
                        onClick={() => { onSelectDistillery(d.id); onClose(); }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#f5f5f7] hover:bg-[#e8e8ed] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={d.heroImage} alt={d.name} className="w-9 h-9 rounded-xl object-cover" />
                          <div>
                            <p className="text-xs font-bold text-[#1d1d1f]">{d.name}</p>
                            <p className="text-[10px] font-semibold text-[#0071e3]">Est. {d.foundedYear} • {d.regionName}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#86868b]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Whiskies */}
              {results.whiskies.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#0071e3] mb-2 px-1">Whiskies & Single Malts ({results.whiskies.length})</h4>
                  <div className="space-y-1.5">
                    {results.whiskies.map(w => (
                      <div
                        key={w.id}
                        onClick={() => { onSelectWhisky(w); onClose(); }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#f5f5f7] hover:bg-[#e8e8ed] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                            <Wine className="w-4 h-4 text-[#0071e3]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#1d1d1f]">{w.name}</p>
                            <p className="text-[11px] text-[#86868b]">{w.distilleryName} • {w.ageStatement} • {w.abv}% ABV</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#86868b]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
