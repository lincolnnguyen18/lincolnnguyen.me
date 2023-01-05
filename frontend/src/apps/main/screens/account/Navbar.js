import React from 'react';
import { sharedActions, sharedSelector } from '../../../../slices/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPreviousScreen } from '../../../../shared/utils/navUtils';
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
    <nav className={`${getPreviousScreen(history).color} text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0`}>
      <div
        className="absolute flex items-center space-x-2 cursor-pointer"
        onClick={onBackClick}
      >
        <span className="icon-back text-2xl ml-2" />
        <span>Back</span>
      </div>
      <div className="flex items-center w-full justify-center">
        <span className="font-semibold">Your Account</span>
      </div>
    </nav>
  );
}
