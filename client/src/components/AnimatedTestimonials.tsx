import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
};

export function AnimatedTestimonials({ testimonials, autoplay = false }: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((current) => (current + 1) % testimonials.length);
  const handlePrev = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const interval = window.setInterval(handleNext, 5000);
    return () => window.clearInterval(interval);
  }, [autoplay]);

  if (!testimonials.length) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative h-72 w-full sm:h-80">
          <AnimatePresence initial={false}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{ opacity: 0, scale: 0.9, rotate: index % 2 ? 5 : -5 }}
                animate={{
                  opacity: index === active ? 1 : 0,
                  scale: index === active ? 1 : 0.95,
                  rotate: index === active ? 0 : index % 2 ? 5 : -5,
                  zIndex: index === active ? 2 : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: index % 2 ? 5 : -5 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className="h-full w-full rounded-[2rem] border border-emerald-200 object-cover object-center shadow-2xl shadow-emerald-950/10 dark:border-emerald-400/20"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex min-h-72 flex-col justify-between py-2 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white">
                {testimonials[active].name}
              </h3>
              <p className="mt-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                {testimonials[active].designation}
              </p>
              <p className="mt-7 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {testimonials[active].quote}
              </p>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="flex gap-3 pt-8">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-emerald-500/20"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-emerald-500/20"
              >
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
