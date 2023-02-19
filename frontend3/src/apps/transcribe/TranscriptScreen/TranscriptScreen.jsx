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
import { MoreMenu } from './MoreMenu.jsx';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice.js';
import { twMerge } from 'tailwind-merge';
import { Radio } from '../../../components/Radio.jsx';
import { BottomBar } from './BottomBar.jsx';
import { wait } from '../../../common/timeUtils.js';
import { TextField } from '../../../components/TextField.jsx';
import { NavbarButton } from '../../../components/NavbarButton.jsx';
import { GroupDivider } from '../../../components/GroupDivider.jsx';
import { IconMessage } from '../../../components/IconMessage.jsx';
import { formatFloatToTime, formatUnixTimestamp2 } from '../../../common/stringUtils.js';
import { Recorder } from '../../../common/recorder';
import { Transcriber } from '../../../common/Transcriber';

export function TranscriptScreen () {
  const dispatch = useDispatch();
  const audio = document.getElementById('audio');
  const { windowValues, scrollPosition, transcriptionSupported } = useSelector(commonSelector);
  const { mode, parts, partsOrder, title, updatedAt, createdAt, interimResult, finalResultTime, playing, language, currentTime, currentPartId } = useSelector(transcribeSelector);

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
      return results.length ? [results[0]] : [];
    } else {
      return results;
    }
  }

  function handleDone () {
    dispatch(transcribeActions.setSlice({ mode: 'default' }));
  }

  function onRecordingReady (audioUrl) {
    dispatch(transcribeActions.setLatestPart({ audioUrl }));
    const audio = document.getElementById('audio');
    audio.src = audioUrl;
  }

  function onInterim (interim) {
    dispatch(transcribeActions.setSlice({ interimResult: interim }));
    dispatch(commonActions.scrollToBottom());
  }

  function onFinal (final) {
    dispatch(transcribeActions.onFinal(final));
    dispatch(commonActions.scrollToBottom());
  }

  React.useEffect(() => {
    dispatch(commonActions.setSlice({ scrollPosition: 0 }));

    const recorder = new Recorder({ onRecordingReady });
    const transcriber = new Transcriber({ onInterim, onFinal, lang: language });
    dispatch(transcribeActions.setSlice({ recorder, transcriber }));

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
  }, []);

  React.useEffect(() => {
    const audio = document.getElementById('audio');
    function onLoadedMetadata () {
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
    function onEnd () {
      if (mode === 'record') {
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
  }, [mode]);

  function closeMenu () {
    dispatch(commonActions.closeNavMenu());
  }

  async function handleEditTitle () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    function onEdit (e) {
      e.preventDefault();
      const formData = new window.FormData(e.target);
      const title = formData.get('title');
      dispatch(transcribeActions.setSlice({ title }));
      closeMenu();
    }

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <form className="flex flex-col w-full text-white items-center" onSubmit={onEdit}>
          <div className="flex flex-col w-full mt-3 mb-6 gap-2">
            <span className="font-semibold">Set Transcript Name</span>
            <TextField placeholder="Transcript name" autoFocus={true} defaultValue={title} name="title" />
          </div>
          <div className="flex">
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
            <GroupDivider dir="horiz w-36" />
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit">Save</NavbarButton>
          </div>
        </form>
      ),
    }));
  }

  let content;

  function onResultClick (partId, timestamp) {
    const src = parts[partId].audioUrl;
    audio.autoplay = false;
    if (audio.src !== src) audio.src = src;
    // console.log('onResultClick', parts[partId], timestamp);
    audio.currentTime = timestamp;
    dispatch(transcribeActions.setSlice({ currentTime: timestamp, maxTime: parts[partId].duration, currentPartId: partId }));
  }

  function isCurrentlyPlaying (timestamp, nextTimestamp) {
    const time = currentTime + 0.001;
    return time >= timestamp && time < nextTimestamp;
  }

  const randomNumbers = React.useMemo(() => {
    const numbers = [];
    for (let i = 0; i < 100; i++) {
      numbers.push(Math.random());
    }
    return numbers;
  }, []);

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
          <div className="flex flex-col gap-0.5 mx-2">
            <div className="flex gap-2 items-center">
              <span className={twMerge('sm:text-xl text-lg font-semibold', mode === 'edit' && 'overflow-hidden truncate')}>{title}</span>
              {mode === 'edit' && <Button onClick={handleEditTitle}><span className="icon-edit text-2xl cursor-pointer" /></Button>}
            </div>
            {!updatedAt && createdAt && <span className="sm:text-base text-sm text-gray-subtext">Created on {formatUnixTimestamp2(createdAt)}</span>}
            {updatedAt && <span className="sm:text-base text-sm text-gray-subtext">Updated on {formatUnixTimestamp2(updatedAt)}</span>}
          </div>
          <Divider twStyle="mx-2 sm:mx-1" />
        </div>
        <div className="flex flex-col sm:gap-1">
          {
            randomNumbers.map((num, i) => (
              <span key={i}>{num}</span>
            ))
          }
          {
            partsOrder.map((partId, i) => {
              const part = parts[partId];

              return (
                <React.Fragment key={i}>
                  <Radio twStyle="mx-2 font-semibold part sm:text-base text-sm" active={mode === 'edit'} data-part-id={partId}>
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
                          twStyle={twMerge('flex items-center gap-3 w-full justify-between', isPlaying && mode === 'default' && 'bg-purple-custom2 hover:bg-purple-custom2 text-white', mode === 'record' && 'cursor-text')}
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
                            <span className="text-sm sm:text-base text-left w-full">{result.text}</span>
                          </div>
                        </ContainerButton>
                        {j === part.results.length - 1 && i !== partsOrder.length - 1 && <Divider twStyle="mx-2 sm:mx-1" />}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })
          }
          {interimResult.trim() && <div
            className="flex items-center gap-3 w-full justify-between cursor-text"
          >
            <div className="flex flex-row gap-3 p-2">
              <div className="h-6 rounded-[0.4rem] flex h-6 items-center px-1 bg-[#8c84c4]">
                <div className='text-xs sm:text-sm text-white shrink-0 overflow-hidden truncate select-none flex justify-center' style={{ width: getTimestampWidth(formatFloatToTime((finalResultTime))) }}>
                  {formatFloatToTime((finalResultTime))}
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
      <audio hidden={true} id="audio" />
      <NavbarBlur twStyle="bg-purple-custom" />
      <Navbar twStyle="pr-3 pl-1">
        <BackButton linkPath="/transcribe/transcripts" text="Transcripts" />
        {mode !== 'edit' ? <MoreMenu disabled={!transcriptionSupported} /> : <Button twStyle="text-base font-semibold" onClick={handleDone}>Done</Button>}
      </Navbar>
      <WhiteVignette />
      <OverflowContainer twStyle={overflowStyle}>
        {content}
      </OverflowContainer>
      {mode === 'default' && <div
        className="fixed top-11 bg-white w-full max-w-screen-sm transform -translate-x-1/2 left-1/2 backdrop-blur bg-opacity-80 transition-[opacity] duration-200"
        style={{ opacity: showSubNav() ? 1 : 0, pointerEvents: showSubNav() ? 'all' : 'none' }}
      >
        <div className="flex flex-col gap-0.5 my-2">
          <span className="sm:text-base text-sm font-semibold mx-2 overflow-hidden truncate">{title}</span>
          <span className="sm:text-sm text-xs text-gray-subtext text-sm mx-2 overflow-hidden truncate">Recorded on {formatUnixTimestamp2(getCurrentPart()?.createdAt)}</span>
        </div>
        <Divider twStyle="sm:my-0 my-0" />
      </div>}
      <BottomBar />
    </>
  );
}
