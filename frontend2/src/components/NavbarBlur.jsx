import React from 'react';
import { twMerge } from 'tailwind-merge';
import { commonActions } from '../slices/commonSlice.js';
import { useDispatch } from 'react-redux';

export function NavbarBlur ({ twStyle }) {
  const dispatch = useDispatch();

  function scrollToTop () {
    dispatch(commonActions.scrollToTop());
  }

  return (
    <div className={twMerge('h-11 w-full fixed backdrop-blur bg-opacity-80 transition-[border-radius] duration-300 z-[1]', twStyle)} onClick={scrollToTop} />
  );
}
