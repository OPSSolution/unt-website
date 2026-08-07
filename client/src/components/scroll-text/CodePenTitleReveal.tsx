import React, { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  staggerMs?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
}

export const CodePenTitleReveal: React.FC<Props> = ({
  text,
  className = '',
  staggerMs = 50,
  as: Component = 'div',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bi-directional scroll animation (re-animates when scrolling up or down into view)
        setIsRevealed(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <Component
      ref={containerRef as any}
      className={`relative inline-flex flex-wrap justify-center gap-x-[0.25em] gap-y-1 overflow-hidden py-1 ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <span
            className="inline-block transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform-gpu will-change-transform"
            style={{
              transitionDelay: `${isRevealed ? i * staggerMs : (words.length - 1 - i) * (staggerMs * 0.5)}ms`,
              transform: isRevealed ? 'translateY(0%) rotateX(0deg)' : 'translateY(115%) rotateX(-20deg)',
              opacity: isRevealed ? 1 : 0,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
