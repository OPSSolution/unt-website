import { ArrowRight, Calculator, Moon, Search, Sun } from 'lucide-react';
import type { PageTab } from '../../types';
import { LanguageToggle, useLanguage } from '../../i18n/LanguageContext';
import { NAV_LINKS } from './data';

interface Props {
  activeTab: PageTab;
  darkMode: boolean;
  ctaLabel: string;
  setDarkMode?: (dark: boolean | ((previous: boolean) => boolean)) => void;
  onNavigate: (tab: PageTab) => void;
  onSearch: () => void;
  onCalculate: () => void;
  onQuote: () => void;
}

export function MobileNav({ activeTab, darkMode, ctaLabel, setDarkMode, onNavigate, onSearch, onCalculate, onQuote }: Props) {
  const { language } = useLanguage();
  const isKm = language === 'km';

  return (
    <div className="xl:hidden px-4 pt-2 pb-5 space-y-3 animate-in slide-in-from-top duration-200 text-left max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-3">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{isKm ? 'ភាសា' : 'Language'}</span>
        <LanguageToggle />
      </div>
      <div className="space-y-1">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === link.id
                ? 'text-emerald-700 bg-emerald-50 font-bold dark:text-emerald-300 dark:bg-white/10'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            <span>{isKm ? link.labelKhmer ?? link.label : link.label}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <ActionButton icon={Search} label={isKm ? 'ស្វែងរក' : 'Search'} onClick={onSearch} />
        <ActionButton icon={Calculator} label={isKm ? 'ការប៉ាន់ស្មាន' : 'Estimator'} onClick={onCalculate} />
      </div>
      {setDarkMode && (
        <button onClick={() => setDarkMode((previous) => !previous)} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold transition-colors dark:bg-white/10 dark:text-white/80">
          {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
          <span>{isKm ? (darkMode ? 'ប្តូរទៅផ្ទៃភ្លឺ' : 'ប្តូរទៅផ្ទៃងងឹត') : (darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode')}</span>
        </button>
      )}
      <button onClick={onQuote} className="btn-shine w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm">
        <span>{ctaLabel}</span><ArrowRight className="w-4 h-4 shrink-0" />
      </button>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold transition-colors dark:bg-white/10 dark:text-white/80">
      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span>{label}</span>
    </button>
  );
}
