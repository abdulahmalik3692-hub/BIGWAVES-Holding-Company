export interface Partner {
  name: string;
  sector: string;
  origin: string;
  flag: string;
  flagCode: string;
  url: string;
  description: string;
  image: string;
}


export const partners: Partner[] = [
  {
    name: "Waterline",
    sector: "Maritime / Marine",
    origin: "Egypt",
    flag: "🇪🇬",
    flagCode: "eg",
    url: "https://waterlineegypt.com",
    description: "Pioneering maritime solutions across the Red Sea and Mediterranean, delivering world-class vessel management and marine infrastructure services.",
    image: "/images/partners/waterline.webp"
  },
  {
    name: "My Network",
    sector: "Networking / Business",
    origin: "Saudi Arabia",
    flag: "🇸🇦",
    flagCode: "sa",
    url: "https://mynetworkksa.com",
    description: "Connecting visionary entrepreneurs and industry leaders across the Gulf region through curated business experiences and strategic partnerships.",
    image: "/images/partners/mynetwork.webp"
  },
  {
    name: "QNet",
    sector: "Global Commerce",
    origin: "International",
    flag: "✦",
    flagCode: "",
    url: "#",
    description: "A global commerce platform bridging markets and creating pathways for international trade and cultural exchange across continents.",
    image: "/images/partners/qnet.webp"
  },
  {
    name: "Stylies",
    sector: "Luxury Fashion",
    origin: "Switzerland",
    flag: "🇨🇭",
    flagCode: "ch",
    description: "Swiss-crafted luxury fashion bringing timeless European elegance to discerning clientele worldwide, with a focus on bespoke tailoring and refined aesthetics.",
    url: "#",
    image: "/images/partners/stylies.webp"
  },
  {
    name: "Alpin Group",
    sector: "Yacht Parts / Accessories",
    origin: "Germany",
    flag: "🇩🇪",
    flagCode: "de",
    url: "#",
    description: "German-engineered precision yacht components and marine accessories, setting the standard for quality and durability in the superyacht industry.",
    image: "/images/partners/alpin.webp"
  },
  {
    name: "WindsorPatania",
    sector: "Architecture & Urban Design",
    origin: "UK / KSA / Italy",
    flag: "🇬🇧",
    flagCode: "gb",
    url: "https://windsorpatania.com",
    description: "An internationally acclaimed architecture studio shaping skylines from London to Riyadh, blending heritage-inspired design with bold contemporary vision.",
    image: "/images/partners/windsorpatania.webp"
  },
  {
    name: "Chain Moray",
    sector: "Marine Consultancy",
    origin: "Saudi Arabia",
    flag: "🇸🇦",
    flagCode: "sa",
    url: "https://chain-moray.com",
    description: "Expert marine consultancy services specializing in underwater surveys, hull inspections, and comprehensive maritime compliance across the Arabian Gulf.",
    image: "/images/partners/chainmoray.webp"
  }
];
