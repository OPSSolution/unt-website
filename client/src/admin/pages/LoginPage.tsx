import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Eye, EyeOff, Sun, Moon, ArrowLeft, Mail, KeyRound } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [message, setMessage] = useState('');
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
    // On success: onAuthStateChange fires instantly, AdminGuard re-renders to the panel
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError('');
    setMessage('');
    setLoading(true);
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setMessage('If this email belongs to an account, a secure password reset link has been sent. Check the inbox and spam folder.');
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

        <form onSubmit={forgotMode ? handleForgotPassword : handleLogin} className="stripe-glass-card rounded-2xl p-6 space-y-4">
          {forgotMode && <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white"><Mail className="w-4 h-4 text-emerald-500" />Reset admin password</div>}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Email</label>
            <input type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inp} placeholder="admin@untcompany.com" />
          </div>

          {!forgotMode && <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
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
          </div>}

          {error && (
            <div className="px-4 py-2.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs">
              {error}
            </div>
          )}
          {message && <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs">{message}</div>}

          <button
            type="submit"
            disabled={loading}
            className="btn-shine w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/25"
          >
            {loading ? (forgotMode ? 'Sending...' : 'Verifying...') : (forgotMode ? 'Send Reset Link' : 'Sign In')}
          </button>
          <button type="button" onClick={() => { setForgotMode((value) => !value); setError(''); setMessage(''); }} className="w-full text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-center gap-1.5">
            {forgotMode ? <><ArrowLeft className="w-3.5 h-3.5" />Back to sign in</> : 'Forgot password?'}
          </button>
        </form>

        <p className="text-center text-slate-400 dark:text-slate-600 text-xs">
          This panel is not publicly accessible.
        </p>
      </div>
    </div>
  );
}

export function PasswordRecoveryPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    if (password.length < 8) return setError('Password must contain at least 8 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    setError('');
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) return setError(updateError.message);
    setMessage('Password updated successfully. You can now return to sign in.');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] bg-ambient-mesh flex items-center justify-center p-4">
      <form onSubmit={updatePassword} className="stripe-glass-card rounded-2xl p-6 space-y-4 w-full max-w-sm">
        <div className="text-center space-y-2"><KeyRound className="w-10 h-10 mx-auto text-emerald-500" /><h1 className="text-xl font-bold text-slate-900 dark:text-white">Create new password</h1><p className="text-xs text-slate-500">Use at least 8 characters.</p></div>
        <div className="relative"><input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-900 dark:text-white" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-2.5 text-slate-400">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
        <input type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white" />
        {error && <div className="px-4 py-2.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs">{error}</div>}
        {message && <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs">{message}</div>}
        {!message && <button type="submit" disabled={loading} className="btn-shine w-full py-2.5 rounded-full bg-emerald-600 disabled:opacity-50 text-white font-bold text-sm">{loading ? 'Updating...' : 'Update Password'}</button>}
        {message && <button type="button" onClick={() => supabase?.auth.signOut()} className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-bold text-sm">Return to Sign In</button>}
      </form>
    </div>
  );
}
