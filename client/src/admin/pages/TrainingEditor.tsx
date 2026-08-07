import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';
import { ImageField } from '../components/ImageField';
import { useLanguage } from '../../i18n/LanguageContext';
import { TRAINING_TRACKS } from '../../data/mockData';
import type { TrainingTrack } from '../../types';
import { ACTIVITIES, type ActivityItem } from '../../pages/training/TrainingActivityGallery';
import { RECENT_ACTIVITIES, UPCOMING_SESSIONS } from '../../pages/training/TrainingPromosSchedule';
import { AlertCircle, Braces, CheckCircle2, Database, Pencil, Plus, Save, Trash2, X } from 'lucide-react';

const DEFAULTS = {
  badge: 'UNT Trade Capacity Building Institute',
  headline: 'Mastering the Art of Global Commerce',
  subheadline: "Elevate your commercial team's B2B negotiation skills, buyer psychology, key account retention, and international supply chain management.",
  stat1_value: '1,200+', stat1_label: 'Professionals Certified',
  stat2_value: '4.9 / 5.0', stat2_label: 'Average Course Rating',
  stat3_value: '15+', stat3_label: 'Senior Trade Instructors',
  stat4_value: '34%', stat4_label: 'Avg 90-Day Conversion Lift',
  tracks_badge: 'Curriculum',
  tracks_heading: 'Specialized B2B Commercial Tracks',
  tracks_sub: 'Select a track below to review full module syllabi, target audience criteria, and enrollment schedules.',
  tracks: TRAINING_TRACKS,
  schedule_live_label: 'Live Updates',
  schedule_badge: 'Interactive Schedule & Enrollment',
  schedule_heading: 'Upcoming Corporate Training Sessions',
  schedule_sub: 'Review available cohorts, seat capacity, schedules, and group corporate pricing.',
  upcoming_sessions: UPCOMING_SESSIONS,
  recent_activities: RECENT_ACTIVITIES,
  gallery_badge: 'Live Activity & Media Showcase',
  gallery_heading: 'See Our Sales Academy In Action',
  gallery_sub: 'Explore real workshop sessions, live negotiation video previews, hands-on roleplay labs, and corporate graduation ceremonies.',
  gallery_tab_all: 'All Activities',
  gallery_tab_workshops: 'Workshops',
  gallery_tab_videos: 'Video Previews',
  gallery_tab_negotiation: 'Negotiation Labs',
  gallery_tab_graduation: 'Graduations',
  gallery_view_gallery: 'View Gallery',
  gallery_watch_video: 'Watch Full Video',
  gallery_browse_album: 'Browse Album',
  gallery_cta_badge: 'Live Enterprise Enrollment',
  gallery_cta_heading: 'Want to Host This Interactive Workshop for Your Sales Team?',
  gallery_cta_desc: 'We deliver custom on-site activity bootcamps with simulated negotiation roleplay tailored to your company catalog.',
  gallery_cta_button: 'Schedule On-Site Workshop',
  gallery_video_enroll_cta: 'Enroll Team in This Masterclass',
  gallery_album_book_cta: 'Book Workshop',
  activities: ACTIVITIES,
  bootcamp_badge: 'In-House Corporate Solutions',
  bootcamp_heading: 'Need a Private Masterclass for Your Commercial Team?',
  bootcamp_desc: 'We deliver custom on-site workshops tailored to your industry, product catalog, and specific negotiation challenges directly at your Phnom Penh corporate headquarters.',
  bootcamp_cta: 'Book Corporate Session',
};

const TABS = ['Hero', 'Stats', 'Schedule', 'Gallery', 'Bootcamp'] as const;
type Tab = typeof TABS[number];

function restoreClientActivities(saved: unknown): ActivityItem[] {
  const savedActivities = Array.isArray(saved) ? saved : [];
  const customActivities = savedActivities.flatMap((value): ActivityItem[] => {
    if (!value || typeof value !== 'object') return [];
    const activity = value as Partial<ActivityItem>;
    const id = typeof activity.id === 'string' ? activity.id.trim() : '';
    const title = typeof activity.title === 'string' ? activity.title.trim() : '';
    const mediaUrl = typeof activity.mediaUrl === 'string' ? activity.mediaUrl.trim() : '';
    if (!id || !title || !mediaUrl) return [];
    return [{
      ...EMPTY_ACTIVITY,
      ...activity,
      id,
      title,
      mediaUrl,
      galleryImages: Array.isArray(activity.galleryImages) ? activity.galleryImages.filter((item): item is string => typeof item === 'string') : [],
      highlights: Array.isArray(activity.highlights) ? activity.highlights.filter((item): item is string => typeof item === 'string') : [],
    }];
  });

  return [
    ...customActivities,
  ];
}

function StructuredJsonField({ label, value, onChange, rows = 14 }: {
  label: string;
  value: unknown;
  onChange: (value: unknown) => void;
  rows?: number;
}) {
  const serialized = JSON.stringify(value ?? [], null, 2);
  const itemCount = Array.isArray(value) ? value.length : 0;
  const [draft, setDraft] = useState(serialized);
  const [jsonError, setJsonError] = useState('');

  useEffect(() => setDraft(serialized), [serialized]);

  const apply = () => {
    try {
      const parsed = JSON.parse(draft);
      if (!Array.isArray(parsed)) throw new Error('Value must be a JSON array.');
      onChange(parsed);
      setJsonError('');
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : 'Invalid JSON');
    }
  };

  return (
    <div className={`overflow-hidden rounded-2xl border ${jsonError ? 'border-red-400/70' : 'border-slate-200 dark:border-slate-700'} bg-slate-50 dark:bg-slate-950/70`}>
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Braces className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{label}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Edit the structured dataset, then apply it.</div>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-[11px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className="p-3 sm:p-4 space-y-3">
        <textarea
          aria-label={label}
          value={draft}
          rows={rows}
          spellCheck={false}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={apply}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070b12] px-4 py-3 font-mono text-xs leading-relaxed text-slate-900 dark:text-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 resize-y shadow-inner"
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className={`flex items-center gap-1.5 text-xs ${jsonError ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {jsonError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {jsonError || 'JSON is valid and ready to save.'}
          </span>
          <button type="button" onClick={apply} className="btn-shine inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20">
            <Database className="w-4 h-4" /> Apply Dataset
          </button>
        </div>
      </div>
    </div>
  );
}

const EMPTY_ACTIVITY: ActivityItem = {
  id: '', title: '', category: 'workshop', type: 'image', mediaUrl: '', galleryImages: [],
  location: '', date: '', participants: '', description: '', highlights: [], badge: '',
};

function ActivityManager({ value, onChange }: {
  value: ActivityItem[];
  onChange: (value: ActivityItem[]) => void;
}) {
  const activities = Array.isArray(value) ? value : [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<ActivityItem>(EMPTY_ACTIVITY);
  const setDraftField = <Key extends keyof ActivityItem>(key: Key, fieldValue: ActivityItem[Key]) =>
    setDraft((current) => ({ ...current, [key]: fieldValue }));
  const setMediaField = (key: 'mediaUrl' | 'videoUrl', url: string) => {
    const updated = { ...draft, [key]: url };
    setDraft(updated);
    // Existing activities are immediately placed in the Supabase-bound page
    // state after an ImageKit upload. New activities still require a title and
    // the explicit Upsert button before they become public.
    if (editingIndex !== null) {
      onChange(activities.map((activity, index) => index === editingIndex ? updated : activity));
    }
  };

  const beginAdd = () => {
    setDraft({ ...EMPTY_ACTIVITY, id: `activity-${Date.now()}` });
    setEditingIndex(null);
    setAdding(true);
  };
  const beginEdit = (index: number) => {
    setDraft({ ...activities[index], galleryImages: [...activities[index].galleryImages], highlights: [...activities[index].highlights] });
    setEditingIndex(index);
    setAdding(false);
  };
  const cancel = () => {
    setEditingIndex(null);
    setAdding(false);
  };
  const saveActivity = () => {
    if (!draft.title.trim() || !draft.mediaUrl.trim()) return;
    if (editingIndex === null) onChange([...activities, draft]);
    else onChange(activities.map((activity, index) => index === editingIndex ? draft : activity));
    cancel();
  };
  const removeActivity = (index: number) => {
    if (!window.confirm(`Delete “${activities[index].title}”?`)) return;
    onChange(activities.filter((_, itemIndex) => itemIndex !== index));
    cancel();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">Activity & Video Library</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activities.length} client activities loaded. Add, edit, or remove items below.</p>
        </div>
        <button type="button" onClick={beginAdd} className="btn-shine inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md">
          <Plus className="w-4 h-4" /> Add Activity
        </button>
      </div>

      {(adding || editingIndex !== null) && (
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/15 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">{adding ? 'New Activity' : 'Edit Activity'}</h4>
            <button type="button" onClick={cancel} className="p-2 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Field label="Title" value={draft.title} onChange={(v) => setDraftField('title', v)} />
            <Field label="Badge" value={draft.badge ?? ''} onChange={(v) => setDraftField('badge', v)} />
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Category</label>
              <select value={draft.category} onChange={(e) => setDraftField('category', e.target.value as ActivityItem['category'])} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm">
                <option value="workshop">Workshop</option><option value="video">Video Preview</option><option value="negotiation">Negotiation Lab</option><option value="graduation">Graduation</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Media Type</label>
              <select value={draft.type} onChange={(e) => setDraftField('type', e.target.value as ActivityItem['type'])} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm">
                <option value="image">Image Gallery</option><option value="video">Video</option>
              </select>
            </div>
            <ImageField label="Main Image / Thumbnail" value={draft.mediaUrl} onChange={(v) => setMediaField('mediaUrl', v)} folder="training/thumbnails" />
            <ImageField label="Video (optional)" value={draft.videoUrl ?? ''} onChange={(v) => setMediaField('videoUrl', v)} accept="video/*" folder="training/videos" previewType="video" />
            <Field label="Location" value={draft.location} onChange={(v) => setDraftField('location', v)} />
            <Field label="Date" value={draft.date} onChange={(v) => setDraftField('date', v)} />
            <Field label="Participants" value={draft.participants} onChange={(v) => setDraftField('participants', v)} />
            <Field label="Instructor (optional)" value={draft.instructor ?? ''} onChange={(v) => setDraftField('instructor', v)} />
            <Field label="Duration (optional)" value={draft.duration ?? ''} onChange={(v) => setDraftField('duration', v)} />
            <Field label="Highlights (comma separated)" value={draft.highlights.join(', ')} onChange={(v) => setDraftField('highlights', v.split(',').map((item) => item.trim()).filter(Boolean))} />
          </div>
          <Field label="Description" value={draft.description} onChange={(v) => setDraftField('description', v)} multiline rows={4} />
          <Field label="Gallery Image URLs (one per line)" value={draft.galleryImages.join('\n')} onChange={(v) => setDraftField('galleryImages', v.split('\n').map((item) => item.trim()).filter(Boolean))} multiline rows={5} />
          <div className="flex items-center gap-3">
            <button type="button" onClick={saveActivity} disabled={!draft.title.trim() || !draft.mediaUrl.trim()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold"><Save className="w-4 h-4" /> Upsert Activity</button>
            <button type="button" onClick={cancel} className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {activities.map((activity, index) => (
          <article key={activity.id || index} className={`flex gap-4 rounded-2xl border p-4 bg-white dark:bg-slate-900 ${editingIndex === index ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-slate-200 dark:border-slate-800'}`}>
            <img src={activity.mediaUrl} alt="" className="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0"><h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{activity.title}</h4><p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 capitalize">{activity.category} · {activity.type}</p></div>
                <div className="flex gap-1 shrink-0">
                  <button type="button" onClick={() => beginEdit(index)} className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-white/10" aria-label={`Edit ${activity.title}`}><Pencil className="w-4 h-4" /></button>
                  <button type="button" onClick={() => removeActivity(index)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/10" aria-label={`Delete ${activity.title}`}><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">{activity.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

const EMPTY_TRACK: TrainingTrack = {
  id: '', title: '', tagline: '', duration: '', level: '', icon: 'target', description: '',
  targetAudience: '', keyTakeaways: [], curriculum: [],
};

function TrackManager({ value, onChange }: { value: TrainingTrack[]; onChange: (value: TrainingTrack[]) => void }) {
  const tracks = Array.isArray(value) ? value : [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<TrainingTrack>(EMPTY_TRACK);
  const setTrackField = <Key extends keyof TrainingTrack>(key: Key, fieldValue: TrainingTrack[Key]) =>
    setDraft((current) => ({ ...current, [key]: fieldValue }));
  const beginAdd = () => {
    setDraft({ ...EMPTY_TRACK, id: `track-${Date.now()}` });
    setEditingIndex(null);
    setAdding(true);
  };
  const beginEdit = (index: number) => {
    const track = tracks[index];
    setDraft({
      ...track,
      keyTakeaways: [...track.keyTakeaways],
      curriculum: track.curriculum.map((module) => ({ ...module, topics: [...module.topics] })),
    });
    setEditingIndex(index);
    setAdding(false);
  };
  const cancel = () => { setEditingIndex(null); setAdding(false); };
  const saveTrack = () => {
    if (!draft.title.trim()) return;
    onChange(editingIndex === null
      ? [...tracks, draft]
      : tracks.map((track, index) => index === editingIndex ? draft : track));
    cancel();
  };
  const removeTrack = (index: number) => {
    if (!window.confirm(`Delete “${tracks[index].title}”?`)) return;
    onChange(tracks.filter((_, itemIndex) => itemIndex !== index));
    cancel();
  };
  const updateModule = (index: number, changes: Partial<TrainingTrack['curriculum'][number]>) =>
    setDraft((current) => ({ ...current, curriculum: current.curriculum.map((module, moduleIndex) => moduleIndex === index ? { ...module, ...changes } : module) }));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div><h3 className="text-base font-black text-slate-900 dark:text-white">Training Tracks & Syllabi</h3><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tracks.length} tracks loaded from the client catalog.</p></div>
        <button type="button" onClick={beginAdd} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"><Plus className="w-4 h-4" /> Add Track</button>
      </div>

      {(adding || editingIndex !== null) && (
        <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/15 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between"><h4 className="font-bold text-slate-900 dark:text-white">{adding ? 'New Training Track' : 'Edit Training Track'}</h4><button type="button" onClick={cancel} className="p-2 text-slate-400"><X className="w-4 h-4" /></button></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Field label="Track Title" value={draft.title} onChange={(v) => setTrackField('title', v)} />
            <Field label="Tagline" value={draft.tagline} onChange={(v) => setTrackField('tagline', v)} />
            <Field label="Duration" value={draft.duration} onChange={(v) => setTrackField('duration', v)} />
            <Field label="Level" value={draft.level} onChange={(v) => setTrackField('level', v)} />
            <Field label="Icon Name" value={draft.icon} onChange={(v) => setTrackField('icon', v)} />
            <Field label="Target Audience" value={draft.targetAudience} onChange={(v) => setTrackField('targetAudience', v)} />
          </div>
          <Field label="Description" value={draft.description} onChange={(v) => setTrackField('description', v)} multiline rows={4} />
          <Field label="Key Takeaways (one per line)" value={draft.keyTakeaways.join('\n')} onChange={(v) => setTrackField('keyTakeaways', v.split('\n').map((item) => item.trim()).filter(Boolean))} multiline rows={5} />
          <div className="space-y-3">
            <div className="flex items-center justify-between"><SectionDivider label="Curriculum Modules" /><button type="button" onClick={() => setTrackField('curriculum', [...draft.curriculum, { module: 'New Module', topics: [] }])} className="ml-3 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold whitespace-nowrap"><Plus className="inline w-3.5 h-3.5 mr-1" />Module</button></div>
            {draft.curriculum.map((module, index) => (
              <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 space-y-3">
                <div className="flex items-start gap-3"><div className="flex-1"><Field label={`Module ${index + 1} Title`} value={module.module} onChange={(v) => updateModule(index, { module: v })} /></div><button type="button" onClick={() => setTrackField('curriculum', draft.curriculum.filter((_, moduleIndex) => moduleIndex !== index))} className="mt-6 p-2 text-red-500"><Trash2 className="w-4 h-4" /></button></div>
                <Field label="Topics (one per line)" value={module.topics.join('\n')} onChange={(v) => updateModule(index, { topics: v.split('\n').map((item) => item.trim()).filter(Boolean) })} multiline rows={4} />
              </div>
            ))}
          </div>
          <div className="flex gap-3"><button type="button" onClick={saveTrack} disabled={!draft.title.trim()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold"><Save className="w-4 h-4" /> Upsert Track</button><button type="button" onClick={cancel} className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">Cancel</button></div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {tracks.map((track, index) => (
          <article key={track.id || index} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-start justify-between gap-4">
            <div className="min-w-0"><h4 className="font-bold text-sm text-slate-900 dark:text-white">{track.title}</h4><p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{track.duration} · {track.level}</p><p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">{track.description}</p></div>
            <div className="flex gap-1 shrink-0"><button type="button" onClick={() => beginEdit(index)} className="p-2 text-slate-400 hover:text-emerald-600"><Pencil className="w-4 h-4" /></button><button type="button" onClick={() => removeTrack(index)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TrainingEditor() {
  const { token } = useAdminAuth();
  const { language } = useLanguage();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Hero');
  const [loading, setLoading] = useState(true);
  const [galleryRestoreMessage, setGalleryRestoreMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    api.getHomepageSection('training_page')
      .then((r) => {
        if (r.data) {
          if (language === 'en') {
            setData({
              ...DEFAULTS,
              ...r.data,
              activities: restoreClientActivities(r.data.activities),
            });
          } else {
            setData({ ...r.data, activities: restoreClientActivities(r.data.activities) });
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [language]);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    await api.updateHomepageSection('training_page', data, token);
  };

  const restoreOriginalGallery = () => {
    const shouldRestore = window.confirm(
      'Restore the original English Gallery text and activities? Activities you added yourself will also be kept.'
    );
    if (!shouldRestore) return;
    setData((current: any) => ({
      ...current,
      gallery_badge: DEFAULTS.gallery_badge,
      gallery_heading: DEFAULTS.gallery_heading,
      gallery_sub: DEFAULTS.gallery_sub,
      gallery_tab_all: DEFAULTS.gallery_tab_all,
      gallery_tab_workshops: DEFAULTS.gallery_tab_workshops,
      gallery_tab_videos: DEFAULTS.gallery_tab_videos,
      gallery_tab_negotiation: DEFAULTS.gallery_tab_negotiation,
      gallery_tab_graduation: DEFAULTS.gallery_tab_graduation,
      gallery_view_gallery: DEFAULTS.gallery_view_gallery,
      gallery_watch_video: DEFAULTS.gallery_watch_video,
      gallery_browse_album: DEFAULTS.gallery_browse_album,
      gallery_video_enroll_cta: DEFAULTS.gallery_video_enroll_cta,
      gallery_album_book_cta: DEFAULTS.gallery_album_book_cta,
      gallery_cta_badge: DEFAULTS.gallery_cta_badge,
      gallery_cta_heading: DEFAULTS.gallery_cta_heading,
      gallery_cta_desc: DEFAULTS.gallery_cta_desc,
      gallery_cta_button: DEFAULTS.gallery_cta_button,
      activities: restoreClientActivities(current.activities),
    }));
    setGalleryRestoreMessage(
      'Original Gallery text and activities restored locally. Click Save Changes to store this in Supabase.'
    );
  };

  return (
    <EditorShell
      title="Sales Training Page"
      description="Edit content shown on the Sales Training page, then click Save Changes when you are ready."
      saving={false} saved={false} error="" onSave={handleSave}
      loading={loading}
      tabs={[...TABS]} activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Hero' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Page Header Copy" />
              <Field label="Badge Text (Top Label)" value={data.badge ?? ''} onChange={set('badge')} />
              <Field label="Main Headline" value={data.headline ?? ''} onChange={set('headline')} multiline rows={2} />
              <Field label="Subheadline Paragraph" value={data.subheadline ?? ''} onChange={set('subheadline')} multiline rows={5} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4 h-full flex flex-col">
              <SectionDivider label="Live Preview" />
              <div className="flex-1 min-h-72 bg-slate-950 rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-slate-800 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/50 via-slate-950 to-slate-950 pointer-events-none" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <span className="inline-block px-3 py-1 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                    {data.badge || 'Badge Text'}
                  </span>
                  <h2 className="text-3xl font-display font-black text-white tracking-tight leading-tight">
                    {data.headline || 'Main Headline'}
                  </h2>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    {data.subheadline || 'Subheadline text will appear here...'}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
                Preview of the hero header on the public Sales Training page
              </p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <Card key={n}>
              <div className="space-y-3">
                <SectionDivider label={`Stat ${n}`} />
                <Field label="Value" value={data[`stat${n}_value`]} onChange={set(`stat${n}_value`)} />
                <Field label="Label" value={data[`stat${n}_label`]} onChange={set(`stat${n}_label`)} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'Schedule' && (
        <div className="space-y-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Schedule Section" />
              <Field label="Live Updates Label" value={data.schedule_live_label ?? ''} onChange={set('schedule_live_label')} />
              <Field label="Badge" value={data.schedule_badge ?? ''} onChange={set('schedule_badge')} />
              <Field label="Heading" value={data.schedule_heading ?? ''} onChange={set('schedule_heading')} multiline />
              <Field label="Subtext" value={data.schedule_sub ?? ''} onChange={set('schedule_sub')} multiline />
            </div>
          </Card>
          <Card><StructuredJsonField label="Upcoming Sessions" value={data.upcoming_sessions} onChange={(upcoming_sessions) => setData((current: any) => ({ ...current, upcoming_sessions }))} rows={20} /></Card>
          <Card><StructuredJsonField label="Live Update Messages" value={data.recent_activities} onChange={(recent_activities) => setData((current: any) => ({ ...current, recent_activities }))} rows={8} /></Card>
        </div>
      )}

      {activeTab === 'Gallery' && (
        <div className="space-y-6">
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <SectionDivider label="Activity Gallery" />
                {language === 'en' && (
                  <button
                    type="button"
                    onClick={restoreOriginalGallery}
                    className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-500/10 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs font-bold border border-slate-200 dark:border-slate-700"
                  >
                    <Database className="w-4 h-4" /> Restore Gallery Text
                  </button>
                )}
              </div>
              <Field label="Badge" value={data.gallery_badge ?? ''} onChange={set('gallery_badge')} />
              <Field label="Heading" value={data.gallery_heading ?? ''} onChange={set('gallery_heading')} multiline />
              <Field label="Subtext" value={data.gallery_sub ?? ''} onChange={set('gallery_sub')} multiline />
              <SectionDivider label="Gallery Filters" />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                <Field label="All" value={data.gallery_tab_all ?? ''} onChange={set('gallery_tab_all')} />
                <Field label="Workshops" value={data.gallery_tab_workshops ?? ''} onChange={set('gallery_tab_workshops')} />
                <Field label="Videos" value={data.gallery_tab_videos ?? ''} onChange={set('gallery_tab_videos')} />
                <Field label="Negotiation" value={data.gallery_tab_negotiation ?? ''} onChange={set('gallery_tab_negotiation')} />
                <Field label="Graduation" value={data.gallery_tab_graduation ?? ''} onChange={set('gallery_tab_graduation')} />
              </div>
              <SectionDivider label="Media Actions" />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                <Field label="View Gallery" value={data.gallery_view_gallery ?? ''} onChange={set('gallery_view_gallery')} />
                <Field label="Watch Video" value={data.gallery_watch_video ?? ''} onChange={set('gallery_watch_video')} />
                <Field label="Browse Album" value={data.gallery_browse_album ?? ''} onChange={set('gallery_browse_album')} />
                <Field label="Video Enrollment" value={data.gallery_video_enroll_cta ?? ''} onChange={set('gallery_video_enroll_cta')} />
                <Field label="Book Workshop" value={data.gallery_album_book_cta ?? ''} onChange={set('gallery_album_book_cta')} />
              </div>
              <SectionDivider label="Enrollment Banner" />
              <Field label="Banner Badge" value={data.gallery_cta_badge ?? ''} onChange={set('gallery_cta_badge')} />
              <Field label="Banner Heading" value={data.gallery_cta_heading ?? ''} onChange={set('gallery_cta_heading')} multiline />
              <Field label="Banner Description" value={data.gallery_cta_desc ?? ''} onChange={set('gallery_cta_desc')} multiline rows={3} />
              <Field label="Banner Button" value={data.gallery_cta_button ?? ''} onChange={set('gallery_cta_button')} />
            </div>
          </Card>
          <Card>
            {galleryRestoreMessage && (
              <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-4 py-3 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{galleryRestoreMessage}</span>
              </div>
            )}
            <div className="mb-4 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 px-4 py-3 text-xs text-sky-700 dark:text-sky-300">
              Gallery activities are saved in Supabase. Original gallery media and activities uploaded through ImageKit are kept together. Use <strong>Restore Gallery Text</strong> to reset the English labels without deleting your added activities.
            </div>
            <ActivityManager value={data.activities ?? []} onChange={(activities) => setData((current: any) => ({ ...current, activities }))} />
          </Card>
        </div>
      )}

      {activeTab === 'Bootcamp' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <SectionDivider label="Corporate Bootcamp Copy" />
              <Field label="Badge Text (Top Label)" value={data.bootcamp_badge ?? ''} onChange={set('bootcamp_badge')} />
              <Field label="Main Heading" value={data.bootcamp_heading ?? ''} onChange={set('bootcamp_heading')} multiline rows={2} />
              <Field label="Description Paragraph" value={data.bootcamp_desc ?? ''} onChange={set('bootcamp_desc')} multiline rows={5} />
              <Field label="CTA Button Text" value={data.bootcamp_cta ?? ''} onChange={set('bootcamp_cta')} />
            </div>
          </Card>
          <Card>
            <div className="space-y-4 h-full flex flex-col">
              <SectionDivider label="Live Preview" />
              <div className="flex-1 min-h-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner p-7 flex items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-slate-950 to-cyan-950/70 pointer-events-none" />
                <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
                <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left">
                  <div className="space-y-3 max-w-md">
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase">
                      {data.bootcamp_badge || 'Badge Text'}
                    </span>
                    <h2 className="text-2xl font-display font-bold text-white leading-tight">
                      {data.bootcamp_heading || 'Main Heading'}
                    </h2>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {data.bootcamp_desc || 'Description text will appear here...'}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold shrink-0">
                    {data.bootcamp_cta || 'CTA Button'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
                Preview of the corporate bootcamp banner on the public Sales Training page
              </p>
            </div>
          </Card>
        </div>
      )}
    </EditorShell>
  );
}
