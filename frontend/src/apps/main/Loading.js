import React from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from '../../slices/commonSlice';

export function Loading () {
  const { loadingOpen, loadingTitle } = useSelector(commonSelector);

  return (
    // <>
    //   <div
    //     className='left-0 right-0 h-screen fixed top-0 backdrop-blur-sm transition-[opacity] z-[2] transition-all duration-200 cursor-pointer'
    //     style={{ opacity: loadingOpen ? 1 : 0, pointerEvents: loadingOpen ? 'all' : 'none', backgroundColor: 'rgba(0,0,0,0.55)' }}
    //   />
    //   <div
    //     // className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 z-[2] justify-center bg-black backdrop-blur bg-opacity-50 rounded-xl transition-all duration-100 cursor-default"
    //     className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-16 z-[2] justify-center bg-black backdrop-blur bg-opacity-50 rounded-xl transition-all duration-100 cursor-default"
    //     style={{
    //       opacity: !loadingOpen ? 0 : 1,
    //       pointerEvents: !loadingOpen ? 'none' : 'auto',
    //     }}
    //   >
    //     <span className="font-semibold">{loadingTitle}</span>
    //     <span>Please wait...</span>
    //   </div>
    // </>
    <>
      <div
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur-sm transition-[opacity] z-[2] transition-all duration-200 cursor-pointer'
        style={{ opacity: loadingOpen ? 1 : 0, pointerEvents: loadingOpen ? 'all' : 'none', backgroundColor: 'rgba(0,0,0,0.55)' }}
      />
      <div
        // className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 z-[2] justify-center transition-all duration-100 w-full"
        className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-9 z-[2] justify-center transition-all duration-100 w-full"
        style={{
          opacity: !loadingOpen ? 0 : 1,
          pointerEvents: !loadingOpen ? 'none' : 'auto',
        }}
      >
        <div className="flex flex-col w-full text-white items-center">
          <div className="w-full max-w-md">
            <span className="font-semibold sm:text-lg text-base">{loadingTitle}</span>
            <div className="bg-black bg-opacity-50 rounded-lg w-full flex flex-col mb-6 mt-2 py-2 px-3">
              <span>Please wait...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
