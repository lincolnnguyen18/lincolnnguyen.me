import React from 'react';
import { Link } from 'react-router-dom';
import { NavBarContainer } from '../../../components/NavBarContainer';

export function Navbar () {
  return (
    <NavBarContainer twStyle="bg-purple-custom justify-between pr-2 pl-0.5">
      <Link
        className="flex items-center space-x-2 cursor-pointer"
        to="/transcribe/transcriptions"
      >
        <span className="icon-back text-2xl" />
        <span>Back</span>
      </Link>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Unsaved</span>
      <span className="icon-more-horiz text-2xl cursor-pointer" />
    </NavBarContainer>
  );
}
