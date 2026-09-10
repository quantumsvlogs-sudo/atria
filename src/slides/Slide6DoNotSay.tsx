import React from 'react';
import { motion } from 'motion/react';
import { AlertOctagon } from 'lucide-react';

export function Slide6DoNotSay({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  const list = [
    "We proved aging.",
    "This gene causes death.",
    "+15% lifespan is our result (Baumgart 2016 rotenone trial — credit one clause only).",
    "These fish faded X% (we did not score color).",
    "S1 animal # = LS column.",
    "Week 39 liver is the same fish as week 5."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-24"
    >
      <div className="w-full max-w-5xl bg-[#1a0a0f] border border-red-900/50 rounded-[40px] p-12 md:p-20 shadow-2xl relative overflow-hidden">
        <AlertOctagon className="absolute -top-20 -right-20 w-96 h-96 text-red-500/5 rotate-12" strokeWidth={1} />
        
        <h2 className="text-4xl md:text-6xl font-black text-red-500 mb-12 tracking-tight">
          LOCKED: DO NOT SAY
        </h2>
        
        <div className="space-y-6 relative z-10">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-6 group">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-red-950 flex items-center justify-center text-red-500 font-mono text-sm border border-red-900/50 group-hover:bg-red-900 group-hover:text-red-300 transition-colors">
                {i + 1}
              </div>
              <p className="text-xl md:text-2xl font-medium text-red-100/90 leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>

        {density === 3 && (
          <div className="mt-16 pt-8 border-t border-red-900/30 text-sm font-mono text-red-500/60 uppercase tracking-widest">
            Level 3 Detail: The most frequent fatal errors made during life science thesis defenses.
          </div>
        )}
      </div>
    </motion.div>
  );
}
