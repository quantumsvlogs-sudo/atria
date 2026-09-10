import React from 'react';
import { motion } from 'motion/react';

export function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          x: [0, 50, 0],
          y: [0, -30, 0] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7c5cff] rounded-full mix-blend-screen filter blur-[150px] opacity-20"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          x: [0, -40, 0],
          y: [0, 40, 0] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[150px] opacity-20"
      />
    </div>
  );
}
