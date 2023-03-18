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

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <React.Fragment />;
}
