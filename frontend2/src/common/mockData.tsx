import { AppData, appsData, Colors } from 'common/data';
import { Fragment } from 'react';
import { User } from 'slices/commonAsyncActions';

const mockAppsData: AppData[] = [
  ...appsData,
  ...Array.from({ length: 10 }).map(() => ({
    name: 'TV Schedules',
    abbreviation: 'TV',
    hyphenatedName: '',
    isProtected: false,
    color: Colors.TvSchedulesApp,
    mainScreen: <Fragment></Fragment>,
  })),
  ...Array.from({ length: 37 }).map(() => ({
    name: 'Aiden B',
    abbreviation: 'AB',
    hyphenatedName: '',
    isProtected: false,
    color: '#BB6565',
    mainScreen: <Fragment></Fragment>,
  })),
  ...Array.from({ length: 30 }).map(() => ({
    name: 'Aiden B',
    abbreviation: 'AB',
    hyphenatedName: '',
    isProtected: false,
    color: '#65BB7C',
    mainScreen: <Fragment></Fragment>,
  })),
];

const mockUser: User = {
  id: 'uuid',
  firstName: 'Aiden',
  lastName: 'Biden',
  email: 'aidenb@gmail.com',
};


export { mockAppsData, mockUser };
