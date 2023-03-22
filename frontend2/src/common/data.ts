interface AppData {
  name: string;
  abbreviation: string;
  hyphenatedName: string;
  isProtected: boolean;
  color: Color;
}

interface Color {
  hex: string;
  tailwindName: string;
}

const colors: Record<string, Color> = {
  TvSchedulesApp: {
    hex: '#9D7EAC',
    tailwindName: 'tv-schedules-app-color',
  },
};

const appsData: AppData[] = [
  {
    name: 'TV Schedules',
    abbreviation: 'TV',
    hyphenatedName: 'tv-schedules',
    isProtected: false,
    color: colors.TvSchedulesApp,
  },
];

export type { AppData, Color };
export { appsData, colors };
