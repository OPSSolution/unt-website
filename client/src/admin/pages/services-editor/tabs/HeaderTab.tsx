import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';

interface HeaderTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
}

export function HeaderTab({ data, set }: HeaderTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Page Header" />
          <Field label="Badge" value={data.badge} onChange={set('badge')} />
          <Field label="Headline" value={data.headline} onChange={set('headline')} multiline />
          <Field label="Highlighted Headline" value={data.headline_highlight} onChange={set('headline_highlight')} />
          <Field label="Subheadline" value={data.subheadline} onChange={set('subheadline')} multiline rows={4} />
        </div>
      </Card>
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Service Filter Buttons" />
          <Field label="All Services" value={data.tab_all} onChange={set('tab_all')} />
          <Field label="Product Sales" value={data.tab_product} onChange={set('tab_product')} />
          <Field label="Sourcing" value={data.tab_sourcing} onChange={set('tab_sourcing')} />
          <Field label="Sales Training" value={data.tab_training} onChange={set('tab_training')} />
        </div>
      </Card>
    </div>
  );
}
