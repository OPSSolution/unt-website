import React, { useState, useEffect } from 'react';
import { PageTab, Product, Article } from '../types';
import {
  Menu, X, ArrowRight, Search, Calculator,
  Sun, Moon, ScanLine,
} from 'lucide-react';
import { QuickSearchModal } from './QuickSearchModal';
import { QuickCalcModal } from './QuickCalcModal';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { MobileNav } from './navbar/MobileNav';
import type { MegaMenuName } from './navbar/data';
import { LanguageToggle, useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  darkMode?: boolean;
  setDarkMode?: (dark: boolean | ((previous: boolean) => boolean)) => void;
  onOpenQuoteModal: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectArticle?: (article: Article) => void;
}

interface NavLink {
  id: PageTab;
  label: string;
  labelKhmer?: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', labelKhmer: 'ទំព័រដើម' },
  { id: 'about', label: 'About', labelKhmer: 'អំពីយើង' },
  { id: 'services', label: 'Services', labelKhmer: 'សេវាកម្ម' },
  { id: 'products', label: 'Wholesale Catalog', labelKhmer: 'ទំនិញបោះដុំ' },
  { id: 'training', label: 'Sales Training', labelKhmer: 'វគ្គបណ្តុះបណ្តាល' },
  { id: 'blog', label: 'Market Insights', labelKhmer: 'ព័ត៌មានទីផ្សារ' },
  { id: 'contact', label: 'Contact', labelKhmer: 'ទំនាក់ទំនង' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode = false,
  setDarkMode,
  onOpenQuoteModal,
  onSelectProduct,
  onSelectArticle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuName>(null);
  const navbarContent = useHomepageSections().navbar_footer ?? {};
  const { language } = useLanguage();
  const isKm = language === 'km';

  // Compress on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setSearchModalOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  const openSearch = () => {
    setMobileMenuOpen(false);
    setSearchModalOpen(true);
  };
  const openCalculator = () => {
    setMobileMenuOpen(false);
    setCalcModalOpen(true);
  };
  const openQuote = () => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    onOpenQuoteModal();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full pointer-events-none px-3 sm:px-6 pt-3 sm:pt-4">
        <div className={`pointer-events-auto relative mx-auto max-w-[1700px] w-full nav-pill transition-all duration-300 ${isScrolled ? 'nav-pill-scrolled py-1.5' : 'py-2'
          } ${mobileMenuOpen ? 'rounded-[2rem]' : 'rounded-full'}`}>
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none rounded-full" />
          <div className={`flex items-center justify-between gap-2 pl-3 sm:pl-4 pr-2 sm:pr-3 transition-all duration-300 ${isScrolled ? 'h-12 xl:h-14' : 'h-14 xl:h-16'}`}>
            <button onClick={() => handleNavigate('home')} className="flex items-center space-x-2.5 text-left group focus:outline-none shrink-0" aria-label="Unique Noble Trading Co., Ltd. home">
              <div className="relative w-10 h-10 rounded-xl bg-white border border-emerald-200 shadow-sm p-1 group-hover:scale-105 transition-all duration-300 shrink-0">
                <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
              </div>
              <div className="hidden xl:block shrink-0">
                <div className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-none">Unique Noble Trading Co., Ltd.</div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide mt-1 leading-none">{navbarContent.company_tagline ?? 'Trusted Global Trading Partner'}</div>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center xl:space-x-0.5 relative">
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className={`relative px-2.5 xl:px-3.5 py-2 rounded-full text-xs 2xl:text-[13px] font-semibold transition-all flex items-center gap-1 group ${isActive
                        ? 'text-emerald-700 font-bold bg-emerald-50 dark:text-emerald-300 dark:bg-white/10'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-white/75 dark:hover:text-white dark:hover:bg-white/10'
                      }`}
                  >
                    <span className="whitespace-nowrap">{isKm ? link.labelKhmer ?? link.label : link.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="hidden lg:block">
                <LanguageToggle compact />
              </div>

              {/* Theme toggle (icon circle) */}
              {setDarkMode && (
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-all dark:bg-white/10 dark:hover:bg-white/15 dark:text-white/80 dark:hover:text-emerald-300 dark:border-white/10"
                  title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-label="Toggle theme"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* AI Search (icon circle with scan pulse) */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-all group relative dark:bg-white/10 dark:hover:bg-white/15 dark:text-white/80 dark:hover:text-emerald-300 dark:border-white/10"
                title="AI Search catalog (Ctrl+K)"
                aria-label="AI search catalog"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white ai-scan-icon">
                  <ScanLine className="w-2.5 h-2.5" />
                </span>
              </button>

              {/* Sourcing Estimator (icon circle) */}
              <button
                onClick={() => setCalcModalOpen(true)}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-emerald-700 border border-slate-200 transition-all group dark:bg-white/10 dark:hover:bg-white/15 dark:text-white/80 dark:hover:text-emerald-300 dark:border-white/10"
                title="Sourcing Estimator"
                aria-label="Open sourcing estimator"
              >
                <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </button>


              {/* Primary CTA — high contrast pill */}
              <button
                onClick={onOpenQuoteModal}
                className="btn-shine inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 group shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:shadow-black/30"
              >
                <span>{navbarContent.navbar_cta || (isKm ? 'ស្នើសុំតម្លៃ' : 'Get a Quote')}</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:text-emerald-700 hover:bg-slate-200 border border-slate-200 transition-colors dark:bg-white/10 dark:text-white/80 dark:hover:text-emerald-300 dark:hover:bg-white/15 dark:border-white/10"
                aria-label="Toggle mobile navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <MobileNav
              activeTab={activeTab}
              darkMode={darkMode}
              ctaLabel={navbarContent.mobile_cta || (isKm ? 'ស្នើសុំតម្លៃ B2B' : 'Request B2B Sourcing Quote')}
              setDarkMode={setDarkMode}
              onNavigate={handleNavigate}
              onSearch={openSearch}
              onCalculate={openCalculator}
              onQuote={openQuote}
            />
          )}
        </div>
      </header>

      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={onSelectProduct}
        onSelectArticle={onSelectArticle}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenCalcModal={() => setCalcModalOpen(true)}
        onSelectTab={handleNavigate}
      />
      <QuickCalcModal
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};
