import React, { useState, useEffect } from 'react';
import { PageTab, Product, Article } from '../types';
import {
  Menu, X, ArrowRight, Search, Calculator, ChevronDown, Sparkles, Package, Truck,
  Sun, Moon, UserCheck, ScanLine,
} from 'lucide-react';
import { QuickSearchModal } from './QuickSearchModal';
import { QuickCalcModal } from './QuickCalcModal';
import { useHomepageSections } from '../hooks/useHomepageSections';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  darkMode?: boolean;
  setDarkMode?: (dark: boolean | ((prev: boolean) => boolean)) => void;
  onOpenQuoteModal: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectArticle?: (article: Article) => void;
}

interface NavLink {
  id: PageTab;
  label: string;
  labelKhmer?: string;
  hasMegaMenu?: 'products' | 'services';
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', labelKhmer: 'ទំព័រដើម' },
  { id: 'about', label: 'About', labelKhmer: 'អំពីយើង' },
  { id: 'services', label: 'Services', labelKhmer: 'សេវាកម្ម', hasMegaMenu: 'services' },
  { id: 'products', label: 'Wholesale Catalog', labelKhmer: 'ទំនិញបោះដុំ', hasMegaMenu: 'products' },
  { id: 'training', label: 'Sales Training', labelKhmer: 'វគ្គបណ្តុះបណ្តាល' },
  { id: 'blog', label: 'Market Insights', labelKhmer: 'ព័ត៌មានទីផ្សារ' },
  { id: 'contact', label: 'Contact', labelKhmer: 'ទំនាក់ទំនង' },
];

const PRODUCT_MEGA_CATEGORIES = [
  { title: 'Food & Beverage', desc: 'Organic NFC coconut water, specialty teas', flag: '🥥' },
  { title: 'Skincare & Beauty', desc: 'K-Beauty & J-Beauty brightening serums', flag: '✨' },
  { title: 'Health Supplements', desc: 'Liposomal Vitamin C, Zinc & immunity', flag: '💊' },
  { title: 'Personal Hygiene', desc: 'Salon-grade Keratin & Argan oil sets', flag: '🌿' },
];

const SERVICE_MEGA_ITEMS = [
  { title: 'Custom OEM & Private Labeling', desc: 'Turnkey cosmetic & beverage manufacturing in Korea & Japan', icon: Sparkles },
  { title: 'Ministry Permit & GDCE Clearance', desc: '100% compliant Cambodian MoC, HACCP & Khmer packaging labels', icon: Truck },
  { title: 'Cold-Chain & Cross-Border Logistics', desc: 'Refrigerated overland trucking & ocean freight to Phnom Penh', icon: Package },
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
  const sections = useHomepageSections();
  const nb = sections.navbar_footer ?? {};

  // Mega-menu hover state
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'services' | null>(null);

  // Compress on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ctrl+K / Cmd+K global search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: PageTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── Floating Super-Prime Pill Header (Light & Dark) ─── */}
      <header className="sticky top-0 z-50 w-full pointer-events-none px-3 sm:px-6 pt-3 sm:pt-4">
        <div
          className={`pointer-events-auto relative mx-auto max-w-6xl 2xl:max-w-7xl nav-pill transition-all duration-300 ${
            isScrolled ? 'nav-pill-scrolled py-1.5' : 'py-2'
          } ${mobileMenuOpen ? 'rounded-[2rem]' : 'rounded-full'}`}
        >
          {/* Ambient top glow hairline */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none rounded-full" />

          {/* ── Pill row ── */}
          <div className={`flex items-center justify-between gap-2 pl-3 sm:pl-4 pr-2 sm:pr-3 transition-all duration-300 ${
            isScrolled ? 'h-12 xl:h-14' : 'h-14 xl:h-16'
          }`}>
            {/* Logo (circular mark + brand on wide screens) */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2.5 text-left group focus:outline-none shrink-0"
              aria-label="UNT Company home"
            >
              <div className="relative w-10 h-10 rounded-xl bg-white border border-emerald-200 shadow-sm p-1 group-hover:scale-105 transition-all duration-300 shrink-0">
                <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
              </div>
              <div className="hidden xl:block shrink-0">
                <div className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-none">
                  {nb.company_name ?? 'UNT COMPANY'}
                </div>
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide mt-1 leading-none">
                  {nb.company_tagline ?? 'Trusted Global Trading Partner'}
                </div>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center xl:space-x-0.5 relative">
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.id;
                const hasMega = link.hasMegaMenu;
                const megaOpen = activeMegaMenu === hasMega;

                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => hasMega && setActiveMegaMenu(hasMega)}
                    onMouseLeave={() => hasMega && setActiveMegaMenu(null)}
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className={`relative px-2.5 xl:px-3.5 py-2 rounded-full text-xs 2xl:text-[13px] font-semibold transition-all flex items-center gap-1 group ${
                        isActive
                          ? 'text-emerald-700 font-bold bg-emerald-50 dark:text-emerald-300 dark:bg-white/10'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-white/75 dark:hover:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      {hasMega && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            megaOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-300' : 'text-slate-400'
                          }`}
                        />
                      )}
                    </button>

                    {/* Mega Menu: Wholesale Catalog */}
                    {megaOpen && link.id === 'products' && (
                      <div className="absolute top-full -left-20 w-[560px] bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-[0_40px_80px_-20px_rgba(15,23,42,0.25)] p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left mt-4 dark:bg-slate-900/95 dark:border-slate-700/80 dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_-12px_rgba(16,185,129,0.18)]">
                        <div className="mega-caret" />
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="p-1.5 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400">
                              <Package className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                              Wholesale Categories & Sourcing
                            </span>
                          </div>
                          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">
                            500+ ASEAN Certified Products
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {PRODUCT_MEGA_CATEGORIES.map((cat, i) => (
                            <div
                              key={i}
                              onClick={() => handleNavClick('products')}
                              className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-400/60 transition-all cursor-pointer group dark:bg-slate-800/60 dark:hover:bg-emerald-950/40 dark:border-slate-700/80 dark:hover:border-emerald-500/40"
                            >
                              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors dark:text-white dark:group-hover:text-emerald-300">
                                <span>{cat.flag}</span>
                                <span className="whitespace-nowrap">{cat.title}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 mt-1 line-clamp-1 group-hover:text-slate-600 transition-colors dark:text-slate-400 dark:group-hover:text-slate-300">
                                {cat.desc}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-200 flex items-center justify-between gap-3 dark:from-emerald-950/80 dark:to-slate-800/80 dark:border-emerald-500/30">
                          <div className="text-xs text-slate-900 dark:text-white font-semibold">
                            Looking for Turnkey OEM / Custom Formulation?
                          </div>
                          <button
                            onClick={() => {
                              setActiveMegaMenu(null);
                              onOpenQuoteModal();
                            }}
                            className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 shrink-0"
                          >
                            OEM Inquiry
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Mega Menu: Services & Sourcing */}
                    {megaOpen && link.id === 'services' && (
                      <div className="absolute top-full -left-8 w-[480px] bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-[0_40px_80px_-20px_rgba(15,23,42,0.25)] p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left mt-4 dark:bg-slate-900/95 dark:border-slate-700/80 dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_-12px_rgba(16,185,129,0.18)]">
                        <div className="mega-caret" />
                        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="p-1.5 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                              End-to-End Trade Solutions
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {SERVICE_MEGA_ITEMS.map((srv, idx) => {
                            const Icon = srv.icon;
                            return (
                              <div
                                key={idx}
                                onClick={() => handleNavClick('services')}
                                className="flex items-start space-x-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-400/60 transition-all cursor-pointer group dark:bg-slate-800/60 dark:hover:bg-emerald-950/40 dark:border-slate-700/80 dark:hover:border-emerald-500/40"
                              >
                                <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 shrink-0 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors dark:text-white dark:group-hover:text-emerald-300">
                                    {srv.title}
                                  </div>
                                  <div className="text-[11px] text-slate-500 mt-0.5 group-hover:text-slate-600 transition-colors dark:text-slate-400 dark:group-hover:text-slate-300">
                                    {srv.desc}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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

              {/* Portal Login (icon on md, text on lg) */}
              <button
                onClick={onOpenQuoteModal}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-700 hover:text-emerald-700 hover:bg-slate-100 text-xs font-bold transition-all dark:text-white/75 dark:hover:text-white dark:hover:bg-white/10"
              >
                <UserCheck className="w-4 h-4" />
                <span>Login</span>
              </button>

              {/* Primary CTA — high contrast pill */}
              <button
                onClick={onOpenQuoteModal}
                className="btn-shine inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 group shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:shadow-black/30"
              >
                <span>{nb.navbar_cta ?? 'Get a Quote'}</span>
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

          {/* Mobile Drawer (rounded sheet below pill row) */}
          {mobileMenuOpen && (
            <div className="lg:hidden px-4 pt-2 pb-5 space-y-3 animate-in slide-in-from-top duration-200 text-left">
              <div className="border-t border-slate-200 dark:border-white/10 pt-3 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                        isActive
                          ? 'text-emerald-700 bg-emerald-50 font-bold dark:text-emerald-300 dark:bg-white/10'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{link.labelKhmer}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold transition-colors dark:bg-white/10 dark:text-white/80"
                >
                  <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Search</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCalcModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold transition-colors dark:bg-white/10 dark:text-white/80"
                >
                  <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Estimator</span>
                </button>
              </div>

              {setDarkMode && (
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold transition-colors dark:bg-white/10 dark:text-white/80"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
                  <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="btn-shine w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm"
              >
                <span>{nb.mobile_cta ?? 'Request B2B Sourcing Quote'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Command Search Palette Modal */}
      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={onSelectProduct}
        onSelectArticle={onSelectArticle}
        onOpenQuoteModal={onOpenQuoteModal}
        onOpenCalcModal={() => setCalcModalOpen(true)}
        onSelectTab={handleNavClick}
      />

      {/* Sourcing Estimator Modal */}
      <QuickCalcModal
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};
