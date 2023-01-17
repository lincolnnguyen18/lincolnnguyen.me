import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../shared/components/Sidebar';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { Recorder } from '../../../shared/utils/recorder';
import { BottomBar } from './BottomBar';
import { Transcriber } from '../../../shared/utils/transcriber';
import { formatFloatToTime } from '../../../shared/utils/stringUtils';
import { ScrollBox } from '../../../components/ScrollBox';

export function TranscriptionScreen () {
  React.useEffect(() => {
    document.title = 'Unsaved - Transcribe';
  }, []);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { id } = useParams();
  const { loggedIn, screenWidth } = useSelector(sharedSelector);
  const { bottomBarMode, transcriptionResults, interimResult, currentTime } = useSelector(transcribeSelector);

  function onDurationChange (player) {
    const duration = player.duration;
    // console.log('duration', duration);

    if (duration === Infinity) {
      player.currentTime = 24 * 60 * 60;
    } else {
      player.currentTime = 0;
      dispatch(transcribeActions.setSlice({ duration }));
    }
  }

  function onTimeUpdate (player) {
    const currentTime = player.currentTime;
    // console.log('currentTime', currentTime);
    dispatch(transcribeActions.setSlice({ currentTime }));
  }

  function onEnded () {
    dispatch(transcribeActions.setSlice({ playing: false }));
  }

  function onFinalResult (result) {
    // console.log(result);
    dispatch(transcribeActions.addTranscriptionResult(result));
    dispatch(transcribeActions.setSlice({ interimResult: '' }));
  }

  function onInterimResult (result) {
    // console.log(`interim result: "${result}"`);
    dispatch(transcribeActions.setSlice({ interimResult: result }));
  }

  React.useEffect(() => {
    dispatch(transcribeActions.resetSlice());
    const recorder = new Recorder({ onDurationChange, onTimeUpdate, onEnded });
    const transcriber = new Transcriber({ onFinalResult, onInterimResult });
    dispatch(transcribeActions.setSlice({ player: recorder.player, recorder, transcriber }));
  }, []);

  // React.useEffect(() => {
  //   const transcriptionResultsLength = transcriptionResults?.length;
  //   if (!transcriptionResultsLength || transcriptionResultsLength === 0) {
  //     const transcriptionResults = [];
  //     for (let i = 0; i < 100; i++) {
  //       transcriptionResults.push({
  //         timestamp: 0,
  //         text: 'Hello world!',
  //       });
  //     }
  //     dispatch(transcribeActions.setSlice({ transcriptionResults }));
  //   }
  // }, [transcriptionResults]);

  React.useEffect(() => {
    if (bottomBarMode === 'replay') {
      dispatch(sharedActions.setSlice({
        scrollboxTop: '2.75rem',
        scrollboxBottom: '6rem',
      }));
    } else {
      dispatch(sharedActions.setSlice({
        scrollboxTop: '2.75rem',
        scrollboxBottom: '2.75rem',
      }));
    }
  }, [bottomBarMode, screenWidth]);

  function getTimestampWidth (timestamp) {
    if (timestamp.length === 4) {
      return '2.7rem';
    } else if (timestamp.length === 5) {
      return '3.2rem';
    } else if (timestamp.length === 7) {
      return '3.8rem';
    } else if (timestamp.length === 8) {
      return '4.3rem';
    } else {
      return 'fit-content';
    }
  }

  function isCurrentResult (timestamp, nextTimestamp) {
    return bottomBarMode === 'replay' &&
      currentTime >= timestamp &&
      (currentTime < nextTimestamp || !nextTimestamp);
  }

  let content;
  if (loggedIn) {
    if (transcriptionResults.length > 0 || interimResult) {
      content = (
        <ScrollBox>
          <div
            className='flex flex-col top-11 w-full mx-auto max-w-screen-sm left-0 right-0 py-2'
            style={{ bottom: '2.75rem' }}
          >
            {transcriptionResults.map(({ text, timestamp }, index) => {
              const formattedTimestamp = formatFloatToTime(timestamp);
              const isCurrent = isCurrentResult(timestamp, transcriptionResults[index + 1]?.timestamp);

              let currentStyle;
              let currentTimestampStyle;
              if (isCurrent) {
                currentStyle = 'bg-purple-custom text-white';
                currentTimestampStyle = 'bg-white text-purple-custom';
              } else {
                if (bottomBarMode === 'replay') {
                  currentStyle = 'hover:bg-gray-100';
                }
                currentTimestampStyle = 'bg-purple-custom2 text-white';
              }
              let cursorStyle;
              if (bottomBarMode === 'replay') {
                cursorStyle = 'cursor-pointer';
              }

              function onClick () {
                if (bottomBarMode === 'replay') {
                  dispatch(transcribeActions.updateCurrentTime(timestamp + 0.1));
                }
              }

              return (
                <div
                  key={index}
                  className={'flex flex-row gap-3 space-y-2 p-2 sm:rounded-lg transition-all duration-100 result ' + [currentStyle, cursorStyle].join(' ')}
                  onClick={onClick}
                >
                  <div
                    className={'h-6 rounded-[0.4rem] flex items-center justify-center text-sm shrink-0 transition-all duration-100 ' + currentTimestampStyle}
                    style={{ width: getTimestampWidth(formattedTimestamp) }}
                  >
                    {formattedTimestamp}
                  </div>
                  {text}
                </div>
              );
            })}
            {interimResult && (
              <div
                className='flex flex-row gap-3 space-y-2 p-2 sm:rounded-lg'
              >
                <div
                  className="bg-purple-custom2 text-white h-6 rounded-[0.4rem] flex items-center justify-center text-sm opacity-0 select-none shrink-0"
                  style={{ width: getTimestampWidth('0:00') }}
                >
                  0:00
                </div>
                {interimResult}
              </div>
            )}
          </div>
        </ScrollBox>
      );
    } else {
      content = (
        <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
          <div className="flex flex-col items-center space-y-4 mt-[40%]">
            <span className="icon-article text-6xl text-purple-custom" />
            <span className="text-center max-w-sm text-sm sm:text-base transition-text duration-100">
              Press the start button below to start transcribing.
            </span>
          </div>
        </div>
      );
    }
  }

  return loggedIn && (
    <div className='relative h-full w-full'>
      <Navbar />
      {content}
      <BottomBar />
      <Sidebar
        items={[
          { icon: 'icon-apps', label: 'Apps', path: '/' },
        ]}
      />
    </div>
  );
}
