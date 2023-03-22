import hexToRgba from 'hex-to-rgba';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export default function Nav (props: NavProps) {
  const { className, children, backgroundColor, ...rest } = props;
  const mergedClassName = twMerge('w-full h-11 fixed transition-[border-radius] duration-300 z-[1] flex items-center', className);

  const backgroundColorAdjusted = backgroundColor ? hexToRgba(backgroundColor, 0.8) : 'transparent';

  return (
    <Fragment>
      <div
        className='w-[1000%] h-11 fixed backdrop-blur bg-opacity-80 z-[1]'
        style={{ backgroundColor: backgroundColorAdjusted }}
      />
      <nav className={mergedClassName} {...rest}>
        {children}
      </nav>
    </Fragment>
  );
}
