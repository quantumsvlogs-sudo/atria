import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';

export function Slide1({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "One cell = how hard this organ was reading this one recipe that week.",
      2: "DNA is the cookbook. RNA is the photocopy. RPKM is the photocopy count after a fair scale. Big number = busy recipe. Not 'the gene appeared.'"
    },
    A: {
      1: "RPKM in one organ, one fish, one week.",
      2: "Week is not a column header. GEO sample titles map JM100_3 → liver, 5 weeks. _3 = liver, _5 = skin, LS*_10/20 = fin."
    }
  };
  const why = {
    B: "We start here so five bars later are not mistaken for 'the fish.'",
    A: "Prevents mixing tissues on one axis."
  };

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-5 flex flex-col justify-center">
        <DynamicCopy title="What one number is" lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      <div className="col-span-7 flex items-center justify-center relative w-full h-[60vh]">
        {/* Scaled SVG Diagram */}
        <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100, 50)">
            {/* LIVER */}
            <rect x="0" y="0" width="160" height="220" rx="12" fill="#120e1c" stroke="#2a2150" strokeWidth="3"/>
            <text x="80" y="40" fill="#60a5fa" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'JM*_3 (LIVER)' : 'LIVER'}</text>
            <rect x="50" y="70" width="60" height="70" rx="6" fill="none" stroke="#e2e8f0" strokeWidth="3"/>
            <line x1="60" y1="85" x2="100" y2="85" stroke="#e2e8f0" strokeWidth="3"/>
            <line x1="60" y1="105" x2="90" y2="105" stroke="#e2e8f0" strokeWidth="3"/>
            <text x="80" y="170" fill="#94a3b8" fontSize="14" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'same genome' : 'Recipe book'}</text>

            {/* SKIN */}
            <rect x="240" y="50" width="160" height="220" rx="12" fill="#120e1c" stroke="#2a2150" strokeWidth="3"/>
            <text x="320" y="90" fill="#f59e0b" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'JM*_5 (SKIN)' : 'SKIN'}</text>
            <rect x="290" y="120" width="60" height="70" rx="6" fill="none" stroke="#e2e8f0" strokeWidth="3"/>
            <line x1="300" y1="135" x2="340" y2="135" stroke="#e2e8f0" strokeWidth="3"/>
            <line x1="300" y1="155" x2="330" y2="155" stroke="#e2e8f0" strokeWidth="3"/>
            <text x="320" y="220" fill="#94a3b8" fontSize="14" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'same genome' : 'Recipe book'}</text>

            {/* Photocopy flying out of Liver */}
            <g className="animate-[drift_2.5s_ease-in-out_infinite_alternate]">
              <rect x="130" y="170" width="50" height="60" fill="#e2e8f0" opacity="0.95" rx="4"/>
              <line x1="140" y1="185" x2="170" y2="185" stroke="#07060c" strokeWidth="3"/>
              <line x1="140" y1="200" x2="160" y2="200" stroke="#07060c" strokeWidth="3"/>
              <text x="155" y="260" fill="#cbd5e1" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'RPKM cell' : 'Photocopies'}</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
