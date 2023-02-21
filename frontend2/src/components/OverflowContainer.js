import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../slices/commonSlice.js';

export function OverflowContainer ({ children, twStyle }) {
  const dispatch = useDispatch();
  const { browser } = useSelector(commonSelector);

  function handleScroll (e) {
    dispatch(commonActions.setSlice({ scrollPosition: e.target.scrollTop }));
  }

  if (browser?.os.startsWith('iOS') || browser?.name.startsWith('safari')) {
    return (
      <div className="overflow-y-scroll fixed top-0 bottom-0 left-0 right-0" onScroll={handleScroll} id="overflow-container">
        <div className={twMerge('max-w-screen-sm mx-auto w-full sm:px-2 pt-14 pb-3 flex flex-col', twStyle)}>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 relative overflow-y-auto" onScroll={handleScroll} id="overflow-container">
        <div className={twMerge('max-w-screen-sm mx-auto w-full sm:px-2 pt-14 pb-3 flex flex-col', twStyle)}>
          {children}
        </div>
      </div>
    );
  }
}
