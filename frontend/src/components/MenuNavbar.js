import React from 'react';
import { twMerge } from 'tailwind-merge';

export function MenuNavbar ({ children, className, ...props }) {
  return (
    <div className={twMerge('max-w-screen-sm w-full mx-auto flex justify-end h-fit', className)} {...props}>
      {children}
    </div>
  );
}
