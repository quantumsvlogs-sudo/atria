const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n');
}

// ------------------------------------------------------------------
// 1. CSS & Setup
// ------------------------------------------------------------------
write('src/index.css', `
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Playfair+Display:wght@300;400;600&display=swap');

body {
  margin: 0;
  overflow: hidden;
  background-color: #07060c;
  color: #cbd5e1;
}

@keyframes drift {
  from { transform: translate(0, 0); }
  to { transform: translate(22px, 22px); }
}

.blob-a {
  animation: drift 18s ease-in-out infinite alternate;
}
.blob-b {
  animation: drift 26s ease-in-out infinite alternate-reverse;
}

.chart-card {
  background-color: #120e1c;
  border: 1px solid #2a2150;
  border-radius: 8px;
  padding: 16px;
}
`);

write('src/main.tsx', `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`);

// ------------------------------------------------------------------
// 2. Data
// ------------------------------------------------------------------
write('src/data.ts', `
export const WEEKS = [5,12,20,27,39];

export const COX_MEAN = [553.3, 408.8, 421.5, 465.0, 449.7];
export const COX_SD   = [112.5,  72.4, 131.5, 103.8,  54.1];
export const COX_RAW = {
  5:  [745.13,478.57,496.00,483.71,563.17],
  12: [421.82,400.35,361.69,523.85,336.17],
  20: [649.14,322.87,341.05,396.73,397.92],
  27: [430.38,526.60,595.32,452.22,320.31],
  39: [513.68,396.67,448.72,396.00,493.40]
};

export const MEANS_LIVER = {
  cox4i1:[553.32,408.78,421.54,464.97,449.69],
  ndufs7:[46.50,37.93,41.29,41.39,40.69],
  ndufs5:[90.56,85.83,79.94,99.18,100.05],
  ndufa4:[51.50,54.66,59.36,68.78,69.86],
  nrf1:  [1.46,0.94,2.45,1.67,1.88],
  sod1:  [294.67,189.97,193.09,234.44,209.70],
  sod2:  [26.26,30.88,20.01,24.67,20.21],
  cat:   [143.09,112.24,120.10,126.08,102.14],
  tyr:   [0.10,0.03,2.83,3.92,0.04],
  apoa1a:[52331.6,58512.3,39435.0,49444.0,38243.6]
};

export const ORGAN_PCT = [
  {g:"cox4i1", L:-18.7, S:12.3,  F:-2.8},
  {g:"ndufs7", L:-12.5, S:69.7,  F:-0.8},
  {g:"ndufs5", L:10.5,  S:136.7, F:0.4},
  {g:"ndufa4", L:35.7,  S:132.0, F:5.1},
  {g:"sod1",   L:-28.8, S:86.8,  F:-10.4},
  {g:"cat",    L:-28.6, S:4.9,   F:-2.5},
  {g:"tyr",    L:-60.0, S:-53.4, F:-43.4},
  {g:"apoa1a", L:-26.9, S:-16.5, F:-16.7}
];

export const COUNTS = {
  labels: ["≥2× up","≥2× down","on, similar","off / silent"],
  liver:  [894,763,11784,10123],
  skin:   [1035,3058,11210,8261]
};

export const DEATH_WEEKS_45 = [28.71,29.14,30.57,30.57,31.57,32.00,32.43,32.57,33.71,33.86,33.86,34.14,35.00,35.00,36.43,45.14,45.43,46.86,46.86,47.86,48.00,48.71,48.86,49.00,49.43,49.71,49.86,50.00,50.29,50.29,57.29,58.00,58.71,58.71,59.14,59.29,61.57,61.86,63.43,63.43,65.43,66.14,69.86,70.43,71.86];

export const COLORS = {
  liverBar: '#60a5fa',
  skinBar:  '#f59e0b',
  finBar:   '#34d399',
  coxBar:   '#8b5cf6',
  dot:      '#60a5fa',
  heatNeg:  '#1e3a8a',
  heatMid:  '#f8fafc',
  heatPos:  '#9f1239'
};

export const CHART_DEFAULTS = {
  color: '#e2e8f0',
  grid: '#1e1b2e',
  tick: '#94a3b8'
};
`);

// ------------------------------------------------------------------
// 3. Main App Components
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
  { id: 's6', comp: Slide6, title: 'DO NOT SAY' },
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

  // Scaler
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleResize = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide transition variants
  const slideVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.18 } }
  };

  return (
    <div className="fixed inset-0 bg-[#07060c] flex items-center justify-center overflow-hidden font-['IBM_Plex_Sans'] text-[#cbd5e1]">
      <div 
        style={{ width: 1920, height: 1080, transform: \`scale(\${scale})\`, transformOrigin: 'center' }} 
        className="relative shrink-0 overflow-hidden"
      >
        {/* BLOBS */}
        <div className="blob-a absolute w-[42vw] h-[42vw] rounded-full bg-[#4c1d95] top-0 left-0 -translate-x-1/4 -translate-y-1/4 mix-blend-screen opacity-[0.35] blur-[100px] pointer-events-none z-0" />
        <div className="blob-b absolute w-[36vw] h-[36vw] rounded-full bg-[#1e3a8a] bottom-0 right-0 translate-x-1/4 translate-y-1/4 mix-blend-screen opacity-[0.30] blur-[100px] pointer-events-none z-0" />

        {/* GLASS PANE */}
        <GlassPane lens={lens} />

        {/* MAIN STAGE */}
        <div className="absolute inset-0 z-20 pointer-events-none">
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

        {/* TOP BAR (z-30) */}
        <header className="absolute top-0 left-0 w-full h-[64px] flex items-center justify-between px-8 z-30 pointer-events-none">
          <div className="w-[300px] font-mono text-[12px] tracking-[0.18em] text-[#94a3b8] uppercase">
            GSE66712
          </div>
          <div className="font-mono text-[14px] text-[#e2e8f0]">
            {String(slideIdx + 1).padStart(2, '0')} / {String(activeSlides.length).padStart(2, '0')}
          </div>
          <div className="w-[300px] flex items-center justify-end gap-4 pointer-events-auto">
            {/* LENS PILLS */}
            <div className="flex gap-2">
              <button onClick={() => { setLens('A'); setSlideIdx(0); }} className={\`w-[108px] h-[36px] rounded-full font-['IBM_Plex_Sans'] text-[12px] font-bold transition-colors \${lens === 'A' ? 'bg-[#134e4a] border border-[#2dd4bf] text-[#ccfbf1]' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0]'}\`}>
                LENS A
              </button>
              <button onClick={() => { setLens('B'); setSlideIdx(0); }} className={\`w-[108px] h-[36px] rounded-full font-['IBM_Plex_Sans'] text-[12px] font-bold transition-colors \${lens === 'B' ? 'bg-[#78350f] border border-[#f5b942] text-[#fef3c7]' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0]'}\`}>
                LENS B
              </button>
            </div>
            {/* LV PILLS */}
            <div className="flex gap-1">
              {[1, 2, 3].map((l) => (
                <button key={l} onClick={() => setLv(l as 1|2|3)} className={\`w-[52px] h-[36px] rounded-full font-['IBM_Plex_Sans'] text-[12px] font-bold transition-colors \${lv === l ? 'bg-[#312e81] border border-[#7c5cff] text-white' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0]'}\`}>
                  LV{l}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* BOTTOM BAR (z-30) */}
        <footer className="absolute bottom-0 left-0 w-full h-[48px] flex items-center justify-between px-8 z-30 pointer-events-none">
          <button onClick={() => setSlideIdx(s => Math.max(0, s - 1))} className="w-[40px] h-[40px] flex items-center justify-center text-[#e2e8f0] pointer-events-auto hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div className="text-[13px] text-[#94a3b8] font-['IBM_Plex_Sans'] uppercase tracking-widest">
            {currentSlide.title}
          </div>
          <button onClick={() => setSlideIdx(s => Math.min(activeSlides.length - 1, s + 1))} className="w-[40px] h-[40px] flex items-center justify-center text-[#e2e8f0] pointer-events-auto hover:bg-white/5 rounded-full transition-colors">
            <ChevronRight size={24} />
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
// 4. Shared Components
// ------------------------------------------------------------------
write('src/components/GlassPane.tsx', `
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function GlassPane({ lens }: { lens: 'A' | 'B' }) {
  const isA = lens === 'A';
  
  const paneVariants = {
    enter: { 
      x: '-100%',
      transition: { duration: 0 } // initial state
    },
    animate: { 
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1.2] }
    },
    exit: { 
      x: '100%',
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={lens}
          variants={paneVariants}
          initial="enter"
          animate="animate"
          exit="exit"
          className="absolute inset-0 border-l border-[rgba(255,255,255,0.22)]"
          style={{
            backgroundColor: isA ? 'rgba(45,212,191,0.14)' : 'rgba(245,185,66,0.14)',
            backdropFilter: 'blur(7px)',
            WebkitBackdropFilter: 'blur(7px)'
          }}
        >
          <div className="absolute top-[24px] left-[24px] text-[13px] font-mono tracking-[0.2em] font-bold opacity-80" style={{ color: isA ? '#2dd4bf' : '#f5b942' }}>
            {isA ? 'LENS A · MARKER' : 'LENS B · CLASS'}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
`);

write('src/components/PasteDock.tsx', `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

export function PasteDock({ lens, lv }: { lens: 'A' | 'B'; lv: number }) {
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('killifish_extras');
    if (saved) {
      try { setImages(JSON.parse(saved)); } catch(e){}
    }
  }, []);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      for (const item of e.clipboardData.items) {
        if (item.type.indexOf('image') === 0) {
          const blob = item.getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              const res = ev.target?.result as string;
              if (res) {
                const updated = [...images, res];
                setImages(updated);
                localStorage.setItem('killifish_extras', JSON.stringify(updated));
                setOpen(true);
              }
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [images]);

  if (lens !== 'A' || lv !== 3) return null;

  return (
    <div className="absolute bottom-12 left-8 z-50 pointer-events-auto">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#120e1c] border border-[#2a2150] px-4 py-2 rounded-full text-[13px] font-bold hover:bg-[#1a1429] transition-colors"
      >
        <Plus size={16} /> EXTRAS
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 mb-4 w-[360px] bg-[#120e1c] border border-[#2a2150] p-4 rounded-xl shadow-2xl origin-bottom-left"
          >
            <h4 className="text-[12px] font-mono text-[#94a3b8] mb-3 uppercase">speaker extra — not coded evidence</h4>
            <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
              {images.length === 0 && <div className="col-span-2 text-center py-8 text-[#64748b] text-sm">Paste images (Ctrl+V)</div>}
              {images.map((img, i) => (
                <div key={i} className="relative group rounded bg-black/50 overflow-hidden border border-[#2a2150]">
                  <img src={img} alt="extra" className="w-full h-auto" />
                  <button onClick={() => {
                    const next = images.filter((_, idx) => idx !== i);
                    setImages(next);
                    localStorage.setItem('killifish_extras', JSON.stringify(next));
                  }} className="absolute top-1 right-1 bg-red-900/80 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px]">X</button>
                </div>
              ))}
            </div>
            <div className="mt-3 relative">
              <input type="file" accept="image/*" multiple onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                Array.from(files).forEach(blob => {
                  const r = new FileReader();
                  r.onload = (ev) => {
                    if (ev.target?.result) {
                      setImages(prev => {
                        const next = [...prev, ev.target!.result as string];
                        localStorage.setItem('killifish_extras', JSON.stringify(next));
                        return next;
                      });
                    }
                  }
                  r.readAsDataURL(blob);
                });
              }} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="bg-[#1a1429] text-center py-2 rounded text-xs text-[#94a3b8] border border-dashed border-[#2a2150]">Click to upload or Paste</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`);

write('src/components/DynamicCopy.tsx', `
import React from 'react';

export function DynamicCopy({ title, lens, lv, copy, why, doNotSay }: any) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-['Playfair_Display'] font-light text-[#f8fafc] text-[48px] drop-shadow-[0_0_18px_rgba(124,92,255,0.35)] leading-tight">
        {title}
      </h2>
      
      <div className="text-[15px] leading-relaxed text-[#cbd5e1] space-y-4 max-w-[90%]">
        <p>{copy[lens][1]}</p>
        {lv >= 2 && copy[lens][2] && <p>{copy[lens][2]}</p>}
      </div>
      
      {lv === 3 && (
        <div className="mt-6 flex flex-col gap-3 max-w-[90%]">
          {why && why[lens] && (
            <div className="text-[14px] bg-[#120e1c] border p-4 rounded-lg flex items-start gap-3 shadow-lg" style={{ borderColor: lens === 'A' ? '#2dd4bf' : '#f5b942' }}>
              <span className="font-bold whitespace-nowrap text-[12px] mt-[3px]" style={{ color: lens === 'A' ? '#2dd4bf' : '#f5b942' }}>WHY THIS CHART:</span>
              <span className="leading-relaxed">{why[lens]}</span>
            </div>
          )}
          {doNotSay && doNotSay[lens] && (
            <div className="text-[14px] bg-[#2a0e12] border border-[#9f1239] text-[#f8fafc] p-4 rounded-lg flex items-start gap-3 shadow-lg opacity-90">
              <span className="font-bold text-[#f43f5e] whitespace-nowrap text-[12px] mt-[3px]">DO NOT SAY:</span>
              <span className="leading-relaxed">{doNotSay[lens]}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
`);

// ------------------------------------------------------------------
// 5. Slides
// ------------------------------------------------------------------
write('src/slides/Slide0.tsx', `
import React from 'react';

export function Slide0({ lens, lv }: { lens: 'A'|'B', lv: 1|2|3 }) {
  return (
    <div className="grid grid-cols-12 gap-6 w-full h-full pt-[72px] pb-[72px] px-[72px] items-start">
      <div className="col-span-12 flex flex-col items-center text-center mt-[20vh]">
        <h1 className="font-['Playfair_Display'] font-light text-[64px] text-[#f8fafc] drop-shadow-[0_0_18px_rgba(124,92,255,0.35)] leading-tight mb-2">
          Age is a calendar.
        </h1>
        <div className="text-[28px] text-[#94a3b8] font-light mb-16">
          This file is how hard an organ was reading a recipe.
        </div>
        
        <div className="text-[16px] text-[#e2e8f0] font-medium tracking-wide mb-3">
          Manav M. Parikh &nbsp;&middot;&nbsp; G. Sai Krishna
        </div>
        <div className="text-[13px] text-[#64748b] tracking-wider mb-12">
          GEO GSE66712 &nbsp;&middot;&nbsp; 23,564 genes × 185 samples &nbsp;&middot;&nbsp; Table S1 45 deaths
        </div>

        <div className="text-[15px] text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed h-[60px]">
          {lens === 'B' && lv >= 2 && <p>We counted photocopies of gene recipes in killifish organs.</p>}
          {lens === 'B' && lv === 3 && <p className="mt-2 text-[#94a3b8]">You will see five bars, then whether liver, skin and fin agree, then how long 45 fish lived.</p>}
          
          {lens === 'A' && lv >= 2 && <p>Cross-sectional livers (JM) are not the longitudinal fins (LS).</p>}
          {lens === 'A' && lv === 3 && <p className="mt-2 text-[#94a3b8]">RPKM matrix + S1 are two files. We do not merge LS IDs to animal #.</p>}
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
  const doNotSay = {
    B: "RPKM is how many times the DNA repeats.",
    A: "All 185 columns are the same fish over time."
  };

  return (
    <div className="grid grid-cols-12 gap-6 w-full h-full pt-[72px] pb-[72px] px-[72px]">
      <div className="col-span-5 flex flex-col justify-center">
        <DynamicCopy title="What one number is" lens={lens} lv={lv} copy={copy} why={why} doNotSay={doNotSay} />
      </div>
      <div className="col-span-7 flex items-center justify-center relative">
        {/* Fake-not-fake SVG Diagram */}
        <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(100, 50)">
            {/* LIVER */}
            <rect x="0" y="0" width="160" height="220" rx="8" fill="#120e1c" stroke="#2a2150" strokeWidth="2"/>
            <text x="80" y="30" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'JM*_3 (LIVER)' : 'LIVER'}</text>
            <rect x="50" y="60" width="60" height="70" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
            <line x1="60" y1="75" x2="100" y2="75" stroke="#e2e8f0" strokeWidth="2"/>
            <line x1="60" y1="90" x2="90" y2="90" stroke="#e2e8f0" strokeWidth="2"/>
            <text x="80" y="150" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'same genome' : 'Recipe book'}</text>

            {/* SKIN */}
            <rect x="200" y="50" width="160" height="220" rx="8" fill="#120e1c" stroke="#2a2150" strokeWidth="2"/>
            <text x="280" y="80" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'JM*_5 (SKIN)' : 'SKIN'}</text>
            <rect x="250" y="110" width="60" height="70" rx="4" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
            <line x1="260" y1="125" x2="300" y2="125" stroke="#e2e8f0" strokeWidth="2"/>
            <line x1="260" y1="140" x2="290" y2="140" stroke="#e2e8f0" strokeWidth="2"/>
            <text x="280" y="200" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'same genome' : 'Recipe book'}</text>

            {/* Photocopy flying out of Liver */}
            <g className="animate-[drift_2s_ease-in-out_infinite_alternate]">
              <rect x="110" y="160" width="40" height="50" fill="#e2e8f0" opacity="0.9" rx="2"/>
              <line x1="115" y1="170" x2="145" y2="170" stroke="#07060c" strokeWidth="2"/>
              <line x1="115" y1="180" x2="135" y2="180" stroke="#07060c" strokeWidth="2"/>
              <text x="130" y="230" fill="#cbd5e1" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="IBM Plex Sans">{lens === 'A' ? 'RPKM cell' : 'Photocopies'}</text>
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
  const doNotSay = {
    B: "COX falling proves they aged.",
    A: "These 25 points are the same five animals grown up."
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
    <div className="grid grid-cols-12 gap-8 w-full h-full pt-[72px] pb-[72px] px-[72px]">
      <div className="col-span-12 xl:col-span-5 flex flex-col justify-center">
        <DynamicCopy title="cox4i1" lens={lens} lv={lv} copy={copy} why={why} doNotSay={doNotSay} />
      </div>
      
      <div className="col-span-12 xl:col-span-7 flex gap-6 items-center">
        {/* CHART 1: BAR */}
        <div className={\`chart-card h-[480px] flex flex-col \${lens === 'A' ? 'w-1/2' : 'w-full h-[520px]'}\`}>
          <div className="text-[14px] text-white font-medium mb-4 text-center font-sans">cox4i1 in liver — mean of 5 fish.</div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <XAxis dataKey="name" stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 750]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Bar dataKey="mean" fill={COLORS.coxBar} isAnimationActive={false}>
                <ErrorBar dataKey="error" width={10} strokeWidth={2} stroke="#f8fafc" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CHART 2: SCATTER (LENS A ONLY) */}
        {lens === 'A' && (
          <div className="chart-card h-[480px] w-1/2 flex flex-col">
            <div className="text-[14px] text-white font-medium mb-4 text-center font-sans">each dot = one liver.</div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
                <XAxis type="number" dataKey="x" domain={[0.5, 5.5]} ticks={[1,2,3,4,5]} tickFormatter={(v) => \`\${WEEKS[v-1]} wk\`} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="number" domain={[0, 850]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Scatter data={scatterData} dataKey="y" fill={COLORS.dot} isAnimationActive={false} />
                <Line data={meanLineData} type="monotone" dataKey="mean" stroke="#f8fafc" strokeWidth={2} dot={false} isAnimationActive={false}>
                  <ErrorBar dataKey="error" width={10} strokeWidth={2} stroke="#f8fafc" />
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
import { MEANS_LIVER, COLORS } from '../data';

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
    if (val > 0) return \`rgba(159, 18, 57, \${(val/2.2)*0.8 + 0.2})\`; // heatPos #9f1239
    return \`rgba(30, 58, 138, \${(Math.abs(val)/2.2)*0.8 + 0.2})\`; // heatNeg #1e3a8a
  };

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full pt-[72px] pb-[72px] px-[72px]">
      <div className="col-span-12 flex flex-col justify-center items-center">
        <div className="chart-card w-full max-w-4xl h-[600px] flex flex-col">
          <div className="text-[14px] text-white font-medium mb-6 text-center font-sans">
            week means, n=5, z within gene — not 25 raw cells.
          </div>
          <div className="flex-grow flex flex-col justify-center gap-1">
            <div className="flex text-[12px] font-mono text-[#94a3b8] mb-2 font-bold">
              <div className="w-32"></div>
              {['5wk','12wk','20wk','27wk','39wk'].map(w => (
                <div key={w} className="flex-1 text-center">{w}</div>
              ))}
            </div>
            {heatmapData.map(row => (
              <div key={row.gene} className="flex h-10 items-center gap-1">
                <div className="w-32 text-right pr-4 text-[13px] font-mono text-[#cbd5e1]">{row.gene}</div>
                {row.z.map((zval, i) => (
                  <div key={i} className="flex-1 h-full" style={{ backgroundColor: getRdBu(zval) }} />
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
  const doNotSay = {
    B: "Most genes died.",
    A: "FDR 0.05 — we did not run DESeq."
  };

  const chartData = COUNTS.labels.map((lbl, i) => ({
    name: lbl,
    liver: COUNTS.liver[i],
    skin: COUNTS.skin[i]
  }));

  const hideChart = lens === 'B' && lv === 1;

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full pt-[72px] pb-[72px] px-[72px]">
      <div className="col-span-12 xl:col-span-4 flex flex-col justify-center">
        <DynamicCopy title="Out of 23,564 genes." lens={lens} lv={lv} copy={copy} why={why} doNotSay={doNotSay} />
      </div>
      
      <div className="col-span-12 xl:col-span-8 flex items-center justify-center">
        {hideChart ? (
          <div className="flex flex-col items-center gap-12 text-center w-full">
            <div className="flex w-full justify-between px-12">
              <div className="flex flex-col"><span className="text-[64px] font-bold text-white leading-none">894</span><span className="text-[#94a3b8] text-[20px]">up</span></div>
              <div className="flex flex-col"><span className="text-[64px] font-bold text-white leading-none">763</span><span className="text-[#94a3b8] text-[20px]">down</span></div>
              <div className="flex flex-col"><span className="text-[64px] font-bold text-white leading-none">11,784</span><span className="text-[#94a3b8] text-[20px]">similar</span></div>
              <div className="flex flex-col"><span className="text-[64px] font-bold text-white leading-none">10,123</span><span className="text-[#94a3b8] text-[20px]">off</span></div>
            </div>
            <div className="text-[20px] text-[#64748b] font-mono">liver, week 5 vs 39.</div>
          </div>
        ) : (
          <div className="chart-card w-full h-[500px] flex flex-col">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
                <XAxis dataKey="name" stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
                <Bar dataKey="liver" name="Liver" fill="#60a5fa" isAnimationActive={false}>
                  <LabelList dataKey="liver" position="top" fill="#e2e8f0" fontSize={12} />
                </Bar>
                <Bar dataKey="skin" name="Skin" fill="#f59e0b" isAnimationActive={false}>
                  <LabelList dataKey="skin" position="top" fill="#e2e8f0" fontSize={12} />
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
  const doNotSay = {
    B: "The fish turned mitochondria off.",
    A: "Percent change is a causal effect."
  };

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full pt-[72px] pb-[72px] px-[72px]">
      <div className="col-span-12 xl:col-span-4 flex flex-col justify-center">
        <DynamicCopy title="Organs Disagree" lens={lens} lv={lv} copy={copy} why={why} doNotSay={doNotSay} />
      </div>
      
      <div className="col-span-12 xl:col-span-8 flex items-center">
        <div className="chart-card w-full h-[500px] flex flex-col relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ORGAN_PCT} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <ReferenceLine y={0} stroke="#f8fafc" strokeWidth={2} />
              <XAxis dataKey="g" stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis domain={[-80, 160]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} />
              
              <Bar dataKey="L" name="Liver" fill={COLORS.liverBar} isAnimationActive={false} />
              <Bar dataKey="S" name="Skin" fill={COLORS.skinBar} isAnimationActive={false} />
              <Bar dataKey="F" name="Fin" fill={COLORS.finBar} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
          <div className="absolute bottom-2 left-6 text-[12px] text-[#94a3b8] font-mono">
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
  const doNotSay = {
    B: "We predicted who would die from COX.",
    A: "+15% is on this strip"
  };

  const scatterData = DEATH_WEEKS_45.map(w => ({ x: w, y: (Math.random()-0.5)*0.3 }));

  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full pt-[72px] pb-[72px] px-[72px]">
      <div className="col-span-12 xl:col-span-4 flex flex-col justify-center">
        <DynamicCopy title="Lifespan" lens={lens} lv={lv} copy={copy} why={why} doNotSay={doNotSay} />
      </div>
      
      <div className="col-span-12 xl:col-span-8 flex items-center">
        <div className="chart-card w-full h-[420px] flex flex-col relative">
          <div className="text-[14px] text-white font-medium mb-4 text-center font-sans">age at death, weeks.</div>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.grid} vertical={false} />
              <XAxis type="number" dataKey="x" domain={[20, 80]} stroke={CHART_DEFAULTS.tick} tick={{ fill: CHART_DEFAULTS.tick, fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis type="number" dataKey="y" hide domain={[-1, 1]} />
              
              <ReferenceLine x={28.71} stroke="#f59e0b" strokeDasharray="4 4" />
              <ReferenceLine x={49.00} stroke="#f8fafc" strokeDasharray="4 4" />
              <ReferenceLine x={71.86} stroke="#34d399" strokeDasharray="4 4" />
              
              <Scatter data={scatterData} fill="#60a5fa" isAnimationActive={false} />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6 text-[12px] text-[#e2e8f0] font-mono">
            <span><span className="text-[#f59e0b]">min 29 wk</span></span>
            <span><span className="text-[#f8fafc]">median 49 wk</span></span>
            <span><span className="text-[#34d399]">max 72 wk</span></span>
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
    "We did not prove aging. Week 39 is already older.",
    "We did not find the gene that causes death.",
    "+15% life is Baumgart 2016 rotenone, not our bar.",
    "We did not score how faded a fish looked.",
    "We did not merge S1 animal # with LS columns.",
    "Week-39 liver is not the week-5 fish grown up."
  ];

  return (
    <div className="grid grid-cols-12 gap-6 w-full h-full pt-[72px] pb-[72px] px-[72px] items-center">
      <div className="col-span-12 flex flex-col items-center text-center">
        <h2 className="font-['Playfair_Display'] text-[48px] text-[#f43f5e] mb-12">DO NOT SAY</h2>
        <div className="flex flex-col gap-4 w-full max-w-4xl text-left">
          {items.map((item, i) => (
            <div key={i} className="chart-card text-[20px] text-[#e2e8f0] flex gap-4 items-center">
              <span className="text-[#f43f5e] font-mono opacity-60">0{i+1}</span>
              {item}
            </div>
          ))}
        </div>
        
        {lv === 3 && (
          <div className="mt-12 text-[13px] text-[#94a3b8] font-mono w-full max-w-4xl text-left bg-[#120e1c] p-6 rounded-lg border border-[#2a2150] space-y-1">
            <div><span className="text-white">Bar =</span> groups. <span className="text-white">Strip =</span> the five fish.</div>
            <div><span className="text-white">Heatmap =</span> genes × weeks. <span className="text-white">Count =</span> 23,564 rows. <span className="text-white">Lifespan =</span> S1 only.</div>
            <div className="text-[#f43f5e] mt-2 pt-2 border-t border-[#2a2150]">Forbidden: pie, 3D, RNA+days dual axis, unlabeled liver+fin.</div>
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
    <div className="grid grid-cols-12 gap-6 w-full h-full pt-[72px] pb-[72px] px-[72px] items-center text-center">
      <div className="col-span-12 flex flex-col justify-center items-center">
        <h1 className="font-['Playfair_Display'] font-light text-[72px] text-[#f8fafc] mb-8">
          Aging is real. It is not simple.
        </h1>
        <div className="text-[32px] text-[#cbd5e1] font-light mb-4">
          Most genes stay in the same ballpark.
        </div>
        <div className="text-[32px] text-white font-medium mb-16">
          The part that changes depends on which room you look in.
        </div>
        <div className="text-[14px] text-[#64748b] tracking-wider font-mono">
          GSE66712 &nbsp;&middot;&nbsp; S1 &nbsp;&middot;&nbsp; Atria Year 1
        </div>
      </div>
    </div>
  );
}
`);
