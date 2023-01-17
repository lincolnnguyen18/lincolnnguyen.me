import React from 'react';
import { sharedActions } from '../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { NavBarContainer } from '../../../components/NavBarContainer';
export function Navbar () {
  const dispatch = useDispatch();

  return (
    <NavBarContainer twStyle="bg-green-custom px-2">
      <span
        className="icon-menu text-2xl cursor-pointer"
        onClick={() => dispatch(sharedActions.openSidebar())}
      />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
    </NavBarContainer>
  );
}
