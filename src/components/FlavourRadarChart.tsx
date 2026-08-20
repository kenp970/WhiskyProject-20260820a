import React from 'react';
import { FlavourRadar } from '../types';

interface Props {
  radar: FlavourRadar;
  size?: number;
  showLabels?: boolean;
  color?: string;
  className?: string;
}

export const FlavourRadarChart: React.FC<Props> = ({
  radar,
  size = 200,
  showLabels = true,
  color = '#C5A059',
  className = ''
}) => {
  const center = size / 2;
  const radius = size * 0.38;

  const categories = [
    { key: 'peatSmoke', label: 'Peat & Smoke', value: radar.peatSmoke },
    { key: 'richSherry', label: 'Rich & Sherry', value: radar.richSherry },
    { key: 'fruitCitrus', label: 'Fruit & Citrus', value: radar.fruitCitrus },
    { key: 'floralGrass', label: 'Floral & Grass', value: radar.floralGrass },
    { key: 'sweetHoney', label: 'Sweet & Honey', value: radar.sweetHoney },
    { key: 'spiceOak', label: 'Spice & Oak', value: radar.spiceOak },
  ];

  const numSides = categories.length;

  // Calculate polygon points
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
    const distance = (value / 100) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  const getLabelCoordinates = (index: number) => {
    const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
    const labelDist = radius + 22;
    const x = center + labelDist * Math.cos(angle);
    const y = center + labelDist * Math.sin(angle);
    return { x, y, angle };
  };

  // Build grid rings (25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1];

  const polygonPoints = categories
    .map((cat, i) => {
      const { x, y } = getCoordinates(i, cat.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background webs */}
        {rings.map((ring, rIndex) => {
          const ringPoints = categories
            .map((_, i) => {
              const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
              const x = center + radius * ring * Math.cos(angle);
              const y = center + radius * ring * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <polygon
              key={`ring-${rIndex}`}
              points={ringPoints}
              fill="none"
              stroke="#E2D5C6"
              strokeWidth="1"
              strokeDasharray={rIndex === rings.length - 1 ? 'none' : '2,2'}
            />
          );
        })}

        {/* Axis lines */}
        {categories.map((_, i) => {
          const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="#E2D5C6"
              strokeWidth="1"
            />
          );
        })}

        {/* Value polygon */}
        <polygon
          points={polygonPoints}
          fill={color}
          fillOpacity="0.25"
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />

        {/* Value vertex dots */}
        {categories.map((cat, i) => {
          const { x, y } = getCoordinates(i, cat.value);
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r="3.5"
              fill={color}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
          );
        })}

        {/* Axis Labels */}
        {showLabels &&
          categories.map((cat, i) => {
            const { x, y } = getLabelCoordinates(i);
            const isTop = i === 0;
            const isBottom = i === 3;
            const isRight = i === 1 || i === 2;
            const textAnchor = isTop || isBottom ? 'middle' : isRight ? 'start' : 'end';
            const dy = isTop ? '-0.2em' : isBottom ? '0.9em' : '0.3em';

            return (
              <text
                key={`label-${i}`}
                x={x}
                y={y}
                dy={dy}
                textAnchor={textAnchor}
                className="text-[10px] font-medium fill-[#525B6C] tracking-tight select-none"
              >
                {cat.label}
              </text>
            );
          })}
      </svg>
    </div>
  );
};
