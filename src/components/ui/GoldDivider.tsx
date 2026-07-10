interface GoldDividerProps {
  className?: string;
  width?: number;
  opacity?: number;
}

export default function GoldDivider({ className = '', width = 48, opacity = 0.6 }: GoldDividerProps) {
  return (
    <div
      className={`h-[2px] mx-auto ${className}`}
      style={{
        width: `${width}px`,
        background: `hsl(38 40% 61% / ${opacity})`,
      }}
    />
  );
}
