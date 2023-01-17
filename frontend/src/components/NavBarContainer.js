import React from 'react';

export function NavBarContainer ({ children, twStyle }) {
  return (
    <nav className={'text-white max-w-screen-sm w-full mx-auto h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 z-10 ' + twStyle}>
      {children}
    </nav>
  );
}
