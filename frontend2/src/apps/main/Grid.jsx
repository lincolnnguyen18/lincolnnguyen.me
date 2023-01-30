import React from 'react';
import theme from 'tailwindcss/defaultTheme.js';
import { useSelector } from 'react-redux';
import { commonSelector } from '../../slices/commonSlice.js';

export function Grid ({ children }) {
  const { windowValues } = useSelector(commonSelector);

  if (windowValues.width > parseInt(theme.screens.sm)) {
    return (
      <div className="overflow-y-scroll fixed top-0 bottom-0 left-0 right-0 sm:relative sm:overflow-y-auto">
        <div className="max-w-screen-sm w-full mx-auto grid grid-cols-4 grid-flow-row gap-4 place-items-center w-full px-2 pt-12 pb-4">
          {children}
        </div>
      </div>
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
