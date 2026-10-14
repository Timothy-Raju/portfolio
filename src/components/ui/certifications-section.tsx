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
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#FF9900]/15 border border-[#FF9900]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(255,153,0,0.25)]">
            <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.2" />
              <rect x="26" y="8" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.2" />
              <rect x="16" y="26" width="16" height="14" rx="2" stroke="#FF9900" strokeWidth="2" fill="#FF9900" fillOpacity="0.3" />
              <path d="M14 22V26M34 22V26M24 22V26" stroke="#FF9900" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="24" cy="33" r="2" fill="#FF9900" />
            </svg>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#FF9900] uppercase font-bold">
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
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#00A4E4]/15 border border-[#00A4E4]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(0,164,228,0.25)]">
            <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00A4E4] uppercase font-bold">
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
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#C74634]/15 border border-[#C74634]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(199,70,52,0.25)]">
            <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#E06D53] uppercase font-bold">
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
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8L38 15L24 22L10 15L24 8Z" stroke="#61DAFB" strokeWidth="2" fill="#61DAFB" fillOpacity="0.2" />
              <path d="M10 22L24 29L38 22" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 29L24 36L38 29" stroke="#8CC84B" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="22" r="1.5" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-bold">
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [windAngle, setWindAngle] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isPointerDownRef = useRef(false);
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

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

  // Autoplay (pauses on hover, drag, hidden tab, reduced motion)
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
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;
    let time = 0;

    const physicsLoop = () => {
      if (!isRunning) return;
      time += 0.02;

      const springK = 0.14;
      const damping = 0.85;
      const force = (targetWindRef.current - currentWindRef.current) * springK;
      currentWindRef.current = (currentWindRef.current + force) * damping;

      targetWindRef.current *= 0.88;

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

    const velocity = (dx / dt) * 16;
    const impulse = -Math.max(-14, Math.min(14, velocity * 0.45));

    targetWindRef.current = impulse;
    lastMouseX.current = e.clientX;
    lastMouseTime.current = now;
  };

  // Pointer drag controls with clear threshold so clicks always register
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const diff = e.clientX - pointerStartPos.current.x;

    if (!hasMovedRef.current && Math.abs(diff) > 8) {
      hasMovedRef.current = true;
      setIsDragging(true);
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }

    if (hasMovedRef.current) {
      setDragOffset(diff);
      targetWindRef.current = -diff * 0.08;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (hasMovedRef.current) {
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
    }
    setDragOffset(0);
    hasMovedRef.current = false;
  };

  const selectCard = (index: number) => {
    setActiveIndex(index);
    const step = index - activeIndex;
    targetWindRef.current = -step * 6;
    cardRefs.current[index]?.focus();
  };

  const goToPrev = () => {
    setActiveIndex((prev) => {
      const nextIdx = prev > 0 ? prev - 1 : CERTIFICATIONS.length - 1;
      cardRefs.current[nextIdx]?.focus();
      return nextIdx;
    });
    targetWindRef.current = 9;
  };

  const goToNext = () => {
    setActiveIndex((prev) => {
      const nextIdx = (prev + 1) % CERTIFICATIONS.length;
      cardRefs.current[nextIdx]?.focus();
      return nextIdx;
    });
    targetWindRef.current = -9;
  };

  // Dimensions & Catenary Sag Parameters
  // Cards are 220px wide (reduced 10%), spaced at 300px
  const CARD_SPACING = 300;
  const HALF_WIDTH = 550;
  const ROPE_SAG = 26;
  const ROPE_BASE_Y = 24;

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
            className="relative w-full rounded-2xl sm:rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 backdrop-blur-md px-3 sm:px-6 pt-5 pb-5 select-none overflow-hidden shadow-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Hanging Rope (Continuous curved string spanning the container) */}
            <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10">
              <svg
                viewBox="0 0 1100 80"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
              >
                {/* Earthen Twine String */}
                <path
                  d="M 0 24 Q 550 76 1100 24"
                  fill="none"
                  stroke="#9E8D77"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="dark:stroke-[#8C7B68]"
                />
                {/* Rope highlight */}
                <path
                  d="M 0 23.5 Q 550 75.5 1100 23.5"
                  fill="none"
                  stroke="#C7BBAA"
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                  className="dark:stroke-[#B5A593] dark:stroke-opacity-40"
                />
              </svg>
            </div>

            {/* Draggable Hanging Clothesline Track */}
            <div
              ref={carouselTrackRef}
              className="relative w-full h-[340px] sm:h-[370px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
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

                const xOffset = positionOffset * CARD_SPACING + dragOffset;

                // Mathematical catenary sag: clip Contact Point matches the rope
                const normalizedX = Math.max(-1, Math.min(1, xOffset / HALF_WIDTH));
                const ropeY = ROPE_BASE_Y + ROPE_SAG * (1 - normalizedX * normalizedX);

                const baseRestAngle = [-2.2, 1.8, -1.5, 2.0][index % 4];
                const propagation = 1 - Math.min(0.5, Math.abs(positionOffset) * 0.15);
                const currentTilt = prefersReducedMotion
                  ? 0
                  : baseRestAngle + windAngle * propagation + (isDragging ? -dragOffset * 0.04 : 0);

                const scale = isActive ? 1.0 : 0.88;
                // High contrast visibility in dark mode for side cards
                const opacity = Math.abs(positionOffset) <= 1 ? (isActive ? 1 : 0.82) : 0.65;
                const zIndex = isActive ? 30 : 20 - Math.abs(positionOffset);

                // Card is positioned so the clip's bottom jaw just contacts the top border
                // without penetrating down into the card body (clip sits between rope and card)
                const cardTopY = ropeY + 34;

                return (
                  <button
                    key={cert.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => selectCard(index)}
                    aria-label={`Select ${cert.name}`}
                    style={{
                      transform: `translateX(${xOffset}px) translateY(${cardTopY}px) scale(${scale}) rotate(${currentTilt}deg)`,
                      transformOrigin: "50% -34px", // Rotates around the rope clamp point!
                      opacity: Math.abs(positionOffset) > 2.2 ? 0 : opacity,
                      zIndex,
                      transition: isDragging
                        ? "none"
                        : "transform 0.5s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.4s ease, border-color 0.3s ease",
                      cursor: "pointer",
                    }}
                    className={`absolute top-0 w-[215px] sm:w-[225px] p-2.5 pb-5 rounded-xs transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D] ${
                      /* Distinct, elevated card styling with crisp dark mode contrast */
                      isActive
                        ? "bg-[#FAF8F5] dark:bg-[#2A2A32] border-2 border-[#C3E41D] dark:border-[#C3E41D] ring-2 ring-[#C3E41D]/40 shadow-xl dark:shadow-[0_0_25px_rgba(195,228,29,0.25)]"
                        : "bg-[#F7F5F0] dark:bg-[#24242A] border-2 border-neutral-300/90 dark:border-neutral-600/90 hover:border-neutral-400 dark:hover:border-neutral-400 shadow-md dark:shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]"
                    }`}
                  >
                    {/* Clothespin / Laundry Peg (+20% height = 44px, -20% width = 11px) */}
                    {/* Suspended between rope and card: just contacts the card's top edge without penetrating */}
                    <div
                      className="absolute -top-[42px] left-1/2 -translate-x-1/2 w-[11px] h-[44px] z-30 select-none pointer-events-none drop-shadow-md"
                      aria-hidden="true"
                    >
                      {/* Wooden Peg Body */}
                      <div className="w-full h-full relative bg-gradient-to-r from-[#D7A168] via-[#F2CFA6] to-[#BF8850] dark:from-[#A87645] dark:via-[#C4925C] dark:to-[#8F5E2F] rounded-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                        {/* Top split between clothespin handles */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3.5 bg-[#784A20]/60 dark:bg-black/60" />

                        {/* Top notch where clip contacts the rope */}
                        <div className="absolute top-[8px] left-0 right-0 h-[2.5px] bg-black/20 dark:bg-black/40" />

                        {/* Metallic Spring Clamp in the middle */}
                        <div className="absolute top-[17px] -left-[1.5px] -right-[1.5px] h-[5px] bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 dark:from-neutral-600 dark:via-neutral-300 dark:to-neutral-600 rounded-xs shadow-[0_1px_1px_rgba(0,0,0,0.4)] border-[0.5px] border-neutral-500/50" />

                        {/* Bottom jaw slot that kisses/contacts the card edge */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-[#784A20]/60 dark:bg-black/60" />
                      </div>
                    </div>

                    {/* Polaroid Photo Frame Window (+10% height) */}
                    <div className="w-full h-[155px] sm:h-[165px] rounded-xs overflow-hidden relative shadow-inner bg-neutral-900 border border-neutral-300/60 dark:border-neutral-700/70">
                      {cert.renderVisual()}
                    </div>

                    {/* Polaroid Chin Caption */}
                    <div className="pt-3 px-1 text-center">
                      <p className="text-xs sm:text-sm font-serif italic text-neutral-800 dark:text-neutral-100 tracking-tight truncate">
                        {cert.shortName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls Bar: Left Active Title & Link | Right Indicator Dots & Nav Buttons */}
            <div className="mt-3 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
              {/* Left: Active Certification Title with Direct Link Icon */}
              <div className="flex items-center gap-2.5 min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-neutral-950 dark:text-white truncate">
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

              {/* Right: Dots and Navigation Arrow Buttons Together */}
              <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
                {/* Indicator Dots */}
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Certification slides">
                  {CERTIFICATIONS.map((item, idx) => (
                    <button
                      key={`dot-${item.id}`}
                      type="button"
                      onClick={() => selectCard(idx)}
                      aria-label={`Go to ${item.name}`}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        idx === activeIndex
                          ? "w-6 h-2 bg-[#5c7003] dark:bg-[#C3E41D]"
                          : "w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons (< and > together on the bottom right) */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrev}
                    aria-label="Previous certification"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-[#C3E41D] hover:text-black dark:hover:bg-[#C3E41D] dark:hover:text-black hover:border-[#C3E41D] transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next certification"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-[#C3E41D] hover:text-black dark:hover:bg-[#C3E41D] dark:hover:text-black hover:border-[#C3E41D] transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TimelineContent>
      </div>
    </section>
  );
};

export default CertificationsSection;
