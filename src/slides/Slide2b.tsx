import React from 'react';
import { MEANS_LIVER } from '../data';

export function Slide2b() {
  const genes = Object.keys(MEANS_LIVER) as (keyof typeof MEANS_LIVER)[];
  
  const heatmapData = genes.map(g => {
    const row = MEANS_LIVER[g];
    const mean = row.reduce((a,b)=>a+b,0)/5;
    const sd = Math.sqrt(row.reduce((a,b)=>a+Math.pow(b-mean,2),0)/4) || 1;
    return {
      gene: g,
      z: row.map(v => (v - mean) / sd)
    };
  });

  const getRdBu = (z: number) => {
    const val = Math.max(-2.2, Math.min(2.2, z));
    if (val > 0) return `rgba(159, 18, 57, ${(val/2.2)*0.8 + 0.2})`; 
    return `rgba(30, 58, 138, ${(Math.abs(val)/2.2)*0.8 + 0.2})`; 
  };

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center">
      <div className="col-span-12 flex flex-col justify-center items-center">
        <div className="chart-card w-full max-w-[1200px] h-[75vh] flex flex-col p-8">
          <div className="text-[1.5rem] 2xl:text-[1.75rem] text-white font-bold mb-2 text-center font-sans tracking-wide">
            Gene Expression Heatmap
          </div>
          <div className="text-[1.1rem] 2xl:text-[1.25rem] text-[#94a3b8] mb-8 text-center font-sans tracking-wide">
            Z-scores computed within each gene row (n=5 mean per column)
          </div>
          
          <div className="flex-grow flex flex-col justify-center gap-2">
            <div className="flex items-end text-[1rem] 2xl:text-[1.25rem] font-mono text-[#94a3b8] mb-2 font-bold relative">
              <div className="w-48 text-right pr-6 absolute -left-4 -top-8 uppercase tracking-widest text-[#64748b] text-[0.85rem]">Genes ↓</div>
              <div className="w-48"></div>
              {['5wk','12wk','20wk','27wk','39wk'].map(w => (
                <div key={w} className="flex-1 text-center">{w}</div>
              ))}
              <div className="absolute -top-8 w-full text-center uppercase tracking-widest text-[#64748b] text-[0.85rem] pl-48">Age (Weeks) →</div>
            </div>
            {heatmapData.map(row => (
              <div key={row.gene} className="flex flex-1 items-center gap-2 min-h-[36px]">
                <div className="w-48 text-right pr-6 text-[1.1rem] 2xl:text-[1.25rem] font-mono text-[#cbd5e1]">{row.gene}</div>
                {row.z.map((zval, i) => (
                  <div key={i} className="flex-1 h-full rounded-sm transition-transform hover:scale-[1.02]" style={{ backgroundColor: getRdBu(zval) }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
