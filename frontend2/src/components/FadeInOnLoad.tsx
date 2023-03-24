import { useState, useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';
import { Action } from '@remix-run/router';

interface FadeInOnLoadProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Duration of fade in transition in milliseconds (default: 200)
   */
  duration?: number;
  fadeOnNavigationPop?: boolean;
}

function FadeInOnLoad (props: FadeInOnLoadProps) {
  const { duration = 200, fadeOnNavigationPop = false } = props;
  const navigationType = useNavigationType();
  const { children } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [usingFadingTransition, setUsingFadingTransition] = useState(false);

  // use fading transition only if history not being popped
  useEffect(() => {
    if (!children) return;

    if (navigationType.includes(Action.Pop) && !fadeOnNavigationPop) {
      setUsingFadingTransition(false);
    } else {
      setUsingFadingTransition(true);
    }

    setIsVisible(true);
  }, [navigationType, children]);
    

  return (
    <div
      style = {{
        opacity: isVisible ? 1 : 0,
        transition: usingFadingTransition ? `opacity ${duration}ms ease-out` : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default FadeInOnLoad;
