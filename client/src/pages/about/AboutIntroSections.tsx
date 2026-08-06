import { CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';

export function AboutHero({ subheadline }: { subheadline?: string }) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-400/10 dark:bg-emerald-400/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-3xl" />
      </div>
      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-6">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/60 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /><span>About UNT Company</span>
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            The Bridge to <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">Global Trade</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {subheadline ?? 'Unique Noble Trading Co., Ltd. (UNT Company) is a premier Cambodian trading, sourcing, OEM manufacturing, and commercial capacity building ecosystem headquartered in Phnom Penh.'}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

const MISSION_CHIPS = ['Factory Audits', 'OEM Manufacturing', 'Customs Brokerage', 'Sales Training', 'Cold Chain Logistics'];

export function AboutMission() {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-left">
      <ScrollReveal animation="right">
        <div className="space-y-6">
          <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">Our Purpose & Mission</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">Connecting World-Class Manufacturers with Emerging ASEAN Markets</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">Founded with the vision of modernizing Cambodian import commerce, UNT Company acts as an essential catalyst for local retailers, pharmacy chains, FMCG distributors, and brand owners. We remove cross-border trade friction by taking full responsibility for supplier auditing, volume pricing negotiation, quality control, customs clearance, and product compliance.</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">Our dual focus on physical distribution and commercial training ensures that our clients not only secure top-tier products, but also possess the negotiation and sales capabilities required to achieve market leadership.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {MISSION_CHIPS.map((chip) => (
              <span key={chip} className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /><span>{chip}</span>
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal animation="left" delay={200}>
        <Card3D intensity={10}>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop" alt="UNT Headquarters Team" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 dark:bg-[#0c1322]/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl rounded-2xl shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm"><MapPin className="w-4 h-4" /><span>Phnom Penh Corporate HQ</span></div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Phnom Penh Tower, Monivong Blvd, Doun Penh</div>
                </div>
                <div className="live-pulse-badge"><span className="live-pulse-dot" /><span>Active</span></div>
              </div>
            </div>
          </div>
        </Card3D>
      </ScrollReveal>
    </section>
  );
}
