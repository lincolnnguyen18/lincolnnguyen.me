import React from 'react';

export function NavbarGroupButton ({ children, type = 'middle' }) {
  // type = top, middle, bottom
  let twStyle;
  if (type === 'top') {
    twStyle = 'rounded-t-lg';
  } else if (type === 'bottom') {
    twStyle = 'rounded-b-lg';
  }
  return (
    <>
      <button className={`p-2 bg-black bg-opacity-50 ${twStyle} flex items-center gap-2 w-48 cursor-pointer hover:bg-opacity-60 active:bg-opacity-75 active:transition-all active:duration-200`}>
        {children}
      </button>
      {type !== 'bottom' && <div className="h-[1px] bg-black bg-opacity-40 w-48" />}
    </>
  );
}
