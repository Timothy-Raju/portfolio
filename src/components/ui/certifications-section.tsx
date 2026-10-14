import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
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
    themeColor: "#FF9900",
    accentBg: "from-[#FF9900]/25 via-[#232F3E]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#232F3E] via-[#1A2332] to-[#0D131D] text-white overflow-hidden select-none">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF9900_1px,transparent_1px)] [background-size:10px_10px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#FF9900]/15 border border-[#FF9900]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(255,153,0,0.25)]">
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.2" />
              <rect x="26" y="8" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.2" />
              <rect x="16" y="26" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.3" />
              <path d="M14 22V26M34 22V26M24 22V26" stroke="#FF9900" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="24" cy="33" r="2" fill="#FF9900" />
            </svg>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#FF9900] uppercase font-bold">
            ARCHITECT ASSOCIATE
          </span>
          <span className="text-[11px] font-sans font-semibold text-neutral-300">
            SAA-C03
          </span>
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
    themeColor: "#00A4E4",
    accentBg: "from-[#00A4E4]/25 via-[#1E293B]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#0F1E2E] via-[#132238] to-[#0A121D] text-white overflow-hidden select-none">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#00A4E4]/15 blur-xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#00A4E4]/15 border border-[#00A4E4]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(0,164,228,0.25)]">
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-[10px] font-mono tracking-widest text-[#00A4E4] uppercase font-bold">
            CLOUD PRACTITIONER
          </span>
          <span className="text-[11px] font-sans font-semibold text-neutral-300">
            CLF-C02
          </span>
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
    themeColor: "#C74634",
    accentBg: "from-[#C74634]/25 via-[#2C1810]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#241212] via-[#1F1424] to-[#0E0C16] text-white overflow-hidden select-none">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C74634_1px,transparent_1px)] [background-size:12px_12px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#C74634]/15 border border-[#C74634]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(199,70,52,0.25)]">
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="14" r="3" fill="#C74634" />
              <circle cx="12" cy="30" r="3" fill="#A855F7" />
              <circle cx="36" cy="30" r="3" fill="#EC4899" />
              <circle cx="24" cy="36" r="3" fill="#F59E0B" />
              <line x1="24" y1="14" x2="12" y2="30" stroke="#C74634" strokeWidth="1.8" strokeDasharray="2 2" />
              <line x1="24" y1="14" x2="36" y2="30" stroke="#C74634" strokeWidth="1.8" strokeDasharray="2 2" />
              <line x1="12" y1="30" x2="24" y2="36" stroke="#A855F7" strokeWidth="1.8" />
              <line x1="36" y1="30" x2="24" y2="36" stroke="#EC4899" strokeWidth="1.8" />
              <circle cx="24" cy="25" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#E06D53] uppercase font-bold">
            GENERATIVE AI
          </span>
          <span className="text-[11px] font-sans font-semibold text-neutral-300">
            PROFESSIONAL
          </span>
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
    themeColor: "#10B981",
    accentBg: "from-[#10B981]/25 via-[#064E3B]/80 to-[#0F172A]",
    renderVisual: () => (
      <div className="w-full h-full relative flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#062419] via-[#0B2027] to-[#0A131A] text-white overflow-hidden select-none">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:10px_10px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8L38 15L24 22L10 15L24 8Z" stroke="#61DAFB" strokeWidth="2" fill="#61DAFB" fillOpacity="0.2" />
              <path d="M10 22L24 29L38 22" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 29L24 36L38 29" stroke="#8CC84B" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="22" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-bold">
            MERN FULL STACK
          </span>
          <span className="text-[11px] font-sans font-semibold text-neutral-300">
            WEB ARCHITECTURE
          </span>
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
  const [dragDistance, setDragDistance] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [windAngle, setWindAngle] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const lastMouseX = useRef(0);
  const lastMouseTime = useRef(Date.now());
  const targetWindRef = useRef(0);
  const currentWindRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const activeCert = CERTIFICATIONS[activeIndex];

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Keyboard navigation
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

  // Restrained Autoplay (pauses on hover, drag, hidden tab, reduced motion)
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isDragging) return;

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging, prefersReducedMotion]);

  // Wind & Clothesline Physics Loop
  // When cursor moves, target wind swings cards in opposite direction of movement.
  // Spring physics smoothly damps the swinging motion back to rest.
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;
    let time = 0;

    const physicsLoop = () => {
      if (!isRunning) return;
      time += 0.02;

      // Spring damping physics
      const springK = 0.14;
      const damping = 0.85;
      const force = (targetWindRef.current - currentWindRef.current) * springK;
      currentWindRef.current = (currentWindRef.current + force) * damping;

      // Decay target wind smoothly back to 0
      targetWindRef.current *= 0.88;

      // Idle ambient breeze wave when cards are idle
      const ambientBreeze = Math.sin(time) * 1.2;
      setWindAngle(currentWindRef.current + ambientBreeze);

      animationFrameId.current = requestAnimationFrame(physicsLoop);
    };

    animationFrameId.current = requestAnimationFrame(physicsLoop);

    return () => {
      isRunning = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [prefersReducedMotion]);

  // Mouse Move Wind detection
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const now = Date.now();
    const dt = Math.max(1, now - lastMouseTime.current);
    const dx = e.clientX - lastMouseX.current;

    // Moving mouse to the right causes wind blowing cards to the left (negative angle)
    // Moving mouse to the left causes wind blowing cards to the right (positive angle)
    const velocity = (dx / dt) * 16;
    const impulse = -Math.max(-14, Math.min(14, velocity * 0.45));

    targetWindRef.current = impulse;
    lastMouseX.current = e.clientX;
    lastMouseTime.current = now;
  };

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    setDragDistance(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
    setDragDistance(Math.abs(diff));

    // Dragging causes opposite tilt momentum
    targetWindRef.current = -diff * 0.08;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    if (dragOffset > 60) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : CERTIFICATIONS.length - 1));
      targetWindRef.current = 8;
    } else if (dragOffset < -60) {
      setActiveIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
      targetWindRef.current = -8;
    }
    setDragOffset(0);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CERTIFICATIONS.length - 1));
    targetWindRef.current = 9;
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
    targetWindRef.current = -9;
  };

  const handleCardClick = (index: number) => {
    // Only center card if user clicked rather than dragged
    if (dragDistance < 10) {
      const step = index - activeIndex;
      targetWindRef.current = -step * 5;
      setActiveIndex(index);
    }
  };

  // Spacing and sizing constants
  // Cards are 240px wide, spaced at 320px for clear breathing room
  const CARD_SPACING = 310;
  const HALF_WIDTH = 550;
  const ROPE_SAG = 26; // Catenary sag depth in pixels
  const ROPE_BASE_Y = 22; // Rope height at edges

  return (
    <section
      id="certifications"
      ref={sectionRef}
      aria-label="Certifications"
      className="relative w-full py-12 sm:py-16 md:py-20 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#C3E41D]/10 dark:bg-[#C3E41D]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <TimelineContent animationNum={1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C3E41D]/15 dark:bg-[#C3E41D]/10 border border-[#C3E41D]/40 text-[#495902] dark:text-[#C3E41D] text-xs font-mono uppercase tracking-wider font-bold mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CREDENTIALS</span>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 dark:text-white">
                Certifications.
              </h2>
            </TimelineContent>
          </div>

          <TimelineContent animationNum={2} className="max-w-md">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Credentials that reflect my learning across cloud computing, AI, and full-stack development.
            </p>
          </TimelineContent>
        </div>

        {/* Polaroid Clothesline Carousel Container */}
        <TimelineContent animationNum={3} className="w-full">
          <div
            className="relative w-full rounded-2xl sm:rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/30 border border-neutral-200/80 dark:border-neutral-800/70 backdrop-blur-md px-3 sm:px-6 pt-5 pb-5 select-none overflow-hidden shadow-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Hanging Rope (A continuous curved string spanning the full container width) */}
            <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10">
              <svg
                viewBox="0 0 1100 80"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                {/* Authentic Earthen Twine String */}
                <path
                  d="M 0 22 Q 550 74 1100 22"
                  fill="none"
                  stroke="#9E8D77"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="dark:stroke-[#786958]"
                />
                {/* Delicate rope highlight */}
                <path
                  d="M 0 21.5 Q 550 73.5 1100 21.5"
                  fill="none"
                  stroke="#C7BBAA"
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                  className="dark:stroke-[#9E8E7C] dark:stroke-opacity-40"
                />
              </svg>
            </div>

            {/* Left Navigation Arrow (Vertically aligned with the cards) */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous certification"
              className="absolute left-2 sm:left-4 top-[48%] -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/90 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-[#C3E41D] hover:text-black dark:hover:bg-[#C3E41D] dark:hover:text-black hover:border-[#C3E41D] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Navigation Arrow (Vertically aligned with the cards) */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next certification"
              className="absolute right-2 sm:right-4 top-[48%] -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/90 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-[#C3E41D] hover:text-black dark:hover:bg-[#C3E41D] dark:hover:text-black hover:border-[#C3E41D] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Draggable Hanging Clothesline Track */}
            <div
              ref={carouselTrackRef}
              className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
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

                // Horizontal position relative to center
                const xOffset = positionOffset * CARD_SPACING + dragOffset;

                // Mathematical catenary sag: the clip height matches the exact rope curve
                // Parabolic sag equation: Y = ropeBaseY + sag * (1 - (x / halfWidth)^2)
                const normalizedX = Math.max(-1, Math.min(1, xOffset / HALF_WIDTH));
                const ropeY = ROPE_BASE_Y + ROPE_SAG * (1 - normalizedX * normalizedX);

                // Natural resting angle + dynamic wind tilt + propagation delay across clothes
                const baseRestAngle = [-2.2, 1.8, -1.5, 2.0][index % 4];
                // Adjacent cards follow wind with a slight chain-reaction propagation factor
                const propagation = 1 - Math.min(0.5, Math.abs(positionOffset) * 0.15);
                const currentTilt = prefersReducedMotion
                  ? 0
                  : baseRestAngle + windAngle * propagation + (isDragging ? -dragOffset * 0.04 : 0);

                const scale = isActive ? 1.0 : 0.88;
                const opacity = Math.abs(positionOffset) <= 1.5 ? (isActive ? 1 : 0.65) : 0.2;
                const zIndex = isActive ? 30 : 20 - Math.abs(positionOffset);

                return (
                  <div
                    key={cert.id}
                    onClick={() => handleCardClick(index)}
                    style={{
                      transform: `translateX(${xOffset}px) translateY(${ropeY}px) scale(${scale}) rotate(${currentTilt}deg)`,
                      transformOrigin: "50% 0px", // Pivots right at the clothespin attachment point!
                      opacity: Math.abs(positionOffset) > 2.2 ? 0 : opacity,
                      zIndex,
                      transition: isDragging
                        ? "none"
                        : "transform 0.5s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.4s ease",
                      cursor: "pointer",
                    }}
                    className={`absolute top-0 w-[220px] sm:w-[245px] p-2.5 pb-4 bg-[#FAF8F5] dark:bg-[#1A1A1D] rounded-xs shadow-[0_10px_25px_rgba(0,0,0,0.14)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.65)] border transition-all duration-300 group ${
                      isActive
                        ? "border-[#C3E41D]/90 ring-2 ring-[#C3E41D]/40 shadow-xl"
                        : "border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                    }`}
                  >
                    {/* Clothespin / Wooden Laundry Peg attached directly onto the rope & card */}
                    <div
                      className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-3.5 h-9 z-30 select-none pointer-events-none drop-shadow-md"
                      aria-hidden="true"
                    >
                      {/* Wooden Peg Body */}
                      <div className="w-full h-full relative bg-gradient-to-r from-[#D7A168] via-[#F2CFA6] to-[#BF8850] dark:from-[#A87645] dark:via-[#C4925C] dark:to-[#8F5E2F] rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
                        {/* Top split between clothespin handles */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#784A20]/60 dark:bg-black/60" />

                        {/* Metallic Spring Clamp in the middle */}
                        <div className="absolute top-[12px] -left-[1.5px] -right-[1.5px] h-[5px] bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 dark:from-neutral-600 dark:via-neutral-300 dark:to-neutral-600 rounded-xs shadow-[0_1px_1px_rgba(0,0,0,0.4)] border-[0.5px] border-neutral-500/50" />

                        {/* Rope notch indication (Rope passes right through here!) */}
                        <div className="absolute top-[16px] left-0 right-0 h-[3px] bg-black/15 dark:bg-black/30 pointer-events-none" />

                        {/* Bottom jaw slot pinching the Polaroid card */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#784A20]/60 dark:bg-black/60" />
                      </div>
                    </div>

                    {/* Polaroid Photo Frame Window */}
                    <div className="w-full aspect-[4/3] rounded-xs overflow-hidden relative shadow-inner bg-neutral-900 border border-neutral-300/40 dark:border-neutral-700/50">
                      {cert.renderVisual()}
                    </div>

                    {/* Polaroid Chin Caption (Handwritten / Classic Serif title like reference) */}
                    <div className="pt-2.5 px-1 text-center">
                      <p className="text-xs sm:text-sm font-serif italic text-neutral-800 dark:text-neutral-200 tracking-tight truncate">
                        {cert.shortName}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Certification Name & Small Direct Link Icon */}
            {/* Positioned right below the cards with minimal gap */}
            <div className="mt-2 sm:mt-3 pt-3 flex items-center justify-center gap-2.5 px-4 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {activeCert.name}
              </h3>

              <a
                href={activeCert.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open certificate for ${activeCert.name}`}
                aria-label={`Open certificate for ${activeCert.name}`}
                className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-200/80 hover:bg-[#C3E41D] dark:bg-neutral-800 dark:hover:bg-[#C3E41D] text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-black transition-all duration-200 hover:scale-110 active:scale-95 shadow-xs cursor-pointer shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </TimelineContent>
      </div>
    </section>
  );
};

export default CertificationsSection;
