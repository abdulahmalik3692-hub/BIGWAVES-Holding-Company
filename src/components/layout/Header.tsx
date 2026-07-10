import { useEffect, useRef, useState, useCallback } from 'react';
import { partners } from '../../constants/partners';
import { PartnerLogoBox } from './Sidebar';

const ITEM_WIDTH = 100;
const SCROLL_SPEED = 0.3;
const HEADER_HEIGHT = 90;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPosRef = useRef<number>(0);
  const [shrinkRatio, setShrinkRatio] = useState(0);

  // Scroll listener to calculate shrink ratio when approaching Partners Section
  useEffect(() => {
    const handleScroll = () => {
      const partnersSection = document.getElementById('partners');
      if (!partnersSection) return;

      const rect = partnersSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const startShrink = viewportHeight * 0.7;
      const endShrink = viewportHeight * 0.5;
      
      // Calculate interpolation ratio between 0 and 1
      const ratio = Math.max(0, Math.min(1, (startShrink - rect.top) / (startShrink - endShrink)));
      setShrinkRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrolledPartners = [...partners, ...partners, ...partners];

  const scrollStep = useCallback(() => {
    const container = scrollContainerRef.current;
    const isDesktop = window.innerWidth >= 768;
    const isTabHidden = document.hidden;
    const isHeaderHidden = shrinkRatio >= 1;

    if (!container || isHovered || isDesktop || isTabHidden || isHeaderHidden) {
      animationFrameRef.current = requestAnimationFrame(scrollStep);
      return;
    }

    scrollPosRef.current += SCROLL_SPEED;
    const limit = partners.length * ITEM_WIDTH;
    
    if (scrollPosRef.current >= limit) {
      scrollPosRef.current -= limit;
    }
    
    container.scrollLeft = scrollPosRef.current;
    animationFrameRef.current = requestAnimationFrame(scrollStep);
  }, [isHovered, shrinkRatio]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(scrollStep);
    
    const handleVisibilityChange = () => {};
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleVisibilityChange);
    };
  }, [scrollStep]);

  const handleContainerScroll = () => {
    const container = scrollContainerRef.current;
    if (container && isHovered) {
      scrollPosRef.current = container.scrollLeft;
      const limit = partners.length * ITEM_WIDTH;
      if (scrollPosRef.current >= limit * 2) {
        scrollPosRef.current = limit;
        container.scrollLeft = limit;
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/30 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 h-14 border-b border-border/10">
          <h1 className="font-display text-gold text-sm tracking-[0.3em] uppercase font-semibold">
            Big Wave
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none transition-all duration-300 active:scale-90"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-gold transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-5 h-0.5 bg-gold transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-gold transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>

        {/* Horizontal Autoscrolling Bar of Partners */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto bg-navy/30 backdrop-blur-sm transition-all duration-300 border-b border-border/5"
          style={{
            height: `${HEADER_HEIGHT * (1 - shrinkRatio)}px`,
            opacity: 1 - shrinkRatio,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onScroll={handleContainerScroll}
        >
          {scrolledPartners.map((partner, index) => (
            <a
              key={`${partner.name}-${index}`}
              href={partner.url}
              target={partner.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex-shrink-0 flex flex-col items-center justify-center gap-1 bg-transparent transition-colors duration-300 hover:bg-secondary/25"
              style={{ width: `${ITEM_WIDTH}px` }}
            >
              <PartnerLogoBox partner={partner} size="md" />
              <span className="font-body text-foreground/80 text-[8px] tracking-[0.1em] uppercase whitespace-nowrap group-hover:text-gold transition-colors duration-300">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </header>

      {/* Full screen mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {['About', 'Partners', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
            className="font-display text-foreground text-3xl tracking-[0.25em] uppercase transition-colors duration-300 hover:text-gold"
          >
            {item}
          </a>
        ))}
      </div>
    </>
  );
}
