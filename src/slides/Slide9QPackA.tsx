import React from 'react';
import { StripChart2 } from '../components/charts/StripChart2';
import { OrganTable } from '../components/OrganTable';
import { LifespanStrip7 } from '../components/charts/LifespanStrip7';
import { CountChart5 } from '../components/charts/CountChart5';

export function Slide9QPackA({ lv }: { lv: 1|2|3 }) {
  const qa = [
    {
      q: "Are the five week-5 livers five fish or one fish five times?",
      a: "Five different JM fish, killed that week.",
      chart: <StripChart2 />,
      sowhat: "n=5 is biological replicates, not technical repeats. Overlap between weeks is real.",
      method: "Biological replicates across separate timepoints."
    },
    {
      q: "Did you mix liver (_3), skin (_5), fin (LS) on one unlabeled axis?",
      a: "No. Grouped % table / bars keep three columns.",
      chart: <OrganTable />,
      sowhat: "Unlabeled mix would make tyr look like it 'appeared.' It was off in liver on purpose.",
      method: "Tissue separation prevents false-positive aging signatures."
    },
    {
      q: "Is week-39 liver the same animals grown up?",
      a: "No. Cross-section. New fish sacrificed at 39.",
      chart: <StripChart2 />,
      sowhat: "We cannot say 'this fish’s COX fell.' We can say 'this week’s livers sit lower than week 5’s pile.'",
      method: "Cross-sectional experimental design."
    },
    {
      q: "Why talk lifespan if S1 IDs ≠ LS columns?",
      a: "S1 is the same paper, different ID system. We cite it. We do not merge.",
      chart: <LifespanStrip7 />,
      sowhat: "Limitation = inherent variability. RNA week ≠ days alive.",
      method: "Lifespan cohort (S1) kept separate from transcriptome matrix."
    },
    {
      q: "Is +15% rotenone your calculation?",
      a: "No. Baumgart 2016 drug trial. Credit one clause. Not on our bars.",
      chart: null,
      sowhat: "Honesty is how this talk gets marked.",
      method: "Attribution of external experimental intervention."
    },
    {
      q: "Why bigger than 10×25?",
      a: "The plan already owned 23,564 × 185 + S1/S2. 10×25 was a minimum view.",
      chart: <CountChart5 />,
      sowhat: "The count slide IS the full matrix. Named genes are vocabulary.",
      method: "Comprehensive row retention rather than cherry-picking."
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto pb-24 pt-8 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <h2 className="font-['Playfair_Display'] text-[3.5rem] md:text-[4.5rem] text-[#ccfbf1] text-center mb-16 tracking-wide drop-shadow-md">
          Marker Questions
        </h2>
        {qa.map((item, i) => (
          <div key={i} className="bg-[#120e1c]/90 border border-[#2a2150] rounded-2xl p-8 flex flex-col xl:flex-row gap-8 shadow-2xl backdrop-blur-md">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl 2xl:text-3xl font-bold text-white mb-6 leading-tight">
                <span className="text-[#14b8a6] opacity-80 mr-3">Q{i+1}.</span>
                {item.q}
              </h3>
              <p className="text-xl 2xl:text-2xl text-[#94a3b8] mb-8 leading-relaxed">
                <strong className="text-white uppercase text-sm tracking-widest mr-3">Answer:</strong>
                {item.a}
              </p>
              
              {lv >= 2 && (
                <div className="bg-[#134e4a]/20 border border-[#14b8a6]/30 p-5 rounded-xl text-[#ccfbf1] text-lg 2xl:text-xl shadow-inner mt-auto">
                  <span className="font-bold text-[#14b8a6] uppercase tracking-widest text-sm mr-2 block mb-1">So What:</span>
                  {item.sowhat}
                </div>
              )}
              {lv === 3 && (
                <div className="mt-6 pt-4 border-t border-[#2a2150] text-sm font-mono text-[#64748b]">
                  <span className="text-[#94a3b8] uppercase mr-2">Method:</span> {item.method}
                </div>
              )}
            </div>
            {item.chart && (
              <div className="flex-1 h-[400px] xl:h-auto min-h-[400px] relative bg-[#07060c]/50 rounded-xl border border-[#ffffff10] p-6 flex flex-col overflow-hidden">
                {item.chart}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
