import React from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { AboutHubs } from './about/AboutHubs';
import { AboutHero, AboutMission } from './about/AboutIntroSections';
import { AboutTimeline } from './about/AboutTimeline';
import { AdvantagesSection, CoreValuesSection } from './about/AboutValueSections';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const content = useHomepageSections().about_page ?? {};
  const { language } = useLanguage();

  return (
    <div className="space-y-0 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      <AboutHero content={content} />
      <AboutMission content={content} />
      {language === 'en' && <CoreValuesSection />}
      <AdvantagesSection content={content} />
      {language === 'en' && <AboutTimeline />}
      <AboutHubs content={content} onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
