import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Globe, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme, toggle } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError('');
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Invalid credentials. Access denied.');
      setLoading(false);
      return;
    }
    const isAdmin =
      data.user?.app_metadata?.role === 'admin' ||
      data.user?.user_metadata?.role === 'admin';
    if (!isAdmin) {
      await supabase.auth.signOut();
      setError('You do not have admin access.');
      setLoading(false);
    }
  };

  const inp = 'w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] bg-ambient-mesh flex items-center justify-center p-4 transition-colors">
      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors backdrop-blur-sm"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-emerald-200 shadow-md shadow-emerald-100/60 p-1.5">
            <img src="/images/logos/image.png" alt="UNT Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-slate-900 dark:text-white font-bold text-xl">UNT Admin Panel</h1>
          <p className="text-slate-500 dark:text-slate-500 text-sm">Restricted access — authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="stripe-glass-card rounded-2xl p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inp} placeholder="admin@untcompany.com" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inp} pr-10`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-2.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-shine w-full py-2.5 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 text-white dark:text-slate-900 font-bold text-sm transition-colors shadow-lg"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-slate-400 dark:text-slate-600 text-xs">
          This panel is not publicly accessible.
        </p>
      </div>
    </div>
  );
}
