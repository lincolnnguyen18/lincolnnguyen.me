import React from 'react';
import { twMerge } from 'tailwind-merge';

export function TextField ({ twStyle, dir = 'single', ...rest }) {
  return (
    <input className={twMerge('text-white bg-black bg-opacity-50 h-11 px-3 w-full placeholder:text-gray-300 rounded-none', dir === 'single' && 'rounded-lg', dir === 'vert' && 'first:rounded-t-lg last:rounded-b-lg', twStyle)} {...rest} />
  );
}
