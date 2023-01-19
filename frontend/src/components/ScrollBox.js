import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../slices/sharedSlice';
import { screenSizes } from '../shared/clients';

export function ScrollBox ({ children }) {
  const { screenWidth, scrollboxTop, scrollboxBottom } = useSelector(sharedSelector);

  if (screenWidth >= screenSizes.xl) {
    return (
      <div
        className='flex flex-col w-full'
      >
        <div style={{ height: scrollboxTop }} className="w-full flex flex-shrink-0"></div>
        {children}
        <div style={{ height: scrollboxBottom }} className="w-full flex flex-shrink-0"></div>
      </div>
    );
  } else {
    return (
      // <div
      //   className="fixed overflow-y-scroll left-0 right-0 top-0 bottom-0"
      //   style={{ paddingTop: scrollboxTop, paddingBottom: scrollboxBottom }}
      // >
      //   {children}
      // </div>
      <div
        className='flex flex-col w-full'
      >
        <div style={{ height: scrollboxTop }} className="w-full flex flex-shrink-0"></div>
        {children}
        <div style={{ height: scrollboxBottom }} className="w-full flex flex-shrink-0"></div>
      </div>
    );
  }
}
