import { BadgeCheck, CheckCircle2, Clock, FileText, Globe, Package, ShieldCheck, ShoppingCart } from 'lucide-react';
import type { QuoteRequestState } from '../../types';
import type { ContentLanguage } from '../../i18n/LanguageContext';

interface Props {
  formData: QuoteRequestState;
  onClose: () => void;
  language: ContentLanguage;
}

export function QuoteSuccess({ formData, onClose, language }: Props) {
  const isKm = language === 'km';
  const summary = [
    { label: isKm ? 'សេវាកម្ម' : 'Service', value: formData.serviceType, icon: Package },
    { label: isKm ? 'ប្រភេទ' : 'Category', value: formData.productCategory, icon: FileText },
    { label: isKm ? 'ប្រភព' : 'Origin', value: formData.originPreference, icon: Globe },
    { label: isKm ? 'បរិមាណ' : 'Volume', value: formData.estimatedVolume, icon: ShoppingCart },
  ];

  return (
    <div className="py-8 text-center space-y-5 animate-fadeIn">
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{isKm ? 'បានផ្ញើពាក្យស្នើសុំតម្លៃ!' : 'Quote Request Sent!'}</h4>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          {isKm ? 'សូមអរគុណ' : 'Thank you'}, <span className="font-bold text-slate-900 dark:text-white">{formData.contactName || (isKm ? 'អតិថិជនដ៏មានតម្លៃ' : 'Valued Client')}</span>.
          {' '}{isKm ? 'អ្នកជំនាញរបស់យើងនឹងឆ្លើយតបក្នុងរយៈពេល' : 'Our specialists will respond within'} <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{isKm ? '២៤ ម៉ោងធ្វើការ' : '24 business hours'}</span>.
        </p>
      </div>
      <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-left max-w-sm mx-auto space-y-3">
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{isKm ? 'សេចក្តីសង្ខេបសំណើរបស់អ្នក' : 'Your Request Summary'}</div>
        {summary.map((item) => (
          <div key={item.label} className="flex items-center space-x-3 text-xs">
            <item.icon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span className="text-slate-400 dark:text-slate-500 min-w-[60px]">{item.label}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 dark:text-slate-500 font-medium pt-2">
        <span className="flex items-center space-x-1"><ShieldCheck className="w-3 h-3 text-emerald-500" /><span>{isKm ? 'សុវត្ថិភាព' : 'Secure'}</span></span>
        <span className="flex items-center space-x-1"><Clock className="w-3 h-3 text-emerald-500" /><span>{isKm ? 'ឆ្លើយតប ២៤ម៉ោង' : '24hr Response'}</span></span>
        <span className="flex items-center space-x-1"><BadgeCheck className="w-3 h-3 text-emerald-500" /><span>{isKm ? 'បានផ្ទៀងផ្ទាត់' : 'Verified'}</span></span>
      </div>
      <button onClick={onClose} className="mt-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-105">
        {isKm ? 'ត្រឡប់ទៅគេហទំព័រ' : 'Return to Website'}
      </button>
    </div>
  );
}