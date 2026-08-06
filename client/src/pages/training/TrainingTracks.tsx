import React from 'react';
import { ArrowRight, CheckCircle2, Clock, GraduationCap, BookOpen, Award, Sparkles, Layers } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { TRAINING_TRACKS } from '../../data/mockData';
import type { TrainingTrack } from '../../types';

interface Props {
  content: Record<string, string>;
  onSelect: (track: TrainingTrack) => void;
}

export function TrainingTracks({ content, onSelect }: Props) {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
          {content.tracks_badge ?? 'Curriculum & Syllabi'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
          {content.tracks_heading ?? 'Specialized B2B Commercial Tracks'}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {content.tracks_sub ?? 'Select a track below to review full module syllabi, target audience criteria, and enrollment schedules.'}
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {TRAINING_TRACKS.map((track) => (
          <Card3D key={track.id} intensity={10}>
            <article className="group relative rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800/90 p-8 shadow-xl hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between h-full space-y-6 overflow-hidden">
              
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />

              <div className="space-y-5">
                {/* Header Icon & Badges */}
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Enrolling</span>
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700/60">
                      {track.level}
                    </span>
                  </div>
                </div>

                {/* Track Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                    {track.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    {track.tagline}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
                    {track.description}
                  </p>
                </div>

                {/* Key Outcomes Section (Sleek List, No Blocky Dark Box) */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Key Learning Outcomes</span>
                  </div>
                  <div className="space-y-2.5">
                    {track.keyTakeaways.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info Badges Bar */}
                <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{track.curriculum.length} Modules</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    <span>UNT Certified</span>
                  </span>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                <div className="text-xs text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{track.duration}</span>
                </div>

                <button
                  onClick={() => onSelect(track)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 hover:scale-105 transition-all"
                >
                  <span>Explore Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </article>
          </Card3D>
        ))}
      </div>
    </section>
  );
}
