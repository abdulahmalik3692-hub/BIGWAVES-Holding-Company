import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Desktop refs
  const desktopTitleRef = useRef<HTMLHeadingElement>(null);
  const desktopTextRef = useRef<HTMLParagraphElement>(null);
  const desktopImageRef = useRef<HTMLImageElement>(null);

  // Tablet refs
  const tabletTitleRef = useRef<HTMLHeadingElement>(null);
  const tabletTextRef = useRef<HTMLParagraphElement>(null);
  const tabletImageRef = useRef<HTMLImageElement>(null);

  // Mobile refs
  const mobileTitleRef = useRef<HTMLHeadingElement>(null);
  const mobileTextRef = useRef<HTMLParagraphElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollTriggerConfig = {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    };

    const triggers: ScrollTrigger[] = [];

    // 1. Desktop animations (xl:block)
    const dt = desktopTitleRef.current;
    const dp = desktopTextRef.current;
    const di = desktopImageRef.current;
    if (dt && dp && di) {
      const dtAnim = gsap.fromTo(dt, { y: 150 }, { y: -250, ease: 'none', scrollTrigger: scrollTriggerConfig });
      const dpAnim = gsap.fromTo(dp, { y: 60 }, { y: -120, ease: 'none', scrollTrigger: scrollTriggerConfig });
      const diAnim = gsap.fromTo(di, { y: 40 }, { y: -80, ease: 'none', scrollTrigger: scrollTriggerConfig });
      if (dtAnim.scrollTrigger) triggers.push(dtAnim.scrollTrigger);
      if (dpAnim.scrollTrigger) triggers.push(dpAnim.scrollTrigger);
      if (diAnim.scrollTrigger) triggers.push(diAnim.scrollTrigger);
    }

    // 2. Tablet animations (md:flex xl:hidden)
    const tt = tabletTitleRef.current;
    const tp = tabletTextRef.current;
    const ti = tabletImageRef.current;
    if (tt && tp && ti) {
      const ttAnim = gsap.fromTo(tt, { y: 120 }, { y: -180, ease: 'none', scrollTrigger: scrollTriggerConfig });
      const tpAnim = gsap.fromTo(tp, { y: 50 }, { y: -100, ease: 'none', scrollTrigger: scrollTriggerConfig });
      const tiAnim = gsap.fromTo(ti, { y: 30 }, { y: -60, ease: 'none', scrollTrigger: scrollTriggerConfig });
      if (ttAnim.scrollTrigger) triggers.push(ttAnim.scrollTrigger);
      if (tpAnim.scrollTrigger) triggers.push(tpAnim.scrollTrigger);
      if (tiAnim.scrollTrigger) triggers.push(tiAnim.scrollTrigger);
    }

    // 3. Mobile animations (md:hidden)
    const mt = mobileTitleRef.current;
    const mp = mobileTextRef.current;
    const mi = mobileImageRef.current;
    if (mt && mp && mi) {
      const mtAnim = gsap.fromTo(mt, { y: 150 }, { y: -200, ease: 'none', scrollTrigger: scrollTriggerConfig });
      const mpAnim = gsap.fromTo(mp, { y: 60 }, { y: -120, ease: 'none', scrollTrigger: scrollTriggerConfig });
      const miAnim = gsap.fromTo(mi, { y: 40 }, { y: -80, ease: 'none', scrollTrigger: scrollTriggerConfig });
      if (mtAnim.scrollTrigger) triggers.push(mtAnim.scrollTrigger);
      if (mpAnim.scrollTrigger) triggers.push(mpAnim.scrollTrigger);
      if (miAnim.scrollTrigger) triggers.push(miAnim.scrollTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const textContent =
    'Big Wave Holding Company unites an international portfolio of partners across maritime engineering, architecture, marine consultancy, and innovation — building a platform for global ambition.';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-navy relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background Yacht Image for Desktop */}
      <img
        ref={desktopImageRef}
        src="https://big-wave-landing.vercel.app/images/yacht-2.png"
        alt=""
        aria-hidden="true"
        className="hidden xl:block absolute"
        loading="lazy"
        width={1200}
        height={600}
        style={{
          bottom: '13%',
          left: '0%',
          width: '80%',
          opacity: 0.9,
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      {/* 1. Mobile Layout */}
      <div
        className="md:hidden h-full flex flex-col items-center justify-center px-6 gap-6"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h3
          ref={mobileTitleRef}
          className="font-display text-foreground tracking-[0.14em] uppercase font-extralight text-center w-full"
          style={{
            fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
            lineHeight: 1.05,
            position: 'relative',
            zIndex: 2,
          }}
        >
          Connecting
          <br />
          Visionaries
          <br />
          Across
          <br />
          Industries
        </h3>
        <img
          ref={mobileImageRef}
          src="https://big-wave-landing.vercel.app/images/yacht-2.png"
          alt=""
          aria-hidden="true"
          className="w-[110%] opacity-90 pointer-events-none select-none mt-[-40px]"
          loading="lazy"
          width={360}
          height={270}
          style={{ position: 'relative', zIndex: 1 }}
        />
        <p
          ref={mobileTextRef}
          className="font-body text-foreground/70 text-center"
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.8,
            letterSpacing: '0.04em',
            maxWidth: '90%',
          }}
        >
          {textContent}
        </p>
      </div>

      {/* 2. Tablet Layout */}
      <div
        className="hidden md:flex xl:hidden h-full flex-col items-center justify-center px-10 gap-8"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h3
          ref={tabletTitleRef}
          className="font-display text-foreground tracking-[0.14em] uppercase font-extralight text-center w-full"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
            lineHeight: 1.05,
            position: 'relative',
            zIndex: 2,
          }}
        >
          Connecting
          <br />
          Visionaries
          <br />
          Across
          <br />
          Industries
        </h3>
        <img
          ref={tabletImageRef}
          src="https://big-wave-landing.vercel.app/images/yacht-2.png"
          alt=""
          aria-hidden="true"
          className="w-[90%] max-w-[500px] opacity-90 pointer-events-none select-none mt-[-30px]"
          loading="lazy"
          width={500}
          height={380}
          style={{ position: 'relative', zIndex: 1 }}
        />
        <p
          ref={tabletTextRef}
          className="font-body text-foreground/70 text-center"
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            letterSpacing: '0.04em',
            maxWidth: '80%',
          }}
        >
          {textContent}
        </p>
      </div>

      {/* 3. Desktop Layout */}
      <div className="hidden xl:block h-full relative" style={{ zIndex: 1 }}>
        <h3
          ref={desktopTitleRef}
          className="font-display text-foreground tracking-[0.14em] uppercase font-extralight absolute"
          style={{
            top: '20%',
            left: '5%',
            width: '55%',
            fontSize: 'clamp(2.8rem, 5.5vw, 6rem)',
            lineHeight: 1,
            margin: 0,
            zIndex: 3,
          }}
        >
          Connecting
          <br />
          Visionaries
          <br />
          Across
          <br />
          Industries
        </h3>
        <p
          ref={desktopTextRef}
          className="font-body text-foreground/70 absolute"
          style={{
            top: '30%',
            right: '6%',
            width: '28%',
            fontSize: 'clamp(1.5rem, 1.7vw, 1.8rem)',
            lineHeight: 1.9,
            letterSpacing: '0.05em',
            textAlign: 'right',
            margin: 0,
            zIndex: 3,
          }}
        >
          {textContent}
        </p>
      </div>
    </section>
  );
}
