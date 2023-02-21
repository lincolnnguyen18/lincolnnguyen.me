import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transcribeSelector } from '../../../slices/transcribeSlice';
import { commonActions, commonSelector } from '../../../slices/commonSlice';

export function SyncScrollButton () {
  const dispatch = useDispatch();
  const { mode } = useSelector(transcribeSelector);
  const { scrollPosition } = useSelector(commonSelector);

  React.useEffect(() => {
    const autoScrollOn = scrollPosition > document.body.scrollHeight - window.innerHeight - 100;
    dispatch(commonActions.setSlice({ autoScrollOn }));
  }, [scrollPosition]);

  React.useEffect(() => {
    if (mode !== 'record') {
      dispatch(commonActions.setSlice({ autoScrollOn: true }));
    }
  }, [mode]);

  // function onClick () {
  //   dispatch(commonActions.setSlice({ autoScrollOn: true }));
  //   dispatch(commonActions.scrollToBottom());
  // }

  // return mode === 'record' && (
  //   <div className={twMerge('text-white h-11 flex items-center fixed transform -translate-x-1/2 left-1/2 bottom-14 px-3 z-[1] justify-center bg-purple-custom backdrop-blur bg-opacity-80 rounded-xl transition-all duration-100', autoScrollOn ? 'opacity-0' : 'opacity-100')}>
  //     <Button twStyle="flex items-center gap-0.5 sm:gap-1 select-auto" onClick={onClick}>
  //       <span className='icon-down' />
  //       <span className="sm:text-base text-sm">Sync scroll</span>
  //     </Button>
  //   </div>
  // );

  return null;
}
