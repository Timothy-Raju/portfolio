import React, { useState } from "react";
import {
  Code2,
  Globe,
  Layers,
  Database,
  Wrench,
  Cloud,
  Users,
  Sparkles,
} from "lucide-react";
import { TimelineContent } from "./timeline-content";
import { SkillIcon, SKILLS_DATA } from "./skill-icons";
import { TiltCard } from "./tilt-card";

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

// Complete list of all skills for continuous marquee scrolling
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
  const [hoveredSkillKey, setHoveredSkillKey] = useState<string | null>(null);

  return (
    <section
      id="skills"
      aria-label="Skills & Technologies"
      className="relative w-full py-24 sm:py-32 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden scroll-mt-20 sm:scroll-mt-24"
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
              Interactive technical toolkit with authentic developer logos. Hover over any technology to explore.
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
                <TiltCard
                  borderRadius="rounded-3xl"
                  innerRadius="rounded-[22px]"
                  className="h-full"
                  innerClassName="bg-white/95 dark:bg-neutral-950/90 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between shadow-md dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                >

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
                    </div>

                    {/* Category Short Description */}
                    {category.description && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans mb-6 leading-relaxed">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {/* Skills Logo Grid with Interactive Tooltips */}
                  <div
                    className={
                      isFeatured
                        ? "flex flex-wrap items-center gap-3.5 pt-3"
                        : "flex flex-wrap items-center gap-3 pt-3"
                    }
                  >
                    {category.skills.map((skill) => {
                      const itemKey = `card-${category.id}-${skill.name}`;
                      const isHovered = hoveredSkillKey === itemKey;
                      const meta = SKILLS_DATA[skill.name];
                      const brandColor = meta?.brandColor || "#C3E41D";

                      return (
                        <div
                          key={skill.name}
                          tabIndex={0}
                          aria-label={`${skill.name}${skill.badge ? ` - ${skill.badge}` : ""}`}
                          onMouseEnter={() => setHoveredSkillKey(itemKey)}
                          onMouseLeave={() => setHoveredSkillKey(null)}
                          onFocus={() => setHoveredSkillKey(itemKey)}
                          onBlur={() => setHoveredSkillKey(null)}
                          style={{
                            boxShadow: isHovered
                              ? `0 10px 24px ${brandColor}33, 0 0 14px ${brandColor}22`
                              : undefined,
                            borderColor: isHovered ? brandColor : undefined,
                          }}
                          className={`skill-tile ${isHovered ? "is-hovered" : ""} flex items-center justify-center rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D] ${
                            isFeatured
                              ? "w-14 h-14 sm:w-16 sm:h-16 p-3 bg-white dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 shadow-sm"
                              : "w-13 h-13 sm:w-14 sm:h-14 p-2.5 bg-white/95 dark:bg-neutral-950/70 border border-neutral-200/90 dark:border-neutral-800/90 shadow-sm"
                          }`}
                        >
                          {/* Special Skill Badge Pip Indicator */}
                          {skill.badge && (
                            <span
                              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C3E41D] shadow-[0_0_8px_#C3E41D]"
                              title={skill.badge}
                            />
                          )}

                          {/* Authentic Logo Icon */}
                          <SkillIcon
                            name={skill.name}
                            className={`transition-transform duration-300 ${
                              isFeatured ? "w-8 h-8 sm:w-9 sm:h-9" : "w-7 h-7 sm:w-8 sm:h-8"
                            }`}
                          />

                          {/* Floating Tooltip */}
                          <div
                            role="tooltip"
                            className="skill-tooltip flex flex-col items-center"
                          >
                            <div className="bg-neutral-950/95 dark:bg-neutral-900/95 text-white border border-neutral-700/80 dark:border-neutral-700 shadow-2xl backdrop-blur-md rounded-xl px-3.5 py-2 text-center whitespace-nowrap min-w-[90px]">
                              <div className="text-xs font-bold text-neutral-100 tracking-wide flex items-center justify-center gap-1.5">
                                <span
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: brandColor }}
                                />
                                <span>{skill.name}</span>
                              </div>
                              {skill.badge ? (
                                <div className="mt-1 text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold bg-[#C3E41D]/20 text-[#C3E41D] border border-[#C3E41D]/40">
                                  {skill.badge}
                                </div>
                              ) : (
                                <div className="mt-0.5 text-[10px] font-mono text-neutral-400">
                                  {meta?.category || "Technology"}
                                </div>
                              )}
                            </div>
                            {/* Downward triangle arrow */}
                            <div className="w-2 h-2 rotate-45 -mt-1 bg-neutral-950/95 dark:bg-neutral-900/95 border-r border-b border-neutral-700/80 dark:border-neutral-700" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TiltCard>
              </TimelineContent>
            );
          })}
        </div>
      </div>

      {/* Full-width Left-moving Skills Marquee with Interactive Logos & Tooltips */}
      <TimelineContent animationNum={7} className="w-full">
        <div
          className="relative w-full overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12 border-y border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-950/40 backdrop-blur-sm group"
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
              {MARQUEE_SKILLS.map((skill, idx) => {
                const itemKey = `mq-orig-${idx}-${skill}`;
                const isHovered = hoveredSkillKey === itemKey;
                const meta = SKILLS_DATA[skill];
                const brandColor = meta?.brandColor || "#C3E41D";

                return (
                  <div
                    key={itemKey}
                    tabIndex={0}
                    aria-label={skill}
                    onMouseEnter={() => setHoveredSkillKey(itemKey)}
                    onMouseLeave={() => setHoveredSkillKey(null)}
                    onFocus={() => setHoveredSkillKey(itemKey)}
                    onBlur={() => setHoveredSkillKey(null)}
                    style={{
                      boxShadow: isHovered
                        ? `0 12px 28px ${brandColor}38, 0 0 16px ${brandColor}28`
                        : undefined,
                      borderColor: isHovered ? brandColor : undefined,
                    }}
                    className={`skill-tile ${isHovered ? "is-hovered" : ""} flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/90 dark:border-neutral-800 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D]`}
                  >
                    {/* Official Tech Logo */}
                    <SkillIcon
                      name={skill}
                      className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300"
                    />

                    {/* Floating Tooltip */}
                    <div
                      role="tooltip"
                      className="skill-tooltip flex flex-col items-center"
                    >
                      <div className="bg-neutral-950/95 dark:bg-neutral-900/95 text-white border border-neutral-700/80 dark:border-neutral-700 shadow-2xl backdrop-blur-md rounded-xl px-3.5 py-1.5 text-center whitespace-nowrap min-w-[80px]">
                        <span className="block font-bold text-xs tracking-wide text-neutral-100 flex items-center justify-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: brandColor }}
                          />
                          {skill}
                        </span>
                        <span className="block text-[10px] font-mono text-[#C3E41D] mt-0.5">
                          {meta?.category || "Skill"}
                        </span>
                      </div>
                      {/* Downward triangle arrow */}
                      <div className="w-2 h-2 rotate-45 -mt-1 bg-neutral-950/95 dark:bg-neutral-900/95 border-r border-b border-neutral-700/80 dark:border-neutral-700" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Seamless Duplicated Sequence (Hidden from screen readers for accessibility) */}
            <div
              aria-hidden="true"
              className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0"
            >
              {MARQUEE_SKILLS.map((skill, idx) => {
                const itemKey = `mq-dup-${idx}-${skill}`;
                const isHovered = hoveredSkillKey === itemKey;
                const meta = SKILLS_DATA[skill];
                const brandColor = meta?.brandColor || "#C3E41D";

                return (
                  <div
                    key={itemKey}
                    tabIndex={-1}
                    onMouseEnter={() => setHoveredSkillKey(itemKey)}
                    onMouseLeave={() => setHoveredSkillKey(null)}
                    style={{
                      boxShadow: isHovered
                        ? `0 12px 28px ${brandColor}38, 0 0 16px ${brandColor}28`
                        : undefined,
                      borderColor: isHovered ? brandColor : undefined,
                    }}
                    className={`skill-tile ${isHovered ? "is-hovered" : ""} flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/95 dark:bg-neutral-900/95 border border-neutral-200/90 dark:border-neutral-800 shadow-sm cursor-pointer`}
                  >
                    {/* Official Tech Logo */}
                    <SkillIcon
                      name={skill}
                      className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300"
                    />

                    {/* Floating Tooltip */}
                    <div
                      role="tooltip"
                      className="skill-tooltip flex flex-col items-center"
                    >
                      <div className="bg-neutral-950/95 dark:bg-neutral-900/95 text-white border border-neutral-700/80 dark:border-neutral-700 shadow-2xl backdrop-blur-md rounded-xl px-3.5 py-1.5 text-center whitespace-nowrap min-w-[80px]">
                        <span className="block font-bold text-xs tracking-wide text-neutral-100 flex items-center justify-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: brandColor }}
                          />
                          {skill}
                        </span>
                        <span className="block text-[10px] font-mono text-[#C3E41D] mt-0.5">
                          {meta?.category || "Skill"}
                        </span>
                      </div>
                      {/* Downward triangle arrow */}
                      <div className="w-2 h-2 rotate-45 -mt-1 bg-neutral-950/95 dark:bg-neutral-900/95 border-r border-b border-neutral-700/80 dark:border-neutral-700" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TimelineContent>
    </section>
  );
};

export default SkillsSection;
