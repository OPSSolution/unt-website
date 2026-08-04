import React from 'react';
import { PageTab } from '../types';
import { ShieldCheck, Globe, Building2, Users, ArrowRight, Truck } from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 text-slate-900">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
            About UNT Company
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900">
            The Bridge to <span className="emerald-gradient-text">Global Trade</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Unique Noble Trading Co., Ltd. (UNT Company) is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.
          </p>
        </div>
      </section>

      {/* 2. Mission & Strategic Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <div className="space-y-6">
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
            Our Purpose & Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
            Connecting World-Class Manufacturers with Emerging ASEAN Markets
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Founded with the vision of modernizing Cambodian import commerce, UNT Company acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners. We remove cross-border trade friction by taking full responsibility for supplier auditing, volume pricing negotiation, quality control, customs clearance, and product compliance.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-emerald-700">100%</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Regulatory & Tax Audit Compliant</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-emerald-700">1,200+</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Trade & Sales Professionals Trained</div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white aspect-video lg:aspect-square">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop"
            alt="UNT Headquarters Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 border border-slate-200 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="text-emerald-700 font-bold text-sm">Phnom Penh Corporate Headquarters</div>
            <div className="text-slate-600 text-xs mt-0.5">Phnom Penh Tower, Monivong Blvd, Doun Penh, Phnom Penh</div>
          </div>
        </div>
      </section>

      {/* 3. The 4 UNT Pillars of Advantage */}
      <section className="bg-white border-y border-slate-200 py-16 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
              Why Business Leaders Choose UNT
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900">The UNT Advantage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">Direct Factory Audit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We physically audit ISO and GMP facilities across Thailand, Vietnam, Korea, Japan, and China to verify production capacity and safety.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">In-House Customs Brokerage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Licensed GDCE customs brokers handle tax classification, ASYCUDA filings, and ministry permits to eliminate port hold-ups.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">Cold Chain & Logistics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate F&B, cosmetics, and health products.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">Sales & Capacity Building</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We don't just supply products; we train client commercial teams in consultative selling, buyer psychology, and key account growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Sourcing Hubs & Regional Presence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
            Strategic Infrastructure
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900">
            Our Global Network & Operations Hubs
          </h2>
          <p className="text-slate-600 text-sm">
            Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
            <div className="text-2xl">🇹🇭 🇻🇳</div>
            <h3 className="text-lg font-display font-bold text-slate-900">
              Bangkok & Ho Chi Minh Corridors
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Cross-border overland logistics hub for rapid F&B, organic coconut water, teas, and household consumer product shipments into Cambodia.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
            <div className="text-2xl">🇰🇷 🇯🇵</div>
            <h3 className="text-lg font-display font-bold text-slate-900">
              Seoul & Tokyo OEM Laboratories
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare lines and anti-aging treatments.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
            <div className="text-2xl">🇨🇳 🇰🇭</div>
            <h3 className="text-lg font-display font-bold text-slate-900">
              Guangzhou & Phnom Penh Central
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Bulk manufacturing, custom eco packaging, and central distribution warehouse located in Phnom Penh for rapid order fulfillment.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6 text-center">
          <button
            onClick={onOpenQuoteModal}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-emerald-600 transition-all inline-flex items-center space-x-2"
          >
            <span>Partner with UNT Company</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
