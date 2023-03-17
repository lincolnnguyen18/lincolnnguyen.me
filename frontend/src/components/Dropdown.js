import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Dropdown ({ children, className, outerClassName, ...rest }) {
  return (
    <div className={twMerge('flex items-center text-gray-input relative', outerClassName)}>
      <select className={twMerge('appearance-none py-1 pl-2 pr-7 bg-none bg-transparent cursor-pointer w-[140px] overflow-hidden truncate', className)} {...rest}>
        {children}
      </select>
      <span className='icon-chevron-right text-2xl absolute right-1 top-0 bottom-0 m-auto pointer-events-none' />
    </div>
  );
}
