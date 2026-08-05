import { useState, type MouseEvent } from 'react';
import { Globe, ShieldCheck, Truck } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';

const FEATURES = [
  { title: 'Direct Factory Access', description: 'Eliminate middlemen markup with direct access to verified factories in South Korea, Japan, Vietnam, and China.', icon: Globe, metric: '500+ Factories Audited', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop', badge: '500+ ISO/GMP Audited Factories', tags: ['4 Origin Hubs', 'Direct OEM Pricing', '0% Middlemen'] },
  { title: 'Full Customs & Ministry Permits', description: 'We manage product registration with Cambodian ministries and GDCE customs clearance.', icon: ShieldCheck, metric: '99.4% On-Time Clearance', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop', badge: '99.4% On-Time Customs Clearance', tags: ['MoH / MoC Permits', 'Khmer Labeling', 'GDCE Clearance'] },
  { title: 'End-to-End Door Delivery', description: 'Temperature-controlled logistics from overseas loading to your distribution center.', icon: Truck, metric: 'Reefer Cold Chain Fleet', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop', badge: 'Reefer Cold Chain Active', tags: ['24-48 Hr Transit', 'Temp Controlled', 'Nationwide Network'] },
];

export function HomeHeritage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const active = FEATURES[activeFeature];
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({ x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height });
  };
  return (
    <section onMouseMove={handleMouseMove} className="relative py-24 overflow-hidden text-slate-900 dark:text-white border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" /><div className="absolute w-96 h-96 rounded-full blur-3xl transition-transform duration-500" style={{ left: `${mousePosition.x * 100}%`, top: `${mousePosition.y * 100}%`, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(16,185,129,0.22), transparent 70%)' }} /></div>
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal animation="right"><Card3D intensity={14}><div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl h-[560px] lg:h-[640px]"><img src={active.image} alt={active.title} className="w-full h-full object-cover transition-all duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" /><div className="absolute top-6 right-6 live-pulse-badge bg-slate-900/90 text-emerald-300"><span className="live-pulse-dot" /><span>{active.badge}</span></div><div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white dark:bg-[#0c1322] shadow-2xl"><div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold"><ShieldCheck className="w-5 h-5" /><span>{active.title}</span></div><div className="flex flex-wrap gap-2 pt-3">{active.tags.map((tag) => <span key={tag} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">✦ {tag}</span>)}</div></div></div></Card3D></ScrollReveal>
        <ScrollReveal animation="left" delay={150}><div className="space-y-6 text-left"><span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">Balancing Heritage with Modern Efficiency</span><h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">Bridging International Factories with Cambodian Commerce</h2><p className="text-slate-600 dark:text-slate-300">Global supply chains are complex, but sourcing doesn't have to be. Inspect our operational capabilities below.</p><div className="space-y-4">{FEATURES.map((feature, index) => { const Icon = feature.icon; const selected = index === activeFeature; return <Card3D key={feature.title} intensity={10} onClick={() => setActiveFeature(index)}><button type="button" onMouseEnter={() => setActiveFeature(index)} className={`w-full text-left p-6 rounded-3xl border shadow-xl flex items-start gap-5 transition-all ${selected ? 'bg-white dark:bg-[#0c1322] border-emerald-500 scale-[1.02]' : 'bg-white dark:bg-[#0c1322] border-slate-200 dark:border-slate-800'}`}><div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-emerald-600'}`}><Icon className="w-6 h-6" /></div><div><div className="flex flex-wrap justify-between gap-2"><h4 className="font-bold">{feature.title}</h4><span className="text-[11px] font-bold text-emerald-600">{feature.metric}</span></div><p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{feature.description}</p></div></button></Card3D>; })}</div></div></ScrollReveal>
      </div></div>
    </section>
  );
}
