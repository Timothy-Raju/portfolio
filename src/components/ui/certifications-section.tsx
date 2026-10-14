import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TimelineContent } from "./timeline-content";

interface CertificationItem {
  id: string;
  name: string;
  shortName: string;
  examCode?: string;
  issuer: string;
  url: string;
  actionLabel: string;
  themeColor: string;
  accentBg: string;
  renderVisual: () => React.ReactNode;
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    shortName: "AWS Solutions Architect",
    examCode: "SAA-C03",
    issuer: "Amazon Web Services",
    url: "https://drive.google.com/file/d/1cFr_Q6Ub1PG-kh0n26-gQ2rtYMYe4EJD/view?pli=1",
    actionLabel: "View Certificate",
    themeColor: "#FF9900",
    accentBg: "from-[#FF9900]/25 via-[#232F3E]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#232F3E] via-[#1A2332] to-[#0D131D] text-white overflow-hidden">
        {/* Subtle Architecture Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF9900_1px,transparent_1px)] [background-size:12px_12px]" />
        
        {/* Center Architectural Crest */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FF9900]/15 border border-[#FF9900]/40 flex items-center justify-center mb-3 shadow-[0_0_24px_rgba(255,153,0,0.25)]">
            <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.2" />
              <rect x="26" y="8" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.2" />
              <rect x="16" y="26" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.3" />
              <path d="M14 22V26M34 22V26M24 22V26" stroke="#FF9900" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="24" cy="33" r="2.5" fill="#FF9900" />
            </svg>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#FF9900] uppercase font-bold">
            ARCHITECT ASSOCIATE
          </span>
          <span className="text-[13px] font-sans font-semibold text-neutral-200 mt-0.5">
            SAA-C03
          </span>
        </div>

        {/* Bottom Micro Badge */}
        <div className="absolute bottom-2.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400">
          CLOUD ARCHITECTURE
        </div>
      </div>
    ),
  },
  {
    id: "aws-clf",
    name: "AWS Certified Cloud Practitioner",
    shortName: "AWS Cloud Practitioner",
    examCode: "CLF-C02",
    issuer: "Amazon Web Services",
    url: "https://drive.google.com/file/d/1H1yFSyl4WPahQfIAP9d5vb5myH86GIgC/view",
    actionLabel: "View Certificate",
    themeColor: "#00A4E4",
    accentBg: "from-[#00A4E4]/25 via-[#1E293B]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#0F1E2E] via-[#132238] to-[#0A121D] text-white overflow-hidden">
        {/* Ambient Ring Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#00A4E4]/15 blur-2xl pointer-events-none" />
        
        {/* Cloud Computing Icon */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#00A4E4]/15 border border-[#00A4E4]/40 flex items-center justify-center mb-3 shadow-[0_0_24px_rgba(0,164,228,0.25)]">
            <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 30C10.7 30 8 27.3 8 24C8 20.9 10.3 18.4 13.4 18.1C14.7 13.4 19 10 24 10C30 10 35 14.5 35.8 20.3C38.8 20.8 41 23.4 41 26.5C41 30.1 38.1 33 34.5 33H14"
                stroke="#00A4E4"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M24 22V36M19 31L24 36L29 31" stroke="#00A4E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#00A4E4] uppercase font-bold">
            CLOUD PRACTITIONER
          </span>
          <span className="text-[13px] font-sans font-semibold text-neutral-200 mt-0.5">
            CLF-C02
          </span>
        </div>

        {/* Bottom Micro Badge */}
        <div className="absolute bottom-2.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400">
          CORE INFRASTRUCTURE
        </div>
      </div>
    ),
  },
  {
    id: "oracle-ai",
    name: "Oracle Generative AI Professional",
    shortName: "Oracle Generative AI",
    issuer: "Oracle",
    url: "https://drive.google.com/file/d/1ODuwvCWu_OOXx5xuHbmGFo2Xw1wUbfg2/view",
    actionLabel: "View Certificate",
    themeColor: "#C74634",
    accentBg: "from-[#C74634]/25 via-[#2C1810]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#241212] via-[#1F1424] to-[#0E0C16] text-white overflow-hidden">
        {/* Generative Synapse Waves */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C74634_1px,transparent_1px)] [background-size:14px_14px]" />

        {/* AI Neural Geometry */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#C74634]/15 border border-[#C74634]/40 flex items-center justify-center mb-3 shadow-[0_0_24px_rgba(199,70,52,0.25)]">
            <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="14" r="3.5" fill="#C74634" />
              <circle cx="12" cy="30" r="3.5" fill="#A855F7" />
              <circle cx="36" cy="30" r="3.5" fill="#EC4899" />
              <circle cx="24" cy="36" r="3.5" fill="#F59E0B" />
              <line x1="24" y1="14" x2="12" y2="30" stroke="#C74634" strokeWidth="1.8" strokeDasharray="2 2" />
              <line x1="24" y1="14" x2="36" y2="30" stroke="#C74634" strokeWidth="1.8" strokeDasharray="2 2" />
              <line x1="12" y1="30" x2="24" y2="36" stroke="#A855F7" strokeWidth="1.8" />
              <line x1="36" y1="30" x2="24" y2="36" stroke="#EC4899" strokeWidth="1.8" />
              <circle cx="24" cy="25" r="2" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#E06D53] uppercase font-bold">
            GENERATIVE AI
          </span>
          <span className="text-[13px] font-sans font-semibold text-neutral-200 mt-0.5">
            PROFESSIONAL
          </span>
        </div>

        {/* Bottom Micro Badge */}
        <div className="absolute bottom-2.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400">
          ORACLE CLOUD INFRASTRUCTURE
        </div>
      </div>
    ),
  },
  {
    id: "ethnus-mern",
    name: "Ethnus MERN Full Stack",
    shortName: "Ethnus MERN Stack",
    issuer: "Ethnus",
    url: "https://drive.google.com/file/d/1e9T56VbocRW3v72rqeOOtx4Z5pzqGMXO/view",
    actionLabel: "View Certificate",
    themeColor: "#10B981",
    accentBg: "from-[#10B981]/25 via-[#064E3B]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#062419] via-[#0B2027] to-[#0A131A] text-white overflow-hidden">
        {/* Subtle Stack Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Layered Stack Icon */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center mb-3 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
            <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8L38 15L24 22L10 15L24 8Z" stroke="#61DAFB" strokeWidth="2" fill="#61DAFB" fillOpacity="0.2" />
              <path d="M10 22L24 29L38 22" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 29L24 36L38 29" stroke="#8CC84B" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="22" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#10B981] uppercase font-bold">
            MERN FULL STACK
          </span>
          <span className="text-[13px] font-sans font-semibold text-neutral-200 mt-0.5">
            WEB ARCHITECTURE
          </span>
        </div>

        {/* Bottom Micro Badge */}
        <div className="absolute bottom-2.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400">
          MONGO • EXPRESS • REACT • NODE
        </div>
      </div>
    ),
  },
];

export const CertificationsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const activeCert = CERTIFICATIONS[activeIndex];

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : CERTIFICATIONS.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev < CERTIFICATIONS.length - 1 ? prev + 1 : 0));
      }
    },
    []
  );

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    let isSectionInView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionInView = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    observer.observe(sectionElement);

    const keyListener = (e: KeyboardEvent) => {
      if (isSectionInView) {
        handleKeyDown(e);
      }
    };

    window.addEventListener("keydown", keyListener);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", keyListener);
    };
  }, [handleKeyDown]);

  // Restrained Autoplay (pauses on interaction, hover, hidden tab, reduced motion)
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isDragging) return;

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging, prefersReducedMotion]);

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer release if already released
    }

    if (dragOffset > 50) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : CERTIFICATIONS.length - 1));
    } else if (dragOffset < -50) {
      setActiveIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
    }
    setDragOffset(0);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CERTIFICATIONS.length - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      aria-label="Certifications"
      className="relative w-full py-24 sm:py-32 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C3E41D]/10 dark:bg-[#C3E41D]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <TimelineContent animationNum={1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C3E41D]/15 dark:bg-[#C3E41D]/10 border border-[#C3E41D]/40 text-[#495902] dark:text-[#C3E41D] text-xs font-mono uppercase tracking-wider font-bold mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CREDENTIALS</span>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950 dark:text-white">
                Certifications.
              </h2>
            </TimelineContent>
          </div>

          <TimelineContent animationNum={2} className="max-w-md">
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Credentials that reflect my learning across cloud computing, AI, and full-stack development.
            </p>
          </TimelineContent>
        </div>

        {/* Polaroid Line Carousel Container */}
        <TimelineContent animationNum={3} className="w-full">
          <div
            className="relative w-full rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200/90 dark:border-neutral-800/80 backdrop-blur-xl p-6 sm:p-10 pt-16 sm:pt-20 select-none overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Hanging String (Gentle sagging curved line across the top) */}
            <div className="absolute top-8 sm:top-10 left-0 right-0 h-16 pointer-events-none z-10 px-4 sm:px-12">
              <svg
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                className="w-full h-full stroke-neutral-400/80 dark:stroke-neutral-600/80 overflow-visible"
              >
                {/* Sagging horizontal string */}
                <path
                  d="M 0 15 Q 500 52 1000 15"
                  fill="none"
                  strokeWidth="2.2"
                  strokeDasharray="4 2"
                />
              </svg>
            </div>

            {/* Draggable Cards Carousel Viewport */}
            <div
              ref={carouselTrackRef}
              className="relative w-full min-h-[380px] sm:min-h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              aria-live="polite"
              aria-roledescription="carousel"
            >
              {CERTIFICATIONS.map((cert, index) => {
                const positionOffset = index - activeIndex;
                const isActive = index === activeIndex;

                // Restrained harmonic pendulum swinging angle
                const naturalSwayAngles = [-2.2, 1.8, -1.5, 2.0];
                const naturalSway = prefersReducedMotion ? 0 : naturalSwayAngles[index % 4];

                // Responsive positioning along the hanging string
                const horizontalSpacing = 260; // Base spacing for side cards
                const xOffset = positionOffset * horizontalSpacing + dragOffset;
                const scale = isActive ? 1.0 : 0.85;
                const opacity = Math.abs(positionOffset) <= 1 ? (isActive ? 1 : 0.6) : 0.2;
                const zIndex = isActive ? 30 : 20 - Math.abs(positionOffset);
                const rotation = naturalSway + (isDragging ? dragOffset * 0.05 : 0) + positionOffset * 3;

                // Subtle sagging height curve: center is slightly lower
                const stringSagY = Math.abs(positionOffset) * 12;

                return (
                  <div
                    key={cert.id}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      transform: `translateX(${xOffset}px) translateY(${stringSagY}px) scale(${scale}) rotate(${rotation}deg)`,
                      opacity: Math.abs(positionOffset) > 2 ? 0 : opacity,
                      zIndex,
                      transition: isDragging
                        ? "none"
                        : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
                      pointerEvents: Math.abs(positionOffset) > 1 ? "none" : "auto",
                    }}
                    className={`absolute top-6 sm:top-8 w-[230px] sm:w-[260px] md:w-[280px] p-3.5 pb-6 bg-[#FAF9F6] dark:bg-[#18181B] rounded-lg shadow-xl dark:shadow-[0_20px_45px_rgba(0,0,0,0.7)] border transition-shadow duration-300 cursor-pointer ${
                      isActive
                        ? "border-[#C3E41D]/80 dark:border-[#C3E41D]/90 shadow-2xl dark:shadow-[#C3E41D]/10 ring-2 ring-[#C3E41D]/40"
                        : "border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                    }`}
                  >
                    {/* Hanging Peg / Clothespin */}
                    <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-4 h-9 bg-amber-800/90 dark:bg-amber-900 rounded-xs shadow-md border border-amber-950/60 z-30 flex flex-col items-center justify-between py-1">
                      {/* Metallic Spring Ring */}
                      <div className="w-2.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-400 shadow-xs" />
                      <div className="w-1 h-3 bg-amber-950/70 rounded-full" />
                    </div>

                    {/* Polaroid Photo Window */}
                    <div className="w-full aspect-[4/3] rounded-sm overflow-hidden relative shadow-inner bg-neutral-900">
                      {cert.renderVisual()}
                    </div>

                    {/* Polaroid Chin / Caption Area */}
                    <div className="pt-4 text-center">
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight line-clamp-1">
                        {cert.shortName}
                      </h4>
                      {cert.examCode && (
                        <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300/60 dark:border-neutral-700">
                          {cert.examCode}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Navigation Arrow Controls */}
            <div className="flex items-center justify-between mt-2 pt-4 px-2">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous certification"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-[#C3E41D]/20 hover:text-[#495902] dark:hover:text-[#C3E41D] hover:border-[#C3E41D]/50 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {CERTIFICATIONS.map((item, idx) => (
                  <button
                    key={`dot-${item.id}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to ${item.name}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === activeIndex
                        ? "w-8 h-2.5 bg-[#5c7003] dark:bg-[#C3E41D]"
                        : "w-2.5 h-2.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next certification"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-[#C3E41D]/20 hover:text-[#495902] dark:hover:text-[#C3E41D] hover:border-[#C3E41D]/50 transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Active Certification Information & Action Panel */}
            <div className="mt-8 pt-8 border-t border-neutral-200/90 dark:border-neutral-800/90 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-[#5c7003] dark:text-[#C3E41D] tracking-wider px-2.5 py-1 rounded-full bg-[#C3E41D]/15 border border-[#C3E41D]/30">
                    0{activeIndex + 1} / 0{CERTIFICATIONS.length}
                  </span>
                  {activeCert.examCode && (
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300/70 dark:border-neutral-700">
                      Exam: {activeCert.examCode}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                  {activeCert.name}
                </h3>
              </div>

              {/* View Certificate Action Link */}
              <div className="shrink-0">
                <a
                  href={activeCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-neutral-950 dark:bg-[#C3E41D] text-white dark:text-black font-semibold text-sm hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-[0_8px_25px_rgba(195,228,29,0.3)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D]"
                >
                  <Award className="w-4 h-4" />
                  <span>{activeCert.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>
        </TimelineContent>
      </div>
    </section>
  );
};

export default CertificationsSection;
