import { useMemo } from 'react';

interface ParticleSystemProps {
  count?: number;
}

export default function ParticleSystem({ count = 28 }: ParticleSystemProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const startY = Math.random() * 100;
      const duration = Math.random() * 10 + 8;
      const delay = Math.random() * 8;
      const opacity = Math.random() * 0.5 + 0.15;

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}%`,
          top: `${startY}%`,
          animationDuration: `${duration}s`,
          animationDelay: `-${delay}s`,
          opacity,
        } as React.CSSProperties,
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-[2px] h-[2px] bg-gold/30 rounded-full"
          style={{
            ...p.style,
            animation: `particle-float ${p.style.animationDuration} linear infinite`,
            animationDelay: p.style.animationDelay,
          }}
        />
      ))}
    </div>
  );
}
