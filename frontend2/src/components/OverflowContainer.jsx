import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useDispatch } from 'react-redux';
import { commonActions } from '../slices/commonSlice.js';

export function OverflowContainer ({ children, twStyle }) {
  const dispatch = useDispatch();

  function handleScroll (e) {
    dispatch(commonActions.setSlice({ scrollPosition: e.target.scrollTop }));
  }

  return (
    <div className="overflow-y-scroll fixed top-0 bottom-0 left-0 right-0 sm:relative sm:overflow-y-auto" onScroll={handleScroll} id="overflow-container">
      <div className={twMerge('max-w-screen-sm mx-auto w-full sm:px-2 pt-14 pb-3 flex flex-col', twStyle)}>
        {children}
      </div>
    </div>
  );
}
