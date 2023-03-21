import React from 'react';
import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';

export default function HomeScreen () {
  const [apps, setApps] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    setApps([
      ...Array.from({ length: 30 }).map((_, i) => (
        <AppIcon abbreviation='AB' name='Aiden B' className='bg-red-400' key={i} />
      )),
      ...Array.from({ length: 37 }).map((_, i) => (
        <AppIcon abbreviation='AB' name='Aiden B' className='bg-blue-400' key={i} />
      )),
      ...Array.from({ length: 30 }).map((_, i) => (
        <AppIcon abbreviation='AB' name='Aiden B' className='bg-green-400' key={i} />
      )),
    ]);
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
