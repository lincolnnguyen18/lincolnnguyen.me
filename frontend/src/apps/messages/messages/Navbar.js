import React from 'react';
import { NavBarContainer } from '../../../components/NavBarContainer';
import { BackButton } from '../../../components/BackButton';

export function Navbar () {
  return (
    <NavBarContainer twStyle="bg-red-custom pl-0.5 pr-2">
      <BackButton linkPath="/messages/contacts" />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Messages</span>
    </NavBarContainer>
  );
}
