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
import { wait } from '../../common/timeUtils.js';
import { Divider } from '../../components/Divider.jsx';
import { NavbarGroupDivider } from '../../components/NavbarGroupDivider.jsx';

export function TranscriptionScreen () {
  const dispatch = useDispatch();
  const { windowValues, scrollPosition } = useSelector(commonSelector);

  async function handleChangeLanguageClick () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    const langs = { 'af-ZA': 'Afrikaans', 'id-ID': 'Bahasa Indonesia', 'ms-MY': 'Bahasa Melayu', 'ca-ES': 'Català', 'cs-CZ': 'Čeština', 'de-De': 'Deutsch', 'en-AU': 'English (Australia)', 'en-CA': 'English (Canada)', 'en-IN': 'English (India)', 'en-NZ': 'English (New Zealand)', 'en-ZA': 'English (South Africa)', 'en-GB': 'English (United Kingdom)', 'en-US': 'English (United States)', 'es-AR': 'Español (Argentina)', 'es-BO': 'Español (Bolivia)', 'es-CL': 'Español (Chile)', 'es-CO': 'Español (Colombia)', 'es-CR': 'Español (Costa Rica)', 'es-EC': 'Español (Ecuador)', 'es-SV': 'Español (El Salvador)', 'es-ES': 'Español (España)', 'es-US': 'Español (Estados Unidos)', 'es-GT': 'Español (Guatemala)', 'es-HN': 'Español (Honduras)', 'es-MX': 'Español (México)', 'es-NI': 'Español (Nicaragua)', 'es-PA': 'Español (Panamá)', 'es-PY': 'Español (Paraguay)', 'es-PE': 'Español (Perú)', 'es-PR': 'Español (Puerto Rico)', 'es-DO': 'Español (República Dominicana)', 'es-UY': 'Español (Uruguay)', 'es-VE': 'Español (Venezuela)', 'eu-ES': 'Euskara', 'fr-FR': 'Français', 'gl-ES': 'Galego', 'hr-HR': 'Hrvatski', 'zu-ZA': 'IsiZulu', 'is-IS': 'Íslenska', 'it-IT': 'Italiano (Italia)', 'it-CH': 'Italiano (Svizzera)', 'hu-HU': 'Magyar', 'nl-NL': 'Nederlands', 'nb-NO': 'Norsk bokmål', 'pl-PL': 'Polski', 'pt-BR': 'Português (Brasil)', 'pt-PT': 'Português (Portugal)', 'ro-RO': 'Română', 'sk-SK': 'Slovenčina', 'fi-FI': 'Suomi', 'sv-SE': 'Svenska', 'tr-TR': 'Türkçe', 'bg-BG': 'български', 'ru-RU': 'Pусский', 'sr-RS': 'Српски', 'ko-KR': '한국어', 'cmn-Hans-CN': '中文 普通话 (中国大陆)', 'cmn-Hans-HK': '中文 普通话 (香港)', 'cmn-Hant-TW': '中文 中文 (台灣)', 'yue-Hant-HK': '中文 粵語 (香港)', 'ja-JP': '日本語', la: 'Lingua latīna' };

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          {Object.entries(langs).map(([code, language], index) => (
            <>
              <NavbarGroupButton key={index} twStyle="justify-between first:rounded-t-lg last:rounded-b-lg" onClick={() => console.log(code)} outerTwStyle="w-64">
                <span className="text-white">{language}</span>
                {index === 0 && <span className="icon-check text-2xl text-white" />}
              </NavbarGroupButton>
              {index !== Object.entries(langs).length - 1 && (
                <NavbarGroupDivider />
              )}
            </>
          ))}
        </div>
      ),
    }));
  }

  async function handleFilterBySpeakerClick () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    const options = ['Both speakers', 'Lincoln Nguyen', 'Maimi Yoshikawa'];
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          {options.map((option, index) => (
            <>
              <NavbarGroupButton key={index} twStyle="justify-between">
                <span className="text-white">{option}</span>
                {index === 0 && <span className="icon-check text-2xl text-white" />}
              </NavbarGroupButton>
              {index !== options.length - 1 && <NavbarGroupDivider />}
            </>
          ))}
        </div>
      ),
    }));
  }

  function openMoreMenu () {
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          <NavbarGroupButton twStyle="rounded-t-lg" disabled={true}>
            <span className='icon-save text-2xl text-white' />
            <span className="text-white">Save transcription</span>
          </NavbarGroupButton>
          <NavbarGroupDivider />
          <NavbarGroupButton stopPropagation={true} onClick={handleChangeLanguageClick}>
            <span className="text-[0.66rem] w-[20px] h-[20px] ml-[2px] mr-[1px] font-bold text-gray-500 bg-white rounded-md flex items-center justify-center">JA</span>
            <span className="text-white">Change language</span>
          </NavbarGroupButton>
          <NavbarGroupDivider />
          <NavbarGroupButton onClick={handleFilterBySpeakerClick} stopPropagation={true}>
            <span className='icon-two-users text-2xl text-white' />
            <span className="text-white">Filter by speaker</span>
          </NavbarGroupButton>
          <NavbarGroupDivider />
          <NavbarGroupButton twStyle="rounded-b-lg" stopPropagation={true}>
            <span className='icon-info text-2xl text-white' />
            <span className="text-white">Transcription info</span>
          </NavbarGroupButton>
        </div>
      ),
    }));
  }

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
        <Button twStyle="icon-more-horiz" onClick={openMoreMenu} />
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
