import React from 'react';
import { twMerge } from 'tailwind-merge';

export function FormScreen ({ children, isForm = false, twStyle, ...props }) {
  if (isForm) {
    return (
      <form className="flex flex-col w-full text-white items-center" {...props}>
        <div className={twMerge('w-full max-w-lg', twStyle)}>
          {children}
        </div>
      </form>
    );
  } else {
    return (
      <div className="flex flex-col w-full text-white items-center">
        <div className={twMerge('w-full max-w-lg', twStyle)}>
          {children}
        </div>
      </div>
    );
  }
}