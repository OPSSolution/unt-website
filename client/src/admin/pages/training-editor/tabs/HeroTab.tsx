import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';

interface HeroTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
}

export function HeroTab({ data, set }: HeroTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Page Header Copy" />
          <Field label="Badge Text (Top Label)" value={data.badge ?? ''} onChange={set('badge')} />
          <Field label="Main Headline" value={data.headline ?? ''} onChange={set('headline')} multiline rows={2} />
          <Field label="Subheadline Paragraph" value={data.subheadline ?? ''} onChange={set('subheadline')} multiline rows={5} />
          <Field label="Gallery Button" value={data.hero_gallery_cta ?? ''} onChange={set('hero_gallery_cta')} />
          <Field label="Reserve Button" value={data.hero_reserve_cta ?? ''} onChange={set('hero_reserve_cta')} />
        </div>
      </Card>
      <Card>
        <div className="space-y-4 h-full flex flex-col">
          <SectionDivider label="Live Preview" />
          <div className="flex-1 min-h-72 bg-slate-950 rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-slate-800 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/50 via-slate-950 to-slate-950 pointer-events-none" />
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                {data.badge || 'Badge Text'}
              </span>
              <h2 className="text-3xl font-display font-black text-white tracking-tight leading-tight">
                {data.headline || 'Main Headline'}
              </h2>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                {data.subheadline || 'Subheadline text will appear here...'}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
            Preview of the hero header on the public Sales Training page
          </p>
        </div>
      </Card>
    </div>
  );
}
