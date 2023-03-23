import AppIcon from 'apps/home/AppIcon';
import { Colors } from 'common/data';
import { User } from 'slices/commonAsyncActions';
import { uuid } from 'utils/miscUtils';

const mockApps = [
  ...Array.from({ length: 10 }).map(() => (
    <AppIcon
      abbreviation='TV'
      name='TV Schedules'
      style={{ backgroundColor: Colors.TvSchedulesApp }}
      to='/'
      key={uuid()}
    />
  )),
  ...Array.from({ length: 37 }).map(() => (
    <AppIcon
      abbreviation='AB'
      name='Aiden B'
      className='bg-[#BB6565]'
      to='/'
      key={uuid()}
    />
  )),
  ...Array.from({ length: 30 }).map(() => (
    <AppIcon
      abbreviation='AB'
      name='Aiden B'
      className='bg-[#65BB7C]'
      to='/'
      key={uuid()}
    />
  )),
];

const mockUser: User = {
  id: 'uuid',
  firstName: 'Aiden',
  lastName: 'Biden',
  email: 'aidenb@gmail.com',
};


export { mockApps, mockUser };
