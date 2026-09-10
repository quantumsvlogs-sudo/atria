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
            boxShadow: `inset 0 0 150px ${isA ? 'rgba(45,212,191,0.2)' : 'rgba(245,185,66,0.2)'}`
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
