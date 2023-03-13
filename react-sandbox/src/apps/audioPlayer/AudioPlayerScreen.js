import React from 'react';
import { NavbarBlur } from '../../components/NavbarBlur';
import { BackButton } from '../../components/BackButton';
import { Navbar } from '../../components/Navbar';
import { WhiteVignette } from '../../components/WhiteVignette';
import { OverflowContainer } from '../../components/OverflowContainer';
import { NavbarButton } from '../../components/NavbarButton';

export function AudioPlayerScreen () {
  React.useEffect(() => {
    const audio = document.getElementById('audio');
    audio.src = '/test.mp3';
  }, []);

  function play () {
    const audio = document.getElementById('audio');
    audio.play();
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
          <audio hidden={true} id="audio" />
          <NavbarButton dir="single" twStyle="justify-center" onClick={play}>Play</NavbarButton>
        </div>
      </OverflowContainer>
    </>
  );
}
