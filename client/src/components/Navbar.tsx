import React, { useState, useEffect } from 'react';
import { PageTab, Product, Article } from '../types';
import {
  Menu, X, ArrowRight, Search, Calculator,
  Sun, Moon, ScanLine, Home, Users, Briefcase,
  Package, GraduationCap, BookOpen, Mail, Sparkles, Globe
} from 'lucide-react';
import { QuickSearchModal } from './QuickSearchModal';
import { QuickCalcModal } from './QuickCalcModal';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { MobileNav } from './navbar/MobileNav';
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
  icon: React.ElementType;
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', labelKhmer: 'ទំព័រដើម', icon: Home },
  { id: 'about', label: 'About', labelKhmer: 'អំពីយើង', icon: Users },
  { id: 'services', label: 'Services', labelKhmer: 'សេវាកម្ម', icon: Briefcase },
  { id: 'products', label: 'Wholesale Catalog', labelKhmer: 'ទំនិញបោះដុំ', icon: Package },
  { id: 'training', label: 'Sales Training', labelKhmer: 'វគ្គបណ្ដុះបណ្ដាល', icon: GraduationCap },
  { id: 'blog', label: 'Market Insights', labelKhmer: 'ព័ត៌មានទីផ្សារ', icon: BookOpen },
  { id: 'contact', label: 'Contact', labelKhmer: 'ទំនាក់ទំនង', icon: Mail },
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
  const navbarContent = useHomepageSections().navbar_footer ?? {};
  const { language } = useLanguage();
  const isKm = language === 'km';

  // Compress on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  return (
    <>
      <header className="sticky top-0 z-50 w-full pointer-events-none px-3 sm:px-6 pt-3 sm:pt-4">
        {/* Outer EnviroStruct Floating Glass Container */}
        <div
          className={`pointer-events-auto relative mx-auto max-w-[1700px] w-full transition-all duration-300 bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.7)] ${isScrolled ? 'py-1.5 shadow-xl' : 'py-2.5'
            } ${mobileMenuOpen ? 'rounded-[2rem]' : 'rounded-3xl sm:rounded-[28px]'}`}
        >
          {/* ─── 1. Signature Emerald S-Curve Wave Graphic ─── */}
          <div className="absolute top-0 bottom-0 left-0 w-72 sm:w-80 pointer-events-none overflow-hidden rounded-l-3xl sm:rounded-l-[28px] z-0">
            <svg
              className="absolute top-0 left-0 h-full w-full"
              viewBox="0 0 320 80"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Light Mode S-Curve Wave */}
              <path
                className="dark:hidden"
                d="M 0,0 L 155,0 C 200,0 175,80 280,80 L 0,80 Z"
                fill="url(#s-curve-grad-light)"
              />
              {/* Dark Mode S-Curve Wave */}
              <path
                className="hidden dark:block"
                d="M 0,0 L 155,0 C 200,0 175,80 280,80 L 0,80 Z"
                fill="url(#s-curve-grad-dark)"
              />
              <defs>
                <linearGradient id="s-curve-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#a7f3d0" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="s-curve-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064e3b" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#047857" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.25" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-2.5 pl-2 sm:pl-5 pr-2 sm:pr-4">
            {/* ─── 2. Logo & Brand Tagline ─── */}
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center space-x-1.5 sm:space-x-2.5 text-left group focus:outline-none shrink-0 max-w-[140px] sm:max-w-[220px] lg:max-w-[160px] xl:max-w-[210px] 2xl:max-w-none"
              aria-label="Unique Noble Trading Home"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-xl bg-white border border-emerald-200/80 shadow-sm p-1 group-hover:scale-105 transition-all duration-300 shrink-0">
                <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block shrink-0 min-w-0">
                <div className="font-display font-black text-xs xl:text-xs 2xl:text-sm tracking-tight text-slate-900 dark:text-white leading-none truncate">
                  {navbarContent.company_name ?? 'Unique Noble Trading Co., Ltd.'}
                </div>
                <div className="hidden 2xl:block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-wide mt-1 leading-none truncate">
                  {navbarContent.company_tagline ?? (isKm ? 'ដៃគូពាណិជ្ជកម្មពិភពលោកដែលលោកអ្នកទុកចិត្ត' : 'Trusted Global Trading Partner')}
                </div>
              </div>
            </button>

            {/* ─── 3. Interactive Futuristic Navigation Pill System ─── */}
            <nav className="hidden xl:flex items-center">
              <div className="relative inline-flex items-center gap-1 xl:gap-1.5 p-1.5 rounded-full bg-slate-100/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                {NAV_LINKS.map((link) => {
                  const isActive = activeTab === link.id;
                  const Icon = link.icon;

                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavigate(link.id)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 group select-none ${isActive
                          ? 'text-white dark:text-slate-950 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 shadow-md shadow-emerald-500/30 scale-[1.02]'
                          : 'text-slate-700 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-300 hover:bg-emerald-500/10 hover:scale-105 active:scale-95'
                        }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 transition-all duration-300 ${isActive
                            ? 'text-white dark:text-slate-950 scale-110'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:scale-125 group-hover:rotate-6'
                          }`}
                      />
                      <span className="whitespace-nowrap">{isKm ? link.labelKhmer ?? link.label : link.label}</span>

                      {/* Active Glowing Pulse Indicator */}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-300 dark:bg-emerald-950 shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* ─── 4. Right Quick Tools Cluster & Gradient CTA Button ─── */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Language Switcher */}
              <div className="hidden sm:block shrink-0">
                <LanguageToggle compact />
              </div>

              {/* Theme Toggle */}
              {setDarkMode && (
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="hidden 2xl:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 border border-slate-200/80 transition-all dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-200 dark:hover:text-emerald-300 dark:border-white/10 hover:scale-110 active:scale-95 shrink-0"
                  title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-label="Toggle theme"
                >
                  {darkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />}
                </button>
              )}

              {/* AI Catalog Search Button */}
              <button
                onClick={openSearch}
                className="hidden 2xl:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 border border-slate-200/80 transition-all group relative dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-200 dark:hover:text-emerald-300 dark:border-white/10 hover:scale-110 active:scale-95 shrink-0"
                title="AI Search Catalog (Ctrl+K)"
                aria-label="AI search catalog"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform text-slate-700 dark:text-slate-200" />
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 text-white ai-scan-icon">
                  <ScanLine className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                </span>
              </button>

              {/* Sourcing Estimator Button */}
              <button
                onClick={openCalculator}
                className="hidden 2xl:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 border border-slate-200/80 transition-all group dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-200 dark:hover:text-emerald-300 dark:border-white/10 hover:scale-110 active:scale-95 shrink-0"
                title="Sourcing Estimator"
                aria-label="Open sourcing estimator"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform text-slate-700 dark:text-slate-200" />
              </button>

              {/* Primary Emerald Gradient Pill CTA Button ("Get a Quote") */}
              <button
                onClick={onOpenQuoteModal}
                className="btn-shine inline-flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:scale-[1.04] active:scale-[0.98] whitespace-nowrap shrink-0 group"
              >
                <span>{navbarContent.navbar_cta || (isKm ? 'ស្នើសុំតម្លៃ' : 'Get a Quote')}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Mobile / Tablet Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15 transition-colors shrink-0"
                aria-label="Toggle mobile navigation"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <MobileNav
              activeTab={activeTab}
              darkMode={darkMode}
              ctaLabel={navbarContent.mobile_cta || (isKm ? 'ស្នើសុំតម្លៃ B2B' : 'Request B2B Sourcing Quote')}
              setDarkMode={setDarkMode}
              onNavigate={handleNavigate}
              onSearch={openSearch}
              onCalculate={openCalculator}
              onQuote={onOpenQuoteModal}
            />
          )}
        </div>
      </header>

      {/* Modals */}
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
