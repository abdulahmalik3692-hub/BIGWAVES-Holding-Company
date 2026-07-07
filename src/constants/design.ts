/* Design tokens used across components */

export const EASING = {
  easeOutExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export const DURATION = {
  fast: 0.3,
  normal: 0.55,
  slow: 0.7,
  slower: 0.9,
  loader: 2500,       // ms — minimum loader display time
  loaderExit: 800,    // ms — loader exit animation
};

export const PARALLAX = {
  heroContentSpeed: -0.28,
  heroBgSpeed: 0.35,
};

export const SIDEBAR_WIDTH = 220; // px

export const WAVE_SVGS = {
  loader: {
    slow: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 260'%3E%3Cpath fill='%23c9a96e' fill-opacity='0.12' d='M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,260L0,260Z'%3E%3C/path%3E%3C/svg%3E",
    mid: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 260'%3E%3Cpath fill='%23c9a96e' fill-opacity='0.08' d='M0,192L48,181.3C96,171,192,149,288,144C384,139,480,149,576,165.3C672,181,768,203,864,197.3C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,260L0,260Z'%3E%3C/path%3E%3C/svg%3E",
    fast: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 260'%3E%3Cpath fill='%23c9a96e' fill-opacity='0.15' d='M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,260L0,260Z'%3E%3C/path%3E%3C/svg%3E",
  },
  hero: {
    slow: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 340'%3E%3Cpath fill='%23c9a96e' fill-opacity='0.04' d='M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,202.7C672,203,768,181,864,165.3C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,340L0,340Z'%3E%3C/path%3E%3C/svg%3E",
    mid: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 340'%3E%3Cpath fill='%23c9a96e' fill-opacity='0.025' d='M0,256L60,240C120,224,240,192,360,192C480,192,600,224,720,229.3C840,235,960,213,1080,202.7C1200,192,1320,192,1380,192L1440,192L1440,340L0,340Z'%3E%3C/path%3E%3C/svg%3E",
    fast: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 340'%3E%3Cpath fill='%23c9a96e' fill-opacity='0.06' d='M0,288L80,277.3C160,267,320,245,480,250.7C640,256,800,288,960,288C1120,288,1280,256,1360,240L1440,224L1440,340L0,340Z'%3E%3C/path%3E%3C/svg%3E",
  },
};
