import React from 'react';

export function WhiteVignette ({ open }) {
  return (
    <div
      className="w-full max-w-screen-2xl bg-white fixed left-1/2 transform -translate-x-1/2 xl:blur-3xl transition-all duration-200 ease-out lg:blur-2xl md:blur-none top-[-50%] bottom-[-50%] z-[-1]"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
    />
  );
}
