import DemosScreen from 'apps/demos/DemosScreen';
import SettingsScreen from 'apps/settings/SettingsScreen';
import TranscribeScreen from 'apps/transcribe/TranscribeScreen';
import TvSchedulesScreen from 'apps/tv-schedules/TvSchedulesScreen';

interface AppData {
  name: string;
  abbreviation: string;
  hyphenatedName: string;
  isProtected: boolean;
  color: string;
  mainScreen: JSX.Element;
}

// saved colors
// #F2F2F6
// #D1D1D1
// #99978F
// #7D7D7D
// #343330
// #7065bb
// #9D7EAC
// #6591BB
// #BB6565
// #65BB7C
// #F2C94C
// #E0B840

// z indices
// -1: background
// 0: default
// 1: nav
// 2: modal
// 3: debug

enum Colors {
  // app theme colors
  TvSchedulesApp = '#6591BB',
  DemosApp = '#343330',
  TranscribeApp = '#9D7EAC',
  SettingsApp = '#565656',

  // other colors
  AppBackground = '#F2F2F6',
}

const appsData: AppData[] = [
  {
    name: 'TV Schedules',
    abbreviation: 'TV',
    hyphenatedName: 'tv-schedules',
    isProtected: false,
    color: Colors.TvSchedulesApp,
    mainScreen: <TvSchedulesScreen />,
  },
  {
    name: 'Demos',
    abbreviation: 'DM',
    hyphenatedName: 'demos',
    isProtected: false,
    color: Colors.DemosApp,
    mainScreen: <DemosScreen />,
  },
  {
    name: 'Transcribe',
    abbreviation: 'TR',
    hyphenatedName: 'transcribe',
    isProtected: true,
    color: Colors.TranscribeApp,
    mainScreen: <TranscribeScreen />,
  },
  {
    name: 'Settings',
    abbreviation: 'ST',
    hyphenatedName: 'settings',
    isProtected: true,
    color: Colors.SettingsApp,
    mainScreen: <SettingsScreen />,
  },
];

export type { AppData };
export { appsData, Colors };
