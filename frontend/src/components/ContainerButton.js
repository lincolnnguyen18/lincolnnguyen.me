import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function ContainerButton ({ className, disabled = false, linkPath, children, ...rest }) {
  if (linkPath && !disabled) {
    return (
      <Link
        to={linkPath}
        className={twMerge('sm:rounded-xl select-text', !disabled && 'hover:bg-gray-hover active:bg-gray-active active:transition-all active:duration-200', className)}
        {...rest}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={twMerge('sm:rounded-xl select-text', !disabled && 'hover:bg-gray-hover active:bg-gray-active active:transition-all active:duration-200', className)}
        {...rest}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
