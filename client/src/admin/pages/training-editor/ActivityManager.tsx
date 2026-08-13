import React, { useState } from 'react';
import { Field } from '@/src/admin/components/EditorShell';
import { ImageField } from '@/src/admin/components/ImageField';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import type { ActivityItem } from '@/src/pages/training/activityTypes';

const EMPTY_ACTIVITY: ActivityItem = {
  id: '', title: '', category: 'workshop', type: 'image', mediaUrl: '',
  galleryImages: [], location: '', date: '', participants: '',
  description: '', highlights: [], badge: '',
};

export function ActivityManager({
  value,
  onChange,
  onCommit,
}: {
  value: ActivityItem[];
  onChange: (value: ActivityItem[]) => void;
  onCommit: (value: ActivityItem[]) => void;
}) {
  const activities = Array.isArray(value) ? value : [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<ActivityItem>(EMPTY_ACTIVITY);

  const setDraftField = <Key extends keyof ActivityItem>(key: Key, fieldValue: ActivityItem[Key]) =>
    setDraft((cur) => ({ ...cur, [key]: fieldValue }));

  const setMediaField = (key: 'mediaUrl' | 'videoUrl', url: string) => {
    const updated = { ...draft, [key]: url };
    setDraft(updated);
    if (editingIndex !== null) {
      onChange(activities.map((a, i) => (i === editingIndex ? updated : a)));
    }
  };

  const beginAdd = () => { setDraft({ ...EMPTY_ACTIVITY, id: `activity-${Date.now()}` }); setEditingIndex(null); setAdding(true); };
  const beginEdit = (index: number) => {
    setDraft({ ...activities[index], galleryImages: [...activities[index].galleryImages], highlights: [...activities[index].highlights] });
    setEditingIndex(index);
    setAdding(false);
  };
  const cancel = () => { setEditingIndex(null); setAdding(false); };
  const saveActivity = () => {
    if (!draft.title.trim() || !draft.mediaUrl.trim()) return;
    const updated = editingIndex === null
      ? [...activities, draft]
      : activities.map((a, i) => (i === editingIndex ? draft : a));
    onChange(updated);
    onCommit(updated);
    cancel();
  };
  const removeActivity = (index: number) => {
    if (!window.confirm(`Delete "${activities[index].title}"?`)) return;
    const updated = activities.filter((_, i) => i !== index);
    onChange(updated);
    onCommit(updated);
    cancel();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">Activity &amp; Video Library</h3>
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
                <option value="workshop">Workshop</option>
                <option value="video">Video Preview</option>
                <option value="negotiation">Negotiation Lab</option>
                <option value="graduation">Graduation</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Media Type</label>
              <select value={draft.type} onChange={(e) => setDraftField('type', e.target.value as ActivityItem['type'])} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm">
                <option value="image">Image Gallery</option>
                <option value="video">Video</option>
              </select>
            </div>
            <ImageField label="Main Image / Thumbnail" value={draft.mediaUrl} onChange={(v) => setMediaField('mediaUrl', v)} folder="training/thumbnails" />
            <ImageField label="Video (optional)" value={draft.videoUrl ?? ''} onChange={(v) => setMediaField('videoUrl', v)} accept="video/*" folder="training/videos" previewType="video" />
            <Field label="Location" value={draft.location} onChange={(v) => setDraftField('location', v)} />
            <Field label="Date" value={draft.date} onChange={(v) => setDraftField('date', v)} />
            <Field label="Participants" value={draft.participants} onChange={(v) => setDraftField('participants', v)} />
            <Field label="Instructor (optional)" value={draft.instructor ?? ''} onChange={(v) => setDraftField('instructor', v)} />
            <Field label="Duration (optional)" value={draft.duration ?? ''} onChange={(v) => setDraftField('duration', v)} />
            <Field label="Highlights (comma separated)" value={draft.highlights.join(', ')} onChange={(v) => setDraftField('highlights', v.split(',').map((i) => i.trim()).filter(Boolean))} />
          </div>
          <Field label="Description" value={draft.description} onChange={(v) => setDraftField('description', v)} multiline rows={4} />
          <Field label="Gallery Image URLs (one per line)" value={draft.galleryImages.join('\n')} onChange={(v) => setDraftField('galleryImages', v.split('\n').map((i) => i.trim()).filter(Boolean))} multiline rows={5} />
          <div className="flex items-center gap-3">
            <button type="button" onClick={saveActivity} disabled={!draft.title.trim() || !draft.mediaUrl.trim()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold">
              <Save className="w-4 h-4" /> Upsert Activity
            </button>
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
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{activity.title}</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 capitalize">{activity.category} · {activity.type}</p>
                </div>
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
