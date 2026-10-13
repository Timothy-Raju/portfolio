import Component from "@/components/ui/portfolio-hero";
import { AboutSection } from "@/components/ui/about-section";

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
      </div>
    </>
  );
}
