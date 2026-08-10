import React, { useState } from 'react';
import {
  Globe2, ArrowRight, Zap, CheckCircle2, FileCheck, Shield, Sparkles
} from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Card3D } from '../../components/Card3D';
import { sourcingSteps } from './servicesData';

interface CustomSourcingServiceProps {
  onOpenQuoteModal: () => void;
  delay?: number;
  content: Record<string, any>;
}

export const CustomSourcingService: React.FC<CustomSourcingServiceProps> = ({ onOpenQuoteModal, delay = 0, content }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = Array.isArray(content.sourcing_steps) && content.sourcing_steps.length ? content.sourcing_steps : sourcingSteps;
  const managedItems = typeof content.sourcing_manage_items_text === 'string' && content.sourcing_manage_items_text.trim()
    ? content.sourcing_manage_items_text.split('\n').map((item: string) => item.trim()).filter(Boolean)
    : [
        'Supplier research & factory background vetting',
        'Wholesale price negotiation & contract terms',
        'Physical sample inspection & lab testing',
        'GDCE customs clearance & Ministry certificates',
      ];
  const selectedStep = steps[Math.min(activeStep, steps.length - 1)] ?? sourcingSteps[0];

  return (
    <section className="space-y-6">

      {/* ─── Section Header ─── */}
      <ScrollReveal animation="up" delay={delay}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <span>{content.sourcing_badge ?? 'Service 02 — Custom B2B Procurement Desk'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {content.sourcing_title ?? 'Sourcing-as-a-Service'} <span className="text-emerald-600 dark:text-emerald-400">{content.sourcing_highlight ?? '(Factory Procurement)'}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {content.sourcing_desc ?? 'Need a custom product made abroad? UNT acts as your external procurement team — handling factory audits, price negotiation, sample inspection, freight, and GDCE customs clearance.'}
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="btn-shine px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 font-black text-sm shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 shrink-0 self-start transition-all hover:scale-105 active:scale-95"
          >
            <span>{content.sourcing_cta ?? 'Request Custom B2B Sourcing'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ScrollReveal>

      {/* ─── 5-Phase Roadmap Stepper ─── */}
      <ScrollReveal animation="up" delay={delay + 80}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-bold flex items-center gap-2 text-slate-500 dark:text-emerald-300/70 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              {content.sourcing_roadmap_title ?? '5-Phase Procurement Roadmap'}
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:block">{content.sourcing_roadmap_hint ?? 'Click any step'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {steps.map((step: any, idx: number) => (
              <Card3D key={step.num} intensity={10}>
                <button
                  onClick={() => setActiveStep(idx)}
                  style={{ animationDelay: `${idx * 70}ms` }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between h-28 animate-fade-in ${activeStep === idx
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500 shadow-lg scale-[1.03] z-10 font-bold'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-emerald-500 active:scale-95'
                    }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-lg font-black font-display ${activeStep === idx ? 'text-white dark:text-slate-950' : 'text-emerald-600 dark:text-emerald-400'}`}>{step.num}</span>
                    {activeStep === idx && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-snug">{step.title}</h4>
                    <p className={`text-[10px] ${activeStep === idx ? 'text-emerald-100 dark:text-slate-900/80' : 'text-slate-400 dark:text-slate-500'}`}>{step.subtitle}</p>
                  </div>
                </button>
              </Card3D>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Active Step Detail ─── */}
      <ScrollReveal animation="fade" delay={delay + 120}>
        <Card3D intensity={4}>
          <div className="p-6 rounded-2xl bg-emerald-50/80 dark:bg-slate-900/60 border border-emerald-200 dark:border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">{content.sourcing_phase_label ?? 'Phase'} {selectedStep.num} {content.sourcing_details_label ?? 'Details'}</span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{selectedStep.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">{selectedStep.desc}</p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              {content.sourcing_start_phase_label ?? 'Start Phase'} {selectedStep.num}
            </button>
          </div>
        </Card3D>
      </ScrollReveal>

      {/* ─── 2-Column Info Cards ─── */}
      <ScrollReveal animation="up" delay={delay + 160}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card3D intensity={6}>
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3 h-full">
              <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {content.sourcing_manage_title ?? 'What We Manage For You'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {managedItems.map((item: string) => <li key={item} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" /> {item}</li>)}
              </ul>
            </div>
          </Card3D>

          <Card3D intensity={6}>
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3 h-full">
              <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {content.sourcing_terms_title ?? 'Key Terms & MOQs'}
              </h4>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p><strong className="text-slate-900 dark:text-white">{content.sourcing_moq_label ?? 'Minimum Order Quantity:'}</strong> {content.sourcing_moq_value ?? 'Flexible and negotiated with our specialists based on product type.'}</p>
                <p><strong className="text-slate-900 dark:text-white">{content.sourcing_countries_label ?? 'Countries Covered:'}</strong> {content.sourcing_countries_value ?? 'Japan, South Korea, Malaysia, Vietnam, Laos, China.'}</p>
                <p><strong className="text-slate-900 dark:text-white">{content.sourcing_scope_label ?? 'Product Scope:'}</strong> {content.sourcing_scope_value ?? 'Food, Supplements, Skincare, Hair Care, Wellness, Household.'}</p>
              </div>
            </div>
          </Card3D>
        </div>
      </ScrollReveal>

    </section>
  );
};
