import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface GuestButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const GuestButton: React.FC<GuestButtonProps> = ({
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
      {/* Subtle neon cyan border glow */}
      <div className="absolute -inset-0.5 rounded-full bg-cyan-400/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <button
        onClick={handleClick}
        disabled={isLoading}
        aria-label="Continue as Guest"
        className="relative w-full h-[54px] sm:h-[58px] rounded-full px-8 flex items-center justify-center gap-3 text-white font-medium text-lg sm:text-xl tracking-wide overflow-hidden transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
        style={{
          background: 'rgba(4, 15, 38, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '2px solid #00e5ff',
          boxShadow:
            '0 0 18px rgba(0, 229, 255, 0.45), inset 0 0 12px rgba(0, 229, 255, 0.2)',
        }}
      >
        {/* Soft liquid sheen on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00e5ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Dynamic Water Click Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none bg-cyan-400/30 border border-cyan-300/60 animate-ripple"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}

        {/* Button Content: Italicized "Continue as Guest" + Arrow */}
        <span
          className="relative z-10 italic font-semibold text-cyan-100 group-hover:text-white transition-colors duration-200 tracking-wide"
          style={{
            textShadow: '0 0 10px rgba(0, 229, 255, 0.6)',
          }}
        >
          Continue as Guest
        </span>

        <ArrowRight className="relative z-10 w-5 h-5 text-[#00e5ff] group-hover:text-white transition-transform duration-200 group-hover:translate-x-1.5 drop-shadow-[0_0_6px_#00e5ff]" />
      </button>
    </div>
  );
};
