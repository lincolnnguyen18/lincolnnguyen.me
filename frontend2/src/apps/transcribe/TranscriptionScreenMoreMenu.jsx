import { commonActions } from '../../slices/commonSlice.js';
import { wait } from '../../common/timeUtils.js';
import { NavbarGroupButton } from '../../components/NavbarGroupButton.jsx';
import { NavbarGroupDivider } from '../../components/NavbarGroupDivider.jsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/Button.jsx';

export function TranscriptionScreenMoreMenu () {
  const dispatch = useDispatch();

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

  return (
    <Button twStyle="icon-more-horiz" onClick={openMoreMenu} />
  );
}
