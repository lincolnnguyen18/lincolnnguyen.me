import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function TextLink ({ to, children, twStyle, inactive, ...props }) {
  if (to && !inactive) {
    return (
      <Link to={to} {...props} className={twMerge('underline active:brightness-150 font-semibold transition-all duration-100', twStyle)}>
        {children}
      </Link>
    );
  } else if (!inactive) {
    return (
      <button {...props} className={twMerge('underline active:brightness-150 font-semibold transition-all duration-100', twStyle)}>
        {children}
      </button>
    );
  } else {
    return (
      <span {...props} className={twMerge('underline font-semibold', twStyle)}>
        {children}
      </span>
    );
  }
}
