import { CheckCircle2 } from 'lucide-react';
import { CATEGORIES, SERVICE_TYPES } from './quoteModalData';
import { stepAnimation, type QuoteStepProps } from './types';

export function QuoteServiceStep({ formData, setFormData, direction }: QuoteStepProps) {
  return (
    <div className={`space-y-5 ${stepAnimation(direction)}`}>
      <div>
        <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
          What do you need?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_TYPES.map((service) => {
            const Icon = service.icon;
            const isActive = formData.serviceType === service.value;
            return (
              <button
                type="button"
                key={service.value}
                onClick={() => setFormData((current) => ({ ...current, serviceType: service.value }))}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 text-left flex items-start space-x-3.5 overflow-hidden ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-400 shadow-lg shadow-emerald-500/10'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md'
                }`}
              >
                {isActive && <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-emerald-500" />}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold transition-colors ${isActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                    {service.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{service.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Product Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setFormData((current) => ({ ...current, productCategory: category }))}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                formData.productCategory === category
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
