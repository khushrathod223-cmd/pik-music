import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles, QrCode } from 'lucide-react';
import { LiquidWaterGlassLogo } from './LiquidWaterGlassLogo';
import { GoogleSignInButton } from './GoogleSignInButton';
import { GuestButton } from './GuestButton';
import { AudioWaveform } from './AudioWaveform';
import { TermsModal } from './TermsModal';
import { GoogleAuthDialog } from './GoogleAuthDialog';
import { AddToPhoneModal } from './AddToPhoneModal';
import { AuthUser, GoogleUser, GuestUser } from '../types/auth';

// Studio background images generated to match the uploaded visual references
import bgLandscape from '../assets/images/bg_studio_landscape_1792052190890.jpg';
import bgPortrait from '../assets/images/bg_studio_portrait_1792052190766.jpg';

interface LoginScreenProps {
  onLoginSuccess: (user: AuthUser) => void;
}

type ViewMode = 'auto' | 'mobile' | 'landscape';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('auto');
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isGoogleDialogOpen, setIsGoogleDialogOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  // Handle Google Sign In click
  const handleGoogleClick = () => {
    setIsGoogleDialogOpen(true);
  };

  const handleGoogleSuccess = (googleUser: GoogleUser) => {
    setIsGoogleDialogOpen(false);
    onLoginSuccess(googleUser);
  };

  // Handle Continue as Guest click
  const handleGuestClick = () => {
    setIsGuestLoading(true);
    setTimeout(() => {
      const guestId = Math.floor(1000 + Math.random() * 9000);
      const guestUser: GuestUser = {
        id: `guest_${guestId}`,
        name: `Guest #${guestId}`,
        provider: 'guest',
      };
      setIsGuestLoading(false);
      onLoginSuccess(guestUser);
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white flex flex-col justify-between overflow-x-hidden select-none">
      {/* Background Image Layer (Responsive Portrait vs Landscape matching reference images) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Landscape backdrop */}
        <img
          src={bgLandscape}
          alt="Studio Background Landscape"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            viewMode === 'mobile' ? 'hidden' : 'hidden md:block opacity-85'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Portrait backdrop */}
        <img
          src={bgPortrait}
          alt="Studio Background Portrait"
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            viewMode === 'landscape' ? 'hidden' : 'block md:hidden opacity-90'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Fallback ambient neon gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/70" />
        <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-black/80" />
      </div>

      {/* Top Bar with Device Preview Switcher & Install on Phone */}
      <header className="relative z-20 w-full px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
          <span className="text-xs font-semibold tracking-wider text-cyan-200 uppercase">
            PiK Music SCuII
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct Download .APK button */}
          <a
            href="/pik-music-scui.apk"
            download="pik-music-scui.apk"
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#00e5ff] hover:bg-[#38bdf8] text-slate-950 border border-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.6)] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            title="Download .APK installer for your Android device"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .APK</span>
          </a>

          {/* QR code / phone guide modal trigger */}
          <button
            onClick={() => setIsPhoneModalOpen(true)}
            className="p-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-200 hover:text-white transition-colors cursor-pointer"
            title="Show Phone QR Code & Instructions"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Viewport switch mode */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
            <button
              onClick={() => setViewMode('auto')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'auto'
                  ? 'bg-[#00e5ff] text-slate-950 font-bold shadow-[0_0_8px_#00e5ff]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Auto detect responsive screen size"
            >
              <Sparkles className="w-3 h-3" />
              <span>Auto</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-[#00e5ff] text-slate-950 font-bold shadow-[0_0_8px_#00e5ff]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Force mobile portrait layout"
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setViewMode('landscape')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'landscape'
                  ? 'bg-[#00e5ff] text-slate-950 font-bold shadow-[0_0_8px_#00e5ff]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Force landscape split layout"
            >
              <Monitor className="w-3 h-3" />
              <span>Landscape</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Screen Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 py-4 sm:py-8 w-full max-w-6xl mx-auto">
        {/* Render condition based on screen size or manual preview mode */}
        {viewMode === 'landscape' ? (
          /* FORCED LANDSCAPE SPLIT LAYOUT (Reference Image 1) */
          <div className="w-full flex flex-row items-center justify-between gap-8 px-6 py-6">
            <div className="flex-1 flex justify-center items-center">
              <LiquidWaterGlassLogo size="large" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center max-w-md space-y-3">
              <GoogleSignInButton onClick={handleGoogleClick} />
              <GuestButton onClick={handleGuestClick} isLoading={isGuestLoading} />
              <div className="pt-2">
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="text-xs text-cyan-200/80 hover:text-white underline decoration-cyan-400/50 underline-offset-4 tracking-wider transition-colors cursor-pointer"
                >
                  Terms And Conditions
                </button>
              </div>
            </div>
          </div>
        ) : viewMode === 'mobile' ? (
          /* FORCED MOBILE PORTRAIT LAYOUT (Reference Image 2) */
          <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <LiquidWaterGlassLogo size="normal" />
            <AudioWaveform />
            <div className="w-full flex flex-col items-center space-y-3 pt-2">
              <GoogleSignInButton onClick={handleGoogleClick} />
              <GuestButton onClick={handleGuestClick} isLoading={isGuestLoading} />
            </div>
            <div className="pt-3">
              <button
                onClick={() => setIsTermsOpen(true)}
                className="text-xs text-cyan-200/80 hover:text-white underline decoration-cyan-400/50 underline-offset-4 tracking-wider transition-colors cursor-pointer"
              >
                Terms And Conditions
              </button>
            </div>
          </div>
        ) : (
          /* FLUID RESPONSIVE AUTO LAYOUT (Seamlessly matches both references based on viewport) */
          <div className="w-full">
            {/* Desktop / Landscape Viewport: Side-by-Side (Screenshot 1) */}
            <div className="hidden md:flex flex-row items-center justify-between gap-10 px-8 py-4">
              <div className="flex-1 flex justify-center items-center">
                <LiquidWaterGlassLogo size="large" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center max-w-md space-y-3">
                <GoogleSignInButton onClick={handleGoogleClick} />
                <GuestButton onClick={handleGuestClick} isLoading={isGuestLoading} />
                <div className="pt-3">
                  <button
                    onClick={() => setIsTermsOpen(true)}
                    className="text-xs text-cyan-200/80 hover:text-white underline decoration-cyan-400/50 underline-offset-4 tracking-wider transition-colors cursor-pointer"
                  >
                    Terms And Conditions
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile / Portrait Viewport: Stacked (Screenshot 2) */}
            <div className="flex md:hidden flex-col items-center justify-center space-y-4">
              <LiquidWaterGlassLogo size="normal" />
              <AudioWaveform />
              <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center space-y-3 pt-1">
                <GoogleSignInButton onClick={handleGoogleClick} />
                <GuestButton onClick={handleGuestClick} isLoading={isGuestLoading} />
              </div>
              <div className="pt-3">
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="text-xs text-cyan-200/80 hover:text-white underline decoration-cyan-400/50 underline-offset-4 tracking-wider transition-colors cursor-pointer"
                >
                  Terms And Conditions
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Subtle Bottom Floor Reflection Line */}
      <footer className="relative z-10 w-full pb-3 px-4 text-center">
        <p className="text-[11px] text-cyan-400/40 tracking-wider font-mono">
          PIK MUSIC SCUII &bull; ANDROID NATIVE SPECIFICATION
        </p>
      </footer>

      {/* Interactive Modals */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <GoogleAuthDialog
        isOpen={isGoogleDialogOpen}
        onClose={() => setIsGoogleDialogOpen(false)}
        onSuccess={handleGoogleSuccess}
      />
      <AddToPhoneModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />
    </div>
  );
};
