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
    <div className="xl:hidden relative z-10 px-4 pt-3 pb-5 space-y-2.5 animate-in slide-in-from-top duration-200 text-left max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800 pt-3 pb-1">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{isKm ? 'ភាសា' : 'Language'}</span>
        <LanguageToggle />
      </div>
      <div className="space-y-2">
        {NAV_LINKS.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 ${
                isActive
                  ? 'text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 shadow-md shadow-emerald-600/30'
                  : 'text-slate-800 dark:text-slate-100 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/90 shadow-sm'
              }`}
            >
              <span>{isKm ? link.labelKhmer ?? link.label : link.label}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <ActionButton icon={Search} label={isKm ? 'ស្វែងរក' : 'Search'} onClick={onSearch} />
        <ActionButton icon={Calculator} label={isKm ? 'ការប៉ាន់ស្មាន' : 'Estimator'} onClick={onCalculate} />
      </div>
      {setDarkMode && (
        <button
          onClick={() => setDarkMode((previous) => !previous)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700/90 shadow-sm"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
          <span>{isKm ? (darkMode ? 'ប្តូរទៅផ្ទៃភ្លឺ' : 'ប្តូរទៅផ្ទៃងងឹត') : (darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode')}</span>
        </button>
      )}
      <button
        onClick={onQuote}
        className="btn-shine w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30"
      >
        <span>{ctaLabel}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </button>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700/90 shadow-sm"
    >
      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      <span>{label}</span>
    </button>
  );
}
