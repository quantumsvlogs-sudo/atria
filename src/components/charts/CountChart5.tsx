import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { COUNTS } from '../../data';

export function CountChart5() {
  const chartData = [
    {
      organ: 'Liver (5vs39)',
      up: COUNTS.liver[0],
      down: COUNTS.liver[1],
      similar: COUNTS.liver[2],
      off: COUNTS.liver[3]
    },
    {
      organ: 'Skin (5vs39)',
      up: COUNTS.skin[0],
      down: COUNTS.skin[1],
      similar: COUNTS.skin[2],
      off: COUNTS.skin[3]
    }
  ];

  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="mb-8">
        <h3 className="text-[1.5rem] font-bold text-white tracking-tight">23,564 Transcriptome Rows</h3>
        <p className="text-[1.1rem] text-slate-400">Classified by 2x fold-change</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="organ" stroke="#ffffff40" tick={{ fill: '#ffffff', fontSize: 14, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#ffffff0a' }} contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
            
            <Bar dataKey="up" name="≥2× Up" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
            <Bar dataKey="down" name="≥2× Down" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="similar" name="Similar" stackId="a" fill="#64748b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="off" name="Off/Silent" stackId="a" fill="#1e293b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
