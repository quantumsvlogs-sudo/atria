import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Legend, Tooltip } from 'recharts';
import { ORGAN_PCT, CHART_DEFAULTS, COLORS } from '../data';

export function Slide4({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Same recipe, three rooms.",
      2: "Organs don't agree on aging. If the 'power plant' shut off, all energy genes would drop together—they don't."
    },
    A: {
      1: "Fin window is 10 weeks, other fish. % are not one experiment.",
      2: "Organ-specific trajectories dominate. You cannot generalize whole-body aging from a single tissue's transcriptome."
    }
  };
  const why = {
    B: "Bar = compare named groups. Same names, three rooms. Never mix organs on one unlabeled axis.",
    A: "Bar = compare named groups. Grouped bars keep organs as separate series. One axis mix would be a lie."
  };

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="Organs Disagree" lens={lens} lv={lv} copy={copy} why={why} />
        
        {lv >= 2 && (
          <div className="mt-6 text-sm text-[#94a3b8] font-mono p-4 bg-[#120e1c]/80 border border-[#2a2150] rounded-xl shadow-lg">
            <ul className="space-y-3">
              <li><strong className="text-white">cox4i1</strong> — last step of burning food+oxygen for energy. Loud in all three rooms so the class can see it. Liver down, skin not.</li>
              <li><strong className="text-white">ndufs7</strong> — first step of the same power plant. If the plant "shut off," this and cox4i1 would move together. They don't.</li>
              <li><strong className="text-white">sod1</strong> — mops toxic leftover oxygen. Different job from the pumps. Liver down, skin up.</li>
              <li><strong className="text-white">tyr</strong> — makes color. Must be off in liver. On in fin, and falling. Faded ≠ quieter liver COX.</li>
              <li><strong className="text-white">apoa1a</strong> — liver fat-shipping protein. Must be off in fin. Opposite address of tyr.</li>
              <li><strong className="text-white">vtg2</strong> — egg-yolk protein. Biggest named collapse we measured (1851→0.7). Reproduction leaving the liver, not "the aging gene."</li>
            </ul>
          </div>
        )}
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex items-center h-full min-h-[500px]">
        <div className="chart-card w-full h-[75vh] flex flex-col relative p-6 shadow-2xl">
          <div className="text-[1.25rem] 2xl:text-[1.5rem] text-white font-bold mb-6 text-center font-sans tracking-wide">% Change by Organ</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ORGAN_PCT} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <ReferenceLine y={0} stroke="#f8fafc" strokeWidth={2} />
              <XAxis dataKey="gene" stroke={CHART_DEFAULTS.tick} height={50} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 16 }} axisLine={false} tickLine={false} dy={15} />
              <YAxis width={80} domain={[-100, 100]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} tickFormatter={val => `${val}%`} />
              <Tooltip 
                cursor={{ fill: '#ffffff0a' }} 
                contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px', color: '#fff' }}
                formatter={(value, name) => [value === null ? 'N/A' : `${value}%`, name]}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '16px' }} iconType="circle" />
              <Bar dataKey="liver" name="Liver (wk 5→39)" fill={COLORS.liverBar} isAnimationActive={false} radius={[4, 4, 0, 0]} />
              <Bar dataKey="skin" name="Skin (wk 5→39)" fill={COLORS.skinBar} isAnimationActive={false} radius={[4, 4, 0, 0]} />
              <Bar dataKey="fin" name="Fin (wk 10→20)" fill={COLORS.finBar} isAnimationActive={false} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="absolute bottom-4 left-0 w-full text-center text-[12px] 2xl:text-[14px] text-[#94a3b8] font-mono tracking-wide px-8">
            * tyr in liver is ~0.1 RPKM both ends — wrong organ for this gene.<br/>
            ** vtg2 skin/fin already ~off.
          </div>
        </div>
      </div>
    </div>
  );
}
