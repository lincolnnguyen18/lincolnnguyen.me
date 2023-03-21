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

  return (
    <div className="z-[-1] fixed bottom-0 right-0 top-0 left-0 brightness-[0.85] bg-cover" style={{ backgroundImage: `url(${props.imageUrl})`, backgroundPosition }} />
  );
}
