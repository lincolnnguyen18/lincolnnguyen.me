import React from 'react';
import { twMerge } from 'tailwind-merge';

export function TextField ({ className, dir = 'single', ...rest }) {
  return (
    <input className={twMerge('text-white bg-black bg-opacity-50 h-11 px-3 w-full placeholder:text-gray-input', dir === 'single' && 'rounded-lg', dir === 'vert' && 'rounded-none first:rounded-t-lg last:rounded-b-lg', className)} {...rest} />
  );
}
