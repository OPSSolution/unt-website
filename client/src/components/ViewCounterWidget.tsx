import React from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { useTotalVisits } from '../hooks/useSiteStats';

export function ViewCounterWidget() {
  const totalVisits = useTotalVisits();
  if (totalVisits === null) return null;

  return (
    <div
      role="status"
      aria-label={`${totalVisits.toLocaleString()} site views`}
      className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40 flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 shadow-sm backdrop-blur-md animate-gentle-float"
    >
      <Sparkles className="w-3.5 h-3.5 shrink-0 animate-spin" />
      <Eye className="w-3.5 h-3.5 shrink-0" />
      <span className="text-sm font-bold tabular-nums">{totalVisits.toLocaleString()}</span>
    </div>
  );
}
