import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function Button ({ className, linkPath, onClick, disabled = false, stopPropagation = true, ...rest }) {
  function handleClick (e) {
    if (!disabled && !linkPath) {
      if (stopPropagation) e.stopPropagation();
      onClick && onClick();
    }
  }

  const content = (
    <button
      className={twMerge('select-none cursor-pointer active:opacity-50 transition-opacity duration-75 text-2xl flex items-center', className, disabled && 'cursor-not-allowed opacity-50')}
      onClick={handleClick}
      {...rest}
    />
  );

  if (linkPath && !disabled) {
    return (
      <Link to={linkPath}>
        {content}
      </Link>
    );
  } else {
    return content;
  }
}
