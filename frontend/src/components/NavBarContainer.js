import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../slices/sharedSlice';

export function NavBarContainer ({ children, twStyle }) {
  const { sidebar } = useSelector(sharedSelector);
  const overlay = sidebar.state === 'open';

  return (
    <nav className={`text-white max-w-screen-sm w-full mx-auto h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 ${!overlay && 'z-20'} ` + twStyle}>
      {children}
    </nav>
  );
}
