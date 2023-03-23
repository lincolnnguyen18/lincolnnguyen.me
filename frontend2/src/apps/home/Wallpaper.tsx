import { sample } from 'lodash';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
}

const positions = ['center center', 'center top', 'center bottom'];

export default function Wallpaper (props: Props) {
  const className = twMerge('z-[-1] fixed bottom-0 right-0 top-0 left-0 bg-cover', props.className);
  const [backgroundPosition, setBackgroundPosition] = useState('');

  useEffect(() => {
    setBackgroundPosition(sample(positions)!);
  }, []);

  // TODO: darken when on homescreen
  // const brightness = 0.85;
  const brightness = 0.60;

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundPosition,
        filter: `brightness(${brightness})`,
      }}
    />
  );
}
