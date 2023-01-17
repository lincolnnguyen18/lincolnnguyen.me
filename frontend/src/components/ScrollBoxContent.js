import React from 'react';

export function ScrollBoxContent ({ children, twStyle = 'gap-1 sm:gap-1.5' }) {
  return (
    <div className={`flex flex-col max-w-screen-sm mx-auto w-full py-2 transition-all duration-200 ${twStyle}`}>
      {children}
    </div>
  );
}
