import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Divider ({ twStyle, ...props }) {
  return (
    <div {...props} className={twMerge('h-[.1rem] bg-gray-divider sm:my-2.5 my-2', twStyle)} />
  );
}
