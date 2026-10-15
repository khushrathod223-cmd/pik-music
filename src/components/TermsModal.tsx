import React from 'react';
import { X, ShieldCheck, Music, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 text-slate-200 overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(8, 20, 48, 0.95) 0%, rgba(3, 10, 25, 0.98) 100%)',
          border: '1.5px solid rgba(0, 229, 255, 0.4)',
          boxShadow: '0 0 35px rgba(0, 229, 255, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Top ambient glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="font-display font-bold text-xl text-white tracking-wide">
              Terms & Conditions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-sm leading-relaxed text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
            <Music className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">PiK Music SCuII Services</p>
              <p className="text-xs text-slate-400 mt-0.5">
                By signing in with Google or continuing as a guest, you gain access to the streaming audio player, custom equalization presets, and curated neon audio tracks.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-cyan-200">1. User Accounts & Guest Sessions</h4>
            <p className="text-xs text-slate-400">
              Users may sign in using their verified Google Account or explore via a Guest session. Guest sessions maintain temporary playlists on device storage without synchronizing across external devices.
            </p>

            <h4 className="font-semibold text-cyan-200">2. Privacy & Data Protection</h4>
            <p className="text-xs text-slate-400">
              We respect your privacy. No audio recordings or personal biometric details are stored. Google Sign-In requests only basic identity information (name, email, and avatar) to personalize your listening experience.
            </p>

            <h4 className="font-semibold text-cyan-200">3. Audio Licensing & Fair Use</h4>
            <p className="text-xs text-slate-400">
              All music tracks, stem mixers, and sound visualizations rendered inside PiK Music SCuII are licensed for personal, non-commercial entertainment.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400/80">
            <ShieldCheck className="w-4 h-4 text-[#00e5ff]" />
            <span>Encrypted & Protected</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-semibold text-sm text-slate-900 bg-[#00e5ff] hover:bg-[#38bdf8] transition-colors shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
};
