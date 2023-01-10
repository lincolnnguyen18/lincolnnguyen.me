import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../shared/components/Sidebar';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';

export function TranscriptionScreen () {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { id } = useParams();
  const { loggedIn } = useSelector(sharedSelector);
  const { bottomBar } = useSelector(transcribeSelector);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [transcriptions, setTranscriptions] = React.useState([]);

  React.useEffect(() => {
    // fill messages array with 100 random numbers
    const newTranscriptions = [];
    for (let i = 0; i < 100; i++) {
      newTranscriptions.push(Math.floor(Math.random() * 20));
    }
    setTranscriptions(newTranscriptions);
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

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      <div
        className='flex flex-col space-y-3 overflow-y-scroll fixed top-11 w-full max-w-screen-sm transition-all duration-300'
        onScroll={onScroll}
        style={{ bottom: bottomBar.state === 'open' ? '2.75rem' : '0' }}
      >
        {transcriptions.map((transcription, index) => (
          <div
            key={index}
            className='flex flex-col space-y-2 px-4 py-2 items-center'
          >
            {transcription}
          </div>
        ))}
      </div>
      <div
        className="bg-purple-custom fixed bottom-0 w-full max-w-screen-sm sm:rounded-t-lg text-white flex items-center h-11 px-3 justify-between transition-all duration-300"
        style={{ bottom: bottomBar.state === 'open' ? '0' : '-2.75rem' }}
      >
        <span className="sm:text-sm text-xs">0:00</span>
        <div className="flex items-center gap-1 select-none cursor-pointer">
          <span className="icon-mic text-2xl" />
          <span className="sm:text-base text-sm">Start transcribing</span>
        </div>
        <span className="sm:text-sm text-xs">0:00</span>
      </div>
      <Sidebar
        items={[
          { icon: 'icon-apps', label: 'Apps', path: '/' },
        ]}
      />
    </div>
  );
}
