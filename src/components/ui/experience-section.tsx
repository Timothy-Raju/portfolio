import React, { useState, useEffect, useRef } from "react";
import { Briefcase, Building2, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { TimelineContent } from "./timeline-content";

export const ExperienceSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // 3D subtle tilt handler for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 5 degrees tilt for elegance
    const rotateX = ((centerY - y) / centerY) * 4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Professional Experience"
      className="relative w-full py-24 sm:py-32 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white overflow-hidden border-t border-neutral-200 dark:border-neutral-900 scroll-mt-20 sm:scroll-mt-24 selection:bg-[#C3E41D] selection:text-black transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-48 w-[450px] h-[450px] rounded-full blur-[160px] opacity-10 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 sm:mb-20">
          <div>
            <TimelineContent animationNum={1} className="mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-sm text-xs font-mono uppercase tracking-widest text-[#5c7003] dark:text-[#C3E41D] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] animate-pulse" />
                WORK EXPERIENCE
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                Experience.
              </h2>
            </TimelineContent>
          </div>

          <TimelineContent animationNum={2} className="max-w-xs">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Upcoming professional milestones and corporate industry engagements.
            </p>
          </TimelineContent>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Spine Line */}
          <div
            className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900" />
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#5c7003] via-[#C3E41D] to-transparent dark:from-[#C3E41D] dark:via-[#C3E41D]/70 dark:to-transparent transition-all duration-1000 ease-out"
              style={{
                height: isInView ? "100%" : "0%",
              }}
            />
          </div>

          {/* Featured Card Wrapper */}
          <TimelineContent animationNum={3} className="relative pl-16 sm:pl-20">
            {/* Timeline Marker Node */}
            <div
              className={`absolute left-2.5 sm:left-4.5 -translate-x-1/2 top-8 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                isInView
                  ? "border-[#5c7003] dark:border-[#C3E41D] bg-white dark:bg-black text-[#5c7003] dark:text-[#C3E41D] shadow-[0_0_20px_rgba(195,228,29,0.4)] scale-110"
                  : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-400"
              }`}
            >
              <Briefcase className="w-4 h-4" />
            </div>

            {/* 3D Tilt Card Container */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              tabIndex={0}
              style={{
                transform: !isTouchDevice && isHovered
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`
                  : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
                transition: isHovered ? "transform 0.12s ease-out" : "transform 0.5s ease-out",
                willChange: "transform",
              }}
              className="relative rounded-3xl p-[1.5px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D]"
            >
              {/* Animated Light Sweep / Gradient Border */}
              <div
                className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${
                  isHovered
                    ? "opacity-100 bg-gradient-to-r from-[#C3E41D] via-[#84cc16] to-[#C3E41D]"
                    : "opacity-40 bg-gradient-to-r from-[#C3E41D]/30 via-neutral-300 dark:via-neutral-800 to-[#C3E41D]/30"
                }`}
                style={{
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Inner Card Content */}
              <div className="relative rounded-[22px] bg-white/95 dark:bg-neutral-950/90 backdrop-blur-xl p-7 sm:p-9 shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                {/* Top Row: Status Label & Timing Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C3E41D]/15 dark:bg-[#C3E41D]/10 border border-[#C3E41D]/40 text-[#495902] dark:text-[#C3E41D] text-xs font-mono uppercase tracking-wider font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] animate-ping" />
                    <span>UPCOMING INTERNSHIP</span>
                  </div>

                  {/* Future Horizon Tag */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <Calendar className="w-3.5 h-3.5 text-[#5c7003] dark:text-[#C3E41D]" />
                    <span>Incoming</span>
                  </div>
                </div>

                {/* Company & Role Headline */}
                <div className="space-y-2 mb-6">
                  {/* Styled Deloitte Company Name with signature green dot */}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 dark:text-white"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      Deloitte
                    </span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] inline-block mb-1 shadow-[0_0_8px_rgba(195,228,29,0.8)]" />
                  </div>

                  {/* Role Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                    <span>PDI Analyst Intern</span>
                    <ArrowUpRight className="w-5 h-5 text-[#5c7003] dark:text-[#C3E41D] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                </div>

                {/* Editorial Summary Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                  Selected as an incoming{" "}
                  <strong className="font-semibold text-neutral-950 dark:text-white">
                    PDI Analyst Intern
                  </strong>{" "}
                  at{" "}
                  <strong className="font-semibold text-neutral-950 dark:text-white">
                    Deloitte
                  </strong>
                  . Preparing to collaborate on enterprise technology consulting, digital
                  engineering, and large-scale software solutions.
                </div>

                {/* Details Footer */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 border-t border-neutral-200 dark:border-neutral-900 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#5c7003] dark:text-[#C3E41D]" />
                    <span>Technology Consulting & Advisory</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#5c7003] dark:text-[#C3E41D]" />
                    <span>India</span>
                  </div>
                </div>
              </div>
            </div>
          </TimelineContent>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
