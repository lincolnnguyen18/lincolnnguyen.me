import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ScreenContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ScreenContainer (props: ScreenContainerProps) {
  const className = twMerge('max-w-screen-sm mx-auto pt-11', props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
