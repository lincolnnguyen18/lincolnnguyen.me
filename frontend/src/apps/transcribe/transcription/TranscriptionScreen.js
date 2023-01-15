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

export function TranscriptionScreen () {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { id } = useParams();
  const { loggedIn, screenWidth } = useSelector(sharedSelector);
  const { bottomBarMode, transcriptionResults } = useSelector(transcribeSelector);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);

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
    console.log('final result', result);
  }

  function onInterimResult (result) {
    console.log('interim result', result);
  }

  React.useEffect(() => {
    dispatch(transcribeActions.resetSlice());
    // fill messages array with 100 random numbers
    const transcriptionResults = [];
    for (let i = 0; i < 100; i++) {
      transcriptionResults.push(Math.floor(Math.random() * 20));
    }
    dispatch(transcribeActions.setSlice({ transcriptionResults }));

    const recorder = new Recorder({ onDurationChange, onTimeUpdate, onEnded });
    const transcriber = new Transcriber({ onFinalResult, onInterimResult });
    dispatch(transcribeActions.setSlice({ player: recorder.player, recorder, transcriber }));
  }, []);

  function onScroll (e) {
    const scrollTop = e.target.scrollTop;
    // console.log('scrollTop', scrollTop);
    const isAtBottom = scrollTop + e.target.clientHeight >= e.target.scrollHeight - 10;
    const isAtTop = scrollTop <= 10;
    // console.log('isAtBottom', isAtBottom);
    if ((scrollTop > lastScrollTop && !isAtTop) || isAtBottom) {
      // console.log('down');
      dispatch(transcribeActions.closeBottomBar());
    } else {
      // console.log('up');
      dispatch(transcribeActions.openBottomBar());
    }
    setLastScrollTop(e.target.scrollTop);
  }

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

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      <div
        className="space-y-4 fixed overflow-y-scroll left-0 right-0 top-11"
        style={{ bottom: scrollboxBottom, paddingBottom: scrollboxPaddingBottom }}
      >
        <div
          className='flex flex-col space-y-3 top-11 w-full mx-auto max-w-screen-sm transition-all duration-300 left-0 right-0 items-center'
          onScroll={onScroll}
          style={{ bottom: '2.75rem' }}
        >
          {transcriptionResults.map((transcription, index) => (
            <div
              key={index}
              className='flex flex-col space-y-2 px-4 py-2 items-center'
            >
              {transcription}
            </div>
          ))}
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
