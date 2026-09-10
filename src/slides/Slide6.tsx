import React from 'react';

export function Slide6({ lv, lens }: { lv: 1|2|3, lens?: 'A' | 'B' }) {
  const items = [
    "Findings establish correlation over the 72-week lifespan, not single-gene causality.",
    "The +15% lifespan extension in Baumgart 2016 was a rotenone intervention, distinct from our baseline counts.",
    "Phenotypic fading (e.g., color loss) was observed but not formally scored in this matrix.",
    "Transcriptomic profiles (JM/LS) and lifespan records (S1) are parallel datasets; individual sample IDs are not merged.",
    "Week-39 livers and Week-5 livers represent separate cross-sectional cohorts, not a longitudinal tracking of the same organism."
  ];

  const titleColor = lens === 'B' ? 'text-[#fef3c7]' : 'text-[#ccfbf1]';
  const numberColor = lens === 'B' ? 'text-[#f5b942]' : 'text-[#14b8a6]';
  const cardBgColor = lens === 'B' ? 'bg-[#78350f]/10' : 'bg-[#134e4a]/10';
  const cardBorderColor = lens === 'B' ? 'border-[#f5b942]/30' : 'border-[#14b8a6]/30';

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden pb-12 pt-4 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        <h2 className={`font-['Playfair_Display'] ${lv === 3 ? 'text-[3rem] md:text-[4rem]' : 'text-[4rem] md:text-[5rem]'} ${titleColor} mb-8 tracking-wide drop-shadow-md transition-all`}>
          Key Distinctions
        </h2>
        <div className="flex flex-col gap-4 w-full text-left">
          {items.map((item, i) => (
            <div key={i} className={`chart-card ${cardBgColor} ${cardBorderColor} ${lv === 3 ? 'text-[1.1rem] 2xl:text-[1.25rem] p-4' : 'text-[1.25rem] 2xl:text-[1.5rem] p-6'} text-[#e2e8f0] flex gap-4 lg:gap-6 items-center shadow-lg transition-all`}>
              <span className={`${numberColor} font-mono opacity-80 text-[1.1em] font-bold shrink-0`}>0{i+1}</span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
        
        {lv === 3 && (
          <div className="mt-8 text-[1rem] 2xl:text-[1.15rem] text-[#94a3b8] font-mono w-full text-left bg-[#120e1c]/80 p-6 rounded-2xl border border-[#2a2150] space-y-2 backdrop-blur-sm shadow-xl">
            <div><span className="text-white font-bold">Bar =</span> groups. <span className="text-white font-bold">Strip =</span> the five fish.</div>
            <div><span className="text-white font-bold">Heatmap =</span> genes × weeks. <span className="text-white font-bold">Count =</span> 23,564 rows. <span className="text-white font-bold">Lifespan =</span> S1 only.</div>
            <div className="text-[#f43f5e] mt-3 pt-3 border-t border-[#2a2150] tracking-wide">Forbidden: pie, 3D, RNA+days dual axis, unlabeled liver+fin.</div>
          </div>
        )}
      </div>
    </div>
  );
}
