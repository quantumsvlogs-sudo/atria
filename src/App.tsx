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
              <button onClick={() => handleLensChange('A')} className={`px-6 py-2 rounded-full font-['IBM_Plex_Sans'] text-[14px] font-bold transition-colors shadow-lg ${lens === 'A' ? 'bg-[#134e4a] border border-[#2dd4bf] text-[#ccfbf1]' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0] hover:bg-[#1f1736]'}`}>
                LENS A
              </button>
              <button onClick={() => handleLensChange('B')} className={`px-6 py-2 rounded-full font-['IBM_Plex_Sans'] text-[14px] font-bold transition-colors shadow-lg ${lens === 'B' ? 'bg-[#78350f] border border-[#f5b942] text-[#fef3c7]' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0] hover:bg-[#1f1736]'}`}>
                LENS B
              </button>
            </div>
            {/* LV PILLS */}
            <div className="flex gap-1">
              {[1, 2, 3].map((l) => (
                <button key={l} onClick={() => setLv(l as 1|2|3)} className={`w-[56px] h-[40px] rounded-full font-['IBM_Plex_Sans'] text-[14px] font-bold transition-colors shadow-lg ${lv === l ? 'bg-[#312e81] border border-[#7c5cff] text-white' : 'bg-[#120e1c] border border-[#2a2150] text-[#e2e8f0] hover:bg-[#1f1736]'}`}>
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
