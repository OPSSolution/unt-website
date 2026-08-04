import React from 'react';
import { PageTab } from '../types';
import { SOURCING_STEPS } from '../data/mockData';
import { SourcingCalculator } from '../components/SourcingCalculator';
import { ShieldCheck, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card3D } from '../components/Card3D';

interface ServicesPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      {/* 1. Hero */}
      <section className="relative py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <ScrollReveal animation="up">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
              End-to-End Procurement Infrastructure
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">
              Integrated Global <span className="emerald-gradient-text">Trading Solutions</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              From factory-direct auditing and private label OEM formulation to Ministry permits, GDCE customs clearance, and door-to-door logistics in Cambodia.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Sourcing-as-a-Service 5 Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal animation="up">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
              Methodology
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              The UNT Sourcing-as-a-Service Process
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              We simplify global procurement into five fully transparent, risk-managed stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6">
            {SOURCING_STEPS.map((step, idx) => (
              <ScrollReveal key={step.step} animation="up" delay={idx * 100}>
                <Card3D intensity={12}>
                  <div className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between text-left h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-display font-black text-emerald-700 dark:text-emerald-400">{step.step}</span>
                        <div className="live-pulse-badge">
                          <span className="live-pulse-dot" />
                          <span>Step {idx + 1}</span>
                        </div>
                      </div>
                      <h3 className="text-base font-display font-bold text-slate-900 dark:text-white leading-tight">
                        {step.title}
                      </h3>
                      <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">{step.subtitle}</div>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Interactive Sourcing Calculator Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="scale">
          <SourcingCalculator onOpenQuoteModal={onOpenQuoteModal} />
        </ScrollReveal>
      </section>

      {/* 4. Service Pillar Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box 1: Custom OEM Private Labeling */}
          <ScrollReveal animation="right">
            <Card3D intensity={14}>
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 text-left h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <PackageCheck className="w-6 h-6" />
                    </div>
                    <div className="live-pulse-badge">
                      <span className="live-pulse-dot" />
                      <span>GMP Certified</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                    Turnkey OEM &amp; Private Label Formulations
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Launch proprietary brand lines with minimal upfront R&amp;D costs. We handle formula matching, stability testing, custom bottle/jar selection, foil printing, and multi-lingual packaging.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Korean, Japanese, and Thai GMP Laboratories</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Khmer &amp; English Ministry Compliant Outer Packaging</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Low Minimum Order Quantities (MOQs) for Initial Batches</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center space-x-2 shadow-sm w-fit"
                >
                  <span>Discuss Private Label Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Box 2: Customs Brokerage & Permitting */}
          <ScrollReveal animation="left" delay={150}>
            <Card3D intensity={14}>
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 text-left h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="live-pulse-badge">
                      <span className="live-pulse-dot" />
                      <span>GDCE Compliant</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                    GDCE Customs Brokerage &amp; Ministry Registration
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Zero customs hold ups. Our licensed Phnom Penh customs brokers manage import declaration filings, tax tariff classification, and Ministry health import certificates.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Fast-Track Ministry of Commerce &amp; Health Permit Approvals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Customs Duty Relief &amp; Tariff Classification Guidance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Port-to-Warehouse Temperature-Controlled Transport</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center space-x-2 shadow-sm w-fit"
                >
                  <span>Request Customs Clearance Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
