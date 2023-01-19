import React from 'react';
import { sharedActions } from '../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { NavBarContainer } from '../../../components/NavBarContainer';
import { Button } from '../../../components/Button';
export function Navbar () {
  const dispatch = useDispatch();

  return (
    <NavBarContainer twStyle="px-3">
      <Button twStyle="icon-menu" onClick={() => dispatch(sharedActions.openSidebar())} />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
    </NavBarContainer>
  );
}
