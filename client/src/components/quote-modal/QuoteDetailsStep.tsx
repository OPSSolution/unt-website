import { CheckCircle2, Globe } from 'lucide-react';
import { VOLUMES, VOLUMES_KM, type QuoteFormContent } from './quoteModalData';
import { stepAnimation, type QuoteStepProps } from './types';
import type { ContentLanguage } from '../../i18n/LanguageContext';
import type { TradeHub } from '../ThreeBackground';

interface Props extends QuoteStepProps {
  language: ContentLanguage;
  content: QuoteFormContent;
  origins: TradeHub[];
}

export function QuoteDetailsStep({ formData, setFormData, direction, language, content, origins }: Props) {
  const isKm = language === 'km';
  const volumes = content.volume_options?.length ? content.volume_options : (isKm ? VOLUMES_KM : VOLUMES);

  return (
    <div className={`space-y-5 ${stepAnimation(direction)}`}>
      <div>
        <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
          {content.origin_label || (isKm ? 'ប្រទេសដើមដែលពេញចិត្ត' : 'Preferred Origin Country')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
          {origins.map((origin, index) => {
            const originName = origin.name.trim();
            const isActive = formData.originPreference === originName;
            const displayName = content.origin_options?.[index] || originName;
            return (
              <button
                type="button"
                key={origin.id || originName}
                onClick={() => setFormData((current) => ({ ...current, originPreference: originName }))}
                className={`group relative flex flex-col items-center justify-center gap-2.5 px-3 py-4 rounded-2xl border-2 transition-all duration-300 text-xs font-bold overflow-hidden ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 shadow-lg shadow-emerald-500/15 scale-[1.03]'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md'
                }`}
              >
                {isActive && <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5 text-emerald-500" />}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${
                  isActive ? 'shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/40' : 'shadow-sm group-hover:shadow-md'
                }`}>
                  {origin.flagUrl ? (
                    <img
                      src={origin.flagUrl}
                      alt={originName}
                      className="w-full h-full object-cover rounded-xl border border-slate-200/80 dark:border-slate-700/80"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 flex items-center justify-center rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  )}
                </div>
                <span className={`text-[11px] font-bold transition-colors ${isActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {displayName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{content.volume_label || (isKm ? 'បរិមាណទិញគោលដៅ' : 'Target Purchase Volume')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {volumes.map((volume, index) => {
            const isActive = isKm ? formData.estimatedVolume === VOLUMES[index] : formData.estimatedVolume === volume;
            return (
              <button
                type="button"
                key={volume}
                onClick={() => setFormData((current) => ({ ...current, estimatedVolume: VOLUMES[index] }))}
                className={`px-4 py-3 rounded-2xl border-2 transition-all duration-200 text-xs font-semibold text-left ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-700'
                }`}
              >
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 inline mr-2 text-emerald-500" />}
                {volume}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          {isKm ? 'តម្រូវការពិសេស' : 'Specific Requirements'} <span className="font-normal text-slate-400">({isKm ? 'ស្រេចចិត្ត' : 'optional'})</span>
        </label>
        <textarea
          rows={3}
          placeholder={isKm ? 'តម្លៃគោលដៅ ការបង្កើតរូបមន្តតាមបំណង ព័ត៌មានវេចខ្ចប់ស្លាក...' : 'Target pricing, custom formulation, packaging label details...'}
          value={formData.notes}
          onChange={(event) => setFormData((current) => ({ ...current, notes: event.target.value }))}
          className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
        />
      </div>
    </div>
  );
}
