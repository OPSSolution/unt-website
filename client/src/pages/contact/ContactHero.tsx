import React from 'react';
import { Sparkles, Clock, MessageSquare, Zap } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Interactive3DBg } from '../../components/Interactive3DBg';
import type { ContactContent } from './types';

export function ContactHero({ content }: { content: ContactContent }) {
  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 bg-white dark:bg-[#070A10] text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      {/* 3D Floating Canvas Background */}
      <Interactive3DBg variant="cubes" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-6">
          
          {/* Top Live Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{content.badge ?? 'Direct B2B Communication Portal'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Avg Response &lt; 4 Hours</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Phnom Penh HQ Desk Online</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500">UNT Company</span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed pt-1">
            {content.subheadline ?? 'Whether you require factory procurement, OEM private label manufacturing, customs clearance consultation, or B2B sales training for your commercial team.'}
          </p>

          {/* Quick Action Navigation Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToForm}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-display font-bold text-xs flex items-center gap-2 shadow-xl shadow-emerald-600/20 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Direct Inquiry</span>
            </button>

            <a
              href="https://t.me/untsourcing"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all hover:scale-105 shadow-sm"
            >
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Telegram Support (@untsourcing)</span>
            </a>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
