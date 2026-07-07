import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), 2200);
    const completeTimer = setTimeout(() => onComplete(), 2700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background ${
        isExiting ? 'animate-loader-exit' : ''
      }`}
    >
      {/* Title & Subtitle */}
      <div className="relative z-10 text-center px-6 max-w-2xl md:translate-x-[110px]">
        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[0.25em] uppercase animate-loader-title font-light leading-[1.1]"
          style={{ color: 'var(--color-gold)' }}
        >
          BIG WAVE
        </h1>
        <p
          className="text-sm sm:text-base tracking-[0.15em] uppercase mt-6 animate-loader-subtitle font-light"
          style={{ color: 'var(--color-gold-dim)' }}
        >
          An International Portfolio of Excellence
        </p>
      </div>

      {/* Animated Wave Background SVGs */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] overflow-hidden pointer-events-none select-none">
        {/* Wave 1: Slow */}
        <svg
          className="absolute bottom-0 w-[200%] h-[120px] animate-wave-slow"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ opacity: 0.15 }}
        >
          <path
            d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,60 1440,80 L1440,120 L0,120 Z"
            fill="var(--color-gold)"
          />
        </svg>

        {/* Wave 2: Mid */}
        <svg
          className="absolute bottom-0 w-[200%] h-[100px] animate-wave-mid"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ opacity: 0.2 }}
        >
          <path
            d="M0,60 C240,90 480,20 720,60 C960,100 1200,30 1440,60 L1440,100 L0,100 Z"
            fill="var(--color-gold-dim)"
          />
        </svg>

        {/* Wave 3: Fast */}
        <svg
          className="absolute bottom-0 w-[200%] h-[80px] animate-wave-fast"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ opacity: 0.3 }}
        >
          <path
            d="M0,40 C180,70 360,10 540,40 C720,70 900,10 1080,40 C1260,70 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="var(--color-gold)"
          />
        </svg>
      </div>
    </div>
  );
}
