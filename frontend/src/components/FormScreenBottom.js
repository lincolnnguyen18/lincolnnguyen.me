import React from 'react';
import { twMerge } from 'tailwind-merge';

export function FormScreenBottom ({ children, className }) {
  return (
    <div className={twMerge('w-full justify-center flex mt-8', className)}>
      {children}
    </div>
  );
}
