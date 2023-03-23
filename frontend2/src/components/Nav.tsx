import hexToRgba from 'hex-to-rgba';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
  text?: string;
}

export default function Nav (props: Props) {
  const { className, children, backgroundColor, text, ...rest } = props;
  const mergedClassName = twMerge('w-full h-11 justify-between fixed transition-[border-radius] duration-300 z-[1] flex items-center', className);

  const backgroundColorAdjusted = backgroundColor ? hexToRgba(backgroundColor, 0.8) : 'transparent';

  let textDiv = null;
  if (text) {
    textDiv = (
      <span className='font-semibold absolute left-1/2 transform -translate-x-1/2'>{text}</span>
    );
  }

  return (
    <Fragment>
      <div
        className='w-[1000%] h-11 fixed backdrop-blur bg-opacity-80 z-[1]'
        style={{ backgroundColor: backgroundColorAdjusted }}
      />
      <nav className={mergedClassName} {...rest}>
        {textDiv}
        {children}
      </nav>
    </Fragment>
  );
}
