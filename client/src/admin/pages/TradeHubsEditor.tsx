import React, { useEffect, useRef, useState } from 'react';
import { Upload, Loader, Trash2, Plus, GripVertical } from 'lucide-react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { EditorShell, Field, Card, SectionDivider } from '../components/EditorShell';
import { TRADE_HUBS, TradeHub } from '../../components/ThreeBackground';
import { supabase } from '../../supabaseClient';

function FlagUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!supabase) return;
    setUploading(true); setError('');
    try {
      const ext = file.name.split('.').pop();
      const path = `flags/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('uploads').upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('uploads').getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e: any) { setError(e.message ?? 'Upload failed'); }
    finally { setUploading(false); }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="relative w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors group"
      >
        {value ? (
          <>
            <img src={value} alt="flag" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Upload className="w-4 h-4 text-white" />
            </div>
          </>
        ) : uploading ? (
          <Loader className="w-5 h-5 text-emerald-500 animate-spin" />
        ) : (
          <Upload className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
        )}
      </div>
      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium text-center leading-tight">
        {uploading ? 'Uploading...' : 'Flag Image'}
      </span>
      {error && <span className="text-[10px] text-red-500">{error}</span>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}

export function TradeHubsEditor() {
  const { token } = useAdminAuth();
  const [hubs, setHubs] = useState<TradeHub[]>(TRADE_HUBS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHomepageSection('trade_hubs')
      .then((r) => { if (r?.data?.hubs) setHubs(r.data.hubs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!token) return;
    setSaving(true); setError('');
    try {
      await api.updateHomepageSection('trade_hubs', { hubs }, token);
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  const update = (idx: number, key: keyof TradeHub) => (v: string) =>
    setHubs((prev) => prev.map((h, i) => i === idx ? { ...h, [key]: v } : h));

  const addHub = () =>
    setHubs((prev) => [...prev, {
      id: `hub_${Date.now()}`, name: '', flag: '', flagUrl: '',
      lat: 0, lon: 0, leadTime: '', categories: '', moq: '', type: 'factory',
    }]);

  const removeHub = (idx: number) =>
    setHubs((prev) => prev.filter((_, i) => i !== idx));

  return (
    <EditorShell
      title="World Map Trade Hubs"
      description="Manage the countries shown on the 3D globe and their trade details."
      saving={saving} saved={saved} error={error} onSave={handleSave}
      loading={loading}
    >
      <div className="space-y-3">
        {hubs.map((hub, idx) => (
          <Card key={hub.id}>
            <div className="flex gap-4 items-start">

              {/* Left — flag upload + emoji */}
              <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
                <FlagUpload value={hub.flagUrl} onChange={update(idx, 'flagUrl')} />
                <input
                  value={hub.flag}
                  onChange={(e) => update(idx, 'flag')(e.target.value)}
                  placeholder="🇰🇷"
                  className="w-16 text-center text-xl bg-transparent border border-slate-200 dark:border-slate-700 rounded-xl py-1 focus:outline-none focus:border-emerald-500"
                  title="Flag emoji"
                />
              </div>

              {/* Right — all fields */}
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center justify-between">
                  <SectionDivider label={hub.name || `Hub ${idx + 1}`} />
                  <button
                    onClick={() => removeHub(idx)}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Field label="Country Name" value={hub.name} onChange={update(idx, 'name')} />
                  <Field label="Hub ID" value={hub.id} onChange={update(idx, 'id')} />
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Type</label>
                    <select
                      value={hub.type}
                      onChange={(e) => update(idx, 'type')(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="factory">Factory</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="port">Port</option>
                    </select>
                  </div>
                  <Field label="Latitude" value={String(hub.lat)} onChange={update(idx, 'lat') as any} />
                  <Field label="Longitude" value={String(hub.lon)} onChange={update(idx, 'lon') as any} />
                  <Field label="Lead Time" value={hub.leadTime} onChange={update(idx, 'leadTime')} />
                  <Field label="MOQ" value={hub.moq} onChange={update(idx, 'moq')} />
                  <div className="col-span-2 sm:col-span-2">
                    <Field label="Categories" value={hub.categories} onChange={update(idx, 'categories')} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <button
          onClick={addHub}
          className="w-full py-3 rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Trade Hub
        </button>
      </div>
    </EditorShell>
  );
}
