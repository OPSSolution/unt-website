import React, { useEffect, useState } from 'react';
import { api } from '@/src/admin/api';
import { useAdminAuth } from '@/src/admin/hooks/useAdminAuth';
import { useAutoSave } from '@/src/admin/hooks/useAutoSave';
import { EditorShell } from '@/src/admin/components/EditorShell';
import { useLanguage } from '@/src/i18n/LanguageContext';
import type { UpcomingSession } from '@/src/pages/training/TrainingPromosSchedule';
import type { ActivityItem } from '@/src/pages/training/activityTypes';
import { DEFAULTS, TABS, type Tab } from '@/src/admin/pages/training-editor/defaults';
import {
  restoreClientActivities,
  mergeActivitiesForDisplay,
  buildOtherLangActivities,
} from '@/src/admin/pages/training-editor/activitySync';
import { HeroTab } from '@/src/admin/pages/training-editor/tabs/HeroTab';
import { StatsTab } from '@/src/admin/pages/training-editor/tabs/StatsTab';
import { ScheduleTab } from '@/src/admin/pages/training-editor/tabs/ScheduleTab';
import { GalleryTab } from '@/src/admin/pages/training-editor/tabs/GalleryTab';
import { BootcampTab } from '@/src/admin/pages/training-editor/tabs/BootcampTab';

export function TrainingEditor() {
  const { token } = useAdminAuth();
  const { language } = useLanguage();
  const [data, setData] = useState<any>(DEFAULTS);
  const [activeTab, setActiveTab] = useState<Tab>('Hero');
  const [loading, setLoading] = useState(true);
  const [loadedLanguage, setLoadedLanguage] = useState<'en' | 'km' | null>(null);
  const [galleryRestoreMessage, setGalleryRestoreMessage] = useState('');
  const [gallerySaveMessage, setGallerySaveMessage] = useState('');
  const [gallerySaveError, setGallerySaveError] = useState('');
  const [scheduleSaveMessage, setScheduleSaveMessage] = useState('');
  const [scheduleSaveError, setScheduleSaveError] = useState('');

  const { saving, saved, error, dirty, autoSaving, autoSaved, autoSaveError } = useAutoSave(
    `training_page-${language}`,
    data,
    async (latestData) => {
      if (!token) throw new Error('Your admin session is unavailable. Please sign in again.');
      await api.updateHomepageSection('training_page', latestData, token, language);
    },
    1200,
    !loading && loadedLanguage === language,
  );

  useEffect(() => {
    setLoading(true);
    setLoadedLanguage(null);

    const otherLang = language === 'en' ? 'km' : 'en';
    Promise.all([
      api.getHomepageSection('training_page', language),
      api.getHomepageSection('training_page', otherLang),
    ])
      .then(([currentResult, otherResult]) => {
        const currentActivities = restoreClientActivities(currentResult.data?.activities);
        const otherActivities = restoreClientActivities(otherResult.data?.activities);
        const mergedActivities = mergeActivitiesForDisplay(currentActivities, otherActivities);

        const baseData = language === 'en'
          ? { ...DEFAULTS, ...(currentResult.data ?? {}) }
          : (currentResult.data ?? {});

        setData({ ...baseData, activities: mergedActivities });
      })
      .catch(() => {})
      .finally(() => { setLoadedLanguage(language); setLoading(false); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const set = (key: string) => (v: string) => setData((d: any) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    if (!token) return;
    await api.updateHomepageSection('training_page', data, token, language);
  };

  const persistSessions = async (upcoming_sessions: UpcomingSession[]) => {
    const nextData = { ...data, upcoming_sessions };
    setData(nextData);
    setScheduleSaveMessage('');
    setScheduleSaveError('');
    if (!token) {
      setScheduleSaveError('Your admin session is unavailable. Please sign in again.');
      return;
    }
    try {
      await api.updateHomepageSection('training_page', nextData, token, language);
      const verified = await api.getHomepageSection('training_page', language);
      const verifiedSessions: UpcomingSession[] = Array.isArray(verified.data?.upcoming_sessions)
        ? verified.data.upcoming_sessions
        : [];
      const savedTitles = new Map(verifiedSessions.map((session) => [session.id, session.title]));
      const expectedTitles = upcoming_sessions.filter((session) => session.title.trim());
      if (expectedTitles.some((session) => savedTitles.get(session.id) !== session.title)) {
        throw new Error('The Khmer session was not confirmed by Supabase. Please try signing in again.');
      }
      setData((current: any) => ({ ...current, upcoming_sessions: verifiedSessions }));
      setScheduleSaveMessage(language === 'km' ? 'វគ្គបណ្តុះបណ្តាលត្រូវបានរក្សាទុកដោយជោគជ័យ។' : 'Training session saved successfully.');
    } catch (err) {
      setScheduleSaveError(err instanceof Error ? err.message : 'Failed to save training session.');
    }
  };

  const persistActivities = async (activities: ActivityItem[]) => {
    const nextData = { ...data, activities };
    setData(nextData);
    setGallerySaveMessage('');
    setGallerySaveError('');
    if (!token) {
      setGallerySaveError('Your admin session is unavailable. Please sign in again.');
      return;
    }

    try {
      await api.updateHomepageSection('training_page', nextData, token, language);

      const otherLang = language === 'en' ? 'km' : 'en';
      const otherResult = await api.getHomepageSection('training_page', otherLang);
      const otherActivities = restoreClientActivities(otherResult.data?.activities);
      const syncedOtherActivities = buildOtherLangActivities(activities, otherActivities);
      const otherData = { ...(otherResult.data ?? {}), activities: syncedOtherActivities };
      await api.updateHomepageSection('training_page', otherData, token, otherLang);

      const verified = await api.getHomepageSection('training_page', language);
      const verifiedActivities = restoreClientActivities(verified.data?.activities);
      const savedById = new Map(verifiedActivities.map((activity) => [activity.id, activity]));
      const missing = activities.find((activity) => {
        const saved = savedById.get(activity.id);
        return !saved || saved.mediaUrl !== activity.mediaUrl;
      });
      if (missing) {
        throw new Error(`Activity "${missing.title}" was not confirmed by Supabase.`);
      }
      setData((current: any) => ({ ...current, activities: verifiedActivities }));
      setGallerySaveMessage('Gallery activity saved and verified in Supabase. Media URL confirmed from ImageKit.');
    } catch (saveError) {
      setGallerySaveError(saveError instanceof Error ? saveError.message : 'Failed to save gallery activity.');
    }
  };

  const restoreOriginalGallery = () => {
    const shouldRestore = window.confirm(
      'Restore the original English Gallery text? Your uploaded activities will be kept.'
    );
    if (!shouldRestore) return;
    setData((current: any) => ({
      ...current,
      gallery_badge: DEFAULTS.gallery_badge,
      gallery_heading: DEFAULTS.gallery_heading,
      gallery_sub: DEFAULTS.gallery_sub,
      gallery_tab_all: DEFAULTS.gallery_tab_all,
      gallery_tab_workshops: DEFAULTS.gallery_tab_workshops,
      gallery_tab_videos: DEFAULTS.gallery_tab_videos,
      gallery_tab_negotiation: DEFAULTS.gallery_tab_negotiation,
      gallery_tab_graduation: DEFAULTS.gallery_tab_graduation,
      gallery_view_gallery: DEFAULTS.gallery_view_gallery,
      gallery_watch_video: DEFAULTS.gallery_watch_video,
      gallery_browse_album: DEFAULTS.gallery_browse_album,
      gallery_video_enroll_cta: DEFAULTS.gallery_video_enroll_cta,
      gallery_album_book_cta: DEFAULTS.gallery_album_book_cta,
      gallery_cta_badge: DEFAULTS.gallery_cta_badge,
      gallery_cta_heading: DEFAULTS.gallery_cta_heading,
      gallery_cta_desc: DEFAULTS.gallery_cta_desc,
      gallery_cta_button: DEFAULTS.gallery_cta_button,
      activities: restoreClientActivities(current.activities),
    }));
    setGalleryRestoreMessage(
      'Original Gallery text restored locally. Uploaded activities were kept. Click Save Changes to store this in Supabase.'
    );
  };

  return (
    <EditorShell
      title="Sales Training Page"
      description="Edit Sales Training content in English or Khmer. Changes are saved automatically to Supabase."
      saving={saving}
      saved={saved}
      error={error}
      onSave={handleSave}
      loading={loading || loadedLanguage !== language}
      autoSaving={autoSaving}
      autoSaved={autoSaved}
      autoSaveError={autoSaveError}
      dirty={dirty}
      tabs={[...TABS]}
      activeTab={activeTab}
      onTabChange={(t) => setActiveTab(t as Tab)}
    >
      {activeTab === 'Hero' && <HeroTab data={data} set={set} />}
      {activeTab === 'Stats' && <StatsTab data={data} set={set} />}
      {activeTab === 'Schedule' && (
        <ScheduleTab
          data={data}
          set={set}
          setData={setData}
          scheduleSaveMessage={scheduleSaveMessage}
          scheduleSaveError={scheduleSaveError}
          persistSessions={persistSessions}
        />
      )}
      {activeTab === 'Gallery' && (
        <GalleryTab
          data={data}
          set={set}
          setData={setData}
          language={language}
          restoreOriginalGallery={restoreOriginalGallery}
          galleryRestoreMessage={galleryRestoreMessage}
          gallerySaveMessage={gallerySaveMessage}
          gallerySaveError={gallerySaveError}
          persistActivities={persistActivities}
        />
      )}
      {activeTab === 'Bootcamp' && <BootcampTab data={data} set={set} />}
    </EditorShell>
  );
}
