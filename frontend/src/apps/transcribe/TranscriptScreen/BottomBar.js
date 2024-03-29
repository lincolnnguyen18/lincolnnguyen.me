import React from 'react';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { stopRecording, transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice.js';
import { formatFloatToTime } from '../../../common/stringUtils.js';
import { twMerge } from 'tailwind-merge';
import { commonActions, commonSelector, openMenu } from '../../../slices/commonSlice';
import { languages } from '../../../common/data';
import { handlePlayPause, restartTranscriber, seekTo, startStopRecording, switchLanguages } from './Hotkeys';
import { Confirm } from '../../main/Confirm';

export function BottomBar () {
  const dispatch = useDispatch();
  const audio = document.getElementById('audio');
  const { mode, parts, recorder, transcriber, currentPartId, currentTime, playing, selectedParts, transcribeLang, switchingLanguages, interimResult, cutOffType } = useSelector(transcribeSelector);
  const { transcriptionSupported } = useSelector(commonSelector);

  function updateCurrentTime (e) {
    dispatch(transcribeActions.setSlice({ currentTime: e.target.value }));
    audio.currentTime = e.target.value;
  }

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  function handleDelete () {
    function onDelete () {
      dispatch(transcribeActions.deleteSelectedParts());
      handleClose();
    }

    function deleteMessage (numParts) {
      if (numParts === 1) {
        return 'Are you sure you want to delete this part?';
      } else {
        return `Are you sure you want to delete these ${numParts} parts?`;
      }
    }

    dispatch(openMenu({
      children: <Confirm message={deleteMessage(selectedParts.length)} onConfirm={onDelete} />,
      easyClose: false,
    }));
  }

  function getLanguageName () {
    const lang = languages.find(l => l.name === transcribeLang);
    return lang?.shortName || lang.name;
  }

  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    if (mode === 'record' && !window.interval) {
      window.interval = setInterval(() => {
        const newDuration = (Date.now() - parts[currentPartId].createdAt) / 1000;
        // console.log('duration', newDuration);
        setDuration(newDuration);
        // limit a part to 5 seconds
        // const maxDuration = 5;
        // limit a part to 1 hour
        const maxDuration = 60 * 60;
        if (newDuration > maxDuration + 1) {
          dispatch(stopRecording());
        }

        // send notification once a part is 50 minutes long
        const warningDuration = 50 * 60;
        // if (newDuration > 5) {
        if (newDuration > warningDuration && !window.notificationSent) {
          dispatch(transcribeActions.warnTimeLimit());
        }
      }, 1000);
    } else {
      clearInterval(window.interval);
      window.interval = null;
    }
  }, [mode, currentPartId, parts]);

  const audioLoaded = currentPartId !== null && currentTime !== null;

  function getCurrentPartDuration () {
    if (mode === 'record') {
      return duration;
    } else {
      return Math.max(parts[currentPartId].duration - 1, 0);
    }
  }

  if (mode === 'default') {
    if (Object.keys(parts).length === 0) {
      return (
        <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-center bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300'>
          <Button className='flex items-center gap-0.5 sm:gap-1 select-auto' onClick={() => startStopRecording(dispatch, recorder, transcriber, mode)} disabled={!transcriptionSupported}>
            <span className='icon-mic' />
            <span className='sm:text-base text-sm overflow-hidden truncate max-w-[270px]'>Start transcribing in {getLanguageName()}</span>
          </Button>
        </div>
      );
    } else if (audioLoaded) {
      return (
        <div
          className='bg-purple-custom bottom-0 fixed w-full max-w-screen-sm sm:rounded-t-lg text-white flex flex-col h-24 px-4 transition-all duration-300 space-y-2 justify-center transform -translate-x-1/2 left-1/2 bg-opacity-80 backdrop-blur z-[1]'
        >
          <div
            className='h-14 flex flex-col justify-between'
            style={{ transition: 'height 0.3s ease-in-out' }}
          >
            <input
              type='range'
              min='0'
              className='appearance-none w-full h-1 bg-white rounded-full white cursor-pointer'
              value={currentTime}
              onChange={updateCurrentTime}
              onInput={updateCurrentTime}
              max={Math.round(getCurrentPartDuration())}
              step={1}
            />
            <div className='flex items-center gap-1 justify-between'>
              <span className='text-sm'>{formatFloatToTime(Math.min(currentTime, Math.round(getCurrentPartDuration())))}</span>
              <div className='flex items-center gap-7 transition-all duration-300 absolute transform -translate-x-1/2 left-1/2'>
                <Button className='icon-back-5' onClick={() => seekTo(dispatch, currentTime - 5)} />
                <Button className={twMerge(playing ? 'icon-pause-filled' : 'icon-play-filled', 'text-5xl')} onClick={() => handlePlayPause(dispatch, playing)} />
                <Button className='icon-forward-5' onClick={() => seekTo(dispatch, currentTime + 5)} />
              </div>
              <span className='text-sm'>{formatFloatToTime(Math.round(getCurrentPartDuration()))}</span>
            </div>
          </div>
        </div>
      );
    }
  } else if (mode === 'record') {
    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center justify-between fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-all duration-300'>
        <span className='sm:text-sm text-xs'>{formatFloatToTime(duration)}</span>
        <div className='flex gap-3 items-center'>
          <Button className='select-auto' onClick={() => switchLanguages(dispatch, interimResult)} disabled={switchingLanguages}>
            <span className='text-[0.66rem] w-[20px] h-[20px] ml-[2px] mr-[1px] font-bold text-gray-500 bg-white rounded-md flex items-center justify-center'>{languages.find(l => l.name === transcribeLang).code}</span>
          </Button>
          {cutOffType === 'manual' && <Button className='select-auto' onClick={restartTranscriber}>
            <span className='icon-refresh' />
          </Button>}
        </div>
        <Button className='flex items-center gap-0.5 sm:gap-1 select-auto absolute left-1/2 transform -translate-x-1/2' onClick={() => startStopRecording(dispatch, recorder, transcriber, mode)}>
          <span className='icon-mic' />
          <span className='sm:text-base text-sm'>Stop transcribing</span>
        </Button>
      </div>
    );
  } else if (mode === 'edit') {
    return (
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-all duration-300 gap-4'>
        <span className='max-w-[110px] sm:max-w-[210px] overflow-hidden truncate sm:text-base text-sm'>{selectedParts.length} selected</span>
        <div className='flex sm:gap-7 gap-3'>
          <Button className='flex items-center gap-1 select-auto' disabled={selectedParts.length === 0} onClick={handleDelete}>
            <span className='icon-delete'/>
            <span className='sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate'>Delete</span>
          </Button>
          {/*<Button className='flex items-center gap-1 select-auto'>*/}
          {/*  <span className='icon-up'/>*/}
          {/*  <span className='sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate'>Move</span>*/}
          {/*</Button>*/}
          {/*<Button className='flex items-center gap-1 select-auto'>*/}
          {/*  <span className='icon-down'/>*/}
          {/*  <span className='sm:text-base text-sm max-w-[50px] sm:max-w-none overflow-hidden truncate'>Move</span>*/}
          {/*</Button>*/}
        </div>
      </div>
    );
  }
}
