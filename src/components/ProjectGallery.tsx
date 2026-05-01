"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
}

interface ProjectGalleryProps {
  projects: Project[];
}

export const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
  return (
    <section id="projects" className="py-24 container px-4">
      <div className="flex flex-col mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Work</h2>
        <div className="h-1 w-20 bg-accent rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[400px] rounded-3xl border border-border bg-surface overflow-hidden cursor-pointer"
    >
      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-bold tracking-widest uppercase text-accent/80"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          
          <p className={cn(
            "text-zinc-400 leading-relaxed transition-all duration-500",
            isHovered ? "opacity-0 -translate-y-2" : "opacity-100"
          )}>
            {project.description.slice(0, 100)}...
          </p>
        </div>

        {/* Hover Reveal: Problem Solved */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-8 bottom-32 bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-border"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">The Solution</h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 mt-auto">
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Source
          </a>
          {project.live && (
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
