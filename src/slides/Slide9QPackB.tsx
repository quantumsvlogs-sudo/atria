import React from 'react';
import { StripChart2 } from '../components/charts/StripChart2';
import { CountChart5 } from '../components/charts/CountChart5';

export function Slide9QPackB({ lv }: { lv: 1|2|3 }) {
  const qa = [
    {
      q: "Which gene has the biggest numbers in liver?",
      a: "apoa1a (~52,000 RPKM). Fat-shipping job. Not 'the aging gene.'",
      chart: null,
      sowhat: "Biggest number ≠ most important for aging.",
      method: "Absolute expression levels do not dictate regulatory importance."
    },
    {
      q: "Do numbers get bigger as week goes up?",
      a: "Depends on gene AND organ. cox4i1 liver: highest at 5, already down by 12, then flat-ish.",
      chart: <StripChart2 />,
      sowhat: "Not a slide every step.",
      method: "Non-linear longitudinal trajectories."
    },
    {
      q: "Why 23k rows if the picture is 6 genes?",
      a: "File is 23,564. Picture is a job-panel. Count bar: liver 894 up / 763 down / 11,784 on-but-similar / 10,123 off.",
      chart: <CountChart5 />,
      sowhat: "Most recipes do not flip. That is the result, not a disappointment.",
      method: "Global transcriptome stability context."
    },
    {
      q: "Why five fish at one week disagree?",
      a: "Different animals. Same test, different kids.",
      chart: <StripChart2 />,
      sowhat: "A mean hides a 20-week liver that looks like a 5-week liver.",
      method: "Biological variance within discrete age groups."
    },
    {
      q: "Did they all live the same number of weeks?",
      a: "No. Other sheet: 29–72 weeks.",
      chart: null,
      sowhat: "Do not treat 'week 39' as 'about to die.'",
      method: "Lifespan variance vs fixed collection endpoints."
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto pb-24 pt-8 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <h2 className="font-['Playfair_Display'] text-[3.5rem] md:text-[4.5rem] text-[#fef3c7] text-center mb-16 tracking-wide drop-shadow-md">
          Class Questions
        </h2>
        {qa.map((item, i) => (
          <div key={i} className="bg-[#120e1c]/90 border border-[#2a2150] rounded-2xl p-8 flex flex-col xl:flex-row gap-8 shadow-2xl backdrop-blur-md">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl 2xl:text-3xl font-bold text-white mb-6 leading-tight">
                <span className="text-[#f5b942] opacity-80 mr-3">Q{i+1}.</span>
                {item.q}
              </h3>
              <p className="text-xl 2xl:text-2xl text-[#94a3b8] mb-8 leading-relaxed">
                <strong className="text-white uppercase text-sm tracking-widest mr-3">Answer:</strong>
                {item.a}
              </p>
              
              {lv >= 2 && (
                <div className="bg-[#78350f]/20 border border-[#f5b942]/30 p-5 rounded-xl text-[#fef3c7] text-lg 2xl:text-xl shadow-inner mt-auto">
                  <span className="font-bold text-[#f5b942] uppercase tracking-widest text-sm mr-2 block mb-1">So What:</span>
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
