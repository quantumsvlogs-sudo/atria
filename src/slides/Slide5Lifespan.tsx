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
