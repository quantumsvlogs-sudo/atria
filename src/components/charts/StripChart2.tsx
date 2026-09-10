import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ZAxis } from 'recharts';
import { cox4i1_raw, cox4i1_means } from '../../data';

export function StripChart2({ lens }: { lens: 'A' | 'B' }) {
  const scatterData = [];
  cox4i1_raw.forEach((group, i) => {
    group.values.forEach(v => {
      scatterData.push({
        xNumeric: i + 1,
        week: group.week,
        val: v,
        jitter: (i + 1) + (Math.random() - 0.5) * 0.25 // Tighter jitter
      });
    });
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">cox4i1 (Raw Livers)</h3>
        <p className="text-sm text-slate-400">25 individual samples showing true spread</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis type="number" dataKey="jitter" domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]} tickFormatter={(val) => cox4i1_means[val - 1]?.week || ''} stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis type="number" dataKey="val" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 800]} />
            <ZAxis type="number" range={[60, 60]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} />
            <Scatter data={scatterData} fill={lens === 'A' ? '#2dd4bf' : '#f5b942'} opacity={0.7} />
            {cox4i1_means.map((m, i) => (
              <Scatter key={m.week} data={[{ jitter: i + 1, val: m.mean }]} fill="#ffffff" shape="cross" />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
