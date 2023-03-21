import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ScreenProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Screen (props: ScreenProps) {
  const className = twMerge('max-w-screen-sm mx-auto pt-11', props.className);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
