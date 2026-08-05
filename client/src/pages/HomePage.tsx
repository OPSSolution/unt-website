import React, { useState, useEffect, useMemo } from 'react';
import { PageTab } from '../types';
import { PRODUCTS, ARTICLES, PARTNERS } from '../data/mockData';
import { ArrowRight, ShieldCheck, Globe, Truck, Package, Sparkles, CheckCircle2, ChevronRight, GraduationCap, LayoutGrid, Layers, FlaskConical, Palette, FileCheck2 } from 'lucide-react';
import { ThreeBackground } from '../components/ThreeBackground';
import { useTradeHubs } from '../hooks/useTradeHubs';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card3D } from '../components/Card3D';
import { CardSwiper } from '../components/CardSwiper';
import { PillarCard } from '../components/PillarCard';
import { CarouselSlider3D } from '../components/CarouselSlider3D';

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
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [displayMode, setDisplayMode] = useState<'grid' | 'carousel'>('carousel');
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [sec3MousePos, setSec3MousePos] = useState({ x: 0, y: 0 });
  const selectedHub = TRADE_HUBS.find((h) => h.id === selectedOrigin);

  const handleSec3MouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setSec3MousePos({ x, y });
  };

  // ── Globe-synced country cycling (matches ThreeBackground timing) ──
  // FLAG_CYCLE_TIME = 3s per country, FLAG_ALL phase = 3.7s, total ~15.7s
  const CYCLE_MS = 3000;   // per-country spotlight duration (ms)
  const ALL_MS = 3700;   // all-flags-together phase (ms)
  const TOTAL_MS = CYCLE_MS * TRADE_HUBS.length + ALL_MS;

  const [globeCountry, setGlobeCountry] = useState<string>(TRADE_HUBS[0].id);
  const [isAllPhase, setIsAllPhase] = useState(false);
  const [cardKey, setCardKey] = useState(0); // triggers re-mount animation

  // Pause auto-cycling when user manually clicks a country tab
  const userPausedUntil = React.useRef<number>(0);

  const pauseAutoCycle = () => {
    userPausedUntil.current = Date.now() + 8000; // pause for 8 seconds
  };

  useEffect(() => {
    let startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      // Skip auto-updates while user has manually selected a country
      if (Date.now() < userPausedUntil.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

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
    const map: Record<string, typeof PRODUCTS> = { all: PRODUCTS.slice(0, 4) };
    TRADE_HUBS.forEach((hub) => {
      map[hub.id] = PRODUCTS.filter(
        (p) => p.origin.toLowerCase() === hub.name.toLowerCase()
      ).slice(0, 4);
    });
    return map;
  }, []);

  const activeCountryId = isAllPhase ? 'all' : globeCountry;
  const activeHub = TRADE_HUBS.find((h) => h.id === activeCountryId);
  const displayedProducts = (productsByCountry[activeCountryId] ?? PRODUCTS.slice(0, 3));

  return (
    <div className="space-y-20 pb-16 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh stripe-mesh-glow">
      {/* 1. Hero Section - Stripe Crypto Style Mesh Background with Interactive 3D Logistics Globe */}
      <section className="relative py-20 lg:py-28 flex items-center justify-center overflow-hidden bg-white/80 dark:bg-[#0B0F17]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
        {/* Interactive 3D Logistics Globe */}
        <ThreeBackground activeOrigin={selectedOrigin} hubs={TRADE_HUBS} />

        <div className="absolute inset-0 z-0 opacity-50 dark:opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/20 via-cyan-500/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-8">
          {/* Stripe Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/10">
            <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400 animate-pulse" />
            <span>Cambodia’s Premier Trading &amp; Sourcing Ecosystem</span>
          </div>

          {/* Main Stripe Style Multi-Tone Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 dark:text-white tracking-tight max-w-5xl mx-auto leading-[1.1]">
            Your Trusted Sourcing Partner
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            <strong className="text-slate-900 dark:text-white">UNT</strong> connects Cambodian buyers with quality products from abroad, helps businesses source what they need from other countries, and trains sales teams to sell better.
          </p>

          {/* Interactive Productive 3D B2B Origin Selector */}
          <div className="pt-2 max-w-4xl mx-auto space-y-4">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <span>Interactive 3D Trade Hub Focus: Select Origin to Rotate 3D Globe</span>
            </div>

            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-lg max-w-full">
              {/* Global ASEAN Network Button */}
              <button
                onClick={() => setSelectedOrigin('all')}
                className={`h-9 sm:h-10 px-3.5 sm:px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-2 shrink-0 ${selectedOrigin === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 scale-105'
                  : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                <Globe className={`w-4 h-4 shrink-0 ${selectedOrigin === 'all' ? 'text-white animate-spin' : 'text-emerald-600 dark:text-emerald-400'}`} />
                <span>Global ASEAN Network</span>
                {selectedOrigin === 'all' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>

              {/* Country Hub Buttons with Flags */}
              {TRADE_HUBS.map((hub) => {
                const isSelected = selectedOrigin === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedOrigin(hub.id)}
                    className={`h-9 sm:h-10 px-3.5 sm:px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-2 shrink-0 ${isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 scale-105'
                      : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                  >
                    <img
                      src={hub.flagUrl}
                      alt={hub.name}
                      className="w-4.5 h-3 object-cover rounded-sm border border-slate-200/80 dark:border-slate-700/80 shrink-0"
                    />
                    <span>{hub.name}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                );
              })}
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
              <span>Explore Sourcing Solutions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-base border border-slate-300 dark:border-slate-700 shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Request B2B Quote</span>
            </button>
          </div>

          {/* Quick Stats Grid Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700 dark:text-emerald-400">$50M+</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Annual Trade Volume</div>
            </div>
            <div className="p-5 rounded-2xl stripe-glass-card stripe-card-tilt">
              <div className="text-2xl sm:text-3xl font-display font-bold stripe-gradient-heading">500+</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Audited Factories</div>
            </div>
            <div className="p-5 rounded-2xl stripe-glass-card stripe-card-tilt">
              <div className="text-2xl sm:text-3xl font-display font-bold stripe-gradient-heading">15+</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">Global Trade Origins</div>
            </div>
            <div className="p-5 rounded-2xl stripe-glass-card stripe-card-tilt">
              <div className="text-2xl sm:text-3xl font-display font-bold stripe-gradient-heading">99.4%</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">On-Time Customs Clearance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Pillars / Integrated Solutions (Full Width Supporting Big Screens) */}
      <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative py-6">
        {/* Circle Morphism Decorative Floating Glass Orbs & Concentric Rings */}
        <div className="absolute -top-16 -left-12 w-80 h-80 rounded-full glass-circle-morphism animate-float-orb pointer-events-none z-0 overflow-hidden flex items-center justify-center hidden sm:flex">
          <div className="w-56 h-56 rounded-full bg-emerald-400/25 dark:bg-emerald-500/20 blur-2xl" />
        </div>

        <div className="absolute -bottom-16 -right-12 w-96 h-96 rounded-full glass-circle-morphism animate-float-orb-reverse pointer-events-none z-0 overflow-hidden flex items-center justify-center hidden sm:flex">
          <div className="w-64 h-64 rounded-full bg-cyan-400/25 dark:bg-cyan-500/20 blur-2xl" />
        </div>

        {/* Floating Concentric Glass Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-emerald-400/25 dark:border-emerald-500/15 pointer-events-none z-0 animate-pulse hidden md:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full border border-cyan-400/20 dark:border-cyan-500/15 pointer-events-none z-0 hidden md:block" />

        {/* Main Curved Glass Panel Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 rounded-[44px] glass-circle-morphism shadow-2xl">
          <ScrollReveal animation="up">
            <div className="text-center space-y-4 mb-10">
              <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                Full-Spectrum Trading Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white">
                Integrated Solutions for Modern Commerce
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
                UNT Company operates as a complete commercial gateway, managing product supply chains from initial factory audits to local market distribution.
              </p>

              {/* View Layout Mode Switcher Segmented Control */}
              <div className="pt-3 flex items-center justify-center">
                <div className="inline-flex items-center p-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold shadow-inner">
                  <button
                    type="button"
                    onClick={() => setDisplayMode('grid')}
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-2 cursor-pointer ${displayMode === 'grid'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 scale-105'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>3-Column Grid View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDisplayMode('carousel')}
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center space-x-2 cursor-pointer ${displayMode === 'carousel'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 scale-105'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>3D Coverflow Slider (Default)</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Conditional Rendering: 3-Column Grid View (Default) vs 3D Coverflow Slider */}
          {displayMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
              {/* Pillar 1 */}
              <ScrollReveal animation="up" delay={100}>
                <PillarCard
                  pillarNumber="Pillar One"
                  title="Premium Product Distribution"
                  description="Direct access to verified international wholesale catalogs spanning Food & Beverage, Skincare, Beauty, Personal Care, Health Supplements, and Household FMCG."
                  icon={<Package className="w-7 h-7" />}
                  badgeText="Live Stock"
                  actionText="View Wholesale Catalog"
                  bullets={[
                    '100% Authentic Factory Sealed Lots',
                    'Khmer Language Labeling Compliance',
                    'Temperature Controlled Logistics',
                  ]}
                  metrics={[
                    { label: 'Active SKUs', value: '10,000+' },
                    { label: 'Delivery', value: '24-48 Hours' },
                    { label: 'Compliance', value: '100% Ministry' },
                    { label: 'Storage', value: 'Reefer Cold Chain' },
                  ]}
                  onClick={() => setActiveTab('products')}
                />
              </ScrollReveal>

              {/* Pillar 2 */}
              <ScrollReveal animation="up" delay={200}>
                <PillarCard
                  pillarNumber="Pillar Two"
                  title="Sourcing-as-a-Service & OEM"
                  description="End-to-end custom procurement. We audit factories in Vietnam, Korea, Japan, and China, negotiate pricing, inspect pre-shipment batches, and clear Cambodian customs."
                  icon={<Globe className="w-7 h-7" />}
                  badgeText="GDCE Ready"
                  actionText="Explore Sourcing Process"
                  bullets={[
                    'Turnkey OEM Private Label Manufacturing',
                    'AQL 2.5 Strict Quality Inspection',
                    'GDCE Brokerage & Door Delivery',
                  ]}
                  metrics={[
                    { label: 'Factory Audits', value: '500+ ISO/GMP' },
                    { label: 'Clearance Rate', value: '99.4% On-Time' },
                    { label: 'Origin Hubs', value: '4 Countries' },
                    { label: 'Quality Standard', value: 'AQL 2.5 Strict' },
                  ]}
                  onClick={() => setActiveTab('services')}
                />
              </ScrollReveal>

              {/* Pillar 3 */}
              <ScrollReveal animation="up" delay={300}>
                <PillarCard
                  pillarNumber="Pillar Three"
                  title="Sales & Trade Capacity Academy"
                  description="Empowering commercial teams, sales reps, and procurement directors with masterclasses in B2B negotiation, buyer psychology, key account management, and retention."
                  icon={<GraduationCap className="w-7 h-7" />}
                  badgeText="Academy Active"
                  actionText="View Training Modules"
                  bullets={[
                    '1,200+ Professionals Certified',
                    'Tailored Corporate In-House Bootcamps',
                    'Negotiation & Contract Strategies',
                  ]}
                  metrics={[
                    { label: 'Certified Reps', value: '1,200+' },
                    { label: 'Client Lift', value: '+38% Growth' },
                    { label: 'Format', value: 'In-House Bootcamps' },
                    { label: 'Certificates', value: 'UNT Accredited' },
                  ]}
                  onClick={() => setActiveTab('training')}
                />
              </ScrollReveal>
            </div>
          ) : (
            <CarouselSlider3D autoPlayInterval={6000}>
              {/* Pillar 1 */}
              <PillarCard
                pillarNumber="Pillar One"
                title="Premium Product Distribution"
                description="Direct access to verified international wholesale catalogs spanning Food & Beverage, Skincare, Beauty, Personal Care, Health Supplements, and Household FMCG."
                icon={<Package className="w-7 h-7" />}
                badgeText="Live Stock"
                actionText="View Wholesale Catalog"
                bullets={[
                  '100% Authentic Factory Sealed Lots',
                  'Khmer Language Labeling Compliance',
                  'Temperature Controlled Logistics',
                ]}
                metrics={[
                  { label: 'Active SKUs', value: '10,000+' },
                  { label: 'Delivery', value: '24-48 Hours' },
                  { label: 'Compliance', value: '100% Ministry' },
                  { label: 'Storage', value: 'Reefer Cold Chain' },
                ]}
                onClick={() => setActiveTab('products')}
              />

              {/* Pillar 2 */}
              <PillarCard
                pillarNumber="Pillar Two"
                title="Sourcing-as-a-Service & OEM"
                description="End-to-end custom procurement. We audit factories in Vietnam, Korea, Japan, and China, negotiate pricing, inspect pre-shipment batches, and clear Cambodian customs."
                icon={<Globe className="w-7 h-7" />}
                badgeText="GDCE Ready"
                actionText="Explore Sourcing Process"
                bullets={[
                  'Turnkey OEM Private Label Manufacturing',
                  'AQL 2.5 Strict Quality Inspection',
                  'GDCE Brokerage & Door Delivery',
                ]}
                metrics={[
                  { label: 'Factory Audits', value: '500+ ISO/GMP' },
                  { label: 'Clearance Rate', value: '99.4% On-Time' },
                  { label: 'Origin Hubs', value: '4 Countries' },
                  { label: 'Quality Standard', value: 'AQL 2.5 Strict' },
                ]}
                onClick={() => setActiveTab('services')}
              />

              {/* Pillar 3 */}
              <PillarCard
                pillarNumber="Pillar Three"
                title="Sales & Trade Capacity Academy"
                description="Empowering commercial teams, sales reps, and procurement directors with masterclasses in B2B negotiation, buyer psychology, key account management, and retention."
                icon={<GraduationCap className="w-7 h-7" />}
                badgeText="Academy Active"
                actionText="View Training Modules"
                bullets={[
                  '1,200+ Professionals Certified',
                  'Tailored Corporate In-House Bootcamps',
                  'Negotiation & Contract Strategies',
                ]}
                metrics={[
                  { label: 'Certified Reps', value: '1,200+' },
                  { label: 'Client Lift', value: '+38% Growth' },
                  { label: 'Format', value: 'In-House Bootcamps' },
                  { label: 'Certificates', value: 'UNT Accredited' },
                ]}
                onClick={() => setActiveTab('training')}
              />
            </CarouselSlider3D>
          )}
        </div>
      </section>

      {/* 3. Heritage & Efficiency Feature Showcase (Interactive 3D Perspective Tech Grid & Glowing Nodes) */}
      <section
        onMouseMove={handleSec3MouseMove}
        className="relative py-24 overflow-hidden text-slate-900 dark:text-white transition-colors duration-300 group/sec3 border-y border-slate-200/80 dark:border-slate-800/80"
      >
        {/* 3D Perspective Tech Grid Canvas Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Radial Fade Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,rgba(248,250,252,0.85)_100%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,#090d16_100%)] z-10" />

          {/* Perspective 3D Grid Planes */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

          {/* Dynamic Laser Beam Nodes */}
          <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981] animate-ping" />
          <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4] animate-ping" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_#2dd4bf] animate-pulse" />

          {/* Interactive Mouse-Tracking Laser Beam Node Glow */}
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl transition-transform duration-500 ease-out"
            style={{
              left: `${(sec3MousePos.x + 0.5) * 100}%`,
              top: `${(sec3MousePos.y + 0.5) * 100}%`,
              transform: 'translate(-50%, -50%)',
              background:
                activeFeature === 0
                  ? 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)'
                  : activeFeature === 1
                    ? 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(59,130,246,0.12) 50%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(99,102,241,0.12) 50%, transparent 70%)',
            }}
          />
        </div>

        {/* Specular Top & Bottom Glowing Divider Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 dark:via-emerald-400/40 to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 dark:via-cyan-400/30 to-transparent pointer-events-none z-20" />

        {/* Section Content Container */}
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Dynamic Image Showcase Side */}
            <ScrollReveal animation="right">
              <Card3D intensity={14}>
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group cursor-pointer">
                  {/* Specular Top-Edge Glare Accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent z-20 pointer-events-none" />

                  {/* Dynamic Cross-Fading Feature Showcase Image */}
                  <div className="relative h-[560px] sm:h-[600px] lg:h-[640px] w-full overflow-hidden">
                    {[
                      {
                        src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
                        alt: 'Factory Inspection',
                        badge: '500+ ISO/GMP Audited Factories',
                        title: 'Direct Factory Sourcing & OEM',
                        tags: ['4 Origin Hubs', 'Direct OEM Pricing', '0% Middlemen'],
                      },
                      {
                        src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
                        alt: 'Customs Clearance Port',
                        badge: '99.4% On-Time Customs Clearance',
                        title: 'Full Customs & Ministry Compliance',
                        tags: ['MoH / MoC Permits', 'Khmer Labeling', 'GDCE Clearance'],
                      },
                      {
                        src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop',
                        alt: 'Cold Chain Delivery',
                        badge: 'Reefer Cold Chain Active',
                        title: 'End-to-End Door Delivery',
                        tags: ['24-48 Hr Transit', 'Temp Controlled', 'Nationwide Network'],
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ${activeFeature === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                          }`}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

                        {/* Dynamic Floating Status Badge */}
                        <div className="absolute top-6 right-6 z-20">
                          <div className="live-pulse-badge backdrop-blur-xl bg-slate-900/90 border border-emerald-400/50 text-emerald-300 shadow-xl">
                            <span className="live-pulse-dot" />
                            <span>{item.badge}</span>
                          </div>
                        </div>

                        {/* Dynamic Glass Feature Overlay Banner */}
                        <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 shadow-2xl z-20 transition-all duration-300">
                          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold text-base">
                            <div className="flex items-center space-x-2.5">
                              <ShieldCheck className="w-5 h-5 text-emerald-500 animate-pulse" />
                              <span>{item.title}</span>
                            </div>
                            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                              Active Focus
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-3.5">
                            {item.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm"
                              >
                                ✦ {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>

            {/* Interactive Feature Accordion Side */}
            <ScrollReveal animation="left" delay={150}>
              <div className="space-y-6 text-left">
                <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                  Balancing Heritage with Modern Efficiency
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Bridging International Factories with Cambodian Commerce
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  Global supply chains are complex, but sourcing doesn't have to be. Click any feature below to inspect operational capabilities in real time.
                </p>

                {/* 3 Interactive Feature Accordion Cards */}
                <div className="space-y-4 pt-2">
                  {[
                    {
                      id: 0,
                      title: 'Direct Factory Access',
                      description: 'Eliminate middlemen markup. We connect you directly to verified factories in South Korea, Japan, Vietnam, and China.',
                      icon: Globe,
                      metrics: '500+ Factories Audited',
                    },
                    {
                      id: 1,
                      title: 'Full Customs & Ministry Permits',
                      description: 'We manage product registration with the Cambodian Ministry of Health, Ministry of Commerce, and GDCE customs clearance.',
                      icon: ShieldCheck,
                      metrics: '99.4% On-Time Clearance',
                    },
                    {
                      id: 2,
                      title: 'End-to-End Door Delivery',
                      description: 'Temperature-controlled logistics from overseas port loading directly to your Phnom Penh or provincial distribution center.',
                      icon: Truck,
                      metrics: 'Reefer Cold Chain Fleet',
                    },
                  ].map((feat) => {
                    const IconComp = feat.icon;
                    const isActive = activeFeature === feat.id;
                    return (
                      <Card3D key={feat.id} intensity={10} onClick={() => setActiveFeature(feat.id)}>
                        <div
                          onClick={() => setActiveFeature(feat.id)}
                          onMouseEnter={() => setActiveFeature(feat.id)}
                          className={`group relative cursor-pointer p-6 rounded-3xl transition-all duration-500 flex items-start space-x-5 overflow-hidden isolate border shadow-xl hover:shadow-2xl ${isActive
                              ? 'bg-white dark:bg-[#0c1322] border-emerald-500 dark:border-emerald-400 shadow-emerald-500/10 scale-[1.02]'
                              : 'bg-white dark:bg-[#0c1322] border-slate-200/90 dark:border-slate-800 hover:border-emerald-400/90 dark:hover:border-emerald-400/70'
                            }`}
                        >
                          {/* Specular Top-Edge Glare Highlight */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 dark:via-emerald-400/50 to-transparent pointer-events-none" />

                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 shadow-md ${isActive
                                ? 'bg-emerald-600 text-white shadow-emerald-500/30 scale-110'
                                : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white'
                              }`}
                          >
                            <IconComp className="w-6 h-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`text-base font-bold transition-colors ${isActive
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                                  }`}
                              >
                                {feat.title}
                              </h4>
                              <span
                                className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all ${isActive
                                    ? 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                  }`}
                              >
                                {feat.metrics}
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                              {feat.description}
                            </p>

                            {/* Active Feature Progress Bar */}
                            {isActive && (
                              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-3.5 overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full w-full animate-pulse" />
                              </div>
                            )}
                          </div>
                        </div>
                      </Card3D>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Products Preview Section — Country-synced animated showcase */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
        <ScrollReveal animation="up">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="text-left">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                Wholesale &amp; OEM Catalog
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">
                Featured Import Catalog Items
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                Verified quality products ready for immediate Cambodian distribution or custom private label rebranding.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('products')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center space-x-2 shrink-0 shadow-sm"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* Country Tab Indicator — clickable to filter products */}
        <div className="flex flex-wrap items-center gap-2">
          {TRADE_HUBS.map((hub) => (
            <button
              key={hub.id}
              onClick={() => {
                pauseAutoCycle();
                setSelectedOrigin(hub.id);
                setGlobeCountry(hub.id);
                setIsAllPhase(false);
                setCardKey((k) => k + 1);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-500 cursor-pointer hover:scale-105 ${!isAllPhase && globeCountry === hub.id
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600'
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
            </button>
          ))}
          <button
            onClick={() => {
              pauseAutoCycle();
              setSelectedOrigin('all');
              setGlobeCountry('all');
              setIsAllPhase(true);
              setCardKey((k) => k + 1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-500 cursor-pointer hover:scale-105 ${isAllPhase
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105'
              : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600'
              }`}
          >
            {isAllPhase ? '✦ All Origins' : 'All Origins'}
          </button>
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
        <div key={`cards-${cardKey}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(displayedProducts.length > 0 ? displayedProducts : PRODUCTS.slice(0, 4)).map((product, i) => (
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

      {/* 5. OEM Private Label Section Banner — Interactive 3D Showcase & Animations */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <ScrollReveal animation="scale">
          <Card3D intensity={12}>
            <div className="relative rounded-[36px] bg-gradient-to-r from-emerald-950 via-[#0a251c] to-slate-950 p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-2xl border border-emerald-500/30 group/oem cursor-pointer">
              {/* Specular Top-Edge Glare Accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent pointer-events-none z-30" />

              {/* Floating Animated Glass Orbs Background */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full glass-circle-morphism animate-float-orb pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-emerald-400/30 blur-3xl" />
              </div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full glass-circle-morphism animate-float-orb-reverse pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-teal-400/20 blur-3xl" />
              </div>

              {/* Tech Grid Background Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0 opacity-40" />

              {/* Content Grid (2 Columns on Large Screen) */}
              <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
                {/* Left Text Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span>OEM &amp; Private Label Excellence</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight text-white drop-shadow-md">
                    Launch Your Brand with World-Class Formulations
                  </h2>

                  <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-normal">
                    Have a proprietary product concept? UNT Company provides end-to-end private label manufacturing. We match your brand with GMP-certified factories in South Korea, Japan, and Vietnam for custom cosmetics, supplements, beverages, and personal care lines.
                  </p>

                  {/* 4 Interactive Feature Badges with Vector Lucide Icons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {[
                      { title: 'Custom Formulas', desc: 'R&D & Lab Stability', icon: FlaskConical },
                      { title: 'Package Design', desc: 'Khmer Label Compliant', icon: Palette },
                      { title: 'Low Trial MOQs', desc: 'Flexible Batch Sizes', icon: Layers },
                      { title: 'Turnkey Clearance', desc: 'Ministry Permit Filing', icon: FileCheck2 },
                    ].map((badge, bIdx) => {
                      const BadgeIcon = badge.icon;
                      return (
                        <div
                          key={bIdx}
                          className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800 hover:border-emerald-400/80 hover:bg-emerald-500/20 transition-all duration-300 hover:scale-105 group/badge cursor-pointer shadow-md"
                        >
                          <div className="flex items-center space-x-2 mb-1.5">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover/badge:bg-emerald-500 group-hover/badge:text-slate-950 transition-colors shrink-0">
                              <BadgeIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-emerald-300 text-xs group-hover/badge:text-white transition-colors">
                              {badge.title}
                            </span>
                          </div>
                          <span className="text-emerald-100/80 text-[10px] block leading-tight">
                            {badge.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action CTA Button with Animated Arrow */}
                  <div className="pt-3">
                    <button
                      onClick={onOpenQuoteModal}
                      className="group/btn relative px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 flex items-center space-x-3 cursor-pointer overflow-hidden"
                    >
                      <span className="relative z-10">Start OEM Private Label Project</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1.5 transition-transform" />
                      {/* Button Shimmer Glare Overlay */}
                      <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out" />
                    </button>
                  </div>
                </div>

                {/* Right Interactive Lab Capsule Visual Column */}
                <div className="lg:col-span-5 hidden lg:block">
                  <div className="relative p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="live-pulse-dot" />
                        <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                          OEM Formula Lab Active
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        GMP Certified
                      </span>
                    </div>

                    {/* Animated Spec Counters */}
                    <div className="space-y-3 pt-1">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-medium">Formulation R&amp;D</span>
                        <span className="text-xs font-bold text-emerald-400">500+ Proprietary Formulas</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-medium">Origin Hubs</span>
                        <span className="text-xs font-bold text-emerald-400">Korea • Japan • Vietnam</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-medium">Compliance Rate</span>
                        <span className="text-xs font-bold text-emerald-400">100% Ministry Registration</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-200 text-center font-medium">
                      ✦ Direct Turnkey Private Label Product Launch
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </ScrollReveal>
      </section>

      {/* 6. Partner Brands Showcase — Live Infinite Autoplay Ticker */}
      <section className="bg-white dark:bg-[#0c1322] border-y border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300 overflow-hidden">
        <ScrollReveal animation="up">
          <div className="space-y-6">
            <div className="text-center flex items-center justify-center space-x-2">
              <span className="live-pulse-dot" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Trusted Global Manufacturing Partners &amp; Supplier Alliances (Live Network)
              </span>
            </div>

            {/* Live Infinite Marquee Track */}
            <div className="marquee-mask overflow-hidden w-full relative py-2">
              <div className="marquee-track flex space-x-5 w-max">
                {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
                  <div
                    key={`${partner.id}-${idx}`}
                    className="w-56 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1.5 hover:border-emerald-400/90 dark:hover:border-emerald-400/80 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 shrink-0 group/pcard cursor-pointer"
                  >
                    <div className="font-display font-black text-slate-900 dark:text-white text-base tracking-wide group-hover/pcard:text-emerald-500 transition-colors">
                      {partner.logoText}
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{partner.category}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center space-x-1">
                      <span className="text-emerald-500">✦</span>
                      <span>{partner.country}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. Latest News / Market Insights */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
        <ScrollReveal animation="up">
          <div className="flex items-end justify-between">
            <div className="text-left">
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                Market Intelligence
              </span>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">
                Latest Regulatory &amp; Trade Insights
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('blog')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors flex items-center space-x-1"
            >
              <span>View All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.slice(0, 3).map((article, idx) => (
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
