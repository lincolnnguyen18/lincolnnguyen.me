import React from 'react';
import { Button } from '../../../components/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice.js';

export function BottomBar () {
  const dispatch = useDispatch();
  const { mode } = useSelector(transcribeSelector);

  if (mode === 'default') {
    function handleStart () {
      dispatch(transcribeActions.setSlice({ mode: 'record' }));
    }

    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-center bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300'>
        <Button twStyle="flex items-center gap-0.5 sm:gap-1 select-auto" onClick={handleStart}>
          <span className='icon-mic' />
          <span className="sm:text-base text-sm">Start transcribing</span>
        </Button>
      </div>
    );
  } else if (mode === 'record') {
    function handleStop () {
      dispatch(transcribeActions.setSlice({ mode: 'default' }));
    }

    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300'>
        <span className="sm:text-sm text-xs">0:04</span>
        <Button twStyle="flex items-center gap-0.5 sm:gap-1 select-auto absolute left-1/2 transform -translate-x-1/2" onClick={handleStop}>
          <span className='icon-mic' />
          <span className="sm:text-base text-sm">Stop transcribing</span>
        </Button>
      </div>
    );
  } else if (mode === 'edit') {
    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center justify-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300 gap-4'>
        <span className="max-w-[110px] sm:max-w-[210px] overflow-hidden truncate sm:text-base text-sm">2 selected</span>
        <div className="flex sm:gap-7 gap-3">
          <Button twStyle="flex items-center gap-1 select-auto" disabled={true}>
            <span className='icon-delete'/>
            <span className="sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate">Delete</span>
          </Button>
          <Button twStyle="flex items-center gap-1 select-auto">
            <span className='icon-up'/>
            <span className="sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate">Move</span>
          </Button>
          <Button twStyle="flex items-center gap-1 select-auto">
            <span className='icon-down'/>
            <span className="sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate">Move</span>
          </Button>
        </div>
      </div>
    );
  }
}
