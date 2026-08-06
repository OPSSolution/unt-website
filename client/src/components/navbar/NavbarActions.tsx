import { ArrowRight, Calculator, Menu, Moon, ScanLine, Search, Sun, X } from 'lucide-react';
import { LanguageToggle } from '../../i18n/LanguageContext';

interface Props {
  darkMode: boolean;
  mobileMenuOpen: boolean;
  ctaLabel: string;
  setDarkMode?: (dark: boolean | ((previous: boolean) => boolean)) => void;
  onSearch: () => void;
  onCalculate: () => void;
  onQuote: () => void;
  onToggleMobile: () => void;
}

const ICON_BUTTON = 'hidden items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-all group dark:bg-white/10 dark:hover:bg-white/15 dark:text-white/80 dark:hover:text-emerald-300 dark:border-white/10';

export function NavbarActions({ darkMode, mobileMenuOpen, ctaLabel, setDarkMode, onSearch, onCalculate, onQuote, onToggleMobile }: Props) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <LanguageToggle compact />
      {setDarkMode && (
        <button onClick={() => setDarkMode((previous) => !previous)} className={`${ICON_BUTTON} sm:flex`} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-label="Toggle theme">
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      )}
      <button onClick={onSearch} className={`${ICON_BUTTON} md:flex relative`} title="AI Search catalog (Ctrl+K)" aria-label="AI search catalog">
        <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white ai-scan-icon"><ScanLine className="w-2.5 h-2.5" /></span>
      </button>
      <button onClick={onCalculate} className={`${ICON_BUTTON} md:flex`} title="Sourcing Estimator" aria-label="Open sourcing estimator">
        <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
      </button>
      <button onClick={onQuote} className="btn-shine inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 group shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:shadow-black/30">
        <span>{ctaLabel}</span><ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
      </button>
      <button onClick={onToggleMobile} className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:text-emerald-700 hover:bg-slate-200 border border-slate-200 transition-colors dark:bg-white/10 dark:text-white/80 dark:hover:text-emerald-300 dark:hover:bg-white/15 dark:border-white/10" aria-label="Toggle mobile navigation">
        {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );
}

