import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ZAxis } from 'recharts';
import { DEATH_WEEKS_45 } from '../../data';

export function LifespanStrip7() {
  const points = DEATH_WEEKS_45.map(w => ({
    x: w,
    y: Math.random() // for jitter
  }));

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="mb-12 text-center">
        <h3 className="text-2xl font-bold text-white tracking-tight">Table S1: 45 Recorded Deaths</h3>
        <p className="text-sm text-slate-400 mt-2">Schematic distribution along weeks</p>
      </div>
      
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" horizontal={false} />
            <XAxis type="number" dataKey="x" domain={[20, 80]} name="Weeks" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 14, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
            <YAxis type="number" dataKey="y" domain={[0, 1]} hide />
            <ZAxis type="number" range={[100, 100]} />
            <Scatter data={points} fill="#8b5cf6" opacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-12">
        {[{l: 'MIN', v: '28.71'}, {l: 'MEDIAN', v: '48.86'}, {l: 'MAX', v: '71.86'}, {l: 'N', v: '45'}].map(s => (
          <div key={s.l} className="bg-[#ffffff05] border border-white/10 rounded-xl p-4 text-center">
            <div className="text-[10px] font-bold text-slate-500 mb-1">{s.l}</div>
            <div className="text-xl font-mono text-white">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
