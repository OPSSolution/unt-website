import { useCallback, useSyncExternalStore } from 'react';

interface Resource<T> {
  value: T;
  subscribers: Set<() => void>;
  load: () => Promise<T | null>;
  inFlight: Promise<void> | null;
  lastLoadedAt: number;
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
    lastLoadedAt: 0,
  };
  resources.set(key, resource as Resource<unknown>);
  return resource;
}

export function useSharedResource<T>(key: string, load: () => Promise<T | null>, initialValue: T): T {
  const resource = getResource(key, load, initialValue);
  const subscribe = useCallback((notify: () => void) => {
      const isFirstSubscriber = resource.subscribers.size === 0;
      resource.subscribers.add(notify);
      // Refresh when this language becomes active again, while retaining zero
      // idle polling and deduplicating concurrent subscribers.
      if (isFirstSubscriber) {
        void refresh(resource);
      }
      const refreshWhenVisible = () => {
        if (document.visibilityState === 'visible') void refresh(resource);
      };
      const refreshAfterAdminUpdate = (event: StorageEvent) => {
        if (event.key === 'unt-content-updated') void refresh(resource);
      };
      window.addEventListener('focus', refreshWhenVisible);
      window.addEventListener('storage', refreshAfterAdminUpdate);
      document.addEventListener('visibilitychange', refreshWhenVisible);
      return () => {
        resource.subscribers.delete(notify);
        window.removeEventListener('focus', refreshWhenVisible);
        window.removeEventListener('storage', refreshAfterAdminUpdate);
        document.removeEventListener('visibilitychange', refreshWhenVisible);
      };
    }, [resource]);
  return useSyncExternalStore(
    subscribe,
    () => resource.value,
    () => resource.value,
  );
}
