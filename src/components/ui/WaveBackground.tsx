import { WAVE_SVGS } from '../../constants/design';

interface WaveBackgroundProps {
  variant: 'loader' | 'hero';
  className?: string;
}

const WAVE_CONFIG = {
  loader: {
    height: '260px',
    speeds: { slow: '7s', mid: '5s', fast: '3s' },
  },
  hero: {
    height: '340px',
    speeds: { slow: '9s', mid: '6s', fast: '4s' },
  },
};

export default function WaveBackground({ variant, className = '' }: WaveBackgroundProps) {
  const config = WAVE_CONFIG[variant];
  const svgs = WAVE_SVGS[variant];

  return (
    <div
      className={`absolute bottom-0 left-[-50%] w-[200%] overflow-hidden pointer-events-none ${className}`}
      style={{ height: config.height }}
    >
      {(['slow', 'mid', 'fast'] as const).map((speed) => (
        <div
          key={speed}
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: config.height,
            backgroundImage: `url("${svgs[speed]}")`,
            backgroundPosition: 'center bottom',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            animation: `wave-${speed} ${config.speeds[speed]} linear infinite`,
          }}
        />
      ))}
    </div>
  );
}
