import React, { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
}

export const CodePenScrollReveal: React.FC<Props> = ({
  text,
  className = '',
  as: Component = 'div',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dynamic bi-directional intersection state for scroll up & down
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const updateScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate active relative scroll position (0 = below viewport, 0.5+ = active viewport center, 1 = above viewport)
      const progress = Math.min(Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)), 1);
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const words = text.split(' ');

  return (
    <Component
      ref={containerRef as any}
      className={`inline-flex flex-wrap justify-center gap-x-[0.26em] gap-y-1 ${className}`}
    >
      {words.map((word, i) => {
        const wordThreshold = (i / words.length) * 0.45 + 0.05;
        const wordActive = isIntersecting && scrollProgress > wordThreshold;
        return (
          <span
            key={i}
            className="inline-block transition-all duration-500 ease-out will-change-transform"
            style={{
              transitionDelay: `${wordActive ? i * 20 : 0}ms`,
              opacity: wordActive ? 1 : 0.25,
              transform: wordActive ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
            }}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
};
