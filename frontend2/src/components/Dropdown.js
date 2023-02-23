import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Dropdown ({ children, twStyle, outerTwStyle, ...rest }) {
  return (
    <div className={twMerge('flex items-center text-gray-input', outerTwStyle)}>
      <select className={twMerge('appearance-none py-1 px-2 bg-none bg-transparent cursor-pointer w-[120px] overflow-hidden truncate', twStyle)} {...rest}>
        {children}
      </select>
      <span className="icon-chevron-right text-2xl" />
    </div>
  );
}
