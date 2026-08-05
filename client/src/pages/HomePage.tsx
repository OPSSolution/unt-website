import React, { useState, useEffect, useMemo } from 'react';
import { PageTab } from '../types';
import { ArrowRight, ShieldCheck, Globe, Truck, Package, Sparkles, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import { ThreeBackground } from '../components/ThreeBackground';
import { useTradeHubs } from '../hooks/useTradeHubs';
import { useHeroContent } from '../hooks/useHeroContent';
import { useHeroStats } from '../hooks/useHeroStats';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { useProducts } from '../hooks/useProducts';
import { useArticles } from '../hooks/useArticles';
import { usePartners } from '../hooks/usePartners';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card3D } from '../components/Card3D';
import { CardSwiper } from '../components/CardSwiper';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
  onOpenProductModal: (product: any) => void;
  onOpenArticleModal: (article: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenQuoteModal,
  onOpenProductModal,
  onOpenArticleModal,
}) => {
  const TRADE_HUBS = useTradeHubs();
  const hero = useHeroContent();
  const heroStats = useHeroStats();
  const sections = useHomepageSections();
  const DB_PRODUCTS = useProducts();
  const DB_ARTICLES = useArticles();
  const DB_PARTNERS = usePartners();
  const pillars = sections.pillars ?? {};
  const heritage = sections.heritage ?? {};
  const productsSec = sections.products_section ?? {};
  const oem = sections.oem_banner ?? {};
  const partnersSec = sections.partners_section ?? {};
  const insights = sections.insights_section ?? {};
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const selectedHub = TRADE_HUBS.find((h) => h.id === selectedOrigin);

  // ── Globe-synced country cycling (matches ThreeBackground timing) ──
  // FLAG_CYCLE_TIME = 3s per country, FLAG_ALL phase = 3.7s, total ~15.7s
  const CYCLE_MS = 3000;   // per-country spotlight duration (ms)
  const ALL_MS   = 3700;   // all-flags-together phase (ms)
  const TOTAL_MS = CYCLE_MS * TRADE_HUBS.length + ALL_MS;

  const [globeCountry, setGlobeCountry] = useState<string>(TRADE_HUBS[0].id);
  const [isAllPhase, setIsAllPhase] = useState(false);
  const [cardKey, setCardKey] = useState(0); // triggers re-mount animation

  useEffect(() => {
    let startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = (now - startTime) % TOTAL_MS;
      const seqEnd = CYCLE_MS * TRADE_HUBS.length;

      if (elapsed >= seqEnd) {
        // All-phase
        setIsAllPhase((prev) => {
          if (!prev) setCardKey((k) => k + 1);
          return true;
        });
        setGlobeCountry('all');
      } else {
        const idx = Math.floor(elapsed / CYCLE_MS);
        const hub = TRADE_HUBS[idx];
        if (hub) {
          setGlobeCountry((prev) => {
            if (prev !== hub.id) setCardKey((k) => k + 1);
            return hub.id;
          });
          setIsAllPhase(false);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Memoize products grouped by country for O(1) lookup
  const productsByCountry = useMemo(() => {
    const map: Record<string, typeof DB_PRODUCTS> = { all: DB_PRODUCTS.slice(0, 3) };
    TRADE_HUBS.forEach((hub) => {
      map[hub.id] = DB_PRODUCTS.filter(
        (p) => p.origin.toLowerCase() === hub.name.toLowerCase()
      ).slice(0, 3);
    });
    return map;
  }, [DB_PRODUCTS, TRADE_HUBS]);

  const activeCountryId = isAllPhase ? 'all' : globeCountry;
  const activeHub = TRADE_HUBS.find((h) => h.id === activeCountryId);
  const displayedProducts = (productsByCountry[activeCountryId] ?? DB_PRODUCTS.slice(0, 3));

  return (
    <div className="space-y-20 pb-16 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh stripe-mesh-glow">
      {/* 1. Hero Section - Stripe Crypto Style Mesh Background with Interactive 3D Logistics Globe */}
      <section className="relative py-20 lg:py-28 flex items-center justify-center overflow-hidden bg-white/80 dark:bg-[#0B0F17]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
        {/* Interactive 3D Logistics Globe */}
        <ThreeBackground activeOrigin={selectedOrigin} hubs={TRADE_HUBS} />

        <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/20 via-cyan-500/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Stripe Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/10">
            <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400 animate-pulse" />
            <span>{hero?.badge_text ?? "Cambodia's Premier Trading & Sourcing Ecosystem"}</span>
          </div>

          {/* Main Stripe Style Multi-Tone Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 dark:text-white tracking-tight max-w-5xl mx-auto leading-[1.1]">
            {hero?.headline
              ? hero.headline
              : <>Your Trusted Sourcing Partner —{' '}<span className="stripe-gradient-heading">From the World to Cambodia</span></>}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            {hero?.subtitle ?? 'Unique Noble Trading Co., Ltd. (UNT Company) bridges international manufacturers with retail networks across ASEAN. We streamline product sourcing, OEM private label manufacturing, distribution, and commercial sales training.'}
          </p>

          {/* Interactive Productive 3D B2B Origin Selector */}
          <div className="pt-2 max-w-4xl mx-auto space-y-4">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <span>{sections.hero_globe?.globe_label ?? 'Interactive 3D Trade Hub Focus: Select Origin to Rotate 3D Globe'}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md">
              <button
                onClick={() => setSelectedOrigin('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedOrigin === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                {sections.hero_globe?.globe_all_label ?? 'Global ASEAN Network'}
              </button>
              {TRADE_HUBS.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedOrigin(hub.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center ${selectedOrigin === hub.id
                      ? 'bg-emerald-600 text-white shadow-sm scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                  <span>{hub.name}</span>
                </button>
              ))}
            </div>

            {/* Live B2B Hub Metrics Panel */}
            {selectedHub && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white text-left shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-500/30 animate-fadeIn">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                    <span>{selectedHub.name} ➔ Phnom Penh, Cambodia</span>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Primary Trade: <span className="text-emerald-200">{selectedHub.categories}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0">
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="text-emerald-300 font-semibold block text-[10px]">Logistics Speed</span>
                    <span className="font-bold text-white">{selectedHub.leadTime}</span>
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="text-emerald-300 font-semibold block text-[10px]">Min. Wholesale Order</span>
                    <span className="font-bold text-white">{selectedHub.moq}</span>
                  </div>
                  <button
                    onClick={onOpenQuoteModal}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-md text-xs"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('services')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>{hero?.cta_primary ?? 'Explore Sourcing Solutions'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-base border border-slate-300 dark:border-slate-700 shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{hero?.cta_secondary ?? 'Request B2B Quote'}</span>
            </button>
          </div>

          {/* Quick Stats Grid Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {heroStats.length > 0 ? (
              heroStats.map((stat, i) => (
                <div key={stat.id} className={`p-5 rounded-2xl ${i === 0 ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm' : 'stripe-glass-card stripe-card-tilt'}`}>
                  <div className={`text-2xl sm:text-3xl font-display font-bold ${i === 0 ? 'text-emerald-700 dark:text-emerald-400' : 'stripe-gradient-heading'}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">{stat.label}</div>
                </div>
              ))
            ) : (
              /* Fallback while stats load */
              [{ v: '$50M+', l: 'Annual Trade Volume' }, { v: '500+', l: 'Audited Factories' }, { v: '15+', l: 'Global Trade Origins' }, { v: '99.4%', l: 'On-Time Customs Clearance' }].map((s, i) => (
                <div key={i} className={`p-5 rounded-2xl ${i === 0 ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm' : 'stripe-glass-card stripe-card-tilt'}`}>
                  <div className={`text-2xl sm:text-3xl font-display font-bold ${i === 0 ? 'text-emerald-700 dark:text-emerald-400' : 'stripe-gradient-heading'}`}>{s.v}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">{s.l}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 2. Three Pillars / Integrated Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="up">
          <div className="text-center space-y-3 mb-12">
            <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full">
              {pillars.badge ?? 'Full-Spectrum Trading Infrastructure'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
              {pillars.heading ?? 'Integrated Solutions for Modern Commerce'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">
              {pillars.subheading ?? 'UNT Company operates as a complete commercial gateway, managing product supply chains from initial factory audits to local market distribution.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <ScrollReveal animation="up" delay={100}>
            <Card3D intensity={14} onClick={() => setActiveTab('products')}>
              <div className="group cursor-pointer p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <Package className="w-7 h-7" />
                    </div>
                    <div className="live-pulse-badge">
                      <span className="live-pulse-dot" />
                      <span>Live Stock</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Pillar One</span>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {pillars.pillar1_title ?? 'Premium Product Distribution'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {pillars.pillar1_desc ?? 'Direct access to verified international wholesale catalogs spanning Food & Beverage, Skincare, Beauty, Personal Care, Health Supplements, and Household FMCG.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 font-medium">
                    {[1, 2, 3].map((b) => (
                      <li key={b} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>
                          {pillars[`pillar1_bullet${b}`] ?? ['100% Authentic Factory Sealed Lots', 'Khmer Language Labeling Compliance', 'Temperature Controlled Logistics'][b - 1]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <span>View Wholesale Catalog</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Pillar 2 */}
          <ScrollReveal animation="up" delay={200}>
            <Card3D intensity={14} onClick={() => setActiveTab('services')}>
              <div className="group cursor-pointer p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <Globe className="w-7 h-7" />
                    </div>
                    <div className="live-pulse-badge">
                      <span className="live-pulse-dot" />
                      <span>GDCE Ready</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Pillar Two</span>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {pillars.pillar2_title ?? 'Sourcing-as-a-Service & OEM'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {pillars.pillar2_desc ?? 'End-to-end custom procurement. We audit factories in Vietnam, Korea, Japan, and China, negotiate pricing, inspect pre-shipment batches, and clear Cambodian customs.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 font-medium">
                    {[1, 2, 3].map((b) => (
                      <li key={b} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>
                          {pillars[`pillar2_bullet${b}`] ?? ['Turnkey OEM Private Label Manufacturing', 'AQL 2.5 Strict Quality Inspection', 'GDCE Brokerage & Door Delivery'][b - 1]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <span>Explore Sourcing Process</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3D>
          </ScrollReveal>

          {/* Pillar 3 */}
          <ScrollReveal animation="up" delay={300}>
            <Card3D intensity={14} onClick={() => setActiveTab('training')}>
              <div className="group cursor-pointer p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div className="live-pulse-badge">
                      <span className="live-pulse-dot" />
                      <span>Academy Active</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Pillar Three</span>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {pillars.pillar3_title ?? 'Sales & Trade Capacity Academy'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {pillars.pillar3_desc ?? 'Empowering commercial teams, sales reps, and procurement directors with masterclasses in B2B negotiation, buyer psychology, key account management, and retention.'}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 font-medium">
                    {[1, 2, 3].map((b) => (
                      <li key={b} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>
                          {pillars[`pillar3_bullet${b}`] ?? ['1,200+ Professionals Certified', 'Tailored Corporate In-House Bootcamps', 'Negotiation & Contract Strategies'][b - 1]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <span>View Training Modules</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Heritage & Efficiency Feature Showcase */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-20 text-slate-900 dark:text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <ScrollReveal animation="right">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
              <img
                src={hero?.feature_image ?? 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'}
                alt="Container Ship Logistics"
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-lg">
                <div className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{heritage.quality_badge ?? 'The UNT Quality Standard'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                  {heritage.quality_desc ?? 'Zero product returns due to quality defects across 2024–2026. Audit-verified production from certified ISO/GMP manufacturers.'}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text side */}
          <ScrollReveal animation="left" delay={150}>
            <div className="space-y-6 text-left">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                {heritage.badge ?? 'Balancing Heritage with Modern Efficiency'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                {heritage.heading ?? 'Bridging International Factories with Cambodian Commerce'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {heritage.paragraph ?? "Global supply chains are complex, but sourcing doesn't have to be. UNT Company combines deep local market knowledge with international trade relationships to provide smooth, transparent procurement."}
              </p>

              <div className="space-y-4 pt-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                      {n === 1 ? <Globe className="w-5 h-5" /> : n === 2 ? <ShieldCheck className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {heritage[`feature${n}_title`] ?? ['Direct Factory Access', 'Full Customs & Ministry Permits', 'End-to-End Door Delivery'][n - 1]}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        {heritage[`feature${n}_desc`] ?? [
                          'Eliminate middlemen markup. We connect you directly to verified factories in South Korea, Japan, Vietnam, and China.',
                          'We manage product registration with the Cambodian Ministry of Health, Ministry of Commerce, and GDCE customs clearance.',
                          'Temperature-controlled logistics from overseas port loading directly to your Phnom Penh or provincial distribution center.'
                        ][n - 1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Products Preview Section — Country-synced animated showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal animation="up">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="text-left">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                {productsSec.badge ?? 'Wholesale & OEM Catalog'}
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">
                {productsSec.heading ?? 'Featured Import Catalog Items'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                {productsSec.subheading ?? 'Verified quality products ready for immediate Cambodian distribution or custom private label rebranding.'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center space-x-2 shrink-0 shadow-sm"
            >
              <span>{productsSec.cta ?? 'View Full Catalog'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* Country Tab Indicator — mirrors globe cycle */}
        <div className="flex flex-wrap items-center gap-2">
          {TRADE_HUBS.map((hub) => (
            <div
              key={hub.id}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-500 ${
                !isAllPhase && globeCountry === hub.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <img
                src={hub.flagUrl}
                alt={hub.name}
                className="w-4 h-3 object-cover rounded-sm"
              />
              <span>{hub.name}</span>
              {!isAllPhase && globeCountry === hub.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </div>
          ))}
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-500 ${
              isAllPhase
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isAllPhase ? '✦ All Origins' : 'All Origins'}
          </div>
        </div>

        {/* Active Country Banner */}
        <div
          key={`banner-${cardKey}`}
          className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-900/90 to-slate-900/90 border border-emerald-500/30 shadow-lg"
          style={{ animation: 'slideUpFade 0.4s ease both' }}
        >
          {activeHub && (
            <img
              src={activeHub.flagUrl}
              alt={activeHub.name}
              className="w-8 h-6 object-cover rounded shadow"
            />
          )}
          <div className="flex-1">
            <span className="text-emerald-400 font-bold text-xs">
              {isAllPhase ? 'ALL ORIGINS — ASEAN Network' : `${activeHub?.name ?? 'Global'} ➔ Phnom Penh, Cambodia`}
            </span>
            <div className="text-white text-sm font-semibold">
              {isAllPhase
                ? 'Full product catalog from South Korea, Japan, China &amp; Vietnam'
                : `Featured: ${activeHub?.categories ?? 'All Categories'}`}
            </div>
          </div>
          {activeHub && (
            <div className="flex gap-3 text-xs shrink-0">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                <span className="text-emerald-300 font-semibold block text-[10px]">Lead Time</span>
                <span className="font-bold text-white">{activeHub.leadTime}</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                <span className="text-emerald-300 font-semibold block text-[10px]">Min. Order</span>
                <span className="font-bold text-white">{activeHub.moq}</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Cards — pop in per country with Card3D tilt */}
        <div key={`cards-${cardKey}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(displayedProducts.length > 0 ? displayedProducts : DB_PRODUCTS.slice(0, 3)).map((product, i) => (
            <Card3D key={product.id} intensity={12} onClick={() => onOpenProductModal(product)}>
              <div className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <span>{product.originFlag}</span>
                      <span>{product.origin}</span>
                    </div>
                    <div className="absolute top-3 right-3 live-pulse-badge backdrop-blur-md bg-slate-900/80 border-emerald-500/40 text-emerald-300">
                      <span className="live-pulse-dot" />
                      <span>Lot Verified</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 text-left">
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="block text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">MOQ</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{product.moq}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">Lead Time</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{product.leadTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">View Technical Specs</span>
                  <span className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all border border-emerald-200 dark:border-emerald-800">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 5. OEM Private Label Section Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="scale">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl text-left border border-emerald-700/30">
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-400/30">
                {oem.badge ?? 'OEM & Private Label Excellence'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
                {oem.heading ?? 'Launch Your Brand with World-Class Formulations'}
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                {oem.paragraph ?? 'Have a proprietary product concept? UNT Company provides end-to-end private label manufacturing. We match your brand with GMP-certified factories in South Korea, Japan, and Vietnam for custom cosmetics, supplements, beverages, and personal care lines.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs">
                    <span className="font-bold text-emerald-300 block">
                      {oem[`chip${n}_title`] ?? ['Custom Formulas', 'Package Design', 'Low Trial MOQs', 'Turnkey Clearance'][n - 1]}
                    </span>
                    <span className="text-emerald-100 text-[10px]">
                      {oem[`chip${n}_sub`] ?? ['R&D & Lab Stability', 'Khmer Label Compliant', 'Flexible Batch Sizes', 'Ministry Permit Filing'][n - 1]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onOpenQuoteModal}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <span>Start OEM Private Label Project</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Partner Brands Showcase */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
        <ScrollReveal animation="up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {partnersSec.label ?? 'Trusted Global Manufacturing Partners & Supplier Alliances'}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {DB_PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2 hover:border-emerald-400 transition-colors shadow-sm flex flex-col items-center justify-between"
                >
                  <div className="flex flex-col items-center w-full">
                    {partner.image ? (
                      <img src={partner.image} alt={partner.name} className="h-12 w-auto object-contain mb-2" />
                    ) : (
                      <div className="font-display font-black text-slate-900 dark:text-white text-sm tracking-wide mb-2 h-12 flex items-center justify-center text-center">
                        {partner.logoText}
                      </div>
                    )}
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold leading-tight">{partner.category}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{partner.country}</div>
                  </div>
                  {partner.description && (
                    <div className="text-[10px] text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2 line-clamp-3 w-full">
                      {partner.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. Latest News / Market Insights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal animation="up">
          <div className="flex items-end justify-between">
            <div className="text-left">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                {insights.badge ?? 'Market Intelligence'}
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">
                {insights.heading ?? 'Latest Regulatory & Trade Insights'}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('blog')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center space-x-1"
            >
              <span>{insights.cta ?? 'View All Articles'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DB_ARTICLES.slice(0, 2).map((article, idx) => (
            <ScrollReveal key={article.id} animation="up" delay={idx * 150}>
              <div
                onClick={() => onOpenArticleModal(article)}
                className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between text-left h-full"
              >
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-md">
                      {article.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <span>Read Full Analysis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};
