import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { commonActions } from 'slices/commonSlice';
import { getScrollPositionFromBottom } from 'utils/scrollUtils';

export default function InitialLoad () {
  const dispatch = useDispatch();

  // add event listeners to update scroll position, screen width and screen height
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

  useEffect(() => {
    const body = document.body as HTMLElement;
    const classes = ['overflow-y-scroll'];
    body.classList.add(...classes);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      body.classList.remove(...classes);

      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <Fragment />;
}
