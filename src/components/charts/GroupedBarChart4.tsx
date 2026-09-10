import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, ReferenceLine, Cell } from 'recharts';
import { ORGAN_PCT } from '../../data';

export function GroupedBarChart4({ lens }: { lens: 'A' | 'B' }) {
  // Map data to use 0 for nulls visually or omit them, but we want to grey them out or handle properly.
  // We can just use the raw data and let recharts handle nulls (it leaves them blank).
  // But for tyr and vtg2, we might want to ensure the legend or tooltip makes sense.
  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">% Change by Organ</h3>
        <p className="text-sm text-slate-400">Liver (5→39) vs Skin (5→39) vs Fin (10→20)</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ORGAN_PCT} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <ReferenceLine y={0} stroke="#ffffff40" strokeWidth={2} />
            <XAxis dataKey="gene" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip 
              cursor={{ fill: '#ffffff0a' }} 
              contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} 
              formatter={(value, name) => [value === null ? 'N/A' : `${value}%`, name]}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
            
            <Bar dataKey="liver" name="Liver" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            <Bar dataKey="skin" name="Skin" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fin" name="Fin" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
