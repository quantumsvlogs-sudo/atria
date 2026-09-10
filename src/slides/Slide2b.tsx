import React from 'react';
import { HeatmapChart3 } from '../components/charts/HeatmapChart3';

export function Slide2b() {
  return (
    <div className="grid grid-cols-12 gap-8 w-full h-full items-center">
      <div className="col-span-12 flex flex-col justify-center items-center h-full">
        <div className="chart-card w-full h-[80vh] flex flex-col p-8">
          <HeatmapChart3 />
        </div>
      </div>
    </div>
  );
}
