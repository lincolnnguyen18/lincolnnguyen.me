import React from 'react';
import _ from 'lodash';

interface WallpaperProps {
  imageUrl: string;
}

const positions = ['center center', 'center top', 'center bottom'];

export default function Wallpaper (props: WallpaperProps) {
  const [backgroundPosition, setBackgroundPosition] = React.useState('');

  React.useEffect(() => {
    setBackgroundPosition(_.sample(positions)!);
  }, []);

  // TODO: darken when on homescreen
  // const brightness = 0.85;
  const brightness = 0.60;

  return (
    <div
      className='z-[-1] fixed bottom-0 right-0 top-0 left-0 bg-cover bg-black'
      style={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundPosition,
        filter: `brightness(${brightness})`,
      }}
    />
  );
}
