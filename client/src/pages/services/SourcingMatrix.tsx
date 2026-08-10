import React, { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Card3D } from '../../components/Card3D';
import { sourcingMatrixRows } from './servicesData';

interface SourcingMatrixProps {
  delay?: number;
  content: Record<string, any>;
}
export const SourcingMatrix: React.FC<SourcingMatrixProps> = ({ delay = 0, content }) => {
  const [matrixView, setMatrixView] = useState<'unt' | 'traditional'>('unt');
  const matrixRows = Array.isArray(content.matrix_rows) && content.matrix_rows.length ? content.matrix_rows : sourcingMatrixRows;

  return (
    <section className="space-y-6">

      {/* ─── Section Header ─── */}
      <ScrollReveal animation="up" delay={delay}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
              {content.matrix_badge ?? 'Comparative Sourcing Matrix'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {content.matrix_title ?? 'Why Businesses Choose'} <span className="text-emerald-600 dark:text-emerald-400">{content.matrix_highlight ?? 'UNT Sourcing'}</span>
            </h2>
          </div>

          <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 shrink-0">
            <button
              onClick={() => setMatrixView('unt')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${matrixView === 'unt'
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {content.matrix_unt_tab ?? 'UNT Ecosystem'}
            </button>
            <button
              onClick={() => setMatrixView('traditional')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${matrixView === 'traditional'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {content.matrix_traditional_tab ?? 'Traditional / Self-Import'}
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Matrix Cards (one per row instead of table) ─── */}
      <ScrollReveal animation="up" delay={delay + 80}>
        <div className="space-y-3">
          {matrixRows.map((row: any, idx: number) => (
            <Card3D key={idx} intensity={6}>
              <div
                style={{ animationDelay: `${idx * 60}ms` }}
                className={`p-5 rounded-2xl border transition-all animate-fade-in grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.5fr] gap-4 items-center ${matrixView === 'unt'
                    ? 'bg-white dark:bg-emerald-950/30 border-emerald-200/60 dark:border-emerald-500/20'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'
                  }`}
              >
                {/* Feature name */}
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  {row.feature}
                </div>
                {/* UNT column */}
                <div className={`text-xs font-medium rounded-xl p-3 ${matrixView === 'unt'
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20'
                    : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-transparent'
                  }`}>
                  <span className="text-[9px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-1">UNT</span>
                  {row.unt}
                </div>
                {/* Traditional column */}
                <div className={`text-xs font-medium rounded-xl p-3 ${matrixView === 'traditional'
                    ? 'bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-500/20'
                    : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-500 border border-transparent'
                  }`}>
                  <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 block mb-1">Traditional</span>
                  {row.traditional}
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </ScrollReveal>

    </section>
  );
};
