import React, { useEffect, useState } from 'react';
import { PageTab } from '../types';
import { ARTICLES, PARTNERS } from '../data/mockData';
import { ArrowRight, ShieldCheck, Globe, Truck, Package, Sparkles, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
  onOpenProductModal: (product: any) => void;
  onOpenArticleModal: (article: any) => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop';

const PILLARS_DEFAULT = {
  badge: 'Full-Spectrum Trading Infrastructure',
  heading: 'Integrated Solutions for Modern Commerce',
  subheading: 'UNT Company operates as a complete commercial gateway, managing product supply chains from initial factory audits to local market distribution.',
  pillar1_title: 'Premium Product Distribution',
  pillar1_desc: 'Direct access to verified international wholesale catalogs spanning Food & Beverage, Skincare, Beauty, Personal Care, Health Supplements, and Household FMCG.',
  pillar2_title: 'Sourcing-as-a-Service & OEM',
  pillar2_desc: 'End-to-end custom procurement. We audit factories in Thailand, Korea, Japan, and China, negotiate pricing, inspect pre-shipment batches, and clear Cambodian customs.',
  pillar3_title: 'Sales & Trade Capacity Academy',
  pillar3_desc: 'Empowering commercial teams, sales reps, and procurement directors with masterclasses in B2B negotiation, buyer psychology, key account management, and retention.',
};

const HERITAGE_DEFAULT = {
  badge: 'Balancing Heritage with Modern Efficiency',
  heading: 'Bridging International Factories with Cambodian Commerce',
  paragraph: "Global supply chains are complex, but sourcing doesn't have to be. UNT Company combines deep local market knowledge with international trade relationships to provide smooth, transparent procurement.",
  feature1_title: 'Direct Factory Access',
  feature1_desc: 'Eliminate middlemen markup. We connect you directly to verified factories in Thailand, South Korea, Japan, Vietnam, and China.',
  feature2_title: 'Full Customs & Ministry Permits',
  feature2_desc: 'We manage product registration with the Cambodian Ministry of Health, Ministry of Commerce, and GDCE customs clearance.',
  feature3_title: 'End-to-End Door Delivery',
  feature3_desc: 'Temperature-controlled logistics from overseas port loading directly to your Phnom Penh or provincial distribution center.',
  quality_badge: 'The UNT Quality Standard',
  quality_desc: 'Zero product returns due to quality defects across 2024–2026. Audit-verified production from certified ISO/GMP manufacturers.',
};

const OEM_DEFAULT = {
  badge: 'OEM & Private Label Excellence',
  heading: 'Launch Your Brand with World-Class Formulations',
  paragraph: 'Have a proprietary product concept? UNT Company provides end-to-end private label manufacturing. We match your brand with GMP-certified factories in South Korea, Japan, and Thailand for custom cosmetics, supplements, beverages, and personal care lines.',
  chip1_title: 'Custom Formulas', chip1_sub: 'R&D & Lab Stability',
  chip2_title: 'Package Design', chip2_sub: 'Khmer Label Compliant',
  chip3_title: 'Low Trial MOQs', chip3_sub: 'Flexible Batch Sizes',
  chip4_title: 'Turnkey Clearance', chip4_sub: 'Ministry Permit Filing',
  cta: 'Start OEM Private Label Project',
};

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenQuoteModal,
  onOpenProductModal,
  onOpenArticleModal,
}) => {
  const [featureImage, setFeatureImage] = useState(FALLBACK_IMAGE);
  const [pillars, setPillars] = useState(PILLARS_DEFAULT);
  const [heritage, setHeritage] = useState(HERITAGE_DEFAULT);
  const [oem, setOem] = useState(OEM_DEFAULT);
  const [products, setProducts] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>(ARTICLES);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
    fetch(`${base}/api/hero/content`)
      .then((r) => r.json())
      .then((d) => { if (d.feature_image) setFeatureImage(d.feature_image); })
      .catch(() => {});
    fetch(`${base}/api/homepage/pillars`)
      .then((r) => r.json()).then((d) => { if (d.data) setPillars(d.data); }).catch(() => {});
    fetch(`${base}/api/homepage/heritage`)
      .then((r) => r.json()).then((d) => { if (d.data) setHeritage(d.data); }).catch(() => {});
    fetch(`${base}/api/homepage/oem_banner`)
      .then((r) => r.json()).then((d) => { if (d.data) setOem(d.data); }).catch(() => {});
    fetch(`${base}/api/products`)
      .then((r) => r.json()).then((d) => { if (Array.isArray(d)) setProducts(d); }).catch(() => {});
    fetch(`${base}/api/articles`)
      .then((r) => r.json()).then((d) => { if (Array.isArray(d) && d.length) setArticles(d); }).catch(() => {});
  }, []);

  return (
    <div className="space-y-20 pb-16 bg-slate-50 text-slate-900">
      {/* 1. Hero Section - Executive Light Background with Emerald Accents */}
      <section className="relative py-20 lg:py-28 flex items-center justify-center overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Cambodia’s Premier Trading & Sourcing Ecosystem</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 tracking-tight max-w-5xl mx-auto leading-[1.1]">
            Your Trusted Sourcing Partner —{' '}
            <span className="emerald-gradient-text">From the World to Cambodia</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            Unique Noble Trading Co., Ltd. (<strong className="text-slate-900">UNT Company</strong>) bridges international manufacturers with retail networks across ASEAN. We streamline product sourcing, OEM private label manufacturing, distribution, and commercial sales training.
          </p>

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
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border border-slate-300 shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Request B2B Quote</span>
            </button>
          </div>

          {/* Quick Stats Grid Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700">$50M+</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Annual Trade Volume</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700">500+</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Audited Factories</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700">15+</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Global Trade Origins</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-700">99.4%</div>
              <div className="text-xs text-slate-600 font-medium mt-1">On-Time Customs Clearance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Pillars / Integrated Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="px-3.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full">
            {pillars.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            {pillars.heading}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            {pillars.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div 
            onClick={() => setActiveTab('products')}
            className="group cursor-pointer p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Pillar One</span>
              <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {pillars.pillar1_title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pillars.pillar1_desc}
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Authentic Factory Sealed Lots</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Khmer Language Labeling Compliance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Temperature Controlled Logistics</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>View Wholesale Catalog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div 
            onClick={() => setActiveTab('services')}
            className="group cursor-pointer p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Pillar Two</span>
              <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {pillars.pillar2_title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pillars.pillar2_desc}
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Turnkey OEM Private Label Manufacturing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>AQL 2.5 Strict Quality Inspection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>GDCE Brokerage & Door Delivery</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Explore Sourcing Process</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div 
            onClick={() => setActiveTab('training')}
            className="group cursor-pointer p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-400 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Pillar Three</span>
              <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {pillars.pillar3_title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pillars.pillar3_desc}
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2 font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1,200+ Professionals Certified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tailored Corporate In-House Bootcamps</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Negotiation & Contract Strategies</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>View Training Modules</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Heritage & Efficiency Feature Showcase */}
      <section className="bg-white border-y border-slate-200 py-20 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
            <img
              src={featureImage}
              alt="Container Ship Logistics"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-lg">
              <div className="flex items-center space-x-3 text-emerald-700 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                <span>{heritage.quality_badge}</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">
                {heritage.quality_desc}
              </p>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6 text-left">
            <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
              {heritage.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900">
              {heritage.heading}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {heritage.paragraph}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{heritage.feature1_title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{heritage.feature1_desc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{heritage.feature2_title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{heritage.feature2_desc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{heritage.feature3_title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{heritage.feature3_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="text-left">
            <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
              Wholesale & OEM Catalog
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
              Featured Import Catalog Items
            </h2>
            <p className="text-slate-600 text-sm mt-1">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              onClick={() => onOpenProductModal(product)}
              className="group cursor-pointer rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold rounded-lg flex items-center space-x-1.5 border border-slate-200 shadow-sm">
                    <span>{product.origin_flag}</span>
                    <span>{product.origin}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3 text-left">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                    <div>
                      <span className="block text-[10px] uppercase font-semibold text-slate-400">MOQ</span>
                      <span className="font-semibold text-slate-900">{product.moq}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] uppercase font-semibold text-slate-400">Lead Time</span>
                      <span className="font-semibold text-slate-900">{product.lead_time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700">View Technical Specs</span>
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all border border-emerald-200">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OEM Private Label Section Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl text-left">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-400/30">
              {oem.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
              {oem.heading}
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              {oem.paragraph}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs">
                <span className="font-bold text-emerald-300 block">{oem.chip1_title}</span>
                <span className="text-emerald-100 text-[10px]">{oem.chip1_sub}</span>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs">
                <span className="font-bold text-emerald-300 block">{oem.chip2_title}</span>
                <span className="text-emerald-100 text-[10px]">{oem.chip2_sub}</span>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs">
                <span className="font-bold text-emerald-300 block">{oem.chip3_title}</span>
                <span className="text-emerald-100 text-[10px]">{oem.chip3_sub}</span>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs">
                <span className="font-bold text-emerald-300 block">{oem.chip4_title}</span>
                <span className="text-emerald-100 text-[10px]">{oem.chip4_sub}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>{oem.cta}</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partner Brands Showcase */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Trusted Global Manufacturing Partners & Supplier Alliances
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 hover:border-emerald-400 transition-colors shadow-sm"
              >
                <div className="font-display font-black text-slate-900 text-sm tracking-wide">
                  {partner.logoText}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold">{partner.category}</div>
                <div className="text-[10px] text-slate-500">{partner.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Latest News / Market Insights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div className="text-left">
            <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
              Market Intelligence
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
              Latest Regulatory & Trade Insights
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('blog')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center space-x-1"
          >
            <span>View All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(0, 2).map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticleModal(article)}
              className="group cursor-pointer rounded-3xl bg-white border border-slate-200 p-6 shadow-md hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
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
                  <div className="text-xs text-slate-500 flex items-center space-x-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.read_time ?? article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Read Full Analysis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
