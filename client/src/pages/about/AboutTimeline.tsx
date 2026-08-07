import { useState } from 'react';
import { Award, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { Card3D } from '../../components/Card3D';
import { ScrollReveal } from '../../components/ScrollReveal';
import { TIMELINE } from './data';

export function AboutTimeline() {
  const [activeIndex, setActiveIndex] = useState(TIMELINE.length - 1);
  const activeMilestone = TIMELINE[activeIndex];

  return (
    <section className="py-12 bg-transparent transition-colors duration-300">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <ScrollReveal animation="up">
          <div className="text-center space-y-3 mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Our Journey</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 dark:text-white">Milestones & Growth</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="up" delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-2">
              {TIMELINE.map((milestone, index) => {
                const isActive = activeIndex === index;
                return (
                  <button 
                    key={milestone.year} 
                    type="button" 
                    onClick={() => setActiveIndex(index)} 
                    className={`group w-full text-left flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-400/40 shadow-md' 
                        : 'bg-white dark:bg-white/5 hover:bg-emerald-50/50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div className={`shrink-0 w-16 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                      isActive 
                        ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm' 
                        : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
                    }`}>
                      {milestone.year}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {milestone.title}
                      </h4>
                      {isActive && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5 animate-fade-in">
                          {milestone.desc}
                        </p>
                      )}
                    </div>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            <Card3D intensity={5}>
              <div className="relative p-8 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#061814] dark:via-[#09221b] dark:to-[#04120f] text-slate-900 dark:text-white border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-between">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                    <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Year {activeMilestone.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black leading-tight text-slate-900 dark:text-white">{activeMilestone.title}</h3>
                  <p className="text-slate-600 dark:text-emerald-100/90 text-sm leading-relaxed max-w-md">{activeMilestone.desc}</p>
                </div>
                <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-emerald-500/20">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-slate-600 dark:text-emerald-300 font-medium">Milestone {activeIndex + 1} of {TIMELINE.length}</span>
                  <div className="flex items-center gap-1.5 ml-auto">
                    {TIMELINE.map((milestone, index) => (
                      <div 
                        key={milestone.year} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeIndex 
                            ? 'bg-emerald-600 dark:bg-emerald-400 scale-125' 
                            : index < activeIndex 
                              ? 'bg-emerald-400 dark:bg-emerald-600' 
                              : 'bg-slate-200 dark:bg-white/20'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
