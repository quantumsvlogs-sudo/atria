import React from 'react';

export function Slide8Dataset({ lv, lens }: { lv: 1|2|3, lens?: 'A' | 'B' }) {
  const highlight = lens === 'B' ? 'text-[#f5b942]' : 'text-[#14b8a6]';
  const border = lens === 'B' ? 'border-[#f5b942]/30' : 'border-[#14b8a6]/30';
  const bg = lens === 'B' ? 'bg-[#78350f]/20' : 'bg-[#134e4a]/20';

  return (
    <div className="w-full h-full overflow-y-auto pb-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col">
        <h2 className="font-['Playfair_Display'] text-[3.5rem] md:text-[4.5rem] text-white mb-12 tracking-wide text-center">
          What table is this?
        </h2>
        
        <div className="flex flex-col gap-6 text-[1.25rem] 2xl:text-[1.5rem] text-[#e2e8f0] leading-relaxed bg-[#120e1c]/80 p-10 rounded-2xl border border-[#2a2150] shadow-2xl">
          <div className="flex gap-4 items-start"><span className={highlight}>•</span><span><strong className="text-white">GEO GSE66712.</strong> 23,564 gene rows × 185 sample columns (RPKM).</span></div>
          <div className="flex gap-4 items-start"><span className={highlight}>•</span><span>98 fish IDs. Not 185 livers.</span></div>
          <div className="flex gap-4 items-start"><span className={highlight}>•</span><span>25 livers + 25 skins at weeks 5, 12, 20, 27, 39 <span className="text-[#94a3b8] text-[0.85em]">(different JM fish each week)</span>.</span></div>
          <div className="flex gap-4 items-start"><span className={highlight}>•</span><span>90 fins: 45 fish at week 10 AND 20 <span className="text-[#94a3b8] text-[0.85em]">(same animal twice)</span>.</span></div>
          <div className="flex gap-4 items-start"><span className={highlight}>•</span><span><strong className="text-white">S1</strong> = 45 death weeks (29–72). <strong className="text-white">S2</strong> = 152-fish cohort. SECOND FILE. Do not weld IDs.</span></div>
        </div>

        {lv >= 2 && (
          <div className={`mt-8 p-6 rounded-xl border ${border} ${bg} text-white text-[1.25rem] shadow-lg`}>
            <span className={`font-bold ${highlight} mr-2 uppercase tracking-wider`}>So What:</span>
            The 500-row rule is the 23,564-row file. Charts are views, not a smaller dataset.
          </div>
        )}
      </div>
    </div>
  );
}
