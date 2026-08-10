import { useEffect, useRef, useCallback } from 'react';
import { useAdminStore } from '../store/useAdminStore';

/**
 * useAutoSave - Automatically saves data whenever it changes.
 * 
 * Integrates with the Zustand admin store so every input change is:
 *  1. Tracked in Redux DevTools (via Zustand devtools middleware)
 *  2. Auto-saved to the server after a debounce delay
 * 
 * @param sectionKey - Unique key identifying this editor section (e.g. 'about_page', 'navbar_footer')
 * @param data - The data to watch and save
 * @param saveFn - Async function that performs the actual save
 * @param delay - Debounce delay in ms (default: 1500ms)
 * @param enabled - Whether auto-save is active (e.g. false until data is loaded)
 */
export function useAutoSave<T>(
  sectionKey: string,
  data: T | null,
  saveFn: (data: T) => Promise<void>,
  delay = 1500,
  enabled = true
) {
  // Zustand store integration
  const storeSaveStates = useAdminStore((s) => s.saveStates[sectionKey]);
  const autoSaveEnabled = useAdminStore((s) => s.autoSaveEnabled);
  const setData = useAdminStore((s) => s.setData);
  const markDirty = useAdminStore((s) => s.markDirty);
  const setSaving = useAdminStore((s) => s.setSaving);
  const markSaved = useAdminStore((s) => s.markSaved);
  const setError = useAdminStore((s) => s.setError);

  const saveFnRef = useRef(saveFn);
  const dataRef = useRef(data);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoadedRef = useRef(false);
  const isSavingRef = useRef(false);
  const pendingDataRef = useRef<T | null>(null);
  const prevStoreDataStrRef = useRef<string>('');
  const prevSaveDataStrRef = useRef<string>('');

  // A language-specific editor changes its section key without necessarily
  // unmounting. Reset the baseline so freshly loaded translated content is
  // never mistaken for a user edit in the previous language.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    hasLoadedRef.current = false;
    pendingDataRef.current = null;
    prevStoreDataStrRef.current = '';
    prevSaveDataStrRef.current = '';
  }, [sectionKey]);

  // Keep refs in sync
  useEffect(() => { saveFnRef.current = saveFn; }, [saveFn]);
  useEffect(() => { dataRef.current = data; }, [data]);

  // Manual saves happen in EditorShell. Only the currently mounted editor
  // receives this event, so its dirty state can be cleared without coupling
  // every page's save handler to the store implementation.
  useEffect(() => {
    const acknowledgeManualSave = () => markSaved(sectionKey);
    window.addEventListener('unt-admin-manual-save-success', acknowledgeManualSave);
    return () => window.removeEventListener('unt-admin-manual-save-success', acknowledgeManualSave);
  }, [sectionKey, markSaved]);

  // Mark as loaded once data is first provided (non-null) AND enabled is true.
  // Syncing data into the zustand store makes it visible in Redux DevTools.
  // Uses deep comparison so the store is only updated when the actual content
  // changes — preventing infinite re-render loops.
  useEffect(() => {
    if (enabled && data !== null && data !== undefined) {
      hasLoadedRef.current = true;
      const dataStr = JSON.stringify(data);
      if (dataStr !== prevStoreDataStrRef.current) {
        prevStoreDataStrRef.current = dataStr;
        setData(sectionKey, data);
      }
    }
  }, [data, sectionKey, setData, enabled]);

  const doSave = useCallback(async (dataToSave: T) => {
    if (isSavingRef.current) {
      // If a save is in progress, queue the latest data
      pendingDataRef.current = dataToSave;
      return;
    }
    isSavingRef.current = true;
    setSaving(sectionKey, true);
    setError(sectionKey, '');
    try {
      await saveFnRef.current(dataToSave);
      markSaved(sectionKey);
    } catch (e: any) {
      setError(sectionKey, e.message ?? 'Auto-save failed');
    } finally {
      setSaving(sectionKey, false);
      isSavingRef.current = false;
      // If new data arrived while saving, save it now
      if (pendingDataRef.current !== null) {
        const next = pendingDataRef.current;
        pendingDataRef.current = null;
        doSave(next);
      }
    }
  }, [sectionKey, setSaving, setError, markSaved]);

  // Watch for data changes, mark dirty in store, and debounce-save.
  // Uses deep comparison (JSON.stringify) so the effect only fires when
  // the actual data content changes — not when the object reference changes.
  useEffect(() => {
    if (!enabled || !hasLoadedRef.current || data === null || data === undefined) return;

    const dataStr = JSON.stringify(data);
    // Establish the loaded server value as the baseline. Loading or changing
    // language is not an edit and must never write data back automatically.
    if (prevSaveDataStrRef.current === '') {
      prevSaveDataStrRef.current = dataStr;
      return;
    }
    const changed = dataStr !== prevSaveDataStrRef.current;
    if (changed) {
      prevSaveDataStrRef.current = dataStr;
      markDirty(sectionKey, true);
    }

    // Keep tracking edits while disabled, but never send them until the user
    // clicks Save Changes or turns auto-save back on.
    if (!autoSaveEnabled) return;
    if (!changed && !storeSaveStates?.dirty) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      doSave(data);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, enabled, autoSaveEnabled, storeSaveStates?.dirty, delay, doSave, sectionKey, markDirty]);

  // Cancel pending work on unmount. Do not save here: a language switch
  // updates the global language before the old editor unmounts, which could
  // otherwise write the old language's values into the newly selected slot.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const saving = storeSaveStates?.saving ?? false;
  const saved = storeSaveStates?.saved ?? false;
  const error = storeSaveStates?.error ?? '';
  const dirty = storeSaveStates?.dirty ?? false;

  return { saving, saved, error, dirty, autoSaving: saving, autoSaved: saved, autoSaveError: error, autoSaveEnabled };
}
