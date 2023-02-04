import React from 'react';
import theme from 'tailwindcss/defaultTheme.js';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';
import { Button } from '../../components/Button.jsx';
import { WhiteVignette } from '../../components/WhiteVignette.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { ContainerButton } from '../../components/ContainerButton.jsx';
import { OverflowContainer } from '../../components/OverflowContainer.jsx';
import { BackButton } from '../../components/BackButton.jsx';
import { useSelector } from 'react-redux';
import { commonSelector } from '../../slices/commonSlice.js';
import { Divider } from '../../components/Divider.jsx';
import { TranscriptionScreenMoreMenu } from './TranscriptionScreenMoreMenu.jsx';

export function TranscriptionScreen () {
  const { windowValues, scrollPosition } = useSelector(commonSelector);

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

  function showSubNav () {
    const titleDiv = document.getElementById('title-div');
    if (!titleDiv) return false;
    return scrollPosition > titleDiv.offsetTop + titleDiv.offsetHeight - 52;
  }

  function scrollToTop () {
    window.scrollTo({
      top: 0,
    });
    const container = document.getElementById('overflow-container');
    container.scrollTo({
      top: 0,
    });
  }

  const testTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu tincidunt nunc. Vivamus viverra feugiat libero, ornare mollis risus tempus id. Aliquam erat volutpat.';

  return (
    <>
      <NavbarBlur twStyle="bg-purple-custom" />
      <Navbar twStyle="pr-3 pl-1">
        <BackButton linkPath="/transcribe/transcriptions" text="Transcriptions" />
        <TranscriptionScreenMoreMenu />
      </Navbar>
      <WhiteVignette />
      <OverflowContainer twStyle="pb-14 sm:gap-0">
        <div className="top-11" id="title-div">
          <div className="flex flex-col gap-0.5">
            <span className="sm:text-xl text-lg font-semibold mx-2">{testTitle}</span>
            <span className="mx-2 sm:text-base text-sm text-gray-subtext">Created Mon 4:02 AM · Updated 4:02 AM</span>
          </div>
          <Divider twStyle="mx-2 sm:mx-1" />
        </div>
        <div className="flex flex-col sm:gap-1">
          {[...Array(50)].map((_, i) => {
            const formattedTimestamp = '4:44';
            const timestampWidth = getTimestampWidth(formattedTimestamp);

            return (
              <ContainerButton
                twStyle="flex items-center gap-3 w-full justify-between"
                key={i}
              >
                <div className="flex flex-row gap-3 p-2 sm:rounded-lg hover:bg-gray-hover active:bg-gray-active cursor-pointer active:transition-all active:duration-200">
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
        </div>
      </OverflowContainer>
      <div
        className="fixed top-11 bg-white w-full max-w-screen-sm transform -translate-x-1/2 left-1/2 backdrop-blur bg-opacity-80 transition-[opacity] duration-200"
        style={{ opacity: showSubNav() ? 1 : 0, pointerEvents: showSubNav() ? 'all' : 'none' }}
        onClick={scrollToTop}
      >
        <div className="flex flex-col gap-0.5 my-2">
          <span className="sm:text-base text-sm font-semibold mx-2 overflow-hidden truncate">{testTitle}</span>
        </div>
        <div className="h-[2px] bg-gray-divider" />
      </div>
      <div className='text-white max-w-screen-sm w-full h-11 flex items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between bg-purple-custom backdrop-blur bg-opacity-80 sm:rounded-t-2xl transition-[border-radius] duration-300'>
        <Button twStyle="flex items-center gap-1 absolute transform -translate-x-1/2 left-1/2 select-auto">
          <span className='icon-mic' />
          <span className="text-base">Start transcribing</span>
        </Button>
      </div>
    </>
  );
}
