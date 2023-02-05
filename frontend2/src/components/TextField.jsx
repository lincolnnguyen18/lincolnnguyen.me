import React from 'react';
import { twMerge } from 'tailwind-merge';

export function TextField ({ twStyle, ...rest }) {
  return (
    <input className={twMerge('text-white bg-black bg-opacity-50 h-11 px-3 rounded-lg w-full placeholder:text-gray-300', twStyle)} {...rest} />
  );
}
