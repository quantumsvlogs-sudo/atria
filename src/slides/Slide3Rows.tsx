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
