import Component from "@/components/ui/portfolio-hero";
import { AboutSection } from "@/components/ui/about-section";
import { ProjectsSection } from "@/components/ui/projects-section";
import { EducationSection } from "@/components/ui/education-section";
import { ExperienceSection } from "@/components/ui/experience-section";
import { SkillsSection } from "@/components/ui/skills-section";
import { CertificationsSection } from "@/components/ui/certifications-section";

export default function Demo() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <div className="w-full">
        <Component />
        <AboutSection />
        <ProjectsSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
      </div>
    </>
  );
}
