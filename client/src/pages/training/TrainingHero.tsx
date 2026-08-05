import { ScrollReveal } from '../../components/ScrollReveal';

type Content = Record<string, string>;
const FALLBACK_VALUES = ['1,200+', '4.9 / 5.0', '15+', '34%'];
const FALLBACK_LABELS = ['Professionals Certified', 'Average Course Rating', 'Senior Trade Instructors', 'Avg 90-Day Conversion Lift'];

export function TrainingHero({ content }: { content: Content }) {
  return (
    <section className="relative py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-4">
          <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">{content.badge ?? 'UNT Trade Capacity Building Institute'}</span>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">{content.headline ?? <>Mastering the Art of <span className="emerald-gradient-text">Global Commerce</span></>}</h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">{content.subheadline ?? "Elevate your commercial team's B2B negotiation skills, buyer psychology, key account retention, and international supply chain management."}</p>
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {FALLBACK_VALUES.map((fallback, index) => <div key={fallback} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm"><div className="text-2xl font-display font-bold text-emerald-700 dark:text-emerald-400">{content[`stat${index + 1}_value`] ?? fallback}</div><div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{content[`stat${index + 1}_label`] ?? FALLBACK_LABELS[index]}</div></div>)}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

