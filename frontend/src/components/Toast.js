import React from 'react';
import { sharedActions, sharedSelector } from '../slices/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Toast () {
  const dispatch = useDispatch();
  const { toast } = useSelector(sharedSelector);

  function onToastClose () {
    dispatch(sharedActions.closeToast());
  }

  function getToastPosition () {
    return toast?.state === 'visible' ? '0' : '-32rem';
  }

  return (
    <div
      className='fixed top-16 mx-auto left-0 right-0 flex flex-row justify-center items-center transition-transform duration-300 pointer-events-none drop-shadow'
      style={{ transform: `translateY(${getToastPosition()})` }}
    >
      <div className="bg-red-custom max-w-fit text-white py-1 px-3 rounded flex flex-row items-center space-x-3 pointer-events-auto">
        <span>{toast?.message}</span>
        <span className="icon-close text-2xl cursor-pointer" onClick={onToastClose} />
      </div>
    </div>
  );
}
