interface AppData {
  name: string;
  abbreviation: string;
  hyphenatedName: string;
  isProtected: boolean;
}

const appsData: AppData[] = [
  {
    name: 'TV Schedules',
    abbreviation: 'TV',
    hyphenatedName: 'tv-schedules',
    isProtected: false,
  },
];

export type { AppData };
export { appsData };
