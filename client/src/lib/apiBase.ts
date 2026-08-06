function resolveApiBase() {
  const configured = import.meta.env.VITE_API_URL?.trim();

  if (configured) {
    try {
      const url = new URL(configured);
      const isLoopback = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1';

      // A deployed browser must never call its own loopback interface. The
      // Express server hosts both the UI and API, so same-origin is correct.
      if (!(import.meta.env.PROD && isLoopback)) {
        return configured.replace(/\/$/, '');
      }
    } catch {
      // Relative values are valid same-origin API prefixes.
      return configured.replace(/\/$/, '');
    }
  }

  return import.meta.env.DEV ? 'http://localhost:5000' : '';
}

export const API_BASE = resolveApiBase();
