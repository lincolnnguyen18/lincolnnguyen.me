import React from 'react';

export function IconMessage ({ iconStyle, messageText }) {
  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
      <div className="flex flex-col items-center space-y-4 mt-[40%]">
        <span className={'text-6xl ' + iconStyle} />
        <span className="text-center max-w-sm text-sm sm:text-base transition-text duration-100">
          {messageText}
        </span>
      </div>
    </div>
  );
}
