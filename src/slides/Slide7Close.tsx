import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Slide7Close({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full h-screen px-6 text-center"
    >
      <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-16 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
        Aging is real.
      </h1>
      
      <div className="space-y-6 text-3xl md:text-5xl font-light text-slate-300 tracking-tight max-w-5xl leading-tight">
        <p>It is not simple.</p>
        <p>Most genes stay in the same ballpark.</p>
        <p className={cn(
          "font-bold mt-12 transition-colors duration-1000",
          lens === 'A' ? "text-teal-400" : "text-amber-400"
        )}>
          The part that changes depends on which room you look in.
        </p>
      </div>
    </motion.div>
  );
}
