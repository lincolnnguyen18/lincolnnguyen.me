import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function NavMenuButton ({ twStyle, linkPath, children, ...rest }) {
  if (linkPath) {
    return (
      <Link
        to={linkPath}
        className={twMerge('text-white h-12 cursor-pointer active:transition-all active:duration-200 flex items-center p-2 gap-2 rounded-lg bg-black bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-75 w-48', twStyle)}
        {...rest}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={twMerge('text-white h-12 cursor-pointer active:transition-all active:duration-200 flex items-center p-2 gap-2 rounded-lg bg-black bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-75 w-48', twStyle)}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
