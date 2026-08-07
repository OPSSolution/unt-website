import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import type { ContentLanguage } from '../../i18n/LanguageContext';
import type { QuoteFormContent } from './quoteModalData';

interface Props {
  step: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  language: ContentLanguage;
  content: QuoteFormContent;
}

export function QuoteNavigation({ step, isSubmitting, onBack, onNext, language, content }: Props) {
  const isKm = language === 'km';
  return (
    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
      {step > 1 ? (
        <button type="button" onClick={onBack} className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /><span>{content.back_button || (isKm ? 'ត្រឡប់ក្រោយ' : 'Back')}</span>
        </button>
      ) : <div />}
      {step < 3 ? (
        <button type="button" onClick={onNext} className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all hover:scale-105">
          <span>{content.continue_button || (isKm ? 'បន្ត' : 'Continue')}</span><ArrowRight className="w-3.5 h-3.5" />
        </button>
      ) : (
        <button type="submit" disabled={isSubmitting} className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100">
          {isSubmitting
            ? <><Loader2 className="w-4 h-4 animate-spin" /><span>{content.submitting_button || (isKm ? 'កំពុងផ្ញើ...' : 'Submitting...')}</span></>
            : <><span>{content.submit_button || (isKm ? 'ផ្ញើពាក្យស្នើសុំ' : 'Submit Quote')}</span><Send className="w-3.5 h-3.5" /></>}
        </button>
      )}
    </div>
  );
}
