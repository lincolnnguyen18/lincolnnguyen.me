import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

export function NavbarGroupButton ({ children, twStyle, linkPath, outerTwStyle, stopPropagation = false, onClick, disabled = false, dir = 'vert', ...rest }) {
  function handleClick (e) {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (!disabled) {
      onClick && onClick();
    }
  }

  if (linkPath && !disabled) {
    return (
      <Link to={linkPath} className={twMerge('h-12 px-2 bg-black bg-opacity-50 w-48 cursor-pointer hover:bg-opacity-60 active:bg-opacity-75 active:transition-all active:duration-200 flex items-center', dir === 'vert' && 'first:rounded-t-lg last:rounded-b-lg', dir === 'horiz' && 'first:rounded-l-lg last:rounded-r-lg', outerTwStyle, disabled && 'hover:bg-opacity-50 cursor-not-allowed active:bg-opacity-50')} {...rest}>
        <div className={twMerge(disabled && 'opacity-50', 'flex items-center gap-2', twStyle)}>
          {children}
        </div>
      </Link>
    );
  } else {
    return (
      <button className={twMerge('h-12 px-2 bg-black bg-opacity-50 w-48 cursor-pointer hover:bg-opacity-60 active:bg-opacity-75 active:transition-all active:duration-200', dir === 'vert' && 'first:rounded-t-lg last:rounded-b-lg', dir === 'horiz' && 'first:rounded-l-lg last:rounded-r-lg', outerTwStyle, disabled && 'hover:bg-opacity-50 cursor-not-allowed active:bg-opacity-50')} type="button" onClick={handleClick} {...rest}>
        <div className={twMerge(disabled && 'opacity-50', 'flex items-center gap-2', twStyle)}>
          {children}
        </div>
      </button>
    );
  }
}
