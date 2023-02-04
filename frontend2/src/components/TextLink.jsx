import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function TextLink ({ children, twStyle, ...props }) {
  return (
    <Link {...props} className={twMerge('underline hover:brightness-125 active:brightness-150', twStyle)}>
      {children}
    </Link>
  );
}
