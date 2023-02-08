import React from 'react';
import { twMerge } from 'tailwind-merge';

export function IconMessage ({ iconStyle, messageText }) {
  return (
    <div className="flex flex-col items-center space-y-4 mt-[40%]">
      <span className={twMerge('text-6xl', iconStyle)} />
      <span className="text-center max-w-sm text-sm sm:text-base transition-text duration-100">
        {messageText}
      </span>
    </div>
  );
}
