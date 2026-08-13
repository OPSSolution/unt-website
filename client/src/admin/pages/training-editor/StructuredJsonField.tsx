import React, { useEffect, useState } from 'react';
import { AlertCircle, Braces, CheckCircle2, Database } from 'lucide-react';

export function StructuredJsonField({
  label,
  value,
  onChange,
  rows = 14,
}: {
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
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON');
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
          onChange={(e) => setDraft(e.target.value)}
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
