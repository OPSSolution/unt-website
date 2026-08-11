import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, BarChart3, Info } from 'lucide-react';
import { Card3D } from './Card3D';
import { useLanguage } from '../i18n/LanguageContext';

interface MetricItem {
  label: string;
  value: string;
}

interface PillarCardProps {
  pillarNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badgeText: string;
  actionText: string;
  bullets: string[];
  metrics: MetricItem[];
  onClick: () => void;
}

export const PillarCard: React.FC<PillarCardProps> = ({
  pillarNumber,
  title,
  description,
  icon,
  badgeText,
  actionText,
  bullets,
  metrics,
  onClick,
}) => {
  const { language } = useLanguage();
  const isKm = language === 'km';
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics'>('overview');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Card3D intensity={14} onClick={onClick}>
      <div
        onMouseMove={handleMouseMove}
        onClick={onClick}
        className="group relative cursor-pointer p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200/90 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-emerald-400/90 dark:hover:border-emerald-400/70 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full isolate"
      >
        {/* Specular Top-Edge Glass Glare Highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 dark:via-emerald-400/50 to-transparent pointer-events-none" />

        {/* Radial Mouse Spotlight Glow Overlay */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.14), transparent 40%)`,
          }}
        />

        <div className="relative z-10 space-y-3 sm:space-y-4">
          {/* Top Row: Icon Container + Live Pulse Badge */}
          <div className="flex items-center justify-between gap-3 h-12 sm:h-14">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-600/30 transition-all duration-500 shrink-0">
              {icon}
            </div>

            {/* Live Badge — whitespace-nowrap prevents line wrapping */}
            <div className="live-pulse-badge shrink-0 whitespace-nowrap text-[10px] sm:text-xs">
              <span className="live-pulse-dot" />
              <span>{badgeText}</span>
            </div>
          </div>

          {/* Title Block with Uniform Height for Perfect Alignment */}
          <div className="space-y-1 min-h-0 sm:min-h-[80px] flex flex-col justify-end">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              {pillarNumber}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
              {title}
            </h3>
          </div>

          {/* Sub-Tab Switcher Row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 dark:border-slate-800/80">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {isKm ? 'របៀបកាត' : 'Card Mode'}
            </span>
            <div className="flex items-center p-0.5 sm:p-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-[10px] sm:text-[11px] font-bold">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('overview');
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all duration-300 flex items-center space-x-1 cursor-pointer ${activeTab === 'overview'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <Info className="w-3 h-3" />
                <span>{isKm ? 'ទិដ្ឋភាពទូទៅ' : 'Overview'}</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('metrics');
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all duration-300 flex items-center space-x-1 cursor-pointer ${activeTab === 'metrics'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>{isKm ? 'បច្ចេកទេស' : 'Specs'}</span>
              </button>
            </div>
          </div>

          {/* Transitionable Content Area (Overview vs Metrics) */}
          <div className="min-h-[140px] sm:min-h-[160px] relative">
            {/* Overview Tab Content */}
            <div
              className={`transition-all duration-400 space-y-3 sm:space-y-4 ${activeTab === 'overview'
                  ? 'opacity-100 translate-y-0 relative z-10'
                  : 'opacity-0 translate-y-2 absolute inset-0 pointer-events-none'
                }`}
            >
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                {description}
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs / Metrics Tab Content */}
            <div
              className={`transition-all duration-400 space-y-3 ${activeTab === 'metrics'
                  ? 'opacity-100 translate-y-0 relative z-10'
                  : 'opacity-0 translate-y-2 absolute inset-0 pointer-events-none'
                }`}
            >
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {isKm ? 'ចំណុចលេចធ្លោនៃការប្រតិបត្តិការ' : 'Operational Highlights'}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-0.5"
                  >
                    <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      {metric.label}
                    </div>
                    <div className="text-xs sm:text-sm font-display font-extrabold text-emerald-600 dark:text-emerald-400">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Explicit Animated Interactive Action Footer Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="relative z-20 pt-6 mt-4 border-t border-slate-100/90 dark:border-slate-800/90 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 w-full cursor-pointer focus:outline-none text-left"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            {actionText}
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 group-hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </Card3D>
  );
};
