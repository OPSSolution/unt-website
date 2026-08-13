import React, { useEffect, useState } from 'react';
import { Field, Card, SectionDivider } from '@/src/admin/components/EditorShell';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { UPCOMING_SESSIONS, type UpcomingSession } from '@/src/pages/training/TrainingPromosSchedule';

export const EMPTY_SESSION: UpcomingSession = {
  id: '', title: '', badge: '', month: '', days: '', year: '', duration: '', time: '',
  location: '', format: 'In-Person', seatsLeft: 0, totalSeats: 25, instructor: '',
  promoCode: '', discount: '', pricePerParticipant: '',
};

export function SessionManager({
  value,
  onChange,
  onCommit,
}: {
  value: UpcomingSession[];
  onChange: (value: UpcomingSession[]) => void;
  onCommit: (value: UpcomingSession[]) => void;
}) {
  const sessions = Array.isArray(value) ? value : [];
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<UpcomingSession>(EMPTY_SESSION);
  const editing = editingIndex !== null;

  const setField = <Key extends keyof UpcomingSession>(key: Key, fieldValue: UpcomingSession[Key]) => {
    const updated = { ...draft, [key]: fieldValue };
    setDraft(updated);
    if (editingIndex !== null && editingIndex < sessions.length) {
      onChange(sessions.map((s, i) => (i === editingIndex ? updated : s)));
    }
  };

  const beginAdd = () => { setEditingIndex(sessions.length); setDraft({ ...EMPTY_SESSION, id: `session-${Date.now()}` }); };
  const beginEdit = (index: number) => { setEditingIndex(index); setDraft({ ...sessions[index] }); };
  const cancel = () => { setEditingIndex(null); setDraft(EMPTY_SESSION); };
  const upsert = () => {
    if (!draft.title.trim() || !draft.month.trim() || !draft.days.trim()) return;
    const updated = editingIndex === sessions.length
      ? [...sessions, draft]
      : sessions.map((s, i) => (i === editingIndex ? draft : s));
    onChange(updated);
    onCommit(updated);
    cancel();
  };
  const remove = (index: number) => {
    if (!confirm('Delete this training session?')) return;
    const updated = sessions.filter((_, i) => i !== index);
    onChange(updated);
    onCommit(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Upcoming Sessions</h3>
          <p className="text-xs text-slate-500 mt-1">Session changes are saved to Supabase immediately.</p>
        </div>
        <button type="button" onClick={beginAdd} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
          <Plus className="w-4 h-4" />Add Session
        </button>
      </div>

      {editing && (
        <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="sm:col-span-2 xl:col-span-3"><Field label="Session Title" value={draft.title} onChange={(v) => setField('title', v)} /></div>
            <Field label="Status Badge" value={draft.badge} onChange={(v) => setField('badge', v)} />
            <Field label="Month (AUG)" value={draft.month} onChange={(v) => setField('month', v.toUpperCase())} />
            <Field label="Days (24–26)" value={draft.days} onChange={(v) => setField('days', v)} />
            <Field label="Year" value={draft.year} onChange={(v) => setField('year', v)} />
            <Field label="Duration" value={draft.duration} onChange={(v) => setField('duration', v)} />
            <Field label="Time" value={draft.time} onChange={(v) => setField('time', v)} />
            <div className="sm:col-span-2"><Field label="Location" value={draft.location} onChange={(v) => setField('location', v)} /></div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Format</label>
              <select value={draft.format} onChange={(e) => setField('format', e.target.value as UpcomingSession['format'])} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm">
                <option>In-Person</option><option>Hybrid</option><option>Online</option>
              </select>
            </div>
            <Field label="Seats Left" value={String(draft.seatsLeft)} onChange={(v) => setField('seatsLeft', Number(v) || 0)} />
            <Field label="Total Seats" value={String(draft.totalSeats)} onChange={(v) => setField('totalSeats', Number(v) || 0)} />
            <Field label="Investment" value={draft.pricePerParticipant} onChange={(v) => setField('pricePerParticipant', v)} />
            <div className="sm:col-span-2"><Field label="Instructor" value={draft.instructor} onChange={(v) => setField('instructor', v)} /></div>
            <Field label="Promo Code" value={draft.promoCode ?? ''} onChange={(v) => setField('promoCode', v)} />
            <div className="sm:col-span-2"><Field label="Discount / Promotion" value={draft.discount ?? ''} onChange={(v) => setField('discount', v)} /></div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={upsert} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"><Save className="w-4 h-4" />Save Session</button>
            <button type="button" onClick={cancel} className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {sessions.map((session, index) => (
          <div key={session.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex gap-4 items-center">
            <div className="w-16 rounded-xl overflow-hidden text-center border border-emerald-200 dark:border-emerald-800 shrink-0">
              <div className="bg-emerald-600 text-white text-[10px] font-bold py-1">{session.month} {session.year}</div>
              <div className="py-2 font-black text-slate-900 dark:text-white">{session.days}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{session.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{session.format} · {session.seatsLeft}/{session.totalSeats} seats left · {session.pricePerParticipant}</p>
            </div>
            <div className="flex gap-1">
              <button type="button" onClick={() => beginEdit(index)} className="p-2 text-slate-400 hover:text-emerald-600"><Pencil className="w-4 h-4" /></button>
              <button type="button" onClick={() => remove(index)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
