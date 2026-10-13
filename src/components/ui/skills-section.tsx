import React from "react";
import {
  Code2,
  Globe,
  Layers,
  Database,
  Wrench,
  Cloud,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { TimelineContent } from "./timeline-content";

interface SkillItem {
  name: string;
  badge?: string;
  badgeType?: "accent" | "neutral";
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  skills: SkillItem[];
  featured?: boolean;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    icon: Code2,
    description: "Core languages used for algorithm design, object-oriented systems, and application logic.",
    skills: [
      { name: "Java", badge: "Strong • OOP & DSA", badgeType: "accent" },
      { name: "Python", badge: "Intermediate", badgeType: "neutral" },
      { name: "C", badge: "Intermediate", badgeType: "neutral" },
    ],
  },
  {
    id: "web-technologies",
    title: "Web Technologies",
    icon: Globe,
    description: "Foundational markup, responsive styling, and modern client-side scripting.",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
    ],
  },
  {
    id: "frameworks-libraries",
    title: "Frameworks & Libraries",
    icon: Layers,
    description: "Component-driven user interfaces and asynchronous server-side architectures.",
    skills: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    description: "Relational schema management and document-based NoSQL persistence.",
    skills: [
      { name: "MySQL" },
      { name: "MongoDB" },
    ],
  },
  {
    id: "tools-platforms",
    title: "Tools & Platforms",
    icon: Wrench,
    description: "Version control systems, integrated environments, and exploratory workspaces.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Google Colab" },
    ],
  },
  {
    id: "soft-skills",
    title: "Soft Skills",
    icon: Users,
    description: "Interpersonal collaboration, methodical thinking, and responsible ownership.",
    skills: [
      { name: "Time Management" },
      { name: "Teamwork" },
      { name: "Problem Solving" },
      { name: "Accountability" },
    ],
  },
  {
    id: "cloud-aws",
    title: "Cloud & AWS",
    icon: Cloud,
    description: "Core infrastructure, cloud compute, storage, security, and provisioning concepts studied and practiced.",
    featured: true,
    skills: [
      { name: "Amazon EC2" },
      { name: "Amazon S3" },
      { name: "AWS IAM" },
      { name: "Amazon RDS" },
      { name: "Amazon VPC" },
      { name: "Amazon CloudWatch" },
      { name: "AWS CloudFormation" },
    ],
  },
];

// Complete list of all 26 skills for continuous marquee scrolling
const MARQUEE_SKILLS: string[] = [
  "Java",
  "Python",
  "C",
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "MySQL",
  "MongoDB",
  "Git",
  "GitHub",
  "VS Code",
  "Google Colab",
  "Amazon EC2",
  "Amazon S3",
  "AWS IAM",
  "Amazon RDS",
  "Amazon VPC",
  "Amazon CloudWatch",
  "AWS CloudFormation",
  "Time Management",
  "Teamwork",
  "Problem Solving",
  "Accountability",
];

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      aria-label="Skills & Technologies"
      className="relative w-full py-24 sm:py-32 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C3E41D]/10 dark:bg-[#C3E41D]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <TimelineContent animationNum={1}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C3E41D]/15 dark:bg-[#C3E41D]/10 border border-[#C3E41D]/40 text-[#495902] dark:text-[#C3E41D] text-xs font-mono uppercase tracking-wider font-bold mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SKILLS & EXPERTISE</span>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950 dark:text-white">
                Skills & Technologies.
              </h2>
            </TimelineContent>
          </div>

          <TimelineContent animationNum={2} className="max-w-sm">
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              Tools and technologies I use to build, analyze, and solve problems.
            </p>
          </TimelineContent>
        </div>

        {/* Structured Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SKILL_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            const isFeatured = category.featured;

            return (
              <TimelineContent
                key={category.id}
                animationNum={3 + (index % 4)}
                className={isFeatured ? "md:col-span-2 lg:col-span-3" : ""}
              >
                <div
                  tabIndex={0}
                  className={`group relative h-full rounded-3xl p-6 sm:p-7 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D] bg-neutral-50/80 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#5c7003]/40 dark:hover:border-[#C3E41D]/40 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden`}
                >
                  {/* Subtle Top Border Glow on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5c7003]/30 dark:via-[#C3E41D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Header Row: Icon + Category Title */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#C3E41D]/15 dark:bg-[#C3E41D]/15 text-[#5c7003] dark:text-[#C3E41D] border border-[#C3E41D]/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight">
                            {category.title}
                          </h3>
                        </div>
                      </div>

                      {/* Count Badge */}
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border border-neutral-300/60 dark:border-neutral-700/60">
                        {category.skills.length} skills
                      </span>
                    </div>

                    {/* Category Short Description */}
                    {category.description && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans mb-5 leading-relaxed">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Skills Badges / Chips */}
                  <div
                    className={
                      isFeatured
                        ? "flex flex-wrap gap-2.5 pt-2"
                        : "flex flex-wrap gap-2 pt-2"
                    }
                  >
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                          isFeatured
                            ? "bg-white dark:bg-neutral-950/80 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-[#5c7003] dark:hover:border-[#C3E41D] hover:shadow-sm"
                            : "bg-white/90 dark:bg-neutral-950/70 border-neutral-200/90 dark:border-neutral-800/90 text-neutral-800 dark:text-neutral-200 hover:border-[#5c7003] dark:hover:border-[#C3E41D] hover:shadow-sm"
                        }`}
                      >
                        <span>{skill.name}</span>
                        {skill.badge && (
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                              skill.badgeType === "accent"
                                ? "bg-[#C3E41D]/25 dark:bg-[#C3E41D]/20 text-[#495902] dark:text-[#C3E41D] border border-[#C3E41D]/40"
                                : "bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            }`}
                          >
                            {skill.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TimelineContent>
            );
          })}
        </div>
      </div>

      {/* Marquee Section Connector & Label */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-4">
        <TimelineContent animationNum={6}>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5c7003] dark:bg-[#C3E41D]" />
            <span>Continuous Stack Overview</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#5c7003] dark:text-[#C3E41D]" />
          </div>
        </TimelineContent>
      </div>

      {/* Full-width Left-moving Skills Marquee */}
      <TimelineContent animationNum={7} className="w-full">
        <div
          className="relative w-full overflow-hidden py-4 sm:py-5 border-y border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-950/40 backdrop-blur-sm group"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Scrolling Track: Contains Primary Set + Seamless Duplicate Set */}
          <div className="animate-marquee-track">
            {/* Primary Skill Sequence */}
            <div className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
              {MARQUEE_SKILLS.map((skill, idx) => (
                <div
                  key={`marquee-orig-${idx}`}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 shadow-sm transition-colors duration-200 hover:border-[#5c7003] dark:hover:border-[#C3E41D] hover:text-[#5c7003] dark:hover:text-[#C3E41D]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] opacity-80" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            {/* Seamless Duplicated Sequence (Hidden from screen readers for accessibility) */}
            <div
              aria-hidden="true"
              className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0"
            >
              {MARQUEE_SKILLS.map((skill, idx) => (
                <div
                  key={`marquee-dup-${idx}`}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 shadow-sm transition-colors duration-200 hover:border-[#5c7003] dark:hover:border-[#C3E41D] hover:text-[#5c7003] dark:hover:text-[#C3E41D]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5c7003] dark:bg-[#C3E41D] opacity-80" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TimelineContent>
    </section>
  );
};

export default SkillsSection;
