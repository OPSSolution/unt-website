import React from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { AboutHubs } from './about/AboutHubs';
import { AboutHero, AboutMission } from './about/AboutIntroSections';
import { AboutTimeline } from './about/AboutTimeline';
import { AdvantagesSection, CoreValuesSection } from './about/AboutValueSections';
import { useLanguage } from '../i18n/LanguageContext';
import { Interactive3DBg } from '../components/Interactive3DBg';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const content = useHomepageSections().about_page ?? {};
  const { language } = useLanguage();

  return (
    <div className="relative isolate space-y-10 sm:space-y-12 pb-12 bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen overflow-hidden">
      <Interactive3DBg variant="hex-grid" />
      <div className="absolute inset-0 -z-[1] bg-[linear-gradient(to_right,#0596690d_1px,transparent_1px),linear-gradient(to_bottom,#0596690d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute inset-0 -z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] -left-40 w-[620px] h-[620px] bg-emerald-500/10 dark:bg-emerald-500/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute top-[42%] -right-48 w-[680px] h-[680px] bg-teal-500/10 dark:bg-teal-500/15 blur-[160px] rounded-full" />
        <div className="absolute bottom-[3%] left-1/4 w-[560px] h-[560px] bg-emerald-400/10 dark:bg-emerald-600/15 blur-[150px] rounded-full animate-pulse" />
      </div>
      <AboutHero content={content} />
      <div className="relative z-10 space-y-12">
        <AboutMission content={content} />
        {language === 'en' && <CoreValuesSection />}
        <AdvantagesSection content={content} />
        {language === 'en' && <AboutTimeline />}
        <AboutHubs content={content} onOpenQuoteModal={onOpenQuoteModal} />
      </div>
    </div>
  );
};
