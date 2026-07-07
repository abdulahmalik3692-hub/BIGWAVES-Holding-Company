import { useEffect, useState } from 'react';

const SECTION_IDS = ['waterline', 'mynetwork', 'qnet', 'stylies'];

export function useSidebarActive(): string {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    function handleScroll() {
      const scrollMid = window.scrollY + window.innerHeight * 0.45;
      let current = '';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollMid >= top) current = id;
        }
      }

      setActiveId(current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeId;
}
