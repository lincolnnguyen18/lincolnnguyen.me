import React from 'react';
import { Button } from './Button';
import { twMerge } from 'tailwind-merge';

export function Radio ({ children, active = false, selected = false, twStyle, ...rest }) {
  return (
    <div className={twMerge('flex items-center gap-2', active && 'select-none cursor-pointer', twStyle)} {...rest}>
      {active && <Button stopPropagation={false}>
        <span className={twMerge('text-2xl cursor-pointer', selected ? 'icon-radio-checked-filled' : 'icon-radio-unchecked')} />
      </Button>}
      {children}
    </div>
  );
}
