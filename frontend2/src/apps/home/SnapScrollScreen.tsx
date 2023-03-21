import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SnapScrollContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export default function SnapScrollContainer (props: SnapScrollContainerProps) {
  const className = twMerge('snap-start shrink-0 h-[100vh] w-[100vw]', props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}