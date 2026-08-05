import { ArrowRight, CheckCircle2, PackageCheck, ShieldCheck } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';

interface ServiceContent {
  oem_title?: string;
  oem_desc?: string;
  oem_cta?: string;
  customs_title?: string;
  customs_desc?: string;
  customs_cta?: string;
}

export function ServicePillars({ content, onQuote }: { content: ServiceContent; onQuote: () => void }) {
  const pillars = [
    {
      icon: PackageCheck,
      badge: 'GMP Certified',
      title: content.oem_title ?? 'Turnkey OEM & Private Label Formulations',
      description: content.oem_desc ?? 'Launch proprietary brand lines with minimal upfront R&D costs. We handle formula matching, stability testing, custom packaging, and multi-lingual labels.',
      cta: content.oem_cta ?? 'Discuss Private Label Project',
      items: ['Korean, Japanese, and Thai GMP Laboratories', 'Khmer & English Ministry Compliant Outer Packaging', 'Low Minimum Order Quantities for Initial Batches'],
    },
    {
      icon: ShieldCheck,
      badge: 'GDCE Compliant',
      title: content.customs_title ?? 'GDCE Customs Brokerage & Ministry Registration',
      description: content.customs_desc ?? 'Our licensed Phnom Penh customs brokers manage import declarations, tax tariff classification, and Ministry health import certificates.',
      cta: content.customs_cta ?? 'Request Customs Clearance Consultation',
      items: ['Fast-Track Ministry of Commerce & Health Permit Approvals', 'Customs Duty Relief & Tariff Classification Guidance', 'Port-to-Warehouse Temperature-Controlled Transport'],
    },
  ];

  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <ScrollReveal key={pillar.title} animation={index === 0 ? 'right' : 'left'} delay={index * 150}>
              <Card3D intensity={14}>
                <article className="p-8 rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-lg space-y-6 text-left h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between"><div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400"><Icon className="w-6 h-6" /></div><div className="live-pulse-badge"><span className="live-pulse-dot" /><span>{pillar.badge}</span></div></div>
                    <h3 className="text-2xl font-display font-bold">{pillar.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{pillar.description}</p>
                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {pillar.items.map((item) => <li key={item} className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /><span>{item}</span></li>)}
                    </ul>
                  </div>
                  <button type="button" onClick={onQuote} className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 flex items-center space-x-2 shadow-sm w-fit"><span>{pillar.cta}</span><ArrowRight className="w-4 h-4" /></button>
                </article>
              </Card3D>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
