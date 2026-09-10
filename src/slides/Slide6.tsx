import React from 'react';

export function Slide6({ lv }: { lv: 1|2|3 }) {
  const items = [
    "Findings establish correlation over the 72-week lifespan, not single-gene causality.",
    "The +15% lifespan extension in Baumgart 2016 was a rotenone intervention, distinct from our baseline counts.",
    "Phenotypic fading (e.g., color loss) was observed but not formally scored in this matrix.",
    "Transcriptomic profiles (JM/LS) and lifespan records (S1) are parallel datasets; individual sample IDs are not merged.",
    "Week-39 livers and Week-5 livers represent separate cross-sectional cohorts, not a longitudinal tracking of the same organism."
  ];

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center">
      <div className="col-span-12 flex flex-col items-center text-center">
        <h2 className="font-['Playfair_Display'] text-[4rem] md:text-[5rem] text-[#ccfbf1] mb-16 tracking-wide drop-shadow-md">
          Key Distinctions
        </h2>
        <div className="flex flex-col gap-6 w-full max-w-5xl text-left">
          {items.map((item, i) => (
            <div key={i} className="chart-card bg-[#134e4a]/10 border-[#14b8a6]/30 text-[1.25rem] 2xl:text-[1.5rem] text-[#e2e8f0] flex gap-6 items-center p-6 shadow-xl">
              <span className="text-[#14b8a6] font-mono opacity-80 text-[1.1em] font-bold">0{i+1}</span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
        
        {lv === 3 && (
          <div className="mt-16 text-[1.1rem] 2xl:text-[1.25rem] text-[#94a3b8] font-mono w-full max-w-5xl text-left bg-[#120e1c]/80 p-8 rounded-2xl border border-[#2a2150] space-y-3 backdrop-blur-sm shadow-2xl">
            <div><span className="text-white font-bold">Bar =</span> groups. <span className="text-white font-bold">Strip =</span> the five fish.</div>
            <div><span className="text-white font-bold">Heatmap =</span> genes × weeks. <span className="text-white font-bold">Count =</span> 23,564 rows. <span className="text-white font-bold">Lifespan =</span> S1 only.</div>
            <div className="text-[#f43f5e] mt-4 pt-4 border-t border-[#2a2150] tracking-wide">Forbidden: pie, 3D, RNA+days dual axis, unlabeled liver+fin.</div>
          </div>
        )}
      </div>
    </div>
  );
}
