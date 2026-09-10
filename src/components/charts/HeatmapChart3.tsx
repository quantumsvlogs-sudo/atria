import React from 'react';
import { data_means } from '../../data';

function getRdBuColor(z: number) {
  const normalized = Math.max(-2, Math.min(2, z));
  if (normalized > 0) return `rgba(220, 38, 38, ${(normalized / 2) * 0.9 + 0.1})`;
  return `rgba(37, 99, 235, ${(Math.abs(normalized) / 2) * 0.9 + 0.1})`;
}

export function HeatmapChart3() {
  const rows = data_means.map(row => {
    const vals = [row.wk5, row.wk12, row.wk20, row.wk27, row.wk39];
    const mean = vals.reduce((a, b) => a + b, 0) / 5;
    const sd = Math.sqrt(vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / 4) || 1;
    return { gene: row.gene, zScores: vals.map(v => (v - mean) / sd) };
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">8 Genes × 5 Weeks</h3>
          <p className="text-sm text-slate-400">Within-row Z-scores (Week Means)</p>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col gap-1 justify-center min-h-[300px]">
        <div className="flex text-xs font-mono text-slate-500 mb-2 font-bold uppercase tracking-widest">
          <div className="w-24"></div>
          {['5w', '12w', '20w', '27w', '39w'].map(w => (
            <div key={w} className="flex-1 text-center border-l border-[#ffffff0a]">{w}</div>
          ))}
        </div>
        
        {rows.map(row => (
          <div key={row.gene} className="flex h-10 items-center gap-1 group">
            <div className="w-24 text-xs font-mono text-slate-300 text-right pr-4 font-bold group-hover:text-white transition-colors">{row.gene}</div>
            {row.zScores.map((z, i) => (
              <div key={i} className="flex-1 h-full rounded transition-all hover:scale-[1.02] hover:z-10 shadow-sm" style={{ backgroundColor: getRdBuColor(z) }} title={`Z-Score: ${z.toFixed(2)}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
