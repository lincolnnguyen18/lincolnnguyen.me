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
    <nav className="text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between px-2 fixed top-0 z-10">
      <span
        className="icon-menu text-2xl ml-2 cursor-pointer"
        onClick={onOpenSidebar}
      />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
    </nav>
  );
}
