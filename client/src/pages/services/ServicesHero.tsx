import React from 'react';
import { Sparkles, Layers, ShoppingBag, Globe2, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';

export type ServiceTab = 'all' | 'product-sales' | 'sourcing' | 'training';

interface ServicesHeroProps {
  activeTab: ServiceTab;
  setActiveTab: (tab: ServiceTab) => void;
  content: Record<string, string>;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ activeTab, setActiveTab, content }) => {
  return (
    <section className="relative z-10 py-20 lg:py-24 bg-transparent border-b border-emerald-500/10 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      {/* 3D Hex-Grid Canvas Background (Uniform across all pages) */}

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966910_1px,transparent_1px),linear-gradient(to_bottom,#05966910_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40 dark:opacity-50" />

      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-emerald-500/15 dark:bg-emerald-500/25 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-emerald-600/10 dark:bg-teal-600/20 blur-[130px] rounded-full" />
      </div>

      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md animate-gentle-float">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>{content.badge ?? 'UNT Integrated Business Ecosystem'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.1]">
            <ScrollTextReveal text={`${content.headline ?? '3 Distinct Solutions to Scale'} ${content.headline_highlight ?? 'Your Enterprise'}`} mode="codepen-title" />
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            {content.subheadline ?? 'Each service is tailored with a dedicated workflow, operational structure, and support model for maximum business efficiency.'}
          </p>

          {/* Filter Pills with improved hover & active states */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'all', label: content.tab_all ?? 'All Services', icon: Layers },
              { id: 'product-sales', label: content.tab_product ?? '01. Product Sales', icon: ShoppingBag },
              { id: 'sourcing', label: content.tab_sourcing ?? '02. Sourcing-as-a-Service', icon: Globe2 },
              { id: 'training', label: content.tab_training ?? '03. Sales Training', icon: GraduationCap },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ServiceTab)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-sm ${
                    isActive
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                      : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-slate-800 active:scale-95'
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-white dark:text-slate-950' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
};
