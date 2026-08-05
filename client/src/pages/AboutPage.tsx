import React from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { AboutHubs } from './about/AboutHubs';
import { AboutHero, AboutMission } from './about/AboutIntroSections';
import { AboutTimeline } from './about/AboutTimeline';
import { AdvantagesSection, CoreValuesSection } from './about/AboutValueSections';

interface AboutPageProps {
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal }) => {
  const content = useHomepageSections().about_page ?? {};

  return (
    <div className="space-y-0 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      <AboutHero subheadline={content.subheadline} />
      <AboutMission />
      <CoreValuesSection />
      <AdvantagesSection />
      <AboutTimeline />
      <AboutHubs onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
