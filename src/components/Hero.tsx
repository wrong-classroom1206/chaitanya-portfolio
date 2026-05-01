"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = ["Fluid Interfaces", "Scalable Apps", "Intuitive UX"];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Interactive Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #262626 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(255,255,255,0.06),transparent_80%)]"
          style={{
            // @ts-ignore
            "--x": useTransform(dx, (x) => `${x}px`),
            "--y": useTransform(dy, (y) => `${y}px`),
          }}
        />
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 max-w-4xl">
          Building{" "}
          <span className="relative inline-block min-w-[300px] md:min-w-[500px] text-left">
            <motion.span
              key={headlineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute inset-0 text-accent"
            >
              {headlines[headlineIndex]}
            </motion.span>
            <span className="invisible">{headlines[headlineIndex]}</span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          Focused on crafting high-performance web experiences with precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MagneticButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="flex items-center gap-2">
              View Projects <ArrowRight className="w-4 h-4" />
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

const MagneticButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: dx, y: dy }}
      className="px-8 py-4 bg-accent text-background rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
    >
      {children}
    </motion.button>
  );
};
