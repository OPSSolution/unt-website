import { useState } from 'react';
import { Globe, GraduationCap, Layers, LayoutGrid, Package } from 'lucide-react';
import { CarouselSlider3D } from '../../components/CarouselSlider3D';
import { PillarCard } from '../../components/PillarCard';
import { ScrollReveal } from '../../components/ScrollReveal';
import type { PageTab } from '../../types';
import { useHomepageSections } from '../../hooks/useHomepageSections';
import { useLanguage } from '../../i18n/LanguageContext';

const PILLARS = [
  { number: 'Pillar One', title: 'Premium Product Distribution', description: 'Direct access to verified international wholesale catalogs spanning Food & Beverage, Skincare, Beauty, Personal Care, Health Supplements, and Household FMCG.', icon: Package, badge: 'Live Stock', action: 'View Wholesale Catalog', tab: 'products' as PageTab, bullets: ['100% Authentic Factory Sealed Lots', 'Khmer Language Labeling Compliance', 'Temperature Controlled Logistics'], metrics: [{ label: 'Active SKUs', value: '10,000+' }, { label: 'Delivery', value: '24-48 Hours' }, { label: 'Compliance', value: '100% Ministry' }, { label: 'Storage', value: 'Reefer Cold Chain' }] },
  { number: 'Pillar Two', title: 'Sourcing-as-a-Service & OEM', description: 'End-to-end custom procurement with audited factories, pricing negotiation, inspection, and Cambodian customs clearance.', icon: Globe, badge: 'GDCE Ready', action: 'Explore Sourcing Process', tab: 'services' as PageTab, bullets: ['Turnkey OEM Private Label Manufacturing', 'AQL 2.5 Strict Quality Inspection', 'GDCE Brokerage & Door Delivery'], metrics: [{ label: 'Factory Audits', value: '500+ ISO/GMP' }, { label: 'Clearance Rate', value: '99.4% On-Time' }, { label: 'Origin Hubs', value: '4 Countries' }, { label: 'Quality Standard', value: 'AQL 2.5 Strict' }] },
  { number: 'Pillar Three', title: 'Sales & Trade Capacity Academy', description: 'Empowering commercial teams with masterclasses in B2B negotiation, buyer psychology, key account management, and retention.', icon: GraduationCap, badge: 'Academy Active', action: 'View Training Modules', tab: 'training' as PageTab, bullets: ['1,200+ Professionals Certified', 'Tailored Corporate In-House Bootcamps', 'Negotiation & Contract Strategies'], metrics: [{ label: 'Certified Reps', value: '1,200+' }, { label: 'Client Lift', value: '+38% Growth' }, { label: 'Format', value: 'In-House Bootcamps' }, { label: 'Certificates', value: 'UNT Accredited' }] },
];

export function HomeSolutions({ onNavigate }: { onNavigate: (tab: PageTab) => void }) {
  const [displayMode, setDisplayMode] = useState<'grid' | 'carousel'>('carousel');
  const { language } = useLanguage();
  const englishOnly = (value: string) => language === 'en' ? value : '';
  const content = useHomepageSections().pillars ?? {};
  const localizedPillars = PILLARS.map((pillar, index) => {
    const number = index + 1;
    return {
      ...pillar,
      number: content[`pillar${number}_number`] ?? englishOnly(pillar.number),
      title: content[`pillar${number}_title`] ?? englishOnly(pillar.title),
      description: content[`pillar${number}_desc`] ?? englishOnly(pillar.description),
      badge: content[`pillar${number}_badge`] ?? englishOnly(pillar.badge),
      action: content[`pillar${number}_cta`] ?? englishOnly(pillar.action),
      bullets: pillar.bullets.map((bullet, bulletIndex) =>
        content[`pillar${number}_bullet${bulletIndex + 1}`] ?? englishOnly(bullet)),
    };
  });
  const cards = localizedPillars.map((pillar) => {
    const Icon = pillar.icon;
    return <PillarCard key={pillar.number} pillarNumber={pillar.number} title={pillar.title} description={pillar.description} icon={<Icon className="w-7 h-7" />} badgeText={pillar.badge} actionText={pillar.action} bullets={pillar.bullets} metrics={pillar.metrics} onClick={() => onNavigate(pillar.tab)} />;
  });
  return (
    <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative py-6">
      <div className="absolute -top-16 -left-12 w-80 h-80 rounded-full glass-circle-morphism animate-float-orb pointer-events-none hidden sm:flex"><div className="w-56 h-56 rounded-full bg-emerald-400/25 blur-2xl" /></div>
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 rounded-[44px] glass-circle-morphism shadow-2xl">
        <ScrollReveal animation="up"><div className="text-center space-y-4 mb-10"><span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.badge ?? englishOnly('Full-Spectrum Trading Infrastructure')}</span><h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white">{content.heading ?? englishOnly('Integrated Solutions for Modern Commerce')}</h2><p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">{content.subheading ?? englishOnly('UNT Company operates as a complete commercial gateway, managing product supply chains from initial factory audits to local market distribution.')}</p><div className="pt-3 flex justify-center"><div className="inline-flex p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold"><ModeButton active={displayMode === 'grid'} onClick={() => setDisplayMode('grid')} icon={LayoutGrid} label={content.grid_label ?? (language === 'km' ? 'ទិដ្ឋភាពក្រឡា ៣ ជួរ' : '3-Column Grid View')} /><ModeButton active={displayMode === 'carousel'} onClick={() => setDisplayMode('carousel')} icon={Layers} label={content.carousel_label ?? (language === 'km' ? 'គ្រាប់រំកិល 3D' : '3D Coverflow Slider')} /></div></div></div></ScrollReveal>
        {displayMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cards.map((card, index) => <ScrollReveal key={card.key} animation="up" delay={(index + 1) * 100}>{card}</ScrollReveal>)}</div> : <CarouselSlider3D autoPlayInterval={6000}>{cards}</CarouselSlider3D>}
      </div>
    </section>
  );
}

function ModeButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof LayoutGrid; label: string }) {
  return <button onClick={onClick} className={`px-4 py-1.5 rounded-full flex items-center space-x-2 ${active ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}><Icon className="w-3.5 h-3.5" /><span>{label}</span></button>;
}
