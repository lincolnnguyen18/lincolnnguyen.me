import React from 'react';
import { sharedActions, sharedSelector } from '../../../../slices/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPreviousScreen } from '../../../../shared/utils/stateUtils';
export function Navbar () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { history } = useSelector(sharedSelector);

  function onBackClick (e) {
    e.preventDefault();
    dispatch(sharedActions.popHistory());
    navigate(getPreviousScreen(history).path);
  }

  return (
    <nav className='text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0 z-10'>
      <div
        className="absolute flex items-center space-x-2 cursor-pointer"
        onClick={onBackClick}
      >
        <span className="icon-back text-2xl ml-2" />
        <span>Back</span>
      </div>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Your Account</span>
    </nav>
  );
}
