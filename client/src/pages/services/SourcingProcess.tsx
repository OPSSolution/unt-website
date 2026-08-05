import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { SOURCING_STEPS } from '../../data/mockData';

interface Props {
  badge?: string;
  heading?: string;
  subheading?: string;
}

export function SourcingProcess({ badge, heading, subheading }: Props) {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-12">
      <ScrollReveal animation="up">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">{badge ?? 'Methodology'}</span>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">{heading ?? 'The UNT Sourcing-as-a-Service Process'}</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">{subheading ?? 'We simplify global procurement into five fully transparent, risk-managed stages.'}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6">
          {SOURCING_STEPS.map((step, index) => (
            <ScrollReveal key={step.step} animation="up" delay={index * 100}>
              <Card3D intensity={12}>
                <article className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all text-left h-full">
                  <div className="flex items-center justify-between"><span className="text-2xl font-display font-black text-emerald-700 dark:text-emerald-400">{step.step}</span><div className="live-pulse-badge"><span className="live-pulse-dot" /><span>Step {index + 1}</span></div></div>
                  <h3 className="text-base font-display font-bold text-slate-900 dark:text-white leading-tight mt-3">{step.title}</h3>
                  <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-3">{step.subtitle}</div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-3">{step.description}</p>
                </article>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
