import React from 'react';
import { sharedActions, sharedSelector } from '../slices/sharedSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Toast () {
  const dispatch = useDispatch();
  const { toast } = useSelector(sharedSelector);

  function onToastClose () {
    dispatch(sharedActions.closeToast());
  }

  return (
    <div
      className='fixed mx-auto left-0 right-0 flex flex-row justify-center items-center transition-all duration-300 pointer-events-none drop-shadow'
      style={{ top: toast.position }}
    >
      <div className="bg-red-custom max-w-fit text-white py-1 px-3 rounded flex flex-row items-center gap-3 pointer-events-auto">
        <span>{toast?.message}</span>
        <span className="icon-close text-2xl cursor-pointer" onClick={onToastClose} />
      </div>
    </div>
  );
}
