import { useState, useEffect, useCallback } from 'react';

interface PageTransitionOptions {
  minDurationMs?: number;
  autoComplete?: boolean;
}

export function usePageTransition(options: PageTransitionOptions = {}) {
  const { minDurationMs = 600, autoComplete = true } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const finishTransition = useCallback(() => {
    setIsLoading(false);
    // Give time for fade-out CSS transition before removing DOM overlay
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!autoComplete) return;

    const startTime = Date.now();
    let isMounted = true;

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDurationMs - elapsed);

      setTimeout(() => {
        if (isMounted) {
          finishTransition();
        }
      }, remaining);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('load', handleLoad);
    };
  }, [minDurationMs, autoComplete, finishTransition]);

  return {
    isLoading,
    isTransitioning,
    finishTransition,
  };
}
