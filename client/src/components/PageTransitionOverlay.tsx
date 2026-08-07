import React from 'react';
import { Globe, Sparkles } from 'lucide-react';

interface PageTransitionOverlayProps {
  isLoading: boolean;
  isTransitioning: boolean;
  message?: string;
}

export const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({
  isLoading,
  isTransitioning,
  message = 'Loading Premier Trading & Sourcing Ecosystem...',
}) => {
  if (!isTransitioning) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-2xl text-white transition-opacity duration-500 ease-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-cyan-500/10 to-transparent pointer-events-none" />
      <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Main Loader Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Animated Brand Pulse Ring */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full border-2 border-emerald-500/30 animate-ping" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl shadow-emerald-500/30 flex items-center justify-center transform animate-gentle-float">
            <Globe className="w-8 h-8 text-slate-950 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-emerald-400 flex items-center justify-center shadow">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Brand Title */}
        <h2 className="text-2xl font-display font-black tracking-tight text-white mb-2">
          UNT <span className="text-emerald-400">Trading Hub</span>
        </h2>

        {/* Message */}
        <p className="text-xs sm:text-sm font-medium text-slate-300 mb-6 max-w-xs">
          {message}
        </p>

        {/* Smooth Loader Bar */}
        <div className="w-48 h-1.5 rounded-full bg-slate-800 overflow-hidden relative border border-slate-700/50">
          <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 animate-live-progress w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};
