import React, { useState } from 'react';
import { RegionId } from '../types';
import { REGIONS } from '../data/regions';
import { DISTILLERIES } from '../data/distilleries';
import { MapPin, Navigation, Sparkles, ChevronRight, Compass } from 'lucide-react';

interface Props {
  selectedRegionId?: RegionId | null;
  onSelectRegion: (id: RegionId) => void;
  onSelectDistillery?: (id: string) => void;
  highlightedDistilleryId?: string | null;
  className?: string;
}

export const InteractiveScotlandMap: React.FC<Props> = ({
  selectedRegionId,
  onSelectRegion,
  onSelectDistillery,
  highlightedDistilleryId,
  className = ''
}) => {
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null);
  const [hoveredDistilleryId, setHoveredDistilleryId] = useState<string | null>(null);

  const activeRegion = REGIONS.find(r => r.id === (hoveredRegionId || selectedRegionId)) || REGIONS[0];
  const hoveredDistillery = DISTILLERIES.find(d => d.id === (hoveredDistilleryId || highlightedDistilleryId));

  // Apple Cupertino map region colors
  const regionColors: Record<RegionId, { fill: string; stroke: string; label: string; activeFill: string; accentColor: string }> = {
    speyside: { fill: '#f1f3f9', activeFill: '#dbe8fe', stroke: '#0071e3', label: 'Speyside', accentColor: '#0071e3' },
    highland: { fill: '#edf4ee', activeFill: '#d1e7d4', stroke: '#34c759', label: 'Highland', accentColor: '#34c759' },
    islay: { fill: '#fff2e6', activeFill: '#fdddbf', stroke: '#ff9500', label: 'Islay', accentColor: '#ff9500' },
    lowland: { fill: '#f6f2f9', activeFill: '#e8dbf2', stroke: '#af52de', label: 'Lowland', accentColor: '#af52de' },
    campbeltown: { fill: '#fff5f0', activeFill: '#fed7c4', stroke: '#ff3b30', label: 'Campbeltown', accentColor: '#ff3b30' },
    islands: { fill: '#ebf8fa', activeFill: '#c7eef4', stroke: '#5ac8fa', label: 'Islands', accentColor: '#5ac8fa' },
  };

  return (
    <div className={`relative bg-white rounded-3xl border border-black/[0.06] p-6 sm:p-8 shadow-xs overflow-hidden ${className}`}>
      {/* Map Header & Segmented Pill Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] tracking-normal mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Terroir Atlas</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Scotland Distilling Map</h3>
        </div>

        {/* Apple Segmented Pills */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#f5f5f7] rounded-full max-w-fit">
          {REGIONS.map(r => {
            const isSelected = (selectedRegionId || 'speyside') === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRegion(r.id)}
                className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#1d1d1f] font-semibold shadow-xs'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {r.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Map Container */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] bg-[#f5f5f7] rounded-2xl p-4 border border-black/[0.04] overflow-hidden">
          <svg
            viewBox="0 0 500 580"
            className="w-full max-w-[440px] h-auto select-none drop-shadow-xs"
          >
            {/* Subtle sea grid pattern */}
            <defs>
              <pattern id="sea-waves" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#000000" fillOpacity="0.04" />
              </pattern>
            </defs>
            <rect width="500" height="580" fill="url(#sea-waves)" rx="16" />

            {/* Highlands */}
            <path
              id="region-highland"
              d="M 180 80 C 230 40, 310 40, 350 80 C 370 100, 390 140, 360 180 C 320 200, 310 240, 300 300 C 260 320, 220 330, 180 320 C 140 300, 150 220, 140 180 C 130 140, 150 100, 180 80 Z"
              fill={selectedRegionId === 'highland' ? regionColors.highland.activeFill : regionColors.highland.fill}
              stroke={regionColors.highland.stroke}
              strokeWidth={selectedRegionId === 'highland' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('highland')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('highland')}
            />

            {/* Speyside */}
            <path
              id="region-speyside"
              d="M 285 160 C 320 145, 365 140, 375 175 C 370 205, 340 225, 305 210 C 285 200, 280 175, 285 160 Z"
              fill={selectedRegionId === 'speyside' ? regionColors.speyside.activeFill : regionColors.speyside.fill}
              stroke={regionColors.speyside.stroke}
              strokeWidth={selectedRegionId === 'speyside' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('speyside')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('speyside')}
            />

            {/* Lowland */}
            <path
              id="region-lowland"
              d="M 180 320 C 240 330, 300 310, 360 330 C 400 370, 390 440, 370 480 C 320 510, 240 500, 190 460 C 170 420, 160 360, 180 320 Z"
              fill={selectedRegionId === 'lowland' ? regionColors.lowland.activeFill : regionColors.lowland.fill}
              stroke={regionColors.lowland.stroke}
              strokeWidth={selectedRegionId === 'lowland' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('lowland')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('lowland')}
            />

            {/* Campbeltown */}
            <path
              id="region-campbeltown"
              d="M 160 410 C 175 425, 175 470, 165 495 C 150 500, 140 480, 145 440 C 148 420, 155 410, 160 410 Z"
              fill={selectedRegionId === 'campbeltown' ? regionColors.campbeltown.activeFill : regionColors.campbeltown.fill}
              stroke={regionColors.campbeltown.stroke}
              strokeWidth={selectedRegionId === 'campbeltown' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('campbeltown')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('campbeltown')}
            />

            {/* Islay */}
            <path
              id="region-islay"
              d="M 105 380 C 125 375, 135 395, 125 415 C 115 425, 95 415, 90 400 C 90 390, 95 382, 105 380 Z"
              fill={selectedRegionId === 'islay' ? regionColors.islay.activeFill : regionColors.islay.fill}
              stroke={regionColors.islay.stroke}
              strokeWidth={selectedRegionId === 'islay' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('islay')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('islay')}
            />

            {/* Islands - Orkney */}
            <path
              id="region-islands-orkney"
              d="M 360 25 C 385 20, 395 35, 385 50 C 370 55, 355 45, 360 25 Z"
              fill={selectedRegionId === 'islands' ? regionColors.islands.activeFill : regionColors.islands.fill}
              stroke={regionColors.islands.stroke}
              strokeWidth={selectedRegionId === 'islands' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('islands')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('islands')}
            />

            {/* Islands - Skye */}
            <path
              id="region-islands-skye"
              d="M 120 180 C 145 170, 155 195, 140 220 C 125 230, 110 215, 115 190 Z"
              fill={selectedRegionId === 'islands' ? regionColors.islands.activeFill : regionColors.islands.fill}
              stroke={regionColors.islands.stroke}
              strokeWidth={selectedRegionId === 'islands' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('islands')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('islands')}
            />

            {/* Islands - Arran */}
            <path
              id="region-islands-arran"
              d="M 180 430 C 192 430, 195 455, 185 468 C 175 470, 172 450, 180 430 Z"
              fill={selectedRegionId === 'islands' ? regionColors.islands.activeFill : regionColors.islands.fill}
              stroke={regionColors.islands.stroke}
              strokeWidth={selectedRegionId === 'islands' ? '2.5' : '1.2'}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setHoveredRegionId('islands')}
              onMouseLeave={() => setHoveredRegionId(null)}
              onClick={() => onSelectRegion('islands')}
            />

            {/* Region Labels */}
            <text x="325" y="180" className="text-[12px] font-semibold fill-[#0071e3] pointer-events-none select-none">Speyside</text>
            <text x="220" y="160" className="text-[13px] font-semibold fill-[#2d8a3e] pointer-events-none select-none">Highland</text>
            <text x="75" y="405" className="text-[11px] font-semibold fill-[#c25e00] pointer-events-none select-none">Islay</text>
            <text x="260" y="420" className="text-[13px] font-semibold fill-[#7a32a6] pointer-events-none select-none">Lowland</text>
            <text x="110" y="475" className="text-[10px] font-semibold fill-[#c92a2a] pointer-events-none select-none">Campbeltown</text>
            <text x="110" y="165" className="text-[10px] font-semibold fill-[#0b7285] pointer-events-none select-none">Skye (Islands)</text>
            <text x="360" y="65" className="text-[10px] font-semibold fill-[#0b7285] pointer-events-none select-none">Orkney (Islands)</text>

            {/* Distillery Pins */}
            {DISTILLERIES.map(d => {
              const cx = (d.mapCoords.x / 100) * 440 + 30;
              const cy = (d.mapCoords.y / 100) * 520 + 30;
              const isHighlighted = (hoveredDistilleryId === d.id) || (highlightedDistilleryId === d.id);
              const isCurrentRegion = selectedRegionId ? d.regionId === selectedRegionId : true;

              return (
                <g
                  key={d.id}
                  className={`cursor-pointer transition-transform duration-200 ${isHighlighted ? 'scale-125 origin-center' : ''}`}
                  onMouseEnter={() => setHoveredDistilleryId(d.id)}
                  onMouseLeave={() => setHoveredDistilleryId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectDistillery) onSelectDistillery(d.id);
                  }}
                >
                  {isHighlighted && (
                    <circle cx={cx} cy={cy} r="10" fill="#0071e3" fillOpacity="0.25" className="animate-ping" />
                  )}
                  <circle cx={cx} cy={cy + 1} r={isHighlighted ? '5.5' : '3.5'} fill="#000000" fillOpacity="0.15" />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHighlighted ? '5.5' : '3.5'}
                    fill={isHighlighted ? '#0071e3' : isCurrentRegion ? '#1d1d1f' : '#a1a1a6'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Hover Tooltip */}
          {hoveredDistillery && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xl border border-black/[0.08] p-3 rounded-2xl shadow-lg max-w-[220px] text-xs pointer-events-none animate-apple-fade">
              <p className="font-semibold text-[#1d1d1f]">{hoveredDistillery.name}</p>
              <p className="text-[#86868b] text-[11px]">Est. {hoveredDistillery.foundedYear} • {hoveredDistillery.regionName}</p>
              <p className="text-[#1d1d1f] text-[11px] mt-1 line-clamp-1">"{hoveredDistillery.whiskyStyle}"</p>
            </div>
          )}
        </div>

        {/* Region / Distillery Context Apple Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: regionColors[activeRegion.id].accentColor }} />
              <span className="text-xs font-semibold text-[#86868b]">
                {activeRegion.gaelicName ? `${activeRegion.gaelicName} • ` : ''}Terroir Profile
              </span>
            </div>

            <div>
              <h4 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{activeRegion.name}</h4>
              <p className="text-sm font-medium text-[#0071e3] mt-0.5">{activeRegion.tagline}</p>
            </div>

            <p className="text-sm text-[#86868b] leading-relaxed">
              {activeRegion.shortDescription}
            </p>

            {/* Typical Flavours Tags */}
            <div>
              <span className="text-xs font-semibold text-[#1d1d1f] block mb-2">Signature Regional Notes:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeRegion.typicalFlavours.map((flv, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium rounded-full"
                  >
                    {flv}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Distilleries in this region */}
            <div className="pt-3 border-t border-black/[0.06]">
              <span className="text-xs font-semibold text-[#86868b] block mb-2">Featured Distilleries:</span>
              <div className="grid grid-cols-3 gap-2">
                {activeRegion.featuredDistilleryIds.map(distId => {
                  const dist = DISTILLERIES.find(d => d.id === distId);
                  if (!dist) return null;
                  return (
                    <button
                      key={dist.id}
                      onClick={() => onSelectDistillery && onSelectDistillery(dist.id)}
                      className="text-left p-2.5 rounded-xl bg-[#f5f5f7] hover:bg-[#ebebed] border border-black/[0.04] transition-colors cursor-pointer group"
                    >
                      <p className="font-semibold text-xs text-[#1d1d1f] group-hover:text-[#0071e3] line-clamp-1">
                        {dist.name}
                      </p>
                      <span className="text-[10px] text-[#86868b]">Est. {dist.foundedYear}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => onSelectRegion(activeRegion.id)}
              className="w-full mt-2 py-3 px-4 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Explore {activeRegion.name} Whiskies & Terroir</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
