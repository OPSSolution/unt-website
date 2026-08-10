import React from 'react';
import { PageTab } from '../types';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { useLanguage } from '../i18n/LanguageContext';
import { footerNavigation, legalLinks, tradingSolutions } from './footer/data';
import { NewsletterSignup } from './footer/NewsletterSignup';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuoteModal }) => {
  const sections = useHomepageSections();
  const nb = sections.navbar_footer ?? {};
  const { language } = useLanguage();
  const isKm = language === 'km';

  const navigateTo = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-10 sm:pt-12 pb-12 shadow-inner transition-colors duration-300">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Top Callout Banner */}
        <div className="mb-10 sm:mb-12 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-emerald-500/10 dark:from-emerald-950/50 dark:via-slate-900/50 dark:to-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-2xl text-left">
            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold tracking-wider uppercase rounded-full mb-3">
              {nb.footer_callout_badge ?? 'Ready to Expand Your Wholesale Supply Chain?'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              {nb.footer_callout_heading ?? "Partner with Cambodia's Leading Sourcing Ecosystem"}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">
              {nb.footer_callout_desc ?? 'From verified factory matching to door-to-door customs clearance and private label formulation — we deliver reliability at scale.'}
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>{(nb.footer_callout_cta || (isKm ? 'ស្នើសុំតម្លៃ' : 'Request Sourcing Quote'))}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center"
            >
              {nb.footer_callout_cta_secondary || (isKm ? 'ទំនាក់ទំនងការិយាល័យភ្នំពេញ' : 'Contact Phnom Penh Office')}
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 shadow-sm p-1 shrink-0">
                <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-slate-900 dark:text-white block">{nb.company_name ?? 'Unique Noble Trading Co., Ltd.'}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{nb.company_legal ?? 'Unique Noble Trading Co., Ltd.'}</span>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-sm">
              {nb.footer_desc ?? 'Empowering Asian commerce by bridging world-class manufacturers with retail networks, wholesale distributors, and emerging brands in Cambodia and ASEAN.'}
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Full Ministry of Commerce & GDCE Import Audit Compliant</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {footerNavigation.map(({ label, tab }) => (
                <li key={tab}>
                  <button onClick={() => navigateTo(tab)} className="hover:text-emerald-600 transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Solutions */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Trading Solutions</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {tradingSolutions.map((solution) => <li key={solution}>{solution}</li>)}
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Market Intelligence</h4>
            <p className="text-xs text-slate-600">
              Subscribe to our bi-weekly ASEAN trade regulatory updates and wholesale tariff briefings.
            </p>

            <NewsletterSignup />

            <div className="pt-2 text-xs space-y-1.5 text-slate-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>196B & 196A, St 122, Teuk Laak I, Toul Kork, Phnom Penh 12157</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>012 771 774 (+855 12 771 774)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>untcambodia@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {nb.footer_copyright ?? 'Unique Noble Trading Co., Ltd. All rights reserved.'}
          </div>
          <div className="flex items-center space-x-6">
            {legalLinks.map((label) => (
              <button key={label} onClick={() => navigateTo('contact')} className="hover:text-slate-700 transition-colors">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
