import React, { useEffect, useRef, useState, useMemo } from "react";

export interface VerticalCutRevealProps {
  children: string;
  splitBy?: "words" | "characters" | "lines";
  staggerDuration?: number; // duration between segments in seconds
  staggerDelay?: number; // initial delay before starting animation in seconds
  duration?: number; // animation duration of each item in seconds
  containerClassName?: string;
  className?: string;
  autoStart?: boolean;
}

export const VerticalCutReveal: React.FC<VerticalCutRevealProps> = ({
  children,
  splitBy = "words",
  staggerDuration = 0.04,
  staggerDelay = 0.1,
  duration = 0.6,
  containerClassName = "",
  className = "",
  autoStart = true,
}) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!autoStart) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [autoStart]);

  const segments = useMemo(() => {
    if (splitBy === "lines") {
      return children.split("\n");
    }
    if (splitBy === "characters") {
      return children.split("");
    }
    return children.split(" ");
  }, [children, splitBy]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap items-baseline gap-x-[0.28em] ${containerClassName}`}
      aria-label={children}
    >
      {segments.map((segment, idx) => {
        const delaySec = prefersReducedMotion ? 0 : staggerDelay + idx * staggerDuration;
        const isRevealed = prefersReducedMotion || inView;

        return (
          <span
            key={idx}
            className="overflow-hidden inline-block align-baseline py-1 -my-1"
            aria-hidden="true"
          >
            <span
              className={`inline-block transform-gpu transition-all ${className}`}
              style={{
                transform: isRevealed ? "translateY(0%)" : "translateY(115%)",
                opacity: isRevealed ? 1 : 0,
                transitionDuration: prefersReducedMotion ? "0.01s" : `${duration}s`,
                transitionDelay: `${delaySec}s`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform, opacity",
              }}
            >
              {segment}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default VerticalCutReveal;
