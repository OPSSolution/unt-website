import React from 'react';
import { PageTab } from '../types';
import { SOURCING_STEPS } from '../data/mockData';
import { SourcingCalculator } from '../components/SourcingCalculator';
import { ShieldCheck, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';

interface ServicesPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 text-slate-900">
      {/* 1. Hero */}
      <section className="relative py-20 bg-white text-slate-900 overflow-hidden border-b border-slate-200">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
            End-to-End Procurement Infrastructure
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900">
            Integrated Global <span className="emerald-gradient-text">Trading Solutions</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            From factory-direct auditing and private label OEM formulation to Ministry permits, GDCE customs clearance, and door-to-door logistics in Cambodia.
          </p>
        </div>
      </section>

      {/* 2. Sourcing-as-a-Service 5 Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
            Methodology
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900">
            The UNT Sourcing-as-a-Service Process
          </h2>
          <p className="text-slate-600 text-sm">
            We simplify global procurement into five fully transparent, risk-managed stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {SOURCING_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-3xl bg-white border border-slate-200 shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-black text-emerald-700">{step.step}</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold border border-emerald-200">
                    ✓
                  </div>
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 leading-tight">
                  {step.title}
                </h3>
                <div className="text-[11px] font-semibold text-emerald-700">{step.subtitle}</div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Sourcing Calculator Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SourcingCalculator onOpenQuoteModal={onOpenQuoteModal} />
      </section>

      {/* 4. Service Pillar Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box 1: Custom OEM Private Labeling */}
          <div className="p-8 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-lg space-y-6 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Turnkey OEM & Private Label Formulations
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Launch proprietary brand lines with minimal upfront R&D costs. We handle formula matching, stability testing, custom bottle/jar selection, foil printing, and multi-lingual packaging.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Korean, Japanese, and Thai GMP Laboratories</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Khmer & English Ministry Compliant Outer Packaging</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Low Minimum Order Quantities (MOQs) for Initial Batches</span>
              </li>
            </ul>
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>Discuss Private Label Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Box 2: Customs Brokerage & Permitting */}
          <div className="p-8 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-lg space-y-6 text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900">
              GDCE Customs Brokerage & Ministry Registration
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Avoid port fines and shipping delays. Our dedicated customs unit files ASYCUDA manifests, secures Ministry of Health product notifications, and manages Ministry of Commerce import audits.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Tax Classification & Duty Optimization</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-cleared Priority Inspection Status</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Phnom Penh & Sihanoukville Port On-Site Clearance</span>
              </li>
            </ul>
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-slate-100 text-slate-900 border border-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors flex items-center space-x-2 shadow-sm"
            >
              <span>Consult Customs Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
