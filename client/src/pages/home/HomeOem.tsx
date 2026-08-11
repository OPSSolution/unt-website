import { ArrowRight, FileCheck2, FlaskConical, Layers, Palette, Sparkles } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';

const DEFAULT_LAB_METRICS = [
  { label: 'Formulation R&D', value: '500+ Proprietary Formulas' },
  { label: 'Origin Hubs', value: 'Korea • Japan • Vietnam' },
  { label: 'Compliance Rate', value: '100% Ministry Registration' },
];

interface HomeOemProps {
  onQuote: () => void;
  content?: Record<string, any>;
}

export function HomeOem({ onQuote, content }: HomeOemProps) {
  const c = content ?? {};
  const features = [
    { title: c.chip1_title ?? 'Custom Formulas', desc: c.chip1_sub ?? 'R&D & Lab Stability', icon: FlaskConical },
    { title: c.chip2_title ?? 'Package Design', desc: c.chip2_sub ?? 'Khmer Label Compliant', icon: Palette },
    { title: c.chip3_title ?? 'Low Trial MOQs', desc: c.chip3_sub ?? 'Flexible Batch Sizes', icon: Layers },
    { title: c.chip4_title ?? 'Turnkey Clearance', desc: c.chip4_sub ?? 'Ministry Permit Filing', icon: FileCheck2 },
  ];
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
      <ScrollReveal animation="scale"><Card3D intensity={12}>
        <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-emerald-950 via-[#0a251c] to-slate-950 p-5 sm:p-10 lg:p-14 text-white overflow-hidden shadow-2xl border border-emerald-500/30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center text-left">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] sm:text-xs font-bold uppercase max-w-full truncate"><Sparkles className="w-3.5 h-3.5 animate-spin shrink-0" /><span className="truncate">{c.badge ?? 'OEM & Private Label Excellence'}</span></div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black leading-tight sm:leading-none"><ScrollTextReveal text={c.heading ?? 'Launch Your Brand with World-Class Formulations'} mode="codepen-title" /></h2>
              <p className="text-emerald-100/90 text-xs sm:text-base leading-relaxed">{c.paragraph ?? 'UNT provides end-to-end private label manufacturing with GMP-certified factories in South Korea, Japan, and Vietnam.'}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">{features.map((feature) => { const Icon = feature.icon; return <div key={feature.title} className="p-3 sm:p-3.5 rounded-2xl bg-white/10 border border-white/20"><div className="flex items-center gap-1.5 sm:gap-2 mb-1"><Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" /><span className="font-bold text-emerald-300 text-xs truncate">{feature.title}</span></div><span className="text-emerald-100/80 text-[10px] block leading-tight">{feature.desc}</span></div>; })}</div>
              <button onClick={onQuote} className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-400/25"><span>{c.cta ?? 'Start OEM Private Label Project'}</span><ArrowRight className="w-5 h-5 shrink-0" /></button>
            </div>
            <div className="lg:col-span-5 hidden lg:block"><div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-4"><div className="flex items-center justify-between border-b border-emerald-500/20 pb-3"><span className="text-xs font-extrabold text-emerald-400 uppercase">OEM Formula Lab Active</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">GMP Certified</span></div>{DEFAULT_LAB_METRICS.map((m) => <LabMetric key={m.label} label={m.label} value={m.value} />)}</div></div>
          </div>
        </div>
      </Card3D></ScrollReveal>
    </section>
  );
}

function LabMetric({ label, value }: { label: string; value: string }) {
  return <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"><span className="text-xs text-slate-300">{label}</span><span className="text-xs font-bold text-emerald-400">{value}</span></div>;
}

