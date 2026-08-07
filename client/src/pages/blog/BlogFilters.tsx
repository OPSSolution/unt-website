import React from 'react';
import { Search, Filter, Sparkles, ShieldCheck, Factory, Truck, ShoppingCart } from 'lucide-react';

export const BLOG_CATEGORIES = [
  { id: 'All', label: 'All Reports', icon: Sparkles },
  { id: 'Regulatory Updates', label: 'Regulatory Updates', icon: ShieldCheck },
  { id: 'OEM Case Studies', label: 'OEM Case Studies', icon: Factory },
  { id: 'Supply Chain', label: 'Supply Chain', icon: Truck },
  { id: 'Retail Strategy', label: 'Retail Strategy', icon: ShoppingCart },
];

interface Props {
  selectedCategory: string;
  searchQuery: string;
  totalResultsCount: number;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
}

export function BlogFilters({
  selectedCategory,
  searchQuery,
  totalResultsCount,
  onCategoryChange,
  onSearchChange,
}: Props) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-5 text-left">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-xl">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <input
            type="search"
            aria-label="Search trade insights"
            placeholder="Search GDCE customs guides, FMCG market reports, or Ministry rules..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
          />
        </div>

        {/* Live Matching Counter & Filter Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{totalResultsCount} Verified Intelligence Briefings</span>
          </div>
        </div>
      </div>

      {/* Category Pills with Icons */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80" aria-label="Article categories">
        {BLOG_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.03]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Trending Topic Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trending Topics:</span>
        {[
          { tag: 'GDCECustoms2026', query: 'customs' },
          { tag: 'AKFTAPermits', query: 'AKFTA' },
          { tag: 'MoHCosmetics', query: 'MoH' },
          { tag: 'FMCGBulkPricing', query: 'FMCG' },
          { tag: 'PrivateLabelOEM', query: 'OEM' },
        ].map((item) => (
          <button
            key={item.tag}
            type="button"
            onClick={() => onSearchChange(item.query)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 font-mono text-[11px] font-medium border border-slate-200 dark:border-slate-800 transition-colors"
          >
            #{item.tag}
          </button>
        ))}
      </div>
    </div>
  );
}
