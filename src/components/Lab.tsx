"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Beaker, Layers, MousePointer2, ChevronRight, Check } from "lucide-react";

export const Lab = () => {
  const [activeTab, setActiveTab] = useState<"toggle" | "3d" | "progress">("toggle");

  return (
    <section id="lab" className="py-24 container px-4">
      <div className="flex flex-col mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">Micro-Interaction Lab</h2>
        <p className="text-zinc-500 text-center max-w-xl mx-auto mb-8">
          A playground for experimental UI components and smooth micro-interactions.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <TabButton 
            active={activeTab === "toggle"} 
            onClick={() => setActiveTab("toggle")}
            icon={<MousePointer2 className="w-4 h-4" />}
            label="Spring Toggle"
          />
          <TabButton 
            active={activeTab === "3d"} 
            onClick={() => setActiveTab("3d")}
            icon={<Layers className="w-4 h-4" />}
            label="3D Hover"
          />
          <TabButton 
            active={activeTab === "progress"} 
            onClick={() => setActiveTab("progress")}
            icon={<ChevronRight className="w-4 h-4" />}
            label="Step Progress"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto h-[400px] rounded-[40px] border border-border bg-surface p-12 flex items-center justify-center relative overflow-hidden">
        {/* Background Noise/Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {activeTab === "toggle" && <SpringToggle />}
        {activeTab === "3d" && <ThreeDCard />}
        {activeTab === "progress" && <StepProgress />}
      </div>
    </section>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300",
      active 
        ? "bg-accent text-background border-accent font-semibold" 
        : "bg-surface text-zinc-400 border-border hover:border-zinc-700"
    )}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const SpringToggle = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div 
      className={cn(
        "w-32 h-16 rounded-full p-2 cursor-pointer transition-colors duration-500 flex items-center",
        isOn ? "bg-accent" : "bg-zinc-800"
      )}
      onClick={() => setIsOn(!isOn)}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-12 h-12 rounded-full bg-white shadow-xl"
        animate={{ x: isOn ? 64 : 0 }}
      />
    </div>
  );
};

const ThreeDCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 20, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-64 h-80 rounded-3xl bg-gradient-to-br from-zinc-800 to-black border border-border flex flex-col items-center justify-center gap-4 shadow-2xl relative group"
    >
      <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-background shadow-[0_0_40px_rgba(255,255,255,0.3)]">
        <Beaker className="w-10 h-10" />
      </div>
      <div className="text-center">
        <p className="font-bold text-xl">Depth Effect</p>
        <p className="text-zinc-500 text-sm">Move mouse to rotate</p>
      </div>
      
      {/* Gloss reflection overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

const StepProgress = () => {
  const [step, setStep] = useState(1);
  const steps = [1, 2, 3];

  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-between items-center mb-8 relative">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
        
        {/* Active Progress Line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 z-0"
          animate={{ width: `${(step - 1) * 50}%` }}
          transition={{ duration: 0.5 }}
        />

        {steps.map((s) => (
          <motion.div
            key={s}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 transition-colors duration-500",
              step >= s ? "bg-accent border-accent text-background" : "bg-zinc-900 border-zinc-700 text-zinc-500"
            )}
            animate={{ scale: step === s ? 1.2 : 1 }}
          >
            {step > s ? <Check className="w-5 h-5" /> : s}
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setStep(Math.max(1, step - 1))}
          className="px-4 py-2 rounded-lg bg-zinc-800 text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
          disabled={step === 1}
        >
          Previous
        </button>
        <button 
          onClick={() => setStep(Math.min(3, step + 1))}
          className="px-4 py-2 rounded-lg bg-accent text-background text-sm font-medium hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          disabled={step === 3}
        >
          {step === 3 ? "Finished" : "Next Step"}
        </button>
      </div>
    </div>
  );
};
