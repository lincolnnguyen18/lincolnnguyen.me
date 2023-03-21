import React from 'react';

interface ScrollListenerProps {
  target?: HTMLElement | Window;
  scrollTimeout?: number;
  onScrollChange: (_isScrolling: boolean) => void;
}

function ScrollListener ({
  target = window,
  scrollTimeout = 100,
  onScrollChange,
}: ScrollListenerProps) {
  let scrollTimeoutId: ReturnType<typeof setTimeout>;

  const handleScroll = () => {
    clearTimeout(scrollTimeoutId);
    onScrollChange(true);
    scrollTimeoutId = setTimeout(() => {
      onScrollChange(false);
    }, scrollTimeout);
  };

  React.useEffect(() => {
    target.addEventListener('scroll', handleScroll);
    return () => {
      target.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutId);
    };
  }, [target, scrollTimeout]);

  return null;
}

export default ScrollListener;
