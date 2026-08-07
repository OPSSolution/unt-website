import { CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Interactive3DBg } from '../../components/Interactive3DBg';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';

export function AboutHero({ content }: { content: Record<string, any> }) {
  return (
    <section className="relative py-20 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* 3D Hex-Grid Canvas Background (Uniform across all pages) */}
      <Interactive3DBg variant="hex-grid" />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966910_1px,transparent_1px),linear-gradient(to_bottom,#05966910_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40 dark:opacity-50" />

      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-emerald-500/15 dark:bg-emerald-500/25 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-emerald-600/10 dark:bg-teal-600/20 blur-[130px] rounded-full" />
      </div>

      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md animate-gentle-float">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>{content.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-5xl mx-auto">
            <ScrollTextReveal text={content.headline} mode="codepen-title" />
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            {content.subheadline}
          </p>

        </div>
      </ScrollReveal>
    </section>
  );
}

const MISSION_CHIPS = ['Factory Audits', 'OEM Manufacturing', 'Customs Brokerage', 'Sales Training', 'Cold Chain Logistics'];

export function AboutMission({ content }: { content: Record<string, any> }) {
  const { language } = useLanguage();
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center text-left">
      <ScrollReveal animation="right">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            {content.mission_badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 dark:text-white leading-tight">
            {content.mission_heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{content.mission_p1}</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{content.mission_p2}</p>
          {language === 'en' && <div className="flex flex-wrap gap-2 pt-2">
            {MISSION_CHIPS.map((chip, idx) => (
              <span
                key={chip}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="animate-fade-in inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:border-emerald-500 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{chip}</span>
              </span>
            ))}
          </div>}
        </div>
      </ScrollReveal>

      <ScrollReveal animation="left" delay={200}>
        <Card3D intensity={5}>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#081a17] aspect-[4/3]">
            <img src={content.mission_image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 dark:bg-[#071816]/95 border border-slate-200 dark:border-emerald-500/30 backdrop-blur-xl rounded-2xl shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{content.hq_label}</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{content.hq_address}</div>
                </div>
                {language === 'en' && <div className="live-pulse-badge"><span className="live-pulse-dot" /><span>Active</span></div>}
              </div>
            </div>
          </div>
        </Card3D>
      </ScrollReveal>
    </section>
  );
}
