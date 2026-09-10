import React from 'react';
import { motion } from 'motion/react';

export function Slide0Title({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center w-full h-screen text-center px-6"
    >
      <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] max-w-5xl">
        Age is a calendar.
      </h1>
      <h2 className="text-2xl md:text-4xl font-light text-slate-300 leading-snug mb-16 max-w-4xl">
        This file is how hard an organ was <strong className="text-white font-bold">reading a recipe.</strong>
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-slate-500 font-mono tracking-widest text-xs md:text-sm bg-[#0f0b16]/80 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/5">
        <span className="text-white">GEO GSE66712</span>
        <span className="hidden md:inline text-slate-700">|</span>
        <span>Atria University</span>
        <span className="hidden md:inline text-slate-700">|</span>
        <span>Manav M. Parikh • G. Sai Krishna</span>
      </div>
    </motion.div>
  );
}
