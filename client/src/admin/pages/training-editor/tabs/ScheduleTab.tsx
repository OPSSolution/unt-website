import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';
import { SessionManager } from '@/src/admin/pages/training-editor/SessionManager';
import { StructuredJsonField } from '@/src/admin/pages/training-editor/StructuredJsonField';
import type { UpcomingSession } from '@/src/pages/training/TrainingPromosSchedule';

interface ScheduleTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
  scheduleSaveMessage: string;
  scheduleSaveError: string;
  persistSessions: (upcoming_sessions: UpcomingSession[]) => Promise<void>;
}

export function ScheduleTab({
  data,
  set,
  setData,
  scheduleSaveMessage,
  scheduleSaveError,
  persistSessions,
}: ScheduleTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <SectionDivider label="Schedule Section" />
          <Field label="Live Updates Label" value={data.schedule_live_label ?? ''} onChange={set('schedule_live_label')} />
          <Field label="Badge" value={data.schedule_badge ?? ''} onChange={set('schedule_badge')} />
          <Field label="Heading" value={data.schedule_heading ?? ''} onChange={set('schedule_heading')} multiline />
          <Field label="Subtext" value={data.schedule_sub ?? ''} onChange={set('schedule_sub')} multiline />
        </div>
      </Card>
      <Card>
        {scheduleSaveMessage && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 px-4 py-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {scheduleSaveMessage}
          </div>
        )}
        {scheduleSaveError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 px-4 py-3 text-xs font-semibold text-red-600 dark:text-red-300">
            {scheduleSaveError}
          </div>
        )}
        <SessionManager
          value={data.upcoming_sessions ?? []}
          onChange={(upcoming_sessions) => setData((current: any) => ({ ...current, upcoming_sessions }))}
          onCommit={(upcoming_sessions) => { void persistSessions(upcoming_sessions); }}
        />
      </Card>
      <Card>
        <StructuredJsonField
          label="Live Update Messages"
          value={data.recent_activities}
          onChange={(recent_activities) => setData((current: any) => ({ ...current, recent_activities }))}
          rows={8}
        />
      </Card>
    </div>
  );
}
