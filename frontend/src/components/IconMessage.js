import React from 'react';

export function IconMessage ({ iconStyle, messageText, whiteBackground = true }) {
  return (
    <React.Fragment>
      {whiteBackground && (
        <div className="w-full max-w-screen-2xl bg-white fixed z-0 left-1/2 transform -translate-x-1/2 xl:blur-3xl transition-[filter] duration-500 lg:blur-2xl md:blur-none top-[-50%] bottom-[-50%]" />
      )}
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
        <div className="flex flex-col items-center space-y-4 mt-[40%] z-10">
          <span className={'text-6xl ' + iconStyle} />
          <span className="text-center max-w-sm text-sm sm:text-base transition-text duration-100">
            {messageText}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}
