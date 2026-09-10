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
