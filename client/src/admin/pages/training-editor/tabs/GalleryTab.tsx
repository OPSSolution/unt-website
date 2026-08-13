import React from 'react';
import { Card, Field, SectionDivider } from '@/src/admin/components/EditorShell';
import { CheckCircle2, Database } from 'lucide-react';
import { ActivityManager } from '@/src/admin/pages/training-editor/ActivityManager';
import type { ActivityItem } from '@/src/pages/training/activityTypes';

interface GalleryTabProps {
  data: any;
  set: (key: string) => (v: string) => void;
  setData: React.Dispatch<React.SetStateAction<any>>;
  language: string;
  restoreOriginalGallery: () => void;
  galleryRestoreMessage: string;
  gallerySaveMessage: string;
  gallerySaveError: string;
  persistActivities: (activities: ActivityItem[]) => Promise<void>;
}

export function GalleryTab({
  data,
  set,
  setData,
  language,
  restoreOriginalGallery,
  galleryRestoreMessage,
  gallerySaveMessage,
  gallerySaveError,
  persistActivities,
}: GalleryTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <SectionDivider label="Activity Gallery" />
            {language === 'en' && (
              <button
                type="button"
                onClick={restoreOriginalGallery}
                className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-500/10 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs font-bold border border-slate-200 dark:border-slate-700"
              >
                <Database className="w-4 h-4" /> Restore Gallery Text
              </button>
            )}
          </div>
          <Field label="Badge" value={data.gallery_badge ?? ''} onChange={set('gallery_badge')} />
          <Field label="Heading" value={data.gallery_heading ?? ''} onChange={set('gallery_heading')} multiline />
          <Field label="Subtext" value={data.gallery_sub ?? ''} onChange={set('gallery_sub')} multiline />
          <SectionDivider label="Gallery Filters" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            <Field label="All" value={data.gallery_tab_all ?? ''} onChange={set('gallery_tab_all')} />
            <Field label="Workshops" value={data.gallery_tab_workshops ?? ''} onChange={set('gallery_tab_workshops')} />
            <Field label="Videos" value={data.gallery_tab_videos ?? ''} onChange={set('gallery_tab_videos')} />
            <Field label="Negotiation" value={data.gallery_tab_negotiation ?? ''} onChange={set('gallery_tab_negotiation')} />
            <Field label="Graduation" value={data.gallery_tab_graduation ?? ''} onChange={set('gallery_tab_graduation')} />
          </div>
          <SectionDivider label="Media Actions" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            <Field label="View Gallery" value={data.gallery_view_gallery ?? ''} onChange={set('gallery_view_gallery')} />
            <Field label="Watch Video" value={data.gallery_watch_video ?? ''} onChange={set('gallery_watch_video')} />
            <Field label="Browse Album" value={data.gallery_browse_album ?? ''} onChange={set('gallery_browse_album')} />
            <Field label="Video Enrollment" value={data.gallery_video_enroll_cta ?? ''} onChange={set('gallery_video_enroll_cta')} />
            <Field label="Book Workshop" value={data.gallery_album_book_cta ?? ''} onChange={set('gallery_album_book_cta')} />
          </div>
          <SectionDivider label="Enrollment Banner" />
          <Field label="Banner Badge" value={data.gallery_cta_badge ?? ''} onChange={set('gallery_cta_badge')} />
          <Field label="Banner Heading" value={data.gallery_cta_heading ?? ''} onChange={set('gallery_cta_heading')} multiline />
          <Field label="Banner Description" value={data.gallery_cta_desc ?? ''} onChange={set('gallery_cta_desc')} multiline rows={3} />
          <Field label="Banner Button" value={data.gallery_cta_button ?? ''} onChange={set('gallery_cta_button')} />
        </div>
      </Card>
      <Card>
        {galleryRestoreMessage && (
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-4 py-3 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{galleryRestoreMessage}</span>
          </div>
        )}
        <div className="mb-4 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 px-4 py-3 text-xs text-sky-700 dark:text-sky-300">
          Gallery media comes only from activities added through Admin and saved in Supabase/ImageKit. <strong>Restore Gallery Text</strong> resets labels without deleting your uploaded activities.
        </div>
        {gallerySaveMessage && <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">{gallerySaveMessage}</div>}
        {gallerySaveError && <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">{gallerySaveError}</div>}
        <ActivityManager
          value={data.activities ?? []}
          onChange={(activities) => setData((current: any) => ({ ...current, activities }))}
          onCommit={persistActivities}
        />
      </Card>
    </div>
  );
}
