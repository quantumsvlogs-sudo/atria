import React from 'react';

export function Slide12Claim({ lv, lens }: { lv: 1|2|3, lens?: 'A'|'B' }) {
  const highlight = lens === 'B' ? 'text-[#f5b942]' : 'text-[#14b8a6]';

  return (
    <div className="w-full h-full overflow-y-auto pb-24 pt-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl flex flex-col text-center">
        <h2 className={`font-['Playfair_Display'] text-[4rem] md:text-[5.5rem] ${highlight} mb-8 tracking-wide drop-shadow-md`}>
          Claim
        </h2>
        
        <p className="text-3xl md:text-4xl font-bold text-white mb-16 leading-tight">
          Aging is job-dependent,<br/>not organism-dependent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          <div className="bg-[#120e1c]/80 border border-[#2a2150] p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 pb-2 border-b border-[#ffffff20]">Liver <span className="text-sm font-normal text-[#94a3b8] capitalize ml-2">(Factory)</span></h3>
            <p className="text-lg text-[#cbd5e1]">Fat shipping, detox, yolk. Pumps/mop drift because the workload is chemical.</p>
          </div>
          <div className="bg-[#120e1c]/80 border border-[#2a2150] p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 pb-2 border-b border-[#ffffff20]">Skin <span className="text-sm font-normal text-[#94a3b8] capitalize ml-2">(Barrier)</span></h3>
            <p className="text-lg text-[#cbd5e1]">Same pump names can go UP.</p>
          </div>
          <div className="bg-[#120e1c]/80 border border-[#2a2150] p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 pb-2 border-b border-[#ffffff20]">Fin <span className="text-sm font-normal text-[#94a3b8] capitalize ml-2">(Pigment)</span></h3>
            <p className="text-lg text-[#cbd5e1]">Pigment story (tyr 54→31). Energy genes barely move.</p>
          </div>
        </div>

        <div className="space-y-4 text-xl md:text-2xl text-[#cbd5e1] leading-relaxed max-w-4xl mx-auto">
          <p>Most of 23,564 rows do not flip. The ones that flip do not flip in every room the same way.</p>
          <p className="font-bold text-white mt-8">We did not prove aging. Calendar already did. We showed the body is not one bar chart.</p>
        </div>
      </div>
    </div>
  );
}
