import React from 'react';

export function OrganTable() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-auto p-4 bg-[#07060c] rounded-xl border border-[#ffffff10]">
      <table className="w-full max-w-2xl text-left border-collapse font-sans">
        <thead>
          <tr className="border-b border-[#ffffff20] text-[#94a3b8] font-mono text-xs uppercase tracking-widest">
            <th className="py-3 px-2">Gene</th>
            <th className="py-3 px-2">Liver 5→39</th>
            <th className="py-3 px-2">Skin 5→39</th>
            <th className="py-3 px-2">Fin 10→20</th>
          </tr>
        </thead>
        <tbody className="text-white text-[1rem] 2xl:text-[1.1rem]">
          <tr className="border-b border-[#ffffff10] hover:bg-[#ffffff05] transition-colors">
            <td className="py-3 px-2 font-mono text-[#60a5fa] font-bold">cox4i1</td>
            <td className="py-3 px-2 text-[#f87171]">−19%</td>
            <td className="py-3 px-2 text-[#34d399]">+12%</td>
            <td className="py-3 px-2 text-[#f87171]">−3%</td>
          </tr>
          <tr className="border-b border-[#ffffff10] hover:bg-[#ffffff05] transition-colors">
            <td className="py-3 px-2 font-mono text-[#60a5fa] font-bold">ndufs7</td>
            <td className="py-3 px-2 text-[#f87171]">−13%</td>
            <td className="py-3 px-2 text-[#34d399]">+70%</td>
            <td className="py-3 px-2 text-[#94a3b8]">~0</td>
          </tr>
          <tr className="border-b border-[#ffffff10] hover:bg-[#ffffff05] transition-colors">
            <td className="py-3 px-2 font-mono text-[#60a5fa] font-bold">sod1</td>
            <td className="py-3 px-2 text-[#f87171]">−29%</td>
            <td className="py-3 px-2 text-[#34d399]">+87%</td>
            <td className="py-3 px-2 text-[#f87171]">−10%</td>
          </tr>
          <tr className="border-b border-[#ffffff10] hover:bg-[#ffffff05] transition-colors">
            <td className="py-3 px-2 font-mono text-[#60a5fa] font-bold">tyr</td>
            <td className="py-3 px-2 text-[#94a3b8] text-[0.85em]">~off both ends</td>
            <td className="py-3 px-2 text-[#f87171]">−53%</td>
            <td className="py-3 px-2 text-[#f87171]">−43%</td>
          </tr>
          <tr className="border-b border-[#ffffff10] hover:bg-[#ffffff05] transition-colors">
            <td className="py-3 px-2 font-mono text-[#60a5fa] font-bold">apoa1a</td>
            <td className="py-3 px-2 text-[#f87171]">−27% <span className="text-[0.75em] text-[#94a3b8]">(still huge)</span></td>
            <td className="py-3 px-2 text-[#94a3b8] text-[0.85em]">noisy</td>
            <td className="py-3 px-2 text-[#94a3b8] text-[0.85em]">~off</td>
          </tr>
          <tr className="hover:bg-[#ffffff05] transition-colors">
            <td className="py-3 px-2 font-mono text-[#60a5fa] font-bold">vtg2</td>
            <td className="py-3 px-2 text-[#f87171]">−100% <span className="text-[0.75em] text-[#94a3b8]">(1851→0.7)</span></td>
            <td className="py-3 px-2 text-[#94a3b8] text-[0.85em]">~off</td>
            <td className="py-3 px-2 text-[#94a3b8] text-[0.85em]">~off</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
