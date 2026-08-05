import React, { useState } from 'react';
import { useHomepageSections } from '../hooks/useHomepageSections';
import type { TrainingTrack } from '../types';
import { TrainingBootcamp } from './training/TrainingBootcamp';
import { TrainingHero } from './training/TrainingHero';
import { TrainingTrackModal } from './training/TrainingTrackModal';
import { TrainingTracks } from './training/TrainingTracks';

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

  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      <TrainingHero content={content} />
      <TrainingTracks content={content} onSelect={setSelectedTrack} />
      <TrainingBootcamp content={content} onQuote={onOpenQuoteModal} />
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
