import { BadgeCheck, Building2, Clock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { stepAnimation, type QuoteStepProps } from './types';
import type { ContentLanguage } from '../../i18n/LanguageContext';
import type { QuoteFormContent } from './quoteModalData';

const INPUT_CLASS = 'w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all';

interface Props extends QuoteStepProps {
  language: ContentLanguage;
  content: QuoteFormContent;
}

export function QuoteContactStep({ formData, setFormData, direction, language, content }: Props) {
  const isKm = language === 'km';
  const fields = [
    { key: 'companyName' as const, type: 'text', placeholder: isKm ? 'ឈ្មោះក្រុមហ៊ុន / ហាង *' : 'Company / Store Name *', icon: Building2 },
    { key: 'contactName' as const, type: 'text', placeholder: isKm ? 'ឈ្មោះទំនាក់ទំនង *' : 'Contact Name *', icon: User },
    { key: 'email' as const, type: 'email', placeholder: isKm ? 'អ៊ីមែលអាជីវកម្ម *' : 'Business Email *', icon: Mail },
    { key: 'phone' as const, type: 'text', placeholder: isKm ? 'តេឡេក្រាម / ទូរស័ព្ទ *' : 'Telegram / Phone *', icon: Phone },
  ];

  return (
    <div className={`space-y-5 ${stepAnimation(direction)}`}>
      <div>
        <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
          {content.business_label || (isKm ? 'ព័ត៌មានអាជីវកម្មរបស់អ្នក' : 'Your Business Details')}
        </label>
        <div className="space-y-3">
          {fields.slice(0, 2).map(({ key, icon, ...rest }) => (
            <ContactInput key={key} type={rest.type} placeholder={rest.placeholder} icon={icon} value={formData[key]} onChange={(value) => setFormData((current) => ({ ...current, [key]: value }))} />
          ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.slice(2).map(({ key, icon, ...rest }) => (
              <ContactInput key={key} type={rest.type} placeholder={rest.placeholder} icon={icon} value={formData[key]} onChange={(value) => setFormData((current) => ({ ...current, [key]: value }))} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 pt-1 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
        <span className="flex items-center space-x-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /><span>{isKm ? 'បានអ៊ិនគ្រីប SSL' : 'SSL Encrypted'}</span></span>
        <span className="flex items-center space-x-1.5"><Clock className="w-3.5 h-3.5 text-emerald-500" /><span>{isKm ? 'ឆ្លើយតប ២៤ម៉ោង' : '24hr Response'}</span></span>
        <span className="flex items-center space-x-1.5"><BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /><span>{isKm ? 'គ្មានកាតព្វកិច្ច' : 'No Obligation'}</span></span>
      </div>
    </div>
  );
}

interface ContactInputProps {
  type: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
}

function ContactInput({ type, placeholder, icon: Icon, value, onChange }: ContactInputProps) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={INPUT_CLASS}
      />
    </div>
  );
}
