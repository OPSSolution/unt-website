import { ArrowRight } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { HUBS } from './data';
import { useLanguage } from '../../i18n/LanguageContext';

export function AboutHubs({ content, onOpenQuoteModal }: { content: Record<string, any>; onOpenQuoteModal: () => void }) {
  const hubs = Array.isArray(content.network_hubs) ? content.network_hubs : [];
  const { language } = useLanguage();
  return (
    <section className="py-20">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
        <ScrollReveal animation="up">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3.5 py-1 bg-emerald-100/90 dark:bg-emerald-950/90 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">{content.net_badge}</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">{content.net_heading}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">{content.net_sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {hubs.map((localized: any, index: number) => {
            const fallback = language === 'en' ? HUBS[index] : undefined;
            const hub = { ...fallback, ...localized };
            return (
            <ScrollReveal key={hub.title} animation="up" delay={index * 100}>
              <Card3D intensity={12}>
                <div className="group p-6 rounded-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-emerald-400/60 dark:hover:border-emerald-400/40 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-2 mb-4">
                    {Array.isArray(hub.flags) ? hub.flags.map((flag: string) => <img key={flag} src={flag} alt="" className="w-10 h-7 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" />) : <span className="text-2xl">{hub.flags}</span>}
                    {hub.region && <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">{hub.region}</span>}
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{hub.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">{hub.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {(hub.tags ?? []).map((tag: string) => <span key={tag} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{tag}</span>)}
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>
          )})}
        </div>
        <ScrollReveal animation="up" delay={200}>
          <div className="pt-8 text-center">
            <button onClick={onOpenQuoteModal} className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 inline-flex items-center space-x-2">
              <span>{content.cta}</span><ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
