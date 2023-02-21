import { commonActions, commonSelector } from '../../../slices/commonSlice.js';
import { wait } from '../../../common/timeUtils.js';
import { NavbarButton } from '../../../components/NavbarButton';
import { GroupDivider } from '../../../components/GroupDivider';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/Button';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice.js';
import { GroupInput } from '../../../components/GroupInput';
import { Dropdown } from '../../../components/Dropdown';

export function MoreMenu ({ disabled }) {
  const dispatch = useDispatch();
  const { mode, recorder, transcriber, playing, transcribeLanguage, translateLanguage, partsOrder, createdAt, playbackSpeed, translator } = useSelector(transcribeSelector);
  const { scrollPosition } = useSelector(commonSelector);

  function closeMenu () {
    dispatch(commonActions.closeNavMenu());
  }

  async function handleOpenInfo () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    const testTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vestibulum scelerisque. Nullam pharetra felis nulla, ut finibus purus sodales at. Donec sit amet interdum libero, lobortis consectetur orci. Maecenas ac molestie libero. Mauris nibh velit, dapibus quis magna a, blandit accumsan turpis. Proin ullamcorper, augue a ullamcorper lacinia, eros dolor euismod turpis, eu vulputate enim ligula at nisi.';
    const testDuration = '6:15:47';
    const testCreated = '4:02 AM 4/20/2021';
    const testUpdated = '4:02 AM 4/20/2021';

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <div className="flex flex-col w-full text-white items-center">
          <div className="w-full max-w-lg">
            <span className="font-semibold sm:text-lg text-base">Transcript info</span>
            <div className="bg-black bg-opacity-50 rounded-lg w-full flex flex-col mb-6 mt-2 p-3">
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
            <div className="w-full justify-center flex mt-8">
              <NavbarButton onClick={closeMenu} dir="single" twStyle="justify-center">Close</NavbarButton>
            </div>
          </div>
        </div>
      ),
    }));
  }

  const [defaultPlaybackSpeed, setDefaultPlaybackSpeed] = React.useState(playbackSpeed);

  async function openSettings () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    const maxSpeed = 3;
    const minSpeed = 0.5;

    function updatePlaybackSpeed (e) {
      let rounded = Math.round(e.target.value * 100) / 100;
      rounded = Math.max(minSpeed, Math.min(maxSpeed, rounded));
      setDefaultPlaybackSpeed(rounded);
      dispatch(transcribeActions.setPlaybackSpeed(rounded));
      const label = document.getElementById('playbackspeed-label');
      label.innerText = `${rounded}x`;
    }

    const transcribeLangs = { 'af-ZA': 'Afrikaans', 'id-ID': 'Bahasa Indonesia', 'ms-MY': 'Bahasa Melayu', 'ca-ES': 'Català', 'cs-CZ': 'Čeština', 'de-De': 'Deutsch', 'en-AU': 'English (Australia)', 'en-CA': 'English (Canada)', 'en-IN': 'English (India)', 'en-NZ': 'English (New Zealand)', 'en-ZA': 'English (South Africa)', 'en-GB': 'English (United Kingdom)', 'en-US': 'English (United States)', 'es-AR': 'Español (Argentina)', 'es-BO': 'Español (Bolivia)', 'es-CL': 'Español (Chile)', 'es-CO': 'Español (Colombia)', 'es-CR': 'Español (Costa Rica)', 'es-EC': 'Español (Ecuador)', 'es-SV': 'Español (El Salvador)', 'es-ES': 'Español (España)', 'es-US': 'Español (Estados Unidos)', 'es-GT': 'Español (Guatemala)', 'es-HN': 'Español (Honduras)', 'es-MX': 'Español (México)', 'es-NI': 'Español (Nicaragua)', 'es-PA': 'Español (Panamá)', 'es-PY': 'Español (Paraguay)', 'es-PE': 'Español (Perú)', 'es-PR': 'Español (Puerto Rico)', 'es-DO': 'Español (República Dominicana)', 'es-UY': 'Español (Uruguay)', 'es-VE': 'Español (Venezuela)', 'eu-ES': 'Euskara', 'fr-FR': 'Français', 'gl-ES': 'Galego', 'hr-HR': 'Hrvatski', 'zu-ZA': 'IsiZulu', 'is-IS': 'Íslenska', 'it-IT': 'Italiano (Italia)', 'it-CH': 'Italiano (Svizzera)', 'hu-HU': 'Magyar', 'nl-NL': 'Nederlands', 'nb-NO': 'Norsk bokmål', 'pl-PL': 'Polski', 'pt-BR': 'Português (Brasil)', 'pt-PT': 'Português (Portugal)', 'ro-RO': 'Română', 'sk-SK': 'Slovenčina', 'fi-FI': 'Suomi', 'sv-SE': 'Svenska', 'tr-TR': 'Türkçe', 'bg-BG': 'български', 'ru-RU': 'Pусский', 'sr-RS': 'Српски', 'ko-KR': '한국어', 'cmn-Hans-CN': '中文 普通话 (中国大陆)', 'cmn-Hans-HK': '中文 普通话 (香港)', 'cmn-Hant-TW': '中文 中文 (台灣)', 'yue-Hant-HK': '中文 粵語 (香港)', 'ja-JP': '日本語', la: 'Lingua latīna' };
    const transcribeLangEntries = Object.entries(transcribeLangs);

    const translateLangs = { af: 'Afrikaans', sq: 'Albanian', am: 'Amharic', ar: 'Arabic', hy: 'Armenian', as: 'Assamese', ay: 'Aymara', az: 'Azerbaijani', bm: 'Bambara', eu: 'Basque', be: 'Belarusian', bn: 'Bengali', bho: 'Bhojpuri', bs: 'Bosnian', bg: 'Bulgarian', ca: 'Catalan', ceb: 'Cebuano', 'zh-CN': 'Chinese (Simplified)', 'zh-TW': 'Chinese (Traditional)', co: 'Corsican', hr: 'Croatian', cs: 'Czech', da: 'Danish', dv: 'Dhivehi', doi: 'Dogri', nl: 'Dutch', en: 'English', eo: 'Esperanto', et: 'Estonian', ee: 'Ewe', fil: 'Filipino (Tagalog)', fi: 'Finnish', fr: 'French', fy: 'Frisian', gl: 'Galician', ka: 'Georgian', de: 'German', el: 'Greek', gn: 'Guarani', gu: 'Gujarati', ht: 'Haitian Creole', ha: 'Hausa', haw: 'Hawaiian', 'he or iw': 'Hebrew', hi: 'Hindi', hmn: 'Hmong', hu: 'Hungarian', is: 'Icelandic', ig: 'Igbo', ilo: 'Ilocano', id: 'Indonesian', ga: 'Irish', it: 'Italian', ja: 'Japanese', 'jv or jw': 'Javanese', kn: 'Kannada', kk: 'Kazakh', km: 'Khmer', rw: 'Kinyarwanda', gom: 'Konkani', ko: 'Korean', kri: 'Krio', ku: 'Kurdish', ckb: 'Kurdish (Sorani)', ky: 'Kyrgyz', lo: 'Lao', la: 'Latin', lv: 'Latvian', ln: 'Lingala', lt: 'Lithuanian', lg: 'Luganda', lb: 'Luxembourgish', mk: 'Macedonian', mai: 'Maithili', mg: 'Malagasy', ms: 'Malay', ml: 'Malayalam', mt: 'Maltese', mi: 'Maori', mr: 'Marathi', 'mni-Mtei': 'Meiteilon (Manipuri)', lus: 'Mizo', mn: 'Mongolian', my: 'Myanmar (Burmese)', ne: 'Nepali', no: 'Norwegian', ny: 'Nyanja (Chichewa)', or: 'Odia (Oriya)', om: 'Oromo', ps: 'Pashto', fa: 'Persian', pl: 'Polish', pt: 'Portuguese (Portugal, Brazil)', pa: 'Punjabi', qu: 'Quechua', ro: 'Romanian', ru: 'Russian', sm: 'Samoan', sa: 'Sanskrit', gd: 'Scots Gaelic', nso: 'Sepedi', sr: 'Serbian', st: 'Sesotho', sn: 'Shona', sd: 'Sindhi', si: 'Sinhala (Sinhalese)', sk: 'Slovak', sl: 'Slovenian', so: 'Somali', es: 'Spanish', su: 'Sundanese', sw: 'Swahili', sv: 'Swedish', tl: 'Tagalog (Filipino)', tg: 'Tajik', ta: 'Tamil', tt: 'Tatar', te: 'Telugu', th: 'Thai', ti: 'Tigrinya', ts: 'Tsonga', tr: 'Turkish', tk: 'Turkmen', ak: 'Twi (Akan)', uk: 'Ukrainian', ur: 'Urdu', ug: 'Uyghur', uz: 'Uzbek', vi: 'Vietnamese', cy: 'Welsh', xh: 'Xhosa', yi: 'Yiddish', yo: 'Yoruba', zu: 'Zulu' };
    const translateLangEntries = Object.entries(translateLangs);

    function onTranscribeSelectChange (e) {
      const transcribeLanguage = e.target.value;
      dispatch(transcribeActions.setSlice({ transcribeLanguage }));
      transcriber.setLanguage(transcribeLanguage);
    }

    function onTranslateSelectChange (e) {
      const translateLanguage = e.target.value;
      dispatch(transcribeActions.setSlice({ translateLanguage }));
      translator.setTargetLanguage(translateLanguage);
    }

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <div className="flex flex-col w-full text-white items-center">
          <div className="w-full max-w-lg">
            <span className="font-semibold sm:text-lg text-base">Change playback speed</span>
            <div className="bg-black bg-opacity-50 rounded-lg w-full flex-col mb-6 mt-2 p-3">
              <div className="flex justify-between w-full">
                <span>Slower</span>
                <span id="playbackspeed-label">{defaultPlaybackSpeed}x</span>
                <span>Faster</span>
              </div>
              <input
                type="range"
                min={minSpeed}
                className="appearance-none w-full h-1 bg-white rounded-full white cursor-pointer"
                defaultValue={defaultPlaybackSpeed}
                onChange={updatePlaybackSpeed}
                onInput={updatePlaybackSpeed}
                max={maxSpeed}
                step={(maxSpeed - minSpeed) / 100}
              />
            </div>
            <span className="font-semibold sm:text-lg text-base">Language</span>
            <div className="w-full flex-col mb-6 mt-2">
              <GroupInput>
                <span>Transcribe in</span>
                <div className="flex items-center">
                  <Dropdown onChange={onTranscribeSelectChange} defaultValue={transcribeLanguage}>
                    {transcribeLangEntries.map(([code, name], i) => (
                      <option key={i} value={code}>{name}</option>
                    ))}
                  </Dropdown>
                </div>
              </GroupInput>
              <GroupDivider />
              <GroupInput>
                <span>Translate to</span>
                <Dropdown onChange={onTranslateSelectChange} defaultValue={translateLanguage}>
                  <option value="">None</option>
                  {translateLangEntries.map(([code, name], i) => (
                    <option key={i} value={code}>{name}</option>
                  ))}
                </Dropdown>
              </GroupInput>
            </div>
            <div className="w-full justify-center flex mt-8">
              <NavbarButton onClick={closeMenu} dir="single" twStyle="justify-center">Close</NavbarButton>
            </div>
          </div>
        </div>
      ),
    }));
  }

  // async function handleFilterBySpeaker () {
  //   dispatch(commonActions.hideNavMenuChildren());
  //   await wait();
  //   const options = ['Both speakers', 'Lincoln Nguyen', 'Maimi Yoshikawa'];
  //   dispatch(commonActions.openNavMenu({
  //     position: 'right',
  //     isMainMenu: false,
  //     children: (
  //       <div className="flex flex-col">
  //         {options.map((option, index) => (
  //           <React.Fragment key={index}>
  //             <NavbarGroupButton twStyle="justify-between">
  //               <span className="text-white">{option}</span>
  //               {index === 0 && <span className="icon-check text-2xl text-white" />}
  //             </NavbarGroupButton>
  //             {index !== options.length - 1 && <NavbarGroupDivider />}
  //           </React.Fragment>
  //         ))}
  //       </div>
  //     ),
  //   }));
  // }

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
    async function handleStart () {
      dispatch(transcribeActions.addPart());
      recorder.start();
      transcriber.start();
      dispatch(transcribeActions.setSlice({ mode: 'record' }));
      dispatch(transcribeActions.updateMetadata());
      window.interval = setInterval(() => {
        dispatch(transcribeActions.incrementDuration(0.1));
      }, 100);
      await wait(50);
      dispatch(commonActions.scrollToBottom());
    }

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          <NavbarButton onClick={handleStart}>
            <span className='icon-mic text-2xl text-white' />
            <span className="text-white">Transcribe</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={turnOnEditMode} disabled={partsOrder.length === 0}>
            <span className="icon-edit text-2xl text-white" />
            <span className="text-white">Edit</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={openSettings}>
            <span className='icon-settings text-2xl text-white' />
            <span className="text-white">Settings</span>
          </NavbarButton>
          {/*<NavbarGroupButton onClick={handleFilterBySpeaker} stopPropagation={true}>*/}
          {/*  <span className='icon-two-users text-2xl text-white' />*/}
          {/*  <span className="text-white">Filter by speaker</span>*/}
          {/*</NavbarGroupButton>*/}
          {/*<NavbarGroupDivider />*/}
          {createdAt && (
            <>
              <GroupDivider />
              <NavbarButton stopPropagation={true} onClick={handleOpenInfo}>
                <span className='icon-info text-2xl text-white' />
                <span className="text-white">Transcript info</span>
              </NavbarButton>
            </>
          )}
        </div>
      ),
    }));
  }

  return (
    <Button twStyle="icon-more-horiz" onClick={openMoreMenu} disabled={disabled || playing || mode !== 'default'} />
  );
}
