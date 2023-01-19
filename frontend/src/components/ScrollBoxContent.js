import React from 'react';

export function ScrollBoxContent ({ children, twStyle = 'gap-1 sm:gap-1.5', whiteBackground = true }) {
  return (
    <React.Fragment>
      {whiteBackground && (
        <div className="w-full max-w-screen-2xl bg-white fixed left-1/2 transform -translate-x-1/2 xl:blur-3xl transition-[filter] duration-500 lg:blur-2xl md:blur-none top-[-50%] bottom-[-50%]" />
      )}
      <div className={`flex flex-col max-w-screen-sm mx-auto w-full py-2 transition-all duration-200 ${twStyle}`}>
        {children}
      </div>
    </React.Fragment>
  );
}
