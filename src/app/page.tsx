import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Lab } from "@/components/Lab";
import { Footer } from "@/components/Footer";
import { projects, skills } from "./content/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Skills Section - Bento Grid */}
      <BentoGrid skills={skills} />

      {/* Projects Section - Dynamic Gallery */}
      <ProjectGallery projects={projects} />

      {/* Playground Section - Lab */}
      <Lab />

      {/* Footer & Contact */}
      <Footer />
    </main>
  );
}
