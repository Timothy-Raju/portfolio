import React, { useState, useEffect, useRef } from "react";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  borderRadius?: string;
  innerRadius?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  innerClassName = "",
  borderRadius = "rounded-3xl",
  innerRadius = "rounded-[22px]",
  maxTilt = 4.5,
  style,
  onMouseMove: userMouseMove,
  onMouseEnter: userMouseEnter,
  onMouseLeave: userMouseLeave,
  ...props
}) => {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userMouseMove) userMouseMove(e);
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userMouseEnter) userMouseEnter(e);
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userMouseLeave) userMouseLeave(e);
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      style={{
        transform:
          !isTouchDevice && isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
        transition: isHovered ? "transform 0.12s ease-out" : "transform 0.5s ease-out",
        willChange: "transform",
        ...style,
      }}
      className={`relative ${borderRadius} p-[1.5px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D] ${className}`}
      {...props}
    >
      {/* Animated Light Sweep / Gradient Border */}
      <div
        className={`absolute inset-0 ${borderRadius} transition-opacity duration-700 pointer-events-none ${
          isHovered
            ? "opacity-100 bg-gradient-to-r from-[#C3E41D] via-[#84cc16] to-[#C3E41D]"
            : "opacity-40 bg-gradient-to-r from-[#C3E41D]/30 via-neutral-300 dark:via-neutral-800 to-[#C3E41D]/30"
        }`}
        style={{
          backgroundSize: "200% 200%",
        }}
        aria-hidden="true"
      />

      {/* Inner Card Container */}
      <div className={`relative ${innerRadius} h-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
