import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { formatFloatToTime } from '../../../shared/utils/stringUtils';

export function BottomBar () {
  const dispatch = useDispatch();
  const { bottomBarMode, duration, currentTime, player, playing, recording, recorder } = useSelector(transcribeSelector);
  const [recordingDuration, setRecordingDuration] = React.useState(0);

  function updateCurrentTime (e) {
    dispatch(transcribeActions.setSlice({ currentTime: e.target.value }));
    player.currentTime = e.target.value;
  }

  function playerPlay () {
    player.play();
    dispatch(transcribeActions.setSlice({ playing: true }));
  }

  function playerPause () {
    player.pause();
    dispatch(transcribeActions.setSlice({ playing: false }));
  }

  let playPauseButton;
  if (playing) {
    playPauseButton = <span className="icon-pause-filled text-5xl cursor-pointer" onClick={playerPause} />;
  } else {
    playPauseButton = <span className="icon-play-filled text-5xl cursor-pointer" onClick={playerPlay} />;
  }

  function recordingStart () {
    recorder.startRecording();
    dispatch(transcribeActions.setSlice({ recording: true }));
  }

  function recordingStop () {
    recorder.stopRecording();
    dispatch(transcribeActions.setSlice({ recording: false, bottomBarMode: 'replay' }));
  }

  React.useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        setRecordingDuration(recordingDuration + 1);
        // console.log('recordingDuration', recordingDuration);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [recording, recordingDuration]);

  let startStopRecordingButton;
  if (recording) {
    startStopRecordingButton = (
      <span
        onClick={recordingStop}
      >Stop transcribing</span>
    );
  } else {
    startStopRecordingButton = (
      <span
        onClick={recordingStart}
      >Start transcribing</span>
    );
  }

  if (bottomBarMode === 'recording') {
    return (
      <div
        className="bg-purple-custom fixed bottom-0 w-full max-w-screen-sm sm:rounded-t-lg text-white flex items-center h-11 px-3 justify-end transition-all duration-300"
        style={{ bottom: '0' }}
      >
        <div className="flex items-center gap-1 select-none cursor-pointer absolute transform -translate-x-1/2 left-1/2">
          <span className="icon-mic text-2xl" />
          {startStopRecordingButton}
        </div>
        <span className="text-sm">{recordingDuration > 0 && formatFloatToTime(recordingDuration)}</span>
      </div>
    );
  } else {
    return (
      <div
        className="bg-purple-custom fixed bottom-0 w-full max-w-screen-sm sm:rounded-t-lg text-white flex flex-col h-24 px-4 transition-all duration-300 space-y-2 justify-center"
        style={{ bottom: '0' }}
        // style={{ bottom: bottomBar.state === 'open' ? '0' : '-2.75rem' }}
      >
        <div className="h-16 flex flex-col justify-between">
          <input
            type="range"
            min="0"
            className="appearance-none w-full h-1 bg-white rounded-full cursor-pointer white"
            value={currentTime}
            onChange={updateCurrentTime}
            onInput={updateCurrentTime}
            max={duration}
            step={duration / 100}
          />
          <div className="flex items-center gap-1 select-none justify-between cursor-pointer">
            <span className="text-sm">{formatFloatToTime(currentTime)}</span>
            <div className="flex items-center gap-7 select-none transition-all duration-300 absolute transform -translate-x-1/2 left-1/2">
              <span className="icon-skip-prev text-2xl cursor-pointer" />
              {playPauseButton}
              <span className="icon-skip-next text-2xl cursor-pointer" />
            </div>
            <span className="text-sm">{formatFloatToTime(duration)}</span>
          </div>
        </div>
      </div>
    );
  }
}
