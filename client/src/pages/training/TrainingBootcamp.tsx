import { ArrowRight } from 'lucide-react';

export function TrainingBootcamp({ content, onQuote }: { content: Record<string, string>; onQuote: () => void }) {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 text-slate-900 dark:text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg text-left">
        <div className="space-y-2 max-w-2xl"><span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.bootcamp_badge ?? 'In-House Corporate Solutions'}</span><h3 className="text-2xl font-display font-bold">{content.bootcamp_heading ?? 'Need a Private Masterclass for Your Commercial Team?'}</h3><p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{content.bootcamp_desc ?? 'We deliver custom on-site workshops tailored to your industry, catalog, and negotiation challenges.'}</p></div>
        <button onClick={onQuote} className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shrink-0 flex items-center gap-2"><span>{content.bootcamp_cta ?? 'Book Corporate Session'}</span><ArrowRight className="w-4 h-4" /></button>
      </div>
    </section>
  );
}
