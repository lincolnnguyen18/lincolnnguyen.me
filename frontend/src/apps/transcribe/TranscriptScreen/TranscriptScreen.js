import React from 'react';
import theme from 'tailwindcss/defaultTheme.js';
import { NavbarBlur } from '../../../components/NavbarBlur';
import { Button } from '../../../components/Button';
import { WhiteVignette } from '../../../components/WhiteVignette';
import { Navbar } from '../../../components/Navbar';
import { ContainerButton } from '../../../components/ContainerButton';
import { OverflowContainer } from '../../../components/OverflowContainer';
import { BackButton } from '../../../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../../../slices/commonSlice.js';
import { Divider } from '../../../components/Divider';
import { MoreMenu } from './MoreMenu';
import {
  openRenameTranscript,
  transcribeActions,
  transcribeSelector,
  translateFinalResult,
} from '../../../slices/transcribeSlice.js';
import { twMerge } from 'tailwind-merge';
import { Radio } from '../../../components/Radio';
import { BottomBar } from './BottomBar';
import { wait } from '../../../common/timeUtils.js';
import { IconMessage } from '../../../components/IconMessage';
import { formatFloatToTime, formatUnixTimestamp2 } from '../../../common/stringUtils.js';
import { Recorder } from '../../../common/Recorder';
import { Transcriber } from '../../../common/Transcriber';
import { SyncScrollButton } from './SyncScrollButton';
import { Translator } from '../../../common/Translator';
import { languages } from '../../../common/data';
import { Hotkeys } from './Hotkeys';
import { SyncTranscriberSettings } from './SyncTranscriberSettings';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

export function TranscriptScreen () {
  const dispatch = useDispatch();
  const audio = document.getElementById('audio');
  const { windowValues, scrollPosition, transcriptionSupported } = useSelector(commonSelector);
  const { mode, parts, partsOrder, title, updatedAt, createdAt, interimResult, newResultTime, playing, transcribeLang, currentTime, currentPartId, selectedParts, translateLang, transcriber, translator, switchingLanguages, playbackSpeed } = useSelector(transcribeSelector);
  const { id } = useParams();

  React.useEffect(() => {
    if (!createdAt) {
      dispatch(transcribeActions.setSlice({ id: id }));
    }
  }, []);

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

  function getCurrentPart () {
    const partElements = document.querySelectorAll('.part');
    let index = -1;
    if (!partElements) return;
    for (let i = 0; i < partElements.length; i++) {
      const part = partElements[i];
      if (scrollPosition < part.offsetTop - 52) {
        index = Math.max(1, i);
        break;
      }
    }
    if (index === -1) index = partElements.length;
    const partId = partElements[index - 1]?.dataset.partId;
    return parts[partId];
  }

  function maxPartResults (results) {
    if (mode === 'edit') {
      return results.slice(0, 3);
    } else {
      return results;
    }
  }

  function handleDone () {
    dispatch(transcribeActions.setSlice({ mode: 'default', selectedParts: [] }));
  }

  function onRecordingReady (audioUrl) {
    dispatch(transcribeActions.setLatestPart({ audioUrl }));
    const audio = document.getElementById('audio');
    audio.src = audioUrl;
  }

  async function onRecordingStop () {
    dispatch(transcribeActions.setSlice({ mode: 'default', interimResult: '' }));
    await wait(50);
    dispatch(commonActions.scrollToBottom());
  }

  async function onInterim (interim) {
    dispatch(transcribeActions.onInterim(interim));
    await wait(100);
    dispatch(commonActions.scrollToBottom());
  }

  async function onFinal (final) {
    if (final.trim() === '') {
      dispatch(transcribeActions.setSlice({ interimResult: '' }));
      return;
    }
    dispatch(translateFinalResult(final));
    await wait(100);
    dispatch(commonActions.scrollToBottom());
  }

  React.useEffect(() => {
    if (!transcriptionSupported) return;
    dispatch(commonActions.setSlice({ scrollPosition: 0 }));

    const recorder = new Recorder({ onRecordingReady, onRecordingStop });
    const transcriber = new Transcriber({ onInterim, onFinal, lang: languages.find(l => l.name === transcribeLang)?.transcribe });
    const translator = new Translator({ targetLang: languages.find(l => l.name === translateLang)?.translate });
    dispatch(transcribeActions.setSlice({ recorder, transcriber, translator }));

    handleDone();

    const audio = document.getElementById('audio');
    function onEnded () {
      dispatch(transcribeActions.setSlice({ playing: false }));
    }
    audio.addEventListener('ended', onEnded);

    function onTimeUpdate () {
      dispatch(transcribeActions.setSlice({ currentTime: audio.currentTime }));
    }
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      handleDone();
    };
  }, [transcriptionSupported]);

  React.useEffect(() => {
    if (!transcriber || !translator) return;
    transcriber.setLanguage(languages.find(l => l.name === transcribeLang)?.transcribe);
    translator.setTargetLanguage(languages.find(l => l.name === translateLang)?.translate);
  }, [transcribeLang, translateLang]);

  React.useEffect(() => {
    const audio = document.getElementById('audio');
    function onLoadedMetadata () {
      dispatch(transcribeActions.updateAudioPlaybackSpeed());
      if (playing) {
        audio.play();
      }
    }
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [playing]);

  React.useEffect(() => {
    if (!transcriptionSupported) return;
    function onEnd () {
      if (mode === 'record' && !switchingLanguages) {
        try {
          window.recognition.start();
        } catch (e) {}
      }
    }
    window.recognition.addEventListener('end', onEnd);
    window.recognition.addEventListener('error', onEnd);
    return () => {
      window.recognition.removeEventListener('end', onEnd);
      window.recognition.removeEventListener('error', onEnd);
    };
  }, [mode, switchingLanguages, transcriptionSupported]);

  async function handleEditTitle () {
    dispatch(openRenameTranscript());
  }

  React.useEffect(() => {
    window.cutOffType = 'auto';
  }, []);

  let content;

  function onResultClick (partId, timestamp) {
    const src = parts[partId].audioUrl;
    audio.autoplay = false;
    if (audio.src !== src) audio.src = src;
    audio.currentTime = timestamp;
    dispatch(transcribeActions.setSlice({ currentTime: timestamp, currentPartId: partId }));
  }

  function onRadioClick (partId) {
    dispatch(transcribeActions.toggleSelectedPart(partId));
  }

  function isCurrentlyPlaying (timestamp, nextTimestamp) {
    const time = currentTime + 0.001;
    return time >= timestamp && time < nextTimestamp;
  }

  // const randomNumbers = React.useMemo(() => {
  //   const numbers = [];
  //   for (let i = 0; i < 100; i++) {
  //     numbers.push(Math.random());
  //   }
  //   return numbers;
  // }, []);

  React.useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      dispatch(commonActions.scrollElementIntoView('active-line'));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [playing]);

  if (Object.keys(parts).length === 0) {
    let messageText = 'Please press the start button below to start recording a new transcript.';
    if (!transcriptionSupported) {
      messageText = 'Please use Google Chrome on a non-mobile computer to transcribe.';
    }
    content = (
      <IconMessage
        iconStyle="icon-article text-purple-custom"
        messageText={messageText}
      />
    );
  } else {
    content = (
      <>
        <div className="top-11" id="title-div">
          <div className="flex flex-col gap-1 mx-2">
            <div className="flex gap-2 items-center">
              <span className={twMerge('sm:text-xl text-lg font-semibold', mode === 'edit' && 'overflow-hidden truncate')}>{title}</span>
              {mode === 'edit' && <Button onClick={handleEditTitle}><span className="icon-edit text-2xl cursor-pointer" /></Button>}
            </div>
            {updatedAt === createdAt && <span className="text-sm text-gray-subtext">Created on {formatUnixTimestamp2(createdAt)}</span>}
            {updatedAt !== createdAt && <span className="text-sm text-gray-subtext">Updated on {formatUnixTimestamp2(updatedAt)}</span>}
            {/*<div className="flex flex-wrap gap-1.5">*/}
            {/*  {testTags.map((tag, i) => (*/}
            {/*    <TextLink to={`/transcribe/transcripts?keywords=${encodeURIComponent('#' + tag)}`} key={i} twStyle="text-purple-custom text-sm" inactive={mode !== 'default'}>#{tag}</TextLink>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>
          <Divider twStyle="mx-2 sm:mx-1" />
        </div>
        <div className="flex flex-col sm:gap-1">
          {/*{*/}
          {/*  randomNumbers.map((num, i) => (*/}
          {/*    <span key={i}>{num}</span>*/}
          {/*  ))*/}
          {/*}*/}
          {
            partsOrder.map((partId, i) => {
              const part = parts[partId];

              return (
                <React.Fragment key={i}>
                  <Radio twStyle="mx-2 font-semibold part sm:text-base text-sm" active={mode === 'edit'} data-part-id={partId} onClick={() => onRadioClick(partId)} selected={selectedParts.includes(partId)}>
                    <span>Recorded on {formatUnixTimestamp2(part.createdAt)}</span>
                  </Radio>
                  {maxPartResults(part.results).map((result, j) => {
                    const formattedTimestamp = formatFloatToTime(result.timestamp);
                    const timestampWidth = getTimestampWidth(formattedTimestamp);

                    let nextTimestamp, isPlaying;
                    if (currentPartId === partId) {
                      nextTimestamp = part.results[j + 1] ? part.results[j + 1].timestamp : part.duration;
                      isPlaying = isCurrentlyPlaying(result.timestamp, nextTimestamp);
                    } else {
                      isPlaying = false;
                    }

                    return (
                      <React.Fragment key={j}>
                        <ContainerButton
                          twStyle={twMerge('flex items-center gap-3 w-full justify-between', isPlaying && mode === 'default' && 'bg-purple-custom2 hover:bg-purple-custom2 active:bg-purple-custom2 text-white', mode === 'record' && 'cursor-text')}
                          disabled={mode === 'edit' || mode === 'record'}
                          onClick={() => onResultClick(partId, result.timestamp)}
                          key={i}
                          id={isPlaying ? 'active-line' : undefined}
                        >
                          <div className="flex flex-row gap-3 p-2">
                            <div className="h-6 rounded-[0.4rem] flex h-6 items-center px-1 bg-purple-custom2">
                              <div className='text-xs sm:text-sm text-white shrink-0 overflow-hidden truncate' style={{ width: timestampWidth }}>
                                {formattedTimestamp}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm sm:text-base text-left w-full">{result.text}</span>
                              <span className="text-sm sm:text-base text-left w-full">{result.translation}</span>
                            </div>
                          </div>
                        </ContainerButton>
                        {mode !== 'edit' && j === part.results.length - 1 && i !== partsOrder.length - 1 && <Divider twStyle="mx-2 sm:mx-1" />}
                      </React.Fragment>
                    );
                  })}
                  {mode === 'edit' && i !== partsOrder.length - 1 && <Divider twStyle="mx-2 sm:mx-1" />}
                </React.Fragment>
              );
            })
          }
          {interimResult.trim() && <div
            className="flex items-center gap-3 w-full justify-between cursor-text"
          >
            <div className="flex flex-row gap-3 p-2">
              <div className="h-6 rounded-[0.4rem] flex h-6 items-center px-1 bg-[#8c84c4]">
                <div className='text-xs sm:text-sm text-white shrink-0 overflow-hidden truncate select-none flex justify-center' style={{ width: getTimestampWidth(formatFloatToTime((newResultTime - parts[currentPartId].createdAt) / 1000)) }}>
                  {formatFloatToTime(Math.max(0, ((newResultTime - parts[currentPartId].createdAt) / 1000) - 2))}
                </div>
              </div>
              <span className="text-sm sm:text-base text-left w-full">{interimResult}</span>
            </div>
          </div>}
        </div>
      </>
    );
  }

  const [overflowStyle, setOverflowStyle] = React.useState('');
  React.useEffect(() => {
    if (mode === 'default' && partsOrder.length > 0) {
      setOverflowStyle('mb-[6rem]');
    } else {
      setOverflowStyle('mb-12');
    }
  }, [mode, partsOrder]);

  return (
    <>
      <Hotkeys />
      <audio hidden={true} id="audio" />
      <NavbarBlur twStyle="bg-purple-custom" />
      <Navbar twStyle="pr-3 pl-1">
        <BackButton linkPath="/transcribe/transcripts" text="Transcripts" disabled={mode !== 'default'} />
        {mode === 'default' && partsOrder.length > 0 && <span className="absolute left-1/2 transform -translate-x-1/2 no-underline">{_.round(playbackSpeed, 2)}x</span>}
        {mode !== 'edit' ? <MoreMenu disabled={!transcriptionSupported} /> : <Button twStyle="text-base font-semibold" onClick={handleDone}>Done</Button>}
      </Navbar>
      <WhiteVignette />
      <OverflowContainer twStyle={overflowStyle}>
        {content}
      </OverflowContainer>
      <div
        className="fixed top-11 bg-white w-full max-w-screen-sm transform -translate-x-1/2 left-1/2 backdrop-blur bg-opacity-80 transition-[opacity] duration-200"
        style={{ opacity: showSubNav() ? 1 : 0, pointerEvents: showSubNav() ? 'all' : 'none' }}
      >
        <div className="flex flex-col gap-0.5 my-2">
          <span className="sm:text-base text-sm font-semibold mx-2 overflow-hidden truncate">{title}</span>
          <span className="sm:text-sm text-xs text-gray-subtext text-sm mx-2 overflow-hidden truncate">Recorded on {formatUnixTimestamp2(getCurrentPart()?.createdAt)}</span>
        </div>
        <Divider twStyle="sm:my-0 my-0" />
      </div>
      <BottomBar />
      <SyncScrollButton />
      <SyncTranscriberSettings />
    </>
  );
}
