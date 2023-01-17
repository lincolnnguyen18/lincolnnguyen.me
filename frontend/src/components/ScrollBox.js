import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../slices/sharedSlice';
import { screenSizes } from '../shared/clients';

export function ScrollBox ({ children }) {
  const { screenWidth, scrollboxTop, scrollboxBottom } = useSelector(sharedSelector);

  console.log(screenSizes);
  if (screenWidth >= screenSizes.xl) {
    return (
      <div
        className='flex flex-col overflow-y-scroll w-full'
      >
        <div style={{ height: scrollboxTop }} className="w-full flex flex-shrink-0"></div>
        {children}
        <div style={{ height: scrollboxBottom }} className="w-full flex flex-shrink-0"></div>
      </div>
    );
  } else {
    return (
      <div
        className="fixed overflow-y-scroll left-0 right-0"
        style={{ top: scrollboxTop, bottom: scrollboxBottom }}
      >
        {children}
      </div>
    );
  }
}
