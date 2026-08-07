export type ActivityCategory = 'workshop' | 'video' | 'negotiation' | 'graduation';

export interface ActivityItem {
  id: string;
  title: string;
  category: ActivityCategory;
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  galleryImages: string[];
  location: string;
  date: string;
  participants: string;
  description: string;
  highlights: string[];
  duration?: string;
  instructor?: string;
  badge?: string;
}

export const isMediaUrl = (value: unknown): value is string =>
  typeof value === 'string' && (/^https?:\/\//i.test(value) || value.startsWith('/'));
