import React, { useState } from 'react';
import { Save, Loader, CheckCircle, CloudUpload, Cloud } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';

export function Field({
  label, value, onChange, multiline = false, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number;
}) {
  const cls = 'w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors resize-none';
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
      {multiline
        ? <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
        : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      }
    </div>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export function Card({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-none backdrop-blur-sm ${className}`} {...props}>
      {children}
    </div>
  );
}

interface EditorShellProps {
  title: string;
  description: string;
  saving: boolean;
  saved: boolean;
  error: string;
  onSave: () => void | Promise<void>;
  loading?: boolean;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  autoSaving?: boolean;
  autoSaved?: boolean;
  autoSaveError?: string;
  dirty?: boolean;
  children: React.ReactNode;
}

export function EditorShell({
  title, description, saving, saved, error, onSave,
  loading, tabs, activeTab, onTabChange, children,
  autoSaving, autoSaved, autoSaveError, dirty,
}: EditorShellProps) {
  const [manualSaving, setManualSaving] = useState(false);
  const [manualSaved, setManualSaved] = useState(false);
  const [manualError, setManualError] = useState('');
  const autoSaveEnabled = useAdminStore((state) => state.autoSaveEnabled);
  const setAutoSaveEnabled = useAdminStore((state) => state.setAutoSaveEnabled);

  const saveNow = async () => {
    setManualSaving(true);
    setManualSaved(false);
    setManualError('');
    try {
      await onSave();
      window.dispatchEvent(new Event('unt-admin-manual-save-success'));
      setManualSaved(true);
      window.setTimeout(() => setManualSaved(false), 2000);
    } catch (saveError) {
      setManualError(saveError instanceof Error ? saveError.message : 'Save failed');
    } finally {
      setManualSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-6 h-6 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full pb-8">
      {/* Header row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-2">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{description}</p>
          {(autoSaving || autoSaved || dirty || autoSaveError) && (
            <div className="mt-2 flex min-h-5 items-center text-xs font-medium">
              {autoSaving ? (
                <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400"><CloudUpload className="w-3.5 h-3.5 animate-pulse" />Saving your changes...</span>
              ) : autoSaved && autoSaveEnabled ? (
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><CheckCircle className="w-3.5 h-3.5" />All changes saved automatically</span>
              ) : dirty ? (
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400"><Cloud className="w-3.5 h-3.5" />{autoSaveEnabled ? 'Changes will save shortly' : 'You have unsaved changes'}</span>
              ) : null}
            </div>
          )}
        </div>
        <div className="flex w-full sm:w-auto items-center gap-1.5 rounded-2xl border bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-slate-900/80 shrink-0">
          <button
            type="button"
            role="switch"
            aria-checked={autoSaveEnabled}
            onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
            className="flex flex-1 sm:flex-none items-center justify-between sm:justify-start gap-2.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
            title={autoSaveEnabled ? 'Changes save automatically after typing' : 'Changes save only when you click Save Changes'}
          >
            <span>Auto save</span>
            <span className={`relative h-8 w-16 shrink-0 overflow-hidden rounded-full transition-colors duration-200 ${autoSaveEnabled
              ? 'bg-emerald-600 shadow-sm shadow-emerald-600/25'
              : 'bg-slate-200 dark:bg-slate-700'}`}>
              <span className={`absolute inset-y-0 flex items-center text-[10px] font-black tracking-wide transition-all duration-200 ${autoSaveEnabled ? 'left-2.5 text-white' : 'right-2 text-slate-500 dark:text-slate-300'}`}>
                {autoSaveEnabled ? 'ON' : 'OFF'}
              </span>
              <span className={`absolute left-0.5 top-0.5 h-7 w-7 rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 ease-out ${autoSaveEnabled ? 'translate-x-8' : 'translate-x-0'}`} />
            </span>
          </button>
          <div className="h-7 w-px bg-slate-200 dark:bg-slate-700" />
          <button
            onClick={saveNow}
            disabled={saving || manualSaving}
            className={`btn-shine flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 disabled:opacity-60 ${
              saved || manualSaved
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950'
            }`}
          >
            {saved || manualSaved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saving || manualSaving ? 'Saving...' : saved || manualSaved ? 'Saved' : 'Save changes'}</span>
          </button>
        </div>
      </div>

      {(error || autoSaveError || manualError) && (
        <div className="px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm mt-4">
          {error || autoSaveError || manualError}
        </div>
      )}

      {tabs && onTabChange && (
        <div className="flex gap-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full p-1 mt-5 mb-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {!tabs && <div className="mt-6" />}

      {children}
    </div>
  );
}
