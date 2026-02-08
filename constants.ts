import { CountyData } from './types';

export const NY_COUNTIES: CountyData[] = [
  { name: 'Suffolk County', effectiveRate: 2.30, medianHomeValue: 550000, description: "Includes Babylon, Brookhaven, East Hampton, Huntington, Islip, Riverhead, Shelter Island, Smithtown, Southampton, Southold." },
  { name: 'Nassau County', effectiveRate: 2.24, medianHomeValue: 700000, description: "Known for high property values and excellent school districts." },
  { name: 'New York City (All Boroughs)', effectiveRate: 0.88, medianHomeValue: 800000, description: "Class 1 residential properties. Rate is low, but assessments can vary widely." },
  { name: 'Westchester County', effectiveRate: 1.62, medianHomeValue: 750000, description: "Often cites the highest tax bills in the nation due to high property values." },
  { name: 'Rockland County', effectiveRate: 2.00, medianHomeValue: 580000, description: "West of the Hudson River, significant school taxes." },
  { name: 'Albany County', effectiveRate: 2.65, medianHomeValue: 270000, description: "Capital region taxes." },
  { name: 'Erie County', effectiveRate: 2.60, medianHomeValue: 240000, description: "Includes Buffalo." },
  { name: 'Monroe County', effectiveRate: 2.85, medianHomeValue: 210000, description: "Includes Rochester. High effective rates but lower home values." },
  { name: 'Onondaga County', effectiveRate: 2.70, medianHomeValue: 190000, description: "Includes Syracuse." },
  { name: 'Orange County', effectiveRate: 2.45, medianHomeValue: 380000, description: "Mid-Hudson region." },
  { name: 'Dutchess County', effectiveRate: 1.95, medianHomeValue: 400000, description: "Poughkeepsie and scenic Hudson Valley areas." },
];

export const BREAKDOWN_PRESETS: Record<string, { school: number; municipal: number; special: number }> = {
  'Suffolk County': { school: 0.65, municipal: 0.25, special: 0.10 },
  'Nassau County': { school: 0.62, municipal: 0.28, special: 0.10 },
  'New York City (All Boroughs)': { school: 0.45, municipal: 0.50, special: 0.05 }, // NYC funds schools differently via general fund
  'default': { school: 0.60, municipal: 0.30, special: 0.10 }
};
