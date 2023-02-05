import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function ContainerButton ({ twStyle, disabled = false, linkPath, children, ...rest }) {
  if (linkPath && !disabled) {
    return (
      <Link
        to={linkPath}
        className={twMerge('sm:rounded-xl select-text', !disabled && 'hover:bg-gray-hover active:bg-gray-active active:transition-all active:duration-200', twStyle)}
        {...rest}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={twMerge('sm:rounded-xl select-text', !disabled && 'hover:bg-gray-hover active:bg-gray-active active:transition-all active:duration-200', twStyle)}
        {...rest}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
