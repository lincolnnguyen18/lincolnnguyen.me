import React from 'react';
import { NavbarBlur } from '../../components/NavbarBlur';
import { BackButton } from '../../components/BackButton';
import { Navbar } from '../../components/Navbar';
import { WhiteVignette } from '../../components/WhiteVignette';
import { OverflowContainer } from '../../components/OverflowContainer';
import { NavbarButton } from '../../components/NavbarButton';

export function AudioPlayerScreen () {
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const audio = document.getElementById('audio');
    audio.src = '/test.m4a';
  }, []);

  function playPause () {
    const audio = document.getElementById('audio');
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  function seekTo () {
    const audio = document.getElementById('audio');
    audio.currentTime = 480;
  }

  return (
    <>
      <NavbarBlur twStyle="bg-red-custom" />
      <Navbar>
        <BackButton linkPath="/" text="Back" />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Audio Player</span>
      </Navbar>
      <WhiteVignette />
      <OverflowContainer>
        <div className="flex flex-col gap-2 items-center w-full">
          <audio hidden={false} controls id="audio" />
          <NavbarButton dir="single" twStyle="justify-center" onClick={playPause}>{playing ? 'Pause' : 'Play'}</NavbarButton>
          <NavbarButton dir="single" twStyle="justify-center" onClick={seekTo}>Seek to 480</NavbarButton>
        </div>
      </OverflowContainer>
    </>
  );
}
