import React, { useEffect, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  speedMs?: number;
  autoRun?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
}

export const WaveReveal: React.FC<Props> = ({
  text,
  className = '',
  speedMs = 100,
  autoRun = true,
  as: Component = 'div',
}) => {
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    if (!autoRun) return;

    const timer = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % words.length);
    }, speedMs * 4);

    return () => clearInterval(timer);
  }, [words.length, speedMs, autoRun]);

  return (
    <Component className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const isActive = i === activeWordIdx;
        return (
          <span
            key={i}
            className={`inline-block transition-all duration-300 ${
              isActive
                ? 'text-emerald-500 dark:text-emerald-400 scale-105 font-black opacity-100'
                : 'text-slate-700 dark:text-slate-300 opacity-60 scale-100'
            }`}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
};
