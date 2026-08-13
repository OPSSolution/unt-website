import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';

interface SalesTrainingTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
  updateArrayItem: (arrayKey: string, index: number, key: string, value: string) => void;
  setLineList: (key: string) => (value: string) => void;
}

export function SalesTrainingTab({
  data,
  set,
  updateArrayItem,
  setLineList,
}: SalesTrainingTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Service 03 — Sales Training" />
          <Field label="Badge" value={data.training_badge ?? ''} onChange={set('training_badge')} />
          <Field label="Title" value={data.training_title ?? ''} onChange={set('training_title')} />
          <Field label="Highlighted Title" value={data.training_highlight ?? ''} onChange={set('training_highlight')} />
          <Field label="Description" value={data.training_desc ?? ''} onChange={set('training_desc')} multiline rows={4} />
          <Field label="CTA Button" value={data.training_cta ?? ''} onChange={set('training_cta')} />
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          <SectionDivider label="Delivery Formats" />
          <Field label="Section Heading" value={data.training_format_heading ?? ''} onChange={set('training_format_heading')} />
          <Field label="Active Badge" value={data.training_active_label ?? ''} onChange={set('training_active_label')} />
          {(data.training_formats ?? []).map((item: any, index: number) => (
            <div key={item.id || index} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <Field label={`Format ${index + 1}`} value={item.title ?? ''} onChange={(v) => updateArrayItem('training_formats', index, 'title', v)} />
              <Field label="Description" value={item.desc ?? ''} onChange={(v) => updateArrayItem('training_formats', index, 'desc', v)} multiline rows={3} />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <SectionDivider label="Curriculum" />
            <Field label="Section Heading" value={data.training_curriculum_heading ?? ''} onChange={set('training_curriculum_heading')} />
            <Field
              label="Modules (one per line)"
              value={(data.training_curriculum ?? []).join('\n')}
              onChange={setLineList('training_curriculum')}
              multiline
              rows={10}
            />
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <SectionDivider label="UNT Ecosystem Advantage" />
            <Field label="Heading" value={data.training_ecosystem_heading ?? ''} onChange={set('training_ecosystem_heading')} />
            <Field label="Description" value={data.training_ecosystem_desc ?? ''} onChange={set('training_ecosystem_desc')} multiline rows={4} />
            <Field
              label="Advantages (one per line)"
              value={(data.training_ecosystem_items ?? []).join('\n')}
              onChange={setLineList('training_ecosystem_items')}
              multiline
              rows={7}
            />
            <Field label="Director CTA" value={data.training_director_cta ?? ''} onChange={set('training_director_cta')} />
          </div>
        </Card>
      </div>
    </div>
  );
}
