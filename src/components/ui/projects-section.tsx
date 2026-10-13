import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { TimelineContent } from "./timeline-content";

// Reusable clean GitHub SVG icon matching site style
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

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "mern-ecommerce",
    title: "MERN E-Commerce Application",
    description:
      "Full-stack shopping platform with product search, cart state management, checkout validation, and comprehensive Vitest test coverage.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js"],
    image: "/images/mern-ecommerce.jpg",
    liveUrl: "https://ecommerce-chi-ashen-36.vercel.app/",
    githubUrl: "https://github.com/Timothy-Raju/ecommerce-mern",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "Personal portfolio with backend form validation APIs, fluid micro-interactions, and responsive typography.",
    technologies: ["React.js", "Node.js", "Express.js", "CSS"],
    image: "/images/portfolio-website.jpg",
    liveUrl: "https://thimothiportfolio.netlify.app/",
    githubUrl: "https://github.com/Timothy-Raju/Protfolio",
  },
  {
    id: "aerospeak",
    title: "AeroSpeak — Interactive English Speaking Mentor",
    description:
      "Speech capture and interview coaching assistant using Web Speech API and Google Gemini/Groq for instant real-time feedback.",
    technologies: ["Python", "Streamlit", "Gemini AI", "Web Speech API"],
    image: "/images/aerospeak.jpg",
    liveUrl: "https://interviewprep-easy.streamlit.app/",
    githubUrl: "https://github.com/Timothy-Raju/interview_prep",
  },
  {
    id: "subscription-watchdog",
    title: "Subscription Watchdog",
    description:
      "Scans bank statements to detect recurring charges, tracks price increases, and drafts automated cancellation emails via MCP.",
    technologies: ["Python", "FastMCP", "Neon PostgreSQL", "Railway"],
    image: "/images/subscription-watchdog.jpg",
    githubUrl: "https://github.com/palak-org/subscription-watchdog",
  },
  {
    id: "credit-risk-predictor",
    title: "Credit Risk Predictor",
    description:
      "Machine learning classification model trained on the German Credit dataset, evaluated using AUC, KS, and PSI metrics.",
    technologies: ["Python", "scikit-learn", "Random Forest", "pandas"],
    image: "/images/credit-risk-predictor.jpg",
    githubUrl: "https://github.com/Timothy-Raju/Credit-Risk-Predictor",
  },
  {
    id: "plant-disease-detection",
    title: "Diseased Plant Detection",
    description:
      "Edge computer vision model utilizing YOLOv10 with microcontroller and webcam integration for live leaf disease diagnosis.",
    technologies: ["YOLOv10", "OpenCV", "Roboflow", "Python"],
    image: "/images/plant-disease-detection.jpg",
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const targetPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Detect touch device & window resize
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Smooth lerp cursor animation for floating preview
  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.14;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.14;

      setCursorPos({
        x: currentPosRef.current.x,
        y: currentPosRef.current.y,
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isTouchDevice]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    targetPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseEnterSection = () => {
    if (!isTouchDevice) {
      setIsHoveringList(true);
    }
  };

  const handleMouseLeaveSection = () => {
    setIsHoveringList(false);
    setActiveProject(null);
  };

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="relative w-full py-24 sm:py-32 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white overflow-hidden border-t border-neutral-200 dark:border-neutral-900 scroll-mt-20 sm:scroll-mt-24 selection:bg-[#C3E41D] selection:text-black transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/3 -right-48 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />

      {/* Reduced container width by ~30% (from max-w-7xl to max-w-4xl) */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <TimelineContent animationNum={1} className="mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-sm text-xs font-mono uppercase tracking-widest text-[#5c7003] dark:text-[#C3E41D] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] animate-pulse" />
                SELECTED WORK
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                Featured Projects.
              </h2>
            </TimelineContent>
          </div>

          <TimelineContent animationNum={2} className="max-w-xs">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Curated full-stack, AI, and machine learning solutions built with hands-on focus.
            </p>
          </TimelineContent>
        </div>

        {/* Project Cards Stack with Distinct Shadows */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnterSection}
          onMouseLeave={handleMouseLeaveSection}
          className="space-y-5 sm:space-y-6"
        >
          {PROJECTS_DATA.map((project, index) => {
            const isHovered = activeProject?.id === project.id;
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <TimelineContent
                key={project.id}
                animationNum={index + 3}
                className="group relative"
              >
                <div
                  onMouseEnter={() => setActiveProject(project)}
                  onFocus={() => setActiveProject(project)}
                  tabIndex={0}
                  className={`relative rounded-2xl border transition-all duration-300 p-6 sm:p-7 backdrop-blur-sm ${
                    isHovered
                      ? "border-[#5c7003]/40 dark:border-[#C3E41D]/50 bg-white/95 dark:bg-neutral-900/70 shadow-lg dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)] -translate-y-0.5"
                      : "border-neutral-200/90 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/60 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-md"
                  }`}
                >
                  {/* Subtle active indicator bar */}
                  <div
                    className={`absolute left-0 top-6 bottom-6 w-1 rounded-full transition-all duration-300 ${
                      isHovered
                        ? "bg-[#5c7003] dark:bg-[#C3E41D] opacity-100 scale-y-100"
                        : "opacity-0 scale-y-50"
                    }`}
                  />

                  {/* Header Row: Index, Title & Arrow */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-[#5c7003] dark:text-[#C3E41D]">
                        {indexStr}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700 font-mono text-xs">
                        /
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
                        <span className="relative">
                          {project.title}
                          {/* Animated underline */}
                          <span
                            className={`absolute left-0 -bottom-0.5 h-0.5 bg-[#5c7003] dark:bg-[#C3E41D] transition-all duration-300 ${
                              isHovered ? "w-full" : "w-0"
                            }`}
                          />
                        </span>
                        <ArrowUpRight
                          className={`w-5 h-5 shrink-0 text-[#5c7003] dark:text-[#C3E41D] transition-all duration-300 transform ${
                            isHovered
                              ? "opacity-100 translate-x-1 -translate-y-1"
                              : "opacity-0 -translate-x-1 translate-y-1"
                          }`}
                        />
                      </h3>
                    </div>

                    {/* Action Links (Live Demo / GitHub) */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live demo for ${project.title}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-[#C3E41D] text-black hover:bg-[#b5d613] hover:scale-105 active:scale-95 transition-all shadow-[0_2px_10px_rgba(195,228,29,0.3)]"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View GitHub source code for ${project.title}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold border border-neutral-300 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:border-[#5c7003]/40 dark:hover:border-[#C3E41D]/50 hover:scale-105 active:scale-95 transition-all shadow-sm"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Concise Description */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Mobile Preview Image (on touch / smaller screens) */}
                  <div className="block lg:hidden mb-4">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-inner">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Curated Core Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TimelineContent>
            );
          })}
        </div>
      </div>

      {/* Floating Desktop Image Preview that Follows Cursor */}
      {!isTouchDevice && (
        <div
          className={`pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 ${
            isHoveringList && activeProject ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate3d(${cursorPos.x + 24}px, ${cursorPos.y - 120}px, 0)`,
            willChange: "transform, opacity",
          }}
          aria-hidden="true"
        >
          <div className="w-[320px] aspect-video rounded-2xl overflow-hidden border-2 border-[#C3E41D]/60 dark:border-[#C3E41D]/40 bg-neutral-950 shadow-2xl backdrop-blur-md transform-gpu transition-all duration-300 scale-100">
            {activeProject && (
              <img
                src={activeProject.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            {activeProject && (
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                <span className="truncate max-w-[200px] font-semibold">{activeProject.title}</span>
                <span className="text-[#C3E41D] text-[10px] uppercase tracking-wider">Preview</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
