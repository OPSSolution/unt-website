import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Play, Image as ImageIcon, Video, Award, Users, Calendar, MapPin, X, CheckCircle,
  Sparkles, ExternalLink, Volume2, ShieldCheck, ChevronRight, ChevronLeft, Search,
  Filter, Grid, LayoutGrid, Maximize2, Download, Eye, Layers, Clock, Share2
} from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { ScrollTextReveal } from '../../components/ScrollTextReveal';
import { Card3D } from '../../components/Card3D';
import { useLanguage } from '../../i18n/LanguageContext';

export interface ActivityItem {
  id: string;
  title: string;
  category: 'workshop' | 'video' | 'negotiation' | 'graduation';
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  galleryImages: string[];
  location: string;
  date: string;
  participants: string;
  description: string;
  highlights: string[];
  duration?: string;
  instructor?: string;
  badge?: string;
}

const isMediaUrl = (value: unknown): value is string =>
  typeof value === 'string' && (/^https?:\/\//i.test(value) || value.startsWith('/'));

const REMOVED_STATIC_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Executive B2B Commercial Sales Masterclass',
    category: 'workshop',
    type: 'image',
    mediaUrl: '/images/training/workshop.png',
    galleryImages: [
      '/images/training/workshop.png',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'UNT Trade Headquarters, Phnom Penh',
    date: 'August 2026',
    participants: '35 Senior Sales Leads',
    description: 'Intense 3-day corporate workshop covering advanced key account management, price objection handling, and ASEAN cross-border wholesale distribution.',
    highlights: ['Key Account Strategy', 'Buyer Psychology', 'Margin Maximization', 'Bulk Pricing Models'],
    badge: 'Popular Workshop'
  },
  {
    id: 'act-2',
    title: 'Video Highlight: Live B2B Deal Negotiation Simulation',
    category: 'video',
    type: 'video',
    mediaUrl: '/images/training/videothumb.png',
    thumbnailUrl: '/images/training/videothumb.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    galleryImages: [
      '/images/training/videothumb.png',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Auditorium Hall A, Phnom Penh',
    date: 'July 2026',
    participants: 'Video Preview (04:15 min)',
    duration: '04:15',
    instructor: 'Oknha Sarin Chen & Trade Lead Team',
    description: 'Watch senior trade instructors coach regional sales teams through real-world multi-variable supplier price negotiations.',
    highlights: ['Live Negotiation Coaching', 'Contract Clause Analysis', 'Closing Tactics', 'OEM Exclusivity'],
    badge: 'Video Masterclass'
  },
  {
    id: 'act-3',
    title: 'Simulated Contract Negotiation & Roleplay Lab',
    category: 'negotiation',
    type: 'image',
    mediaUrl: '/images/training/negotiation.png',
    galleryImages: [
      '/images/training/negotiation.png',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Executive Suite, Phnom Penh',
    date: 'July 2026',
    participants: '20 Key Account Managers',
    description: 'Hands-on roleplay session where sales teams practice high-stakes contract terms, payment security, and OEM exclusivity agreements.',
    highlights: ['Real-Time Stress Testing', 'MoC Import Compliance', 'Distributor Terms', 'Escrow & L/C Risk'],
    badge: 'Hands-On Lab'
  },
  {
    id: 'act-4',
    title: 'UNT Commercial Trade Certification Ceremony',
    category: 'graduation',
    type: 'image',
    mediaUrl: '/images/training/graduation.png',
    galleryImages: [
      '/images/training/graduation.png',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Grand Ballroom, Phnom Penh',
    date: 'June 2026',
    participants: '48 Certified Graduates',
    description: 'Official graduation ceremony celebrating corporate sales teams who completed the 60-day Advanced Commercial Negotiation Track.',
    highlights: ['Official Certification', 'Industry Recognition', 'Alumni Network', 'Leadership Badges'],
    badge: 'Graduation Cohort 14'
  },
  {
    id: 'act-5',
    title: 'Cross-Border ASEAN Wholesale Distribution Masterclass',
    category: 'workshop',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'ASEAN Trade Hall, Siem Reap',
    date: 'May 2026',
    participants: '40 Regional Trade Managers',
    description: 'Deep dive into Thailand, Vietnam, and Cambodian customs routing, freight cost optimization, and multi-currency contract indexing.',
    highlights: ['ASEAN Customs Tariff', 'Logistics Freight Hedges', 'Distribution Rights'],
    badge: 'Regional Track'
  },
  {
    id: 'act-6',
    title: 'Video Highlight: Handling Tough Procurement Objections',
    category: 'video',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Media Studio 2, Phnom Penh',
    date: 'May 2026',
    participants: 'Video Preview (06:40 min)',
    duration: '06:40',
    instructor: 'Senior Commercial Counsel & Negotiation Coach',
    description: 'Real camera footage of corporate negotiators responding to extreme price drop demands from major supermarket buyers.',
    highlights: ['Objection Frameworks', 'Value Anchor Points', 'Concession Trading'],
    badge: 'Video Masterclass'
  },
  {
    id: 'act-7',
    title: 'Supermarket Shelf Placement & Retail FMCG Lab',
    category: 'negotiation',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Model Retail Center, Phnom Penh',
    date: 'April 2026',
    participants: '28 Retail Category Managers',
    description: 'Practical exercise in negotiating slotting fees, end-cap displays, promotional rebates, and retail shelf position agreements.',
    highlights: ['Slotting Fee Negotiation', 'End-Cap Placement', 'Promotional Rebates'],
    badge: 'Retail Strategy'
  },
  {
    id: 'act-8',
    title: 'Corporate Sales Leadership Gala & Alumni Awards',
    category: 'graduation',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Sofitel Grand Ballroom, Phnom Penh',
    date: 'March 2026',
    participants: '120 Executive Alumni',
    description: 'Annual gathering of enterprise trade leaders, featuring keynote speeches, dealmaker of the year awards, and executive networking.',
    highlights: ['Dealmaker of the Year', 'Enterprise Networking', 'Alumni Keynotes'],
    badge: 'Annual Gala'
  },
  {
    id: 'act-9',
    title: 'Video Highlight: Pitching Enterprise Products to Import Buyers',
    category: 'video',
    type: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    galleryImages: [
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Phnom Penh Convention Center',
    date: 'March 2026',
    participants: 'Video Preview (05:20 min)',
    duration: '05:20',
    instructor: 'UNT International Distribution Directors',
    description: 'A complete step-by-step video breakdown on pitching large-scale consumer electronics and industrial goods to overseas buyers.',
    highlights: ['Pitch Deck Dynamics', 'Volume Tiering', 'L/C Terms Presentation'],
    badge: 'Video Masterclass'
  },
  {
    id: 'act-10',
    title: 'Ministry of Commerce & Tax Compliance Field Workshop',
    category: 'workshop',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'UNT Trade Legal Center, Phnom Penh',
    date: 'February 2026',
    participants: '30 Corporate Legal & Sales Officers',
    description: 'Expert-led session explaining MoC trade license registration, GDT VAT invoicing compliance, and import declaration protocols.',
    highlights: ['MoC Legal Framework', 'VAT & Import Invoicing', 'Customs Clearance'],
    badge: 'Legal & Tax Track'
  }
];

// Public gallery media is managed only through Admin/Supabase.
export const ACTIVITIES: ActivityItem[] = [];
export const REMOVED_STATIC_ACTIVITY_IDS = new Set(REMOVED_STATIC_ACTIVITIES.map((activity) => activity.id));

interface Props {
  content: Record<string, any>;
  onOpenQuoteModal: () => void;
}

export const TrainingActivityGallery: React.FC<Props> = ({ content, onOpenQuoteModal }) => {
  const { language } = useLanguage();
  const text = (key: string, english: string) => content[key] ?? (language === 'en' ? english : '');
  const activities: ActivityItem[] = Array.isArray(content.activities)
    ? content.activities.filter((activity: ActivityItem) => !REMOVED_STATIC_ACTIVITY_IDS.has(activity.id))
    : [];
  const [activeTab, setActiveTab] = useState<'all' | 'workshop' | 'video' | 'negotiation' | 'graduation'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  // Lightbox Modal state
  const [activeLightboxItem, setActiveLightboxItem] = useState<ActivityItem | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Video Modal state & ref
  const [selectedVideo, setSelectedVideo] = useState<ActivityItem | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mediaSlideIndex, setMediaSlideIndex] = useState(0);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const jumpToTime = (seconds: number) => {
    setMediaSlideIndex(0);
    setIsVideoPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = seconds;
        videoRef.current.play();
      }
    }, 100);
  };

  // Keyboard shortcut listener (Escape to close, Left/Right arrows to cycle photos)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
        setActiveLightboxItem(null);
        setIsVideoPlaying(false);
      }
      if (activeLightboxItem) {
        if (e.key === 'ArrowRight') {
          setCurrentPhotoIndex((prev) => (prev + 1) % activeLightboxItem.galleryImages.length);
        }
        if (e.key === 'ArrowLeft') {
          setCurrentPhotoIndex((prev) => (prev - 1 + activeLightboxItem.galleryImages.length) % activeLightboxItem.galleryImages.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem]);

  // Filtered dataset
  const filteredActivities = useMemo(() => {
    return activities.filter((item) => activeTab === 'all' ? true : item.category === activeTab);
  }, [activeTab, activities]);

  // Paginated dataset
  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / ITEMS_PER_PAGE));
  const paginatedActivities = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredActivities.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredActivities, currentPage]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as any);
    setCurrentPage(1);
  };

  // Handle opening image gallery lightbox
  const openImageGallery = (item: ActivityItem, startIndex = 0) => {
    const images = Array.from(new Set([item.mediaUrl, ...item.galleryImages].filter(isMediaUrl)));
    setActiveLightboxItem({ ...item, galleryImages: images });
    setCurrentPhotoIndex(Math.min(startIndex, Math.max(0, images.length - 1)));
  };

  const openActivityViewer = (item: ActivityItem) => {
    if (item.type === 'video' || item.videoUrl) {
      setMediaSlideIndex(0);
      setSelectedVideo(item);
      setIsVideoPlaying(Boolean(item.videoUrl));
    } else {
      openImageGallery(item, 0);
    }
  };

  // Next / Prev photo in lightbox
  const nextPhoto = () => {
    if (!activeLightboxItem) return;
    setCurrentPhotoIndex((prev) => (prev + 1) % activeLightboxItem.galleryImages.length);
  };

  const prevPhoto = () => {
    if (!activeLightboxItem) return;
    setCurrentPhotoIndex((prev) => (prev - 1 + activeLightboxItem.galleryImages.length) % activeLightboxItem.galleryImages.length);
  };

  useEffect(() => {
    if (selectedVideo || activeLightboxItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideo, activeLightboxItem]);

  const selectedMediaImages = selectedVideo
    ? Array.from(new Set([selectedVideo.mediaUrl, ...selectedVideo.galleryImages].filter(isMediaUrl)))
    : [];
  const selectedMediaSlides = selectedVideo ? (selectedVideo.videoUrl ? 1 : 0) + selectedMediaImages.length : 0;

  return (
    <section className="relative py-12 text-slate-900 dark:text-slate-100">
      <ScrollReveal animation="up">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-10">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800/80 pb-8 text-left">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{content.gallery_badge ?? (language === 'en' ? 'Live Activity & Media Showcase' : '')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                <ScrollTextReveal text={content.gallery_heading ?? (language === 'en' ? 'See Our Sales Academy In Action' : 'មើលសកម្មភាពវគ្គបណ្តុះបណ្តាលរបស់យើង')} mode="codepen-title" />
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {content.gallery_sub ?? (language === 'en' ? 'Explore real workshop sessions, live negotiation video previews, hands-on roleplay labs, and corporate graduation ceremonies.' : '')}
              </p>
            </div>

            {/* Filter Tabs matching reference image */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-900/90 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0 shadow-sm">
              {[
                { id: 'all', label: text('gallery_tab_all', 'All Activities'), icon: Sparkles },
                { id: 'workshop', label: text('gallery_tab_workshops', 'Workshops'), icon: ImageIcon },
                { id: 'video', label: text('gallery_tab_videos', 'Video Previews'), icon: Video },
                { id: 'negotiation', label: text('gallery_tab_negotiation', 'Negotiation Labs'), icon: Users },
                { id: 'graduation', label: text('gallery_tab_graduation', 'Graduations'), icon: Award },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.03]'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Media Grid */}
          {filteredActivities.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No media items found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try switching filters to see more activity photos and videos.
              </p>
              <button
                onClick={() => handleTabChange('all')}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-6">
              {paginatedActivities.map((activity) => (
                <Card3D
                  key={activity.id}
                  intensity={12}
                  onClick={() => openActivityViewer(activity)}
                >
                  <article className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
                    {/* Media Thumbnail Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                      <img
                        src={activity.mediaUrl}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-md shadow-md">
                          {activity.badge ?? activity.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-white/90 font-medium text-[11px] flex items-center gap-1.5 backdrop-blur-md border border-white/10">
                          {activity.type === 'video' ? <Video className="w-3.5 h-3.5 text-emerald-400" /> : <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{activity.type === 'video' ? `Video (${activity.duration ?? 'HD'})` : `${activity.galleryImages.length} Photos`}</span>
                        </span>
                      </div>

                      {/* Action Overlay */}
                      {activity.type === 'video' ? (
                        <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300 border-2 border-white/30 z-10">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                      ) : (
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/80 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md border border-white/10 shadow-md z-10">
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>View Album</span>
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-2">
                        <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                          {activity.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-2">
                          {activity.description}
                        </p>
                      </div>

                      {/* Location & Date Meta Footer */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium truncate">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="truncate">{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                          <span>{activity.type === 'video' ? 'Play Video' : 'View Photos'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Card3D>
              ))}
            </div>
          )}

          {/* Pagination Bar */}
          {filteredActivities.length > 0 && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Showing <strong className="text-slate-900 dark:text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> to <strong className="text-slate-900 dark:text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredActivities.length)}</strong> of <strong className="text-slate-900 dark:text-white">{filteredActivities.length}</strong> activity media items
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5 px-1">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${currentPage === pageNum
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Quick CTA Banner for Corporate Sessions */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 border border-emerald-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="space-y-2 relative z-10 max-w-2xl">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase rounded-full tracking-wider">
                {text('gallery_cta_badge', 'Live Enterprise Enrollment')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {text('gallery_cta_heading', 'Want to Host This Interactive Workshop for Your Sales Team?')}
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
                {text('gallery_cta_desc', 'We deliver custom on-site activity bootcamps with simulated negotiation roleplay tailored to your company catalog.')}
              </p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="relative z-10 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-xs shadow-xl shadow-emerald-500/20 shrink-0 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>{text('gallery_cta_button', 'Schedule On-Site Workshop')}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </div>
      </ScrollReveal>

      {/* Video Masterclass Player Modal */}
      {selectedVideo && createPortal((
        <div
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedVideo(null);
              setIsVideoPlaying(false);
            }
          }}
        >
          <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-800/90 overflow-hidden shadow-2xl flex flex-col max-h-[85vh] my-auto">

            {/* Modal Header Bar */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>HD Masterclass</span>
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">• Duration: {selectedVideo.duration ?? '04:15'}</span>
                  </div>
                  <h4 className="text-sm font-display font-bold text-white leading-tight truncate max-w-md">
                    {selectedVideo.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 hidden md:inline font-mono">ESC to exit</span>
                <button
                  onClick={() => { setSelectedVideo(null); setIsVideoPlaying(false); }}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-md"
                  aria-label="Close video player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Combined video and image slide viewer */}
            <div className="relative aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden shrink max-h-[52vh]">
              {selectedVideo.videoUrl && mediaSlideIndex === 0 ? (
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  poster={selectedVideo.mediaUrl}
                >
                  Your browser does not support HTML5 video playback.
                </video>
              ) : (
                <img
                  src={selectedMediaImages[mediaSlideIndex - (selectedVideo.videoUrl ? 1 : 0)] ?? selectedVideo.mediaUrl}
                  alt={selectedVideo.title}
                  className="w-full h-full object-contain"
                />
              )}
              {selectedMediaSlides > 1 && (
                <>
                  <button type="button" onClick={() => setMediaSlideIndex((index) => (index - 1 + selectedMediaSlides) % selectedMediaSlides)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center border border-white/10" aria-label="Previous media"><ChevronLeft className="w-5 h-5" /></button>
                  <button type="button" onClick={() => setMediaSlideIndex((index) => (index + 1) % selectedMediaSlides)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center border border-white/10" aria-label="Next media"><ChevronRight className="w-5 h-5" /></button>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-bold">{mediaSlideIndex + 1} / {selectedMediaSlides}</span>
                </>
              )}
            </div>

            {selectedMediaSlides > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto px-4 py-2 bg-slate-950 border-t border-slate-800 scrollbar-none">
                {selectedVideo.videoUrl && (
                  <button type="button" onClick={() => setMediaSlideIndex(0)} className={`relative w-16 h-11 rounded-lg overflow-hidden shrink-0 border-2 ${mediaSlideIndex === 0 ? 'border-emerald-500' : 'border-slate-700 opacity-60'}`}>
                    <img src={selectedVideo.mediaUrl} alt="Video" className="w-full h-full object-cover" /><Play className="absolute inset-0 m-auto w-5 h-5 text-white fill-white" />
                  </button>
                )}
                {selectedMediaImages.map((image, index) => {
                  const slideIndex = index + (selectedVideo.videoUrl ? 1 : 0);
                  return <button type="button" key={`${image}-${index}`} onClick={() => setMediaSlideIndex(slideIndex)} className={`w-16 h-11 rounded-lg overflow-hidden shrink-0 border-2 ${mediaSlideIndex === slideIndex ? 'border-emerald-500' : 'border-slate-700 opacity-60'}`}><img src={image} alt="" className="w-full h-full object-cover" /></button>;
                })}
              </div>
            )}

            {/* Compact Details & Chapter Time Bookmarks Drawer (Fits on screen without scrollbar) */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800/80 space-y-3 shrink-0">

              {/* Time Bookmarks */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bookmarks:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { time: '00:00', label: 'Intro', seconds: 0 },
                    { time: '01:45', label: 'Objections', seconds: 105 },
                    { time: '03:30', label: 'Terms', seconds: 210 },
                    { time: '05:10', label: 'Closing', seconds: 310 },
                  ].map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => jumpToTime(ch.seconds)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-300 text-[11px] font-semibold border border-slate-800 flex items-center gap-1.5 transition-all"
                    >
                      <span className="text-emerald-400 font-mono font-bold bg-slate-950 px-1 py-0.5 rounded text-[9px]">
                        {ch.time}
                      </span>
                      <span>{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer CTA Bar */}
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-900 text-xs">
                <div className="text-slate-400 truncate max-w-sm">
                  Instructor: <strong className="text-slate-200">{selectedVideo.instructor ?? 'UNT Senior Trade Lead'}</strong>
                </div>

                <button
                  onClick={() => { setSelectedVideo(null); setIsVideoPlaying(false); onOpenQuoteModal(); }}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <span>Enroll Team in Masterclass</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      ), document.body)}

      {/* Multi-Photo Carousel Lightbox Modal */}
      {activeLightboxItem && createPortal((
        <div
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightboxImageNull();
            }
          }}
        >
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">

            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                  Photo {currentPhotoIndex + 1} of {activeLightboxItem.galleryImages.length}
                </span>
                <h4 className="text-sm sm:text-base font-display font-bold text-white truncate max-w-md">
                  {activeLightboxItem.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 hidden md:inline font-mono">Use ← → keys to navigate</span>
                <button
                  onClick={() => setLightboxImageNull()}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                  aria-label="Close image lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage Image Viewer with Prev / Next Navigation */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[480px]">
              <img
                src={activeLightboxItem.galleryImages[currentPhotoIndex]}
                alt={`${activeLightboxItem.title} - photo ${currentPhotoIndex + 1}`}
                className="max-h-[62vh] w-full object-contain transition-all duration-300 select-none"
              />

              {/* Prev / Next Arrows */}
              {activeLightboxItem.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-110 shadow-xl"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-110 shadow-xl"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip & Item Meta */}
            <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4 shrink-0">
              {/* Thumbnail Strip */}
              {activeLightboxItem.galleryImages.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {activeLightboxItem.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${currentPhotoIndex === idx
                          ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/30'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
                <div className="space-y-1">
                  <p className="text-slate-400 leading-normal max-w-2xl">{activeLightboxItem.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-emerald-400 font-medium pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {activeLightboxItem.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeLightboxItem.date}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {activeLightboxItem.participants}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setActiveLightboxItem(null); onOpenQuoteModal(); }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 shadow-lg"
                >
                  {text('gallery_album_book_cta', 'Book Workshop')}
                </button>
              </div>
            </div>

          </div>
        </div>
      ), document.body)}

    </section>
  );

  function setLightboxImageNull() {
    setActiveLightboxItem(null);
  }
};
