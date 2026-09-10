export const WEEKS = [5,12,20,27,39];

export const COX_MEAN = [553.3, 408.8, 421.5, 465.0, 449.7];
export const COX_SD   = [112.5,  72.4, 131.5, 103.8,  54.1];
export const COX_RAW = {
  5:  [745.13,478.57,496.00,483.71,563.17],
  12: [421.82,400.35,361.69,523.85,336.17],
  20: [649.14,322.87,341.05,396.73,397.92],
  27: [430.38,526.60,595.32,452.22,320.31],
  39: [513.68,396.67,448.72,396.00,493.40]
};

export const HEATMAP_MEANS = [
  { gene: 'cox4i1', wk5: 553.32, wk12: 408.78, wk20: 421.54, wk27: 464.97, wk39: 449.69 },
  { gene: 'ndufs7', wk5: 46.50, wk12: 37.93, wk20: 41.29, wk27: 41.39, wk39: 40.69 },
  { gene: 'sod1', wk5: 294.67, wk12: 189.97, wk20: 193.09, wk27: 234.44, wk39: 209.70 },
  { gene: 'tyr', wk5: 0.10, wk12: 0.03, wk20: 2.83, wk27: 3.92, wk39: 0.04 },
  { gene: 'apoa1a', wk5: 52331.57, wk12: 58512.30, wk20: 39435.04, wk27: 49444.02, wk39: 38243.59 },
  { gene: 'vtg2', wk5: 1851.28, wk12: 0.22, wk20: 9.80, wk27: 0.93, wk39: 0.69 }
];

export const ORGAN_PCT = [
  { gene: "cox4i1", liver: -18.7, skin: 12.3, fin: -2.8 },
  { gene: "ndufs7", liver: -12.5, skin: 69.7, fin: -0.8 },
  { gene: "sod1", liver: -28.8, skin: 86.8, fin: -10.4 },
  { gene: "tyr", liver: null, skin: -53.4, fin: -43.4 },
  { gene: "apoa1a", liver: -26.9, skin: -16.5, fin: -16.7 },
  { gene: "vtg2", liver: -99.96, skin: null, fin: null }
];

export const COUNTS = {
  labels: ["≥2× up","≥2× down","on, similar","off / silent"],
  liver:  [894,763,11784,10123],
  skin:   [1035,3058,11210,8261]
};

export const DEATH_WEEKS_45 = [28.71,29.14,30.57,30.57,31.57,32.00,32.43,32.57,33.71,33.86,33.86,34.14,35.00,35.00,36.43,45.14,45.43,46.86,46.86,47.86,48.00,48.71,48.86,49.00,49.43,49.71,49.86,50.00,50.29,50.29,57.29,58.00,58.71,58.71,59.14,59.29,61.57,61.86,63.43,63.43,65.43,66.14,69.86,70.43,71.86];

export const COLORS = {
  liverBar: '#60a5fa',
  skinBar:  '#f59e0b',
  finBar:   '#34d399',
  coxBar:   '#8b5cf6',
  dot:      '#60a5fa',
  heatNeg:  '#1e3a8a',
  heatMid:  '#f8fafc',
  heatPos:  '#9f1239'
};

export const CHART_DEFAULTS = {
  color: '#e2e8f0',
  grid: '#1e1b2e',
  tick: '#94a3b8'
};
