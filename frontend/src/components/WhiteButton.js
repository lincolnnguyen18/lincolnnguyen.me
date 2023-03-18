import React from 'react';
import { twMerge } from 'tailwind-merge';

export function WhiteButton ({ children, className, ...props }) {
  return (
    <button
      className={twMerge('bg-white py-2 flex items-center relative justify-between px-3 cursor-pointer active:brightness-[0.97] transition-all duration-75', className)}
      {...props}
    >
      {children}
    </button>
  );
}
