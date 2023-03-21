import React from 'react';
import Nav from 'components/Nav';
import Screen from 'components/Screen';
import SnapScrollContainer from 'apps/home/SnapScrollScreen';
import AppIcon from 'apps/home/AppIcon';
import theme from 'tailwindcss/defaultTheme';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';

export default function HomeScreen () {
  const { screenHeight, screenWidth } = useSelector(commonSelector);
  let numIconsPerScreen = Math.floor(screenHeight / 170) * 4;
  if (screenWidth <= parseInt(theme.screens.sm)) {
    numIconsPerScreen = Math.floor(screenHeight / 130) * 4;
  }

  React.useEffect(() => {
    const root = document.getElementById('root') as HTMLElement;
    const classes = ['snap-x', 'snap-mandatory', 'overflow-x-scroll', 'h-screen'];
    root.classList.add(...classes);
    return () => {
      root.classList.remove(...classes);
    };
  }, []);

  return (
    <React.Fragment>
      <Nav className='text-white justify-center'>
        <span className='font-semibold'>Apps</span>
      </Nav>
      <div className='flex flex-row'>
        <SnapScrollContainer>
          <Screen>
            <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-2 pt-2 pb-4'>
              {Array.from({ length: numIconsPerScreen }).map((_, i) => (
                <AppIcon abbreviation='AB' name='Aiden B' className='bg-red-400' key={i} />
              ))}
            </div>
          </Screen>
        </SnapScrollContainer>
        <SnapScrollContainer>
          <Screen>
            <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-2 pt-2 pb-4'>
              {Array.from({ length: numIconsPerScreen }).map((_, i) => (
                <AppIcon abbreviation='AB' name='Aiden B' className='bg-blue-400' key={i} />
              ))}
            </div>
          </Screen>
        </SnapScrollContainer>
        <SnapScrollContainer>
          <Screen>
            <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-2 pt-2 pb-4'>
              {Array.from({ length: numIconsPerScreen }).map((_, i) => (
                <AppIcon abbreviation='AB' name='Aiden B' className='bg-green-400' key={i} />
              ))}
            </div>
          </Screen>
        </SnapScrollContainer>
      </div>
    </React.Fragment>
  );
}
