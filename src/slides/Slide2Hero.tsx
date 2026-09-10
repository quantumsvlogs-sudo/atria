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
