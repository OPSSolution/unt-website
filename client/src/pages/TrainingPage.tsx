import React from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import { TrainingHero } from './training/TrainingHero';
import { TrainingActivityGallery } from './training/TrainingActivityGallery';
import { TrainingPromosSchedule } from './training/TrainingPromosSchedule';
import { Interactive3DBg } from '../components/Interactive3DBg';

interface TrainingPageProps {
  onOpenQuoteModal: () => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onOpenQuoteModal }) => {
  const content = useHomepageSections().training_page ?? {};

  const scrollToGallery = () => {
    const galleryEl = document.getElementById('activity-gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative space-y-16 pb-20 animate-fade-in bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh overflow-hidden min-h-screen">
      
      {/* 3D Floating Pyramids Canvas Background for Sales Academy */}
      <Interactive3DBg variant="pyramids" />

      <div className="relative z-10 space-y-16">
        {/* 1. Hero Section with Quick Gallery Scroll */}
        <TrainingHero 
          content={content} 
          onOpenQuoteModal={onOpenQuoteModal} 
          onExploreGallery={scrollToGallery} 
        />

        {/* 2. Upcoming Activity Schedule & Live Promos */}
        <TrainingPromosSchedule content={content} onOpenQuoteModal={onOpenQuoteModal} />

        {/* 3. Live Activity & Media Gallery Showcase (Photos, Video Previews, Roleplay, Graduations) */}
        <div id="activity-gallery">
          <TrainingActivityGallery content={content} onOpenQuoteModal={onOpenQuoteModal} />
        </div>
      </div>

    </div>
  );
};
