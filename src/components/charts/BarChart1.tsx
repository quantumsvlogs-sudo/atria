import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ErrorBar, Tooltip } from 'recharts';
import { cox4i1_means } from '../../data';

export function BarChart1({ lens }: { lens: 'A' | 'B' }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">cox4i1 (Liver Means)</h3>
        <p className="text-sm text-slate-400">RPKM values across 5 timepoints (n=5)</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cox4i1_means} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="week" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#ffffff0a' }} contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} />
            <Bar dataKey="mean" fill={lens === 'A' ? '#2dd4bf' : '#f5b942'} radius={[6, 6, 0, 0]} maxBarSize={80}>
              <ErrorBar dataKey="sd" width={8} strokeWidth={2} stroke="#ffffff" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
