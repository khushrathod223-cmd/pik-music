import React from 'react';

interface AudioWaveformProps {
  className?: string;
  height?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  className = '',
}) => {
  return (
    <div className={`w-full max-w-sm flex items-center justify-center gap-3 my-2 ${className}`}>
      {/* Left hairline bar */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#00e5ff]/60 to-[#00e5ff]" />

      {/* Central animated audio waveform bars */}
      <div className="flex items-center gap-[3px] px-1 py-1">
        <span
          className="w-[2.5px] bg-[#00e5ff] rounded-full wave-bar shadow-[0_0_8px_#00e5ff]"
          style={{ animationDelay: '0.1s', animationDuration: '1.1s' }}
        />
        <span
          className="w-[2.5px] bg-[#00e5ff] rounded-full wave-bar shadow-[0_0_8px_#00e5ff]"
          style={{ animationDelay: '0.35s', animationDuration: '0.9s' }}
        />
        <span
          className="w-[3px] bg-[#38bdf8] rounded-full wave-bar shadow-[0_0_12px_#38bdf8]"
          style={{ animationDelay: '0s', animationDuration: '0.75s' }}
        />
        <span
          className="w-[3.5px] bg-white rounded-full wave-bar shadow-[0_0_14px_#ffffff]"
          style={{ animationDelay: '0.2s', animationDuration: '0.85s' }}
        />
        <span
          className="w-[3px] bg-[#38bdf8] rounded-full wave-bar shadow-[0_0_12px_#38bdf8]"
          style={{ animationDelay: '0.4s', animationDuration: '0.95s' }}
        />
        <span
          className="w-[2.5px] bg-[#00e5ff] rounded-full wave-bar shadow-[0_0_8px_#00e5ff]"
          style={{ animationDelay: '0.15s', animationDuration: '1.05s' }}
        />
        <span
          className="w-[2.5px] bg-[#00e5ff] rounded-full wave-bar shadow-[0_0_8px_#00e5ff]"
          style={{ animationDelay: '0.5s', animationDuration: '1.2s' }}
        />
      </div>

      {/* Right hairline bar */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#00e5ff]/60 to-[#00e5ff]" />
    </div>
  );
};
