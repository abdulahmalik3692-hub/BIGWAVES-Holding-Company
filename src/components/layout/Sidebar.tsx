import { useEffect, useRef, useState, useCallback, type CSSProperties } from 'react';
import { partners } from '../../constants/partners';
import type { Partner } from '../../constants/partners';

export const getInitials = (name: string) => {
  const n = name.toLowerCase();
  if (n === 'windsorpatania') return 'WP';
  if (n === 'waterline') return 'W';
  if (n === 'my network') return 'MN';
  if (n === 'qnet') return 'Q';
  if (n === 'stylies') return 'S';
  if (n === 'alpin group') return 'AG';
  if (n === 'chain moray') return 'CM';

  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export const PartnerLogoBox = ({
  partner,
  size = 'md',
}: {
  partner: Partner;
  size?: 'sm' | 'md' | 'lg';
}) => {
  return (
    <div className={`site-sidebar__logo-box site-sidebar__logo-box--${size}`}>
      {getInitials(partner.name)}
    </div>
  );
};

const ITEM_HEIGHT = 130;
const SCROLL_SPEED = 0.3;

export default function Sidebar() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPosRef = useRef<number>(0);

  // Ambient color per section — sidebar adopts the color behind it
  const ambientBg = 'transparent';
  const [ambientBorder, setAmbientBorder] = useState('rgba(184, 155, 99, 0.12)');

  // Section colour map — background tint at ~55–65% so content stays visible
  // but the underlying section colour bleeds through the backdrop blur
  const sectionMap = [
    { id: 'hero',     border: 'rgba(184,155,99,0.12)'  },
    { id: 'about',    border: 'rgba(184,155,99,0.14)'  },
    { id: 'partners', border: 'rgba(184,155,99,0.12)'  },
    { id: 'contact',  border: 'rgba(184,155,99,0.14)'  },
  ];

  // Detect which section is behind the sidebar and adopt its ambient color
  useEffect(() => {
    const compute = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Find the section whose midpoint the sidebar currently overlaps
      let matched = sectionMap[0];
      for (const entry of sectionMap) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // section is "behind" the sidebar when it covers the top portion of the viewport
        if (rect.top <= vh * 0.5 && rect.bottom >= 0) {
          matched = entry;
        }
      }
      void scrollY; // keep dep lint happy
      setAmbientBorder(matched.border);
    };
    window.addEventListener('scroll', compute, { passive: true });
    compute();
    return () => window.removeEventListener('scroll', compute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Triple the list for seamless infinite auto-scroll
  const scrolledPartners = [...partners, ...partners, ...partners];

  const scrollStep = useCallback(() => {
    const container = scrollContainerRef.current;
    const isMobile = window.innerWidth < 768;
    const isTabHidden = document.hidden;

    if (!container || isHovered || isMobile || isTabHidden) {
      animationFrameRef.current = requestAnimationFrame(scrollStep);
      return;
    }

    scrollPosRef.current += SCROLL_SPEED;
    const limit = partners.length * ITEM_HEIGHT;

    if (scrollPosRef.current >= limit) {
      scrollPosRef.current -= limit;
    }

    container.scrollTop = scrollPosRef.current;
    animationFrameRef.current = requestAnimationFrame(scrollStep);
  }, [isHovered]);

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

  const handleInnerScroll = () => {
    const container = scrollContainerRef.current;
    if (container && isHovered) {
      scrollPosRef.current = container.scrollTop;
      const limit = partners.length * ITEM_HEIGHT;
      if (scrollPosRef.current >= limit * 2 || scrollPosRef.current <= 0) {
        scrollPosRef.current = limit;
        container.scrollTop = limit;
      }
    }
  };

  return (
    <aside
      className="site-sidebar"
      style={{
        '--sidebar-bg': ambientBg,
        '--sidebar-border': ambientBorder,
      } as CSSProperties}
    >
      {/* Logo */}
      <div className="site-sidebar__brand">
        <a href="#hero" className="site-sidebar__brand-link" data-cursor="interactive">
          <h1 className="site-sidebar__title">
            Big
            <br />
            Wave
          </h1>
        </a>
      </div>

      {/* Auto-scrolling partner list */}
      <div
        ref={scrollContainerRef}
        className="site-sidebar__scroll scrollbar-hide"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onScroll={handleInnerScroll}
      >
        {scrolledPartners.map((partner, index) => (
          <a
            key={`${partner.name}-${index}`}
            href={partner.url}
            target={partner.url !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            data-cursor="interactive"
            className="site-sidebar__item"
            style={{ height: `${ITEM_HEIGHT}px` }}
          >
            <div className="site-sidebar__item-marker" />

            <span className="site-sidebar__initial">
              {partner.name.charAt(0)}
            </span>

            <span className="site-sidebar__partner-name">
              {partner.name}
            </span>
          </a>
        ))}
      </div>

      {/* Bottom divider + label */}
      <div className="site-sidebar__footer">
        <div className="site-sidebar__divider" />
        <p className="site-sidebar__footer-label">
          Holding Company
        </p>
      </div>
    </aside>
  );
}
