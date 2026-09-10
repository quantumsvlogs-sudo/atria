import fs from 'fs';

const rawData = fs.readFileSync('src/data/artSpaceData.ts', 'utf-8');
const dataStr = rawData.split('export const RAW_CSV = `')[1].split('`;')[0].trim();

const lines = dataStr.split('\n');
const visitors = lines.map(line => {
  const cols = line.split('\t');
  return {
    exhibition: cols[2],
    dayType: cols[3],
    timeOfDay: cols[4],
    spend: parseInt(cols[6], 10),
    bookingType: cols[8]
  };
});

const groups = {};
visitors.forEach(v => {
  const key = `${v.exhibition} - ${v.dayType}`;
  if (!groups[key]) groups[key] = { visitors: 0, spend: 0 };
  groups[key].visitors += 1;
  groups[key].spend += v.spend;
});

const results = Object.keys(groups).map(k => {
  return {
    key: k,
    visitors: groups[k].visitors,
    spend: groups[k].spend,
    efficiency: groups[k].spend / groups[k].visitors
  };
});

results.sort((a, b) => b.efficiency - a.efficiency);
console.table(results);

const groupsExt = {};
visitors.forEach(v => {
  const key = `${v.exhibition} - ${v.dayType} - ${v.timeOfDay}`;
  if (!groupsExt[key]) groupsExt[key] = { visitors: 0, spend: 0 };
  groupsExt[key].visitors += 1;
  groupsExt[key].spend += v.spend;
});
const resultsExt = Object.keys(groupsExt).map(k => {
  return {
    key: k,
    visitors: groupsExt[k].visitors,
    spend: groupsExt[k].spend,
    efficiency: groupsExt[k].spend / groupsExt[k].visitors
  };
});

resultsExt.sort((a, b) => b.efficiency - a.efficiency);
console.log("Detailed");
console.table(resultsExt.slice(0, 10));

