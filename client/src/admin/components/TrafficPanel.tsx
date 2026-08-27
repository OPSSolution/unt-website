import React, { useEffect, useState } from 'react';
import { Globe2, TrendingUp, UserPlus, Repeat } from 'lucide-react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';

interface Breakdown {
  daily: { date: string; visits: number }[];
  countries: { country: string; visits: number }[];
  newVisitors: number;
  returningVisitors: number;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function last30Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }
  return days;
}

function formatDay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${MONTH_LABELS[month - 1]} ${day}, ${year}`;
}

const regionNames = typeof Intl !== 'undefined' && 'DisplayNames' in Intl
  ? new Intl.DisplayNames(['en'], { type: 'region' })
  : null;

function countryLabel(code: string): string {
  if (code === 'Unknown' || code.length !== 2) return 'Unknown';
  try { return regionNames?.of(code) ?? code; } catch { return code; }
}

export function TrafficPanel() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<Breakdown | null>(null);

  useEffect(() => {
    if (!token) return;
    api.getSiteStatsBreakdown(token).then(setData).catch(() => {});
  }, [token]);

  if (!data) return null;

  const visitsByDay = new Map(data.daily.map((d) => [d.date, d.visits]));
  const series = last30Days().map((date) => ({ date, visits: visitsByDay.get(date) ?? 0 }));
  const maxDaily = Math.max(1, ...series.map((d) => d.visits));

  const totalTyped = data.newVisitors + data.returningVisitors;
  const newPct = totalTyped === 0 ? 0 : Math.round((data.newVisitors / totalTyped) * 100);

  const topCountries = data.countries.slice(0, 6);
  const maxCountry = Math.max(1, ...topCountries.map((c) => c.visits));

  return (
    <div className="rounded-2xl stripe-glass-card p-6 space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Website Traffic</h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">Last 30 days</span>
      </div>

      {/* Daily trend */}
      <div className="flex items-end gap-[3px] h-16" role="img" aria-label="Daily visits over the last 30 days">
        {series.map((d) => (
          <div
            key={d.date}
            className="flex-1 min-w-0 bg-emerald-500 dark:bg-emerald-400 rounded-t-[4px] transition-colors hover:bg-emerald-600 dark:hover:bg-emerald-300"
            style={{ height: `${Math.max(2, (d.visits / maxDaily) * 100)}%` }}
            title={`${formatDay(d.date)}: ${d.visits.toLocaleString()} visit${d.visits === 1 ? '' : 's'}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* New vs returning */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <UserPlus className="w-3 h-3" />New
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{data.newVisitors.toLocaleString()}</div>
            </div>
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <Repeat className="w-3 h-3" />Returning
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{data.returningVisitors.toLocaleString()}</div>
            </div>
          </div>
          {totalTyped > 0 && (
            <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <div className="bg-emerald-500 dark:bg-emerald-400" style={{ width: `${newPct}%` }} title={`New: ${newPct}%`} />
              <div className="w-0.5 bg-white dark:bg-slate-900 shrink-0" />
              <div className="flex-1 bg-slate-400 dark:bg-slate-600" title={`Returning: ${100 - newPct}%`} />
            </div>
          )}
        </div>

        {/* Top countries */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            <Globe2 className="w-3 h-3" />Top Countries
          </div>
          {topCountries.length === 0 && <div className="text-xs text-slate-400 dark:text-slate-500">No data yet.</div>}
          {topCountries.map((c) => (
            <div key={c.country} className="flex items-center gap-2 text-xs">
              <span className="w-24 shrink-0 truncate text-slate-600 dark:text-slate-300" title={countryLabel(c.country)}>
                {countryLabel(c.country)}
              </span>
              <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full" style={{ width: `${(c.visits / maxCountry) * 100}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right font-semibold text-slate-900 dark:text-white">{c.visits}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
