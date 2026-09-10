import React from 'react';
import { SlideLayout } from '../components/SlideLayout';

export function Slide1Intro({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  return (
    <SlideLayout 
      title="What one number is"
      lens={lens}
      density={density}
      caption={
        lens === 'A' 
          ? "_3 means liver. _5 means skin. LS means fin. The week of age is embedded directly in the GEO sample titles."
          : "Think of the DNA as a master recipe book. RNA (RPKM) is how many photocopies of a specific recipe the cell made today."
      }
      details={
        <div className="space-y-4 mt-4">
          <p>This tells us what the cell is actively trying to build right now, not just what it has the potential to build.</p>
          <p>By counting these "photocopies", we can see exactly which cellular machines are turned on, and which are gathering dust.</p>
        </div>
      }
      rationale="RPKM normalizes for gene length and sequencing depth. This allows for fair comparison between different genes within the same sample."
      chart={
        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl">
          <div className="text-center p-8">
            <div className="text-8xl font-black text-white/10 mb-4">RPKM</div>
            <div className="text-lg text-slate-400 font-mono">Reads Per Kilobase of transcript, per Million mapped reads.</div>
          </div>
        </div>
      }
    />
  );
}
