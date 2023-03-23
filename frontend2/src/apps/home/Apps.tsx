import SnapScrollContainer from 'apps/home/SnapScrollContainer';
import LimitWidthContainer from 'components/LimitWidthContainer';
import ScrollListener, { onScrollChangeProps } from 'components/ScrollListener';
import { screens } from 'tailwindcss/defaultTheme';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import { Fragment, useEffect, useRef, useState } from 'react';

interface Props {
  apps: React.ReactNode[];
}

export default function Apps (props: Props) {
  const { apps } = props;
  const { screenHeight, screenWidth } = useSelector(commonSelector);
  const [currentPage, setCurrentPage] = useState(0);
  const [appGroups, setAppGroups] = useState<React.ReactNode[][]>([]);
  const horizontalScrollContainer = useRef<HTMLDivElement>(null);

  function onScrollChange (props: onScrollChangeProps) {
    const { scrollLeft } = props;
    const currentPage = Math.floor((scrollLeft + screenWidth / 2) / screenWidth);
    setCurrentPage(currentPage);
  }

  // divide apps into groups of numIconsPerScreen
  useEffect(() => {
    let numIconsPerScreen = Math.floor(screenHeight / 170) * 4;
    if (screenWidth <= parseInt(screens.sm)) {
      numIconsPerScreen = Math.floor(screenHeight / 130) * 4;
    }

    const appGroups = [];
    for (let i = 0; i < apps.length; i += numIconsPerScreen) {
      appGroups.push(apps.slice(i, i + numIconsPerScreen));
    }

    if (appGroups.length === 1) {
      appGroups.push([]);
    }

    setAppGroups(appGroups);
  }, [screenHeight, screenWidth, apps]);

  // scroll horizontally on mobile
  if (screenWidth <= parseInt(screens.sm)) {
    return (
      <Fragment>
        <div
          className='fixed top-0 bottom-0 left-0 right-0 snap-x snap-mandatory overflow-x-scroll flex flex-row'
          ref={horizontalScrollContainer}
        >
          {appGroups.map((appGroup, i) => (
            <SnapScrollContainer key={i}>
              <LimitWidthContainer>
                <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-6 pt-2 pb-4'>
                  {appGroup}
                </div>
              </LimitWidthContainer>
            </SnapScrollContainer>
          ))}
        </div>
        <div className='flex flex-row gap-3 justify-center fixed w-screen pointer-events-none bottom-0'>
          {appGroups.map((_, i) => (
            <div
              key={i}
              className='bg-white w-2 h-2 rounded-full transition-opacity duration-200 mb-5'
              style={{ opacity: i === currentPage ? 1 : 0.4 }}
            />
          ))}
        </div>
        <ScrollListener
          target={horizontalScrollContainer.current}
          onScrollChange={onScrollChange}
          scrollTimeout={100}
        />
      </Fragment>
    );
  // scroll vertically on desktop
  } else {
    return (
      <LimitWidthContainer>
        <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-6 pt-2 pb-4'>
          {apps}
        </div>
      </LimitWidthContainer>
    );
  }
}
