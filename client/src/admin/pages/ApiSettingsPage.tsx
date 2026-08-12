import React, { useEffect, useState } from 'react';
import { CheckCircle2, KeyRound, Loader, Save, Trash2 } from 'lucide-react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';

interface RemoveBackgroundStatus {
  configured: boolean;
  source: 'admin' | 'env' | null;
  updated_at: string | null;
}

const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong.';

export function ApiSettingsPage() {
  const { token } = useAdminAuth();
  const [status, setStatus] = useState<RemoveBackgroundStatus | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = () => {
    if (!token) return;
    setLoading(true);
    setError('');
    api.getRemoveBackgroundSettings(token)
      .then(setStatus)
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [token]);

  const save = async () => {
    if (!token || !apiKey.trim()) return;
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const next = await api.updateRemoveBackgroundSettings(apiKey.trim(), token);
      setStatus(next);
      setApiKey('');
      setMessage('Remove background API key updated.');
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const clear = async () => {
    if (!token || !confirm('Clear the admin remove background API key?')) return;
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const next = await api.clearRemoveBackgroundSettings(token);
      setStatus(next);
      setApiKey('');
      setMessage(next.configured ? 'Admin key cleared. Server env key is still active.' : 'Remove background API key cleared.');
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6 pb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">API Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Manage service keys used by admin tools.</p>
      </div>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
        <div className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-base">Remove Background API</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Used only when generating transparent product images from the Products admin page.</p>
          </div>
        </div>

        {loading ? (
          <div className="py-10 flex justify-center"><Loader className="w-5 h-5 text-emerald-500 animate-spin" /></div>
        ) : (
          <div className="space-y-5 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${status?.configured ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                {status?.configured ? `Configured from ${status.source === 'admin' ? 'admin settings' : 'server env'}` : 'Not configured'}
              </span>
              {status?.updated_at && <span className="text-xs text-slate-400">Updated {new Date(status.updated_at).toLocaleString()}</span>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="remove-bg-key" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">API Key</label>
              <input
                id="remove-bg-key"
                type="password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="Paste remove.bg API key"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Saved keys are not shown again after saving.</p>
            </div>

            {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 dark:text-red-400 text-sm">{error}</div>}
            {message && <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-300 text-sm">{message}</div>}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={save}
                disabled={saving || !apiKey.trim()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold transition-colors"
              >
                {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Key
              </button>
              <button
                type="button"
                onClick={clear}
                disabled={saving || status?.source !== 'admin'}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 text-slate-800 dark:text-white text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Admin Key
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
