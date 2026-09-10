import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ErrorBar, ComposedChart, Line } from 'recharts';
import { WEEKS, COX_MEAN, COX_SD, COX_RAW, CHART_DEFAULTS, COLORS } from '../data';

export function Slide2({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Highest at 5 weeks. Not a slide down every step.",
      2: "cox4i1 is one piece of the last energy pump. Average 553 → 409 → 422 → 465 → 450. The drop is 5 to 12, then it sits."
    },
    A: {
      1: "n=5 per bar. Cross-sectional.",
      2: "Week-20 raw values already overlap week-5. Mean 553 vs 450 is −19%, not a switch."
    }
  };
  const why = {
    B: "Bar compares five age groups. Weeks are categories, not one fish’s diary.",
    A: "Strip exists because a bar hides overlap."
  };

  const barData = WEEKS.map((w, i) => ({
    name: `${w} wk`,
    mean: COX_MEAN[i],
    error: [COX_SD[i], COX_SD[i]]
  }));

  const scatterData: any[] = [];
  WEEKS.forEach((w, i) => {
    COX_RAW[w as keyof typeof COX_RAW].forEach(val => {
      scatterData.push({ x: i + 1 + (Math.random()-0.5)*0.24, y: val, week: `${w} wk` });
    });
  });

  const meanLineData = WEEKS.map((w, i) => ({
    x: i + 1,
    mean: COX_MEAN[i],
    error: [COX_SD[i], COX_SD[i]]
  }));

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="cox4i1" lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex gap-8 h-full min-h-[500px]">
        {/* CHART 1: BAR */}
        <div className={`chart-card flex flex-col ${lens === 'A' ? 'w-1/2' : 'w-full'}`}>
          <div className="text-[1.1rem] 2xl:text-[1.25rem] text-white font-bold mb-2 text-center font-sans tracking-wide">Mean cox4i1 Expression in Liver</div>
          <div className="text-[0.9rem] 2xl:text-[1rem] text-[#94a3b8] mb-6 text-center font-sans tracking-wide">Mean of 5 fish ± SD</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <XAxis dataKey="name" stroke={CHART_DEFAULTS.tick} height={50} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} dy={10} label={{ value: 'Age Category', position: 'insideBottom', fill: '#94a3b8', fontSize: 15 }} />
              <YAxis domain={[0, 750]} width={70} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} label={{ value: 'RPKM (Expression Level)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 15, style: { textAnchor: 'middle' } }} />
              <Bar dataKey="mean" fill={COLORS.coxBar} isAnimationActive={false}>
                <ErrorBar dataKey="error" width={10} strokeWidth={3} stroke="#f8fafc" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CHART 2: SCATTER (LENS A ONLY) */}
        {lens === 'A' && (
          <div className="chart-card w-1/2 flex flex-col">
            <div className="text-[1.1rem] 2xl:text-[1.25rem] text-white font-bold mb-2 text-center font-sans tracking-wide">Raw cox4i1 Expression in Liver</div>
            <div className="text-[0.9rem] 2xl:text-[1rem] text-[#94a3b8] mb-6 text-center font-sans tracking-wide">25 individual livers (5 per week)</div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
                <XAxis type="number" dataKey="x" domain={[0.5, 5.5]} height={50} ticks={[1,2,3,4,5]} tickFormatter={(v) => `${WEEKS[v-1]} wk`} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} dy={10} label={{ value: 'Age Category', position: 'insideBottom', fill: '#94a3b8', fontSize: 15 }} />
                <YAxis type="number" width={70} domain={[0, 850]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} label={{ value: 'RPKM (Expression Level)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 15, style: { textAnchor: 'middle' } }} />
                <Scatter data={scatterData} dataKey="y" fill={COLORS.dot} isAnimationActive={false} />
                <Line data={meanLineData} type="monotone" dataKey="mean" stroke="#f8fafc" strokeWidth={3} dot={false} isAnimationActive={false}>
                  <ErrorBar dataKey="error" width={10} strokeWidth={3} stroke="#f8fafc" />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
