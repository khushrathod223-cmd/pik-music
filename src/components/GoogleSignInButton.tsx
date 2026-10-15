import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onClick,
  isLoading = false,
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);

    onClick();
  };

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[400px] flex items-center justify-center my-2 group">
      {/* Outer Water Splash & Droplet SVG Garland (cresting around the capsule border) */}
      <svg
        className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none overflow-visible select-none z-10"
        viewBox="0 0 420 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="splashGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Top droplets and splash crests */}
        <g filter="url(#splashGlow)">
          {/* Top Left splashes */}
          <circle cx="55" cy="8" r="4.5" fill="#e0f2fe" stroke="#00e5ff" strokeWidth="1.5" />
          <circle cx="35" cy="14" r="3" fill="#bae6fd" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="78" cy="4" r="3.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
          <path
            d="M 45 22 Q 52 10 58 18 Q 65 8 72 20"
            stroke="#00e5ff"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Top Center-Right splashes */}
          <circle cx="340" cy="6" r="4" fill="#e0f2fe" stroke="#00e5ff" strokeWidth="1.5" />
          <circle cx="365" cy="12" r="3" fill="#ffffff" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="385" cy="18" r="4.5" fill="#bae6fd" stroke="#00e5ff" strokeWidth="1.5" />
          <circle cx="315" cy="8" r="2.5" fill="#ffffff" />
          <path
            d="M 325 20 Q 338 6 350 18 Q 365 7 378 22"
            stroke="#00e5ff"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom droplets & splashes */}
          <circle cx="60" cy="82" r="3" fill="#38bdf8" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="85" cy="85" r="3.5" fill="#ffffff" stroke="#00e5ff" strokeWidth="1.2" />
          <circle cx="330" cy="84" r="3.5" fill="#e0f2fe" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="355" cy="80" r="2.5" fill="#ffffff" />
          <circle cx="30" cy="60" r="3.5" fill="#bae6fd" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="395" cy="55" r="4" fill="#e0f2fe" stroke="#00e5ff" strokeWidth="1.2" />
        </g>
      </svg>

      {/* Atmospheric blue back-glow */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00e5ff]/50 via-[#0072ff]/40 to-[#00e5ff]/50 blur-lg opacity-85 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Main Liquid Glass Button */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        aria-label="Sign in with Google"
        className="relative w-full h-[62px] sm:h-[66px] rounded-full px-6 flex items-center justify-between text-white font-semibold text-lg tracking-wide overflow-hidden transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
        style={{
          background:
            'linear-gradient(180deg, rgba(56, 189, 248, 0.45) 0%, rgba(2, 132, 199, 0.75) 45%, rgba(3, 105, 161, 0.85) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '2px solid rgba(0, 229, 255, 0.95)',
          boxShadow:
            '0 0 25px rgba(0, 229, 255, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.85), inset 0 -3px 8px rgba(0, 30, 80, 0.6)',
        }}
      >
        {/* Shimmering caustic overlay */}
        <div className="absolute inset-0 liquid-sheen pointer-events-none opacity-40" />

        {/* Top liquid reflection rim */}
        <div className="absolute top-1 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        {/* Dynamic Water Click Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none bg-cyan-200/40 border border-white/60 animate-ripple"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}

        {/* Left: Authentic 4-Color Google Logo */}
        <div className="relative z-10 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.7)] shrink-0 mr-3">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.09C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.41l4.04-3.09z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.59l4.04 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
            />
          </svg>
        </div>

        {/* Center: Sign in with Google text */}
        <span
          className="relative z-10 flex-1 text-center font-display font-semibold text-lg sm:text-xl text-white tracking-wide"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 0 15px rgba(0,229,255,0.7)',
          }}
        >
          {isLoading ? 'Connecting...' : 'Sign in with Google'}
        </span>

        {/* Right: Glow Arrow */}
        <div className="relative z-10 w-9 h-9 flex items-center justify-center shrink-0 ml-2">
          <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1 duration-200 drop-shadow-[0_0_8px_#ffffff]" />
        </div>
      </button>
    </div>
  );
};
