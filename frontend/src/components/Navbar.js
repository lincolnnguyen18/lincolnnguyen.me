import React from 'react';

export function Navbar ({ children, className }) {
  // const dispatch = useDispatch();

  // function scrollToTop () {
  //   dispatch(commonActions.scrollToTop());
  // }

  return (
    <nav className={`text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 pr-3 pl-1 z-[1] justify-between ${className}`}>
      {children}
    </nav>
  );
}
