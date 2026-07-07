export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="font-body text-[0.5rem] tracking-[0.4em] uppercase"
        style={{ color: 'hsl(40 30% 90% / 0.5)' }}
      >
        SCROLL
      </span>
      <div className="relative w-px h-10 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'hsl(40 30% 90% / 0.15)' }} />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'hsl(38 40% 61% / 0.6)',
            animation: 'scroll-line 1.5s var(--ease-out-expo) infinite',
          }}
        />
      </div>
    </div>
  );
}
