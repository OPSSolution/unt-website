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
    <div className="relative space-y-10 sm:space-y-12 pb-12 bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh min-h-screen overflow-hidden">
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
