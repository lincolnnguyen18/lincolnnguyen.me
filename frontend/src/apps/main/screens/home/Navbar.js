import React from 'react';
export function Navbar () {
  return (
    <nav className="bg-green-custom text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between px-2 fixed top-0">
      <div className="flex items-center space-x-4">
        <span className="icon-menu text-2xl ml-2 cursor-pointer"></span>
        <span>Apps</span>
      </div>
      <div className="flex items-center space-x-4 mr-1">
        <span className="icon-search text-2xl cursor-pointer"></span>
      </div>
    </nav>
  );
}
