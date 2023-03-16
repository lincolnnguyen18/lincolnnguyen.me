import React from 'react';
import { twMerge } from 'tailwind-merge';

export function DropdownOption ({ children, className, ...rest }) {
  return (
    <option className={twMerge('text-black', className)} {...rest}>
      {children}
    </option>
  );
}
