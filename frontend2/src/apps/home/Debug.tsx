import React from 'react';
import environment from 'common/environment';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';

export default function Debug (): JSX.Element | null {
  const { scrollPositionFromTop, scrollPositionFromBottom } = useSelector(commonSelector);

  if (environment.showDebug) {
    return (
      <div className='bg-black bg-opacity-70 fixed top-0 left-0 p-2 text-white z-50'>
        <div>scrollPositionFromTop: {scrollPositionFromTop}</div>
        <div>scrollDistanceFromBottom: {scrollPositionFromBottom}</div>
      </div>
    );
  } else {
    return null;
  }
}
