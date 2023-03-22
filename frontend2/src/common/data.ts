interface AppData {
  name: string;
  abbreviation: string;
  hyphenatedName: string;
  isProtected: boolean;
  color: string;
}

// Possible future colors
// #F2C94C
// #E0B840
// #99978F

enum Colors {
  TvSchedulesApp = '#9D7EAC',
  DemosApp = '#343330',
}

const appsData: AppData[] = [
  {
    name: 'TV Schedules',
    abbreviation: 'TV',
    hyphenatedName: 'tv-schedules',
    isProtected: false,
    color: Colors.TvSchedulesApp,
  },
  {
    name: 'Demos',
    abbreviation: 'DM',
    hyphenatedName: 'demos',
    isProtected: false,
    color: Colors.DemosApp,
  },
];

export type { AppData };
export { appsData, Colors };
