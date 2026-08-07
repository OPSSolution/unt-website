import React from 'react';
import { Sparkles, Video, ArrowDown, Calendar } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';

type Content = Record<string, string>;
const FALLBACK_VALUES = ['1,200+', '4.9 / 5.0', '15+', '34%'];
const FALLBACK_LABELS = ['Professionals Certified', 'Average Course Rating', 'Senior Trade Instructors', 'Avg 90-Day Conversion Lift'];

interface TrainingHeroProps {
  content: Content;
  onOpenQuoteModal?: () => void;
  onExploreGallery?: () => void;
}

export function TrainingHero({ content, onOpenQuoteModal, onExploreGallery }: TrainingHeroProps) {
  const scrollToContent = () => {
    const el = document.getElementById('activity-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onExploreGallery) {
      onExploreGallery();
    }
  };

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
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md animate-gentle-float">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>{content.badge ?? 'UNT Trade Capacity Building Institute'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-5xl mx-auto">
            <ScrollTextReveal text={content.headline ?? 'Mastering the Art of Global Commerce'} mode="codepen-title" />
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            {content.subheadline ?? "Elevate your commercial team's B2B negotiation skills, buyer psychology, key account retention, and international supply chain management with hands-on activity bootcamps."}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToContent}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <Video className="w-4 h-4" />
              <span>{content.hero_gallery_cta ?? 'Explore Live Activity & Media Gallery'}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            {onOpenQuoteModal && (
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-display font-bold text-sm border border-slate-300 dark:border-slate-700 shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{content.hero_reserve_cta ?? 'Reserve Corporate Masterclass'}</span>
              </button>
            )}
          </div>

          {/* Key Metrics Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {FALLBACK_VALUES.map((fallback, index) => (
              <div key={fallback} className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-display font-black text-emerald-600 dark:text-emerald-400">
                  {content[`stat${index + 1}_value`] ?? fallback}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                  {content[`stat${index + 1}_label`] ?? FALLBACK_LABELS[index]}
                </div>
              </div>
            ))}
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
