import React from 'react';
import { twMerge } from 'tailwind-merge';

export function NavbarGroupButton ({ children, twStyle, stopPropagation = false, onClick, disabled = false }) {
  function handleClick (e) {
    if (disabled || stopPropagation) {
      e.stopPropagation();
      onClick && onClick();
    }
  }

  return (
    <>
      <button className={twMerge('h-12 px-2 bg-black bg-opacity-50 w-48 cursor-pointer hover:bg-opacity-60 active:bg-opacity-75 active:transition-all active:duration-200', twStyle, disabled && 'hover:bg-opacity-50 cursor-not-allowed active:bg-opacity-50')} type="button" onClick={handleClick}>
        <div className={twMerge(disabled && 'opacity-50', 'flex items-center gap-2')}>
          {children}
        </div>
      </button>
      {(!twStyle || (twStyle && !twStyle.includes('rounded-b-lg'))) && <div className="h-[1px] bg-black bg-opacity-40 w-48" />}
    </>
  );
}
