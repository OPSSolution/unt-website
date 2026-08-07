import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Zap, Flame, Tag, Sparkles, LayoutList, LayoutGrid } from 'lucide-react';
import { ScrollReveal } from '../../components/ScrollReveal';
import { useLanguage } from '../../i18n/LanguageContext';

export interface UpcomingSession {
  id: string;
  title: string;
  badge: string;
  month: string;
  days: string;
  year: string;
  duration: string;
  time: string;
  location: string;
  format: 'In-Person' | 'Hybrid' | 'Online';
  seatsLeft: number;
  totalSeats: number;
  instructor: string;
  promoCode?: string;
  discount?: string;
  pricePerParticipant: string;
}

export const UPCOMING_SESSIONS: UpcomingSession[] = [
  {
    id: 'session-1',
    title: 'B2B Commercial Negotiation & Buyer Psychology Bootcamp',
    badge: 'Enrolling Now — Cohort 15',
    month: 'AUG',
    days: '24–26',
    year: '2026',
    duration: '3 Days Intensive',
    time: '08:30 AM – 04:30 PM (ICT)',
    location: 'UNT Trade Institute & Executive Lab, Phnom Penh',
    format: 'In-Person',
    seatsLeft: 4,
    totalSeats: 25,
    instructor: 'Oknha Sarin Chen & Senior Trade Instructors',
    promoCode: 'UNT20OFF',
    discount: '20% Corporate Group Discount (5+ seats)',
    pricePerParticipant: '$380 / participant'
  },
  {
    id: 'session-2',
    title: 'Cross-Border ASEAN Supply Chain & MoC Compliance Masterclass',
    badge: 'Upcoming Masterclass',
    month: 'SEP',
    days: '12–13',
    year: '2026',
    duration: '2 Days Executive',
    time: '09:00 AM – 05:00 PM (ICT)',
    location: 'Phnom Penh HQ Auditorium & Live HD Stream',
    format: 'Hybrid',
    seatsLeft: 9,
    totalSeats: 30,
    instructor: 'Dr. Heng Visal & Khmer Trade Experts',
    promoCode: 'EARLYBIRD',
    discount: 'Early Bird Rate Available until Aug 20',
    pricePerParticipant: '$290 / participant'
  }
];

export const RECENT_ACTIVITIES = [
  'Cohort 14 completed 3-day negotiation simulation in Phnom Penh (48 Certified)',
  'Meng Rithy Group enrolled 12 key account managers for Cohort 15',
  '1,200+ Commercial Professionals certified across ASEAN trade corridors',
  '34% Average 90-Day deal conversion lift reported by enterprise clients'
];

interface Props {
  content: Record<string, any>;
  onOpenQuoteModal: () => void;
}

export const TrainingPromosSchedule: React.FC<Props> = ({ content, onOpenQuoteModal }) => {
  const { language } = useLanguage();
  const sessions: UpcomingSession[] = Array.isArray(content.upcoming_sessions)
    ? content.upcoming_sessions.filter((session: UpcomingSession) => session.title?.trim())
    : language === 'en' ? UPCOMING_SESSIONS : [];
  const recentActivities: string[] = Array.isArray(content.recent_activities)
    ? content.recent_activities
    : language === 'en' ? RECENT_ACTIVITIES : [];
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [formatFilter, setFormatFilter] = useState<'all' | 'In-Person' | 'Hybrid'>('all');

  const filteredSessions = sessions.filter(s => 
    formatFilter === 'all' ? true : s.format === formatFilter
  );

  return (
    <section className="relative py-6 text-slate-900 dark:text-slate-100">
      <ScrollReveal animation="up">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-6">

          {/* Top Ticker Notification Banner */}
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-2.5 sm:p-3 text-slate-200 shadow-md flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-slate-950 rounded-xl text-xs font-black shrink-0 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>{content.schedule_live_label ?? (language === 'en' ? 'Live Updates' : '')}</span>
            </div>
            
            <div className="overflow-hidden relative w-full text-xs font-medium text-emerald-300">
              <div className="inline-flex gap-8 animate-marquee whitespace-nowrap">
                {recentActivities.concat(recentActivities).map((act, i) => (
                  <span key={i} className="inline-flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{act}</span>
                    <span className="text-slate-700">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section Header & Toolbar Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                {content.schedule_badge ?? (language === 'en' ? 'Interactive Schedule & Enrollment' : '')}
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                {content.schedule_heading ?? (language === 'en' ? 'Upcoming Corporate Training Sessions' : '')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                {content.schedule_sub ?? (language === 'en' ? 'Review available cohorts, seat capacity, schedules, and group corporate pricing.' : '')}
              </p>
            </div>

            {/* Controls: Filter & View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setFormatFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${formatFilter === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-white'}`}
                >
                  All Sessions
                </button>
                <button
                  onClick={() => setFormatFilter('In-Person')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${formatFilter === 'In-Person' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-white'}`}
                >
                  In-Person
                </button>
                <button
                  onClick={() => setFormatFilter('Hybrid')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${formatFilter === 'Hybrid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-white'}`}
                >
                  Hybrid
                </button>
              </div>

              {/* View Switcher Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${viewMode === 'table' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-white'}`}
                  title="List View"
                >
                  <LayoutList className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-lg font-bold flex items-center gap-1.5 transition-all ${viewMode === 'cards' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-white'}`}
                  title="Card View"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
              </div>
            </div>
          </div>

          {/* VIEW MODE 1: STRUCTURED EXECUTIVE AGENDA TABLE (Productive & Perfectly Fitted) */}
          {viewMode === 'table' ? (
            <div className="space-y-4">
              {filteredSessions.map((session) => {
                const reservedSeats = session.totalSeats - session.seatsLeft;
                const seatPercentage = Math.round((reservedSeats / session.totalSeats) * 100);

                return (
                  <div
                    key={session.id}
                    className="group rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    {/* Left: Perfectly Formatted Event Ticket Date Badge */}
                    <div className="flex items-center gap-5 shrink-0 w-full lg:w-auto">
                      <div className="w-28 min-h-[90px] rounded-2xl bg-emerald-50/80 dark:bg-slate-950 border border-emerald-300 dark:border-emerald-700/60 overflow-hidden shrink-0 flex flex-col justify-between text-center shadow-sm">
                        <div className="bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 text-[11px] font-black uppercase tracking-wider py-1 px-2">
                          {session.month} {session.year}
                        </div>
                        <div className="py-2 px-2 flex flex-col items-center justify-center flex-1">
                          <div className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white leading-tight">
                            {session.days}
                          </div>
                          <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                            {session.duration}
                          </div>
                        </div>
                      </div>

                      {/* Title & Metadata */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-300 text-[11px] font-bold">
                            {session.badge}
                          </span>
                          <span className="px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-bold flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 fill-amber-500" />
                            Only {session.seatsLeft} Seats Left
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {session.title}
                        </h3>

                        {/* Inline Metadata Bar */}
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-5 text-xs text-slate-600 dark:text-slate-300 font-medium pt-0.5">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            {session.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Right: Seat Progress & Promo */}
                    <div className="w-full lg:w-60 space-y-2 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800/80 pt-3 lg:pt-0 lg:pl-6">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500 dark:text-slate-400">Capacity</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{seatPercentage}% ({reservedSeats}/{session.totalSeats})</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${seatPercentage}%` }} />
                      </div>

                      {session.discount && (
                        <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                          <Tag className="w-3 h-3 text-emerald-500" />
                          <span>{session.discount}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Pricing & CTA Button */}
                    <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto shrink-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80 pt-3 lg:pt-0">
                      <div className="text-left lg:text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Investment</div>
                        <div className="text-lg font-display font-black text-emerald-600 dark:text-emerald-400">
                          {session.pricePerParticipant}
                        </div>
                      </div>

                      <button
                        onClick={onOpenQuoteModal}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 hover:scale-105 transition-all shrink-0"
                      >
                        <span>Reserve Seat</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW MODE 2: CLEAN MODERN CARDS GRID */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSessions.map((session) => {
                const reservedSeats = session.totalSeats - session.seatsLeft;
                const seatPercentage = Math.round((reservedSeats / session.totalSeats) * 100);

                return (
                  <div
                    key={session.id}
                    className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                          {session.badge}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 fill-amber-500" />
                          Only {session.seatsLeft} Seats Left
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {session.title}
                      </h3>

                      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span><strong className="text-slate-900 dark:text-white">Dates:</strong> {session.month} {session.days}, {session.year} ({session.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span><strong className="text-slate-900 dark:text-white">Time:</strong> {session.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span><strong className="text-slate-900 dark:text-white">Location:</strong> {session.location}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span>Capacity</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{seatPercentage}% Reserved ({reservedSeats}/{session.totalSeats})</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${seatPercentage}%` }} />
                        </div>
                      </div>

                      {session.discount && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
                          <span>{session.discount}</span>
                          <span className="font-mono font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">{session.promoCode}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Investment</div>
                        <div className="text-xl font-display font-black text-emerald-600 dark:text-emerald-400">
                          {session.pricePerParticipant}
                        </div>
                      </div>
                      <button
                        onClick={onOpenQuoteModal}
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 hover:scale-105 transition-all"
                      >
                        <span>Reserve Seats for Team</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </ScrollReveal>
    </section>
  );
};
