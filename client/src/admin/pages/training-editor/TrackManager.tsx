import React, { useState } from 'react';
import { Field, SectionDivider } from '@/src/admin/components/EditorShell';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import type { TrainingTrack } from '@/src/types';

const EMPTY_TRACK: TrainingTrack = {
  id: '', title: '', tagline: '', duration: '', level: '', icon: 'target', description: '',
  targetAudience: '', keyTakeaways: [], curriculum: [],
};

export function TrackManager({ value, onChange }: { value: TrainingTrack[]; onChange: (value: TrainingTrack[]) => void }) {
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
        <div><h3 className="text-base font-black text-slate-900 dark:text-white">Training Tracks &amp; Syllabi</h3><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tracks.length} tracks loaded from the client catalog.</p></div>
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
