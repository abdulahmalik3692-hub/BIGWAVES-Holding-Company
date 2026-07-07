import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIndicator from '../components/ui/ScrollIndicator';
import GoldDivider from '../components/ui/GoldDivider';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    const scrollTriggerConfig = {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
      onLeaveBack: () => {
        if (contentRef.current) gsap.set(contentRef.current, { y: 0, opacity: 1 });
        if (bgContainerRef.current) gsap.set(bgContainerRef.current, { y: 0 });
      },
    };

    const triggers: ScrollTrigger[] = [];

    // Content scrolls up and fades out
    if (contentRef.current) {
      const contentAnim = gsap.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: -172, opacity: 0, ease: 'none', scrollTrigger: scrollTriggerConfig }
      );
      if (contentAnim.scrollTrigger) triggers.push(contentAnim.scrollTrigger);
    }

    // Parallax background (scrolls down slightly)
    if (isDesktop && bgContainerRef.current) {
      const bgAnim = gsap.fromTo(
        bgContainerRef.current,
        { y: 0 },
        { y: 92, ease: 'none', scrollTrigger: scrollTriggerConfig }
      );
      if (bgAnim.scrollTrigger) triggers.push(bgAnim.scrollTrigger);
    }

    const video = videoRef.current;
    const handleVideoLoaded = () => {
      ScrollTrigger.refresh();
    };

    if (video) {
      video.addEventListener('loadedmetadata', handleVideoLoaded);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      if (video) {
        video.removeEventListener('loadedmetadata', handleVideoLoaded);
      }
    };
  }, []);

  const handleDiscoverClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const about = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center md:h-screen"
    >
      {/* ── Fullscreen video (covers the entire viewport width, including behind sidebar) ── */}
      {/*
        On desktop the sidebar (220px fixed) is a sibling. To make the video appear
        behind the sidebar we use a negative left margin and add that width back.
        The section itself has no left-pad, so this extends the video to left-0 of the screen.
      */}
      <div
        className="absolute inset-0 overflow-hidden md:-left-[220px] md:w-[calc(100%+220px)]"
        style={{ top: 0, bottom: 0 }}
      >
        <div
          ref={bgContainerRef}
          className="relative h-full w-full will-change-transform md:h-[120%]"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover brightness-[0.78] saturate-[0.88]"
          >
            <source
              src="https://big-wave-landing.vercel.app/videos/bigwave_hero.mp4"
              type="video/mp4"
            />
          </video>

          {/* Dark overlay — 20% opacity for readability without killing the cinematic feel */}
          <div className="absolute inset-0 bg-[#050712]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050712]/10 via-transparent to-[#050712]/35" />

          {/* Bottom gradient fade into site background */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background/70" />
        </div>
      </div>

      {/* ── Hero Content (centered in full viewport on desktop via negative margin trick) ── */}
      {/*
        The section sits to the RIGHT of the 220px sidebar spacer in the flex layout.
        We shift the content left by half the sidebar width so it appears centered in
        the true viewport center, not just the content area center.
      */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl w-full px-6 pt-36 text-center will-change-[transform,opacity] md:pt-0 md:-translate-x-[110px]"
      >
        <h2
          className="animate-fade-up font-display text-[#F1ECE6] tracking-[0.2em] uppercase font-light leading-[1.05]"
          style={{ fontSize: 'clamp(2.625rem, 8vw, 6rem)' }}
        >
          BIG WAVE
        </h2>

        <p
          className="animate-fade-up animate-fade-up-delay-1 font-body text-[#B89B63] text-[0.6rem] tracking-[0.35em] uppercase mt-5"
        >
          HOLDING COMPANY
        </p>

        <div className="animate-fade-up animate-fade-up-delay-2 my-7">
          <GoldDivider width={48} opacity={0.55} />
        </div>

        <div className="animate-fade-up animate-fade-up-delay-3">
          <a
            href="#about"
            onClick={handleDiscoverClick}
            data-cursor="interactive"
            className="inline-block font-body text-[0.6rem] font-normal tracking-[0.3em] uppercase transition-all duration-300"
            style={{
              padding: '14px 32px',
              border: '1px solid rgba(184, 155, 99, 0.5)',
              color: '#E6DCC5',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#B89B63';
              (e.currentTarget as HTMLAnchorElement).style.color = '#060B18';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#E6DCC5';
            }}
          >
            DISCOVER
          </a>
        </div>
      </div>

      {/* ── Scroll Indicator (centered in full viewport) ── */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-none">
        {/* Shift left by half sidebar width so indicator is at true viewport center */}
        <div className="md:-translate-x-[110px]">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
