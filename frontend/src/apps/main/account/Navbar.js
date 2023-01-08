import React from 'react';
import { sharedActions } from '../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Navbar () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className='text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0 z-10'>
      <div
        className="absolute flex items-center space-x-2 cursor-pointer"
        onClick={() => dispatch(sharedActions.popHistory({ navigate }))}
      >
        <span className="icon-back text-2xl ml-2" />
        <span>Back</span>
      </div>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Your Account</span>
    </nav>
  );
}
