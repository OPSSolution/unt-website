import React, { useState } from 'react';
import { Play, Image as ImageIcon, Video, Award, Users, Calendar, MapPin, X, CheckCircle, Sparkles, ExternalLink, Volume2, ShieldCheck, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';

export interface ActivityItem {
  id: string;
  title: string;
  category: 'workshop' | 'video' | 'negotiation' | 'graduation';
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  location: string;
  date: string;
  participants: string;
  description: string;
  highlights: string[];
  duration?: string;
  instructor?: string;
  badge?: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Executive B2B Commercial Sales Masterclass',
    category: 'workshop',
    type: 'image',
    mediaUrl: '/images/training/workshop.png',
    location: 'UNT Trade Headquarters, Phnom Penh',
    date: 'August 2026',
    participants: '35 Senior Sales Leads',
    description: 'Intense 3-day corporate workshop covering advanced key account management, price objection handling, and ASEAN cross-border wholesale distribution.',
    highlights: ['Key Account Strategy', 'Buyer Psychology', 'Margin Maximization'],
    badge: 'Popular Workshop'
  },
  {
    id: 'act-2',
    title: 'Video Highlight: Live B2B Deal Negotiation Simulation',
    category: 'video',
    type: 'video',
    mediaUrl: '/images/training/videothumb.png',
    thumbnailUrl: '/images/training/videothumb.png',
    location: 'Auditorium Hall A, Phnom Penh',
    date: 'July 2026',
    participants: 'Video Preview (4:15 min)',
    duration: '04:15',
    instructor: 'Oknha Sarin Chen & Trade Lead Team',
    description: 'Watch senior trade instructors coach regional sales teams through real-world multi-variable supplier price negotiations.',
    highlights: ['Live Negotiation Coaching', 'Contract Clause Analysis', 'Closing Tactics'],
    badge: 'Video Masterclass'
  },
  {
    id: 'act-3',
    title: 'Simulated Contract Negotiation & Roleplay Lab',
    category: 'negotiation',
    type: 'image',
    mediaUrl: '/images/training/negotiation.png',
    location: 'Executive Suite, Phnom Penh',
    date: 'July 2026',
    participants: '20 Key Account Managers',
    description: 'Hands-on roleplay session where sales teams practice high-stakes contract terms, payment security, and OEM exclusivity agreements.',
    highlights: ['Real-Time Stress Testing', 'MoC Import Compliance', 'Distributor Terms'],
    badge: 'Hands-On Lab'
  },
  {
    id: 'act-4',
    title: 'UNT Commercial Trade Certification Ceremony',
    category: 'graduation',
    type: 'image',
    mediaUrl: '/images/training/graduation.png',
    location: 'Grand Ballroom, Phnom Penh',
    date: 'June 2026',
    participants: '48 Certified Graduates',
    description: 'Official graduation ceremony celebrating corporate sales teams who completed the 60-day Advanced Commercial Negotiation Track.',
    highlights: ['Official Certification', 'Industry Recognition', 'Alumni Network'],
    badge: 'Graduation Cohort 14'
  }
];

interface Props {
  onOpenQuoteModal: () => void;
}

export const TrainingActivityGallery: React.FC<Props> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'workshop' | 'video' | 'negotiation' | 'graduation'>('all');
  const [selectedVideo, setSelectedVideo] = useState<ActivityItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<ActivityItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredActivities = ACTIVITIES.filter(item => 
    activeTab === 'all' ? true : item.category === activeTab
  );

  return (
    <section className="relative py-12 text-slate-900 dark:text-slate-100">
      <ScrollReveal animation="up">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/80 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Live Activity & Media Showcase</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                See Our Sales Academy <span className="text-emerald-600 dark:text-emerald-400">In Action</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Explore real workshop sessions, live negotiation video previews, hands-on roleplay labs, and corporate graduation ceremonies.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
              {[
                { id: 'all', label: 'All Activities', icon: Sparkles },
                { id: 'workshop', label: 'Workshops', icon: ImageIcon },
                { id: 'video', label: 'Video Previews', icon: Video },
                { id: 'negotiation', label: 'Negotiation Labs', icon: Users },
                { id: 'graduation', label: 'Graduations', icon: Award },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="group relative rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={activity.mediaUrl}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Badge & Type Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white font-bold text-[11px] uppercase tracking-wider backdrop-blur-md shadow-md">
                      {activity.badge ?? activity.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 text-white/90 font-medium text-xs flex items-center gap-1.5 backdrop-blur-md border border-white/10">
                      {activity.type === 'video' ? <Video className="w-3.5 h-3.5 text-emerald-400" /> : <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{activity.type === 'video' ? 'Video Clip' : 'Photo Gallery'}</span>
                    </span>
                  </div>

                  {/* Play Button overlay if Video */}
                  {activity.type === 'video' ? (
                    <button
                      onClick={() => setSelectedVideo(activity)}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-transform duration-300 border-2 border-white/40 group/btn"
                      aria-label="Play video preview"
                    >
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setLightboxImage(activity)}
                      className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>View Photo</span>
                    </button>
                  )}

                  {/* Location & Date Footer on Thumbnail */}
                  <div className="absolute bottom-4 left-4 text-white space-y-0.5">
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-300">
                      <Calendar className="w-3 h-3" />
                      <span>{activity.date} • {activity.participants}</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {activity.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      {activity.highlights.map((h, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                          <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    {activity.instructor && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Instructor: <strong className="text-slate-700 dark:text-slate-200">{activity.instructor}</strong>
                      </span>
                    )}
                    <button
                      onClick={() => activity.type === 'video' ? setSelectedVideo(activity) : setLightboxImage(activity)}
                      className="ml-auto px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>{activity.type === 'video' ? 'Watch Full Clip' : 'Inspect Activity'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Quick CTA Banner for Corporate Sessions */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 border border-emerald-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="space-y-2 relative z-10 max-w-2xl">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase rounded-full tracking-wider">
                Live Enterprise Enrollment
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Want to Host This Interactive Workshop for Your Sales Team?
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
                We deliver custom on-site activity bootcamps with simulated negotiation roleplay tailored to your company catalog.
              </p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="relative z-10 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-xs shadow-xl shadow-emerald-500/20 shrink-0 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>Schedule On-Site Workshop</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </div>
      </ScrollReveal>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-0">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    {selectedVideo.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {selectedVideo.location} • Duration: {selectedVideo.duration ?? '04:15'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setSelectedVideo(null); setIsPlaying(false); }}
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedVideo.mediaUrl}
                alt={selectedVideo.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-30' : 'opacity-80'}`}
              />

              {!isPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-950/40">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 transition-transform duration-300 border-4 border-white/20"
                  >
                    <Play className="w-10 h-10 fill-slate-950 translate-x-1" />
                  </button>
                  <span className="text-xs font-bold text-white bg-slate-900/80 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                    Click to Start Broadcast Preview
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-950/90 text-white space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 animate-pulse">
                    <Volume2 className="w-8 h-8" />
                  </div>
                  <h5 className="text-xl font-bold text-emerald-400">Simulated HD Masterclass Stream</h5>
                  <p className="text-xs text-slate-300 max-w-md">
                    Instructor <strong className="text-white">{selectedVideo.instructor}</strong> demonstrating key account objection tactics & regional distributor contract signing.
                  </p>
                  <div className="w-full max-w-md h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-pulse w-3/4" />
                  </div>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl"
                  >
                    Pause Preview
                  </button>
                </div>
              )}
            </div>

            {/* Video Highlights Footer */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-left w-full sm:w-auto">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Key Session Takeaways</div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Includes live Cambodian & ASEAN distribution case studies</span>
                </div>
              </div>
              <button
                onClick={() => { setSelectedVideo(null); setIsPlaying(false); onOpenQuoteModal(); }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Enroll Team in This Workshop</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setLightboxImage(null)}
                className="w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={lightboxImage.mediaUrl}
              alt={lightboxImage.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-6 bg-slate-900 text-left space-y-2">
              <h4 className="text-xl font-display font-bold text-white">{lightboxImage.title}</h4>
              <p className="text-xs text-slate-300">{lightboxImage.description}</p>
              <div className="flex items-center gap-4 text-[11px] text-emerald-400 pt-2 font-medium">
                <span>📍 {lightboxImage.location}</span>
                <span>📅 {lightboxImage.date}</span>
                <span>👥 {lightboxImage.participants}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
