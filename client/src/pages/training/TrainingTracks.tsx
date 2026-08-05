import { ArrowRight, CheckCircle2, Clock, GraduationCap } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { TRAINING_TRACKS } from '../../data/mockData';
import type { TrainingTrack } from '../../types';

interface Props {
  content: Record<string, string>;
  onSelect: (track: TrainingTrack) => void;
}

export function TrainingTracks({ content, onSelect }: Props) {
  return (
    <section className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto"><span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase rounded-full">{content.tracks_badge ?? 'Curriculum'}</span><h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">{content.tracks_heading ?? 'Specialized B2B Commercial Tracks'}</h2><p className="text-slate-600 dark:text-slate-300 text-sm">{content.tracks_sub ?? 'Select a track to review its syllabus, target audience, and enrollment schedule.'}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {TRAINING_TRACKS.map((track) => (
          <Card3D key={track.id} intensity={12}><article className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-md hover:shadow-2xl h-full flex flex-col justify-between"><div className="space-y-4"><div className="flex items-center justify-between"><div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400"><GraduationCap className="w-6 h-6" /></div><div className="flex items-center gap-2"><div className="live-pulse-badge"><span className="live-pulse-dot" /><span>Enrolling</span></div><span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded-full">{track.level}</span></div></div><div><h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">{track.title}</h3><p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{track.tagline}</p><p className="text-slate-600 dark:text-slate-300 text-xs mt-2">{track.description}</p></div><div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"><div className="text-[11px] font-bold text-slate-500 uppercase">Key Outcomes</div><ul className="space-y-1.5 mt-2">{track.keyTakeaways.slice(0, 2).map((item) => <li key={item} className="flex gap-2 text-xs"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /><span>{item}</span></li>)}</ul></div></div><div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between"><div className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-600" />{track.duration}</div><button onClick={() => onSelect(track)} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"><span>Explore Syllabus</span><ArrowRight className="w-4 h-4" /></button></div></article></Card3D>
        ))}
      </div>
    </section>
  );
}
