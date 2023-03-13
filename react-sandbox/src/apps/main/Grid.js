import React from 'react';
import { useSelector } from 'react-redux';
import { OverflowContainer } from '../../components/OverflowContainer';
import { commonSelector } from '../../slices/commonSlice';

export function Grid ({ children }) {
  const { browser } = useSelector(commonSelector);

  if (!browser?.os.startsWith('Android')) {
    return (
      <OverflowContainer twStyle="p-0">
        <div className="max-w-screen-sm w-full mx-auto grid grid-cols-4 grid-flow-row gap-4 place-items-center w-full px-2 pt-12 pb-4">
          {children}
        </div>
      </OverflowContainer>
    );
  } else {
    return (
      <div className="fixed left-0 right-0 top-0 bottom-0 overflow-x-scroll">
        <div className="w-fit px-4">
          <div className="grid grid-rows-4 grid-flow-col gap-4 place-items-center pt-12 pb-4">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
