import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function TextLink ({ children, twStyle, ...props }) {
  return (
    <Link {...props} className={twMerge('underline active:brightness-150 font-semibold transition-all duration-100', twStyle)}>
      {children}
    </Link>
  );
}
