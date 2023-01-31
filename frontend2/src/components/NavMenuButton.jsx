import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function NavMenuButton ({ twStyle, linkPath, children, ...rest }) {
  if (linkPath) {
    return (
      <Link
        to={linkPath}
        className={twMerge('hover:bg-gray-hover cursor-pointer active:bg-gray-active active:transition-all active:duration-200 sm:rounded-xl', 'flex items-center p-2 gap-2 sm:rounded-lg rounded-lg bg-black bg-opacity-50 active:bg-black hover:bg-black hover:bg-opacity-60 active:bg-opacity-75 w-48', twStyle)}
        {...rest}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={twMerge('hover:bg-gray-hover cursor-pointer active:bg-gray-active active:transition-all active:duration-200 sm:rounded-xl', 'flex items-center p-2 gap-2 sm:rounded-lg rounded-lg bg-black bg-opacity-50 active:bg-black hover:bg-black hover:bg-opacity-60 active:bg-opacity-75 w-48', twStyle)}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
