import React from 'react';
import { twMerge } from 'tailwind-merge';

export function FormScreenBottom ({ children, twStyle }) {
  return (
    <div className={twMerge('w-full justify-center flex mt-8', twStyle)}>
      {children}
    </div>
  );
}
