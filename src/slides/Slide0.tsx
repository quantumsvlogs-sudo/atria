import React from 'react';

export function Slide0({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center">
      <div className="col-span-12 flex flex-col items-center text-center -mt-12">
        <h1 className="font-['Playfair_Display'] font-light text-[5rem] md:text-[6rem] 2xl:text-[7rem] text-[#f8fafc] drop-shadow-[0_0_24px_rgba(124,92,255,0.4)] leading-[1.1] mb-6">
          Age is a calendar.
        </h1>
        <div className="text-[2rem] md:text-[2.5rem] 2xl:text-[3rem] text-[#94a3b8] font-light mb-20 leading-tight">
          This file is how hard an organ was reading a recipe.
        </div>
        
        <div className="text-[1.25rem] md:text-[1.5rem] text-[#e2e8f0] font-medium tracking-wide mb-4">
          Manav M. Parikh &nbsp;&middot;&nbsp; G. Sai Krishna
        </div>
        <div className="text-[1rem] md:text-[1.1rem] text-[#64748b] tracking-wider font-mono mb-16">
          GEO GSE66712 &nbsp;&middot;&nbsp; 23,564 genes × 185 samples &nbsp;&middot;&nbsp; Table S1 45 deaths
        </div>

        <div className="text-[1.25rem] md:text-[1.5rem] text-[#cbd5e1] max-w-4xl mx-auto leading-relaxed min-h-[80px]">
          {lens === 'B' && lv >= 2 && <p>We counted photocopies of gene recipes in killifish organs.</p>}
          {lens === 'B' && lv === 3 && <p className="mt-4 text-[#94a3b8]">You will see five bars, then whether liver, skin and fin agree, then how long 45 fish lived.</p>}
          
          {lens === 'A' && lv >= 2 && <p>Cross-sectional livers (JM) are not the longitudinal fins (LS).</p>}
          {lens === 'A' && lv === 3 && <p className="mt-4 text-[#94a3b8]">RPKM matrix + S1 are two files. We do not merge LS IDs to animal #.</p>}
        </div>
      </div>
    </div>
  );
}
