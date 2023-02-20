import React from 'react';
import { Button } from '../../../components/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice.js';
import { formatFloatToTime } from '../../../common/stringUtils.js';
import { twMerge } from 'tailwind-merge';
import { commonActions, commonSelector } from '../../../slices/commonSlice';
import { wait } from '../../../common/timeUtils';

export function BottomBar () {
  const dispatch = useDispatch();
  const audio = document.getElementById('audio');
  const { mode, partsOrder, parts, recorder, transcriber, currentPartId, currentTime, maxTime, playing } = useSelector(transcribeSelector);
  const { transcriptionSupported } = useSelector(commonSelector);

  function updateCurrentTime (e) {
    dispatch(transcribeActions.setSlice({ currentTime: e.target.value }));
    audio.currentTime = e.target.value;
  }

  function seekForward () {
    dispatch(transcribeActions.setSlice({ currentTime: currentTime + 5 }));
    audio.currentTime = currentTime + 5;
  }

  function seekBackward () {
    dispatch(transcribeActions.setSlice({ currentTime: currentTime - 5 }));
    audio.currentTime = currentTime - 5;
  }

  function handlePlay () {
    dispatch(transcribeActions.setSlice({ playing: true }));
    audio.play();
  }

  function handlePause () {
    audio.pause();
    dispatch(transcribeActions.setSlice({ playing: false }));
  }

  async function handleStop () {
    dispatch(transcribeActions.setSlice({ mode: 'default' }));
    recorder.stop();
    transcriber.stop();
    clearInterval(window.interval);
    await wait(50);
    dispatch(commonActions.scrollToBottom());
  }

  function handleRestart () {
    transcriber.stop();
  }

  if (mode === 'default') {
    if (partsOrder.length === 0) {
      async function handleStart () {
        dispatch(transcribeActions.addPart());
        recorder.start();
        transcriber.start();
        dispatch(transcribeActions.setSlice({ createdAt: Date.now(), mode: 'record' }));
        window.interval = setInterval(() => {
          dispatch(transcribeActions.incrementDuration(0.1));
        }, 100);
        await wait(50);
        dispatch(commonActions.scrollToBottom());
      }

      return (
        <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-center bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300 transition-all duration-300'>
          <Button twStyle="flex items-center gap-0.5 sm:gap-1 select-auto" onClick={handleStart} disabled={!transcriptionSupported}>
            <span className='icon-mic' />
            <span className="sm:text-base text-sm">Start transcribing</span>
          </Button>
        </div>
      );
    } else {
      return (
        <div
          className="bg-purple-custom bottom-0 fixed w-full max-w-screen-sm sm:rounded-t-lg text-white flex flex-col h-24 px-4 transition-all duration-300 space-y-2 justify-center transform -translate-x-1/2 left-1/2 bg-opacity-80 backdrop-blur z-[1]"
        >
          <div
            className="h-14 flex flex-col justify-between"
            style={{ transition: 'height 0.3s ease-in-out' }}
          >
            <input
              type="range"
              min="0"
              className="appearance-none w-full h-1 bg-white rounded-full white cursor-pointer"
              value={currentTime}
              onChange={updateCurrentTime}
              onInput={updateCurrentTime}
              max={Math.round(maxTime)}
              step={1}
            />
            <div className="flex items-center gap-1 justify-between">
              <span className="text-sm">{formatFloatToTime(currentTime)}</span>
              <div className="flex items-center gap-7 transition-all duration-300 absolute transform -translate-x-1/2 left-1/2">
                <Button twStyle="icon-back-5" onClick={seekBackward} />
                <Button twStyle={twMerge(playing ? 'icon-pause-filled' : 'icon-play-filled', 'text-5xl')} onClick={playing ? handlePause : handlePlay} />
                <Button twStyle="icon-forward-5" onClick={seekForward} />
              </div>
              <span className="text-sm">{formatFloatToTime(Math.round(maxTime))}</span>
            </div>
          </div>
        </div>
      );
    }
  } else if (mode === 'record') {
    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center justify-between fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-all duration-300'>
        <span className="sm:text-sm text-xs">{formatFloatToTime(parts[currentPartId]?.duration || 0)}</span>
        <Button twStyle="flex items-center gap-0.5 sm:gap-1 select-auto" onClick={handleRestart}>
          <span className='icon-refresh' />
        </Button>
        <Button twStyle="flex items-center gap-0.5 sm:gap-1 select-auto absolute left-1/2 transform -translate-x-1/2" onClick={handleStop}>
          <span className='icon-mic' />
          <span className="sm:text-base text-sm">Stop transcribing</span>
        </Button>
      </div>
    );
  } else if (mode === 'edit') {
    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-all duration-300 gap-4'>
        <span className="max-w-[110px] sm:max-w-[210px] overflow-hidden truncate sm:text-base text-sm">2 selected</span>
        <div className="flex sm:gap-7 gap-3">
          <Button twStyle="flex items-center gap-1 select-auto" disabled={true}>
            <span className='icon-delete'/>
            <span className="sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate">Delete</span>
          </Button>
          {/*<Button twStyle="flex items-center gap-1 select-auto">*/}
          {/*  <span className='icon-up'/>*/}
          {/*  <span className="sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate">Move</span>*/}
          {/*</Button>*/}
          {/*<Button twStyle="flex items-center gap-1 select-auto">*/}
          {/*  <span className='icon-down'/>*/}
          {/*  <span className="sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate">Move</span>*/}
          {/*</Button>*/}
        </div>
      </div>
    );
  }
}
