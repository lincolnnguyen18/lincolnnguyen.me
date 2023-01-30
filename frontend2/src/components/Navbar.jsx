import React from 'react';

export function Navbar ({ children, twStyle }) {
  return (
    <nav className={`text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between ${twStyle}`}>
      {children}
    </nav>
  );
}
