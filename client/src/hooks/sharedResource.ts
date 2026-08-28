import { useCallback, useSyncExternalStore } from 'react';

interface Resource<T> {
  value: T;
  subscribers: Set<() => void>;
  load: () => Promise<T | null>;
  inFlight: Promise<void> | null;
  refreshPending: boolean;
  lastLoadedAt: number;
}

const resources = new Map<string, Resource<unknown>>();

function refresh<T>(resource: Resource<T>, forceAfterCurrent = false) {
  if (resource.inFlight) {
    if (forceAfterCurrent) resource.refreshPending = true;
    return resource.inFlight;
  }
  resource.inFlight = resource.load()
    .then((value) => {
      resource.lastLoadedAt = Date.now();
      if (value !== null) {
        resource.value = value;
        resource.subscribers.forEach((notify) => notify());
      }
    })
    .finally(() => {
      resource.inFlight = null;
      if (resource.refreshPending) {
        resource.refreshPending = false;
        void refresh(resource);
      }
    });
  return resource.inFlight;
}

function getResource<T>(key: string, load: () => Promise<T | null>, initialValue: T) {
  const existing = resources.get(key) as Resource<T> | undefined;
  if (existing) return existing;
  const resource: Resource<T> = {
    value: initialValue, subscribers: new Set(), load, inFlight: null,
    lastLoadedAt: 0, refreshPending: false,
  };
  resources.set(key, resource as Resource<unknown>);
  return resource;
}

export function useSharedResource<T>(key: string, load: () => Promise<T | null>, initialValue: T, pollMs?: number): T {
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
        if (event.key === 'unt-content-updated') void refresh(resource, true);
      };
      const refreshInCurrentTab = () => { void refresh(resource, true); };
      window.addEventListener('focus', refreshWhenVisible);
      window.addEventListener('storage', refreshAfterAdminUpdate);
      window.addEventListener('unt-content-updated', refreshInCurrentTab);
      document.addEventListener('visibilitychange', refreshWhenVisible);
      // Opt-in polling for values that change outside this browser (e.g. a
      // visitor counter incremented by other visitors' sessions).
      const pollId = pollMs ? window.setInterval(() => {
        if (document.visibilityState === 'visible') void refresh(resource);
      }, pollMs) : undefined;
      return () => {
        resource.subscribers.delete(notify);
        window.removeEventListener('focus', refreshWhenVisible);
        window.removeEventListener('storage', refreshAfterAdminUpdate);
        window.removeEventListener('unt-content-updated', refreshInCurrentTab);
        document.removeEventListener('visibilitychange', refreshWhenVisible);
        if (pollId) window.clearInterval(pollId);
      };
    }, [resource, pollMs]);
  return useSyncExternalStore(
    subscribe,
    () => resource.value,
    () => resource.value,
  );
}
