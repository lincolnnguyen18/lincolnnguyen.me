import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../../slices/commonSlice';
import { NavbarButton } from '../../components/NavbarButton';

export function Alert () {
  const dispatch = useDispatch();
  const { alertOpen, alertTitle, alertMessage } = useSelector(commonSelector);

  function handleClose () {
    dispatch(commonActions.setSlice({ alertOpen: false }));
  }

  return (
    <>
      <div
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur-sm transition-[opacity] z-[2] transition-all duration-200 cursor-pointer'
        style={{ opacity: alertOpen ? 1 : 0, pointerEvents: alertOpen ? 'all' : 'none', backgroundColor: 'rgba(0,0,0,0.55)' }}
      />
      <div
        // className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 z-[2] justify-center transition-all duration-100 w-full"
        className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-9 z-[2] justify-center transition-all duration-100 w-full"
        style={{
          opacity: !alertOpen ? 0 : 1,
          pointerEvents: !alertOpen ? 'none' : 'auto',
        }}
      >
        <div className="flex flex-col w-full text-white items-center">
          <div className="w-full max-w-md">
            <span className="font-semibold sm:text-lg text-base">{alertTitle}</span>
            <div className="bg-black bg-opacity-50 rounded-lg w-full flex flex-col mb-6 mt-2 py-2 px-3">
              <span>{alertMessage}</span>
            </div>
          </div>
          <NavbarButton onClick={handleClose} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="single">Close</NavbarButton>
        </div>
      </div>
    </>
  );
}
