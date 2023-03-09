import React from 'react';
import { twMerge } from 'tailwind-merge';

export function DropdownOption ({ children, twStyle, ...rest }) {
  return (
    <option className={twMerge('text-black', twStyle)} {...rest}>
      {children}
    </option>
  );
}
