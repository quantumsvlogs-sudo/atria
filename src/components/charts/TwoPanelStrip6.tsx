import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ndufs7_means, nrf1_means } from '../../data';

export function TwoPanelStrip6() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="mb-2">
        <h3 className="text-xl font-bold text-white tracking-tight">Key Gene Means</h3>
      </div>
      
      <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col min-h-[200px]">
        <h4 className="text-sm font-mono text-slate-300 mb-4 font-bold uppercase">ndufs7</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ndufs7_means} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="week" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Bar dataKey="mean" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col min-h-[200px]">
        <h4 className="text-sm font-mono text-slate-300 mb-4 font-bold uppercase">nrf1</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={nrf1_means} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="week" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Bar dataKey="mean" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
