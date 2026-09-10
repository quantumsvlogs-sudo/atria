import React from 'react';
import { HEATMAP_MEANS } from '../../data';

function getRdBuColor(z: number) {
  const normalized = Math.max(-2.2, Math.min(2.2, z));
  if (normalized === 0) return '#f8fafc';
  if (normalized > 0) {
    // scale from white (#f8fafc) to dark red (#9f1239) via mid red (#f87171)
    const intensity = normalized / 2.2;
    return `rgba(159, 18, 57, ${intensity})`; // using rgba for simplicity, or we can use fixed colors
  } else {
    // scale from white to dark blue (#1e3a8a) via mid blue (#60a5fa)
    const intensity = Math.abs(normalized) / 2.2;
    return `rgba(30, 58, 138, ${intensity})`;
  }
}

// More precise color mapping to match prompt
function getHeatmapColor(z: number) {
  const v = Math.max(-2.2, Math.min(2.2, z));
  if (v === 0) return '#f8fafc';
  if (v > 0) {
    // 0 to 1 = white to #f87171
    // 1 to 2.2 = #f87171 to #9f1239
    if (v <= 1) return `color-mix(in srgb, #f87171 ${v * 100}%, #f8fafc)`;
    return `color-mix(in srgb, #9f1239 ${(v - 1) / 1.2 * 100}%, #f87171)`;
  } else {
    const a = Math.abs(v);
    if (a <= 1) return `color-mix(in srgb, #60a5fa ${a * 100}%, #f8fafc)`;
    return `color-mix(in srgb, #1e3a8a ${(a - 1) / 1.2 * 100}%, #60a5fa)`;
  }
}

export function HeatmapChart3() {
  const rows = HEATMAP_MEANS.map(row => {
    const vals = [row.wk5, row.wk12, row.wk20, row.wk27, row.wk39];
    const mean = vals.reduce((a, b) => a + b, 0) / 5;
    const sd = Math.sqrt(vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / 5) || 1;
    return { 
      gene: row.gene, 
      zScores: vals.map(v => (v - mean) / sd),
      raw: vals
    };
  });

  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-[1.5rem] font-bold text-white tracking-tight">Liver week means, n=5</h3>
          <p className="text-[1.1rem] text-slate-400">Color is z-score WITHIN the gene, not raw RPKM.</p>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center min-h-[300px] gap-8">
        <div className="flex flex-col gap-1 w-full max-w-[800px]">
          <div className="flex text-sm font-mono text-slate-400 mb-2 font-bold uppercase tracking-widest">
            <div className="w-24"></div>
            {['5w', '12w', '20w', '27w', '39w'].map(w => (
              <div key={w} className="flex-1 text-center">{w}</div>
            ))}
          </div>
          
          {rows.map(row => (
            <div key={row.gene} className="flex h-16 items-center gap-1 group">
              <div className="w-24 text-sm font-mono text-slate-300 text-right pr-4 font-bold group-hover:text-white transition-colors">{row.gene}</div>
              {row.zScores.map((z, i) => (
                <div 
                  key={i} 
                  className="flex-1 h-full rounded transition-all hover:scale-[1.02] hover:z-10 shadow-sm flex items-center justify-center" 
                  style={{ backgroundColor: getHeatmapColor(z) }} 
                  title={`Raw RPKM: ${row.raw[i]}\nZ-Score: ${z.toFixed(2)}`}
                >
                  <span className={`text-[0.7rem] font-mono font-medium opacity-80 ${Math.abs(z) > 1.2 ? 'text-white' : 'text-black'}`}>
                    {row.raw[i].toFixed(row.raw[i] > 10 ? 1 : 2)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-col items-center bg-[#120e1c] p-4 rounded-xl border border-[#2a2150]">
          <div className="text-xs font-mono text-slate-300 mb-3 text-center uppercase tracking-widest">z within<br/>gene</div>
          <div className="flex gap-3">
            <div className="w-4 h-48 rounded-full" style={{ background: 'linear-gradient(to top, #1e3a8a, #60a5fa, #f8fafc, #f87171, #9f1239)' }} />
            <div className="flex flex-col justify-between h-48 text-xs font-mono text-slate-400 py-1">
              <span>+2</span>
              <span>+1</span>
              <span> 0</span>
              <span>-1</span>
              <span>-2</span>
            </div>
          </div>
          <div className="mt-4 text-[0.65rem] text-slate-400 w-40 text-center leading-tight">
            blue = below that gene's own 5-week average<br/>
            white = that gene's average<br/>
            red = above that gene's own 5-week average<br/><br/>
            <span className="text-red-400 font-bold uppercase tracking-wider">NOT 'more RNA than another gene.'</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-[#94a3b8] font-mono border-t border-[#2a2150] pt-4">
        * tyr in liver is ~off (wrong organ). vtg2 crash is 5→12, not a slow slide. vtg2 week-5 SD is huge — one young liver dominates the mean.
      </div>
    </div>
  );
}
