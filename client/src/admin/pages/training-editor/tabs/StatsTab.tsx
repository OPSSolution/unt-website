import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';

interface StatsTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
}

export function StatsTab({ data, set }: StatsTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((n) => (
        <Card key={n}>
          <div className="space-y-3">
            <SectionDivider label={`Stat ${n}`} />
            <Field label="Value" value={data[`stat${n}_value`]} onChange={set(`stat${n}_value`)} />
            <Field label="Label" value={data[`stat${n}_label`]} onChange={set(`stat${n}_label`)} />
          </div>
        </Card>
      ))}
    </div>
  );
}
