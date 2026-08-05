import React, { useState } from 'react';
import { PageTab } from '../types';
import {
  ShieldCheck,
  Globe,
  Building2,
  Users,
  ArrowRight,
  Truck,
  CheckCircle2,
  Award,
  TrendingUp,
  Sparkles,
  MapPin,
  BarChart3,
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card3D } from '../components/Card3D';
import { useHomepageSections } from '../hooks/useHomepageSections';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

const TIMELINE = [
  {
    year: '2018',
    title: 'Founded in Phnom Penh',
    desc: 'UNT was established with a vision to modernize Cambodian import commerce and bridge the gap between international factories and local retailers.',
  },
  {
    year: '2019',
    title: 'First Factory Partnerships',
    desc: 'Secured direct factory partnerships in South Korea and Vietnam, launching premium skincare and F&B product lines into Cambodia.',
  },
  {
    year: '2021',
    title: 'OEM & Private Label Launch',
    desc: 'Expanded into custom OEM manufacturing, helping Cambodian brands create their own private label products with international quality standards.',
  },
  {
    year: '2023',
    title: 'Sales Training Academy',
    desc: 'Launched the UNT Sales Academy, training 1,200+ commercial professionals in B2B negotiation, buyer psychology, and key account management.',
  },
  {
    year: '2025',
    title: 'Regional Expansion',
    desc: 'Extended sourcing network to Japan, China, Laos, and Malaysia — serving 500+ retail partners across Cambodia with $50M+ annual trade volume.',
  },
];

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: 'Integrity First',
    desc: 'Every product we source, every factory we audit, and every deal we broker is grounded in transparency and ethical business practices.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    desc: 'We continuously modernize supply chains with technology, data-driven sourcing decisions, and new commercial training methodologies.',
  },
  {
    icon: Users,
    title: 'Partnership',
    desc: 'We don\'t just sell products — we build long-term relationships with our clients, becoming an extension of their procurement team.',
  },
  {
    icon: Award,
    title: 'Excellence',
    desc: 'From AQL 2.5 quality inspections to 99.4% on-time customs clearance, we hold ourselves to the highest operational standards.',
  },
];

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: 'Direct Factory Audit',
    desc: 'We physically audit ISO and GMP facilities across Vietnam, Korea, Japan, and China to verify production capacity and safety.',
    badge: 'ISO Audit',
    metric: '500+',
    metricLabel: 'Factories Audited',
  },
  {
    icon: Building2,
    title: 'In-House Customs Brokerage',
    desc: 'Licensed GDCE customs brokers handle tax classification, ASYCUDA filings, and ministry permits to eliminate port hold-ups.',
    badge: 'GDCE Broker',
    metric: '99.4%',
    metricLabel: 'On-Time Clearance',
  },
  {
    icon: Truck,
    title: 'Cold Chain & Logistics',
    desc: 'Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate F&B, cosmetics, and health products.',
    badge: 'Reefer Logistics',
    metric: '24-48h',
    metricLabel: 'Delivery Time',
  },
  {
    icon: Users,
    title: 'Sales & Capacity Building',
    desc: 'We don\'t just supply products; we train client commercial teams in consultative selling, buyer psychology, and key account growth.',
    badge: 'Academy Live',
    metric: '1,200+',
    metricLabel: 'Professionals Trained',
  },
];

const HUBS = [
  {
    flags: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png'],
    region: 'Ho Chi Minh & Hanoi',
    title: 'Vietnam Corridor',
    desc: 'Cross-border overland logistics hub for rapid F&B, organic products, teas, and household consumer goods into Cambodia.',
    tags: ['F&B', 'Organic', 'Household'],
  },
  {
    flags: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png',
      'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png',
    ],
    region: 'Seoul & Tokyo',
    title: 'K-Beauty & J-Health Labs',
    desc: 'Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare and anti-aging treatments.',
    tags: ['Skincare', 'Supplements', 'OEM'],
  },
  {
    flags: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png',
    ],
    region: 'Guangzhou & Shenzhen',
    title: 'China Manufacturing',
    desc: 'Bulk manufacturing, custom eco packaging, and cost-effective product lines for large-scale distribution across Cambodia.',
    tags: ['Packaging', 'Wholesale', 'Manufacturing'],
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const [activeTimeline, setActiveTimeline] = useState(TIMELINE.length - 1);
  const sections = useHomepageSections();
  const data = sections.about_page ?? {};

  return (
    <div className="space-y-0 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER — Full-width gradient with ambient mesh
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        {/* Ambient Glow Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-400/10 dark:bg-emerald-400/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-3xl" />
        </div>

        <ScrollReveal animation="up">
          <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-6">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About UNT Company</span>
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              The Bridge to{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Global Trade
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              {data.subheadline ?? 'Unique Noble Trading Co., Ltd. (UNT Company) is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.'}
            </p>


          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. MISSION & VISION — Split layout with image showcase
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-left">
        <ScrollReveal animation="right">
          <div className="space-y-6">
            <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
              Our Purpose & Mission
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
              Connecting World-Class Manufacturers with Emerging ASEAN Markets
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded with the vision of modernizing Cambodian import commerce, UNT Company acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners. We remove cross-border trade friction by taking full responsibility for supplier auditing, volume pricing negotiation, quality control, customs clearance, and product compliance.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.
            </p>

            {/* Highlight Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Factory Audits', 'OEM Manufacturing', 'Customs Brokerage', 'Sales Training', 'Cold Chain Logistics'].map((chip) => (
                <span key={chip} className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{chip}</span>
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="left" delay={200}>
          <Card3D intensity={10}>
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop"
                alt="UNT Headquarters Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

              {/* Floating Info Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 dark:bg-[#0c1322]/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl rounded-2xl shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Phnom Penh Corporate HQ</span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                      Phnom Penh Tower, Monivong Blvd, Doun Penh
                    </div>
                  </div>
                  <div className="live-pulse-badge">
                    <span className="live-pulse-dot" />
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. CORE VALUES — Gradient icon cards
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-[#0B0F17] border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <ScrollReveal animation="up">
            <div className="text-center space-y-3 mb-12">
              <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                What Drives Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
                Our Core Values
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">
                These principles guide every decision we make, from factory floor audits to client partnerships.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={idx} animation="up" delay={idx * 100}>
                  <Card3D intensity={18}>
                    <div className="group p-7 rounded-3xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-400/20 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between [transform-style:preserve-3d] backdrop-blur-sm select-none">
                      <div className="[transform-style:preserve-3d]">
                        {/* 3D Floating Icon Box */}
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md mb-6 [transform:translateZ(45px)]">
                          <Icon className="w-6 h-6" />
                        </div>
                        {/* 3D Floating Title */}
                        <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2.5 [transform:translateZ(30px)] transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {val.title}
                        </h3>
                        {/* 3D Floating Description */}
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed [transform:translateZ(15px)]">
                          {val.desc}
                        </p>
                      </div>
                      {/* 3D Floating Index */}
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-5 [transform:translateZ(20px)]">
                        Value 0{idx + 1}
                      </div>
                    </div>
                  </Card3D>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. UNT ADVANTAGE — 4-pillar grid with metrics
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <ScrollReveal animation="up">
            <div className="text-center space-y-3 mb-12">
              <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                Why Business Leaders Choose UNT
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
                The UNT Advantage
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <ScrollReveal key={idx} animation="up" delay={idx * 100}>
                  <Card3D intensity={12}>
                    <div className="group relative p-6 rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-emerald-400/60 dark:hover:border-emerald-400/40 transition-all duration-500 h-full flex flex-col overflow-hidden">
                      {/* Top glare */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />

                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="live-pulse-badge">
                          <span className="live-pulse-dot" />
                          <span>{adv.badge}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {adv.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">
                        {adv.desc}
                      </p>

                      {/* Metric Badge */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400">{adv.metric}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{adv.metricLabel}</div>
                        </div>
                        <BarChart3 className="w-5 h-5 text-emerald-400/40" />
                      </div>
                    </div>
                  </Card3D>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. COMPANY TIMELINE — Interactive milestone journey
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-[#0B0F17] border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <ScrollReveal animation="up">
            <div className="text-center space-y-3 mb-12">
              <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
                Milestones & Growth
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="up" delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Timeline Steps */}
              <div className="space-y-0">
                {TIMELINE.map((item, idx) => {
                  const isActive = activeTimeline === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTimeline(idx)}
                      className={`group w-full text-left flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-700/60 shadow-md'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                        }`}
                    >
                      {/* Year Badge */}
                      <div className={`shrink-0 w-16 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                        }`}>
                        {item.year}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                          }`}>
                          {item.title}
                        </h4>
                        {isActive && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 animate-fadeIn">
                            {item.desc}
                          </p>
                        )}
                      </div>

                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Showcase */}
              <Card3D intensity={10}>
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white border border-emerald-500/30 shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-between">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      <span>Year {TIMELINE[activeTimeline].year}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight">
                      {TIMELINE[activeTimeline].title}
                    </h3>
                    <p className="text-emerald-100/80 text-sm leading-relaxed max-w-md">
                      {TIMELINE[activeTimeline].desc}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 pt-6">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs text-emerald-300 font-medium">
                      Milestone {activeTimeline + 1} of {TIMELINE.length}
                    </span>
                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5 ml-auto">
                      {TIMELINE.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTimeline ? 'bg-emerald-400 scale-125' : i < activeTimeline ? 'bg-emerald-600' : 'bg-white/20'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. GLOBAL SOURCING HUBS — Map-style cards with flag images
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
          <ScrollReveal animation="up">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
                Strategic Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
                Our Global Network & Operations Hubs
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {HUBS.map((hub, idx) => (
              <ScrollReveal key={idx} animation="up" delay={idx * 100}>
                <Card3D intensity={12}>
                  <div className="group p-6 rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-emerald-400/60 dark:hover:border-emerald-400/40 transition-all duration-500 h-full flex flex-col overflow-hidden">
                    {/* Top glare */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />

                    {/* Flag Row */}
                    <div className="flex items-center gap-2 mb-4">
                      {hub.flags.map((flag, fIdx) => (
                        <img
                          key={fIdx}
                          src={flag}
                          alt=""
                          className="w-10 h-7 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                        />
                      ))}
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">
                        {hub.region}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {hub.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">
                      {hub.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {hub.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal animation="up" delay={200}>
            <div className="pt-8 text-center">
              <button
                onClick={onOpenQuoteModal}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 inline-flex items-center space-x-2"
              >
                <span>Partner with UNT Company</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
