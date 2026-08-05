import { CheckCircle2, X } from 'lucide-react';
import type { TrainingTrack } from '../../types';

interface Props {
  track: TrainingTrack;
  onClose: () => void;
  onRegister: () => void;
}

export function TrainingTrackModal({ track, onClose, onRegister }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="training-track-title">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-left">
          <div><span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">{track.duration} • {track.level}</span><h3 id="training-track-title" className="text-xl font-display font-bold mt-0.5">{track.title}</h3></div>
          <button onClick={onClose} aria-label="Close syllabus" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-left">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{track.description}</p>
          <ModalSection title="Target Audience"><div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">{track.targetAudience}</div></ModalSection>
          <ModalSection title="Key Learning Takeaways"><ul className="space-y-2">{track.keyTakeaways.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /><span>{item}</span></li>)}</ul></ModalSection>
          <ModalSection title="Module Curriculum Breakdown"><div className="space-y-3">{track.curriculum.map((module) => <div key={module.module} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700"><div className="font-bold text-slate-900 dark:text-white text-xs">{module.module}</div><ul className="space-y-1 text-slate-600 dark:text-slate-300 pl-4 list-disc mt-2">{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div>)}</div></ModalSection>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400">Close</button><button onClick={onRegister} className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">Register Team for Track</button></div>
      </div>
    </div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">{title}</h4>{children}</section>;
}

