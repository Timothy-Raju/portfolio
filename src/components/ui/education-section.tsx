import React, { useState, useEffect, useRef } from "react";
import { GraduationCap, BookOpen, School, Sparkles, Award, MapPin } from "lucide-react";
import { TimelineContent } from "./timeline-content";

export interface EducationItem {
  id: string;
  badge: string;
  degree: string;
  institution: string;
  location?: string;
  period?: string;
  score?: {
    label: string;
    value: string;
  };
  highlights: string[];
  isFeatured?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "ug-btech",
    badge: "UNDERGRADUATE DEGREE",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "VIT-AP University",
    location: "Andhra Pradesh, India",
    score: {
      label: "CGPA",
      value: "9.54",
    },
    highlights: [
      "Core focus on Software Engineering, Data Structures, Algorithms, and Distributed Systems",
      "Consistent academic excellence with a 9.54 cumulative grade point average",
      "Hands-on project work spanning full-stack web applications and machine learning",
    ],
    isFeatured: true,
    icon: GraduationCap,
  },
  {
    id: "intermediate",
    badge: "HIGHER SECONDARY",
    degree: "Intermediate / Class 12 (MPC Stream)",
    institution: "Senior Secondary Education",
    location: "Andhra Pradesh, India",
    highlights: [
      "Rigorous coursework in Mathematics, Physics, and Chemistry (MPC)",
      "Built strong analytical problem-solving and mathematical reasoning foundations",
    ],
    isFeatured: false,
    icon: BookOpen,
  },
  {
    id: "secondary",
    badge: "SECONDARY SCHOOL",
    degree: "10th Standard / Secondary School Certificate",
    institution: "Secondary School Education",
    location: "Andhra Pradesh, India",
    highlights: [
      "Completed secondary education with strong grounding in mathematics and natural sciences",
      "Fostered early curiosity for technology and computing logic",
    ],
    isFeatured: false,
    icon: School,
  },
];

export const EducationSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="education"
      aria-label="Education and Academic Background"
      className="relative w-full py-24 sm:py-32 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white overflow-hidden border-t border-neutral-200 dark:border-neutral-900 scroll-mt-20 sm:scroll-mt-24 selection:bg-[#C3E41D] selection:text-black transition-colors duration-300"
    >
      {/* Ambient background glow matching site theme */}
      <div
        className="pointer-events-none absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10 dark:opacity-10"
        style={{ backgroundColor: "#C3E41D" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-48 w-[450px] h-[450px] rounded-full blur-[160px] opacity-10 dark:opacity-10"
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
                ACADEMIC JOURNEY
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                Education.
              </h2>
            </TimelineContent>
          </div>

          <TimelineContent animationNum={2} className="max-w-xs">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Foundations in computer science, software engineering, and analytical thinking.
            </p>
          </TimelineContent>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Spine Line */}
          <div
            className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 pointer-events-none"
            aria-hidden="true"
          >
            {/* Background track line */}
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900" />
            {/* Animated foreground gradient line */}
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#5c7003] via-[#C3E41D] to-[#C3E41D]/20 dark:from-[#C3E41D] dark:via-[#C3E41D]/70 dark:to-neutral-900 transition-all duration-1000 ease-out"
              style={{
                height: isInView ? "100%" : "0%",
              }}
            />
          </div>

          {/* Timeline Cards Stack */}
          <div className="space-y-8 sm:space-y-10">
            {EDUCATION_DATA.map((item, index) => {
              const Icon = item.icon;

              return (
                <TimelineContent
                  key={item.id}
                  animationNum={index + 3}
                  className="relative pl-16 sm:pl-20 group"
                >
                  {/* Timeline Node Icon Circle */}
                  <div
                    className={`absolute left-2.5 sm:left-4.5 -translate-x-1/2 top-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                      item.isFeatured
                        ? "border-[#5c7003] dark:border-[#C3E41D] bg-white dark:bg-black text-[#5c7003] dark:text-[#C3E41D] shadow-[0_0_16px_rgba(195,228,29,0.35)] scale-110"
                        : "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 group-hover:border-[#5c7003] dark:group-hover:border-[#C3E41D] group-hover:text-[#5c7003] dark:group-hover:text-[#C3E41D] group-hover:scale-105"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  {/* Education Card */}
                  <div
                    tabIndex={0}
                    className={`relative rounded-2xl border transition-all duration-300 p-6 sm:p-7 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D] ${
                      item.isFeatured
                        ? "border-[#5c7003]/30 dark:border-[#C3E41D]/40 bg-white/95 dark:bg-neutral-950/80 shadow-md dark:shadow-[0_8px_30px_rgba(195,228,29,0.12)] hover:shadow-xl dark:hover:shadow-[0_12px_40px_rgba(195,228,29,0.2)] hover:-translate-y-0.5"
                        : "border-neutral-200/90 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/60 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-md hover:border-[#5c7003]/30 dark:hover:border-[#C3E41D]/30 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Header Row: Badge & Score */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold ${
                            item.isFeatured
                              ? "bg-[#C3E41D]/20 text-[#495902] dark:text-[#C3E41D] border border-[#C3E41D]/40"
                              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                          }`}
                        >
                          {item.isFeatured && <Sparkles className="w-3 h-3" />}
                          {item.badge}
                        </span>
                      </div>

                      {/* CGPA / Score highlight */}
                      {item.score && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl border border-[#5c7003]/40 dark:border-[#C3E41D]/50 bg-neutral-50 dark:bg-neutral-900/90 shadow-sm">
                          <Award className="w-3.5 h-3.5 text-[#5c7003] dark:text-[#C3E41D]" />
                          <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                            {item.score.label}
                          </span>
                          <span className="text-sm font-mono font-bold text-[#5c7003] dark:text-[#C3E41D]">
                            {item.score.value}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Degree & Institution */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                        {item.degree}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {item.institution}
                        </span>
                        {item.location && (
                          <>
                            <span className="text-neutral-300 dark:text-neutral-700">·</span>
                            <span className="inline-flex items-center gap-1 text-xs text-neutral-500 font-sans">
                              <MapPin className="w-3 h-3 text-[#5c7003] dark:text-[#C3E41D]" />
                              {item.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Academic Highlights */}
                    <ul className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                      {item.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans flex items-start gap-2.5 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] mt-1.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TimelineContent>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
