const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n');
}

// ---------------------------------------------------------
// App.tsx
// ---------------------------------------------------------
write('src/App.tsx', `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Slide0Title } from './slides/Slide0Title';
import { Slide1Intro } from './slides/Slide1Intro';
import { Slide2Hero } from './slides/Slide2Hero';
import { Slide3Rows } from './slides/Slide3Rows';
import { Slide4Organs } from './slides/Slide4Organs';
import { Slide5Lifespan } from './slides/Slide5Lifespan';
import { Slide6DoNotSay } from './slides/Slide6DoNotSay';
import { Slide7Close } from './slides/Slide7Close';
import { PasteDock } from './components/PasteDock';
import { BackgroundBlobs } from './components/BackgroundBlobs';

const TOTAL_SLIDES = 8;

export default function App() {
  const [lens, setLens] = useState<'A' | 'B'>('B');
  const [density, setDensity] = useState<1 | 2 | 3>(1);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setSlide(s => Math.min(TOTAL_SLIDES - 1, s + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlide(s => Math.max(0, s - 1));
      } else if (e.key >= '0' && e.key <= '7') {
        setSlide(Number(e.key));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#07060c] text-white selection:bg-indigo-500/30 font-sans">
      <BackgroundBlobs />
      
      {/* LENS OVERLAY (Behind the content, blurs the background blobs) */}
      <AnimatePresence>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 z-10 backdrop-blur-[20px]"
          style={{ 
            backgroundColor: lens === 'A' ? 'rgba(45, 212, 191, 0.08)' : 'rgba(245, 185, 66, 0.08)',
            borderLeft: \`1px solid \${lens === 'A' ? 'rgba(45,212,191,0.5)' : 'rgba(245,185,66,0.5)'}\`,
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        boxShadow: \`inset 0 0 150px -20px \${lens === 'A' ? 'rgba(45,212,191,0.2)' : 'rgba(245,185,66,0.2)'}\`
      }} />

      {/* Top Header & Controls (z-50) */}
      <header className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto flex gap-2 items-center text-slate-500 font-mono text-xs tracking-widest uppercase">
          <span className={cn("w-2 h-2 rounded-full animate-pulse", lens === 'A' ? "bg-teal-500" : "bg-amber-500")} />
          Atria University | Year 1 Life Sciences
        </div>
        
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          {/* Lens Toggle */}
          <div className="flex bg-[#0f0b16] rounded-full p-1 border border-white/5 shadow-2xl backdrop-blur-md">
            <button 
              onClick={() => setLens('A')}
              className={cn("px-5 py-2 rounded-full text-xs font-bold transition-all duration-300", lens === 'A' ? "bg-teal-500/20 text-teal-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "text-slate-500 hover:text-white")}
            >
              LENS A (Marker)
            </button>
            <button 
              onClick={() => setLens('B')}
              className={cn("px-5 py-2 rounded-full text-xs font-bold transition-all duration-300", lens === 'B' ? "bg-amber-500/20 text-amber-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "text-slate-500 hover:text-white")}
            >
              LENS B (Class)
            </button>
          </div>

          {/* Density Toggle */}
          <div className="flex bg-[#0f0b16] rounded-full p-1 border border-white/5 shadow-2xl backdrop-blur-md">
            {[1, 2, 3].map((lv) => (
              <button 
                key={lv}
                onClick={() => setDensity(lv as 1 | 2 | 3)}
                className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300", density === lv ? "bg-indigo-500/20 text-indigo-400" : "text-slate-500 hover:text-white")}
              >
                LV {lv}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Slide Navigation Dots (z-50) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3 pointer-events-auto bg-[#0f0b16]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={cn("h-2 rounded-full transition-all duration-300", slide === i ? "bg-white w-8" : "bg-white/20 hover:bg-white/50 w-2")}
          />
        ))}
      </div>

      {/* Main Slide Stage (z-20) */}
      <div className="relative z-20 w-full h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {slide === 0 && <Slide0Title key="s0" lens={lens} density={density} />}
          {slide === 1 && <Slide1Intro key="s1" lens={lens} density={density} />}
          {slide === 2 && <Slide2Hero key="s2" lens={lens} density={density} />}
          {slide === 3 && <Slide3Rows key="s3" lens={lens} density={density} />}
          {slide === 4 && <Slide4Organs key="s4" lens={lens} density={density} />}
          {slide === 5 && <Slide5Lifespan key="s5" lens={lens} density={density} />}
          {slide === 6 && <Slide6DoNotSay key="s6" lens={lens} density={density} />}
          {slide === 7 && <Slide7Close key="s7" lens={lens} density={density} />}
        </AnimatePresence>
      </div>

      <PasteDock lens={lens} density={density} />
    </div>
  );
}
`);

// ---------------------------------------------------------
// SlideLayout.tsx (Shared structured layout)
// ---------------------------------------------------------
write('src/components/SlideLayout.tsx', `
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SlideLayoutProps {
  title: string;
  lens: 'A' | 'B';
  density: 1 | 2 | 3;
  caption: React.ReactNode;
  details?: React.ReactNode;
  rationale?: React.ReactNode;
  chart: React.ReactNode;
  chart2?: React.ReactNode;
}

export function SlideLayout({ title, lens, density, caption, details, rationale, chart, chart2 }: SlideLayoutProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full min-h-screen flex flex-col pt-32 pb-24 px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1920px] mx-auto"
    >
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-md">
          {title}
        </h2>
      </div>

      <div className="flex-grow grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Narrative) */}
        <div className="xl:col-span-4 flex flex-col gap-6 sticky top-32">
          <div className="bg-[#0f0b16]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className={cn(
              "text-lg md:text-xl font-medium leading-relaxed mb-6",
              lens === 'A' ? "text-teal-50" : "text-amber-50"
            )}>
              {caption}
            </div>

            {density >= 2 && details && (
              <div className="text-sm md:text-base text-slate-400 leading-relaxed space-y-4">
                {details}
              </div>
            )}

            {density === 3 && rationale && (
              <div className={cn(
                "mt-8 p-5 rounded-2xl border font-mono text-xs leading-relaxed",
                lens === 'A' ? "bg-teal-950/40 border-teal-500/30 text-teal-200" : "bg-amber-950/40 border-amber-500/30 text-amber-200"
              )}>
                <span className="font-bold uppercase tracking-widest block mb-3 opacity-60">Chart Rationale</span>
                {rationale}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Charts) */}
        <div className={cn(
          "grid gap-6 items-stretch",
          chart2 ? "xl:col-span-8 grid-cols-1 lg:grid-cols-2" : "xl:col-span-8 grid-cols-1"
        )}>
          <div className="bg-[#0f0b16]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col min-h-[500px]">
            {chart}
          </div>
          {chart2 && (
            <div className="bg-[#0f0b16]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col min-h-[500px]">
              {chart2}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
`);

// ---------------------------------------------------------
// SLIDES
// ---------------------------------------------------------
write('src/slides/Slide0Title.tsx', `
import React from 'react';
import { motion } from 'motion/react';

export function Slide0Title({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center w-full h-screen text-center px-6"
    >
      <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] max-w-5xl">
        Age is a calendar.
      </h1>
      <h2 className="text-2xl md:text-4xl font-light text-slate-300 leading-snug mb-16 max-w-4xl">
        This file is how hard an organ was <strong className="text-white font-bold">reading a recipe.</strong>
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 text-slate-500 font-mono tracking-widest text-xs md:text-sm bg-[#0f0b16]/80 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/5">
        <span className="text-white">GEO GSE66712</span>
        <span className="hidden md:inline text-slate-700">|</span>
        <span>Atria University</span>
        <span className="hidden md:inline text-slate-700">|</span>
        <span>Manav M. Parikh • G. Sai Krishna</span>
      </div>
    </motion.div>
  );
}
`);

write('src/slides/Slide1Intro.tsx', `
import React from 'react';
import { SlideLayout } from '../components/SlideLayout';

export function Slide1Intro({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  return (
    <SlideLayout 
      title="What one number is"
      lens={lens}
      density={density}
      caption={
        lens === 'A' 
          ? "_3 means liver. _5 means skin. LS means fin. The week of age is embedded directly in the GEO sample titles."
          : "Think of the DNA as a master recipe book. RNA (RPKM) is how many photocopies of a specific recipe the cell made today."
      }
      details={
        <div className="space-y-4 mt-4">
          <p>This tells us what the cell is actively trying to build right now, not just what it has the potential to build.</p>
          <p>By counting these "photocopies", we can see exactly which cellular machines are turned on, and which are gathering dust.</p>
        </div>
      }
      rationale="RPKM normalizes for gene length and sequencing depth. This allows for fair comparison between different genes within the same sample."
      chart={
        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl">
          <div className="text-center p-8">
            <div className="text-8xl font-black text-white/10 mb-4">RPKM</div>
            <div className="text-lg text-slate-400 font-mono">Reads Per Kilobase of transcript, per Million mapped reads.</div>
          </div>
        </div>
      }
    />
  );
}
`);

write('src/slides/Slide2Hero.tsx', `
import React from 'react';
import { SlideLayout } from '../components/SlideLayout';
import { BarChart1 } from '../components/charts/BarChart1';
import { StripChart2 } from '../components/charts/StripChart2';

export function Slide2Hero({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  const showStrip = lens === 'A' || density >= 2;

  return (
    <SlideLayout 
      title="Energy-pump gene in liver"
      lens={lens}
      density={density}
      caption={
        lens === 'A' 
          ? "Each dot is one sacrificed liver. These are not the same five animals grown up."
          : "Highest at 5 weeks. It's not a simple slide down every single step."
      }
      details={
        <div className="space-y-4">
          <p>Looking at <strong>cox4i1</strong>, a critical component for cellular energy production.</p>
          <p>Notice that the decline isn't perfectly linear. Biology is messy, and cross-sectional data (different fish at different ages) introduces variance.</p>
        </div>
      }
      rationale={
        <div className="space-y-2">
          <p><strong>Bar Chart:</strong> Compares discrete, named groups (weeks).</p>
          <p><strong>Strip Plot:</strong> Shows the underlying distribution of the 5 individual fish per timepoint, revealing the spread and overlap that error bars might obscure.</p>
        </div>
      }
      chart={<BarChart1 lens={lens} />}
      chart2={showStrip ? <StripChart2 lens={lens} /> : undefined}
    />
  );
}
`);

write('src/slides/Slide3Rows.tsx', `
import React from 'react';
import { SlideLayout } from '../components/SlideLayout';
import { CountChart5 } from '../components/charts/CountChart5';
import { HeatmapChart3 } from '../components/charts/HeatmapChart3';

export function Slide3Rows({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  const showCount = lens === 'A' || density >= 2;
  const showHeatmap = lens === 'A' || (lens === 'B' && density === 3);

  return (
    <SlideLayout 
      title="The 23,564-Row Sentence"
      lens={lens}
      density={density}
      caption="Using every single gene without drawing 23,564 overlapping lines."
      details={
        <div className="space-y-4">
          <p>Most genes remain stable across the lifespan. The massive majority fall into the 'similar' or 'off/silent' categories.</p>
          <p>The heatmap zooms in on specific mitochondrial and antioxidant genes to track coordinated changes.</p>
        </div>
      }
      rationale={
        <div className="space-y-2">
          <p><strong>Count Bar:</strong> Categorizes all 23,564 rows based on a 2x fold-change cutoff (mean ≥ 1).</p>
          <p><strong>Heatmap:</strong> Displays many genes × weeks from the same matrix, using within-row Z-scores so high-expression genes (like apoa1a) don't crush the visual scale of others.</p>
        </div>
      }
      chart={
        showCount ? <CountChart5 lens={lens} /> : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-sm border-2 border-dashed border-white/5 rounded-2xl">
            [Counts Hidden at LV1]
          </div>
        )
      }
      chart2={
        showHeatmap ? <HeatmapChart3 /> : undefined
      }
    />
  );
}
`);

write('src/slides/Slide4Organs.tsx', `
import React from 'react';
import { SlideLayout } from '../components/SlideLayout';
import { GroupedBarChart4 } from '../components/charts/GroupedBarChart4';
import { TwoPanelStrip6 } from '../components/charts/TwoPanelStrip6';

export function Slide4Organs({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  const showTwoPanel = lens === 'A' || (lens === 'B' && density >= 2);

  return (
    <SlideLayout 
      title="Organs Disagree"
      lens={lens}
      density={density}
      caption={
        lens === 'A'
          ? "Fin window is 10 to 20 weeks, not 5 to 39. The percentages are not drawn from the same temporal design."
          : "Same recipe, three different rooms. The body doesn't age as a single unit."
      }
      details={
        <div className="space-y-4">
          <p>A gene that shuts down in the liver might actually ramp up in the skin. Aging trajectories are highly tissue-specific.</p>
          <p>We cannot generalize "aging" from a single organ's transcriptome.</p>
        </div>
      }
      rationale={
        <div className="space-y-2">
          <p><strong>Grouped Bar:</strong> Compares the exact same named variables (genes) across three distinct contexts (organs).</p>
          <p>Mixing organs on one unlabeled axis is strictly forbidden.</p>
        </div>
      }
      chart={<GroupedBarChart4 lens={lens} />}
      chart2={showTwoPanel ? <TwoPanelStrip6 /> : undefined}
    />
  );
}
`);

write('src/slides/Slide5Lifespan.tsx', `
import React from 'react';
import { SlideLayout } from '../components/SlideLayout';
import { LifespanStrip7 } from '../components/charts/LifespanStrip7';

export function Slide5Lifespan({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  return (
    <SlideLayout 
      title="S1 Lifespan"
      lens={lens}
      density={density}
      caption="S1 deaths. Not glued to LS1…LS45. Different ID system."
      details={
        <div className="space-y-4">
          <p>This is from the second file (Baumgart 2016 Table S1), representing 45 recorded deaths.</p>
          <p>The median lifespan was roughly 49 weeks, with a maximum recorded of almost 72 weeks.</p>
        </div>
      }
      rationale={
        <div className="space-y-2">
          <p><strong>One-Axis Strip:</strong> A 1D scatter plot to show the distribution of deaths.</p>
          <p>This is NOT a Kaplan-Meier curve (we didn't model censoring), and it must never be plotted on an RPKM axis.</p>
        </div>
      }
      chart={<LifespanStrip7 />}
    />
  );
}
`);

write('src/slides/Slide6DoNotSay.tsx', `
import React from 'react';
import { motion } from 'motion/react';
import { AlertOctagon } from 'lucide-react';

export function Slide6DoNotSay({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  const list = [
    "We proved aging.",
    "This gene causes death.",
    "+15% lifespan is our result (Baumgart 2016 rotenone trial — credit one clause only).",
    "These fish faded X% (we did not score color).",
    "S1 animal # = LS column.",
    "Week 39 liver is the same fish as week 5."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-24"
    >
      <div className="w-full max-w-5xl bg-[#1a0a0f] border border-red-900/50 rounded-[40px] p-12 md:p-20 shadow-2xl relative overflow-hidden">
        <AlertOctagon className="absolute -top-20 -right-20 w-96 h-96 text-red-500/5 rotate-12" strokeWidth={1} />
        
        <h2 className="text-4xl md:text-6xl font-black text-red-500 mb-12 tracking-tight">
          LOCKED: DO NOT SAY
        </h2>
        
        <div className="space-y-6 relative z-10">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-6 group">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-red-950 flex items-center justify-center text-red-500 font-mono text-sm border border-red-900/50 group-hover:bg-red-900 group-hover:text-red-300 transition-colors">
                {i + 1}
              </div>
              <p className="text-xl md:text-2xl font-medium text-red-100/90 leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>

        {density === 3 && (
          <div className="mt-16 pt-8 border-t border-red-900/30 text-sm font-mono text-red-500/60 uppercase tracking-widest">
            Level 3 Detail: The most frequent fatal errors made during life science thesis defenses.
          </div>
        )}
      </div>
    </motion.div>
  );
}
`);

write('src/slides/Slide7Close.tsx', `
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Slide7Close({ lens, density }: { lens: 'A' | 'B'; density: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full h-screen px-6 text-center"
    >
      <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-16 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
        Aging is real.
      </h1>
      
      <div className="space-y-6 text-3xl md:text-5xl font-light text-slate-300 tracking-tight max-w-5xl leading-tight">
        <p>It is not simple.</p>
        <p>Most genes stay in the same ballpark.</p>
        <p className={cn(
          "font-bold mt-12 transition-colors duration-1000",
          lens === 'A' ? "text-teal-400" : "text-amber-400"
        )}>
          The part that changes depends on which room you look in.
        </p>
      </div>
    </motion.div>
  );
}
`);

// ---------------------------------------------------------
// Charts Refinements (Make them look incredibly polished)
// ---------------------------------------------------------
write('src/components/charts/BarChart1.tsx', `
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ErrorBar, Tooltip } from 'recharts';
import { cox4i1_means } from '../../data';

export function BarChart1({ lens }: { lens: 'A' | 'B' }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">cox4i1 (Liver Means)</h3>
        <p className="text-sm text-slate-400">RPKM values across 5 timepoints (n=5)</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cox4i1_means} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="week" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: '#ffffff0a' }} contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} />
            <Bar dataKey="mean" fill={lens === 'A' ? '#2dd4bf' : '#f5b942'} radius={[6, 6, 0, 0]} maxBarSize={80}>
              <ErrorBar dataKey="sd" width={8} strokeWidth={2} stroke="#ffffff" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
`);

write('src/components/charts/StripChart2.tsx', `
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ZAxis } from 'recharts';
import { cox4i1_raw, cox4i1_means } from '../../data';

export function StripChart2({ lens }: { lens: 'A' | 'B' }) {
  const scatterData = [];
  cox4i1_raw.forEach((group, i) => {
    group.values.forEach(v => {
      scatterData.push({
        xNumeric: i + 1,
        week: group.week,
        val: v,
        jitter: (i + 1) + (Math.random() - 0.5) * 0.25 // Tighter jitter
      });
    });
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">cox4i1 (Raw Livers)</h3>
        <p className="text-sm text-slate-400">25 individual samples showing true spread</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis type="number" dataKey="jitter" domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]} tickFormatter={(val) => cox4i1_means[val - 1]?.week || ''} stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis type="number" dataKey="val" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 800]} />
            <ZAxis type="number" range={[60, 60]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} />
            <Scatter data={scatterData} fill={lens === 'A' ? '#2dd4bf' : '#f5b942'} opacity={0.7} />
            {cox4i1_means.map((m, i) => (
              <Scatter key={m.week} data={[{ jitter: i + 1, val: m.mean }]} fill="#ffffff" shape="cross" />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
`);

write('src/components/charts/HeatmapChart3.tsx', `
import React from 'react';
import { data_means } from '../../data';

function getRdBuColor(z: number) {
  const normalized = Math.max(-2, Math.min(2, z));
  if (normalized > 0) return \`rgba(220, 38, 38, \${(normalized / 2) * 0.9 + 0.1})\`;
  return \`rgba(37, 99, 235, \${(Math.abs(normalized) / 2) * 0.9 + 0.1})\`;
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
              <div key={i} className="flex-1 h-full rounded transition-all hover:scale-[1.02] hover:z-10 shadow-sm" style={{ backgroundColor: getRdBuColor(z) }} title={\`Z-Score: \${z.toFixed(2)}\`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
`);

write('src/components/charts/GroupedBarChart4.tsx', `
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, ReferenceLine, Cell } from 'recharts';
import { organ_changes } from '../../data';

export function GroupedBarChart4({ lens }: { lens: 'A' | 'B' }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">% Change by Organ</h3>
        <p className="text-sm text-slate-400">Liver (5→39) vs Skin (5→39) vs Fin (10→20)</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={organ_changes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <ReferenceLine y={0} stroke="#ffffff40" strokeWidth={2} />
            <XAxis dataKey="gene" stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff80', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => \`\${val}%\`} />
            <Tooltip cursor={{ fill: '#ffffff0a' }} contentStyle={{ backgroundColor: '#0f0b16', border: '1px solid #ffffff15', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
            
            <Bar dataKey="liver" name="Liver" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="skin" name="Skin" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fin" name="Fin" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
`);

write('src/components/charts/CountChart5.tsx', `
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { row_counts } from '../../data';

export function CountChart5() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">23,564 Transcriptome Rows</h3>
        <p className="text-sm text-slate-400">Classified by 2x fold-change</p>
      </div>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={row_counts} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
`);

write('src/components/charts/TwoPanelStrip6.tsx', `
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
`);

write('src/components/charts/LifespanStrip7.tsx', `
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
`);
