import React from 'react';
import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';

export default function HomeScreen () {
  const [apps, setApps] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    const apps = [
      <AppIcon abbreviation='TV' name='TV Schedules' className='bg-tv-schedules-app-color' />,
    ];
    setApps(apps);
  }, []);

  return (
    <React.Fragment>
      <Nav className='text-white justify-center'>
        <span className='font-semibold'>Apps</span>
      </Nav>
      <Apps apps={apps} />
    </React.Fragment>
  );
}
