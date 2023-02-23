import React from 'react';
import { twMerge } from 'tailwind-merge';

export function GroupInput ({ children, twStyle, ...rest }) {
  return (
    <div className={twMerge('flex justify-between w-full bg-black bg-opacity-50 first:rounded-t-lg last:rounded-b-lg py-2 px-3 items-center', twStyle)} {...rest}>
      {children}
    </div>
  );
}
