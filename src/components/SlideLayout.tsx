import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SlideLayoutProps {
  title: string;
  lens: 'A' | 'B';
  density: 1 | 2 | 3;
  caption: React.ReactNode;
  details?: React.ReactNode;
  rationale?: React.ReactNode;
  chart: React.ReactNode;
  chart2?: React.ReactNode;
}

export function SlideLayout({ title, lens, density, caption, details, rationale, chart, chart2 }: SlideLayoutProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full min-h-screen flex flex-col pt-32 pb-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1920px] mx-auto"
    >
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
          {title}
        </h2>
      </div>

      <div className="flex-grow grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Narrative) */}
        <div className="xl:col-span-4 flex flex-col gap-6 sticky top-32">
          <div className="bg-[#0f0b16]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className={cn(
              "text-lg md:text-xl font-medium leading-relaxed mb-6",
              lens === 'A' ? "text-teal-50" : "text-amber-50"
            )}>
              {caption}
            </div>

            {density >= 2 && details && (
              <div className="text-sm md:text-base text-slate-400 leading-relaxed space-y-4">
                {details}
              </div>
            )}

            {density === 3 && rationale && (
              <div className={cn(
                "mt-8 p-5 rounded-2xl border font-mono text-xs leading-relaxed",
                lens === 'A' ? "bg-teal-950/40 border-teal-500/30 text-teal-200" : "bg-amber-950/40 border-amber-500/30 text-amber-200"
              )}>
                <span className="font-bold uppercase tracking-widest block mb-3 opacity-60">Chart Rationale</span>
                {rationale}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Charts) */}
        <div className={cn(
          "grid gap-6 items-stretch",
          chart2 ? "xl:col-span-8 grid-cols-1 lg:grid-cols-2" : "xl:col-span-8 grid-cols-1"
        )}>
          <div className="bg-[#0f0b16]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col min-h-[500px]">
            {chart}
          </div>
          {chart2 && (
            <div className="bg-[#0f0b16]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col min-h-[500px]">
              {chart2}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
