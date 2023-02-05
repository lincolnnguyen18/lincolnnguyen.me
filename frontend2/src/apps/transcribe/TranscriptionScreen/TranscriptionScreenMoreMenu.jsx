import { commonActions, commonSelector } from '../../../slices/commonSlice.js';
import { wait } from '../../../common/timeUtils.js';
import { NavbarGroupButton } from '../../../components/NavbarGroupButton.jsx';
import { NavbarGroupDivider } from '../../../components/NavbarGroupDivider.jsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/Button.jsx';
import { NavMenuButton } from '../../../components/NavMenuButton.jsx';
import { transcribeActions } from '../../../slices/transcribeSlice.js';

export function TranscriptionScreenMoreMenu () {
  const dispatch = useDispatch();
  const { scrollPosition } = useSelector(commonSelector);

  function closeMenu () {
    dispatch(commonActions.closeNavMenu());
  }

  async function handleChangeLanguage () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    const langs = { 'af-ZA': 'Afrikaans', 'id-ID': 'Bahasa Indonesia', 'ms-MY': 'Bahasa Melayu', 'ca-ES': 'Català', 'cs-CZ': 'Čeština', 'de-De': 'Deutsch', 'en-AU': 'English (Australia)', 'en-CA': 'English (Canada)', 'en-IN': 'English (India)', 'en-NZ': 'English (New Zealand)', 'en-ZA': 'English (South Africa)', 'en-GB': 'English (United Kingdom)', 'en-US': 'English (United States)', 'es-AR': 'Español (Argentina)', 'es-BO': 'Español (Bolivia)', 'es-CL': 'Español (Chile)', 'es-CO': 'Español (Colombia)', 'es-CR': 'Español (Costa Rica)', 'es-EC': 'Español (Ecuador)', 'es-SV': 'Español (El Salvador)', 'es-ES': 'Español (España)', 'es-US': 'Español (Estados Unidos)', 'es-GT': 'Español (Guatemala)', 'es-HN': 'Español (Honduras)', 'es-MX': 'Español (México)', 'es-NI': 'Español (Nicaragua)', 'es-PA': 'Español (Panamá)', 'es-PY': 'Español (Paraguay)', 'es-PE': 'Español (Perú)', 'es-PR': 'Español (Puerto Rico)', 'es-DO': 'Español (República Dominicana)', 'es-UY': 'Español (Uruguay)', 'es-VE': 'Español (Venezuela)', 'eu-ES': 'Euskara', 'fr-FR': 'Français', 'gl-ES': 'Galego', 'hr-HR': 'Hrvatski', 'zu-ZA': 'IsiZulu', 'is-IS': 'Íslenska', 'it-IT': 'Italiano (Italia)', 'it-CH': 'Italiano (Svizzera)', 'hu-HU': 'Magyar', 'nl-NL': 'Nederlands', 'nb-NO': 'Norsk bokmål', 'pl-PL': 'Polski', 'pt-BR': 'Português (Brasil)', 'pt-PT': 'Português (Portugal)', 'ro-RO': 'Română', 'sk-SK': 'Slovenčina', 'fi-FI': 'Suomi', 'sv-SE': 'Svenska', 'tr-TR': 'Türkçe', 'bg-BG': 'български', 'ru-RU': 'Pусский', 'sr-RS': 'Српски', 'ko-KR': '한국어', 'cmn-Hans-CN': '中文 普通话 (中国大陆)', 'cmn-Hans-HK': '中文 普通话 (香港)', 'cmn-Hant-TW': '中文 中文 (台灣)', 'yue-Hant-HK': '中文 粵語 (香港)', 'ja-JP': '日本語', la: 'Lingua latīna' };
    const langEntries = Object.entries(langs);

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          {langEntries.map(([code, language], index) => (
            <React.Fragment key={index}>
              <NavbarGroupButton twStyle="justify-between first:rounded-t-lg last:rounded-b-lg" onClick={() => console.log(code)} outerTwStyle="w-64">
                <span className="text-white">{language}</span>
                {index === 0 && <span className="icon-check text-2xl text-white" />}
              </NavbarGroupButton>
              {index !== langEntries.length - 1 && (
                <NavbarGroupDivider />
              )}
            </React.Fragment>
          ))}
        </div>
      ),
    }));
  }

  async function handleOpenInfo () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    const testTitle = 'This is a super long title so you should really go to the beach and relax';
    const testDuration = '6:15:47';
    const testCreated = '4:02 AM 4/20/2021';
    const testUpdated = '4:02 AM 4/20/2021';

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <div className="flex flex-col w-full text-white items-center pl-1">
          <div className="bg-black bg-opacity-50 rounded-lg w-full max-w-lg flex flex-col mt-2 mb-6 p-2 sm:p-3">
            <span className="font-semibold sm:text-lg text-base mb-2">{testTitle}</span>
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <span className="font-semibold sm:text-base text-sm">Duration</span>
                <span className="sm:text-base text-sm">{testDuration}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold sm:text-base text-sm">Created</span>
                <span className="sm:text-base text-sm">{testCreated}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold sm:text-base text-sm">Updated</span>
                <span className="sm:text-base text-sm">{testUpdated}</span>
              </div>
            </div>
          </div>
          <NavMenuButton onClick={closeMenu} twStyle="justify-center">Close</NavMenuButton>
        </div>
      ),
    }));
  }

  // eslint-disable-next-line no-unused-vars
  async function handleFilterBySpeaker () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    const options = ['Both speakers', 'Lincoln Nguyen', 'Maimi Yoshikawa'];
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          {options.map((option, index) => (
            <React.Fragment key={index}>
              <NavbarGroupButton twStyle="justify-between">
                <span className="text-white">{option}</span>
                {index === 0 && <span className="icon-check text-2xl text-white" />}
              </NavbarGroupButton>
              {index !== options.length - 1 && <NavbarGroupDivider />}
            </React.Fragment>
          ))}
        </div>
      ),
    }));
  }

  const [turningOnEditMode, setTurningOnEditMode] = React.useState(false);

  function turnOnEditMode () {
    closeMenu();
    if (scrollPosition === 0) {
      dispatch(transcribeActions.setSlice({ mode: 'edit' }));
    } else {
      dispatch(commonActions.scrollToTop());
      setTurningOnEditMode(true);
    }
  }

  React.useEffect(() => {
    if (scrollPosition === 0 && turningOnEditMode) {
      setTimeout(() => {
        dispatch(transcribeActions.setSlice({ mode: 'edit' }));
        setTurningOnEditMode(false);
      }, 50);
    }
  }, [scrollPosition]);

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
          <NavbarGroupButton stopPropagation={true} onClick={handleChangeLanguage}>
            <span className="text-[0.66rem] w-[20px] h-[20px] ml-[2px] mr-[1px] font-bold text-gray-500 bg-white rounded-md flex items-center justify-center">JA</span>
            <span className="text-white">Change language</span>
          </NavbarGroupButton>
          <NavbarGroupDivider />
          <NavbarGroupButton stopPropagation={true} onClick={turnOnEditMode}>
            <span className="icon-edit text-2xl text-white" />
            <span className="text-white">Edit parts</span>
          </NavbarGroupButton>
          <NavbarGroupDivider />
          {/*<NavbarGroupButton onClick={handleFilterBySpeaker} stopPropagation={true}>*/}
          {/*  <span className='icon-two-users text-2xl text-white' />*/}
          {/*  <span className="text-white">Filter by speaker</span>*/}
          {/*</NavbarGroupButton>*/}
          {/*<NavbarGroupDivider />*/}
          <NavbarGroupButton twStyle="rounded-b-lg" stopPropagation={true} onClick={handleOpenInfo}>
            <span className='icon-info text-2xl text-white' />
            <span className="text-white">Transcription info</span>
          </NavbarGroupButton>
        </div>
      ),
    }));
  }

  return (
    <Button twStyle="icon-more-horiz" onClick={openMoreMenu} />
  );
}
