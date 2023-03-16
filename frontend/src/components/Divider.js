import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Divider ({ className, ...props }) {
  return (
    <div {...props} className={twMerge('h-[.1rem] bg-gray-divider sm:my-2.5 my-2', className)} />
  );
}
