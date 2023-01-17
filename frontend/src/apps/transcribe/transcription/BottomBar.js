import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { formatFloatToTime } from '../../../shared/utils/stringUtils';
import { Button } from '../../../components/Button';

export function BottomBar () {
  const dispatch = useDispatch();
  const { bottomBarMode, bottomBarPosition, duration, currentTime, player, playing, recording, recorder, transcriber } = useSelector(transcribeSelector);
  const [recordingDuration, setRecordingDuration] = React.useState(0);

  function updateCurrentTime (e) {
    dispatch(transcribeActions.updateCurrentTime(e.target.value));
  }

  function playerPlay () {
    player.play();
    dispatch(transcribeActions.setSlice({ playing: true }));
  }

  function playerPause () {
    player.pause();
    dispatch(transcribeActions.setSlice({ playing: false }));
  }

  function recordingStart () {
    recorder.start();
    transcriber.start();
    dispatch(transcribeActions.setSlice({ recording: true }));
  }

  function recordingStop () {
    recorder.stop();
    transcriber.stop();
    dispatch(transcribeActions.setSlice({ recording: false, bottomBarMode: 'replay', recordingDone: true }));
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

  if (bottomBarMode === 'recording') {
    return (
      <div
        className="bg-purple-custom fixed w-full max-w-screen-sm sm:rounded-t-lg text-white flex items-center h-11 px-3 justify-end transform -translate-x-1/2 left-1/2"
        style={{ bottom: bottomBarPosition, transition: 'all 0.3s ease-in-out, bottom 1s ease-in-out' }}
      >
        <Button twStyle="flex items-center gap-1 absolute transform -translate-x-1/2 left-1/2" onClick={recording ? recordingStop : recordingStart}>
          <span className={recording ? 'icon-mic-off' : 'icon-mic'} />
          <span className="text-base">{recording ? 'Stop transcribing' : 'Start transcribing'}</span>
        </Button>
        <span className="text-sm">{recordingDuration > 0 && formatFloatToTime(recordingDuration)}</span>
      </div>
    );
  } else {
    return (
      <div
        className="bg-purple-custom bottom-0 fixed w-full max-w-screen-sm sm:rounded-t-lg text-white flex flex-col h-24 px-4 transition-all duration-300 space-y-2 justify-center transform -translate-x-1/2 left-1/2"
      >
        <div
          className="h-16 sm:h-14 flex flex-col justify-between"
          style={{ transition: 'height 0.3s ease-in-out' }}
        >
          <input
            type="range"
            min="0"
            className="appearance-none w-full h-1 bg-white rounded-full white cursor-pointer"
            value={currentTime}
            onChange={updateCurrentTime}
            onInput={updateCurrentTime}
            max={Math.round(duration)}
            step={1}
          />
          <div className="flex items-center gap-1 justify-between">
            <span className="text-sm">{formatFloatToTime(currentTime)}</span>
            <div className="flex items-center gap-7 transition-all duration-300 absolute transform -translate-x-1/2 left-1/2">
              <Button twStyle="icon-skip-prev" />
              <Button twStyle={playing ? 'icon-pause-filled' : 'icon-play-filled'} onClick={playing ? playerPause : playerPlay} fontSize="text-5xl" />
              <Button twStyle="icon-skip-next" />
            </div>
            <span className="text-sm">{formatFloatToTime(duration)}</span>
          </div>
        </div>
      </div>
    );
  }
}
