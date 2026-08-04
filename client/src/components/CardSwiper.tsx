import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CardSwiperProps {
  children: React.ReactNode[];
  itemsPerPage?: number; // default 3 on desktop, 1 on mobile
  autoplayInterval?: number; // ms (0 = disabled)
  className?: string;
}

export const CardSwiper: React.FC<CardSwiperProps> = ({
  children,
  itemsPerPage = 3,
  autoplayInterval = 4500,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplayInterval > 0);
  const touchStartX = useRef<number | null>(null);

  const totalPages = Math.ceil(children.length / itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || totalPages <= 1 || autoplayInterval <= 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [isPlaying, totalPages, autoplayInterval]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -40) handleNext();
    if (deltaX > 40) handlePrev();
    touchStartX.current = null;
  };

  if (!children || children.length === 0) return null;

  return (
    <div className={`relative space-y-6 ${className}`}>
      {/* Carousel Outer Viewport */}
      <div
        className="overflow-hidden p-2 -m-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) gap-6"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {children.map((child, idx) => (
            <div
              key={idx}
              className="w-full shrink-0 min-w-0"
              style={{
                flex: `0 0 calc(${100 / itemsPerPage}% - ${(24 * (itemsPerPage - 1)) / itemsPerPage}px)`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          {/* Autoplay Pause / Play Toggle & Live Status */}
          <div className="flex items-center space-x-3 text-xs font-bold text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center space-x-1.5"
              title={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
              <span className="hidden sm:inline text-[11px]">
                {isPlaying ? 'Auto-Live' : 'Paused'}
              </span>
            </button>

            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              Page {currentIndex + 1} of {totalPages}
            </span>
          </div>

          {/* Pagination Indicators Dots */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? 'w-8 bg-emerald-500 shadow-sm shadow-emerald-500/50'
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                }`}
                aria-label={`Go to slide page ${i + 1}`}
              />
            ))}
          </div>

          {/* Left / Right Arrow Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all shadow-sm active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all shadow-sm active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
