import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isOpeningMail, setIsOpeningMail] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const headerTitle = el.querySelector('.contact-title');
    const headerSubtitle = el.querySelector('.contact-subtitle');
    const leftItems = el.querySelectorAll('.contact-left-item');
    const rightItems = el.querySelectorAll('.contact-right-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headerTitle, headerSubtitle],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.contact-header'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        leftItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.contact-body'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        rightItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.querySelector('.contact-body'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(form.message);
    window.location.href = `mailto:info@bigwave.com?subject=${subject}&body=${body}`;
    setIsOpeningMail(true);
    setTimeout(() => setIsOpeningMail(false), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-16 md:py-24 bg-[#060B18] relative overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12 md:mb-20 contact-header">
          <h2 className="font-display text-[clamp(20px,5.5vw,24px)] md:text-[clamp(24px,6vw,60px)] tracking-[0.25em] md:tracking-[0.35em] uppercase text-[#B89B63] font-light mb-4 md:mb-6 leading-none contact-title">
            GET IN TOUCH
          </h2>
          <p className="text-[#D2D2D5]/75 text-[clamp(11px,1.8vw,14px)] tracking-[0.12em] font-light font-body contact-subtitle">
            Reach out to explore partnership opportunities
          </p>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-y-10 gap-x-12 lg:gap-x-16 items-start contact-body">

          {/* LEFT — Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">

            {/* Name */}
            <div className="flex flex-col gap-2 md:gap-3 contact-left-item">
              <label className="text-[clamp(9px,1.5vw,10px)] tracking-[0.28em] uppercase text-[#9ca3af] font-medium font-body">
                NAME
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                style={{ padding: '16px 24px' }}
                className="w-full bg-transparent border border-[rgba(255,255,255,0.12)] text-[#D2D2D5] placeholder:text-[rgba(255,255,255,0.2)] placeholder:tracking-normal placeholder:font-light placeholder:text-[15px] focus:outline-none focus:border-[rgba(184,155,99,0.5)] transition-all duration-300 text-sm font-light font-body"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 md:gap-3 contact-left-item">
              <label className="text-[clamp(9px,1.5vw,10px)] tracking-[0.28em] uppercase text-[#9ca3af] font-medium font-body">
                EMAIL
              </label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                style={{ padding: '16px 24px' }}
                className="w-full bg-transparent border border-[rgba(255,255,255,0.12)] text-[#D2D2D5] placeholder:text-[rgba(255,255,255,0.2)] placeholder:tracking-normal placeholder:font-light placeholder:text-[15px] focus:outline-none focus:border-[rgba(184,155,99,0.5)] transition-all duration-300 text-sm font-light font-body"
                placeholder="your@email.com"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2 md:gap-3 contact-left-item">
              <label className="text-[clamp(9px,1.5vw,10px)] tracking-[0.28em] uppercase text-[#9ca3af] font-medium font-body">
                MESSAGE
              </label>
              <textarea
                required
                maxLength={1000}
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                style={{ padding: '16px 24px' }}
                className="w-full h-[160px] bg-transparent border border-[rgba(255,255,255,0.12)] text-[#D2D2D5] placeholder:text-[rgba(255,255,255,0.2)] placeholder:tracking-normal placeholder:font-light placeholder:text-[15px] focus:outline-none focus:border-[rgba(184,155,99,0.5)] transition-all duration-300 resize-none text-sm font-light font-body"
                placeholder="How can we help?"
              />
            </div>

            {/* Button */}
            <div className="contact-left-item">
              <button
                type="submit"
                style={{ border: '1px solid rgba(184,155,99,0.5)' }}
                className="h-[52px] w-full md:w-[240px] font-body text-[11px] tracking-[0.3em] uppercase text-[#B89B63] bg-transparent hover:bg-[rgba(184,155,99,0.07)] hover:text-[#d4b96a] hover:shadow-[0_0_20px_rgba(184,155,99,0.12)] transition-all duration-500 active:scale-[0.98]"
              >
                {isOpeningMail ? 'Opening mail client…' : 'SEND MESSAGE'}
              </button>
            </div>
          </form>

          {/* RIGHT — Contact Info */}
          <div className="flex flex-col gap-8 md:gap-10 pt-4 md:pt-0">

            {/* Decorative circle — top right */}
            <div className="hidden md:flex justify-end contact-right-item">
              <div className="w-5 h-5 rounded-full border border-[#B89B63]/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B89B63]" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 md:gap-2 contact-right-item">
              <h3 className="text-[clamp(9px,1.5vw,10px)] tracking-[0.28em] uppercase text-[#B89B63] font-medium font-body">
                EMAIL
              </h3>
              <a
                href="mailto:info@bigwave.com"
                className="text-[#D2D2D5]/80 text-sm hover:text-[#B89B63] transition-colors duration-300 tracking-wide font-light font-body"
              >
                info@bigwave.com
              </a>
            </div>

            {/* Headquarters */}
            <div className="flex flex-col gap-1 md:gap-2 contact-right-item">
              <h3 className="text-[clamp(9px,1.5vw,10px)] tracking-[0.28em] uppercase text-[#B89B63] font-medium font-body">
                HEADQUARTERS
              </h3>
              <p className="text-[#D2D2D5]/80 text-sm leading-relaxed tracking-wide font-light font-body">
                Big Wave Holding Company
                <br />
                International Business District
                <br />
                Riyadh, Saudi Arabia
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1 md:gap-2 contact-right-item">
              <h3 className="text-[clamp(9px,1.5vw,10px)] tracking-[0.28em] uppercase text-[#B89B63] font-medium font-body">
                PHONE
              </h3>
              <a
                href="tel:+966000000000"
                className="text-[#D2D2D5]/80 text-sm hover:text-[#B89B63] transition-colors duration-300 tracking-wide font-light font-body"
              >
                +966 (0) 00 000 0000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
