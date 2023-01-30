import React from 'react';
import { twMerge } from 'tailwind-merge';

export function OverflowContainer ({ children, twStyle }) {
  return (
    <div className="overflow-y-scroll fixed top-0 bottom-0 left-0 right-0 sm:relative sm:overflow-y-auto">
      <div className={twMerge('max-w-screen-sm mx-auto w-full sm:px-2 pt-14 pb-3 gap-2 flex flex-col', twStyle)}>
        {children}
      </div>
    </div>
  );
}