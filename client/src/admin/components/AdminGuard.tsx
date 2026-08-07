import React from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { LoginPage, PasswordRecoveryPage } from '../pages/LoginPage';

interface Props {
  children: React.ReactNode;
}

export function AdminGuard({ children }: Props) {
  const { loading, isAdmin, recovering } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center transition-colors">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (recovering) return <PasswordRecoveryPage />;
  if (!isAdmin) return <LoginPage />;

  return <>{children}</>;
}
