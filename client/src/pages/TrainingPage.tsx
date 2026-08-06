import React, { useState } from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import type { TrainingTrack } from '../types';
import { TrainingHero } from './training/TrainingHero';
import { TrainingActivityGallery } from './training/TrainingActivityGallery';
import { TrainingPromosSchedule } from './training/TrainingPromosSchedule';
import { TrainingTracks } from './training/TrainingTracks';
import { TrainingBootcamp } from './training/TrainingBootcamp';
import { TrainingTrackModal } from './training/TrainingTrackModal';
import { Interactive3DBg } from '../components/Interactive3DBg';

interface TrainingPageProps {
  onOpenQuoteModal: () => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedTrack, setSelectedTrack] = useState<TrainingTrack | null>(null);
  const content = useHomepageSections().training_page ?? {};

  const registerForTrack = () => {
    setSelectedTrack(null);
    onOpenQuoteModal();
  };

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

        {/* 4. Specialized B2B Commercial Tracks / Syllabus */}
        <TrainingTracks content={content} onSelect={setSelectedTrack} />

        {/* 5. In-House Corporate Bootcamp Configurator / Quote Banner */}
        <TrainingBootcamp content={content} onQuote={onOpenQuoteModal} />
      </div>

      {/* Track Syllabus Modal */}
      {selectedTrack && (
        <TrainingTrackModal
          track={selectedTrack}
          onClose={() => setSelectedTrack(null)}
          onRegister={registerForTrack}
        />
      )}
    </div>
  );
};
