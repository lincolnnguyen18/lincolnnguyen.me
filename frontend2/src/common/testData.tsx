import AppIcon from 'apps/home/AppIcon';
import { User } from 'slices/commonAsyncActions';
import { uuid } from 'utils/miscUtils';

const testApps = [
  ...Array.from({ length: 10 }).map(() => (
    <AppIcon
      abbreviation='TV'
      name='TV Schedules'
      className='bg-tv-schedules-app-color'
      to='/'
      key={uuid()}
    />
  )),
  ...Array.from({ length: 37 }).map(() => (
    <AppIcon
      abbreviation='AB'
      name='Aiden B'
      className='bg-blue-400'
      to='/'
      key={uuid()}
    />
  )),
  ...Array.from({ length: 30 }).map(() => (
    <AppIcon
      abbreviation='AB'
      name='Aiden B'
      className='bg-green-400'
      to='/'
      key={uuid()}
    />
  )),
];

const testUser: User = {
  id: 'uuid',
  firstName: 'Aiden',
  lastName: 'Biden',
  email: 'aidenb@gmail.com',
};


export { testApps, testUser };
