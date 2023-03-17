import React from 'react';
import { StyledButton } from '../../components/StyledButton';
import { GroupDivider } from '../../components/GroupDivider';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../slices/commonSlice';

export function Confirm ({ title = 'Please Confirm', message, onConfirm }) {
  const dispatch = useDispatch();
  const [confirmed, setConfirmed] = React.useState(false);

  function handleConfirm () {
    setConfirmed(true);
    onConfirm();
  }

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  return (
    <div className='flex flex-col w-full text-white items-center'>
      <div className='w-full max-w-md'>
        <span className='font-semibold sm:text-lg text-base'>{title}</span>
        <div className='bg-black bg-opacity-50 rounded-lg w-full flex-col mb-6 mt-2 py-2 px-3'>
          <span>{message}</span>
        </div>
      </div>
      <div className='flex'>
        <StyledButton disabled={confirmed} onClick={handleClose} className='justify-center' outerClassName='sm:w-48 w-36' dir='horiz'>Cancel</StyledButton>
        <GroupDivider dir='horiz w-36' />
        <StyledButton onClick={handleConfirm} className='justify-center' outerClassName='sm:w-48 w-36' dir='horiz' type='submit' disabled={confirmed}>Confirm</StyledButton>
      </div>
    </div>
  );
}
