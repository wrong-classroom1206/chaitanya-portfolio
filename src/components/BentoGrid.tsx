"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, Database, Smartphone, Zap } from "lucide-react";

interface BentoGridProps {
  skills: {
    frontend: string[];
    backend: string[];
    fundamentals: string[];
  };
}

export const BentoGrid = ({ skills }: BentoGridProps) => {
  return (
    <section id="skills" className="py-24 container px-4">
      <div className="flex flex-col mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Tech Stack</h2>
        <div className="h-1 w-20 bg-accent rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {/* Frontend - Large Span */}
        <BentoCard 
          title="Frontend" 
          icon={<Code2 className="w-5 h-5" />}
          items={skills.frontend}
          className="md:col-span-2 md:row-span-2"
        />

        {/* Backend - Medium Span */}
        <BentoCard 
          title="Backend & DB" 
          icon={<Database className="w-5 h-5" />}
          items={skills.backend}
          className="md:col-span-1 md:row-span-2"
        />

        {/* Mobile & Others */}
        <BentoCard 
          title="Mobile" 
          icon={<Smartphone className="w-5 h-5" />}
          items={["Jetpack Compose"]}
          className="md:col-span-1 md:row-span-1"
        />

        {/* Fundamentals */}
        <BentoCard 
          title="Fundamentals" 
          icon={<Zap className="w-5 h-5" />}
          items={skills.fundamentals}
          className="md:col-span-1 md:row-span-1"
        />

        {/* Learning Now */}
        <div className={cn(
          "relative overflow-hidden rounded-3xl border border-border bg-surface p-8",
          "md:col-span-1 md:row-span-1 flex flex-col justify-between"
        )}>
          <div>
            <h3 className="text-lg font-medium mb-2 opacity-50 uppercase tracking-widest text-[10px]">Learning Now</h3>
            <p className="text-xl font-semibold">WebAssembly & Rust</p>
          </div>
          <div className="mt-4 flex gap-2 overflow-hidden">
            <div className="h-1 flex-1 bg-accent/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] opacity-50">65%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ title, icon, items, className }: { title: string; icon: React.ReactNode; items: string[]; className?: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface p-8 flex flex-col",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-accent/5 border border-accent/10 text-accent">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {items.map((skill) => (
          <span 
            key={skill} 
            className="px-3 py-1 rounded-lg bg-zinc-900 border border-border text-xs font-medium text-zinc-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
