import React from 'react';
import { NavBarContainer } from '../../../components/NavBarContainer';
import { BackButton } from '../../../components/BackButton';
import { Button } from '../../../components/Button';

export function Navbar () {
  return (
    <NavBarContainer twStyle="bg-purple-custom justify-between pr-2 pl-0.5">
      <BackButton linkPath="/transcribe/transcriptions" />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Unsaved</span>
      <Button twStyle="icon-more-horiz" />
    </NavBarContainer>
  );
}
