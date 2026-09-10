import React from 'react';

export function DynamicCopy({ title, lens, lv, copy, why }: any) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[95%]">
      <h2 className="font-['Playfair_Display'] font-light text-[#f8fafc] text-[3.5rem] 2xl:text-[4.5rem] drop-shadow-[0_0_18px_rgba(124,92,255,0.35)] leading-[1.1]">
        {title}
      </h2>
      
      <div className="text-[1.25rem] 2xl:text-[1.5rem] leading-[1.6] text-[#cbd5e1] space-y-6">
        <p>{copy[lens][1]}</p>
        {lv >= 2 && copy[lens][2] && <p>{copy[lens][2]}</p>}
      </div>
      
      {lv === 3 && why && why[lens] && (
        <div className="mt-8 bg-[#120e1c]/80 backdrop-blur-md border border-t-4 p-8 rounded-2xl flex flex-col gap-4 shadow-2xl" style={{ borderColor: lens === 'A' ? '#2dd4bf' : '#f5b942' }}>
          <span className="font-bold text-[0.9rem] 2xl:text-[1rem] tracking-[0.15em] uppercase" style={{ color: lens === 'A' ? '#2dd4bf' : '#f5b942' }}>
            WHY THIS CHART
          </span>
          <span className="text-[1.1rem] 2xl:text-[1.25rem] leading-relaxed text-[#e2e8f0]">
            {why[lens]}
          </span>
        </div>
      )}
    </div>
  );
}
