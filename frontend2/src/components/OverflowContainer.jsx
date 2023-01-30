import React from 'react';

export function OverflowContainer ({ children }) {
  return (
    <div className="overflow-y-scroll fixed top-0 bottom-0 left-0 right-0 sm:relative sm:overflow-y-auto">
      <div className="max-w-screen-sm w-full mx-auto w-full sm:px-2 pt-14 pb-3 gap-2 flex flex-col">
        {children}
      </div>
    </div>
  );
}
