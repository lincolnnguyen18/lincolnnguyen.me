import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { saveTranscript, transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { wait } from '../../../common/timeUtils';
import { commonActions, commonSelector } from '../../../slices/commonSlice';
import { useDispatch, useSelector } from 'react-redux';

const shortcuts = [
  { name: 'Play/pause', key: 'K' },
  { name: 'Start/stop recording', key: 'O' },
  { name: 'Skip forward', key: 'L' },
  { name: 'Skip backwards', key: 'J' },
  { name: 'Switch languages', key: 'P' },
  { name: 'Speed up', key: ']' },
  { name: 'Slow down', key: '[' },
  { name: 'Restart transcriber', key: 'I' },
  { name: 'Switch between transcription cut off modes', key: 'M' },
];

async function handlePlayPause (dispatch, playing) {
  const audio = document.getElementById('audio');
  if (playing) {
    audio.pause();
    dispatch(transcribeActions.setSlice({ playing: false }));
  } else {
    dispatch(commonActions.openLoading({　title: 'Loading'　}));
    // await wait(3000);
    const error = audio.play();
    if (error !== undefined) {
      error
        .then(() => {
          dispatch(commonActions.closeLoading());
          dispatch(transcribeActions.setSlice({ playing: true }));
        })
        .catch(() => {
          dispatch(commonActions.closeLoading());
          dispatch(commonActions.openAlert({
            title: 'Error',
            message: 'Unable to play audio for this part. If recorded recently, this part is likely still being processed. Please try refreshing this page in a few minutes. Otherwise, this part is missing or corrupted.',
          }));
        });
    } else {
      dispatch(commonActions.closeLoading());
      dispatch(transcribeActions.setSlice({ playing: true }));
    }
  }
}

async function startStopRecording (dispatch, recorder, transcriber, mode) {
  if (mode !== 'record') {
    try {
      recorder.start();
      transcriber.start();
      dispatch(transcribeActions.addPart());
      dispatch(transcribeActions.setSlice({ mode: 'record' }));
      await wait(50);
      dispatch(commonActions.scrollToBottomHard(true));
    } catch {
      dispatch(commonActions.openAlert({ title: 'Error', message: 'There was an error starting the transcription process. Please make sure this website has permission to access the mic and that there are no other tabs using the mic. Wait a few seconds and try again.' }));
    }
  } else {
    // console.log('window.lastInterim', window.lastInterim);
    dispatch(commonActions.openLoading({ title: 'Saving'}));
    if (window.lastInterim !== '') {
      dispatch(transcribeActions.setSlice({ saving: true }));
    }
    recorder.stop();
    transcriber.stop();
    if (window.lastInterim === '') {
      dispatch(transcribeActions.updatePreview());
      dispatch(saveTranscript());
      // dispatch(openNameTranscript());
    }
    window.lastInterim = '';
    dispatch(transcribeActions.setSlice({ interimResult: '' }));
    dispatch(transcribeActions.setCurrentPartDuration());
  }
}

function seekTo (dispatch, newTime) {
  dispatch(transcribeActions.seekTo(newTime));
}

function switchLanguages (dispatch, interimResult) {
  window.recognition.stop();
  if (interimResult !== '') {
    dispatch(transcribeActions.setSlice({ switchingLanguages: true }));
  } else {
    dispatch(transcribeActions.switchLanguages());
  }
}

function restartTranscriber () {
  window.recognition.stop();
  window.lastInterim = '';
}

export function Hotkeys () {
  const dispatch = useDispatch();
  const { playing, recorder, transcriber, mode, currentTime, interimResult, playbackSpeed, cutOffType, loadingOpen } = useSelector(transcribeSelector);
  const { navMenu } = useSelector(commonSelector);

  const enabled = !navMenu.open && !loadingOpen;

  function setPlaybackSpeed (delta) {
    dispatch(transcribeActions.setPlaybackSpeed(playbackSpeed + delta));
  }

  function switchMode () {
    let newMode = 'auto';
    if (cutOffType === 'auto') {
      newMode = 'manual';
    }
    dispatch(transcribeActions.setSlice({ cutOffType: newMode }));
    window.cutOffType = newMode;
  }

  useHotkeys('k', () => handlePlayPause(dispatch, playing), { enabled: enabled && mode === 'default' });
  useHotkeys('o', () => startStopRecording(dispatch, recorder, transcriber, mode), { enabled });
  useHotkeys('l', () => seekTo(dispatch, currentTime + 5), { enabled: enabled && mode === 'default' });
  useHotkeys('j', () => seekTo(dispatch, currentTime - 5), { enabled: enabled && mode === 'default' });
  useHotkeys('p', () => switchLanguages(dispatch, interimResult), { enabled: enabled && mode === 'record' });
  useHotkeys(']', () => setPlaybackSpeed(0.25), { enabled: enabled && mode === 'default' });
  useHotkeys('[', () => setPlaybackSpeed(-0.25), { enabled: enabled && mode === 'default' });
  useHotkeys('i', restartTranscriber, { enabled: enabled && cutOffType === 'manual' && mode === 'record' });
  useHotkeys('m', () => switchMode(), { enabled: enabled && mode === 'record' });

  return <></>;
}

export { handlePlayPause, startStopRecording, seekTo, switchLanguages, restartTranscriber, shortcuts };
