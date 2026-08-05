import React, { useState } from 'react';
import { TRAINING_TRACKS } from '../data/mockData';
import { TrainingTrack } from '../types';
import { GraduationCap, CheckCircle2, ArrowRight, Clock, X } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Card3D } from '../components/Card3D';

interface TrainingPageProps {
  onOpenQuoteModal: () => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onOpenQuoteModal }) => {
  const [selectedTrack, setSelectedTrack] = useState<TrainingTrack | null>(null);

  return (
    <div className="space-y-16 pb-16 animate-fade-in bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 bg-ambient-mesh">
      {/* 1. Hero */}
      <section className="relative py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <ScrollReveal animation="up">
          <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-4">
            <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
              UNT Trade Capacity Building Institute
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-slate-900 dark:text-white">
              Mastering the Art of <span className="emerald-gradient-text">Global Commerce</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Elevate your commercial team's B2B negotiation skills, buyer psychology, key account retention, and international supply chain management.
            </p>

            {/* Quick Stats Bar */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-2xl font-display font-bold text-emerald-700 dark:text-emerald-400">1,200+</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Professionals Certified</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-2xl font-display font-bold text-emerald-700 dark:text-emerald-400">4.9 / 5.0</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Average Course Rating</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-2xl font-display font-bold text-emerald-700 dark:text-emerald-400">15+</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Senior Trade Instructors</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-2xl font-display font-bold text-emerald-700 dark:text-emerald-400">34%</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Avg 90-Day Conversion Lift</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Specialized Training Tracks */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
            Curriculum
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            Specialized B2B Commercial Tracks
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Select a track below to review full module syllabi, target audience criteria, and enrollment schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {TRAINING_TRACKS.map((track) => (
            <Card3D key={track.id} intensity={12}>
              <div
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-md hover:shadow-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="live-pulse-badge">
                        <span className="live-pulse-dot" />
                        <span>Enrolling</span>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700">
                        {track.level}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{track.tagline}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Key Outcomes</div>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {track.keyTakeaways.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{track.duration}</span>
                  </div>
                  <button
                    onClick={() => setSelectedTrack(track)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5"
                  >
                    <span>Explore Syllabus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 3. Corporate Custom Bootcamps Banner */}
      <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 text-slate-900 dark:text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-200 dark:border-emerald-800">
              In-House Corporate Solutions
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              Need a Private Masterclass for Your Commercial Team?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              We deliver custom on-site workshops tailored to your industry, product catalog, and specific negotiation challenges directly at your Phnom Penh corporate headquarters.
            </p>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shrink-0 flex items-center space-x-2"
          >
            <span>Book Corporate Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Syllabus Detail Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100">
            <div className="bg-white dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-slate-900 dark:text-white text-left">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">{selectedTrack.duration} • {selectedTrack.level}</span>
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-0.5">{selectedTrack.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-left">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{selectedTrack.description}</p>

              <div>
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">Target Audience</h4>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  {selectedTrack.targetAudience}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">Key Learning Takeaways</h4>
                <ul className="space-y-2">
                  {selectedTrack.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-3">Module Curriculum Breakdown</h4>
                <div className="space-y-3">
                  {selectedTrack.curriculum.map((mod, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="font-bold text-slate-900 dark:text-white text-xs">{mod.module}</div>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-300 pl-4 list-disc">
                        {mod.topics.map((top, tIdx) => (
                          <li key={tIdx}>{top}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3 shrink-0">
              <button
                onClick={() => setSelectedTrack(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedTrack(null);
                  onOpenQuoteModal();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                Register Team for Track
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
