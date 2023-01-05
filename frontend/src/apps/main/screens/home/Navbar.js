import React from 'react';
import { sharedActions } from '../../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
export function Navbar () {
  const dispatch = useDispatch();

  function onOpenSidebar (e) {
    e.preventDefault();
    dispatch(sharedActions.setSlice({ sidebarPosition: '0' }));
  }

  return (
    <nav className="bg-green-custom text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between px-2 fixed top-0">
      <div className="flex items-center space-x-4">
        <span
          className="icon-menu text-2xl ml-2 cursor-pointer"
          onClick={onOpenSidebar}
        />
        <span>Apps</span>
      </div>
    </nav>
  );
}
