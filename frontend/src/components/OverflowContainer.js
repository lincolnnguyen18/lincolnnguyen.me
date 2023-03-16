import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useDispatch } from 'react-redux';
import { commonActions } from '../slices/commonSlice.js';

export function OverflowContainer ({ children, className }) {
  const dispatch = useDispatch();
  // const { browser } = useSelector(commonSelector);
  // const fixedScroll = browser?.os.startsWith('iOS') || browser?.name.startsWith('safari');/**/
  const fixedScroll = false;

  React.useEffect(() => {
    if (fixedScroll) {
      function onScroll (e) {
        const scrollPosition = e.target.scrollTop;
        const distanceFromBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        // console.log('distanceFromBottom', distanceFromBottom);
        dispatch(commonActions.setSlice({ scrollPosition, distanceFromBottom }));
      }
      const overflowContainer = document.getElementById('overflow-container');
      overflowContainer.onscroll = onScroll;
    } else {
      function onScroll () {
        const scrollPosition = window.scrollY;
        const boundingRect = document.body.getBoundingClientRect();
        const distanceFromBottom = boundingRect.bottom - window.innerHeight;
        // console.log('distanceFromBottom', distanceFromBottom);
        dispatch(commonActions.setSlice({ scrollPosition, distanceFromBottom }));
      }
      document.body.onscroll = onScroll;
    }
  }, []);

  if (fixedScroll) {
    return (
      <div className="overflow-y-scroll fixed top-0 bottom-0 left-0 right-0" id="overflow-container">
        <div className={twMerge('max-w-screen-sm mx-auto w-full sm:px-2 pt-14 pb-3 flex flex-col', className)}>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 relative overflow-y-auto">
        <div className={twMerge('max-w-screen-sm mx-auto w-full sm:px-2 pt-14 pb-3 flex flex-col', className)}>
          {children}
        </div>
      </div>
    );
  }
}
