interface AppData {
  name: string;
  abbreviation: string;
  hyphenatedName: string;
  isProtected: boolean;
  color: string;
}

// Possible future colors
// #F2C94C

enum Colors {
  TvSchedulesApp = '#9D7EAC',
  Demos = '#F2C94C',
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
    color: Colors.Demos,
  },
];

export type { AppData };
export { appsData, Colors };
