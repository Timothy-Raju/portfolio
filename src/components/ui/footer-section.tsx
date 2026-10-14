import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  ArrowUp,
  Heart,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

// ==============================================================
// 1. Magnetic Pill Component (Pointer Magnet Interaction)
// Gently pulls towards cursor on desktop; springs back on leave
// ==============================================================
interface MagneticPillProps {
  children: React.ReactNode;
  href: string;
  label: string;
  className?: string;
  target?: string;
}

const MagneticPill: React.FC<MagneticPillProps> = ({
  children,
  href,
  label,
  className = "",
  target = "_blank",
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pillRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (prefersReducedMotion || !pillRef.current) return;
      const rect = pillRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Restrained magnetic pull (max ~8px displacement)
      const dx = (e.clientX - centerX) * 0.22;
      const dy = (e.clientY - centerY) * 0.22;
      setOffset({ x: dx, y: dy });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <a
      ref={pillRef}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "transform 0.1s ease-out",
      }}
      className={`group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors backdrop-blur-md shadow-sm cursor-pointer select-none ${className}`}
    >
      {children}
    </a>
  );
};

// ==============================================================
// 2. Cinematic Footer Component
// ==============================================================
export const FooterSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // Cinematic scroll reveal trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Verified Social Links
  const SOCIAL_LINKS = [
    {
      name: "GitHub",
      href: "https://github.com/Timothy-Raju",
      icon: <FaGithub className="w-4 h-4 transition-transform group-hover:scale-110" />,
      colorHover: "group-hover:text-white dark:group-hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/thimothi-raju",
      icon: <FaLinkedin className="w-4 h-4 text-[#0A66C2] transition-transform group-hover:scale-110" />,
      colorHover: "group-hover:text-[#0A66C2]",
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/fBAwIMcOGv/",
      icon: <SiLeetcode className="w-4 h-4 text-[#FFA116] transition-transform group-hover:scale-110" />,
      colorHover: "group-hover:text-[#FFA116]",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rajupalanki9757?dlrf=cjdodDZqMjIzeW45",
      icon: <FaInstagram className="w-4 h-4 text-[#E1306C] transition-transform group-hover:scale-110" />,
      colorHover: "group-hover:text-[#E1306C]",
    },
    {
      name: "X",
      href: "https://x.com/rajupalanki5451",
      icon: <FaXTwitter className="w-4 h-4 transition-transform group-hover:scale-110" />,
      colorHover: "group-hover:text-white dark:group-hover:text-white",
    },
    {
      name: "Email",
      href: "mailto:rajupalanki1037@gmail.com",
      icon: <Mail className="w-4 h-4 text-[#C3E41D] transition-transform group-hover:scale-110" />,
      colorHover: "group-hover:text-[#C3E41D]",
      target: "_self",
    },
  ];

  // Marquee Phrases
  const MARQUEE_PHRASES = [
    "BUILDING USEFUL THINGS",
    "SOFTWARE DEVELOPMENT",
    "PROBLEM SOLVING",
    "CONTINUOUS LEARNING",
    "TURNING IDEAS INTO TOOLS",
  ];

  return (
    <footer
      ref={footerRef}
      id="footer"
      aria-label="Site Footer"
      className="relative w-full pt-10 sm:pt-14 pb-8 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden border-t border-neutral-200/80 dark:border-neutral-900"
    >
      {/* Background Ambient Glows & Grid */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C3E41D]/10 dark:bg-[#C3E41D]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C3E41D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* ============================================================== */}
      {/* A. Continuous Moving Marquee (Subtle -3.5° Tilt & Blurred Edges)*/}
      {/* ============================================================== */}
      <div className="relative w-full overflow-hidden py-3 sm:py-5 mb-8 sm:mb-12 select-none opacity-90 hover:opacity-100 transition-opacity">
        {/* Left Boundary Blur & Fade Overlay */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-r from-neutral-100 dark:from-black via-neutral-100/80 dark:via-black/80 to-transparent backdrop-blur-[2px]"
        />

        {/* Right Boundary Blur & Fade Overlay */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-l from-neutral-100 dark:from-black via-neutral-100/80 dark:via-black/80 to-transparent backdrop-blur-[2px]"
        />

        {/* Tilted wrapper: holds the subtle -3.5° rotation with edge mask */}
        <div
          style={{
            transform: "rotate(-3.5deg) scale(1.08)",
            transformOrigin: "center center",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
          className="w-full flex items-center justify-center"
        >
          {/* Scrolling track: holds the translateX marquee animation */}
          <div className="flex w-max animate-marquee py-2.5 sm:py-3 border-y border-neutral-300/80 dark:border-neutral-800 bg-neutral-200/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-xs">
            {/* Two identical halves, each with 3 full cycles of phrases for a 100% gapless continuous loop */}
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} className="flex items-center gap-8 px-4 shrink-0">
                {[0, 1, 2].map((cycleIdx) => (
                  <React.Fragment key={`${copyIndex}-${cycleIdx}`}>
                    {MARQUEE_PHRASES.map((phrase, i) => (
                      <React.Fragment key={`${copyIndex}-${cycleIdx}-${i}`}>
                        <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-800 dark:text-neutral-200 font-semibold whitespace-nowrap">
                          {phrase}
                        </span>
                        <span className="text-[#5c7003] dark:text-[#C3E41D] text-xs select-none">
                          ✦
                        </span>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* ============================================================== */}
        {/* B & D. Main Heading, Description & Contact Call to Action       */}
        {/* ============================================================== */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16"
        >
          {/* Main Headline */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C3E41D]/15 dark:bg-[#C3E41D]/10 border border-[#C3E41D]/40 text-[#495902] dark:text-[#C3E41D] text-xs font-mono uppercase tracking-wider font-bold mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLABORATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.1] mb-4">
              Let&apos;s build something meaningful.
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Thanks for exploring my portfolio. Feel free to connect, collaborate, or reach out about engineering opportunities.
            </p>
          </div>

          {/* Contact Call to Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="mailto:rajupalanki1037@gmail.com"
              className="px-6 py-3.5 rounded-full bg-neutral-950 dark:bg-[#C3E41D] text-white dark:text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-[0_4px_25px_rgba(195,228,29,0.3)] flex items-center gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C3E41D]"
            >
              <Mail className="w-4 h-4" />
              <span>Have an idea or opportunity? Let&apos;s talk</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* C. Interactive Glass Social Link Pills                         */}
        {/* ============================================================== */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
          className="mb-14 sm:mb-20"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 font-semibold">
            CONNECT WITH ME
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {SOCIAL_LINKS.map((link) => (
              <MagneticPill
                key={link.name}
                href={link.href}
                label={`Visit ${link.name} profile`}
                target={link.target || "_blank"}
                className={`bg-white/80 dark:bg-neutral-900/60 hover:bg-white dark:hover:bg-neutral-800/90 border border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-[#C3E41D]/50 text-neutral-800 dark:text-neutral-200 ${link.colorHover}`}
              >
                {link.icon}
                <span className="font-semibold tracking-tight">{link.name}</span>
                <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </MagneticPill>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* E. Oversized Cinematic Background Typography                   */}
        {/* ============================================================== */}
        <div
          className="relative w-full flex items-center justify-center select-none pointer-events-none overflow-hidden my-4 sm:my-6"
          aria-hidden="true"
        >
          <span
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.95)",
              transition: "opacity 1.2s ease 0.25s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
            }}
            className="text-[15vw] sm:text-[17vw] md:text-[18vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-neutral-900/[0.08] via-neutral-900/[0.03] to-transparent dark:from-white/[0.09] dark:via-white/[0.03] dark:to-transparent"
          >
            THIMOTHI
          </span>
        </div>

        {/* ============================================================== */}
        {/* F. Clean Bottom Bar: Copyright, Crafted with care, Back to Top */}
        {/* ============================================================== */}
        <div className="pt-8 border-t border-neutral-300/70 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          {/* Copyright */}
          <div>
            © 2026 <span className="font-bold text-neutral-800 dark:text-neutral-200">Thimothi Raju</span>. All rights reserved.
          </div>

          {/* Crafted with Care Message */}
          <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>&amp; dedication</span>
          </div>

          {/* Smooth Back to Top Button */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-200 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#5c7003] dark:text-[#C3E41D]" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Animation Keyframes in CSS */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marqueeScroll 50s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation-duration: 90s;
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterSection;
