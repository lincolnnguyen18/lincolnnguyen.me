import AppIcon from 'apps/home/AppIcon';

function getTestApps (): React.ReactNode[] {
  return [
    ...Array.from({ length: 10 }).map((_, i) => (
      <AppIcon abbreviation='TV' name='TV Schedules' className='bg-tv-schedules-app-color' key={i} />
    )),
    ...Array.from({ length: 37 }).map((_, i) => (
      <AppIcon abbreviation='AB' name='Aiden B' className='bg-blue-400' key={i} />
    )),
    ...Array.from({ length: 30 }).map((_, i) => (
      <AppIcon abbreviation='AB' name='Aiden B' className='bg-green-400' key={i} />
    )),
  ];

}

export { getTestApps };
