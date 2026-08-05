import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../supabaseClient';
import type { User } from '@supabase/supabase-js';

interface AdminAuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
}

const toState = (user: User | null, token: string | null): AdminAuthState => ({
  user,
  token,
  loading: false,
  isAdmin: user?.app_metadata?.role === 'admin' || user?.user_metadata?.role === 'admin',
});

// Module-level cache so multiple consumers share one resolved state
let cache: AdminAuthState | null = null;

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>(
    cache ?? { user: null, token: null, loading: true, isAdmin: false }
  );
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (!supabase) {
      cache = { user: null, token: null, loading: false, isAdmin: false };
      setState(cache);
      return;
    }

    if (cache && !cache.loading) {
      setState(cache);
    } else {
      supabase!.auth.getSession().then(({ data: { session } }) => {
        cache = toState(session?.user ?? null, session?.access_token ?? null);
        setState(cache);
      });
    }

    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      cache = toState(session?.user ?? null, session?.access_token ?? null);
      setState(cache);
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
