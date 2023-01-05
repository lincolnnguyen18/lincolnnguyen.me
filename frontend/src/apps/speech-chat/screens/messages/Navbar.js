import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export function Navbar () {
  const location = useLocation();
  const navigate = useNavigate();

  function onBackClick (e) {
    e.preventDefault();
    const path = location.pathname.split('/');
    path.pop();
    navigate(path.join('/'));
  }

  return (
    <nav className="bg-red-custom text-white max-w-screen-sm w-full mx-auto h-11 flex items-center fixed top-0">
      <div
        className="absolute flex items-center space-x-2 cursor-pointer"
        onClick={onBackClick}
      >
        <span className="icon-back text-2xl ml-2" />
        <span>Back</span>
      </div>
      <div className="flex items-center w-full justify-center">
        <span className="font-semibold">Messages</span>
      </div>
    </nav>
  );
}
