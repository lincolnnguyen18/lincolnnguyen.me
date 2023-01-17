import React from 'react';
import { sharedActions, sharedSelector } from '../../../slices/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavBarContainer } from '../../../components/NavBarContainer';

export function Navbar () {
  const dispatch = useDispatch();
  const { history } = useSelector(sharedSelector);

  return (
    <NavBarContainer twStyle="bg-red-custom pl-0.5 pr-2 justify-between">
      <Link
        className="absolute flex items-center space-x-2 cursor-pointer"
        onClick={() => dispatch(sharedActions.popHistory())}
        to={history[history.length - 2]?.path || '/'}
      >
        <span className="icon-back text-2xl" />
        <span>Back</span>
      </Link>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Your Account</span>
    </NavBarContainer>
  );
}
