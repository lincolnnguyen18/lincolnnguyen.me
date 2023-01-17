import React from 'react';
import { useDispatch } from 'react-redux';
import { sharedActions } from '../../../slices/sharedSlice';
import { NavBarContainer } from '../../../components/NavBarContainer';
import { Button } from '../../../components/Button';

export function Navbar () {
  const dispatch = useDispatch();

  return (
    <NavBarContainer twStyle="bg-purple-custom justify-between px-3">
      <Button twStyle="icon-menu" onClick={() => dispatch(sharedActions.openSidebar())} />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Transcriptions</span>
      <div className="flex items-center space-x-4">
        <Button
          twStyle="icon-add text-2xl cursor-pointer"
          linkPath="test"
        />
      </div>
    </NavBarContainer>
  );
}
