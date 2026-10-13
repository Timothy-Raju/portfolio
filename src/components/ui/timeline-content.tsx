import React, { useEffect, useRef, useState } from "react";

export interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animationNum?: number;
  delay?: number; // delay in seconds (if not using animationNum * step)
  timelineStepDelay?: number; // base delay per step in seconds
  duration?: number; // animation duration in seconds
  className?: string;
  threshold?: number;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  animationNum = 1,
  delay,
  timelineStepDelay = 0.12,
  duration = 0.65,
  className = "",
  threshold = 0.15,
  style,
  ...props
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const calculatedDelay = prefersReducedMotion
    ? 0
    : delay !== undefined
    ? delay
    : (animationNum - 1) * timelineStepDelay;

  const isRevealed = prefersReducedMotion || inView;

  return (
    <div
      ref={ref}
      className={`transition-all transform-gpu ${className}`}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "translateY(0)" : "translateY(24px)",
        filter: isRevealed ? "blur(0px)" : "blur(8px)",
        transitionDuration: prefersReducedMotion ? "0.01s" : `${duration}s`,
        transitionDelay: `${calculatedDelay}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity, filter",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default TimelineContent;
