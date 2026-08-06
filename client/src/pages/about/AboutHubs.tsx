import { ArrowRight, Sparkles } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { HUBS } from './data';
import { useLanguage } from '../../i18n/LanguageContext';

export function AboutHubs({ content, onOpenQuoteModal }: { content: Record<string, any>; onOpenQuoteModal: () => void }) {
  const hubs = Array.isArray(content.network_hubs) ? content.network_hubs : [];
  const { language } = useLanguage();
  return (
    <section className="py-12">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
        <ScrollReveal animation="up">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <span>{content.net_badge}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white">{content.net_heading}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">{content.net_sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {hubs.map((localized: any, index: number) => {
            const fallback = language === 'en' ? HUBS[index] : undefined;
            const hub = { ...fallback, ...localized };
            return (
            <ScrollReveal key={hub.title} animation="up" delay={index * 100}>
              <Card3D intensity={5}>
                <div className="group p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    {Array.isArray(hub.flags) ? hub.flags.map((flag: string) => <img key={flag} src={flag} alt="" className="w-10 h-7 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" />) : <span className="text-2xl">{hub.flags}</span>}
                    {hub.region && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">{hub.region}</span>}
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{hub.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">{hub.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
                    {(hub.tags ?? []).map((tag: string) => <span key={tag} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/30 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">{tag}</span>)}
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>
          )})}
        </div>

        <ScrollReveal animation="up" delay={200}>
          <div className="pt-6 text-center">
            <button onClick={onOpenQuoteModal} className="btn-shine px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-400 dark:text-slate-950 font-black text-sm shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 inline-flex items-center space-x-2 active:scale-95">
              <span>{content.cta}</span><ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
