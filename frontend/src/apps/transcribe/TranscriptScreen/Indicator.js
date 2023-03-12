import React from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from '../../../slices/commonSlice';

export function Indicator () {
  const { indicatorTitle, indicatorMessage } = useSelector(commonSelector);
  const [open, setOpen] = React.useState(false);
  const [lastOpenTime, setLastOpenTime] = React.useState(new Date().getTime());
  const [disabled, setDisabled] = React.useState(true);
  let interval;

  function closeIndicator () {
    setOpen(false);
  }

  React.useEffect(() => {
    if (!disabled) {
      setOpen(true);
      setLastOpenTime(new Date().getTime());
    } else {
      setDisabled(false);
    }
  }, [indicatorTitle, indicatorMessage]);

  React.useEffect(() => {
    interval = setInterval(() => {
      if (new Date().getTime() - lastOpenTime > 1000) {
        setOpen(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastOpenTime]);

  return !disabled && (
    <>
      {/*<div*/}
      {/*  className='left-0 right-0 h-screen fixed top-0 backdrop-blur-sm transition-[opacity] z-[2] transition-all duration-200 cursor-pointer'*/}
      {/*  style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', backgroundColor: 'rgba(0,0,0,0.01)' }}*/}
      {/*  onClick={closeIndicator}*/}
      {/*/>*/}
      {/*<div*/}
      {/*  className='left-0 right-0 h-screen fixed top-0 transition-[opacity] z-[2] transition-all duration-200'*/}
      {/*  style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}*/}
      {/*  onClick={closeIndicator}*/}
      {/*/>*/}
      <div
        className="text-white py-2 px-3 flex gap-1 flex-col items-center fixed transform -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 z-[2] justify-center bg-purple-custom backdrop-blur bg-opacity-80 rounded-xl transition-all duration-100 cursor-default"
        style={{
          opacity: !open ? 0 : 1,
          pointerEvents: !open ? 'none' : 'auto',
        }}
        onClick={closeIndicator}
      >
        <span className="font-semibold">{indicatorTitle}</span>
        <span>{indicatorMessage}</span>
      </div>
    </>
  );
}
