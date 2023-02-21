import React from 'react';
import { useDispatch } from 'react-redux';
import { commonActions } from '../slices/commonSlice.js';

export function Navbar ({ children, twStyle }) {
  const dispatch = useDispatch();

  function scrollToTop () {
    dispatch(commonActions.scrollToTop());
  }

  return (
    <nav className={`text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between ${twStyle}`} onClick={scrollToTop}>
      {children}
    </nav>
  );
}
