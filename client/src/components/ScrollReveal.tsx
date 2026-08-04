import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'up',
  delay = 0,
  duration = 850,
  className = '',
  threshold = 0.12,
  once = true,
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('is-revealed');
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const animClass = `reveal-${animation}`;
  const customStyle: React.CSSProperties = {
    ...style,
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${animClass} ${className}`}
      style={customStyle}
    >
      {children}
    </div>
  );
};

// Custom Hook to auto-observe any element with class `.reveal-on-scroll`
export const useScrollReveal = (dep?: any) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [dep]);
};
