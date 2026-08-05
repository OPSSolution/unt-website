import { BarChart3 } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ADVANTAGES, CORE_VALUES } from './data';

function SectionHeading({ badge, title, description }: { badge: string; title: string; description?: string }) {
  return (
    <ScrollReveal animation="up">
      <div className="text-center space-y-3 mb-12">
        <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">{badge}</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">{title}</h2>
        {description && <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">{description}</p>}
      </div>
    </ScrollReveal>
  );
}

export function CoreValuesSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#0B0F17] border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <SectionHeading badge="What Drives Us" title="Our Core Values" description="These principles guide every decision we make, from factory floor audits to client partnerships." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <ScrollReveal key={value.title} animation="up" delay={index * 100}>
                <Card3D intensity={18}>
                  <div className="group p-7 rounded-3xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/30 dark:hover:border-emerald-400/20 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between [transform-style:preserve-3d] backdrop-blur-sm select-none">
                    <div className="[transform-style:preserve-3d]">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md mb-6 [transform:translateZ(45px)]"><Icon className="w-6 h-6" /></div>
                      <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2.5 [transform:translateZ(30px)] transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{value.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed [transform:translateZ(15px)]">{value.desc}</p>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-5 [transform:translateZ(20px)]">Value 0{index + 1}</div>
                  </div>
                </Card3D>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section className="py-20">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <SectionHeading badge="Why Business Leaders Choose UNT" title="The UNT Advantage" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {ADVANTAGES.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <ScrollReveal key={advantage.title} animation="up" delay={index * 100}>
                <Card3D intensity={12}>
                  <div className="group relative p-6 rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-emerald-400/60 dark:hover:border-emerald-400/40 transition-all duration-500 h-full flex flex-col overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md"><Icon className="w-6 h-6" /></div>
                      <div className="live-pulse-badge"><span className="live-pulse-dot" /><span>{advantage.badge}</span></div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{advantage.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">{advantage.desc}</p>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div><div className="text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400">{advantage.metric}</div><div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{advantage.metricLabel}</div></div>
                      <BarChart3 className="w-5 h-5 text-emerald-400/40" />
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
