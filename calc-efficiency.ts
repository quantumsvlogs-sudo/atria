import { visitorData } from './src/data/artSpaceData';

console.log("Sculpture Weekday Evening:");
console.table(visitorData.filter(v => v.exhibition === 'Sculpture' && v.dayType === 'Weekday' && v.timeOfDay === 'Evening'));
console.log("International Weekday Evening:");
console.table(visitorData.filter(v => v.exhibition === 'International' && v.dayType === 'Weekday' && v.timeOfDay === 'Evening'));

