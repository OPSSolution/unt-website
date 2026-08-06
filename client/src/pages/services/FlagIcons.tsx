import React from 'react';

// Crisp SVG Country Flag Logo Components (cross-platform OS compatible)
export const FlagJapan: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" className={`${className} shrink-0 drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <circle cx="32" cy="32" r="14" fill="#BC002D" />
  </svg>
);

export const FlagKorea: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" className={`${className} shrink-0 drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <mask id="kr-mask-v6">
      <circle cx="32" cy="32" r="29" fill="#FFFFFF" />
    </mask>
    <g mask="url(#kr-mask-v6)">
      <g transform="rotate(-30 32 32)">
        <path d="M17 32 A 15 15 0 0 1 47 32 A 7.5 7.5 0 0 1 32 32 A 7.5 7.5 0 0 0 17 32 Z" fill="#CD2E3A" />
        <path d="M47 32 A 15 15 0 0 1 17 32 A 7.5 7.5 0 0 1 32 32 A 7.5 7.5 0 0 0 47 32 Z" fill="#0047A0" />
      </g>
      <rect x="15" y="16" width="10" height="2" transform="rotate(-45 15 16)" fill="#111827" />
      <rect x="17" y="18" width="10" height="2" transform="rotate(-45 17 18)" fill="#111827" />
      <rect x="19" y="20" width="10" height="2" transform="rotate(-45 19 20)" fill="#111827" />
      <rect x="41" y="42" width="4.5" height="2" transform="rotate(-45 41 42)" fill="#111827" />
      <rect x="46" y="47" width="4.5" height="2" transform="rotate(-45 46 47)" fill="#111827" />
      <rect x="39" y="44" width="4.5" height="2" transform="rotate(-45 39 44)" fill="#111827" />
      <rect x="44" y="49" width="4.5" height="2" transform="rotate(-45 44 49)" fill="#111827" />
      <rect x="37" y="46" width="4.5" height="2" transform="rotate(-45 37 46)" fill="#111827" />
      <rect x="42" y="51" width="4.5" height="2" transform="rotate(-45 42 51)" fill="#111827" />
      <rect x="39" y="14" width="4.5" height="2" transform="rotate(45 39 14)" fill="#111827" />
      <rect x="44" y="19" width="4.5" height="2" transform="rotate(45 44 19)" fill="#111827" />
      <rect x="41" y="16" width="10" height="2" transform="rotate(45 41 16)" fill="#111827" />
      <rect x="43" y="18" width="4.5" height="2" transform="rotate(45 43 18)" fill="#111827" />
      <rect x="48" y="23" width="4.5" height="2" transform="rotate(45 48 23)" fill="#111827" />
      <rect x="15" y="38" width="10" height="2" transform="rotate(45 15 38)" fill="#111827" />
      <rect x="17" y="40" width="4.5" height="2" transform="rotate(45 17 40)" fill="#111827" />
      <rect x="22" y="45" width="4.5" height="2" transform="rotate(45 22 45)" fill="#111827" />
      <rect x="19" y="42" width="10" height="2" transform="rotate(45 19 42)" fill="#111827" />
    </g>
  </svg>
);

export const FlagMalaysia: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" className={`${className} shrink-0 drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <mask id="my-mask-v6">
      <circle cx="32" cy="32" r="29" fill="#FFFFFF" />
    </mask>
    <g mask="url(#my-mask-v6)">
      <rect x="0" y="2" width="64" height="4.4" fill="#CC0000" />
      <rect x="0" y="6.4" width="64" height="4.4" fill="#FFFFFF" />
      <rect x="0" y="10.8" width="64" height="4.4" fill="#CC0000" />
      <rect x="0" y="15.2" width="64" height="4.4" fill="#FFFFFF" />
      <rect x="0" y="19.6" width="64" height="4.4" fill="#CC0000" />
      <rect x="0" y="24" width="64" height="4.4" fill="#FFFFFF" />
      <rect x="0" y="28.4" width="64" height="4.4" fill="#CC0000" />
      <rect x="0" y="32.8" width="64" height="4.4" fill="#FFFFFF" />
      <rect x="0" y="37.2" width="64" height="4.4" fill="#CC0000" />
      <rect x="0" y="41.6" width="64" height="4.4" fill="#FFFFFF" />
      <rect x="0" y="46" width="64" height="4.4" fill="#CC0000" />
      <rect x="0" y="50.4" width="64" height="4.4" fill="#FFFFFF" />
      <rect x="0" y="54.8" width="64" height="4.4" fill="#CC0000" />
      <rect x="0" y="59.2" width="64" height="4.8" fill="#FFFFFF" />
      <rect x="0" y="0" width="34" height="35" fill="#000066" />
      <circle cx="16" cy="17.5" r="8.5" fill="#FFCC00" />
      <circle cx="19" cy="17.5" r="7" fill="#000066" />
      <polygon points="26,17.5 24,19 24.5,16.5 22.5,15 25,15 26,12.5 27,15 29.5,15 27.5,16.5 28,19" fill="#FFCC00" />
    </g>
  </svg>
);

export const FlagVietnam: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" className={`${className} shrink-0 drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#DA251D" stroke="#CBD5E1" strokeWidth="1" />
    <polygon points="32,15 36.5,25.5 48,26.5 39.5,34 42,45 32,39.5 22,45 24.5,34 16,26.5 27.5,25.5" fill="#FFFF00" />
  </svg>
);

export const FlagLaos: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" className={`${className} shrink-0 drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
    <mask id="laos-mask-v6">
      <circle cx="32" cy="32" r="29" fill="#FFFFFF" />
    </mask>
    <g mask="url(#laos-mask-v6)">
      <rect x="0" y="0" width="64" height="16" fill="#CE1126" />
      <rect x="0" y="16" width="64" height="32" fill="#002868" />
      <rect x="0" y="48" width="64" height="16" fill="#CE1126" />
      <circle cx="32" cy="32" r="11" fill="#FFFFFF" />
    </g>
  </svg>
);

export const FlagChina: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" className={`${className} shrink-0 drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#DE2910" stroke="#CBD5E1" strokeWidth="1" />
    <polygon points="20,13 22,18 27,18 23,21 25,26 20,23 15,26 17,21 13,18 18,18" fill="#FFDE00" />
    <polygon points="30,12 31,14 33,14 31.5,15 32,17 30,16 28,17 28.5,15 27,14 29,14" fill="#FFDE00" />
    <polygon points="34,17 35,19 37,19 35.5,20 36,22 34,21 32,22 32.5,20 31,19 33,19" fill="#FFDE00" />
    <polygon points="34,24 35,26 37,26 35.5,27 36,29 34,28 32,29 32.5,27 31,26 33,26" fill="#FFDE00" />
    <polygon points="30,29 31,31 33,31 31.5,32 32,34 30,33 28,34 28.5,32 27,31 29,31" fill="#FFDE00" />
  </svg>
);
