import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

interface NavProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Nav (props: NavProps) {
  const className = twMerge('w-full h-11 fixed bg-opacity-80 transition-[border-radius] duration-300 z-[1] flex items-center', props.className);

  return (
    <Fragment>
      <div className='w-[1000%] h-11 fixed backdrop-blur bg-opacity-80 z-[1]' />
      <nav className={className}>
        {props.children}
      </nav>
    </Fragment>
  );
}
