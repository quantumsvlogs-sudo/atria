import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, ReferenceLine, Cell } from 'recharts';
import { organ_changes } from '../../data';

export function GroupedBarChart4({ lens }: { lens: 'A' | 'B' }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">% Change by Organ</h3>
        <p className="text-sm text-slate-400">Liver (5→39) vs Skin (5→39) vs Fin (10→20)</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={organ_changes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <ReferenceLine y={0} stroke="#ffffff40" strokeWidth={2} />
            <XAxis dataKey="gene" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip cursor={{ fill: '#ffffff0a' }} contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
            
            <Bar dataKey="liver" name="Liver" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="skin" name="Skin" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fin" name="Fin" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
