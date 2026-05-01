"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Copy, Check, Globe, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "chaitanyapantula25@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>,
      href: "https://github.com/wrong-classroom1206",
      label: "GitHub"
    },
    {
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
      href: "www.linkedin.com/in/chaitanya-pantula",
      label: "LinkedIn"
    },
    {
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>,
      href: "#",
      label: "Twitter"
    },
  ];

  return (
    <footer className="py-24 border-t border-border mt-24">
      <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-bold tracking-tighter">Stay connected.</h2>
          <p className="text-zinc-500 text-sm max-w-xs text-center md:text-left">
            Always open for collaborations and interesting conversations.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Copy Email Button */}
          <div className="relative">
            <button
              onClick={copyEmail}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface border border-border hover:border-zinc-700 transition-all active:scale-95"
            >
              <div className="p-2 rounded-lg bg-zinc-900 text-zinc-400 group-hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-zinc-300">{email}</span>
              <div className="ml-2 p-1 text-zinc-600">
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              </div>
            </button>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-background text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-xl"
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 rounded-2xl bg-surface border border-border text-zinc-400 hover:text-accent hover:border-accent/30 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-4 mt-24 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 text-[10px] uppercase tracking-[0.2em] font-bold">
        <p>Built with Next.js 15 & Tailwind 4</p>
      </div>
    </footer>
  );
};
