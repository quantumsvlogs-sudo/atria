const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n');
}

// ------------------------------------------------------------------
// App.tsx
// ------------------------------------------------------------------
write('src/App.tsx', `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Slide0 } from './slides/Slide0';
import { Slide1 } from './slides/Slide1';
import { Slide2 } from './slides/Slide2';
import { Slide2b } from './slides/Slide2b';
import { Slide3 } from './slides/Slide3';
import { Slide4 } from './slides/Slide4';
import { Slide5 } from './slides/Slide5';
import { Slide6 } from './slides/Slide6';
import { Slide7 } from './slides/Slide7';
import { GlassPane } from './components/GlassPane';
import { PasteDock } from './components/PasteDock';

const ALL_SLIDES = [
  { id: 's0', comp: Slide0, title: 'TITLE' },
  { id: 's1', comp: Slide1, title: 'WHAT ONE NUMBER IS' },
  { id: 's2', comp: Slide2, title: 'HERO' },
  { id: 's2b', comp: Slide2b, title: 'HEATMAP' },
  { id: 's3', comp: Slide3, title: '23,564 ROWS' },
  { id: 's4', comp: Slide4, title: 'ORGANS DISAGREE' },
  { id: 's5', comp: Slide5, title: 'LIFESPAN' },
  { id: 's6', comp: Slide6, title: 'DISTINCTIONS' },
  { id: 's7', comp: Slide7, title: 'CLOSE' }
];

export default function App() {
  const [lens, setLens] = useState<'A' | 'B'>('B');
  const [lv, setLv] = useState<1 | 2 | 3>(1);
  const [slideIdx, setSlideIdx] = useState(0);

  // Compute active slides sequence based on lens
  const activeSlides = ALL_SLIDES.filter(s => {
    if (s.id === 's2b') return lens === 'A';
    return true;
  });

  const currentSlide = activeSlides[slideIdx] || activeSlides[0];

  const handleLensChange = (newLens: 'A' | 'B') => {
    if (newLens === lens) return;
    const currentId = currentSlide.id;
    const nextSlides = ALL_SLIDES.filter(s => newLens === 'A' || s.id !== 's2b');
    
    let nextIdx = nextSlides.findIndex(s => s.id === currentId);
    if (nextIdx === -1 && currentId === 's2b') {
      nextIdx = nextSlides.findIndex(s => s.id === 's2'); // Fallback to hero if heatmap is hidden
    }
    setSlideIdx(Math.max(0, nextIdx));
    setLens(newLens);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setSlideIdx(s => Math.min(activeSlides.length - 1, s + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlideIdx(s => Math.max(0, s - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlides.length]);

  // Slide transition variants
  const slideVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } }
  };

  return (
    <div className="fixed inset-0 bg-[#07060c] flex items-center justify-center overflow-hidden font-['IBM_Plex_Sans'] text-[#cbd5e1]">
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        
        {/* BLOBS */}
        <div className="blob-a absolute w-[60vh] h-[60vh] rounded-full bg-[#4c1d95] top-0 left-0 -translate-x-1/4 -translate-y-1/4 mix-blend-screen opacity-[0.35] blur-[120px] pointer-events-none z-0" />
        <div className="blob-b absolute w-[50vh] h-[50vh] rounded-full bg-[#1e3a8a] bottom-0 right-0 translate-x-1/4 translate-y-1/4 mix-blend-screen opacity-[0.30] blur-[120px] pointer-events-none z-0" />

        {/* GLASS PANE */}
        <GlassPane lens={lens} />

        {/* TOP BAR (z-30) */}
        <header className="absolute top-0 left-0 w-full pt-8 pb-4 flex items-center justify-between px-8 md:px-16 z-30 pointer-events-none">
          <div className="hidden md:block w-[300px] font-mono text-[16px] tracking-[0.2em] text-[#94a3b8] uppercase">
            GSE66712
          </div>
          <div className="font-mono text-[18px] text-[#e2e8f0] bg-[#120e1c]/80 px-4 py-1 rounded-full border border-[#2a2150] backdrop-blur-sm">
            {String(slideIdx + 1).padStart(2, '0')} / {String(activeSlides.length).padStart(2, '0')}
          </div>
          <div className="w-[300px] flex flex-wrap justify-end gap-4 pointer-events-auto">
            {/* LENS PILLS */}
            <div className="flex gap-2">
              <button onClick={() => handleLensChange('A')} className={\`px-6 py-2 rounded-full font-['IBM_Plex_Sans'] text-[14px] font-bold transition-colors shadow-lg \${lens === 'A' ? 'bg-[#134e4a] border border-[#2dd4bf] text-[#ccfbf1]' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0] hover:bg-[#1f1736]'}\`}>
                LENS A
              </button>
              <button onClick={() => handleLensChange('B')} className={\`px-6 py-2 rounded-full font-['IBM_Plex_Sans'] text-[14px] font-bold transition-colors shadow-lg \${lens === 'B' ? 'bg-[#78350f] border border-[#f5b942] text-[#fef3c7]' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0] hover:bg-[#1f1736]'}\`}>
                LENS B
              </button>
            </div>
            {/* LV PILLS */}
            <div className="flex gap-1">
              {[1, 2, 3].map((l) => (
                <button key={l} onClick={() => setLv(l as 1|2|3)} className={\`w-[56px] h-[40px] rounded-full font-['IBM_Plex_Sans'] text-[14px] font-bold transition-colors shadow-lg \${lv === l ? 'bg-[#312e81] border border-[#7c5cff] text-white' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0] hover:bg-[#1f1736]'}\`}>
                  LV{l}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* MAIN STAGE */}
        <div className="absolute inset-0 z-20 pointer-events-none pt-[120px] pb-[100px] flex items-center justify-center">
          <div className="w-full h-full max-w-[2400px] mx-auto relative px-8 md:px-16 2xl:px-24">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full pointer-events-auto"
              >
                {React.createElement(currentSlide.comp, { lens, lv })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM BAR (z-30) */}
        <footer className="absolute bottom-0 left-0 w-full pb-8 pt-4 flex items-center justify-between px-8 md:px-16 z-30 pointer-events-none">
          <button onClick={() => setSlideIdx(s => Math.max(0, s - 1))} className="w-[56px] h-[56px] flex items-center justify-center bg-[#120e1c]/80 border border-[#2a2150] backdrop-blur-sm text-[#e2e8f0] pointer-events-auto hover:bg-[#312e81] hover:border-[#7c5cff] rounded-full transition-colors shadow-lg">
            <ChevronLeft size={32} />
          </button>
          <div className="text-[16px] md:text-[18px] text-[#94a3b8] font-['IBM_Plex_Sans'] uppercase tracking-widest bg-[#07060c]/50 px-6 py-2 rounded-full backdrop-blur-sm">
            {currentSlide.title}
          </div>
          <button onClick={() => setSlideIdx(s => Math.min(activeSlides.length - 1, s + 1))} className="w-[56px] h-[56px] flex items-center justify-center bg-[#120e1c]/80 border border-[#2a2150] backdrop-blur-sm text-[#e2e8f0] pointer-events-auto hover:bg-[#312e81] hover:border-[#7c5cff] rounded-full transition-colors shadow-lg">
            <ChevronRight size={32} />
          </button>
        </footer>

        {/* PASTE DOCK */}
        <PasteDock lens={lens} lv={lv} />
      </div>
    </div>
  );
}
`);

// ------------------------------------------------------------------
// GlassPane.tsx (3D Animation)
// ------------------------------------------------------------------
write('src/components/GlassPane.tsx', `
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function GlassPane({ lens }: { lens: 'A' | 'B' }) {
  const isA = lens === 'A';
  
  const paneVariants = {
    enter: { 
      y: '-100vh',
      rotateX: 60,
      rotateY: 15,
      rotateZ: -10,
      scale: 1.2,
      opacity: 0
    },
    animate: { 
      y: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 18,
        mass: 1.5
      }
    },
    exit: { 
      y: '100vh',
      rotateX: -60,
      rotateY: -15,
      rotateZ: 10,
      scale: 1.2,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ perspective: '2000px' }}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={lens}
          variants={paneVariants}
          initial="enter"
          animate="animate"
          exit="exit"
          className="absolute inset-[-20%] w-[140%] h-[140%] border-l-2 border-t-2"
          style={{
            backgroundColor: isA ? 'rgba(45,212,191,0.12)' : 'rgba(245,185,66,0.12)',
            borderColor: isA ? 'rgba(45,212,191,0.3)' : 'rgba(245,185,66,0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transformOrigin: 'center center',
            boxShadow: \`inset 0 0 150px \${isA ? 'rgba(45,212,191,0.2)' : 'rgba(245,185,66,0.2)'}\`
          }}
        >
          <div className="absolute top-[20%] left-[20%] text-[24px] 2xl:text-[32px] font-mono tracking-[0.3em] font-bold opacity-80 mix-blend-plus-lighter" style={{ color: isA ? '#2dd4bf' : '#f5b942' }}>
            {isA ? 'LENS A · MARKER' : 'LENS B · CLASS'}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
`);

// ------------------------------------------------------------------
// DynamicCopy.tsx (Bigger text, remove DoNotSay)
// ------------------------------------------------------------------
write('src/components/DynamicCopy.tsx', `
import React from 'react';

export function DynamicCopy({ title, lens, lv, copy, why }: any) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[95%]">
      <h2 className="font-['Playfair_Display'] font-light text-[#f8fafc] text-[3.5rem] 2xl:text-[4.5rem] drop-shadow-[0_0_18px_rgba(124,92,255,0.35)] leading-[1.1]">
        {title}
      </h2>
      
      <div className="text-[1.25rem] 2xl:text-[1.5rem] leading-[1.6] text-[#cbd5e1] space-y-6">
        <p>{copy[lens][1]}</p>
        {lv >= 2 && copy[lens][2] && <p>{copy[lens][2]}</p>}
      </div>
      
      {lv === 3 && why && why[lens] && (
        <div className="mt-8 bg-[#120e1c]/80 backdrop-blur-md border border-t-4 p-8 rounded-2xl flex flex-col gap-4 shadow-2xl" style={{ borderColor: lens === 'A' ? '#2dd4bf' : '#f5b942' }}>
          <span className="font-bold text-[0.9rem] 2xl:text-[1rem] tracking-[0.15em] uppercase" style={{ color: lens === 'A' ? '#2dd4bf' : '#f5b942' }}>
            WHY THIS CHART
          </span>
          <span className="text-[1.1rem] 2xl:text-[1.25rem] leading-relaxed text-[#e2e8f0]">
            {why[lens]}
          </span>
        </div>
      )}
    </div>
  );
}
`);

// ------------------------------------------------------------------
// Slides (Update paddings & remove doNotSay data)
// ------------------------------------------------------------------
write('src/slides/Slide0.tsx', `
import React from 'react';

export function Slide0({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center">
      <div className="col-span-12 flex flex-col items-center text-center -mt-12">
        <h1 className="font-['Playfair_Display'] font-light text-[5rem] md:text-[6rem] 2xl:text-[7rem] text-[#f8fafc] drop-shadow-[0_0_24px_rgba(124,92,255,0.4)] leading-[1.1] mb-6">
          Age is a calendar.
        </h1>
        <div className="text-[2rem] md:text-[2.5rem] 2xl:text-[3rem] text-[#94a3b8] font-light mb-20 leading-tight">
          This file is how hard an organ was reading a recipe.
        </div>
        
        <div className="text-[1.25rem] md:text-[1.5rem] text-[#e2e8f0] font-medium tracking-wide mb-4">
          Manav M. Parikh &nbsp;&middot;&nbsp; G. Sai Krishna
        </div>
        <div className="text-[1rem] md:text-[1.1rem] text-[#64748b] tracking-wider font-mono mb-16">
          GEO GSE66712 &nbsp;&middot;&nbsp; 23,564 genes × 185 samples &nbsp;&middot;&nbsp; Table S1 45 deaths
        </div>

        <div className="text-[1.25rem] md:text-[1.5rem] text-[#cbd5e1] max-w-4xl mx-auto leading-relaxed min-h-[80px]">
          {lens === 'B' && lv >= 2 && <p>We counted photocopies of gene recipes in killifish organs.</p>}
          {lens === 'B' && lv === 3 && <p className="mt-4 text-[#94a3b8]">You will see five bars, then whether liver, skin and fin agree, then how long 45 fish lived.</p>}
          
          {lens === 'A' && lv >= 2 && <p>Cross-sectional livers (JM) are not the longitudinal fins (LS).</p>}
          {lens === 'A' && lv === 3 && <p className="mt-4 text-[#94a3b8]">RPKM matrix + S1 are two files. We do not merge LS IDs to animal #.</p>}
        </div>
      </div>
    </div>
  );
}
`);

write('src/slides/Slide1.tsx', `
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
`);

write('src/slides/Slide2.tsx', `
import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ErrorBar, ComposedChart, Line } from 'recharts';
import { WEEKS, COX_MEAN, COX_SD, COX_RAW, CHART_DEFAULTS, COLORS } from '../data';

export function Slide2({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Highest at 5 weeks. Not a slide down every step.",
      2: "cox4i1 is one piece of the last energy pump. Average 553 → 409 → 422 → 465 → 450. The drop is 5 to 12, then it sits."
    },
    A: {
      1: "n=5 per bar. Cross-sectional.",
      2: "Week-20 raw values already overlap week-5. Mean 553 vs 450 is −19%, not a switch."
    }
  };
  const why = {
    B: "Bar compares five age groups. Weeks are categories, not one fish’s diary.",
    A: "Strip exists because a bar hides overlap."
  };

  const barData = WEEKS.map((w, i) => ({
    name: \`\${w} wk\`,
    mean: COX_MEAN[i],
    error: [COX_SD[i], COX_SD[i]]
  }));

  const scatterData: any[] = [];
  WEEKS.forEach((w, i) => {
    COX_RAW[w as keyof typeof COX_RAW].forEach(val => {
      scatterData.push({ x: i + 1 + (Math.random()-0.5)*0.24, y: val, week: \`\${w} wk\` });
    });
  });

  const meanLineData = WEEKS.map((w, i) => ({
    x: i + 1,
    mean: COX_MEAN[i],
    error: [COX_SD[i], COX_SD[i]]
  }));

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="cox4i1" lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex gap-8 h-full min-h-[500px]">
        {/* CHART 1: BAR */}
        <div className={\`chart-card flex flex-col \${lens === 'A' ? 'w-1/2' : 'w-full'}\`}>
          <div className="text-[1.1rem] 2xl:text-[1.25rem] text-white font-medium mb-6 text-center font-sans tracking-wide">cox4i1 in liver — mean of 5 fish.</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <XAxis dataKey="name" stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis domain={[0, 750]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} />
              <Bar dataKey="mean" fill={COLORS.coxBar} isAnimationActive={false}>
                <ErrorBar dataKey="error" width={10} strokeWidth={3} stroke="#f8fafc" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CHART 2: SCATTER (LENS A ONLY) */}
        {lens === 'A' && (
          <div className="chart-card w-1/2 flex flex-col">
            <div className="text-[1.1rem] 2xl:text-[1.25rem] text-white font-medium mb-6 text-center font-sans tracking-wide">each dot = one liver.</div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
                <XAxis type="number" dataKey="x" domain={[0.5, 5.5]} ticks={[1,2,3,4,5]} tickFormatter={(v) => \`\${WEEKS[v-1]} wk\`} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis type="number" domain={[0, 850]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} />
                <Scatter data={scatterData} dataKey="y" fill={COLORS.dot} isAnimationActive={false} />
                <Line data={meanLineData} type="monotone" dataKey="mean" stroke="#f8fafc" strokeWidth={3} dot={false} isAnimationActive={false}>
                  <ErrorBar dataKey="error" width={10} strokeWidth={3} stroke="#f8fafc" />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
`);

write('src/slides/Slide2b.tsx', `
import React from 'react';
import { MEANS_LIVER } from '../data';

export function Slide2b() {
  const genes = Object.keys(MEANS_LIVER) as (keyof typeof MEANS_LIVER)[];
  
  const heatmapData = genes.map(g => {
    const row = MEANS_LIVER[g];
    const mean = row.reduce((a,b)=>a+b,0)/5;
    const sd = Math.sqrt(row.reduce((a,b)=>a+Math.pow(b-mean,2),0)/4) || 1;
    return {
      gene: g,
      z: row.map(v => (v - mean) / sd)
    };
  });

  const getRdBu = (z: number) => {
    const val = Math.max(-2.2, Math.min(2.2, z));
    if (val > 0) return \`rgba(159, 18, 57, \${(val/2.2)*0.8 + 0.2})\`; 
    return \`rgba(30, 58, 138, \${(Math.abs(val)/2.2)*0.8 + 0.2})\`; 
  };

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center">
      <div className="col-span-12 flex flex-col justify-center items-center">
        <div className="chart-card w-full max-w-[1200px] h-[65vh] flex flex-col p-8">
          <div className="text-[1.25rem] 2xl:text-[1.5rem] text-white font-medium mb-8 text-center font-sans tracking-wide">
            week means, n=5, z within gene — not 25 raw cells.
          </div>
          <div className="flex-grow flex flex-col justify-center gap-2">
            <div className="flex text-[1rem] 2xl:text-[1.25rem] font-mono text-[#94a3b8] mb-4 font-bold">
              <div className="w-48"></div>
              {['5wk','12wk','20wk','27wk','39wk'].map(w => (
                <div key={w} className="flex-1 text-center">{w}</div>
              ))}
            </div>
            {heatmapData.map(row => (
              <div key={row.gene} className="flex flex-1 items-center gap-2 min-h-[36px]">
                <div className="w-48 text-right pr-6 text-[1.1rem] 2xl:text-[1.25rem] font-mono text-[#cbd5e1]">{row.gene}</div>
                {row.z.map((zval, i) => (
                  <div key={i} className="flex-1 h-full rounded-sm transition-transform hover:scale-[1.02]" style={{ backgroundColor: getRdBu(zval) }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`);

write('src/slides/Slide3.tsx', `
import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { COUNTS, CHART_DEFAULTS } from '../data';

export function Slide3({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Most recipes did not flip.",
      2: "We did not draw 23,564 lines. We counted. Skin has more genes going down than liver."
    },
    A: {
      1: "2× on means of 5 vs 5. Expressed = mean ≥ 1 either week.",
      2: "Liver 894 / 763. Skin 1035 / 3058. Designs are both cross-sectional JM."
    }
  };
  const why = {
    B: "A count bar uses every row. That is how a 23k file becomes one slide.",
    A: "Satisfies the 500-row rule without a spaghetti plot."
  };

  const chartData = COUNTS.labels.map((lbl, i) => ({
    name: lbl,
    liver: COUNTS.liver[i],
    skin: COUNTS.skin[i]
  }));

  const hideChart = lens === 'B' && lv === 1;

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="Out of 23,564 genes." lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex items-center justify-center h-full min-h-[500px]">
        {hideChart ? (
          <div className="flex flex-col items-center gap-16 text-center w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-8">
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">894</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">up</span></div>
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">763</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">down</span></div>
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">11,784</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">similar</span></div>
              <div className="flex flex-col"><span className="text-[5rem] xl:text-[6rem] font-bold text-white leading-none">10,123</span><span className="text-[#94a3b8] text-[1.5rem] mt-4">off</span></div>
            </div>
            <div className="text-[1.5rem] text-[#64748b] font-mono tracking-widest bg-[#120e1c]/50 px-8 py-3 rounded-full border border-white/5">liver, week 5 vs 39.</div>
          </div>
        ) : (
          <div className="chart-card w-full h-[60vh] flex flex-col p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 30, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
                <XAxis dataKey="name" stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 16 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} />
                <Legend wrapperStyle={{ paddingTop: '30px', fontSize: '16px' }} iconType="rect" />
                <Bar dataKey="liver" name="Liver" fill="#60a5fa" isAnimationActive={false}>
                  <LabelList dataKey="liver" position="top" fill="#e2e8f0" fontSize={14} fontWeight="bold" />
                </Bar>
                <Bar dataKey="skin" name="Skin" fill="#f59e0b" isAnimationActive={false}>
                  <LabelList dataKey="skin" position="top" fill="#e2e8f0" fontSize={14} fontWeight="bold" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
`);

write('src/slides/Slide4.tsx', `
import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ORGAN_PCT, CHART_DEFAULTS, COLORS } from '../data';

export function Slide4({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Same recipe. Three rooms. They do not agree.",
      2: "Liver turned cox4i1 a bit down. Skin turned cousins of that gene up. Fin barely moved — except pigment gene tyr."
    },
    A: {
      1: "Three designs, one picture — labeled.",
      2: "ndufs7 liver −13% vs skin +70%. Do not average those."
    }
  };
  const why = {
    B: "Grouped bars keep organs as separate series. One axis mix would be a lie.",
    A: "This chart is the result. Everything else supports it."
  };

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="Organs Disagree" lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex items-center h-full min-h-[500px]">
        <div className="chart-card w-full h-[60vh] flex flex-col relative p-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ORGAN_PCT} margin={{ top: 20, right: 10, left: -20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <ReferenceLine y={0} stroke="#f8fafc" strokeWidth={2} />
              <XAxis dataKey="g" stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 16 }} axisLine={false} tickLine={false} dy={15} />
              <YAxis domain={[-80, 160]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 14 }} axisLine={false} tickLine={false} />
              
              <Bar dataKey="L" name="Liver" fill={COLORS.liverBar} isAnimationActive={false} />
              <Bar dataKey="S" name="Skin" fill={COLORS.skinBar} isAnimationActive={false} />
              <Bar dataKey="F" name="Fin" fill={COLORS.finBar} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
          <div className="absolute bottom-4 left-0 w-full text-center text-[12px] 2xl:text-[14px] text-[#94a3b8] font-mono tracking-wide px-8">
            Fin is week 10→20 on the SAME 45 fish. Liver/skin are week 5→39 on OTHER fish. tyr in liver is ~0.1 RPKM both ends — wrong organ.
          </div>
        </div>
      </div>
    </div>
  );
}
`);

write('src/slides/Slide5.tsx', `
import React from 'react';
import { DynamicCopy } from '../components/DynamicCopy';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DEATH_WEEKS_45, CHART_DEFAULTS } from '../data';

export function Slide5({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  const copy = {
    B: {
      1: "Same lab, same food. Life was 29 to 72 weeks.",
      2: "These 45 also gave a fin clip at week 10 and 20, then lived. The liver charts were other animals."
    },
    A: {
      1: "Table S1. Second file.",
      2: "animal # ≠ LS1…LS45. Do not join."
    }
  };
  const why = {
    B: "Strip of deaths. Not a survival curve. We did not model censoring.",
    A: "RNA week ≠ days alive."
  };

  const scatterData = DEATH_WEEKS_45.map(w => ({ x: w, y: (Math.random()-0.5)*0.5 }));

  return (
    <div className="grid grid-cols-12 gap-12 w-full h-full items-center">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="Lifespan" lens={lens} lv={lv} copy={copy} why={why} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex items-center h-full min-h-[400px]">
        <div className="chart-card w-full h-[50vh] flex flex-col relative p-8">
          <div className="text-[1.25rem] 2xl:text-[1.5rem] text-white font-medium mb-8 text-center font-sans tracking-wide">age at death, weeks.</div>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <XAxis type="number" dataKey="x" domain={[20, 80]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 16 }} axisLine={false} tickLine={false} dy={15} />
              <YAxis type="number" dataKey="y" hide domain={[-1, 1]} />
              
              <ReferenceLine x={28.71} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={2} />
              <ReferenceLine x={49.00} stroke="#f8fafc" strokeDasharray="4 4" strokeWidth={2} />
              <ReferenceLine x={71.86} stroke="#34d399" strokeDasharray="4 4" strokeWidth={2} />
              
              <Scatter data={scatterData} fill="#60a5fa" isAnimationActive={false} />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="absolute bottom-6 left-0 w-full flex justify-center gap-12 text-[1rem] 2xl:text-[1.1rem] text-[#e2e8f0] font-mono tracking-widest bg-[#07060c]/60 py-2 rounded-full mx-auto max-w-2xl border border-white/5">
            <span><span className="text-[#f59e0b] font-bold">min 29 wk</span></span>
            <span><span className="text-[#f8fafc] font-bold">median 49 wk</span></span>
            <span><span className="text-[#34d399] font-bold">max 72 wk</span></span>
            <span>n=45</span>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

write('src/slides/Slide6.tsx', `
import React from 'react';

export function Slide6({ lv }: { lv: 1|2|3 }) {
  const items = [
    "Findings establish correlation over the 72-week lifespan, not single-gene causality.",
    "The +15% lifespan extension in Baumgart 2016 was a rotenone intervention, distinct from our baseline counts.",
    "Phenotypic fading (e.g., color loss) was observed but not formally scored in this matrix.",
    "Transcriptomic profiles (JM/LS) and lifespan records (S1) are parallel datasets; individual sample IDs are not merged.",
    "Week-39 livers and Week-5 livers represent separate cross-sectional cohorts, not a longitudinal tracking of the same organism."
  ];

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center">
      <div className="col-span-12 flex flex-col items-center text-center">
        <h2 className="font-['Playfair_Display'] text-[4rem] md:text-[5rem] text-[#ccfbf1] mb-16 tracking-wide drop-shadow-md">
          Key Distinctions
        </h2>
        <div className="flex flex-col gap-6 w-full max-w-5xl text-left">
          {items.map((item, i) => (
            <div key={i} className="chart-card bg-[#134e4a]/10 border-[#14b8a6]/30 text-[1.25rem] 2xl:text-[1.5rem] text-[#e2e8f0] flex gap-6 items-center p-6 shadow-xl">
              <span className="text-[#14b8a6] font-mono opacity-80 text-[1.1em] font-bold">0{i+1}</span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
        
        {lv === 3 && (
          <div className="mt-16 text-[1.1rem] 2xl:text-[1.25rem] text-[#94a3b8] font-mono w-full max-w-5xl text-left bg-[#120e1c]/80 p-8 rounded-2xl border border-[#2a2150] space-y-3 backdrop-blur-sm shadow-2xl">
            <div><span className="text-white font-bold">Bar =</span> groups. <span className="text-white font-bold">Strip =</span> the five fish.</div>
            <div><span className="text-white font-bold">Heatmap =</span> genes × weeks. <span className="text-white font-bold">Count =</span> 23,564 rows. <span className="text-white font-bold">Lifespan =</span> S1 only.</div>
            <div className="text-[#f43f5e] mt-4 pt-4 border-t border-[#2a2150] tracking-wide">Forbidden: pie, 3D, RNA+days dual axis, unlabeled liver+fin.</div>
          </div>
        )}
      </div>
    </div>
  );
}
`);

write('src/slides/Slide7.tsx', `
import React from 'react';

export function Slide7() {
  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center text-center">
      <div className="col-span-12 flex flex-col justify-center items-center">
        <h1 className="font-['Playfair_Display'] font-light text-[5rem] md:text-[6rem] 2xl:text-[8rem] text-[#f8fafc] mb-12 drop-shadow-[0_0_24px_rgba(124,92,255,0.4)]">
          Aging is real. It is not simple.
        </h1>
        <div className="text-[2rem] md:text-[2.5rem] 2xl:text-[3rem] text-[#cbd5e1] font-light mb-6 leading-tight">
          Most genes stay in the same ballpark.
        </div>
        <div className="text-[2.5rem] md:text-[3rem] 2xl:text-[3.5rem] text-white font-medium mb-24 leading-tight">
          The part that changes depends on which room you look in.
        </div>
        <div className="text-[1.1rem] 2xl:text-[1.25rem] text-[#64748b] tracking-widest font-mono">
          GSE66712 &nbsp;&middot;&nbsp; S1 &nbsp;&middot;&nbsp; Atria Year 1
        </div>
      </div>
    </div>
  );
}
`);
