import type { ActivityItem } from '@/src/pages/training/activityTypes';

/** Structural fields are identical in both EN and KM — media / type / category. */
export const ACTIVITY_STRUCTURAL_FIELDS: (keyof ActivityItem)[] = [
  'mediaUrl', 'thumbnailUrl', 'videoUrl', 'type', 'category', 'galleryImages',
];

/** Text fields are language-specific. */
export const ACTIVITY_TEXT_FIELDS: (keyof ActivityItem)[] = [
  'title', 'description', 'badge', 'location', 'date',
  'participants', 'highlights', 'instructor', 'duration',
];

/**
 * Validate and normalise a raw saved activities array from Supabase.
 * Items missing id / title / mediaUrl are dropped.
 */
export function restoreClientActivities(saved: unknown): ActivityItem[] {
  const EMPTY: ActivityItem = {
    id: '', title: '', category: 'workshop', type: 'image', mediaUrl: '',
    galleryImages: [], location: '', date: '', participants: '',
    description: '', highlights: [], badge: '',
  };
  const list = Array.isArray(saved) ? saved : [];
  return list.flatMap((value): ActivityItem[] => {
    if (!value || typeof value !== 'object') return [];
    const a = value as Partial<ActivityItem>;
    const id = typeof a.id === 'string' ? a.id.trim() : '';
    const title = typeof a.title === 'string' ? a.title.trim() : '';
    const mediaUrl = typeof a.mediaUrl === 'string' ? a.mediaUrl.trim() : '';
    if (!id || !title || !mediaUrl) return [];
    return [{
      ...EMPTY, ...a, id, title, mediaUrl,
      galleryImages: Array.isArray(a.galleryImages)
        ? a.galleryImages.filter((i): i is string => typeof i === 'string') : [],
      highlights: Array.isArray(a.highlights)
        ? a.highlights.filter((i): i is string => typeof i === 'string') : [],
    }];
  });
}

/**
 * Build the merged activity list to display in the admin.
 * - Union of all IDs from both sides (added in either language → appears in both).
 * - Structural fields come from primary (current language).
 * - Text fields come from primary; fall back to secondary when primary is empty.
 */
export function mergeActivitiesForDisplay(
  primary: ActivityItem[],
  secondary: ActivityItem[],
): ActivityItem[] {
  const primaryById = new Map(primary.map((a) => [a.id, a]));
  const secondaryById = new Map(secondary.map((a) => [a.id, a]));
  const allIds = [
    ...primary.map((a) => a.id),
    ...secondary.filter((a) => !primaryById.has(a.id)).map((a) => a.id),
  ];
  return allIds.map((id) => {
    const p = primaryById.get(id);
    const s = secondaryById.get(id);
    if (p && !s) return p;
    if (!p && s) return s;
    const merged: ActivityItem = { ...p! };
    for (const field of ACTIVITY_TEXT_FIELDS) {
      const pVal = p![field];
      const sVal = s![field];
      const pEmpty = pVal === undefined || pVal === null ||
        (typeof pVal === 'string' && !pVal.trim()) ||
        (Array.isArray(pVal) && pVal.length === 0);
      if (pEmpty && sVal !== undefined) (merged as any)[field] = sVal;
    }
    return merged;
  });
}

/**
 * Build the activity list to write for the OTHER language:
 * - Keep other lang's existing text intact.
 * - Sync structural fields from the current lang's new list.
 * - Add new activities (copied whole as placeholder); deletions reflected by exclusion.
 */
export function buildOtherLangActivities(
  newActivities: ActivityItem[],
  otherActivities: ActivityItem[],
): ActivityItem[] {
  const otherById = new Map(otherActivities.map((a) => [a.id, a]));
  return newActivities.map((newActivity) => {
    const other = otherById.get(newActivity.id);
    if (!other) return { ...newActivity };
    const synced: ActivityItem = { ...other };
    for (const field of ACTIVITY_STRUCTURAL_FIELDS) {
      const val = newActivity[field];
      if (val !== undefined) (synced as any)[field] = val;
    }
    return synced;
  });
}
