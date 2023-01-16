import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar () {
  return (
    <nav className="text-white max-w-screen-sm w-full mx-auto h-11 flex justify-between items-center fixed top-0 z-10 pr-2">
      <Link
        className="flex items-center space-x-2 cursor-pointer"
        to="/transcribe/transcriptions"
      >
        <span className="icon-back text-2xl ml-2" />
        <span>Back</span>
      </Link>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Unsaved</span>
      <span className="icon-more-horiz text-2xl cursor-pointer" />
    </nav>
  );
}
