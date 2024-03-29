import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function AppIcon ({ text, placeholderInitials, path, twStyle }) {
  return (
    <div className='flex flex-col items-center justify-center w-fit'>
      <Link
        className={twMerge('active:brightness-75 hover:brightness-95 flex items-center justify-center sm:w-20 sm:h-20 w-[3.85rem] h-[3.85rem] rounded-[1rem] sm:rounded-[1.125rem] m-2 text-white cursor-pointer', twStyle)}
        to={path ?? '/'}
      >
        <span className="text-2xl sm:text-3xl">{placeholderInitials}</span>
      </Link>
      <span className="text-xs font-semibold text-white sm:text-sm drop-shadow">{text}</span>
    </div>
  );
}
