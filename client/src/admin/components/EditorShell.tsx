import React from 'react';
import { Save, Loader, CheckCircle, CloudUpload, Cloud } from 'lucide-react';

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
  onSave: () => void;
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
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Auto-save status indicator */}
          {(autoSaving || autoSaved || dirty || autoSaveError) && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium">
              {autoSaving ? (
                <span className="flex items-center gap-1.5 text-sky-500">
                  <CloudUpload className="w-4 h-4 animate-pulse" />
                  Saving...
                </span>
              ) : autoSaved ? (
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <CheckCircle className="w-4 h-4" />
                  Auto-saved
                </span>
              ) : dirty ? (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Cloud className="w-4 h-4" />
                  Unsaved changes
                </span>
              ) : null}
            </div>
          )}
          <button
            onClick={onSave}
            disabled={saving}
            className={`btn-shine flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-bold text-sm transition-all shrink-0 shadow-lg disabled:opacity-60 ${
              saved
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
            }`}
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span className="hidden sm:inline">{saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}</span>
            <span className="sm:hidden">{saving ? '...' : saved ? '✓' : 'Save'}</span>
          </button>
        </div>
      </div>

      {(error || autoSaveError) && (
        <div className="px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm mt-4">
          {error || autoSaveError}
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