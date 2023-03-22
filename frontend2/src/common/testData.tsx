import AppIcon from 'apps/home/AppIcon';
import { User } from 'slices/commonAsyncActions';

const testApps = [
  ...Array.from({ length: 10 }).map((_, i) => (
    <AppIcon abbreviation='TV' name='TV Schedules' className='bg-tv-schedules-app-color' path="/" key={i} />
  )),
  ...Array.from({ length: 37 }).map((_, i) => (
    <AppIcon abbreviation='AB' name='Aiden B' className='bg-blue-400' path="/" key={i} />
  )),
  ...Array.from({ length: 30 }).map((_, i) => (
    <AppIcon abbreviation='AB' name='Aiden B' className='bg-green-400' path="/" key={i} />
  )),
];

const testUser: User = {
  id: 'uuid',
  firstName: 'Aiden',
  lastName: 'Biden',
  email: 'aidenb@gmail.com',
};


export { testApps, testUser };
