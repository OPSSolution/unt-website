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
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
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
      className={`relative inline-flex flex-wrap justify-center gap-x-[0.25em] gap-y-1 py-1 ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block py-0.5">
          <span
            className="inline-block transition-[transform,opacity] duration-500 ease-out transform-gpu"
            style={{
              transitionDelay: `${isRevealed ? i * Math.min(staggerMs, 35) : 0}ms`,
              transform: isRevealed ? 'translateY(0)' : 'translateY(8px)',
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
