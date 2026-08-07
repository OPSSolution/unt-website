import React, { useState } from 'react';
import {
  GraduationCap, ArrowRight, Video, Users, Target, Building2, CheckCircle2, Sparkles
} from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Card3D } from '../../components/Card3D';

interface SalesTrainingServiceProps {
  onOpenQuoteModal: () => void;
  delay?: number;
  content: Record<string, string>;
}

export const SalesTrainingService: React.FC<SalesTrainingServiceProps> = ({ onOpenQuoteModal, delay = 0, content }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('In-Person Workshops');

  return (
    <section className="space-y-6">

      {/* ─── Section Header ─── */}
      <ScrollReveal animation="up" delay={delay}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <span>{content.training_badge ?? 'Service 03 — Sales Academy & Ecosystem'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {content.training_title ?? 'Sales Training &'} <span className="text-emerald-600 dark:text-emerald-400">{content.training_highlight ?? 'Ecosystem Enablement'}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {content.training_desc ?? "Transform your sales team into high-revenue closer teams. We teach real-world customer psychology, objection handling, and negotiation — backed by UNT's complete sourcing and digital branding ecosystem."}
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="btn-shine px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 font-black text-sm shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 shrink-0 self-start transition-all hover:scale-105 active:scale-95"
          >
            <span>{content.training_cta ?? 'Book Team Consultation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ScrollReveal>

      {/* ─── Delivery Format Cards ─── */}
      <ScrollReveal animation="up" delay={delay + 80}>
        <div className="space-y-3">
          <h3 className="text-sm font-display font-bold text-slate-500 dark:text-emerald-300/70 flex items-center gap-2 uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            Choose Your Delivery Format
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'In-Person Workshops', icon: Users, desc: 'Interactive hands-on roleplay sessions at your Phnom Penh office or UNT venue.' },
              { title: 'Live Interactive Online', icon: Video, desc: 'Flexible remote modules for distributed sales teams across Cambodian provinces.' },
              { title: 'Hybrid Mentorship', icon: GraduationCap, desc: 'Combines intensive 1-day live bootcamp with 3 months of ongoing coaching.' },
            ].map((fmt, idx) => {
              const FmtIcon = fmt.icon;
              const isSel = selectedFormat === fmt.title;
              return (
                <Card3D key={fmt.title} intensity={8}>
                  <button
                    onClick={() => setSelectedFormat(fmt.title)}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    className={`w-full p-5 rounded-2xl text-left border transition-all space-y-3 animate-fade-in ${isSel
                        ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500 shadow-lg scale-[1.02] font-bold'
                        : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-emerald-500 active:scale-95'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSel ? 'bg-white/20 dark:bg-slate-950/20' : 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'}`}>
                        <FmtIcon className="w-4 h-4" />
                      </div>
                      {isSel && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-950/80 text-emerald-900 dark:text-emerald-300">Active</span>}
                    </div>
                    <h4 className="font-bold text-sm">{fmt.title}</h4>
                    <p className={`text-xs leading-relaxed ${isSel ? 'text-emerald-100 dark:text-slate-900/80' : 'text-slate-500 dark:text-slate-400'}`}>{fmt.desc}</p>
                  </button>
                </Card3D>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* ─── 2 Pillar Detail Cards ─── */}
      <ScrollReveal animation="up" delay={delay + 140}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card3D intensity={5}>
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4 h-full">
              <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Curriculum & Training Modules
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Sales Fundamentals & High-Impact Mindset</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Customer Psychology & Communication Scripts</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Overcoming Tough Customer Objections</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Strategic Negotiation & Closing Techniques</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Client Retention & Re-order Follow-up</li>
              </ul>
            </div>
          </Card3D>

          <Card3D intensity={5}>
            <div className="p-6 rounded-2xl bg-emerald-50/80 dark:bg-slate-900/60 border border-emerald-200 dark:border-emerald-500/30 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> The UNT Ecosystem Advantage
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Unlike generic training courses, UNT provides an active commercial ecosystem so your sales team learns with real products, real supply chains, and digital branding assets:
                </p>
                <div className="space-y-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 pt-1">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Direct Access to Overseas Sourcing & Freight</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Production House for Digital Branding & Ads</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> Active B2B & Retail Sales Team Frameworks</div>
                </div>
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 font-black text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95"
              >
                Consult With Our Sales Director
              </button>
            </div>
          </Card3D>
        </div>
      </ScrollReveal>

    </section>
  );
};
