import React from 'react';

export function Slide13External({ lv, lens }: { lv: 1|2|3, lens?: 'A'|'B' }) {
  const cards = [
    {
      title: "Baumgart Cell Systems 2016",
      subtitle: "(OUR files)",
      method: "RNA-seq + WGCNA on fins + rotenone survival.",
      claim: "complex I module in young fins tracked shorter life; low-dose rotenone +~15% life.",
      similar: "Same matrix family. Different analysis. Their 15% is a DRUG TRIAL. Not our % on COX.",
      whynot: "We show raw points + organs. We credit one clause. We do not rebuild WGCNA."
    },
    {
      title: "Hu & Brunet Aging Cell 2018",
      subtitle: "",
      method: "Review / strain comparison. GRZ short-lived vs wild-derived.",
      claim: "",
      similar: "Same animal, months-not-years. Not our table.",
      whynot: "Photos of 'old' fish are appearance. Our usable object is the molecular table."
    },
    {
      title: "Van Houcke Aging Cell 2024",
      subtitle: "",
      method: "Retina RNA-seq, PCA, Venns, heatmaps.",
      claim: "Retina separates by age; more genes up than down THERE.",
      similar: "Age is an axis in a transcriptome. Different organ, different weeks.",
      whynot: "Their gene list is not our liver/skin/fin result."
    },
    {
      title: "2026 multi-tissue killifish atlas",
      subtitle: "(Nature Aging)",
      method: "13 tissues, tissue clocks.",
      claim: "Confirms the TEACHING claim (organs age on different scripts) with a BIGGER experiment we did not run.",
      similar: "",
      whynot: "One spoken line only. Do not steal their figures."
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto pb-24 pt-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col">
        <h2 className="font-['Playfair_Display'] text-[3.5rem] md:text-[4.5rem] text-white mb-4 tracking-wide text-center">
          External Evidence
        </h2>
        <p className="text-xl text-[#94a3b8] font-mono text-center mb-12 tracking-widest uppercase">
          Same species, not the same figure.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-[#120e1c]/80 border border-[#2a2150] p-6 rounded-2xl shadow-xl flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-1">
                {c.title}
                {c.subtitle && <span className="ml-2 text-[#94a3b8] text-lg font-normal">{c.subtitle}</span>}
              </h3>
              
              <div className="mt-4 space-y-4 text-lg text-[#cbd5e1] flex-grow">
                <div><strong className="text-white text-sm uppercase tracking-widest mr-2">Method:</strong> {c.method}</div>
                {c.claim && <div><strong className="text-white text-sm uppercase tracking-widest mr-2">Claim:</strong> {c.claim}</div>}
                {c.similar && <div><strong className="text-[#34d399] text-sm uppercase tracking-widest mr-2">Similar?</strong> {c.similar}</div>}
              </div>

              {lv >= 2 && (
                <div className="mt-6 pt-4 border-t border-[#ffffff10] text-[#f43f5e] text-lg font-medium">
                  <strong className="text-[#f43f5e] text-sm uppercase tracking-widest mr-2">Why not copy:</strong>
                  {c.whynot}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
