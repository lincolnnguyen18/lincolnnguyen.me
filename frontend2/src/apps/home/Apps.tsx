import SnapScrollContainer from 'apps/home/SnapScrollScreen';
import Screen from 'components/Screen';
import React from 'react';
import theme from 'tailwindcss/defaultTheme';
import ScrollListener, { onScrollChangeProps } from 'components/ScrollListener';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';

interface AppsProps {
  apps: React.ReactNode[];
}

export default function Apps ({ apps }: AppsProps) {
  const { root } = useSelector(commonSelector);
  const { screenHeight, screenWidth } = useSelector(commonSelector);
  const [currentPage, setCurrentPage] = React.useState(0);

  let numIconsPerScreen = Math.floor(screenHeight / 170) * 4;
  if (screenWidth <= parseInt(theme.screens.sm)) {
    numIconsPerScreen = Math.floor(screenHeight / 130) * 4;
  }

  // divide apps into groups of numIconsPerScreen
  const appGroups = [];
  for (let i = 0; i < apps.length; i += numIconsPerScreen) {
    appGroups.push(apps.slice(i, i + numIconsPerScreen));
  }

  function onScrollChange (props: onScrollChangeProps) {
    const { scrollLeft } = props;
    const currentPage = Math.floor((scrollLeft + screenWidth / 2) / screenWidth);
    setCurrentPage(currentPage);
  }

  React.useEffect(() => {
    const horizonalScrollClasses = ['snap-x', 'snap-mandatory', 'overflow-x-scroll', 'h-screen'];
    if (screenWidth <= parseInt(theme.screens.sm)) {
      root.classList.add(...horizonalScrollClasses);
    } else {
      root.classList.remove(...horizonalScrollClasses);
    }
    return () => {
      root.classList.remove(...horizonalScrollClasses);
    };
  }, [screenWidth]);

  if (screenWidth <= parseInt(theme.screens.sm)) {
    return (
      <React.Fragment>
        <div className='flex flex-row'>
          {appGroups.map((appGroup, i) => (
            <SnapScrollContainer key={i}>
              <Screen>
                <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-6 pt-2 pb-4'>
                  {appGroup}
                </div>
              </Screen>
            </SnapScrollContainer>
          ))}
        </div>
        <div className='flex flex-row gap-3 justify-center fixed w-screen pointer-events-none mt-8'>
          {appGroups.map((_, i) => (
            <div
              key={i}
              className='bg-white w-2 h-2 rounded-full transition-opacity duration-200 mb-11'
              style={{ opacity: i === currentPage ? 1 : 0.4 }}
            />
          ))}
        </div>
        <ScrollListener target={root} onScrollChange={onScrollChange} scrollTimeout={100} />
      </React.Fragment>
    );
  } else {
    return (
      <Screen>
        <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-6 pt-2 pb-4'>
          {apps}
        </div>
      </Screen>
    );
  }
}
