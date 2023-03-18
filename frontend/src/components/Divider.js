import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Divider ({ className, noMargin = false, ...props }) {
  return (
    <div {...props} className={twMerge('h-[.1rem] bg-gray-divider', !noMargin && 'sm:my-2.5 my-2', className)} />
  );
}
