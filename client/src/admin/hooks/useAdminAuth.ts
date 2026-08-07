import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import type { User } from '@supabase/supabase-js';

interface AdminAuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  recovering: boolean;
}

const isAdmin = (user: User | null) =>
  user?.app_metadata?.role === 'admin' || user?.user_metadata?.role === 'admin';

const toState = (user: User | null, token: string | null): AdminAuthState => ({
  user, token, loading: false, isAdmin: isAdmin(user), recovering: false,
});

// Module-level cache & listener set
let cache: AdminAuthState | null = null;
const listeners = new Set<(s: AdminAuthState) => void>();

function broadcast(s: AdminAuthState) {
  cache = s;
  listeners.forEach((fn) => fn(s));
}

// Bootstrap: getSession resolves from localStorage instantly (no network),
// then onAuthStateChange keeps it live for login/logout events.
if (supabase) {
  supabase.auth.getSession().then(({ data: { session } }) => {
    broadcast(toState(session?.user ?? null, session?.access_token ?? null));
  });

  supabase.auth.onAuthStateChange((event, session) => {
    const next = toState(session?.user ?? null, session?.access_token ?? null);
    broadcast(event === 'PASSWORD_RECOVERY' ? { ...next, recovering: true } : next);
  });
} else {
  cache = { user: null, token: null, loading: false, isAdmin: false, recovering: false };
}

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>(
    cache ?? { user: null, token: null, loading: true, isAdmin: false, recovering: false }
  );

  useEffect(() => {
    if (cache) setState(cache);
    listeners.add(setState);
    return () => { listeners.delete(setState); };
  }, []);

  return state;
}
