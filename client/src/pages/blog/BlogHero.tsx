import { ScrollReveal } from '../../components/ScrollReveal';

interface Props {
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export function BlogHero({ badge, headline, subheadline }: Props) {
  return (
    <section className="relative py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-3">
          <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
            {badge ?? 'Cambodia & ASEAN Trade Intelligence'}
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            {headline ?? <>Market Insights &amp; <span className="emerald-gradient-text">Regulatory News</span></>}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {subheadline ?? 'Stay informed on GDCE customs updates, Ministry of Commerce regulations, regional FMCG trends, and OEM private label innovations.'}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

