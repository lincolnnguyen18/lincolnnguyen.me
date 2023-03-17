import React from 'react';
import { twMerge } from 'tailwind-merge';

export function MenuContainer ({ children, className, open, ...props }) {
  return (
    <div
      className='fixed top-0 bottom-0 z-[1] w-full left-1/2 transform -translate-x-1/2 transition-[opacity] duration-200 overflow-y-auto pb-3 overscroll-contain'
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
      {...props}
    >
      <div className={twMerge('max-w-screen-sm mx-auto flex flex-col', className)}>
        {children}
      </div>
    </div>
  );
}
