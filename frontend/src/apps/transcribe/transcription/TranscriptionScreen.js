import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../shared/components/Sidebar';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { Recorder } from '../../../shared/utils/recorder';
import { BottomBar } from './BottomBar';
import { Transcriber } from '../../../shared/utils/transcriber';
import { screenSizes } from '../../../shared/clients';
import { formatFloatToTime } from '../../../shared/utils/stringUtils';

export function TranscriptionScreen () {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { id } = useParams();
  const { loggedIn, screenWidth } = useSelector(sharedSelector);
  const { bottomBarMode, transcriptionResults, interimResult } = useSelector(transcribeSelector);

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

  const [scrollboxBottom, setScrollboxBottom] = React.useState(0);
  const [scrollboxPaddingBottom, setScrollboxPaddingBottom] = React.useState(0);

  React.useEffect(() => {
    if (bottomBarMode === 'replay') {
      if (screenWidth >= parseInt(screenSizes.sm)) {
        setScrollboxBottom(0);
        setScrollboxPaddingBottom('6rem');
      } else {
        setScrollboxBottom('6rem');
        setScrollboxPaddingBottom(0);
      }
    } else {
      if (screenWidth >= parseInt(screenSizes.sm)) {
        setScrollboxBottom(0);
        setScrollboxPaddingBottom('2.75rem');
      } else {
        setScrollboxBottom('2.75rem');
        setScrollboxPaddingBottom(0);
      }
    }
  }, [bottomBarMode, screenWidth]);

  function getTimestampWidth (timestamp) {
    // if x:xx, then 1.5rem
    // if xx:xx, then 2.5rem
    // if x:xx:xx, then 2.5rem
    // if xx:xx:xx, then 3.5rem
    // else fit to content
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

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      <div
        className="space-y-4 fixed overflow-y-scroll left-0 right-0 top-11"
        style={{ bottom: scrollboxBottom, paddingBottom: scrollboxPaddingBottom }}
      >
        <div
          className='flex flex-col top-11 w-full mx-auto max-w-screen-sm transition-all duration-300 left-0 right-0 pt-2'
          style={{ bottom: '2.75rem' }}
        >
          {transcriptionResults.map(({ text, timestamp }, index) => {
            const formattedTimestamp = formatFloatToTime(timestamp);

            return (
              <div
                key={index}
                className='flex flex-row gap-3 space-y-2 px-4 py-2 hover:bg-gray-100 sm:rounded-lg'
              >
                <div
                  className="bg-purple-custom2 text-white h-6 rounded-[0.4rem] flex items-center justify-center text-sm shrink-0"
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
              className='flex flex-row gap-3 space-y-2 px-4 py-2 hover:bg-gray-100 sm:rounded-lg'
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
      </div>
      <BottomBar />
      <Sidebar
        items={[
          { icon: 'icon-apps', label: 'Apps', path: '/' },
        ]}
      />
    </div>
  );
}
