import React from 'react';
import { Button } from '../../components/Button.jsx';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../slices/commonSlice.js';
import { OverflowContainer } from '../../components/OverflowContainer.jsx';
import { IconMessage } from '../../components/IconMessage.jsx';
import { WhiteVignette } from '../../components/WhiteVignette.jsx';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';

export function TranscriptionsScreen () {
  const dispatch = useDispatch();

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  return (
    <>
      <NavbarBlur twStyle="bg-purple-custom" />
      <nav className='text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between'>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Transcriptions</span>
        <Button twStyle="icon-add" />
      </nav>
      <WhiteVignette />
      <OverflowContainer>
        <IconMessage
          iconStyle="icon-article text-purple-custom"
          messageText="You have no transcriptions. Add a transcription by pressing the plus button at the top right."
        />
      </OverflowContainer>
    </>
  );
}
