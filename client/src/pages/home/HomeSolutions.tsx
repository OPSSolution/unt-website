import { useState } from 'react';
import { Globe, GraduationCap, Layers, LayoutGrid, Package } from 'lucide-react';
import { CarouselSlider3D } from '../../components/CarouselSlider3D';
import { PillarCard } from '../../components/PillarCard';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';
import type { PageTab } from '../../types';
import { useHomepageSections } from '../../hooks/useHomepageSections';
import { useLanguage } from '../../i18n/LanguageContext';

const PILLARS = [
  { number: 'Pillar One', title: 'Premium Product Distribution', description: 'Direct access to verified international wholesale catalogs spanning Food & Beverage, Skincare, Beauty, Personal Care, Health Supplements, and Household FMCG.', icon: Package, badge: 'Live Stock', action: 'View Wholesale Catalog', tab: 'products' as PageTab, bullets: ['100% Authentic Factory Sealed Lots', 'Khmer Language Labeling Compliance', 'Temperature Controlled Logistics'], metrics: [{ label: 'Active SKUs', value: '10,000+' }, { label: 'Delivery', value: '24-48 Hours' }, { label: 'Compliance', value: '100% Ministry' }, { label: 'Storage', value: 'Reefer Cold Chain' }] },
  { number: 'Pillar Two', title: 'Sourcing-as-a-Service & OEM', description: 'End-to-end custom procurement with audited factories, pricing negotiation, inspection, and Cambodian customs clearance.', icon: Globe, badge: 'GDCE Ready', action: 'Explore Sourcing Process', tab: 'services' as PageTab, bullets: ['Turnkey OEM Private Label Manufacturing', 'AQL 2.5 Strict Quality Inspection', 'GDCE Brokerage & Door Delivery'], metrics: [{ label: 'Factory Audits', value: '500+ ISO/GMP' }, { label: 'Clearance Rate', value: '99.4% On-Time' }, { label: 'Origin Hubs', value: '4 Countries' }, { label: 'Quality Standard', value: 'AQL 2.5 Strict' }] },
  { number: 'Pillar Three', title: 'Sales & Trade Capacity Academy', description: 'Empowering commercial teams with masterclasses in B2B negotiation, buyer psychology, key account management, and retention.', icon: GraduationCap, badge: 'Academy Active', action: 'View Training Modules', tab: 'training' as PageTab, bullets: ['1,200+ Professionals Certified', 'Tailored Corporate In-House Bootcamps', 'Negotiation & Contract Strategies'], metrics: [{ label: 'Certified Reps', value: '1,200+' }, { label: 'Client Lift', value: '+38% Growth' }, { label: 'Format', value: 'In-House Bootcamps' }, { label: 'Certificates', value: 'UNT Accredited' }] },
];

const PILLARS_KM = [
  { number: 'សសរស្តម្ភទី ១', title: 'ការចែកចាយផលិតផលគុណភាពខ្ពស់', description: 'ទទួលបានផលិតផលលក់ដុំអន្តរជាតិដែលបានផ្ទៀងផ្ទាត់ សម្រាប់អាហារ ភេសជ្ជៈ សម្រស់ សុខភាព និងសម្ភារៈប្រើប្រាស់ក្នុងផ្ទះ។', badge: 'មានទំនិញក្នុងស្តុក', action: 'មើលកាតាឡុកលក់ដុំ', bullets: ['ផលិតផលពិតប្រាកដពីរោងចក្រ', 'អនុលោមតាមស្លាកសញ្ញាភាសាខ្មែរ', 'ការដឹកជញ្ជូនគ្រប់គ្រងសីតុណ្ហភាព'], metrics: [{ label: 'ផលិតផលសកម្ម', value: '10,000+' }, { label: 'ការដឹកជញ្ជូន', value: '24-48 ម៉ោង' }, { label: 'អនុលោមភាព', value: '100% ក្រសួង' }, { label: 'ការផ្ទុក', value: 'ខ្សែសង្វាក់ត្រជាក់' }] },
  { number: 'សសរស្តម្ភទី ២', title: 'សេវាស្វែងរកប្រភព និង OEM', description: 'សេវាលទ្ធកម្មពេញលេញ ចាប់ពីការត្រួតពិនិត្យរោងចក្រ ការចរចាតម្លៃ និងការត្រួតពិនិត្យគុណភាព រហូតដល់ការបំពេញបែបបទគយកម្ពុជា។', badge: 'រួចរាល់សម្រាប់ GDCE', action: 'ស្វែងយល់ពីដំណើរការផ្គត់ផ្គង់', bullets: ['ផលិតកម្ម OEM និងស្លាកយីហោផ្ទាល់ខ្លួន', 'ការត្រួតពិនិត្យគុណភាព AQL 2.5', 'សេវាគយ GDCE និងដឹកជញ្ជូនដល់ទីតាំង'], metrics: [{ label: 'រោងចក្របានត្រួតពិនិត្យ', value: '500+ ISO/GMP' }, { label: 'អត្រាបញ្ចេញទំនិញ', value: '99.4% ទាន់ពេល' }, { label: 'ប្រទេសប្រភព', value: '4 ប្រទេស' }, { label: 'ស្តង់ដារគុណភាព', value: 'AQL 2.5' }] },
  { number: 'សសរស្តម្ភទី ៣', title: 'សាលាបណ្តុះបណ្តាលផ្នែកលក់ និងពាណិជ្ជកម្ម', description: 'ពង្រឹងសមត្ថភាពក្រុមពាណិជ្ជកម្មតាមរយៈការចរចា B2B ចិត្តវិទ្យាអ្នកទិញ និងការគ្រប់គ្រងអតិថិជនសំខាន់ៗ។', badge: 'សាលាកំពុងដំណើរការ', action: 'មើលវគ្គបណ្តុះបណ្តាល', bullets: ['អ្នកជំនាញជាង 1,200 នាក់ទទួលវិញ្ញាបនបត្រ', 'វគ្គបណ្តុះបណ្តាលតាមតម្រូវការក្រុមហ៊ុន', 'យុទ្ធសាស្ត្រចរចា និងកិច្ចសន្យា'], metrics: [{ label: 'អ្នកទទួលវិញ្ញាបនបត្រ', value: '1,200+' }, { label: 'កំណើនអតិថិជន', value: '+38%' }, { label: 'ទម្រង់', value: 'បណ្តុះបណ្តាលក្នុងក្រុមហ៊ុន' }, { label: 'វិញ្ញាបនបត្រ', value: 'ទទួលស្គាល់ដោយ UNT' }] },
];

export function HomeSolutions({ onNavigate }: { onNavigate: (tab: PageTab) => void }) {
  const [displayMode, setDisplayMode] = useState<'grid' | 'carousel'>('carousel');
  const { language } = useLanguage();
  const content = useHomepageSections().pillars ?? {};
  const localizedPillars = PILLARS.map((pillar, index) => {
    const number = index + 1;
    const fallback = language === 'km' ? PILLARS_KM[index] : pillar;
    return {
      ...pillar,
      number: content[`pillar${number}_number`] || fallback.number,
      title: content[`pillar${number}_title`] || fallback.title,
      description: content[`pillar${number}_desc`] || fallback.description,
      badge: content[`pillar${number}_badge`] || fallback.badge,
      action: content[`pillar${number}_cta`] || fallback.action,
      bullets: pillar.bullets.map((_, bulletIndex) =>
        content[`pillar${number}_bullet${bulletIndex + 1}`] || fallback.bullets[bulletIndex]),
      metrics: fallback.metrics,
    };
  });
  const cards = localizedPillars.map((pillar, index) => {
    const Icon = pillar.icon;
    return <PillarCard key={`${language}-${index}`} pillarNumber={pillar.number} title={pillar.title} description={pillar.description} icon={<Icon className="w-7 h-7" />} badgeText={pillar.badge} actionText={pillar.action} bullets={pillar.bullets} metrics={pillar.metrics} onClick={() => onNavigate(pillar.tab)} />;
  });
  return (
    <section className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative py-6">
      <div className="absolute -top-16 -left-12 w-80 h-80 rounded-full glass-circle-morphism animate-float-orb pointer-events-none hidden sm:flex"><div className="w-56 h-56 rounded-full bg-emerald-400/25 blur-2xl" /></div>
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 rounded-[44px] glass-circle-morphism shadow-2xl">
        <ScrollReveal animation="up"><div className="text-center space-y-4 mb-10"><span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.badge || (language === 'km' ? 'ហេដ្ឋារចនាសម្ព័ន្ធពាណិជ្ជកម្មពេញលេញ' : 'Full-Spectrum Trading Infrastructure')}</span><h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white"><ScrollTextReveal key={language} text={content.heading || (language === 'km' ? 'ដំណោះស្រាយរួមបញ្ចូលសម្រាប់ពាណិជ្ជកម្មទំនើប' : 'Integrated Solutions for Modern Commerce')} mode="codepen-title" /></h2><p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">{content.subheading || (language === 'km' ? 'Unique Noble Trading Co., Ltd. ផ្តល់ជូនច្រកពាណិជ្ជកម្មពេញលេញ ចាប់ពីការត្រួតពិនិត្យរោងចក្រ រហូតដល់ការចែកចាយក្នុងទីផ្សារ។' : 'Unique Noble Trading Co., Ltd. operates as a complete commercial gateway, managing product supply chains from initial factory audits to local market distribution.')}</p><div className="pt-3 flex justify-center"><div className="inline-flex p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold"><ModeButton active={displayMode === 'grid'} onClick={() => setDisplayMode('grid')} icon={LayoutGrid} label={content.grid_label || (language === 'km' ? 'ទិដ្ឋភាពក្រឡា ៣ ជួរ' : '3-Column Grid View')} /><ModeButton active={displayMode === 'carousel'} onClick={() => setDisplayMode('carousel')} icon={Layers} label={content.carousel_label || (language === 'km' ? 'គ្រាប់រំកិល 3D' : '3D Coverflow Slider')} /></div></div></div></ScrollReveal>
        {displayMode === 'grid' ? <div key={`grid-${language}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cards.map((card, index) => <ScrollReveal key={`${language}-${index}`} animation="up" delay={(index + 1) * 100}>{card}</ScrollReveal>)}</div> : <CarouselSlider3D key={`carousel-${language}`} autoPlayInterval={6000}>{cards}</CarouselSlider3D>}
      </div>
    </section>
  );
}

function ModeButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof LayoutGrid; label: string }) {
  return <button onClick={onClick} className={`px-4 py-1.5 rounded-full flex items-center space-x-2 ${active ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}><Icon className="w-3.5 h-3.5" /><span>{label}</span></button>;
}
