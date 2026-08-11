import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselSlider3DProps {
  children: React.ReactNode;
  autoPlayInterval?: number;
  className?: string;
}

const SWIPE_THRESHOLD = 45;
const HORIZONTAL_SWIPE_RATIO = 1.3;

const getSlideOffset = (index: number, activeIndex: number, total: number) => {
  let offset = index - activeIndex;
  if (offset < -1) offset += total;
  if (offset > 1) offset -= total;
  return offset;
};

const getSlideStyle = (offset: number): React.CSSProperties => {
  if (offset === 0) {
    return { transform: 'translate3d(0, -50%, 100px) scale(1) rotateY(0deg)', opacity: 1, zIndex: 40 };
  }
  if (offset === -1) {
    return { transform: 'translate3d(-58%, -50%, -40px) scale(0.85) rotateY(18deg)', opacity: 0.65, zIndex: 20, filter: 'brightness(0.85)' };
  }
  if (offset === 1) {
    return { transform: 'translate3d(58%, -50%, -40px) scale(0.85) rotateY(-18deg)', opacity: 0.65, zIndex: 20, filter: 'brightness(0.85)' };
  }
  return { transform: 'translate3d(0, -50%, -200px) scale(0.7) rotateY(0deg)', opacity: 0, zIndex: 0 };
};

export const CarouselSlider3D: React.FC<CarouselSlider3DProps> = ({
  children,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const slides = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    if (total > 1) setActiveIndex((previous) => (previous + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total > 1) setActiveIndex((previous) => (previous - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (activeIndex >= total && total > 0) setActiveIndex(total - 1);
  }, [activeIndex, total]);

  useEffect(() => {
    if (!isPlaying || total <= 1) return;
    const timer = window.setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPlaying, total, autoPlayInterval, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Only switch slide if horizontal swipe > 45px and primary horizontal gesture
    if (
      Math.abs(deltaX) > SWIPE_THRESHOLD
      && Math.abs(deltaX) > Math.abs(deltaY) * HORIZONTAL_SWIPE_RATIO
    ) {
      if (deltaX > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className={`relative w-full space-y-6 ${className}`}>
      {/* 3D Carousel Perspective Track Container (UI Initiative Style) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-[500px] sm:min-h-[580px] md:min-h-[600px] flex items-center justify-center perspective-1200 overflow-hidden py-4 touch-pan-y"
      >
        {slides.map((child, idx) => {
          const offset = getSlideOffset(idx, activeIndex, total);
          const isActive = offset === 0;

          return (
            <div
              key={idx}
              onClick={() => !isActive && setActiveIndex(idx)}
              onKeyDown={(event) => {
                if (!isActive && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  setActiveIndex(idx);
                }
              }}
              role={!isActive ? 'button' : undefined}
              tabIndex={!isActive && Math.abs(offset) === 1 ? 0 : -1}
              aria-label={!isActive ? `Show slide ${idx + 1}` : undefined}
              aria-hidden={Math.abs(offset) > 1}
              className={`absolute top-1/2 w-[84%] sm:w-full max-w-[320px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[500px] transition-all duration-700 ease-out ${
                isActive
                  ? 'pointer-events-auto cursor-default opacity-100 z-40'
                  : 'pointer-events-auto cursor-pointer hover:opacity-100 z-20 opacity-50 hover:scale-95'
              }`}
              style={{
                ...getSlideStyle(offset),
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Active Glow Ring Accent */}
              {isActive && (
                <div className="absolute -inset-1 rounded-[38px] bg-gradient-to-r from-emerald-500/30 via-cyan-400/20 to-emerald-500/30 blur-xl pointer-events-none animate-pulse" />
              )}
              <div className={`relative ${!isActive ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                {child}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Navigation Controls Bar (UI Initiative Carousel Bar) — Consistent 24px Breathing Gap */}
      <div className="flex items-center justify-between max-w-md mx-auto px-4 mt-6 relative z-40">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="w-11 h-11 rounded-full glass-circle-morphism flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-md group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Pagination Dots Indicator */}
        <div className="flex items-center space-x-2 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 dark:border-slate-800 shadow-inner">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-400 rounded-full ${activeIndex === idx
                ? 'w-7 h-2.5 bg-emerald-600 shadow-md shadow-emerald-500/40'
                : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                }`}
            />
          ))}
        </div>

        {/* AutoPlay Toggle Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause AutoPlay' : 'Play AutoPlay'}
          disabled={total <= 1}
          className="w-11 h-11 rounded-full glass-circle-morphism flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-md"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="w-11 h-11 rounded-full glass-circle-morphism flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-md group"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
