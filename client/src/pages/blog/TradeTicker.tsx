import React, { useState } from 'react';
import { BellRing, Play, Pause, ChevronRight, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface TickerItem {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  date: string;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: '1',
    tag: 'GDCE ALERT',
    tagColor: 'bg-red-500 text-white',
    title: 'GDCE Customs Notice: 2026 Updated Harmonized Tariff Codes for Skincare & FMCG Importers Released',
    date: 'August 2026',
  },
  {
    id: '2',
    tag: 'MINISTRY UPDATE',
    tagColor: 'bg-emerald-600 text-white',
    title: 'Ministry of Commerce Launches New Fast-Track E-Commerce & Distribution License Portal',
    date: 'August 2026',
  },
  {
    id: '3',
    tag: 'AKFTA TARIFF',
    tagColor: 'bg-blue-600 text-white',
    title: 'ASEAN-Korea FTA Exemption: 0% Customs Tariff Qualified for Certified Korean Cosmetics',
    date: 'July 2026',
  },
  {
    id: '4',
    tag: 'HEALTH MINISTRY',
    tagColor: 'bg-amber-600 text-white',
    title: 'MoH Cambodia Updates Mandatory Khmer Sticker Compliance Rules for Import Wholesale',
    date: 'July 2026',
  },
];

export const TradeTicker: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const item = TICKER_ITEMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
  };

  return (
    <div className="bg-slate-950 border-y border-emerald-500/30 py-2.5 px-4 text-xs text-white">
      <div className="max-w-[1700px] w-full mx-auto flex items-center justify-between gap-4">
        {/* Live Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-bold text-emerald-400 uppercase tracking-widest text-[10px] hidden sm:inline">
            Live Bulletin:
          </span>
        </div>

        {/* Ticker Content */}
        <div className="flex-1 flex items-center gap-3 overflow-hidden text-left">
          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0 ${item.tagColor}`}>
            {item.tag}
          </span>
          <p className="text-slate-200 truncate text-xs font-medium hover:text-emerald-300 transition-colors cursor-pointer" onClick={handleNext}>
            {item.title}
          </p>
          <span className="text-[10px] text-slate-500 hidden md:inline shrink-0 font-mono">• {item.date}</span>
        </div>

        {/* Ticker Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white transition-colors"
            title={isPlaying ? 'Pause Ticker' : 'Play Ticker'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
