import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DEATH_WEEKS_45, CHART_DEFAULTS } from '../data';

export function Slide5({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Same lab, same food. Life was 29 to 72 weeks.",
      2: "These 45 also gave a fin clip at week 10 and 20, then lived. The liver charts were other animals."
    },
    A: {
      1: "Table S1. Second file.",
      2: "animal # ≠ LS1…LS45. Do not join."
    }
  };
  const why = {
    B: "Strip of deaths. Not a survival curve. We did not model censoring.",
    A: "RNA week ≠ days alive."
  };

  const scatterData = DEATH_WEEKS_45.map(w => ({ x: w, y: (Math.random()-0.5)*0.5 }));

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="Lifespan" lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex items-center h-full min-h-[400px]">
        <div className="chart-card w-full h-[55vh] flex flex-col relative p-8">
          <div className="text-[1.25rem] 2xl:text-[1.5rem] text-white font-bold mb-2 text-center font-sans tracking-wide">Lifespan Distribution (Table S1)</div>
          <div className="text-[1rem] 2xl:text-[1.1rem] text-[#94a3b8] mb-8 text-center font-sans tracking-wide">Each dot is one animal's age at death</div>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <XAxis type="number" height={50} dataKey="x" domain={[20, 80]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 16 }} axisLine={false} tickLine={false} dy={15} label={{ value: 'Age at Death (Weeks)', position: 'insideBottom', fill: '#94a3b8', fontSize: 15 }} />
              <YAxis type="number" width={20} dataKey="y" hide domain={[-1, 1]} />
              
              <ReferenceLine x={28.71} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={2} />
              <ReferenceLine x={49.00} stroke="#f8fafc" strokeDasharray="4 4" strokeWidth={2} />
              <ReferenceLine x={71.86} stroke="#34d399" strokeDasharray="4 4" strokeWidth={2} />
              
              <Scatter data={scatterData} fill="#60a5fa" isAnimationActive={false} />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="absolute bottom-6 left-0 w-full flex justify-center gap-12 text-[1rem] 2xl:text-[1.1rem] text-[#e2e8f0] font-mono tracking-widest bg-[#07060c]/60 py-2 rounded-full mx-auto max-w-2xl border border-white/5">
            <span><span className="text-[#f59e0b] font-bold">min 29 wk</span></span>
            <span><span className="text-[#f8fafc] font-bold">median 49 wk</span></span>
            <span><span className="text-[#34d399] font-bold">max 72 wk</span></span>
            <span>n=45</span>
          </div>
        </div>
      </div>
    </div>
  );
}
