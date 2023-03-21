import React from 'react';

interface onScrollChangeProps {
  isScrolling: boolean;
  scrollLeft: number;
  scrollTop: number;
}

interface ScrollListenerProps {
  target?: HTMLElement | Window;
  scrollTimeout?: number;
  onScrollChange: (_props: onScrollChangeProps) => void;
}

export default function ScrollListener ({
  target = window,
  scrollTimeout = 100,
  onScrollChange,
}: ScrollListenerProps) {
  let scrollTimeoutId: ReturnType<typeof setTimeout>;

  const handleScroll = (e: Event) => {
    const { scrollLeft, scrollTop } = e.target as HTMLElement;
    clearTimeout(scrollTimeoutId);
    onScrollChange({ isScrolling: true, scrollLeft, scrollTop });
    scrollTimeoutId = setTimeout(() => {
      onScrollChange({ isScrolling: false, scrollLeft, scrollTop });
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

export type { onScrollChangeProps };
