import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Plus, Pencil, Trash2, X, Save, Loader } from 'lucide-react';
import { Field } from '../components/EditorShell';

const EMPTY = { name: '', category: '', country: '', logo_text: '' };

const partnerDraft = (partner: any) => ({
  name: partner.name ?? '',
  category: partner.category ?? '',
  country: partner.country ?? '',
  logo_text: partner.logo_text ?? '',
});

function PartnerForm({ initial, onSave, onCancel, saving }: {
  initial: any; onSave: (data: any) => void; onCancel: () => void; saving: boolean;
}) {
  const [form, setForm] = useState(() => partnerDraft(initial));
  const set = (key: string, val: string) => setForm((f: any) => ({ ...f, [key]: val }));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm">
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          {initial.id ? 'Edit Partner' : 'Add Partner'}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Complete the partner details below, then save your changes.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Field label="Partner Name" value={form.name} onChange={(v) => set('name', v)} />
        <Field label="Logo Display Text" value={form.logo_text} onChange={(v) => set('logo_text', v)} />
        <Field label="Category" value={form.category} onChange={(v) => set('category', v)} />
        <Field label="Country" value={form.country} onChange={(v) => set('country', v)} />
      </div>
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => onSave(form)} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold transition-colors">
          <Save className="w-4 h-4" /><span>{saving ? 'Saving...' : 'Save Partner'}</span>
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-sm font-medium transition-colors">
          <X className="w-4 h-4" /><span>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export function PartnersManager() {
  const { token } = useAdminAuth();
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const editingPartner = partners.find((partner) => partner.id === editingId);

  const load = () => {
    setLoading(true);
    api.getPartners().then(setPartners).catch(() => setError('Failed to load partners.')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async (data: any) => {
    if (!token) return;
    setSaving(true);
    try { await api.createPartner(data, token); setAdding(false); load(); }
    catch (e: any) { setError(e.message); } finally { setSaving(false); }
  };

  const handleUpdate = async (id: string, data: any) => {
    if (!token) return;
    setSaving(true);
    try { await api.updatePartner(id, data, token); setEditingId(null); load(); }
    catch (e: any) { setError(e.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Delete this partner?')) return;
    try { await api.deletePartner(id, token); load(); }
    catch (e: any) { setError(e.message); }
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Partners</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{partners.length} partners listed</p>
        </div>
        <button
          onClick={() => { setError(''); setAdding(true); setEditingId(null); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Partner</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>}

      {adding && <PartnerForm initial={EMPTY} onSave={handleCreate} onCancel={() => setAdding(false)} saving={saving} />}

      {editingPartner && (
        <PartnerForm
          key={editingPartner.id}
          initial={editingPartner}
          onSave={(data) => handleUpdate(editingPartner.id, data)}
          onCancel={() => setEditingId(null)}
          saving={saving}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader className="w-6 h-6 text-emerald-500 animate-spin" /></div>
      ) : partners.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">No partners yet. Click "Add Partner" to get started.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {partners.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <div className={`flex items-center gap-3 p-4 ${editingId === p.id ? 'ring-2 ring-inset ring-emerald-500/70' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      : <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 text-center leading-tight px-1">{p.logo_text}</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-900 dark:text-white font-semibold text-sm truncate">{p.name}</div>
                    <div className="text-slate-500 dark:text-slate-500 text-xs mt-0.5 truncate">{p.category} · {p.country}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => { setError(''); setEditingId(p.id); setAdding(false); }} className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
