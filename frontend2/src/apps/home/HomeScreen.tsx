import React from 'react';
import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';
import ScrollListener from 'components/ScrollListener';

export default function HomeScreen () {
  const [apps, setApps] = React.useState<React.ReactNode[]>([]);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [root, setRoot] = React.useState<HTMLElement | undefined>(undefined);

  React.useEffect(() => {
    const root = document.getElementById('root') as HTMLElement;
    setRoot(root);

    // setup horizontal snap scrolling
    const classes = ['snap-x', 'snap-mandatory', 'overflow-x-scroll', 'h-screen'];
    root.classList.add(...classes);

    // set apps
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

    return () => {
      root.classList.remove(...classes);
    };
  }, []);

  React.useEffect(() => {
    console.log('isScrolling', isScrolling);
  }, [isScrolling]);

  return (
    <React.Fragment>
      <Nav className='text-white justify-center'>
        <span className='font-semibold'>Apps</span>
      </Nav>
      <Apps apps={apps} />
      <div className='flex flex-row gap-3 justify-center fixed bottom-5 w-screen pointer-events-none'>
        <div className='bg-white w-2 h-2 rounded-full bg-opacity-100' />
        <div className='bg-white w-2 h-2 rounded-full bg-opacity-50' />
        <div className='bg-white w-2 h-2 rounded-full bg-opacity-50' />
        <div className='bg-white w-2 h-2 rounded-full bg-opacity-50' />
        <div className='bg-white w-2 h-2 rounded-full bg-opacity-50' />
        <div className='bg-white w-2 h-2 rounded-full bg-opacity-50' />
      </div>
      <ScrollListener target={root} onScrollChange={setIsScrolling} />
    </React.Fragment>
  );
}
