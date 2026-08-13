import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';

interface BootcampTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
}

export function BootcampTab({ data, set }: BootcampTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Corporate Bootcamp Copy" />
          <Field label="Badge Text (Top Label)" value={data.bootcamp_badge ?? ''} onChange={set('bootcamp_badge')} />
          <Field label="Main Heading" value={data.bootcamp_heading ?? ''} onChange={set('bootcamp_heading')} multiline rows={2} />
          <Field label="Description Paragraph" value={data.bootcamp_desc ?? ''} onChange={set('bootcamp_desc')} multiline rows={5} />
          <Field label="CTA Button Text" value={data.bootcamp_cta ?? ''} onChange={set('bootcamp_cta')} />
        </div>
      </Card>
      <Card>
        <div className="space-y-4 h-full flex flex-col">
          <SectionDivider label="Live Preview" />
          <div className="flex-1 min-h-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner p-7 flex items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-slate-950 to-cyan-950/70 pointer-events-none" />
            <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left">
              <div className="space-y-3 max-w-md">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase">
                  {data.bootcamp_badge || 'Badge Text'}
                </span>
                <h2 className="text-2xl font-display font-bold text-white leading-tight">
                  {data.bootcamp_heading || 'Main Heading'}
                </h2>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {data.bootcamp_desc || 'Description text will appear here...'}
                </p>
              </div>
              <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold shrink-0">
                {data.bootcamp_cta || 'CTA Button'}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
            Preview of the corporate bootcamp banner on the public Sales Training page
          </p>
        </div>
      </Card>
    </div>
  );
}
