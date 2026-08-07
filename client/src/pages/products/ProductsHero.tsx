import React from 'react';
import { Sparkles } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';

interface Props {
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export function ProductsHero({ badge, headline, subheadline }: Props) {
  return (
    <section className="relative z-10 py-20 lg:py-24 bg-transparent border-b border-emerald-500/10 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      {/* 3D Hex-Grid Canvas Background */}

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966910_1px,transparent_1px),linear-gradient(to_bottom,#05966910_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40 dark:opacity-50" />

      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-emerald-500/15 dark:bg-emerald-500/25 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-emerald-600/10 dark:bg-teal-600/20 blur-[130px] rounded-full" />
      </div>

      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-5">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md animate-gentle-float">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>{badge ?? 'Verified B2B Wholesale & OEM Products'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-5xl mx-auto">
            <ScrollTextReveal text={headline ?? 'Verified Global Wholesale Catalog'} mode="codepen-title" />
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            {subheadline ?? 'Direct-from-factory imported goods pre-audited for Cambodian Ministry compliance, Khmer labeling standards, and volume trade distribution.'}
          </p>

        </div>
      </ScrollReveal>
    </section>
  );
}
