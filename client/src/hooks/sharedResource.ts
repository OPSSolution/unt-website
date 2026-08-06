import { useCallback, useSyncExternalStore } from 'react';

const REFRESH_MS = 5 * 60 * 1000;
const FOCUS_STALE_MS = 60 * 1000;

interface Resource<T> {
  value: T;
  subscribers: Set<() => void>;
  load: () => Promise<T | null>;
  inFlight: Promise<void> | null;
  lastLoadedAt: number;
  intervalId: number | null;
  onFocus: () => void;
  onVisible: () => void;
}

const resources = new Map<string, Resource<unknown>>();

function refresh<T>(resource: Resource<T>) {
  if (resource.inFlight) return resource.inFlight;
  resource.inFlight = resource.load()
    .then((value) => {
      resource.lastLoadedAt = Date.now();
      if (value !== null) {
        resource.value = value;
        resource.subscribers.forEach((notify) => notify());
      }
    })
    .finally(() => { resource.inFlight = null; });
  return resource.inFlight;
}

function getResource<T>(key: string, load: () => Promise<T | null>, initialValue: T) {
  const existing = resources.get(key) as Resource<T> | undefined;
  if (existing) return existing;
  const resource: Resource<T> = {
    value: initialValue, subscribers: new Set(), load, inFlight: null,
    lastLoadedAt: 0, intervalId: null, onFocus: () => {}, onVisible: () => {},
  };
  const refreshIfStale = () => {
    if (Date.now() - resource.lastLoadedAt >= FOCUS_STALE_MS) void refresh(resource);
  };
  resource.onFocus = refreshIfStale;
  resource.onVisible = () => {
    if (document.visibilityState === 'visible') refreshIfStale();
  };
  resources.set(key, resource as Resource<unknown>);
  return resource;
}

export function useSharedResource<T>(key: string, load: () => Promise<T | null>, initialValue: T): T {
  const resource = getResource(key, load, initialValue);
  const subscribe = useCallback((notify: () => void) => {
      resource.subscribers.add(notify);
      if (resource.subscribers.size === 1) {
        void refresh(resource);
        resource.intervalId = window.setInterval(() => void refresh(resource), REFRESH_MS);
        window.addEventListener('focus', resource.onFocus);
        document.addEventListener('visibilitychange', resource.onVisible);
      }
      return () => {
        resource.subscribers.delete(notify);
        if (resource.subscribers.size === 0) {
          if (resource.intervalId !== null) window.clearInterval(resource.intervalId);
          resource.intervalId = null;
          window.removeEventListener('focus', resource.onFocus);
          document.removeEventListener('visibilitychange', resource.onVisible);
        }
      };
    }, [resource]);
  return useSyncExternalStore(
    subscribe,
    () => resource.value,
    () => resource.value,
  );
}
