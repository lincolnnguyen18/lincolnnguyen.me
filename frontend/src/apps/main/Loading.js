import React from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from '../../slices/commonSlice';

export function Loading () {
  const { loadingOpen, loadingTitle } = useSelector(commonSelector);
  const [open, setOpen] = React.useState(false);
  const [lastOpen, setLastOpen] = React.useState(null);
  let interval;

  React.useEffect(() => {
    if (loadingOpen) {
      setLastOpen(Date.now());
      interval = setInterval(() => {
        if (lastOpen && Date.now() - lastOpen > 500) {
          setOpen(true);
          clearInterval(interval);
        }
      }, 500);
    } else {
      setOpen(false);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [loadingOpen, lastOpen]);

  return (
    <>
      <div
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur-sm z-[2] transition-all duration-200 cursor-default'
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', backgroundColor: 'rgba(0,0,0,0.55)' }}
      />
      <div
        className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-9 z-[2] justify-center transition-all duration-100 w-full"
        style={{
          opacity: !open ? 0 : 1,
          pointerEvents: !open ? 'none' : 'auto',
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
