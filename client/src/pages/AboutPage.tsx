import React from 'react';
import { PageTab } from '../types';
import { ShieldCheck, Globe, Building2, Users, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card3D } from '../components/Card3D';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <ScrollReveal animation="up">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
              About UNT Company
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">
              The Bridge to <span className="emerald-gradient-text">Global Trade</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Unique Noble Trading Co., Ltd. (UNT Company) is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Mission & Strategic Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <ScrollReveal animation="right">
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
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-3xl font-display font-bold text-emerald-700 dark:text-emerald-400">100%</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Regulatory &amp; Tax Audit Compliant</div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="text-3xl font-display font-bold text-emerald-700 dark:text-emerald-400">1,200+</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Trade &amp; Sales Professionals Trained</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="left" delay={200}>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 aspect-video lg:aspect-square">

          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop"
            alt="UNT Headquarters Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">Phnom Penh Corporate Headquarters</div>
            <div className="text-slate-600 dark:text-slate-300 text-xs mt-0.5">Phnom Penh Tower, Monivong Blvd, Doun Penh, Phnom Penh</div>
          </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. The 4 UNT Pillars of Advantage */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 text-slate-900 dark:text-white transition-colors duration-300">
        <ScrollReveal animation="up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                Why Business Leaders Choose UNT
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">The UNT Advantage</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <Card3D intensity={12}>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="live-pulse-badge">
                        <span className="live-pulse-dot" />
                        <span>ISO Audit</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Direct Factory Audit</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      We physically audit ISO and GMP facilities across Vietnam, Korea, Japan, and China to verify production capacity and safety.
                    </p>
                  </div>
                </div>
              </Card3D>

              <Card3D intensity={12}>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="live-pulse-badge">
                        <span className="live-pulse-dot" />
                        <span>GDCE Broker</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">In-House Customs Brokerage</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Licensed GDCE customs brokers handle tax classification, ASYCUDA filings, and ministry permits to eliminate port hold-ups.
                    </p>
                  </div>
                </div>
              </Card3D>

              <Card3D intensity={12}>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div className="live-pulse-badge">
                        <span className="live-pulse-dot" />
                        <span>Reefer Logistics</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Cold Chain &amp; Logistics</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate F&amp;B, cosmetics, and health products.
                    </p>
                  </div>
                </div>
              </Card3D>

              <Card3D intensity={12}>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="live-pulse-badge">
                        <span className="live-pulse-dot" />
                        <span>Academy Live</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Sales &amp; Capacity Building</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      We don't just supply products; we train client commercial teams in consultative selling, buyer psychology, and key account growth.
                    </p>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Global Sourcing Hubs & Regional Presence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal animation="up">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
              Strategic Infrastructure
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              Our Global Network &amp; Operations Hubs
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">🇹🇭 🇻🇳</div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                Bangkok &amp; Ho Chi Minh Corridors
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Cross-border overland logistics hub for rapid F&amp;B, organic coconut water, teas, and household consumer product shipments into Cambodia.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">🇰🇷 🇯🇵</div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                Seoul &amp; Tokyo OEM Laboratories
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare lines and anti-aging treatments.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">🇨🇳 🇰🇭</div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                Guangzhou &amp; Phnom Penh Central
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
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
        </ScrollReveal>
      </section>
    </div>
  );
};
