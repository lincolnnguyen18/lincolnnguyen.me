import React from 'react';
import theme from 'tailwindcss/defaultTheme.js';
import { NavbarBlur } from '../../../components/NavbarBlur.jsx';
import { Button } from '../../../components/Button.jsx';
import { WhiteVignette } from '../../../components/WhiteVignette.jsx';
import { Navbar } from '../../../components/Navbar.jsx';
import { ContainerButton } from '../../../components/ContainerButton.jsx';
import { OverflowContainer } from '../../../components/OverflowContainer.jsx';
import { BackButton } from '../../../components/BackButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../../../slices/commonSlice.js';
import { Divider } from '../../../components/Divider.jsx';
import { TranscriptionScreenMoreMenu } from './TranscriptionScreenMoreMenu.jsx';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice.js';
import { twMerge } from 'tailwind-merge';
import { Radio } from '../../../components/Radio.jsx';
import { BottomBar } from './BottomBar.jsx';

export function TranscriptionScreen () {
  const dispatch = useDispatch();
  const { windowValues, scrollPosition } = useSelector(commonSelector);
  const { mode } = useSelector(transcribeSelector);

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

  // eslint-disable-next-line no-unused-vars
  const [testTitle, setTestTitle] = React.useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed felis lacinia, malesuada metus eget, convallis diam. In vitae pulvinar est. Fusce ex lorem, euismod vitae consequat eu, rutrum quis est. Nunc vel tempor leo, et maximus mauris. Etiam tincidunt justo vestibulum imperdiet consectetur. Aenean ultricies dolor sit amet dolor aliquam, eget rutrum dolor ornare.');
  const testParts = ['Recorded on January 1, 2022 at 7:00 AM', 'Recorded on January 2, 2022 at 7:00 AM'];

  function getCurrentPart () {
    const parts = document.querySelectorAll('.part');
    let index = -1;
    if (!parts) return;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (scrollPosition < part.offsetTop - 52) {
        index = Math.max(1, i);
        break;
      }
    }
    if (index === -1) index = parts.length;
    return testParts[index - 1];
  }

  function maxPartResults (num = 10) {
    if (mode === 'edit') {
      return 1;
    } else if (mode === 'default') {
      return num;
    }
  }

  function handleDone () {
    dispatch(transcribeActions.setSlice({ mode: 'default' }));
  }

  return (
    <>
      <NavbarBlur twStyle="bg-purple-custom" />
      <Navbar twStyle="pr-3 pl-1">
        <BackButton linkPath="/transcribe/transcriptions" text="Transcriptions" />
        {mode === 'default' ? <TranscriptionScreenMoreMenu /> : <Button twStyle="text-base font-semibold" onClick={handleDone}>Done</Button>}
      </Navbar>
      <WhiteVignette />
      <OverflowContainer twStyle="pb-14 sm:gap-0">
        <div className="top-11" id="title-div">
          <div className="flex flex-col gap-0.5 mx-2">
            <div className="flex gap-2 items-center">
              <span className={twMerge('sm:text-xl text-lg font-semibold', mode === 'edit' && 'overflow-hidden truncate')}>{testTitle}</span>
              {mode === 'edit' && <Button><span className="icon-edit text-2xl cursor-pointer" /></Button>}
            </div>
            <span className="sm:text-base text-sm text-gray-subtext">Created Mon 4:02 AM · Updated 4:02 AM</span>
          </div>
          <Divider twStyle="mx-2 sm:mx-1" />
        </div>
        <div className="flex flex-col sm:gap-1">
          <Radio twStyle="mx-2 font-semibold part sm:text-base text-sm" active={mode === 'edit'}>
            <span>{testParts[0]}</span>
          </Radio>
          {[...Array(maxPartResults())].map((_, i) => {
            const formattedTimestamp = '4:44';
            const timestampWidth = getTimestampWidth(formattedTimestamp);

            return (
              <ContainerButton
                twStyle="flex items-center gap-3 w-full justify-between"
                key={i}
              >
                <div className="flex flex-row gap-3 p-2 sm:rounded-lg hover:bg-gray-hover active:bg-gray-active active:transition-all active:duration-200">
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
          <Divider twStyle="mx-2 sm:mx-1" />
          <Radio twStyle="mx-2 font-semibold part sm:text-base text-sm" active={mode === 'edit'}>
            <span>{testParts[1]}</span>
          </Radio>
          {[...Array(maxPartResults(20))].map((_, i) => {
            const formattedTimestamp = '4:44';
            const timestampWidth = getTimestampWidth(formattedTimestamp);

            return (
              <ContainerButton
                twStyle="flex items-center gap-3 w-full justify-between"
                key={i}
              >
                <div className="flex flex-row gap-3 p-2 sm:rounded-lg hover:bg-gray-hover active:bg-gray-active active:transition-all active:duration-200">
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
      {mode === 'default' && <div
        className="fixed top-11 bg-white w-full max-w-screen-sm transform -translate-x-1/2 left-1/2 backdrop-blur bg-opacity-80 transition-[opacity] duration-200"
        style={{ opacity: showSubNav() ? 1 : 0, pointerEvents: showSubNav() ? 'all' : 'none' }}
        onClick={() => dispatch(commonActions.scrollToTop())}
      >
        <div className="flex flex-col gap-0.5 my-2">
          <span className="sm:text-base text-sm font-semibold mx-2 overflow-hidden truncate">{testTitle !== 'Click to edit title' ? testTitle : 'Untitled'}</span>
          <span className="sm:text-base text-gray-subtext text-sm mx-2 overflow-hidden truncate">{getCurrentPart()}</span>
        </div>
        <div className="h-[2px] bg-gray-divider" />
      </div>}
      <BottomBar />
    </>
  );
}
