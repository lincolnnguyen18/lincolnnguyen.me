import React from 'react';
import { sharedSelector } from '../../../slices/sharedSlice';
import { NavBarContainer } from '../../../components/NavBarContainer';
import { getPreviousScreen } from '../../../shared/utils/stateUtils';
import { useSelector } from 'react-redux';
import { BackButton } from '../../../components/BackButton';

export function Navbar () {
  const { history } = useSelector(sharedSelector);

  function getNavColor () {
    const previousScreen = getPreviousScreen(history);
    return previousScreen.color;
  }

  return (
    <NavBarContainer twStyle={`pl-0.5 pr-2 justify-between ${getNavColor()}`}>
      <BackButton automaticBack={true} />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Your Account</span>
    </NavBarContainer>
  );
}
