import { BarChart3, Sparkles } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ADVANTAGES, CORE_VALUES, CORE_VALUES_KM } from './data';
import { useLanguage } from '../../i18n/LanguageContext';

function SectionHeading({ badge, title, description }: { badge: string; title: string; description?: string }) {
  return (
    <ScrollReveal animation="up">
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{badge}</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white">{title}</h2>
        {description && <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">{description}</p>}
      </div>
    </ScrollReveal>
  );
}

export function CoreValuesSection() {
  const { language } = useLanguage();
  const values = language === 'km' ? CORE_VALUES_KM : CORE_VALUES;
  return (
    <section className="py-12 bg-transparent transition-colors duration-300">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <SectionHeading
          badge={language === 'km' ? 'អ្វីដែលជំរុញយើង' : 'What Drives Us'}
          title={language === 'km' ? 'គុណតម្លៃស្នូលរបស់យើង' : 'Our Core Values'}
          description={language === 'km' ? 'គោលការណ៍ទាំងនេះណែនាំរាល់ការសម្រេចចិត្តរបស់យើង ចាប់ពីការត្រួតពិនិត្យរោងចក្រ រហូតដល់ភាពជាដៃគូជាមួយអតិថិជន។' : 'These principles guide every decision we make, from factory floor audits to client partnerships.'}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <ScrollReveal key={value.title} animation="up" delay={index * 80}>
                <Card3D intensity={5}>
                  <div className="group p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between select-none">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-display font-bold text-slate-900 dark:text-white mb-2 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {value.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                      {language === 'km' ? 'គុណតម្លៃ' : 'Value'} 0{index + 1}
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

export function AdvantagesSection({ content }: { content: Record<string, any> }) {
  const { language } = useLanguage();
  const isKm = language === 'km';
  const advantages = Array.isArray(content.advantages) && content.advantages.length > 0 ? content.advantages : ADVANTAGES;

  return (
    <section className="py-12">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <SectionHeading badge={content.adv_badge || (isKm ? 'ចំណុចខ្លាំង' : 'Competitive Advantages')} title={content.adv_heading || (isKm ? 'ហេតុអ្វីជ្រើសរើស UNT' : 'Why Choose UNT')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {advantages.map((localized: any, index: number) => {
            const fallback = language === 'en' ? ADVANTAGES[index] : undefined;
            const Icon = fallback?.icon ?? BarChart3;
            const advantage = { ...fallback, ...localized };
            return (
              <ScrollReveal key={advantage.title} animation="up" delay={index * 80}>
                <Card3D intensity={5}>
                  <div className="group relative p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="live-pulse-badge"><span className="live-pulse-dot" /><span>{advantage.badge}</span></div>
                    </div>
                    <h3 className="text-base font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {advantage.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1 mb-4">
                      {advantage.desc}
                    </p>
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xl font-display font-black text-emerald-600 dark:text-emerald-400">{advantage.metric}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{advantage.metricLabel}</div>
                      </div>
                      <BarChart3 className="w-5 h-5 text-emerald-500/30" />
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
