import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Group ({ title, children, twStyle }) {
  return (
    <>
      <span className="font-semibold sm:text-lg text-base">{title}</span>
      <div className={twMerge('w-full flex flex-col mb-6 mt-2', twStyle)}>
        {children}
      </div>
    </>
  );
}
