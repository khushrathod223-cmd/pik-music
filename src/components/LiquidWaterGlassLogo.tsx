import React from 'react';

interface LiquidWaterGlassLogoProps {
  className?: string;
  size?: 'normal' | 'compact' | 'large';
}

export const LiquidWaterGlassLogo: React.FC<LiquidWaterGlassLogoProps> = ({
  className = '',
  size = 'normal',
}) => {
  const scale = size === 'large' ? 'scale-110' : size === 'compact' ? 'scale-90' : 'scale-100';

  return (
    <div className={`relative flex flex-col items-center select-none ${scale} ${className}`}>
      {/* SVG Filters for 3D Liquid Glass & Water Refraction */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          {/* Linear Gradients for Liquid Glass */}
          <linearGradient id="pikGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#a855f7" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="scuiGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.98" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.92" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="dropletGrad" x1="20%" y1="20%" x2="80%" y2="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#67e8f9" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>

          {/* Liquid Glass Glow Filter */}
          <filter id="neonLiquidGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Main Logo Composition */}
      <div className="relative">
        {/* Floating background ambient water caustics */}
        <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/20 via-cyan-400/25 to-blue-500/15 blur-2xl rounded-full pointer-events-none" />

        {/* Top Row: "PiK" + script "music" */}
        <div className="relative flex items-baseline justify-center">
          {/* PiK letters with 3D glass, water drops, and purple-blue luster */}
          <div className="relative flex items-baseline tracking-tighter">
            {/* Splash droplet on top of P */}
            <div className="absolute -top-3 left-2 w-3.5 h-4 bg-gradient-to-br from-white via-cyan-200 to-blue-500 rounded-full blur-[0.5px] shadow-[0_0_8px_#00e5ff] animate-droplet" />
            <div className="absolute -top-1 left-7 w-2 h-2.5 bg-cyan-200/90 rounded-full shadow-[0_0_5px_#38bdf8]" />

            {/* P */}
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-200 via-purple-400 to-cyan-400 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.85)] drop-shadow-[0_0_35px_rgba(0,229,255,0.7)] relative"
              style={{
                WebkitTextStroke: '1.5px rgba(224, 242, 254, 0.9)',
                textShadow: '0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(124, 58, 237, 0.6)',
              }}
            >
              P
            </span>

            {/* i */}
            <div className="relative inline-flex flex-col items-center">
              {/* Droplet dot on i */}
              <span className="w-4 h-4 rounded-full bg-gradient-to-b from-white via-cyan-300 to-blue-600 shadow-[0_0_12px_#00e5ff] border border-cyan-100" />
              <span
                className="text-6xl sm:text-7xl md:text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-cyan-100 via-blue-400 to-cyan-400 filter drop-shadow-[0_0_20px_rgba(0,229,255,0.8)]"
                style={{
                  WebkitTextStroke: '1.5px rgba(224, 242, 254, 0.9)',
                }}
              >
                ı
              </span>
            </div>

            {/* K */}
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-200 via-blue-500 to-cyan-300 filter drop-shadow-[0_0_18px_rgba(0,229,255,0.8)] relative"
              style={{
                WebkitTextStroke: '1.5px rgba(224, 242, 254, 0.9)',
                textShadow: '0 0 25px rgba(0, 229, 255, 0.9), 0 0 45px rgba(79, 70, 229, 0.6)',
              }}
            >
              K
            </span>

            {/* Droplets near K */}
            <div className="absolute top-1/4 -right-2 w-2.5 h-3 bg-cyan-200 rounded-full shadow-[0_0_6px_#00e5ff] animate-droplet" />
            <div className="absolute -bottom-1 -right-3 w-3 h-3 bg-blue-300 rounded-full shadow-[0_0_8px_#38bdf8]" />
          </div>

          {/* "music" in stylized cyan neon script font */}
          <div className="relative ml-2 sm:ml-3 -mb-2 sm:-mb-3">
            <span
              className="font-script text-3xl sm:text-4xl md:text-5xl text-[#00e5ff] tracking-wider select-none transform -rotate-3 inline-block"
              style={{
                textShadow:
                  '0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 35px #0284c7, 0 0 50px rgba(0,229,255,0.5)',
                filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.9))',
              }}
            >
              music
            </span>
          </div>
        </div>

        {/* Bottom Row: "SCUI" in 3D Liquid Ice-Water Glass */}
        <div className="relative flex items-center justify-center -mt-3 sm:-mt-5">
          {/* Water droplets dripping from SCUI */}
          <div className="absolute -top-1 left-2 w-3 h-3.5 bg-gradient-to-b from-white to-cyan-400 rounded-full shadow-[0_0_8px_#00e5ff]" />
          <div className="absolute -bottom-3 left-10 w-2.5 h-4 bg-gradient-to-b from-cyan-200 to-blue-500 rounded-full shadow-[0_0_8px_#00e5ff] animate-droplet" />
          <div className="absolute -bottom-2 right-12 w-2 h-3.5 bg-cyan-300 rounded-full shadow-[0_0_6px_#00e5ff]" />
          <div className="absolute top-2 -right-3 w-3.5 h-3.5 bg-gradient-to-br from-white to-blue-400 rounded-full shadow-[0_0_10px_#00e5ff] animate-droplet" />

          {/* SCUI text */}
          <div className="relative flex tracking-tighter">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-300 to-blue-600 filter drop-shadow-[0_0_25px_rgba(0,229,255,0.95)] drop-shadow-[0_0_50px_rgba(2,132,199,0.7)]"
              style={{
                WebkitTextStroke: '2px rgba(224, 242, 254, 0.95)',
                letterSpacing: '-0.02em',
                textShadow:
                  '0 0 20px rgba(0, 229, 255, 1), 0 0 45px rgba(0, 162, 255, 0.8), 0 0 70px rgba(0, 102, 255, 0.6)',
              }}
            >
              SCUI
            </span>

            {/* Liquid shine overlay layer */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.9) 0%, rgba(0,229,255,0) 70%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
