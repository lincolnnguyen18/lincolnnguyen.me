import React from 'react';
import { sharedActions } from '../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavBarContainer } from '../../../components/NavBarContainer';

export function Navbar () {
  const dispatch = useDispatch();

  return (
    <NavBarContainer twStyle="bg-red-custom pl-0.5 pr-2">
      <Link
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => dispatch(sharedActions.popHistory())}
        to="/messages/contacts"
      >
        <span className="icon-back text-2xl " />
        <span>Back</span>
      </Link>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Messages</span>
    </NavBarContainer>
  );
}
