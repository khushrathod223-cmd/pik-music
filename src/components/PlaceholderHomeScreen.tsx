import React from 'react';
import { LogOut, UserCheck, Shield, Clock } from 'lucide-react';
import { AuthUser } from '../types/auth';

interface PlaceholderHomeScreenProps {
  user: AuthUser;
  onSignOut: () => void;
}

export const PlaceholderHomeScreen: React.FC<PlaceholderHomeScreenProps> = ({
  user,
  onSignOut,
}) => {
  const isGoogle = user.provider === 'google';

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className="w-full max-w-md rounded-2xl p-6 sm:p-8 relative z-10 text-center"
        style={{
          background: 'rgba(8, 20, 48, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(0, 229, 255, 0.4)',
          boxShadow: '0 0 35px rgba(0, 229, 255, 0.2)',
        }}
      >
        {/* App Title */}
        <h1 className="text-2xl font-bold font-display text-white tracking-wider glow-cyan">
          PiK Music SCuII
        </h1>

        {/* Temporary Placeholder Badge */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
          <Shield className="w-3.5 h-3.5" />
          <span>Temporary Placeholder Screen</span>
        </div>

        {/* Status card */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0072ff] to-[#00e5ff] flex items-center justify-center text-slate-950 font-bold text-lg shadow-md shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white truncate">{user.name}</span>
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
              <p className="text-xs text-slate-400 truncate">
                {isGoogle ? (user as any).email : 'Guest Explorer Session'}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Session Status
            </span>
            <span className="font-mono text-emerald-400 uppercase tracking-wider">Active</span>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Auth Mode</span>
            <span className="font-medium text-slate-200 capitalize">
              {isGoogle ? 'Verified Google OAuth' : 'Guest Pass'}
            </span>
          </div>
        </div>

        {/* Notice regarding final design */}
        <p className="mt-5 text-xs text-slate-400 leading-relaxed px-2">
          Authentication successful. As requested, no destination home screen has been invented. This temporary screen holds the active session until the final home screen design is provided.
        </p>

        {/* Return / Sign Out Button */}
        <button
          onClick={onSignOut}
          className="mt-6 w-full py-3 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-[#00e5ff] hover:bg-[#38bdf8] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Return to Login</span>
        </button>
      </div>
    </div>
  );
};
