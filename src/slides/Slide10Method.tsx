import React from 'react';

export function Slide10Method({ lv, lens }: { lv: 1|2|3, lens?: 'A'|'B' }) {
  const highlight = lens === 'B' ? 'text-[#f5b942]' : 'text-[#14b8a6]';
  const border = lens === 'B' ? 'border-[#f5b942]/30' : 'border-[#14b8a6]/30';
  const bg = lens === 'B' ? 'bg-[#78350f]/20' : 'bg-[#134e4a]/20';

  return (
    <div className="w-full h-full overflow-y-auto pb-24 pt-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col">
        <h2 className="font-['Playfair_Display'] text-[3.5rem] md:text-[4.5rem] text-white mb-6 tracking-wide text-center">
          What is one RPKM?
        </h2>
        <p className="text-xl text-[#94a3b8] text-center mb-12 font-mono">
          Machine: RNA-seq / NGS. Millions of short reads in parallel.<br/>
          We did not run the machine. GEO table is already normalized.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Plain */}
          <div className="bg-[#120e1c]/80 border border-[#2a2150] p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl text-white font-bold mb-6 tracking-wide border-b border-[#ffffff20] pb-4">The Math</h3>
            <p className="text-lg text-[#cbd5e1] mb-6">They grind the organ, turn RNA into a library, the sequencer records how often a recipe is hit.</p>
            <ul className="space-y-4 text-lg font-mono text-[#94a3b8]">
              <li><strong className="text-white">R</strong> = reads for that gene.</li>
              <li><strong className="text-white">K</strong> = length of that gene in kilobases (how long the recipe is).</li>
              <li><strong className="text-white">PM</strong> = per million reads in that sample (so a chatty sample doesn’t fake a high score).</li>
            </ul>
            <div className="mt-8 bg-[#07060c] p-4 rounded-xl border border-[#ffffff10] text-center font-mono text-[#cbd5e1]">
              RPKM ≈ (reads ÷ gene length in kb) ÷ (total reads / 1 million)
            </div>
          </div>

          {/* Classroom correction */}
          <div className="bg-[#120e1c]/80 border border-[#2a2150] p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl text-white font-bold mb-6 tracking-wide border-b border-[#ffffff20] pb-4">The Logic</h3>
            <p className="text-lg text-[#f43f5e] font-bold mb-4">Not "the machine tries 1 million times and the hit-rate is RPKM."</p>
            <p className="text-lg text-[#cbd5e1] mb-6">It is: how often this recipe showed up, adjusted for (1) how long the recipe is and (2) how many total reads that sample got.</p>
            <ul className="space-y-4 text-lg text-[#94a3b8]">
              <li><strong className="text-white">Longer gene</strong> → more chances to be hit → divide by kilobases so long ≠ "more used."</li>
              <li><strong className="text-white">Busier sample</strong> → more total hits → divide per million so samples can be compared.</li>
            </ul>
          </div>
        </div>

        {lv >= 2 && (
          <div className={`p-6 rounded-xl border ${border} ${bg} text-white text-[1.25rem] shadow-lg text-center`}>
            <span className={`font-bold ${highlight} mr-3 uppercase tracking-wider`}>So What:</span>
            RPKM is "how hard this organ was photocopying this recipe that week," not "how old the fish is," not "days until death."
          </div>
        )}
      </div>
    </div>
  );
}
