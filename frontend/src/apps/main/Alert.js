import React from 'react';
import { useDispatch } from 'react-redux';
import { StyledButton } from '../../components/StyledButton';
import { commonActions } from '../../slices/commonSlice';

export function Alert ({ title = 'Error', message }) {
  const dispatch = useDispatch();

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  return (
    <div className='flex flex-col w-full text-white items-center'>
      <div className='w-full max-w-md'>
        <span className='font-semibold sm:text-lg text-base'>{title}</span>
        <div className='bg-black bg-opacity-50 rounded-lg w-full flex flex-col mb-6 mt-2 py-2 px-3'>
          <span>{message}</span>
        </div>
      </div>
      <StyledButton onClick={handleClose} className='justify-center' outerClassName='sm:w-48 w-36' dir='single'>Close</StyledButton>
    </div>
  );
}
