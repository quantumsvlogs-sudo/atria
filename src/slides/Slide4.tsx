import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { ORGAN_PCT, CHART_DEFAULTS, COLORS } from '../data';

export function Slide4({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Same recipe. Three rooms. They do not agree.",
      2: "Liver turned cox4i1 a bit down. Skin turned cousins of that gene up. Fin barely moved — except pigment gene tyr."
    },
    A: {
      1: "Three designs, one picture — labeled.",
      2: "ndufs7 liver −13% vs skin +70%. Do not average those."
    }
  };
  const why = {
    B: "Grouped bars keep organs as separate series. One axis mix would be a lie.",
    A: "This chart is the result. Everything else supports it."
  };

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="Organs Disagree" lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex items-center h-full min-h-[500px]">
        <div className="chart-card w-full h-[65vh] flex flex-col relative p-6">
          <div className="text-[1.25rem] 2xl:text-[1.5rem] text-white font-bold mb-2 text-center font-sans tracking-wide">Gene Expression % Change Across Organs</div>
          <div className="text-[1rem] 2xl:text-[1.1rem] text-[#94a3b8] mb-2 text-center font-sans tracking-wide">Comparing early vs late life stages</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ORGAN_PCT} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <ReferenceLine y={0} stroke="#f8fafc" strokeWidth={2} />
              <XAxis dataKey="g" stroke={CHART_DEFAULTS.tick} height={50} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 16 }} axisLine={false} tickLine={false} dy={15} label={{ value: 'Target Genes', position: 'insideBottom', fill: '#94a3b8', fontSize: 15 }} />
              <YAxis width={80} domain={[-80, 160]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} label={{ value: 'Expression Change (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 15, style: { textAnchor: 'middle' } }} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '16px' }} iconType="rect" />
              <Bar dataKey="L" name="Liver (wk 5→39)" fill={COLORS.liverBar} isAnimationActive={false} />
              <Bar dataKey="S" name="Skin (wk 5→39)" fill={COLORS.skinBar} isAnimationActive={false} />
              <Bar dataKey="F" name="Fin (wk 10→20)" fill={COLORS.finBar} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
          <div className="absolute bottom-4 left-0 w-full text-center text-[12px] 2xl:text-[14px] text-[#94a3b8] font-mono tracking-wide px-8">
            * tyr in liver is ~0.1 RPKM both ends — wrong organ for this gene.
          </div>
        </div>
      </div>
    </div>
  );
}
