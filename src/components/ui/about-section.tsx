import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  MapPin,
  Mail,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Code2,
} from "lucide-react";
import { VerticalCutReveal } from "./vertical-cut-reveal";
import { TimelineContent } from "./timeline-content";

// Brand SVG Icons
const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// LeetCode custom icon to match official styling
const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.21 2.383 5.385 5.385 0 0 0 .548 4.298c.459.778 1.117 1.41 1.908 1.832l4.896 2.628c.42.227.89.347 1.368.35h.016a2.76 2.76 0 0 0 1.956-.814l8.802-8.802a1.374 1.374 0 0 0 0-1.942 1.374 1.374 0 0 0-1.942 0l-8.4 8.4a.52.52 0 0 1-.367.153h-.003a.52.52 0 0 1-.257-.066l-4.9-2.63a2.63 2.63 0 0 1-.933-.896 2.63 2.63 0 0 1-.268-2.1c.143-.59.458-1.127.91-1.554l3.86-4.133 5.4-5.787a1.374 1.374 0 0 0-.996-2.072zm2.935 9.213a1.374 1.374 0 0 0-.972 2.345l3.208 3.208a1.374 1.374 0 0 0 1.943-1.943l-3.207-3.208a1.37 1.37 0 0 0-.972-.402z" />
  </svg>
);

// Animated counter hook for statistics
function useCountUp(end: number, duration: number = 1600, decimals: number = 0, startTrigger: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easedProgress * end);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, startTrigger]);

  return count.toFixed(decimals);
}

export interface AboutSectionProps {
  avatarUrl?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  avatarUrl = "/profile.png",
}) => {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const cgpaValue = useCountUp(9.54, 1500, 2, statsInView);
  const projectsValue = useCountUp(10, 1400, 0, statsInView);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/thimothi-raju",
      icon: LinkedinIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/Timothy-Raju",
      icon: GithubIcon,
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/fBAwIMcOGv/",
      icon: LeetCodeIcon,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rajupalanki9757?dlrf=cjdodDZqMjIzeW45",
      icon: InstagramIcon,
    },
  ];

  const focusLabels = ["Software Development", "Automation", "AI"];

  return (
    <section
      id="about"
      aria-label="About Thimothi Raju"
      className="relative w-full py-24 sm:py-32 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white overflow-hidden border-t border-neutral-200 dark:border-neutral-900 scroll-mt-20 sm:scroll-mt-24 selection:bg-[#C3E41D] selection:text-black transition-colors duration-300"
    >
      {/* Subtle ambient background glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-100px] w-[450px] h-[450px] rounded-full blur-[160px] opacity-15 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Tag */}
        <TimelineContent animationNum={1} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-sm text-xs font-mono uppercase tracking-widest text-[#5c7003] dark:text-[#C3E41D] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] animate-pulse" />
            WHO I AM
          </div>
        </TimelineContent>

        {/* Main Heading with Vertical-Cut Reveal */}
        <div className="mb-14 sm:mb-20 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
            <VerticalCutReveal
              splitBy="words"
              staggerDelay={0.08}
              staggerDuration={0.05}
              className="text-neutral-950 dark:text-white hover:text-[#5c7003] dark:hover:text-[#C3E41D] transition-colors duration-300"
            >
              Turning Ideas Into Useful Software.
            </VerticalCutReveal>
          </h2>
        </div>

        {/* Main Grid: Left Story & Stats, Right Personal Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Narrative, Statistics, CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Introduction Paragraphs */}
            <TimelineContent animationNum={2} className="space-y-5">
              <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                I'm a Computer Science Engineering student who enjoys turning ideas into
                practical software solutions. I like exploring new technologies, experimenting
                with code, and building projects that solve real problems. My interests span
                full-stack development, developer productivity, automation, and AI-powered
                applications.
              </p>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                I believe the best way to learn technology is by building with it. Through
                personal projects and hands-on experimentation, I continue to strengthen my
                technical skills, explore new ideas, and improve as a software developer.
              </p>
            </TimelineContent>

            {/* Statistics Section */}
            <div ref={statsRef}>
              <TimelineContent animationNum={3}>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
                  {/* Stat 1: CGPA */}
                  <div className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-950/70 p-6 sm:p-7 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-300 hover:border-[#5c7003]/40 dark:hover:border-[#C3E41D]/50 hover:bg-neutral-100/60 dark:hover:bg-neutral-900/50">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-[#5c7003] dark:text-[#C3E41D] tracking-tight">
                      {cgpaValue}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                      CGPA
                    </div>
                    <div className="mt-1 text-[11px] text-neutral-500 font-sans">
                      Academic Performance
                    </div>
                  </div>

                  {/* Stat 2: Projects */}
                  <div className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800/90 bg-white/80 dark:bg-neutral-950/70 p-6 sm:p-7 backdrop-blur-md shadow-sm dark:shadow-none transition-all duration-300 hover:border-[#5c7003]/40 dark:hover:border-[#C3E41D]/50 hover:bg-neutral-100/60 dark:hover:bg-neutral-900/50">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-[#5c7003] dark:text-[#C3E41D] tracking-tight">
                      {projectsValue}+
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                      Projects
                    </div>
                    <div className="mt-1 text-[11px] text-neutral-500 font-sans">
                      Built & Experimented
                    </div>
                  </div>
                </div>
              </TimelineContent>
            </div>

            {/* Contact Call to Action */}
            <TimelineContent animationNum={4} className="pt-2">
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/60 shadow-sm dark:shadow-none backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
                    Have an idea or want to collaborate?
                  </div>
                  <a
                    href="mailto:rajupalanki1037@gmail.com"
                    className="text-base sm:text-lg font-medium text-neutral-900 dark:text-white hover:text-[#5c7003] dark:hover:text-[#C3E41D] transition-colors inline-flex items-center gap-2 group"
                  >
                    <Mail className="w-4 h-4 text-[#5c7003] dark:text-[#C3E41D]" />
                    <span>rajupalanki1037@gmail.com</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-[#5c7003] dark:group-hover:text-[#C3E41D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>

                <a
                  href="mailto:rajupalanki1037@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#C3E41D] text-black hover:bg-[#b5d613] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(195,228,29,0.35)] shrink-0"
                >
                  LET'S CONNECT
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </TimelineContent>
          </div>

          {/* Right Column: Compact Identity Card & Social Links (5 cols) */}
          <div className="lg:col-span-5">
            <TimelineContent animationNum={3}>
              <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl dark:shadow-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
                {/* Visual Top Bar Accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C3E41D] dark:via-[#C3E41D]/40 to-transparent" />

                {/* Profile Portrait & Mask Composition */}
                <div className="flex items-center gap-5 sm:gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-900">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#5c7003]/40 dark:border-[#C3E41D]/40 bg-neutral-100 dark:bg-neutral-900 shrink-0 shadow-lg group">
                    <img
                      src={avatarUrl}
                      alt="Thimothi Raju portrait"
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes("images/profile.jpg")) {
                          target.src = "/images/profile.jpg";
                        } else {
                          target.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C3E41D]/20 dark:bg-[#C3E41D]/10 border border-[#C3E41D]/50 dark:border-[#C3E41D]/20 text-[10px] font-mono uppercase tracking-wider text-[#495902] dark:text-[#C3E41D] mb-1.5">
                      <Sparkles className="w-3 h-3" /> Developer Profile
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white uppercase"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      THIMOTHI RAJU
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                      Computer Science Engineering Student
                    </p>
                  </div>
                </div>

                {/* Academic & Location Metadata */}
                <div className="py-6 space-y-3.5 border-b border-neutral-200 dark:border-neutral-900 text-sm">
                  <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-[#5c7003] dark:text-[#C3E41D] shrink-0 border border-neutral-200 dark:border-neutral-800">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                        University
                      </div>
                      <div className="font-medium text-neutral-950 dark:text-white">
                        VIT-AP University
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-[#5c7003] dark:text-[#C3E41D] shrink-0 border border-neutral-200 dark:border-neutral-800">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                        Location
                      </div>
                      <div className="font-medium text-neutral-950 dark:text-white">
                        Palakol, Andhra Pradesh, India
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Interests / Focus Labels */}
                <div className="py-6 border-b border-neutral-200 dark:border-neutral-900">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#5c7003] dark:text-[#C3E41D]" />
                    <span>Focus Interests</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {focusLabels.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-[#5c7003]/40 dark:hover:border-[#C3E41D]/40 hover:text-neutral-950 dark:hover:text-white transition-all cursor-default"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3.5">
                    Connect With Me
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit Thimothi Raju on ${social.name}`}
                          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-900/60 hover:bg-neutral-200/60 dark:hover:bg-neutral-900 hover:border-[#5c7003]/40 dark:hover:border-[#C3E41D]/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-all group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-[#5c7003] dark:group-hover:text-[#C3E41D] transition-colors" />
                            <span className="text-xs font-medium">{social.name}</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-neutral-400 dark:text-neutral-600 group-hover:text-[#5c7003] dark:group-hover:text-[#C3E41D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
