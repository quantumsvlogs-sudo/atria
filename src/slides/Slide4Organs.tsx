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
