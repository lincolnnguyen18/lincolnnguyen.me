import React from 'react';
import { sharedActions, sharedSelector } from '../../../slices/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Navbar () {
  const dispatch = useDispatch();
  const { history } = useSelector(sharedSelector);

  return (
    <nav className='text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0 z-10'>
      <Link
        className="absolute flex items-center space-x-2 cursor-pointer"
        onClick={() => dispatch(sharedActions.popHistory())}
        to={history[history.length - 2]?.path || '/'}
      >
        <span className="icon-back text-2xl ml-2" />
        <span>Back</span>
      </Link>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Your Account</span>
    </nav>
  );
}
