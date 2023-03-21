import React from 'react';
import { useDispatch } from 'react-redux';
import { commonActions } from 'slices/commonSlice';
import { getScrollPositionFromBottom } from 'utils/measurementUtils';

export default function InitialLoad () {
  const dispatch = useDispatch();

  function onScroll () {
    dispatch(
      commonActions.updateSlice({
        scrollPositionFromTop: window.scrollY,
        scrollPositionFromBottom: getScrollPositionFromBottom(),
      }),
    );
  }

  function onResize () {
    dispatch(
      commonActions.updateSlice({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      }),
    );
  }

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <React.Fragment />;
}
