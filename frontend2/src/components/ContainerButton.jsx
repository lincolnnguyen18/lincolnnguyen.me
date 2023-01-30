import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function ContainerButton ({ twStyle, linkPath, children, ...rest }) {
  if (linkPath) {
    return (
      <Link
        to={linkPath}
        className={twMerge('hover:bg-gray-hover cursor-pointer active:bg-gray-active active:transition-all active:duration-200 sm:rounded-xl', twStyle)}
        {...rest}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={twMerge('hover:bg-gray-hover cursor-pointer active:bg-gray-active active:transition-all active:duration-200 sm:rounded-xl', twStyle)}
        {...rest}
      >
        {children}
      </button>
    );
  }
}