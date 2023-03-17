import React from 'react';

export function BlurBackground ({ open, easyClose = true, ...props }) {
  return (
    <div
      className='left-0 right-0 h-screen fixed top-0 backdrop-blur z-[1] transition-all duration-200'
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', backgroundColor: !easyClose && 'rgba(0,0,0,0.55)' }}
      {...props}
    />
  );
}
