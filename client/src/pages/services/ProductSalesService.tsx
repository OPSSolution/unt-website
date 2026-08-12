import React, { useState } from 'react';
import {
  Globe2, ArrowRight, ShieldCheck, BadgePercent, Truck,
  PackageCheck, Flame, Check, Ship, Plane, Sparkles
} from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Card3D } from '../../components/Card3D';
import { countryContentDefaults, countryDetails, productBenefits, productCategories } from './servicesData';
import { useTradeHubs } from '../../hooks/useTradeHubs';
import { COUNTRY_FLAGS, COUNTRY_FLAG_EMOJIS, countryFlagUrl } from '../products/data';

interface ProductSalesServiceProps {
  onOpenQuoteModal: () => void;
  delay?: number;
  content: Record<string, any>;
}

const KHMER_TO_ENGLISH_NAME: Record<string, string> = {
  'កម្ពុជា': 'Cambodia',
  'ថៃ': 'Thailand',
  'វៀតណាម': 'Vietnam',
  'ឡាវ': 'Laos',
  'ម៉ាឡេស៊ី': 'Malaysia',
  'ចិន': 'China',
  'កូរ៉េខាងត្បូង': 'South Korea',
  'ជប៉ុន': 'Japan',
};

function CountryFlagLogo({ country, className = 'w-6 h-6' }: { country: any; className?: string }) {
  const tradeHubs = useTradeHubs();
  const rawName = String(country?.name ?? '').trim();
  const englishName = KHMER_TO_ENGLISH_NAME[rawName] || rawName;
  const code = String(country?.code ?? '').toUpperCase();

  const matchingHub = tradeHubs.find((h) =>
    (h.id && h.id.toUpperCase() === code) ||
    (h.name && h.name.toLowerCase() === englishName.toLowerCase()) ||
    (h.id && h.id.toLowerCase() === englishName.toLowerCase())
  );

  const flagUrl = country?.flagUrl || matchingHub?.flagUrl || COUNTRY_FLAGS[englishName] || countryFlagUrl(rawName, code);
  const flagEmoji = country?.flag || matchingHub?.flag || COUNTRY_FLAG_EMOJIS[englishName] || '🌐';

  const staticEntry = Object.values(countryDetails).find((c) =>
    c.code === code || c.name.toLowerCase() === englishName.toLowerCase()
  );

  if (flagUrl) {
    return (
      <img
        src={flagUrl}
        alt={rawName}
        className={`${className} object-cover rounded-full shadow-xs border border-slate-200 dark:border-white/20 shrink-0`}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  }

  if (staticEntry?.FlagComponent) {
    const StaticFlag = staticEntry.FlagComponent;
    return <StaticFlag className={className} />;
  }

  return <span className="text-xl leading-none shrink-0" aria-hidden="true">{flagEmoji}</span>;
}

export const ProductSalesService: React.FC<ProductSalesServiceProps> = ({ onOpenQuoteModal, delay = 0, content }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('KH');

  const countries = Array.isArray(content.origin_countries) && content.origin_countries.length ? content.origin_countries : countryContentDefaults;
  const categories = Array.isArray(content.product_categories) && content.product_categories.length ? content.product_categories : productCategories;
  const benefits = Array.isArray(content.product_benefits) && content.product_benefits.length ? content.product_benefits : productBenefits;
  const activeCountryInfo = countries.find((country: any) => country.code === selectedCountry) ?? countries[0] ?? countryContentDefaults[0];

  return (
    <section className="space-y-6">

      {/* ─── Section Header ─── */}
      <ScrollReveal animation="up" delay={delay}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <span>{content.product_badge ?? 'Service 01 — Local Stock Distribution'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              {content.product_title ?? 'Product Sales'} <span className="text-emerald-600 dark:text-emerald-400">{content.product_highlight ?? '(Local Cambodian Inventory)'}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {content.product_desc ?? 'Skip foreign supplier risk and international freight delays. We import premium goods directly, verify quality, and hold local stock in Phnom Penh ready for immediate delivery.'}
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="btn-shine px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 font-black text-sm shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 shrink-0 self-start transition-all hover:scale-105 active:scale-95"
          >
            <span>{content.product_cta ?? 'Browse Live Wholesale Stock'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ScrollReveal>

      {/* ─── Country Selector Row ─── */}
      <ScrollReveal animation="up" delay={delay + 60}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 dark:text-emerald-300/70 uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>{content.origin_selector_label ?? 'Select Origin Country'}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {countries.map((country: any, idx: number) => {
              const isSelected = selectedCountry === country.code || (idx === 0 && !countries.some((c: any) => c.code === selectedCountry));
              return (
                <button
                  key={`${country.code}-${idx}`}
                  onClick={() => setSelectedCountry(country.code)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all duration-300 border animate-fade-in ${isSelected
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border-emerald-500 shadow-lg scale-[1.03] ring-2 ring-emerald-500/30'
                    : 'bg-white dark:bg-white/5 text-slate-800 dark:text-white border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:shadow-md active:scale-95 shadow-sm'
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <CountryFlagLogo country={country} />
                    <span className="font-extrabold truncate">{country.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Country Spotlight Card ─── */}
      <ScrollReveal animation="up" delay={delay + 120}>
        <Card3D intensity={4}>
          <div className="rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden transition-colors duration-300">

            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966905_1px,transparent_1px),linear-gradient(to_bottom,#05966905_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-emerald-100 dark:border-emerald-500/15 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-white/10 border border-emerald-200 dark:border-emerald-400/30 flex items-center justify-center p-1.5 shadow-sm shrink-0 overflow-hidden">
                  <CountryFlagLogo country={activeCountryInfo} className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 uppercase tracking-widest">{activeCountryInfo.code}</span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white">{activeCountryInfo.name}</h3>
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{activeCountryInfo.niche}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Ship className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{activeCountryInfo.seaTransit}</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Plane className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{activeCountryInfo.airTransit}</span>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95"
                >
                  <span>{content.source_from_label ?? 'Source from'} {activeCountryInfo.name}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 3-Column Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-700 dark:text-emerald-400 block">{content.corridor_overview_label ?? 'Overview'}</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{activeCountryInfo.desc}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-700 dark:text-emerald-400 block">{content.compliance_standards_label ?? 'Compliance Standards'}</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeCountryInfo.standards.map((st) => (
                    <span key={st} className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-400/30 text-[11px] font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{st}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="font-extrabold uppercase text-[10px] tracking-wider text-emerald-700 dark:text-emerald-400 block">{content.top_products_label ?? 'Top Sourced Products'}</span>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300 font-medium">
                  {activeCountryInfo.topProducts.map((tp) => (
                    <li key={tp} className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{tp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card3D>
      </ScrollReveal>

      {/* ─── Product Categories Grid ─── */}
      <ScrollReveal animation="up" delay={delay + 180}>
        <div className="space-y-3">
          <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {content.stock_categories_label ?? 'Product Categories Available in Stock'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat: any, idx: number) => (
              <Card3D key={cat.title} intensity={10}>
                <div
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500 transition-all text-center space-y-2 group shadow-sm animate-fade-in cursor-default"
                >
                  <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">{cat.title}</h4>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block">{cat.count}</span>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ─── 3 Key Benefits Row ─── */}
      <ScrollReveal animation="up" delay={delay + 240}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((benefit: any, idx: number) => {
            const BenefitIcon = [ShieldCheck, BadgePercent, Truck][idx] ?? ShieldCheck;
            return (
              <Card3D key={benefit.title} intensity={8}>
                <div
                  style={{ animationDelay: `${idx * 70}ms` }}
                  className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2 animate-fade-in hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <BenefitIcon className="w-5 h-5" /> {benefit.title}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </Card3D>
            );
          })}
        </div>
      </ScrollReveal>

    </section>
  );
};
