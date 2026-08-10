import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Centralized admin store using Zustand with Redux DevTools integration.
 * 
 * The `devtools` middleware connects to the Redux DevTools browser extension,
 * so all state changes (including every admin input) are visible/traceable there.
 * 
 * Each editor section stores its own data + save state.
 * The auto-save hook (`useAutoSave`) reads/writes to this store so that
 * every admin input is both:
 *  1. Persisted to the server (debounced auto-save)
 *  2. Tracked in Redux DevTools (via Zustand devtools middleware)
 */

export type SaveState = {
  dirty: boolean;
  saving: boolean;
  saved: boolean;
  error: string;
  lastSavedAt?: number;
};

const initialSaveState: SaveState = {
  dirty: false,
  saving: false,
  saved: false,
  error: '',
};

interface AdminStore {
  /** Global admin preference. Persisted locally for the current browser. */
  autoSaveEnabled: boolean;
  setAutoSaveEnabled: (enabled: boolean) => void;
  // ── Editor data (keyed by section name) ──────────────────────────────
  /** Stores the latest data snapshot per editor section key */
  data: Record<string, any>;

  /** Stores save-state flags per editor section key */
  saveStates: Record<string, SaveState>;

  // ── Actions ──────────────────────────────────────────────────────────
  /** Set the data for a specific editor section */
  setData: (key: string, data: any) => void;

  /** Update a single field within a section's data */
  updateField: (key: string, field: string, value: any) => void;

  /** Mark a section as dirty (has unsaved changes) */
  markDirty: (key: string, dirty?: boolean) => void;

  /** Set the saving flag for a section */
  setSaving: (key: string, saving: boolean) => void;

  /** Mark a section as successfully saved */
  markSaved: (key: string) => void;

  /** Set an error for a section */
  setError: (key: string, error: string) => void;

  /** Clear all state for a section (e.g. on page unmount) */
  resetSection: (key: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  devtools(
    (set) => ({
      data: {},
      saveStates: {},
      autoSaveEnabled: typeof window === 'undefined' ? true : localStorage.getItem('unt-admin-auto-save') !== 'false',

      setAutoSaveEnabled: (enabled) => {
        if (typeof window !== 'undefined') localStorage.setItem('unt-admin-auto-save', String(enabled));
        set({ autoSaveEnabled: enabled }, false, `admin:autoSave:${enabled}`);
      },

      setData: (key, data) =>
        set(
          (state) => ({
            data: { ...state.data, [key]: data },
            saveStates: {
              ...state.saveStates,
              [key]: {
                ...(state.saveStates[key] ?? initialSaveState),
                dirty: false,
                saved: false,
              },
            },
          }),
          false,
          `admin:setData:${key}`
        ),

      updateField: (key, field, value) =>
        set(
          (state) => ({
            data: {
              ...state.data,
              [key]: {
                ...(state.data[key] ?? {}),
                [field]: value,
              },
            },
            saveStates: {
              ...state.saveStates,
              [key]: {
                ...(state.saveStates[key] ?? initialSaveState),
                dirty: true,
              },
            },
          }),
          false,
          `admin:updateField:${key}.${field}`
        ),

      markDirty: (key, dirty = true) =>
        set(
          (state) => ({
            saveStates: {
              ...state.saveStates,
              [key]: {
                ...(state.saveStates[key] ?? initialSaveState),
                dirty,
              },
            },
          }),
          false,
          `admin:markDirty:${key}:${dirty}`
        ),

      setSaving: (key, saving) =>
        set(
          (state) => ({
            saveStates: {
              ...state.saveStates,
              [key]: {
                ...(state.saveStates[key] ?? initialSaveState),
                saving,
              },
            },
          }),
          false,
          `admin:setSaving:${key}:${saving}`
        ),

      markSaved: (key) =>
        set(
          (state) => ({
            saveStates: {
              ...state.saveStates,
              [key]: {
                ...(state.saveStates[key] ?? initialSaveState),
                dirty: false,
                saving: false,
                saved: true,
                error: '',
                lastSavedAt: Date.now(),
              },
            },
          }),
          false,
          `admin:markSaved:${key}`
        ),

      setError: (key, error) =>
        set(
          (state) => ({
            saveStates: {
              ...state.saveStates,
              [key]: {
                ...(state.saveStates[key] ?? initialSaveState),
                error,
                saving: false,
              },
            },
          }),
          false,
          `admin:setError:${key}`
        ),

      resetSection: (key) =>
        set(
          (state) => {
            const { [key]: _removedData, ...restData } = state.data;
            const { [key]: _removedSave, ...restSaves } = state.saveStates;
            return { data: restData, saveStates: restSaves };
          },
          false,
          `admin:reset:${key}`
        ),
    }),
    { name: 'UNT Admin Store' }
  )
);
