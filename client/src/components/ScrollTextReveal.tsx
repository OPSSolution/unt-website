import React from 'react';
import { CodePenTitleReveal } from './scroll-text/CodePenTitleReveal';
import { CodePenScrollReveal } from './scroll-text/CodePenScrollReveal';
import { TypewriterReveal } from './scroll-text/TypewriterReveal';
import { WaveReveal } from './scroll-text/WaveReveal';

export interface ScrollTextRevealProps {
  text: string;
  mode?: 'codepen-title' | 'codepen-scroll' | 'typewriter' | 'wave' | 'gradient';
  className?: string;
  staggerMs?: number;
  speedMs?: number;
  autoRun?: boolean;
  loop?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
}

export const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
  text,
  mode = 'codepen-title',
  className = '',
  staggerMs = 50,
  speedMs = 70,
  autoRun = false,
  loop = false,
  as = 'div',
}) => {
  switch (mode) {
    case 'codepen-title':
      return <CodePenTitleReveal text={text} className={className} staggerMs={staggerMs} as={as} />;
    case 'codepen-scroll':
      return <CodePenScrollReveal text={text} className={className} as={as} />;
    case 'typewriter':
      return <TypewriterReveal text={text} className={className} speedMs={speedMs} autoRun={autoRun} loop={loop} as={as} />;
    case 'wave':
      return <WaveReveal text={text} className={className} speedMs={speedMs} autoRun={autoRun} as={as} />;
    case 'gradient':
    default:
      return (
        <span className={`relative inline-block transition-all duration-1000 ${className}`}>
          <span className="bg-gradient-to-r from-emerald-600 via-cyan-500 to-emerald-400 dark:from-emerald-400 dark:via-cyan-300 dark:to-emerald-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-marquee">
            {text}
          </span>
        </span>
      );
  }
};

export { CodePenTitleReveal, CodePenScrollReveal, TypewriterReveal, WaveReveal };
