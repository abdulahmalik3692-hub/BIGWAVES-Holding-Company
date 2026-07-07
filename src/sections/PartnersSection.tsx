import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { partners } from '../constants/partners';
import PartnerCard from '../components/cards/PartnerCard';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedTitleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedTitle = pinnedTitleRef.current;
    const cardsContainer = cardsContainerRef.current;
    if (!section || !pinnedTitle || !cardsContainer) return;

    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${cardsContainer.offsetHeight + window.innerHeight * 0.6}`,
      pin: pinnedTitle,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    return () => {
      pinTrigger.kill();
    };
  }, []);

  return (
    <section id="partners" ref={sectionRef} className="relative bg-background">
      {/* Pinned Title Container */}
      <div
        ref={pinnedTitleRef}
        className="z-0 h-screen flex items-center justify-center pointer-events-none"
      >
        <h3 className="font-display text-foreground text-5xl sm:text-7xl tracking-[0.14em] uppercase font-extralight text-center">
          OUR PARTNERS
        </h3>
      </div>

      {/* Spacer to separate pinned title intro from cards */}
      <div className="h-[60vh] pointer-events-none" />

      {/* Cards Container */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 gap-8 pb-20"
      >
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>
    </section>
  );
}
