import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input[type="submit"], input[type="button"], select, textarea, label[for], [tabindex]:not([tabindex="-1"]), [data-cursor="interactive"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  const isHoveredInteractive = useRef<boolean>(false);
  const isVisible = useRef<boolean>(false);
  const rAFRef = useRef<number>(0);

  const handleMouseEnterInteractive = useCallback(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const arrow = arrowRef.current;
    if (!ring || !dot || !arrow) return;

    gsap.to(ring, {
      width: 48,
      height: 48,
      marginLeft: -24,
      marginTop: -24,
      opacity: 0.7,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    gsap.to(dot, {
      scale: 0,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: true,
    });

    gsap.to(arrow, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: 'back.out(2)',
      overwrite: true,
    });
  }, []);

  const handleMouseLeaveInteractive = useCallback(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const arrow = arrowRef.current;
    if (!ring || !dot || !arrow) return;

    gsap.to(ring, {
      width: 28,
      height: 28,
      marginLeft: -14,
      marginTop: -14,
      opacity: 0.4,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    gsap.to(dot, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: true,
    });

    gsap.to(arrow, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: true,
    });
  }, []);

  const checkInteractiveHover = useCallback(() => {
    const x = mouseX.current;
    const y = mouseY.current;
    if (!isVisible.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Temporarily disable pointer events to read elements underneath
    dot.style.pointerEvents = 'none';
    ring.style.pointerEvents = 'none';

    const element = document.elementFromPoint(x, y);
    const isInteractive = element ? !!element.closest(INTERACTIVE_SELECTOR) : false;

    if (isInteractive && !isHoveredInteractive.current) {
      isHoveredInteractive.current = true;
      handleMouseEnterInteractive();
    } else if (!isInteractive && isHoveredInteractive.current) {
      isHoveredInteractive.current = false;
      handleMouseLeaveInteractive();
    }
  }, [handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const arrow = arrowRef.current;
    if (!dot || !ring || !arrow) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (!isVisible.current) {
        isVisible.current = true;
        gsap.set(dot, { opacity: 1 });
        gsap.set(ring, { opacity: 0.4 });
      }

      checkInteractiveHover();
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      gsap.to(dot, { opacity: 0, duration: 0.15, overwrite: true });
      gsap.to(ring, { opacity: 0, duration: 0.15, overwrite: true });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      isVisible.current = true;
      gsap.to(dot, { opacity: 1, duration: 0.15, overwrite: true });
      gsap.to(ring, { opacity: 0.4, duration: 0.15, overwrite: true });
      checkInteractiveHover();
    };

    const handleBlur = () => {
      isVisible.current = false;
      gsap.set(dot, { opacity: 0 });
      gsap.set(ring, { opacity: 0 });
      if (isHoveredInteractive.current) {
        isHoveredInteractive.current = false;
        handleMouseLeaveInteractive();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleBlur);

    // High frequency hover checking
    let lastTime = 0;
    const checkInterval = 100; // ms
    const loop = (time: number) => {
      if (time - lastTime >= checkInterval && isVisible.current) {
        lastTime = time;
        checkInteractiveHover();
      }
      rAFRef.current = requestAnimationFrame(loop);
    };
    rAFRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleBlur);
      cancelAnimationFrame(rAFRef.current);
    };
  }, [checkInteractiveHover, handleMouseLeaveInteractive]);

  // Disable custom cursor on mobile touch screens
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: '50%',
          backgroundColor: 'var(--color-gold)',
          zIndex: 99999,
          willChange: 'transform',
          opacity: 0,
        }}
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: '50%',
          border: '1px solid var(--color-gold)',
          opacity: 0,
          zIndex: 99999,
          willChange: 'transform',
        }}
      >
        <svg
          ref={arrowRef}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ transform: 'scale(0)', opacity: 0 }}
        >
          <path
            d="M4 3l6 4-6 4"
            stroke="var(--color-gold)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
