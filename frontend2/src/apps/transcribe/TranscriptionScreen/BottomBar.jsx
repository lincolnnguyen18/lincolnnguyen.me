import React from 'react';
import { Button } from '../../../components/Button.jsx';
import { useSelector } from 'react-redux';
import { transcribeSelector } from '../../../slices/transcribeSlice.js';

export function BottomBar () {
  const { mode } = useSelector(transcribeSelector);

  if (mode === 'default') {
    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-center bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300'>
        <Button twStyle="flex items-center gap-1 select-auto">
          <span className='icon-mic' />
          <span className="text-base">Start transcribing</span>
        </Button>
      </div>
    );
  } else if (mode === 'edit') {
    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center justify-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300 gap-4'>
        <span className="max-w-[110px] sm:max-w-[210px] overflow-hidden truncate">2 selected</span>
        <div className="flex gap-7">
          <Button twStyle="flex items-center gap-1 select-auto" disabled={true}>
            <span className='icon-delete'/>
            <span className="text-base">Delete</span>
          </Button>
          <Button twStyle="flex items-center gap-1 select-auto">
            <span className='icon-up'/>
            <span className="text-base">Move up</span>
          </Button>
          <Button twStyle="flex items-center gap-1 select-auto">
            <span className='icon-down'/>
            <span className="text-base">Move down</span>
          </Button>
        </div>
      </div>
    );
  }
}
