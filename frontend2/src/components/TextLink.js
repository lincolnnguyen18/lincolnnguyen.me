import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function TextLink ({ to, children, twStyle, ...props }) {
  if (to) {
    return (
      <Link to={to} {...props} className={twMerge('underline active:brightness-150 font-semibold transition-all duration-100', twStyle)}>
        {children}
      </Link>
    );
  } else {
    return (
      <button {...props} className={twMerge('underline active:brightness-150 font-semibold transition-all duration-100', twStyle)}>
        {children}
      </button>
    );
  }
}
