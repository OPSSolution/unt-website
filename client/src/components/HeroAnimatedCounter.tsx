import React, { useEffect, useRef, useState } from 'react';
import { Activity, ArrowUpRight, Award, Building2, CheckCircle2, Clock, DollarSign, Globe2, Layers, RotateCcw, ShieldCheck, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { useSalesBoost } from '../hooks/useSalesBoost';

export interface HeroStatItem {
  id: string;
  value: string;
  label: string;
  sort_order?: number;
}

interface HeroAnimatedCounterProps {
  stats: HeroStatItem[];
  className?: string;
  onQuote?: () => void;
}

interface ParsedStat {
  prefix: string;
  targetNumber: number;
  decimals: number;
  suffix: string;
  hasCommas: boolean;
  isNumeric: boolean;
}

const PRODUCTIVITY_STATS: HeroStatItem[] = [
  { id: 'savings', value: '18.4%', label: 'Avg Sourcing Cost Savings', sort_order: 1 },
  { id: 'speed', value: '24h', label: 'Express Clearance Speed', sort_order: 2 },
  { id: 'moq_flex', value: '85%', label: 'Flexible Wholesale MOQ Rate', sort_order: 3 },
  { id: 'quality', value: '99.9%', label: 'Quality Pass Rate SLA', sort_order: 4 },
];

const LIVE_ACTIVITIES = [
  { id: 1, text: 'Phnom Penh Buyer requested 500 units from Bangkok Hub', time: '2m ago' },
  { id: 2, text: 'Customs Clearance completed at Bavet Hub', time: '5m ago' },
  { id: 3, text: 'Audited Electronics Supplier verified in Guangzhou', time: '11m ago' },
  { id: 4, text: 'Direct Factory MOQ terms approved for Siem Reap Trade', time: '18m ago' },
];

function parseStatValue(raw: string): ParsedStat {
  if (!raw) {
    return { prefix: '', targetNumber: 0, decimals: 0, suffix: '', hasCommas: false, isNumeric: false };
  }

  const regex = /^([^0-9.]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/;
  const match = raw.trim().match(regex);

  if (!match) {
    return { prefix: '', targetNumber: 0, decimals: 0, suffix: raw, hasCommas: false, isNumeric: false };
  }

  const prefix = match[1] || '';
  const numStr = match[2] || '0';
  const suffix = match[3] || '';
  const hasCommas = numStr.includes(',');

  const cleanNumStr = numStr.replace(/,/g, '');
  const targetNumber = parseFloat(cleanNumStr);

  const decimalPart = cleanNumStr.split('.')[1];
  const decimals = decimalPart ? decimalPart.length : 0;

  return {
    prefix,
    targetNumber: isNaN(targetNumber) ? 0 : targetNumber,
    decimals,
    suffix,
    hasCommas,
    isNumeric: !isNaN(targetNumber),
  };
}

function useCountUp(target: number, decimals: number, hasCommas: boolean, durationMs = 2000, trigger: boolean = true) {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCurrentVal(0);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const val = target * easeProgress;
      setCurrentVal(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, durationMs, trigger]);

  if (target === 0) return '0';

  let formattedNum = currentVal.toFixed(decimals);
  if (hasCommas || target >= 1000) {
    const parts = formattedNum.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formattedNum = parts.join('.');
  }

  return formattedNum;
}

function getStatIcon(id?: string, label?: string) {
  const text = (id + ' ' + (label || '')).toLowerCase();
  if (text.includes('reseller') || text.includes('margin') || text.includes('profit')) {
    return <DollarSign className="w-5 h-5 text-emerald-400" />;
  }
  if (text.includes('trained') || text.includes('rep') || text.includes('team')) {
    return <Users className="w-5 h-5 text-blue-400" />;
  }
  if (text.includes('volume') || text.includes('trade') || text.includes('dollar') || text.includes('$') || text.includes('savings') || text.includes('sales')) {
    return <TrendingUp className="w-5 h-5 text-emerald-500" />;
  }
  if (text.includes('factory') || text.includes('supplier') || text.includes('audit')) {
    return <Building2 className="w-5 h-5 text-cyan-500" />;
  }
  if (text.includes('origin') || text.includes('global') || text.includes('country') || text.includes('network') || text.includes('lead')) {
    return <Globe2 className="w-5 h-5 text-blue-500" />;
  }
  if (text.includes('clearance') || text.includes('custom') || text.includes('speed') || text.includes('h')) {
    return <Clock className="w-5 h-5 text-emerald-400" />;
  }
  if (text.includes('quality') || text.includes('pass')) {
    return <CheckCircle2 className="w-5 h-5 text-amber-500" />;
  }
  return <Zap className="w-5 h-5 text-emerald-500" />;
}

function getStatBadge(id?: string, label?: string) {
  const text = (id + ' ' + (label || '')).toLowerCase();
  if (text.includes('margin') || text.includes('reseller')) return 'Dealer Margin';
  if (text.includes('sales') || text.includes('closed')) return 'Wholesale Closed';
  if (text.includes('trained') || text.includes('rep')) return 'Sales Training';
  if (text.includes('volume')) return 'YOY Growth';
  if (text.includes('savings')) return 'Direct ROI';
  if (text.includes('factory')) return 'Audited';
  if (text.includes('origin')) return 'ASEAN & EU';
  if (text.includes('clearance') || text.includes('speed')) return 'Fast Track';
  if (text.includes('quality')) return 'ISO 9001';
  return 'Verified';
}

function SingleCounterCard({ stat, index, isVisible, onQuote }: { stat: HeroStatItem; index: number; isVisible: boolean; onQuote?: () => void }) {
  const [key, setKey] = useState(0);
  const parsed = parseStatValue(stat.value);
  const animatedValueStr = useCountUp(parsed.targetNumber, parsed.decimals, parsed.hasCommas, 2000 + index * 150, isVisible);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setKey((prev) => prev + 1);
  };

  const icon = getStatIcon(stat.id, stat.label);
  const badgeText = getStatBadge(stat.id, stat.label);

  return (
    <div
      key={key}
      onClick={onQuote}
      className="group relative p-6 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-lg hover:shadow-2xl hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Top glow beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/80 to-emerald-500/0 opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/15 transition-all duration-500 pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 group-hover:scale-105 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
          {icon}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {badgeText}
          </span>
          <button
            onClick={handleReplay}
            title="Replay counter animation"
            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-emerald-500 transition-opacity p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Counter Display */}
      <div className="my-1">
        <div className="text-3xl sm:text-4xl xl:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-0.5">
          {parsed.isNumeric ? (
            <>
              {parsed.prefix && <span className="text-emerald-600 dark:text-emerald-400 text-2xl sm:text-3xl font-extrabold">{parsed.prefix}</span>}
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-emerald-100 dark:to-slate-100 bg-clip-text text-transparent">
                {animatedValueStr}
              </span>
              {parsed.suffix && <span className="text-emerald-600 dark:text-emerald-400 text-2xl sm:text-3xl font-extrabold ml-0.5">{parsed.suffix}</span>}
            </>
          ) : (
            <span className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stat.value}</span>
          )}
        </div>
      </div>

      {/* Stat Footer Label & Quick Action */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-snug">
          {stat.label}
        </p>
        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </div>
  );
}

export function HeroAnimatedCounter({ stats, className = '', onQuote }: HeroAnimatedCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [metricMode, setMetricMode] = useState<'sourcing' | 'productivity' | 'sales'>('sourcing');
  const [activityIdx, setActivityIdx] = useState(0);

  const { salesMetrics, recentDeals } = useSalesBoost();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Combined activity feed (Sourcing + Live Sales Deals)
  const combinedActivities = [
    ...LIVE_ACTIVITIES,
    ...recentDeals.map((deal) => ({
      id: deal.id,
      text: `🔥 ${deal.title} (${deal.amount}) closed by ${deal.location}`,
      time: deal.timeAgo,
    })),
  ];

  // Live Activity Stream ticker loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIdx((prev) => (prev + 1) % combinedActivities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [combinedActivities.length]);

  let activeStats = stats;
  if (metricMode === 'productivity') activeStats = PRODUCTIVITY_STATS;
  if (metricMode === 'sales') activeStats = salesMetrics;

  const currentActivity = combinedActivities[activityIdx] || combinedActivities[0];

  if (!stats || stats.length === 0) return null;

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* Productivity & Sales Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-slate-100/70 dark:bg-slate-900/70 p-2 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md">
        {/* Toggle Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-950 p-1 rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-800/50 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setMetricMode('sourcing')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              metricMode === 'sourcing'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sourcing Scale</span>
          </button>

          <button
            onClick={() => setMetricMode('productivity')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              metricMode === 'productivity'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Buyer SLA</span>
          </button>

          <button
            onClick={() => setMetricMode('sales')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              metricMode === 'sales'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Sales & Dealer Margin</span>
          </button>
        </div>

        {/* Live Activity Stream Ticker */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-emerald-500/20 text-xs font-medium w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] uppercase tracking-wider">Live</span>
          </div>
          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[260px] sm:max-w-[320px]">
            {currentActivity.text}
          </span>
          <span className="text-[10px] text-slate-400 font-mono ml-1">{currentActivity.time}</span>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {activeStats.map((stat, idx) => (
          <SingleCounterCard key={stat.id || idx} stat={stat} index={idx} isVisible={isVisible} onQuote={onQuote} />
        ))}
      </div>
    </div>
  );
}
