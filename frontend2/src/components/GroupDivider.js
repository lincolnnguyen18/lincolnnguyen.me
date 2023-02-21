import React from 'react';
import { twMerge } from 'tailwind-merge';

export function GroupDivider ({ dir = 'vert', twStyle, ...rest }) {
  if (dir === 'vert') {
    return (
      <div className={twMerge('h-[1px] bg-black bg-opacity-30', twStyle)} {...rest} />
    );
  } else {
    return (
      <div className={twMerge('w-[1px] bg-black bg-opacity-30', twStyle)} {...rest} />
    );
  }
}