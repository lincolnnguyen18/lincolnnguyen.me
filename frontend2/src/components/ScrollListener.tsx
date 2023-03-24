import { useEffect } from 'react';

interface onScrollChangeProps {
  isScrolling: boolean;
  scrollLeft: number;
  scrollTop: number;
}

interface ScrollListenerProps {
  target?: HTMLDivElement | null;
  /**
   * How long before isScrolling is set to false
   */
  scrollTimeout?: number;
  onScrollChange: (_props: onScrollChangeProps) => void;
}

export default function ScrollListener (props: ScrollListenerProps) {
  const { target, scrollTimeout = 100, onScrollChange } = props;
  let scrollTimeoutId: ReturnType<typeof setTimeout>;

  const onScroll = (e: Event) => {
    const { scrollLeft, scrollTop } = e.target as HTMLElement;
    clearTimeout(scrollTimeoutId);
    onScrollChange({ isScrolling: true, scrollLeft, scrollTop });
    scrollTimeoutId = setTimeout(() => {
      onScrollChange({ isScrolling: false, scrollLeft, scrollTop });
    }, scrollTimeout);
  };

  useEffect(() => {
    if (!target) return;
    target.addEventListener('scroll', onScroll);
    return () => {
      target.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeoutId);
    };
  }, [target, scrollTimeout]);

  return null;
}

export type { onScrollChangeProps };
