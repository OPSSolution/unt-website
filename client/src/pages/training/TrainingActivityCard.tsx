import { ChevronRight, Eye, Image as ImageIcon, MapPin, Play, Video } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import type { ActivityItem } from './activityTypes';

interface Props {
  activity: ActivityItem;
  onOpen: (activity: ActivityItem) => void;
}

export function TrainingActivityCard({ activity, onOpen }: Props) {
  const isVideo = activity.type === 'video' || Boolean(activity.videoUrl);
  const imageCount = new Set([activity.mediaUrl, ...activity.galleryImages]).size;

  return (
    <Card3D intensity={12} onClick={() => onOpen(activity)}>
      <article className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
          <img src={activity.mediaUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
            <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-md shadow-md">{activity.badge ?? activity.category}</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-white/90 font-medium text-[11px] flex items-center gap-1.5 backdrop-blur-md border border-white/10">
              {isVideo ? <Video className="w-3.5 h-3.5 text-emerald-400" /> : <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isVideo ? `Video (${activity.duration ?? 'HD'})` : `${imageCount} Photos`}</span>
            </span>
          </div>
          {isVideo ? (
            <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/50 group-hover:scale-110 transition-transform duration-300 border-2 border-white/30 z-10"><Play className="w-6 h-6 fill-white translate-x-0.5" /></div>
          ) : (
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/80 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md border border-white/10 shadow-md z-10"><Eye className="w-3.5 h-3.5 text-emerald-400" /><span>View Album</span></div>
          )}
        </div>
        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">{activity.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-2">{activity.description}</p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium truncate"><MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" /><span className="truncate">{activity.location}</span></div>
            <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold shrink-0"><span>{isVideo ? 'Play Video' : 'View Photos'}</span><ChevronRight className="w-3.5 h-3.5" /></div>
          </div>
        </div>
      </article>
    </Card3D>
  );
}
