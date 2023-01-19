import React from 'react';
import { NavBarContainer } from '../../../components/NavBarContainer';
import { BackButton } from '../../../components/BackButton';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../../slices/messagesSlice';
import { Button } from '../../../components/Button';

export function Navbar () {
  const { selectedContact } = useSelector(messagesSelector);

  return (
    <NavBarContainer twStyle="pl-0.5 pr-2 justify-between">
      <BackButton linkPath="/messages/contacts" />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">
        {selectedContact?.givenName} {selectedContact?.familyName}
      </span>
      <Button twStyle="icon-more-horiz" />
    </NavBarContainer>
  );
}
