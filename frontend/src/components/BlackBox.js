import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Blackbox ({ children, className }) {
  return (
    <div className={twMerge('bg-black bg-opacity-50 rounded-lg w-full flex flex-col p-3', className)}>
      {children}
    </div>
  );
}
