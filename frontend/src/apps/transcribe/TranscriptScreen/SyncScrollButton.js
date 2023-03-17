import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transcribeSelector } from '../../../slices/transcribeSlice';
import { commonActions, commonSelector } from '../../../slices/commonSlice';
import { Button } from '../../../components/Button';

export function SyncScrollButton () {
  const dispatch = useDispatch();
  const { mode } = useSelector(transcribeSelector);
  const { scrollPosition, autoScrollOn, distanceFromBottom } = useSelector(commonSelector);
  const [ previousScrollPosition, setPreviousScrollPosition ] = React.useState(scrollPosition);

  React.useEffect(() => {
    setPreviousScrollPosition(scrollPosition);
    const difference = previousScrollPosition - scrollPosition;
    const scrollingUp = difference > 30;
    if (scrollingUp && distanceFromBottom >= 130) {
      dispatch(commonActions.setSlice({ autoScrollOn: false }));
    }
  }, [scrollPosition]);

  React.useEffect(() => {
    dispatch(commonActions.setSlice({ autoScrollOn: distanceFromBottom < 130 }));
  }, [distanceFromBottom]);

  React.useEffect(() => {
    if (mode !== 'record') {
      dispatch(commonActions.setSlice({ autoScrollOn: true }));
    }
  }, [mode]);

  React.useEffect(() => {
    return () => {
      dispatch(commonActions.setSlice({ autoScrollOn: false }));
    };
  }, []);

  async function onClick () {
    dispatch(commonActions.setSlice({ autoScrollOn: true }));
    dispatch(commonActions.scrollToBottomHard());
  }

  function hideButton () {
    return autoScrollOn || mode !== 'record';
  }

  return (
    <div
      className='text-white h-11 flex items-center fixed transform -translate-x-1/2 left-1/2 bottom-14 px-3 z-[1] justify-center bg-purple-custom backdrop-blur bg-opacity-80 rounded-xl transition-all duration-100 cursor-pointer'
      style={{
        opacity: hideButton() ? 0 : 1,
        pointerEvents: hideButton() ? 'none' : 'auto',
      }}
      onClick={onClick}
    >
      <Button className='flex items-center gap-0.5 sm:gap-1 select-auto' onClick={onClick}>
        <span className='icon-down' />
        <span className='sm:text-base text-sm'>Sync scroll</span>
      </Button>
    </div>
  );
}
