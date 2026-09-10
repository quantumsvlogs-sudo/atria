import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ZAxis } from 'recharts';

export function LifespanStrip7() {
  const points = [];
  const min = 29.14;
  const max = 71.86;
  const median = 49;
  
  for (let i = 0; i < 45; i++) {
    let val = 0;
    if (i < 5) val = min + Math.random() * 5;
    else if (i > 40) val = max - Math.random() * 5;
    else val = median + (Math.random() - 0.5) * 15;
    points.push({ x: val, y: Math.random() });
  }

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
        {[{l: 'MIN', v: '29.14'}, {l: 'MEDIAN', v: '≈49'}, {l: 'MAX', v: '71.86'}, {l: 'N', v: '45'}].map(s => (
          <div key={s.l} className="bg-[#ffffff05] border border-white/10 rounded-xl p-4 text-center">
            <div className="text-[10px] font-bold text-slate-500 mb-1">{s.l}</div>
            <div className="text-xl font-mono text-white">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
