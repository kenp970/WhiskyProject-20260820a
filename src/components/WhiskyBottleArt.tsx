import React, { useState } from 'react';
import { Whisky } from '../types';

interface WhiskyBottleArtProps {
  whiskyId?: string;
  whisky?: Whisky;
  className?: string;
  imageSrc?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showShadow?: boolean;
}

export const WhiskyBottleArt: React.FC<WhiskyBottleArtProps> = ({
  whiskyId: propWhiskyId,
  whisky,
  className = '',
  imageSrc,
  name,
  size = 'md',
  showShadow = true,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const whiskyId = propWhiskyId || whisky?.id || '';
  const whiskyName = name || whisky?.name || 'Single Malt Scotch Whisky';
  const ageStatement = whisky?.ageStatement || 'Aged';
  const abv = whisky?.abv ? `${whisky.abv}%` : '40%';
  const distillery = whisky?.distilleryName || 'Scotland Distillery';
  const region = whisky?.regionName || 'Scotland';

  const sizeClasses = {
    sm: 'w-12 h-20',
    md: 'w-24 h-40',
    lg: 'w-36 h-60',
    xl: 'w-48 h-72',
    full: 'w-full h-full',
  }[size];

  // Specific renderers for all 25 Scottish Single Malts with authentic designs
  const renderBottleVector = () => {
    switch (whiskyId) {
      // 1. THE MACALLAN 12 SHERRY OAK
      case 'macallan-sherry-oak-12':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="macallan-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#d9822b" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#8a3b09" stopOpacity="0.95" />
                <stop offset="90%" stopColor="#c76c1a" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gold-foil" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="50%" stopColor="#fff2a8" />
                <stop offset="100%" stopColor="#aa820a" />
              </linearGradient>
            </defs>
            {/* Capsule */}
            <rect x="70" y="20" width="20" height="40" rx="3" fill="#1a1a1a" />
            <rect x="69" y="52" width="22" height="6" rx="1" fill="url(#gold-foil)" />
            {/* Neck */}
            <path d="M 70 60 L 70 100 Q 60 130 46 150 L 46 340 Q 46 352 56 352 L 104 352 Q 114 352 114 340 L 114 150 Q 100 130 90 100 L 90 60 Z" fill="url(#macallan-glass)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Shoulder Emboss */}
            <path d="M 64 135 Q 80 145 96 135" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
            {/* Iconic Macallan Label */}
            <rect x="49" y="160" width="62" height="135" rx="3" fill="#faf8f2" stroke="#d4af37" strokeWidth="1" />
            {/* Macallan Red/Gold Header */}
            <rect x="52" y="164" width="56" height="26" rx="1" fill="#b31b26" />
            <text x="80" y="176" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" letterSpacing="1">EST. 1824</text>
            <text x="80" y="186" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff" fontFamily="serif">THE MACALLAN</text>
            {/* Label Body */}
            <text x="80" y="202" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#555555" letterSpacing="0.5">HIGHLAND SINGLE MALT</text>
            <text x="80" y="210" textAnchor="middle" fontSize="5" fill="#888888">SCOTCH WHISKY</text>
            <line x1="56" y1="216" x2="104" y2="216" stroke="#d4af37" strokeWidth="0.75" />
            {/* 12 Badge */}
            <rect x="68" y="222" width="24" height="24" rx="2" fill="#ffffff" stroke="#1d1d1f" strokeWidth="1" />
            <text x="80" y="238" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d1d1f" fontFamily="serif">12</text>
            <text x="80" y="254" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#b31b26">SHERRY OAK CASK</text>
            <text x="80" y="262" textAnchor="middle" fontSize="4.5" fill="#666666">MATURED IN JEREZ CASKS</text>
            <text x="80" y="278" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1d1d1f">{abv} • 700ml</text>
            {/* Glass reflection highlight */}
            <path d="M 50 155 L 50 335" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          </svg>
        );

      // 2. THE MACALLAN 12 DOUBLE CASK
      case 'macallan-double-cask-12':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="macallan-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#e5a03e" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#a35709" stopOpacity="0.95" />
                <stop offset="90%" stopColor="#e5a03e" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Blue Capsule */}
            <rect x="70" y="20" width="20" height="40" rx="3" fill="#0c2340" />
            <rect x="69" y="52" width="22" height="6" rx="1" fill="#d4af37" />
            {/* Bottle Glass */}
            <path d="M 70 60 L 70 100 Q 60 130 46 150 L 46 340 Q 46 352 56 352 L 104 352 Q 114 352 114 340 L 114 150 Q 100 130 90 100 L 90 60 Z" fill="url(#macallan-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Label */}
            <rect x="49" y="160" width="62" height="135" rx="3" fill="#ffffff" stroke="#0c2340" strokeWidth="1" />
            <rect x="52" y="164" width="56" height="26" rx="1" fill="#0c2340" />
            <text x="80" y="176" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#d4af37" letterSpacing="1">EST. 1824</text>
            <text x="80" y="186" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff" fontFamily="serif">THE MACALLAN</text>
            <text x="80" y="202" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#0c2340">DOUBLE CASK</text>
            <rect x="68" y="215" width="24" height="24" rx="2" fill="#0c2340" />
            <text x="80" y="232" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff" fontFamily="serif">12</text>
            <text x="80" y="248" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#0c2340">YEARS OLD</text>
            <text x="80" y="260" textAnchor="middle" fontSize="4.5" fill="#666666">AMERICAN & EUROPEAN OAK</text>
            <text x="80" y="278" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#0c2340">{abv} • 700ml</text>
            <path d="M 50 155 L 50 335" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          </svg>
        );

      // 3. THE MACALLAN 18 SHERRY OAK
      case 'macallan-sherry-oak-18':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="macallan-18-mahogany" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#6e260e" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#401305" stopOpacity="0.98" />
                <stop offset="85%" stopColor="#6e260e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect x="70" y="20" width="20" height="40" rx="3" fill="#111111" />
            <rect x="69" y="52" width="22" height="6" rx="1" fill="#d4af37" />
            <path d="M 70 60 L 70 100 Q 60 130 46 150 L 46 340 Q 46 352 56 352 L 104 352 Q 114 352 114 340 L 114 150 Q 100 130 90 100 L 90 60 Z" fill="url(#macallan-18-mahogany)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="49" y="160" width="62" height="135" rx="3" fill="#faf8f2" stroke="#d4af37" strokeWidth="1.2" />
            <rect x="52" y="164" width="56" height="26" rx="1" fill="#111111" />
            <text x="80" y="176" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#d4af37" letterSpacing="1">EST. 1824</text>
            <text x="80" y="186" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff" fontFamily="serif">THE MACALLAN</text>
            <text x="80" y="202" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#111111">HIGHLAND SINGLE MALT</text>
            <rect x="68" y="215" width="24" height="24" rx="2" fill="#111111" stroke="#d4af37" strokeWidth="1" />
            <text x="80" y="232" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#d4af37" fontFamily="serif">18</text>
            <text x="80" y="248" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#b31b26">SHERRY OAK</text>
            <text x="80" y="258" textAnchor="middle" fontSize="4" fill="#666666">ANNUAL RELEASE</text>
            <text x="80" y="278" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#111111">{abv} • 700ml</text>
            <path d="M 50 155 L 50 335" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          </svg>
        );

      // 4. ABERLOUR 12 DOUBLE CASK
      case 'aberlour-12':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="aberlour-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#c46a1e" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#7a3205" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#c46a1e" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Stout rounded bottle neck with burgundy wax seal */}
            <path d="M 68 25 L 92 25 L 90 65 L 70 65 Z" fill="#58111a" />
            <circle cx="80" cy="55" r="7" fill="#801824" stroke="#d4af37" strokeWidth="0.75" />
            {/* Stout apothecary body */}
            <path d="M 70 65 Q 40 100 40 150 L 40 330 Q 40 350 60 350 L 100 350 Q 120 350 120 330 L 120 150 Q 120 100 90 65 Z" fill="url(#aberlour-amber)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Cream Vintage Label */}
            <rect x="44" y="160" width="72" height="120" rx="3" fill="#fcf9ee" stroke="#7a3205" strokeWidth="0.8" />
            <text x="80" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#58111a" fontFamily="serif">ABERLOUR</text>
            <text x="80" y="190" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#7a3205">SPEYSIDE SINGLE MALT</text>
            <line x1="50" y1="195" x2="110" y2="195" stroke="#d4af37" strokeWidth="0.75" />
            <circle cx="80" cy="216" r="14" fill="#58111a" />
            <text x="80" y="221" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff" fontFamily="serif">12</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#58111a">DOUBLE CASK MATURED</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4.5" fill="#666666">FOREST OF CHARLESTOWN</text>
            <text x="80" y="268" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#333333">{abv} • 700ml</text>
            <path d="M 44 140 L 44 320" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" />
          </svg>
        );

      // 5. GLENFIDDICH 12 (Iconic Triangular Green Bottle)
      case 'glenfiddich-12':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="fiddich-green" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#55a56d" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#1e542d" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#0f331a" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#2b6b3c" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {/* Gold Capsule */}
            <rect x="70" y="20" width="20" height="40" rx="2" fill="#cba135" />
            {/* Triangular angled bottle */}
            <path d="M 70 60 L 70 95 L 44 145 L 42 340 L 118 340 L 116 145 L 90 95 L 90 60 Z" fill="url(#fiddich-green)" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />
            {/* Center triangular ridge line */}
            <line x1="80" y1="95" x2="80" y2="340" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
            {/* Gold Stag Crest */}
            <circle cx="80" cy="140" r="12" fill="#1e542d" stroke="#cba135" strokeWidth="1.5" />
            <path d="M 74 142 Q 80 133 86 142 Q 80 138 74 142 Z M 77 135 L 73 130 M 83 135 L 87 130" stroke="#cba135" strokeWidth="1.2" fill="#cba135" />
            {/* Green and Gold Label */}
            <rect x="48" y="165" width="64" height="120" rx="2" fill="#123d1e" stroke="#cba135" strokeWidth="1" />
            <text x="80" y="185" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#ffffff" fontFamily="serif" letterSpacing="0.5">Glenfiddich</text>
            <text x="80" y="195" textAnchor="middle" fontSize="5" fill="#cba135" letterSpacing="1">SINGLE MALT</text>
            <text x="80" y="202" textAnchor="middle" fontSize="4" fill="#a3d4af">SCOTCH WHISKY</text>
            <rect x="68" y="210" width="24" height="24" rx="2" fill="#cba135" />
            <text x="80" y="227" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#123d1e" fontFamily="serif">12</text>
            <text x="80" y="248" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#ffffff">OUR ORIGINAL TWELVE</text>
            <text x="80" y="268" textAnchor="middle" fontSize="5" fill="#cba135">{abv} • 700ml</text>
          </svg>
        );

      // 6. GLENFIDDICH 15 SOLERA RESERVE
      case 'glenfiddich-15-solera':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="fiddich-15-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#d48228" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#7a3805" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#d48228" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="70" y="20" width="20" height="40" rx="2" fill="#4a152d" />
            <rect x="69" y="52" width="22" height="6" rx="1" fill="#cba135" />
            <path d="M 70 60 L 70 95 L 44 145 L 42 340 L 118 340 L 116 145 L 90 95 L 90 60 Z" fill="url(#fiddich-15-amber)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <line x1="80" y1="95" x2="80" y2="340" stroke="#ffffff" strokeWidth="1.2" opacity="0.35" />
            <rect x="48" y="165" width="64" height="120" rx="2" fill="#4a152d" stroke="#cba135" strokeWidth="1" />
            <text x="80" y="185" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#ffffff" fontFamily="serif">Glenfiddich</text>
            <text x="80" y="195" textAnchor="middle" fontSize="5" fill="#cba135">SOLERA FIFTEEN</text>
            <circle cx="80" cy="220" r="13" fill="#cba135" />
            <text x="80" y="225" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4a152d" fontFamily="serif">15</text>
            <text x="80" y="248" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#ffffff">SOLERA VAT SYSTEM</text>
            <text x="80" y="268" textAnchor="middle" fontSize="5" fill="#cba135">{abv} • 700ml</text>
          </svg>
        );

      // 7. THE GLENLIVET 12 DOUBLE OAK
      case 'glenlivet-12-double-oak':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="glenlivet-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#e8aa3a" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#9e5a07" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e8aa3a" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="40" rx="2" fill="#008080" />
            <rect x="70" y="52" width="20" height="6" rx="1" fill="#d4af37" />
            <path d="M 71 60 L 71 105 Q 60 130 48 150 L 48 340 Q 48 350 58 350 L 102 350 Q 112 350 112 340 L 112 150 Q 100 130 89 105 L 89 60 Z" fill="url(#glenlivet-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Glenlivet Turquoise Label */}
            <rect x="50" y="160" width="60" height="125" rx="3" fill="#ffffff" stroke="#008080" strokeWidth="1" />
            <rect x="52" y="163" width="56" height="26" fill="#008080" />
            <text x="80" y="175" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" fontFamily="serif">THE GLENLIVET</text>
            <text x="80" y="184" textAnchor="middle" fontSize="4.5" fill="#e0f7f7">GEORGE SMITH • 1824</text>
            <rect x="68" y="200" width="24" height="24" rx="2" fill="#008080" />
            <text x="80" y="217" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff" fontFamily="serif">12</text>
            <text x="80" y="235" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#008080">DOUBLE OAK</text>
            <text x="80" y="245" textAnchor="middle" fontSize="4.5" fill="#666666">AMERICAN & EUROPEAN</text>
            <text x="80" y="268" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1d1d1f">{abv} • 700ml</text>
          </svg>
        );

      // 8. THE GLENLIVET 18
      case 'glenlivet-18':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="glenlivet-18-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#b56314" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#6e2d04" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#b56314" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="40" rx="2" fill="#0d1b2a" />
            <rect x="70" y="52" width="20" height="6" rx="1" fill="#d4af37" />
            <path d="M 71 60 L 71 105 Q 60 130 48 150 L 48 340 Q 48 350 58 350 L 102 350 Q 112 350 112 340 L 112 150 Q 100 130 89 105 L 89 60 Z" fill="url(#glenlivet-18-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="50" y="160" width="60" height="125" rx="3" fill="#0d1b2a" stroke="#d4af37" strokeWidth="1.2" />
            <text x="80" y="178" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#ffffff" fontFamily="serif">THE GLENLIVET</text>
            <text x="80" y="188" textAnchor="middle" fontSize="4.5" fill="#d4af37">BATCH RESERVE</text>
            <circle cx="80" cy="212" r="13" fill="#d4af37" />
            <text x="80" y="217" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0d1b2a" fontFamily="serif">18</text>
            <text x="80" y="238" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#ffffff">YEARS OF AGE</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4.5" fill="#a0aec0">FIRST & SECOND FILL OAK</text>
            <text x="80" y="270" textAnchor="middle" fontSize="5" fill="#d4af37">{abv} • 700ml</text>
          </svg>
        );

      // 9. ARDBEG 10 (Dark Forest Green Islay Bottle, Celtic Knot)
      case 'ardbeg-ten':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="ardbeg-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2e4d34" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#112415" stopOpacity="0.98" />
                <stop offset="70%" stopColor="#071209" stopOpacity="1" />
                <stop offset="100%" stopColor="#1e3823" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Black capsule with Celtic Knot */}
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#151515" />
            <rect x="70" y="54" width="20" height="5" fill="#cba135" />
            {/* Dark Green Stout Islay Bottle */}
            <path d="M 71 62 L 71 100 Q 55 125 44 148 L 44 338 Q 44 350 56 350 L 104 350 Q 116 350 116 338 L 116 148 Q 105 125 89 100 L 89 62 Z" fill="url(#ardbeg-glass)" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" />
            {/* Iconic Black and Gold Ardbeg Label */}
            <rect x="48" y="160" width="64" height="125" rx="3" fill="#141414" stroke="#cba135" strokeWidth="1" />
            <text x="80" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#cba135" fontFamily="serif" letterSpacing="1">Ardbeg</text>
            <text x="80" y="190" textAnchor="middle" fontSize="5" fill="#ffffff" letterSpacing="1">ISLAY SINGLE MALT</text>
            <text x="80" y="197" textAnchor="middle" fontSize="4.5" fill="#888888">SCOTCH WHISKY</text>
            {/* Celtic Knot 'A' & 'TEN' */}
            <rect x="66" y="205" width="28" height="24" rx="2" fill="#cba135" />
            <text x="80" y="222" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#141414" fontFamily="serif">TEN</text>
            <text x="80" y="244" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#cba135">NON CHILL-FILTERED</text>
            <text x="80" y="254" textAnchor="middle" fontSize="4.5" fill="#ffffff">55 PPM PEAT SMOKE</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#cba135">{abv} • 700ml</text>
          </svg>
        );

      // 10. ARDBEG UIGEADAIL
      case 'ardbeg-uigeadail':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="ardbeg-uig-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2e4d34" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#112415" stopOpacity="0.98" />
                <stop offset="70%" stopColor="#071209" stopOpacity="1" />
                <stop offset="100%" stopColor="#1e3823" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#3a111a" />
            <rect x="70" y="54" width="20" height="5" fill="#cba135" />
            <path d="M 71 62 L 71 100 Q 55 125 44 148 L 44 338 Q 44 350 56 350 L 104 350 Q 116 350 116 338 L 116 148 Q 105 125 89 100 L 89 62 Z" fill="url(#ardbeg-uig-glass)" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" />
            <rect x="48" y="160" width="64" height="125" rx="3" fill="#1e1114" stroke="#cba135" strokeWidth="1" />
            <text x="80" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#cba135" fontFamily="serif">Ardbeg</text>
            <text x="80" y="195" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#ffffff" letterSpacing="1">UIGEADAIL</text>
            <text x="80" y="208" textAnchor="middle" fontSize="4.5" fill="#cba135">SHERRY CASK MATURED</text>
            <rect x="62" y="218" width="36" height="18" rx="2" fill="#3a111a" stroke="#cba135" strokeWidth="0.8" />
            <text x="80" y="230" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#ffffff">CASK STRENGTH</text>
            <text x="80" y="252" textAnchor="middle" fontSize="4.5" fill="#e2d8d8">DARK & SMOKY</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#cba135">{abv} • 700ml</text>
          </svg>
        );

      // 11. LAGAVULIN 16 (Classic Dark Bottle with Cream Vintage Label)
      case 'lagavulin-16':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="lagavulin-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3d4a2b" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#1a240f" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#0d1406" stopOpacity="1" />
                <stop offset="100%" stopColor="#2e381f" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {/* Green Foil Capsule */}
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#1b381e" />
            <rect x="70" y="54" width="20" height="5" fill="#bfa14d" />
            {/* Iconic Lagavulin Bottle */}
            <path d="M 71 62 L 71 100 Q 56 120 46 145 L 46 338 Q 46 350 58 350 L 102 350 Q 114 350 114 338 L 114 145 Q 104 120 89 100 L 89 62 Z" fill="url(#lagavulin-glass)" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.5" />
            {/* Vintage Cream Label */}
            <rect x="49" y="160" width="62" height="130" rx="3" fill="#fcf9ec" stroke="#bfa14d" strokeWidth="1" />
            <text x="80" y="178" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1b381e" fontFamily="serif">LAGAVULIN</text>
            <text x="80" y="188" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#8c1d24">ISLAY SINGLE MALT</text>
            <circle cx="80" cy="214" r="14" fill="#ffffff" stroke="#bfa14d" strokeWidth="1.5" />
            <text x="80" y="220" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1b381e" fontFamily="serif">16</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1b381e">AGED 16 YEARS</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4.5" fill="#666666">WHITE HORSE DISTILLERS</text>
            <text x="80" y="274" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#1b381e">{abv} • 700ml</text>
          </svg>
        );

      // 12. LAPHROAIG 10 (Iconic Dark Green Bottle with Minimalist White Label)
      case 'laphroaig-10':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="laphroaig-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2e4d34" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#112415" stopOpacity="0.98" />
                <stop offset="70%" stopColor="#071209" stopOpacity="1" />
                <stop offset="100%" stopColor="#1e3823" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#1e4d2b" />
            <rect x="70" y="54" width="20" height="5" fill="#ffffff" />
            <path d="M 71 62 L 71 100 Q 56 120 46 145 L 46 338 Q 46 350 58 350 L 102 350 Q 114 350 114 338 L 114 145 Q 104 120 89 100 L 89 62 Z" fill="url(#laphroaig-glass)" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.5" />
            {/* Distinctive White Minimalist Label with bold black typography */}
            <rect x="49" y="160" width="62" height="130" rx="3" fill="#ffffff" stroke="#1d1d1f" strokeWidth="0.8" />
            <text x="80" y="178" textAnchor="middle" fontSize="7.5" fontWeight="900" fill="#111111" letterSpacing="0.5" fontFamily="serif">LAPHROAIG</text>
            <text x="80" y="188" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#111111">ISLAY SINGLE MALT</text>
            <line x1="56" y1="194" x2="104" y2="194" stroke="#111111" strokeWidth="0.75" />
            <circle cx="80" cy="216" r="14" fill="#ffffff" stroke="#1e4d2b" strokeWidth="1.5" />
            <text x="80" y="222" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e4d2b" fontFamily="serif">10</text>
            <text x="80" y="242" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#111111">AGED 10 YEARS</text>
            <text x="80" y="252" textAnchor="middle" fontSize="4" fill="#555555">ESTABLISHED 1815</text>
            <text x="80" y="274" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#111111">{abv} • 700ml</text>
          </svg>
        );

      // 13. GLENMORANGIE THE ORIGINAL 10 (Tall Slender Neck, Orange & Gold Signet)
      case 'glenmorangie-original-10':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="morangie-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#f5bb47" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#c7820a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f5bb47" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="72" y="15" width="16" height="40" rx="2" fill="#ff7a00" />
            <rect x="71" y="48" width="18" height="6" fill="#d4af37" />
            {/* Tall elegant curved bottle */}
            <path d="M 72 55 L 72 120 Q 56 145 48 165 L 48 340 Q 48 350 58 350 L 102 350 Q 112 350 112 340 L 112 165 Q 104 145 88 120 L 88 55 Z" fill="url(#morangie-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Golden Signet Emblem */}
            <circle cx="80" cy="155" r="10" fill="#d4af37" stroke="#ffffff" strokeWidth="1" />
            {/* Orange Banner Label */}
            <rect x="50" y="175" width="60" height="110" rx="3" fill="#ffffff" stroke="#ff7a00" strokeWidth="1" />
            <rect x="52" y="178" width="56" height="22" fill="#ff7a00" />
            <text x="80" y="190" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" fontFamily="serif">GLENMORANGIE</text>
            <text x="80" y="197" textAnchor="middle" fontSize="4" fill="#fff3e0">HIGHLAND SINGLE MALT</text>
            <text x="80" y="215" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#ff7a00">THE ORIGINAL</text>
            <circle cx="80" cy="235" r="12" fill="#ff7a00" />
            <text x="80" y="240" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="serif">10</text>
            <text x="80" y="258" textAnchor="middle" fontSize="4.5" fill="#666666">AGED 10 YEARS</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1d1d1f">{abv} • 700ml</text>
          </svg>
        );

      // 14. GLENMORANGIE QUINTA RUBAN 14
      case 'glenmorangie-quinta-ruban-14':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="quinta-ruby" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#9e2a2b" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#540b0e" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#9e2a2b" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="72" y="15" width="16" height="40" rx="2" fill="#800e13" />
            <rect x="71" y="48" width="18" height="6" fill="#d4af37" />
            <path d="M 72 55 L 72 120 Q 56 145 48 165 L 48 340 Q 48 350 58 350 L 102 350 Q 112 350 112 340 L 112 165 Q 104 145 88 120 L 88 55 Z" fill="url(#quinta-ruby)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <circle cx="80" cy="155" r="10" fill="#d4af37" stroke="#ffffff" strokeWidth="1" />
            <rect x="50" y="175" width="60" height="110" rx="3" fill="#38040e" stroke="#d4af37" strokeWidth="1" />
            <text x="80" y="190" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#d4af37" fontFamily="serif">GLENMORANGIE</text>
            <text x="80" y="205" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff">QUINTA RUBAN</text>
            <text x="80" y="215" textAnchor="middle" fontSize="4.5" fill="#d4af37">PORT CASK FINISH</text>
            <circle cx="80" cy="235" r="12" fill="#800e13" stroke="#d4af37" strokeWidth="1" />
            <text x="80" y="240" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="serif">14</text>
            <text x="80" y="258" textAnchor="middle" fontSize="4.5" fill="#f5f5f7">AGED 14 YEARS</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#d4af37">{abv} • 700ml</text>
          </svg>
        );

      // 15. THE DALMORE 15 (Broad-Shouldered Bottle with Silver 12-Point Royal Stag)
      case 'dalmore-15':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="dalmore-mahogany" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#873e13" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#451804" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#873e13" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="silver-stag" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d9d9d9" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#9e9e9e" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="38" rx="2" fill="#e0e0e0" />
            {/* Broad-shouldered heavy bottle */}
            <path d="M 71 58 L 71 85 Q 40 105 38 140 L 44 338 Q 44 350 56 350 L 104 350 Q 116 350 116 338 L 122 140 Q 120 105 89 85 L 89 58 Z" fill="url(#dalmore-mahogany)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Iconic Mounted Silver Royal 12-point Stag */}
            <g transform="translate(80, 150) scale(1.1)">
              <path d="M 0 -8 L 3 2 L 0 5 L -3 2 Z" fill="url(#silver-stag)" />
              {/* Antlers */}
              <path d="M 0 -8 C 5 -18, 16 -18, 18 -8 M 12 -14 L 18 -18 M 8 -16 L 12 -22 M 0 -8 C -5 -18, -16 -18, -18 -8 M -12 -14 L -18 -18 M -8 -16 L -12 -22" stroke="url(#silver-stag)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
            {/* Lower Minimalist Black/Silver Label */}
            <rect x="46" y="205" width="68" height="85" rx="3" fill="#141414" stroke="#c0c0c0" strokeWidth="0.8" />
            <text x="80" y="224" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff" fontFamily="serif" letterSpacing="0.5">THE DALMORE</text>
            <circle cx="80" cy="245" r="12" fill="#ffffff" />
            <text x="80" y="250" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#141414" fontFamily="serif">15</text>
            <text x="80" y="268" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#c0c0c0">AGED FIFTEEN YEARS</text>
            <text x="80" y="280" textAnchor="middle" fontSize="5" fill="#ffffff">{abv} • 700ml</text>
          </svg>
        );

      // 16. OBAN 14 (Tall Classic Amber Bottle, Maritime Parchment Label)
      case 'oban-14':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="oban-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#d48a2c" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#8a4b08" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#d48a2c" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#cba135" />
            <path d="M 71 62 L 71 105 Q 60 125 48 145 L 48 338 Q 48 350 58 350 L 102 350 Q 112 350 112 338 L 112 145 Q 100 125 89 105 L 89 62 Z" fill="url(#oban-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="50" y="160" width="60" height="128" rx="2" fill="#faf6ed" stroke="#1d1d1f" strokeWidth="0.8" />
            <text x="80" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d1d1f" fontFamily="serif" letterSpacing="1">OBAN</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4.5" fill="#666666">WEST HIGHLAND MALT</text>
            <line x1="56" y1="195" x2="104" y2="195" stroke="#cba135" strokeWidth="0.8" />
            <circle cx="80" cy="216" r="13" fill="#1d1d1f" />
            <text x="80" y="221" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff" fontFamily="serif">14</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1d1d1f">LITTLE BAY OF CAVES</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4" fill="#666666">COASTAL MATURED</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1d1d1f">{abv} • 700ml</text>
          </svg>
        );

      // 17. AUCHENTOSHAN THREE WOOD
      case 'auchentoshan-three-wood':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="auchen-bronze" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#6e2d14" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#3d1405" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#6e2d14" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="40" rx="2" fill="#2d2d2d" />
            <rect x="70" y="52" width="20" height="6" fill="#c06c3a" />
            <path d="M 71 60 L 71 100 Q 56 125 46 148 L 46 338 Q 46 350 58 350 L 102 350 Q 114 350 114 338 L 114 148 Q 104 125 89 100 L 89 60 Z" fill="url(#auchen-bronze)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="48" y="160" width="64" height="125" rx="3" fill="#222222" stroke="#c06c3a" strokeWidth="1" />
            <text x="80" y="180" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" letterSpacing="0.5">AUCHENTOSHAN</text>
            <text x="80" y="195" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#c06c3a">THREE WOOD</text>
            <text x="80" y="208" textAnchor="middle" fontSize="4.5" fill="#cccccc">100% TRIPLE DISTILLED</text>
            <rect x="58" y="218" width="44" height="20" rx="2" fill="#c06c3a" />
            <text x="80" y="232" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#ffffff">BOURBON • PX • OLOROSO</text>
            <text x="80" y="254" textAnchor="middle" fontSize="4.5" fill="#999999">LOWLAND SINGLE MALT</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#ffffff">{abv} • 700ml</text>
          </svg>
        );

      // 18. GLENKINCHIE 12
      case 'glenkinchie-12':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="kinchie-straw" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#f5d76e" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#d4ac0d" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f5d76e" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#2d572c" />
            <path d="M 71 62 L 71 105 Q 60 125 48 145 L 48 338 Q 48 350 58 350 L 102 350 Q 112 350 112 338 L 112 145 Q 100 125 89 105 L 89 62 Z" fill="url(#kinchie-straw)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="50" y="160" width="60" height="128" rx="2" fill="#fcf9ee" stroke="#2d572c" strokeWidth="0.8" />
            <text x="80" y="180" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#2d572c" fontFamily="serif">GLENKINCHIE</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#1d1d1f">THE EDINBURGH MALT</text>
            <circle cx="80" cy="216" r="13" fill="#2d572c" />
            <text x="80" y="221" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff" fontFamily="serif">12</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1d1d1f">LOWLAND SINGLE MALT</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4" fill="#666666">FLORAL & FRESH</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#2d572c">{abv} • 700ml</text>
          </svg>
        );

      // 19. LOCHLEA OUR BARLEY (Textured Ribbed Heavy Bottle)
      case 'lochlea-our-barley':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="lochlea-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#f39c12" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#b9770e" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f39c12" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="40" rx="2" fill="#008080" />
            <rect x="70" y="52" width="20" height="6" fill="#c06c3a" />
            {/* Ribbed textured bottle */}
            <path d="M 71 60 L 71 100 Q 56 125 46 148 L 46 338 Q 46 350 58 350 L 102 350 Q 114 350 114 338 L 114 148 Q 104 125 89 100 L 89 60 Z" fill="url(#lochlea-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Tyre tread ribs on sides */}
            <line x1="48" y1="160" x2="48" y2="330" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="112" y1="160" x2="112" y2="330" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <rect x="52" y="170" width="56" height="110" rx="2" fill="#008080" stroke="#c06c3a" strokeWidth="1" />
            <text x="80" y="192" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff" letterSpacing="1">LOCHLEA</text>
            <text x="80" y="204" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#f5b041">OUR BARLEY</text>
            <text x="80" y="222" textAnchor="middle" fontSize="4.5" fill="#ffffff">FARM DISTILLERY • AYRSHIRE</text>
            <text x="80" y="238" textAnchor="middle" fontSize="4.5" fill="#f5b041">100% HOME GROWN</text>
            <text x="80" y="265" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#ffffff">{abv} • 700ml</text>
          </svg>
        );

      // 20. SPRINGBANK 10 (Stout Campbeltown Bottle, Black & Red Gothic Label)
      case 'springbank-10':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="springbank-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#e59866" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#a04000" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e59866" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#151515" />
            <rect x="70" y="54" width="20" height="5" fill="#c0392b" />
            <path d="M 71 62 L 71 100 Q 56 120 46 145 L 46 338 Q 46 350 58 350 L 102 350 Q 114 350 114 338 L 114 145 Q 104 120 89 100 L 89 62 Z" fill="url(#springbank-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Iconic Black Label with Red Gothic Title */}
            <rect x="49" y="160" width="62" height="130" rx="3" fill="#151515" stroke="#d4af37" strokeWidth="1" />
            <text x="80" y="180" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#e74c3c" fontFamily="serif">Springbank</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4.5" fill="#d4af37" letterSpacing="0.5">CAMPBELTOWN SINGLE MALT</text>
            <circle cx="80" cy="214" r="14" fill="#151515" stroke="#d4af37" strokeWidth="1.5" />
            <text x="80" y="220" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#d4af37" fontFamily="serif">10</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#ffffff">AGED 10 YEARS</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4" fill="#aaaaaa">2.5 TIMES DISTILLED</text>
            <text x="80" y="274" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#d4af37">{abv} • 700ml</text>
          </svg>
        );

      // 21. GLEN SCOTIA VICTORIANA
      case 'glen-scotia-victoriana':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="scotia-copper" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#873600" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#4d1a00" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#873600" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="40" rx="2" fill="#1a1a1a" />
            <rect x="70" y="52" width="20" height="6" fill="#d4af37" />
            <path d="M 71 60 L 71 100 Q 56 125 46 148 L 46 338 Q 46 350 58 350 L 102 350 Q 114 350 114 338 L 114 148 Q 104 125 89 100 L 89 60 Z" fill="url(#scotia-copper)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="48" y="160" width="64" height="125" rx="3" fill="#1a1a1a" stroke="#d4af37" strokeWidth="1" />
            <text x="80" y="178" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#d4af37" fontFamily="serif">GLEN SCOTIA</text>
            <text x="80" y="195" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff" letterSpacing="0.5">VICTORIANA</text>
            <text x="80" y="208" textAnchor="middle" fontSize="4.5" fill="#d4af37">DEEP CHAR OAK CASKS</text>
            <rect x="60" y="218" width="40" height="18" rx="2" fill="#d4af37" />
            <text x="80" y="230" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#1a1a1a">CASK STRENGTH</text>
            <text x="80" y="252" textAnchor="middle" fontSize="4.5" fill="#cccccc">CAMPBELTOWN HERITAGE</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#d4af37">{abv} • 700ml</text>
          </svg>
        );

      // 22. KILKERRAN 12
      case 'kilkerran-12':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="kilkerran-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#f5b041" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#ba4a00" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f5b041" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#2d3748" />
            <path d="M 71 62 L 71 105 Q 60 125 48 145 L 48 338 Q 48 350 58 350 L 102 350 Q 112 350 112 338 L 112 145 Q 100 125 89 105 L 89 62 Z" fill="url(#kilkerran-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="50" y="160" width="60" height="128" rx="2" fill="#ffffff" stroke="#2d3748" strokeWidth="0.8" />
            <text x="80" y="180" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2d3748" fontFamily="serif" letterSpacing="0.5">KILKERRAN</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4.5" fill="#666666">CAMPBELTOWN SINGLE MALT</text>
            <circle cx="80" cy="214" r="14" fill="#2d3748" />
            <text x="80" y="220" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff" fontFamily="serif">12</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#2d3748">GLENGYLE DISTILLERY</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4" fill="#666666">LIGHTLY PEATED</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#2d3748">{abv} • 700ml</text>
          </svg>
        );

      // 23. HIGHLAND PARK 12 (Norse Urnes Knotwork Embossed Bottle)
      case 'highland-park-12':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="hp-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#d35400" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#78281f" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#d35400" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="40" rx="2" fill="#1a1a1a" />
            <rect x="70" y="52" width="20" height="6" fill="#bdc3c7" />
            {/* Embossed Norse glass silhouette */}
            <path d="M 71 60 L 71 100 Q 56 125 46 148 L 46 338 Q 46 350 58 350 L 102 350 Q 114 350 114 338 L 114 148 Q 104 125 89 100 L 89 60 Z" fill="url(#hp-amber)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Norse Viking Urnes Dragon Embossing Motif */}
            <path d="M 54 135 Q 80 150 106 135 Q 80 120 54 135" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 52 300 Q 80 320 108 300" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
            {/* Shield-Shaped Black & Silver Label */}
            <path d="M 52 165 L 108 165 L 108 235 Q 80 260 52 235 Z" fill="#151515" stroke="#bdc3c7" strokeWidth="1" />
            <text x="80" y="180" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" letterSpacing="0.5">HIGHLAND PARK</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4" fill="#bdc3c7">ORKNEY ISLANDS</text>
            <text x="80" y="210" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff" fontFamily="serif">12</text>
            <text x="80" y="224" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#bdc3c7">VIKING HONOUR</text>
            <text x="80" y="238" textAnchor="middle" fontSize="4" fill="#aaaaaa">HEATHER PEAT</text>
            <text x="80" y="274" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#1d1d1f">{abv} • 700ml</text>
          </svg>
        );

      // 24. TALISKER 10 (Maritime Bottle, Sea Storm Map & Copper Foil)
      case 'talisker-10':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="talisker-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#e67e22" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#935116" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e67e22" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {/* Copper Foil Neck */}
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#d35400" />
            <rect x="70" y="54" width="20" height="5" fill="#f39c12" />
            <path d="M 71 62 L 71 105 Q 60 125 48 145 L 48 338 Q 48 350 58 350 L 102 350 Q 112 350 112 338 L 112 145 Q 100 125 89 105 L 89 62 Z" fill="url(#talisker-amber)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Coastal Map Label */}
            <rect x="50" y="160" width="60" height="128" rx="2" fill="#fbfcfc" stroke="#1b2631" strokeWidth="0.8" />
            <text x="80" y="180" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1b2631" fontFamily="serif" letterSpacing="0.5">TALISKER</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4.5" fill="#d35400">ISLE OF SKYE</text>
            <circle cx="80" cy="214" r="14" fill="#1b2631" />
            <text x="80" y="220" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#f39c12" fontFamily="serif">10</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1b2631">MADE BY THE SEA</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4" fill="#7f8c8d">MARITIME & BLACK PEPPER</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#1b2631">{abv} • 700ml</text>
          </svg>
        );

      // 25. ARRAN 10 (Contemporary Ribbed Base Bottle, Dual Gold Eagles)
      case 'arran-10':
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="arran-lemon-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#f7dc6f" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#d4ac0d" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f7dc6f" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#2c3e50" />
            <rect x="70" y="54" width="20" height="5" fill="#d4af37" />
            <path d="M 71 62 L 71 105 Q 60 125 48 145 L 48 338 Q 48 350 58 350 L 102 350 Q 112 350 112 338 L 112 145 Q 100 125 89 105 L 89 62 Z" fill="url(#arran-lemon-gold)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            {/* Dual Eagles Crest */}
            <circle cx="80" cy="142" r="8" fill="#d4af37" />
            <rect x="50" y="160" width="60" height="128" rx="2" fill="#ffffff" stroke="#2c3e50" strokeWidth="0.8" />
            <text x="80" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2c3e50" fontFamily="serif">Arran</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4.5" fill="#d4af37">ISLE OF ARRAN DISTILLERS</text>
            <circle cx="80" cy="214" r="14" fill="#2c3e50" />
            <text x="80" y="220" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#ffffff" fontFamily="serif">10</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#2c3e50">SINGLE MALT SCOTCH</text>
            <text x="80" y="250" textAnchor="middle" fontSize="4" fill="#7f8c8d">LOCHRANZA</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#2c3e50">{abv} • 700ml</text>
          </svg>
        );

      // Default Generic Authentic Scotch Bottle
      default:
        return (
          <svg viewBox="0 0 160 380" className="w-full h-full drop-shadow-md select-none">
            <defs>
              <linearGradient id="default-malt" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#e59866" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#a04000" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e59866" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <rect x="71" y="20" width="18" height="42" rx="2" fill="#1d1d1f" />
            <rect x="70" y="54" width="20" height="5" fill="#d4af37" />
            <path d="M 71 62 L 71 105 Q 60 125 48 145 L 48 338 Q 48 350 58 350 L 102 350 Q 112 350 112 338 L 112 145 Q 100 125 89 105 L 89 62 Z" fill="url(#default-malt)" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
            <rect x="50" y="160" width="60" height="128" rx="2" fill="#ffffff" stroke="#1d1d1f" strokeWidth="0.8" />
            <text x="80" y="180" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1d1d1f" fontFamily="serif">{distillery.slice(0, 14)}</text>
            <text x="80" y="190" textAnchor="middle" fontSize="4.5" fill="#86868b">{region} SINGLE MALT</text>
            <circle cx="80" cy="214" r="14" fill="#1d1d1f" />
            <text x="80" y="220" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="serif">{ageStatement.slice(0, 4)}</text>
            <text x="80" y="240" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#1d1d1f">{whiskyName.slice(0, 18)}</text>
            <text x="80" y="272" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#1d1d1f">{abv} • 700ml</text>
          </svg>
        );
    }
  };

  const imageToUse = imageSrc || whisky?.bottleImage;

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
      {/* If we have a valid photo and it hasn't failed, show the bottle image, with vector fallback on error */}
      {imageToUse && !imageFailed ? (
        <img
          src={imageToUse}
          alt={whiskyName}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className={`max-h-full max-w-full object-contain ${showShadow ? 'drop-shadow-lg' : ''}`}
          loading="lazy"
        />
      ) : (
        renderBottleVector()
      )}
    </div>
  );
};
