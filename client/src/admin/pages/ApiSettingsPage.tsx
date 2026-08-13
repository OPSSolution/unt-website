import React, { useEffect, useState } from 'react';
import { CheckCircle2, KeyRound, Loader, Save, Trash2 } from 'lucide-react';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';

const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong.';

type ApiKeyStatus = { configured: boolean; source: 'admin' | 'env' | null; updated_at: string | null };

function StatusBadge({ status }: { status: ApiKeyStatus | null }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
      status?.configured ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
    }`}>
      <CheckCircle2 className="w-3.5 h-3.5" />
      {status?.configured ? `Configured from ${status.source === 'admin' ? 'admin settings' : 'server env'}` : 'Not configured'}
    </span>
  );
}

export function ApiSettingsPage() {
  const { token } = useAdminAuth();

  // Remove Background
  const [rbStatus, setRbStatus] = useState<ApiKeyStatus | null>(null);
  const [rbKey, setRbKey] = useState('');
  const [rbLoading, setRbLoading] = useState(true);
  const [rbSaving, setRbSaving] = useState(false);
  const [rbMsg, setRbMsg] = useState('');
  const [rbErr, setRbErr] = useState('');

  // Cloudinary
  const [cdStatus, setCdStatus] = useState<ApiKeyStatus | null>(null);
  const [cdCloudName, setCdCloudName] = useState('');
  const [cdApiKey, setCdApiKey] = useState('');
  const [cdApiSecret, setCdApiSecret] = useState('');
  const [cdLoading, setCdLoading] = useState(true);
  const [cdSaving, setCdSaving] = useState(false);
  const [cdMsg, setCdMsg] = useState('');
  const [cdErr, setCdErr] = useState('');

  // ImageKit
  const [ikStatus, setIkStatus] = useState<ApiKeyStatus | null>(null);
  const [ikPublic, setIkPublic] = useState('');
  const [ikPrivate, setIkPrivate] = useState('');
  const [ikLoading, setIkLoading] = useState(true);
  const [ikSaving, setIkSaving] = useState(false);
  const [ikMsg, setIkMsg] = useState('');
  const [ikErr, setIkErr] = useState('');

  useEffect(() => {
    if (!token) return;
    api.getRemoveBackgroundSettings(token).then(setRbStatus).catch((e) => setRbErr(errorMessage(e))).finally(() => setRbLoading(false));
    api.getImageKitSettings(token).then(setIkStatus).catch((e) => setIkErr(errorMessage(e))).finally(() => setIkLoading(false));
    api.getCloudinarySettings(token).then(setCdStatus).catch((e) => setCdErr(errorMessage(e))).finally(() => setCdLoading(false));
  }, [token]);

  const saveCd = async () => {
    if (!token || !cdCloudName.trim() || !cdApiKey.trim() || !cdApiSecret.trim()) return;
    setCdSaving(true); setCdMsg(''); setCdErr('');
    try { setCdStatus(await api.updateCloudinarySettings(cdCloudName.trim(), cdApiKey.trim(), cdApiSecret.trim(), token)); setCdCloudName(''); setCdApiKey(''); setCdApiSecret(''); setCdMsg('Cloudinary keys updated.'); }
    catch (e) { setCdErr(errorMessage(e)); } finally { setCdSaving(false); }
  };

  const clearCd = async () => {
    if (!token || !confirm('Clear the admin Cloudinary keys?')) return;
    setCdSaving(true); setCdMsg(''); setCdErr('');
    try {
      const next = await api.clearCloudinarySettings(token);
      setCdStatus(next);
      setCdMsg(next.configured ? 'Admin keys cleared. Server env keys are still active.' : 'Cloudinary keys cleared.');
    } catch (e) { setCdErr(errorMessage(e)); } finally { setCdSaving(false); }
  };

  const saveRb = async () => {
    if (!token || !rbKey.trim()) return;
    setRbSaving(true); setRbMsg(''); setRbErr('');
    try { setRbStatus(await api.updateRemoveBackgroundSettings(rbKey.trim(), token)); setRbKey(''); setRbMsg('Remove background API key updated.'); }
    catch (e) { setRbErr(errorMessage(e)); } finally { setRbSaving(false); }
  };

  const clearRb = async () => {
    if (!token || !confirm('Clear the admin remove background API key?')) return;
    setRbSaving(true); setRbMsg(''); setRbErr('');
    try {
      const next = await api.clearRemoveBackgroundSettings(token);
      setRbStatus(next);
      setRbMsg(next.configured ? 'Admin key cleared. Server env key is still active.' : 'Remove background API key cleared.');
    } catch (e) { setRbErr(errorMessage(e)); } finally { setRbSaving(false); }
  };

  const saveIk = async () => {
    if (!token || !ikPublic.trim() || !ikPrivate.trim()) return;
    setIkSaving(true); setIkMsg(''); setIkErr('');
    try { setIkStatus(await api.updateImageKitSettings(ikPublic.trim(), ikPrivate.trim(), token)); setIkPublic(''); setIkPrivate(''); setIkMsg('ImageKit keys updated.'); }
    catch (e) { setIkErr(errorMessage(e)); } finally { setIkSaving(false); }
  };

  const clearIk = async () => {
    if (!token || !confirm('Clear the admin ImageKit keys?')) return;
    setIkSaving(true); setIkMsg(''); setIkErr('');
    try {
      const next = await api.clearImageKitSettings(token);
      setIkStatus(next);
      setIkMsg(next.configured ? 'Admin keys cleared. Server env keys are still active.' : 'ImageKit keys cleared.');
    } catch (e) { setIkErr(errorMessage(e)); } finally { setIkSaving(false); }
  };

  return (
    <div className="w-full space-y-6 pb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">API Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">Manage service keys used by admin tools.</p>
      </div>

      {/* ImageKit */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
        <div className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-base">ImageKit</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Used for image and video storage and delivery across the admin panel.</p>
          </div>
        </div>
        {ikLoading ? (
          <div className="py-10 flex justify-center"><Loader className="w-5 h-5 text-blue-500 animate-spin" /></div>
        ) : (
          <div className="space-y-5 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={ikStatus} />
              {ikStatus?.updated_at && <span className="text-xs text-slate-400">Updated {new Date(ikStatus.updated_at).toLocaleString()}</span>}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="ik-public" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Public Key</label>
                <input id="ik-public" type="password" value={ikPublic} onChange={(e) => setIkPublic(e.target.value)} placeholder="public_…" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="ik-private" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Private Key</label>
                <input id="ik-private" type="password" value={ikPrivate} onChange={(e) => setIkPrivate(e.target.value)} placeholder="private_…" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Both keys must be provided together. Saved keys are not shown again.</p>
            {ikErr && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 dark:text-red-400 text-sm">{ikErr}</div>}
            {ikMsg && <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-300 text-sm">{ikMsg}</div>}
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={saveIk} disabled={ikSaving || !ikPublic.trim() || !ikPrivate.trim()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold transition-colors">
                {ikSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Keys
              </button>
              <button type="button" onClick={clearIk} disabled={ikSaving || ikStatus?.source !== 'admin'} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 text-slate-800 dark:text-white text-sm font-medium transition-colors">
                <Trash2 className="w-4 h-4" />
                Clear Admin Keys
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Cloudinary */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
        <div className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-base">Cloudinary</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Alternative image and video storage with built-in AI background removal.</p>
          </div>
        </div>
        {cdLoading ? (
          <div className="py-10 flex justify-center"><Loader className="w-5 h-5 text-purple-500 animate-spin" /></div>
        ) : (
          <div className="space-y-5 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={cdStatus} />
              {cdStatus?.updated_at && <span className="text-xs text-slate-400">Updated {new Date(cdStatus.updated_at).toLocaleString()}</span>}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="cd-cloud-name" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Cloud Name</label>
                <input id="cd-cloud-name" type="text" value={cdCloudName} onChange={(e) => setCdCloudName(e.target.value)} placeholder="my-cloud" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="cd-api-key" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">API Key</label>
                <input id="cd-api-key" type="password" value={cdApiKey} onChange={(e) => setCdApiKey(e.target.value)} placeholder="123456789012345" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="cd-api-secret" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">API Secret</label>
                <input id="cd-api-secret" type="password" value={cdApiSecret} onChange={(e) => setCdApiSecret(e.target.value)} placeholder="your-api-secret" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">All three fields must be provided together. Saved keys are not shown again.</p>
            {cdErr && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 dark:text-red-400 text-sm">{cdErr}</div>}
            {cdMsg && <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-300 text-sm">{cdMsg}</div>}
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={saveCd} disabled={cdSaving || !cdCloudName.trim() || !cdApiKey.trim() || !cdApiSecret.trim()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-bold transition-colors">
                {cdSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Keys
              </button>
              <button type="button" onClick={clearCd} disabled={cdSaving || cdStatus?.source !== 'admin'} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 text-slate-800 dark:text-white text-sm font-medium transition-colors">
                <Trash2 className="w-4 h-4" />
                Clear Admin Keys
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Remove Background */}
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
        {rbLoading ? (
          <div className="py-10 flex justify-center"><Loader className="w-5 h-5 text-emerald-500 animate-spin" /></div>
        ) : (
          <div className="space-y-5 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={rbStatus} />
              {rbStatus?.updated_at && <span className="text-xs text-slate-400">Updated {new Date(rbStatus.updated_at).toLocaleString()}</span>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="remove-bg-key" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">API Key</label>
              <input id="remove-bg-key" type="password" value={rbKey} onChange={(e) => setRbKey(e.target.value)} placeholder="Paste remove.bg API key" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors" />
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Saved keys are not shown again after saving.</p>
            </div>
            {rbErr && <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 dark:text-red-400 text-sm">{rbErr}</div>}
            {rbMsg && <div className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-300 text-sm">{rbMsg}</div>}
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={saveRb} disabled={rbSaving || !rbKey.trim()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold transition-colors">
                {rbSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Key
              </button>
              <button type="button" onClick={clearRb} disabled={rbSaving || rbStatus?.source !== 'admin'} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 text-slate-800 dark:text-white text-sm font-medium transition-colors">
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
