import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function TextLink ({ to, children, className, inactive, ...props }) {
  if (to && !inactive) {
    return (
      <Link to={to} {...props} className={twMerge('underline active:brightness-150 font-semibold transition-all duration-100', className)}>
        {children}
      </Link>
    );
  } else if (!inactive) {
    return (
      <button {...props} className={twMerge('underline active:brightness-150 font-semibold transition-all duration-100', className)}>
        {children}
      </button>
    );
  } else {
    return (
      <span {...props} className={twMerge('underline font-semibold', className)}>
        {children}
      </span>
    );
  }
}
