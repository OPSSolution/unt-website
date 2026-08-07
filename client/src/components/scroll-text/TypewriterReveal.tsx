import React, { useEffect, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  speedMs?: number;
  autoRun?: boolean;
  loop?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
}

export const TypewriterReveal: React.FC<Props> = ({
  text,
  className = '',
  speedMs = 70,
  autoRun = true,
  loop = true,
  as: Component = 'div',
}) => {
  const [typedIndex, setTypedIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!autoRun) return;

    const timer = setInterval(() => {
      if (!isDeleting) {
        if (typedIndex < text.length) {
          setTypedIndex((prev) => prev + 1);
        } else if (loop) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (typedIndex > 0) {
          setTypedIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? speedMs * 0.5 : speedMs);

    return () => clearInterval(timer);
  }, [text, typedIndex, isDeleting, speedMs, loop, autoRun]);

  const displayText = text.slice(0, typedIndex);

  return (
    <Component className={`inline-block font-display tracking-tight ${className}`}>
      <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-emerald-100 dark:to-slate-100 bg-clip-text text-transparent">
        {displayText}
      </span>
      <span className="inline-block w-[3px] h-[0.9em] ml-1 bg-emerald-500 animate-pulse rounded-full align-middle" />
    </Component>
  );
};
