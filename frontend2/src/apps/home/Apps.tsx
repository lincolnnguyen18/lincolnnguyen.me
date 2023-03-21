import SnapScrollContainer from 'apps/home/SnapScrollScreen';
import Screen from 'components/Screen';
import React from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import theme from 'tailwindcss/defaultTheme';

interface AppsProps {
  apps: React.ReactNode[];
}

export default function Apps ({ apps }: AppsProps) {
  const { screenHeight, screenWidth } = useSelector(commonSelector);
  let numIconsPerScreen = Math.floor(screenHeight / 170) * 4;
  if (screenWidth <= parseInt(theme.screens.sm)) {
    numIconsPerScreen = Math.floor(screenHeight / 130) * 4;
  }

  // divide apps into groups of numIconsPerScreen
  const appGroups = [];
  for (let i = 0; i < apps.length; i += numIconsPerScreen) {
    appGroups.push(apps.slice(i, i + numIconsPerScreen));
  }

  return (
    <div className='flex flex-row'>
      {appGroups.map((appGroup, i) => (
        <SnapScrollContainer key={i}>
          <Screen>
            <div className='grid grid-cols-4 grid-flow-row gap-4 place-items-center px-2 pt-2 pb-4'>
              {appGroup}
            </div>
          </Screen>
        </SnapScrollContainer>
      ))}
    </div>
  );
}
