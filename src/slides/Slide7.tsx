import React from 'react';

export function Slide7() {
  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center text-center">
      <div className="col-span-12 flex flex-col justify-center items-center">
        <h1 className="font-['Playfair_Display'] font-light text-[5rem] md:text-[6rem] 2xl:text-[8rem] text-[#f8fafc] mb-12 drop-shadow-[0_0_24px_rgba(124,92,255,0.4)]">
          Aging is real. It is not simple.
        </h1>
        <div className="text-[2rem] md:text-[2.5rem] 2xl:text-[3rem] text-[#cbd5e1] font-light mb-6 leading-tight">
          Most genes stay in the same ballpark.
        </div>
        <div className="text-[2.5rem] md:text-[3rem] 2xl:text-[3.5rem] text-white font-medium mb-24 leading-tight">
          The part that changes depends on which room you look in.
        </div>
        <div className="text-[1.1rem] 2xl:text-[1.25rem] text-[#64748b] tracking-widest font-mono">
          GSE66712 &nbsp;&middot;&nbsp; S1 &nbsp;&middot;&nbsp; Atria Year 1
        </div>
      </div>
    </div>
  );
}
