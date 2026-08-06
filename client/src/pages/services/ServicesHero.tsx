import { ScrollReveal } from '../../components/ScrollReveal';

interface Props {
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export function ServicesHero({ badge, headline, subheadline }: Props) {
  return (
    <section className="relative py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <ScrollReveal animation="up">
        <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-4">
          <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">{badge ?? 'End-to-End Procurement Infrastructure'}</span>
          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">
            {headline ?? <>Integrated Global <span className="emerald-gradient-text">Trading Solutions</span></>}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">{subheadline ?? 'From factory-direct auditing and private label OEM formulation to Ministry permits, GDCE customs clearance, and door-to-door logistics in Cambodia.'}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

