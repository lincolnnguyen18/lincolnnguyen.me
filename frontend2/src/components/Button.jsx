import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function Button ({ twStyle, linkPath, onClick, disabled = false, ...rest }) {
  function handleClick () {
    if (!disabled) {
      onClick && onClick();
    }
  }

  const content = (
    <button
      className={twMerge('select-none cursor-pointer active:opacity-50 transition-opacity duration-75 text-2xl', twStyle, disabled && 'cursor-not-allowed opacity-50')}
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
