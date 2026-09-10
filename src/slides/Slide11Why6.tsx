import React from 'react';

export function Slide11Why6({ lv, lens }: { lv: 1|2|3, lens?: 'A'|'B' }) {
  const highlight = lens === 'B' ? 'text-[#f5b942]' : 'text-[#14b8a6]';
  const border = lens === 'B' ? 'border-[#f5b942]/30' : 'border-[#14b8a6]/30';
  const bg = lens === 'B' ? 'bg-[#78350f]/20' : 'bg-[#134e4a]/20';

  return (
    <div className="w-full h-full overflow-y-auto pb-24 pt-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col">
        <h2 className="font-['Playfair_Display'] text-[3.5rem] md:text-[4.5rem] text-white mb-10 tracking-wide text-center">
          Why not the loudest arrows?
        </h2>

        <div className="bg-[#120e1c]/80 border border-[#2a2150] p-8 rounded-2xl shadow-xl mb-8">
          <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 opacity-80">Filter We DID Run</h3>
          <p className="text-lg text-[#cbd5e1] mb-4">Liver week-5 mean vs week-39 mean. Fold = (mean39+1)/(mean5+1). Expressed if either mean ≥ 1.</p>
          <div className="flex gap-8 font-mono text-lg mb-6">
            <span className="text-[#34d399]">2× up = 894</span>
            <span className="text-[#f87171]">2× down = 763</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#07060c] p-5 rounded-xl border border-[#ffffff10]">
              <div className="text-[#94a3b8] mb-2 text-sm uppercase">Top Named Crash</div>
              <div className="text-xl text-white font-mono font-bold"><span className="text-[#60a5fa]">vtg2</span> (1851 → 0.7)</div>
              <div className="mt-2 text-sm text-[#cbd5e1]">vtg2 is egg yolk. Reproduction leaving the liver. Not mitochondria.</div>
            </div>
            <div className="bg-[#07060c] p-5 rounded-xl border border-[#ffffff10]">
              <div className="text-[#94a3b8] mb-2 text-sm uppercase">Top Unnamed Up</div>
              <div className="text-xl text-white font-mono font-bold">si:ch211-154o6.6 <span className="text-sm font-sans font-normal">(234× from ~0.12)</span></div>
              <div className="mt-2 text-sm text-[#cbd5e1]">si:ch211-... is a barcode. Unnamed ≠ fake, but unnamed ≠ a classroom sentence.</div>
            </div>
          </div>
        </div>

        <div className="bg-[#120e1c]/80 border border-[#2a2150] p-8 rounded-2xl shadow-xl mb-12">
          <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4 opacity-80">Rule We Used Instead</h3>
          <p className="text-2xl font-bold text-white mb-6">Pick genes with a JOB and an ADDRESS.</p>
          <ul className="space-y-3 text-lg text-[#cbd5e1]">
            <li><strong className="text-[#60a5fa] font-mono mr-2">cox4i1</strong> last burn step.</li>
            <li><strong className="text-[#60a5fa] font-mono mr-2">ndufs7</strong> first burn step.</li>
            <li><strong className="text-[#60a5fa] font-mono mr-2">sod1</strong> mop.</li>
            <li><strong className="text-[#60a5fa] font-mono mr-2">tyr</strong> paint (must be off in liver).</li>
            <li><strong className="text-[#60a5fa] font-mono mr-2">apoa1a</strong> fat taxi (must be off in fin).</li>
            <li><strong className="text-[#60a5fa] font-mono mr-2">vtg2</strong> the honest filter winner so the sort cannot kidnap the talk.</li>
          </ul>
        </div>

        {lv >= 2 && (
          <div className={`p-6 rounded-xl border ${border} ${bg} text-white text-[1.25rem] shadow-lg text-center`}>
            <span className={`font-bold ${highlight} mr-3 uppercase tracking-wider`}>So What:</span>
            Fold-change without a job is a leaderboard. Jobs + rooms is how you talk about aging without teaching "yolk = aging."
          </div>
        )}
      </div>
    </div>
  );
}
