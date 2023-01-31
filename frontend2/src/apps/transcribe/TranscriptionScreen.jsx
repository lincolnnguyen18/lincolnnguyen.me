import React from 'react';
import theme from 'tailwindcss/defaultTheme.js';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';
import { Button } from '../../components/Button.jsx';
import { WhiteVignette } from '../../components/WhiteVignette.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { ContainerButton } from '../../components/ContainerButton.jsx';
import { OverflowContainer } from '../../components/OverflowContainer.jsx';
import { BackButton } from '../../components/BackButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../../slices/commonSlice.js';
import { NavbarGroupButton } from '../../components/NavbarGroupButton.jsx';

export function TranscriptionScreen () {
  const dispatch = useDispatch();
  const { windowValues } = useSelector(commonSelector);

  function openMoreMenu () {
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: true,
      children: (
        <div className="flex flex-col">
          <NavbarGroupButton type="top">
            <span className='icon-save text-2xl text-white' />
            <span className="text-white">Save transcription</span>
          </NavbarGroupButton>
          {Array(100).fill(0).map((_, i) => (
            <NavbarGroupButton key={i}>
              <span className='icon-save text-2xl text-white' />
              <span className="text-white">Save transcription</span>
            </NavbarGroupButton>
          ))}
          <NavbarGroupButton type="bottom">
            <span className='icon-info text-2xl text-white' />
            <span className="text-white">Transcription info</span>
          </NavbarGroupButton>
        </div>
      ),
    }));
  }

  const currentStyle = 'hover:bg-gray-hover active:bg-gray-active cursor-pointer active:transition-all active:duration-200';

  function getTimestampWidth (timestamp) {
    if (windowValues.width > parseInt(theme.screens.sm)) {
      if (timestamp.length === 4) {
        return '2rem';
      } else if (timestamp.length === 5) {
        return '2.5rem';
      } else if (timestamp.length === 7) {
        return '3.3rem';
      } else {
        return '3.9rem';
      }
    } else {
      if (timestamp.length === 4) {
        return '1.7rem';
      } else if (timestamp.length === 5) {
        return '2.2rem';
      } else if (timestamp.length === 7) {
        return '2.9rem';
      } else {
        return '3.4rem';
      }
    }
  }

  return (
    <>
      <NavbarBlur twStyle="bg-purple-custom" />
      <Navbar twStyle="pr-3 pl-1">
        <BackButton linkPath="/transcribe/transcriptions" />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Unsaved</span>
        <Button twStyle="icon-more-horiz" onClick={openMoreMenu} />
      </Navbar>
      <WhiteVignette />
      <OverflowContainer twStyle="pb-14">
        {[...Array(50)].map((_, i) => {
          const formattedTimestamp = '4:44';
          const timestampWidth = getTimestampWidth(formattedTimestamp);

          return (
            <ContainerButton
              twStyle="flex items-center gap-3 w-full justify-between"
              key={i}
            >
              <div className={`flex flex-row gap-3 p-2 sm:rounded-lg ${currentStyle}`}>
                <div className="h-6 rounded-[0.4rem] flex h-6 items-center px-1 bg-[#8c84c4]">
                  <div className='text-xs sm:text-sm text-white shrink-0 overflow-hidden truncate' style={{ width: timestampWidth }}>
                    {formattedTimestamp}
                  </div>
                </div>
                <span className="text-sm sm:text-base text-left w-full">今日の底堅さが改めて10名となりましたアメリカの去年12月の雇用統計は景気の動向を敏感に反映する非農業部門の就業者数が前の日に比べ223000人増え市場の予想を上回</span>
              </div>
            </ContainerButton>
          );
        })}
      </OverflowContainer>
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300'>
        <Button twStyle="flex items-center gap-1 absolute transform -translate-x-1/2 left-1/2">
          <span className='icon-mic' />
          <span className="text-base">Start transcribing</span>
        </Button>
      </div>
    </>
  );
}
