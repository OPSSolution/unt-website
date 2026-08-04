import React, { useEffect, useState } from 'react';
import { PageTab } from '../types';
import { ShieldCheck, Globe, Building2, Users, ArrowRight, Truck } from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

const DEFAULTS = {
  badge: 'About UNT Company',
  headline: 'The Bridge to Global Trade',
  subheadline: 'Unique Noble Trading Co., Ltd. (UNT Company) is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.',
  mission_badge: 'Our Purpose & Mission',
  mission_heading: 'Connecting World-Class Manufacturers with Emerging ASEAN Markets',
  mission_p1: 'Founded with the vision of modernizing Cambodian import commerce, UNT Company acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners. We remove cross-border trade friction by taking full responsibility for supplier auditing, volume pricing negotiation, quality control, customs clearance, and product compliance.',
  mission_p2: 'Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.',
  mission_image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
  hq_label: 'Phnom Penh Corporate Headquarters',
  hq_address: 'Phnom Penh Tower, Monivong Blvd, Doun Penh, Phnom Penh',
  stat1_value: '100%', stat1_label: 'Regulatory & Tax Audit Compliant',
  stat2_value: '1,200+', stat2_label: 'Trade & Sales Professionals Trained',
  adv_badge: 'Why Business Leaders Choose UNT',
  adv_heading: 'The UNT Advantage',
  adv1_title: 'Direct Factory Audit', adv1_desc: 'We physically audit ISO and GMP facilities across Thailand, Vietnam, Korea, Japan, and China to verify production capacity and safety.',
  adv2_title: 'In-House Customs Brokerage', adv2_desc: 'Licensed GDCE customs brokers handle tax classification, ASYCUDA filings, and ministry permits to eliminate port hold-ups.',
  adv3_title: 'Cold Chain & Logistics', adv3_desc: 'Temperature-monitored reefer trucking and Phnom Penh warehousing protect delicate F&B, cosmetics, and health products.',
  adv4_title: 'Sales & Capacity Building', adv4_desc: "We don't just supply products; we train client commercial teams in consultative selling, buyer psychology, and key account growth.",
  net_badge: 'Strategic Infrastructure',
  net_heading: 'Our Global Network & Operations Hubs',
  net_sub: 'Local presence in key manufacturing capitals ensures rapid sampling, immediate factory audits, and direct supplier oversight.',
  hub1_flags: '🇹🇭 🇻🇳', hub1_title: 'Bangkok & Ho Chi Minh Corridors', hub1_desc: 'Cross-border overland logistics hub for rapid F&B, organic coconut water, teas, and household consumer product shipments into Cambodia.',
  hub2_flags: '🇰🇷 🇯🇵', hub2_title: 'Seoul & Tokyo OEM Laboratories', hub2_desc: 'Access to audited GMP cosmetics laboratories and health supplement formulators for premium skincare lines and anti-aging treatments.',
  hub3_flags: '🇨🇳 🇰🇭', hub3_title: 'Guangzhou & Phnom Penh Central', hub3_desc: 'Bulk manufacturing, custom eco packaging, and central distribution warehouse located in Phnom Penh for rapid order fulfillment.',
  cta: 'Partner with UNT Company',
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const [d, setD] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${BASE}/api/homepage/about_page`)
      .then((r) => r.json()).then((res) => { if (res.data) setD(res.data); }).catch(() => {});
  }, []);

  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 text-slate-900">
      {/* 1. Header Banner */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
            {d.badge}
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900">
            {d.headline.split('Global Trade').map((part, i, arr) =>
              i < arr.length - 1
                ? <React.Fragment key={i}>{part}<span className="emerald-gradient-text">Global Trade</span></React.Fragment>
                : part
            )}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">{d.subheadline}</p>
        </div>
      </section>

      {/* 2. Mission & Strategic Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <div className="space-y-6">
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">{d.mission_badge}</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">{d.mission_heading}</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{d.mission_p1}</p>
          <p className="text-slate-600 text-sm leading-relaxed">{d.mission_p2}</p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-emerald-700">{d.stat1_value}</div>
              <div className="text-xs text-slate-600 font-medium mt-1">{d.stat1_label}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-display font-bold text-emerald-700">{d.stat2_value}</div>
              <div className="text-xs text-slate-600 font-medium mt-1">{d.stat2_label}</div>
            </div>
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white aspect-video lg:aspect-square">
          <img src={d.mission_image} alt="UNT Headquarters Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 border border-slate-200 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="text-emerald-700 font-bold text-sm">{d.hq_label}</div>
            <div className="text-slate-600 text-xs mt-0.5">{d.hq_address}</div>
          </div>
        </div>
      </section>

      {/* 3. The UNT Advantage */}
      <section className="bg-white border-y border-slate-200 py-16 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">{d.adv_badge}</span>
            <h2 className="text-3xl font-display font-bold text-slate-900">{d.adv_heading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[{icon:<ShieldCheck className="w-6 h-6"/>,t:d.adv1_title,desc:d.adv1_desc},{icon:<Building2 className="w-6 h-6"/>,t:d.adv2_title,desc:d.adv2_desc},{icon:<Truck className="w-6 h-6"/>,t:d.adv3_title,desc:d.adv3_desc},{icon:<Users className="w-6 h-6"/>,t:d.adv4_title,desc:d.adv4_desc}].map((item,i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">{item.icon}</div>
                <h3 className="text-lg font-display font-bold text-slate-900">{item.t}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Network */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">{d.net_badge}</span>
          <h2 className="text-3xl font-display font-bold text-slate-900">{d.net_heading}</h2>
          <p className="text-slate-600 text-sm">{d.net_sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[{flags:d.hub1_flags,title:d.hub1_title,desc:d.hub1_desc},{flags:d.hub2_flags,title:d.hub2_title,desc:d.hub2_desc},{flags:d.hub3_flags,title:d.hub3_title,desc:d.hub3_desc}].map((hub,i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <div className="text-2xl">{hub.flags}</div>
              <h3 className="text-lg font-display font-bold text-slate-900">{hub.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{hub.desc}</p>
            </div>
          ))}
        </div>
        <div className="pt-6 text-center">
          <button onClick={onOpenQuoteModal} className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-sm shadow-md hover:from-emerald-500 hover:to-emerald-600 transition-all inline-flex items-center space-x-2">
            <span>{d.cta}</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
