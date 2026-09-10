import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { COUNTS, CHART_DEFAULTS } from '../data';

export function Slide3({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Most recipes did not flip.",
      2: "We did not draw 23,564 lines. We counted. Skin has more genes going down than liver."
    },
    A: {
      1: "2× on means of 5 vs 5. Expressed = mean ≥ 1 either week.",
      2: "Liver 894 / 763. Skin 1035 / 3058. Designs are both cross-sectional JM."
    }
  };
  const why = {
    B: "A count bar uses every row. That is how a 23k file becomes one slide.",
    A: "Satisfies the 500-row rule without a spaghetti plot."
  };

  const chartData = COUNTS.labels.map((lbl, i) => ({
    name: lbl,
    liver: COUNTS.liver[i],
    skin: COUNTS.skin[i]
  }));

  const hideChart = lens === 'B' && lv === 1;

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="Out of 23,564 genes." lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex items-center justify-center h-full min-h-[500px]">
        {hideChart ? (
          <div className="flex flex-col items-center gap-16 text-center w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-8">
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">894</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">up</span></div>
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">763</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">down</span></div>
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">11,784</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">similar</span></div>
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">10,123</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">off</span></div>
            </div>
            <div className="text-[1.5rem] text-[#64748b] font-mono tracking-widest bg-[#120e1c]/50 px-8 py-3 rounded-full border border-white/5">liver, week 5 vs 39.</div>
          </div>
        ) : (
          <div className="chart-card w-full h-[60vh] flex flex-col p-6">
            <div className="text-[1.25rem] 2xl:text-[1.5rem] text-white font-bold mb-2 text-center font-sans tracking-wide">Transcriptome-Wide Shifts</div>
            <div className="text-[1rem] 2xl:text-[1.1rem] text-[#94a3b8] mb-4 text-center font-sans tracking-wide">Number of genes changing ≥2x (Week 5 vs Week 39)</div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
                <XAxis dataKey="name" stroke={CHART_DEFAULTS.tick} height={50} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 16 }} axisLine={false} tickLine={false} dy={10} label={{ value: 'Expression Change Category', position: 'insideBottom', fill: '#94a3b8', fontSize: 15 }} />
                <YAxis width={80} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} label={{ value: 'Number of Genes', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 15, style: { textAnchor: 'middle' } }} />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '16px' }} iconType="rect" />
                <Bar dataKey="liver" name="Liver" fill="#60a5fa" isAnimationActive={false}>
                  <LabelList dataKey="liver" position="top" fill="#e2e8f0" fontSize={14} fontWeight="bold" />
                </Bar>
                <Bar dataKey="skin" name="Skin" fill="#f59e0b" isAnimationActive={false}>
                  <LabelList dataKey="skin" position="top" fill="#e2e8f0" fontSize={14} fontWeight="bold" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
