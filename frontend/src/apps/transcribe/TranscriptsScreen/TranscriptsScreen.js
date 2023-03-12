import React from 'react';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../../../slices/commonSlice.js';
import { OverflowContainer } from '../../../components/OverflowContainer';
import { WhiteVignette } from '../../../components/WhiteVignette';
import { NavbarBlur } from '../../../components/NavbarBlur';
import { Navbar } from '../../../components/Navbar';
import { TextLink } from '../../../components/TextLink';
import { Divider } from '../../../components/Divider';
import { MoreMenu } from './MoreMenu';
import { useLocation } from 'react-router-dom';
import { listTranscripts, transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { IconMessage } from '../../../components/IconMessage';
import { formatUnixTimestamp } from '../../../common/stringUtils';

export function TranscriptsScreen () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { scrollPosition, distanceFromBottom, pending } = useSelector(commonSelector);
  const { keywords, listTranscriptsResult } = useSelector(transcribeSelector);

  React.useEffect(() => {
    if (distanceFromBottom < 130 && listTranscriptsResult?.lastEvaluatedKey && !pending['listTranscripts']) {
      dispatch(listTranscripts());
    }
  }, [distanceFromBottom]);

  React.useEffect(() => {
    dispatch(commonActions.scrollToTop({ useSmoothScroll: false }));
    const params = new URLSearchParams(location.search);
    let { keywords } = Object.fromEntries(params.entries());
    keywords = keywords?.trim();
    dispatch(transcribeActions.setSlice({ keywords }));

    if (!keywords) {
      dispatch(listTranscripts());
    }
  }, [location]);

  React.useEffect(() => {
    return () => {
      dispatch(commonActions.closeLoading());
    };
  }, []);

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  function showSubNav () {
    if (!keywords?.trim()) return false;
    const titleDiv = document.getElementById('title-div');
    if (!titleDiv) return false;
    return scrollPosition > titleDiv.offsetTop + titleDiv.offsetHeight - 52;
  }

  return (
    <>
      <NavbarBlur twStyle="bg-purple-custom" />
      <Navbar>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2 no-underline">Transcripts</span>
        <div className="flex gap-3">
          <MoreMenu />
        </div>
      </Navbar>
      <WhiteVignette />
      <OverflowContainer>
        {keywords?.trim() && <div className="top-11" id="title-div">
          <div className="sm:px-1 px-4 flex flex-col gap-0.5 w-full">
            <span className="sm:text-xl text-lg font-semibold">Showing search results for</span>
            <div className="flex gap-2 items-center text-gray-subtext text-sm sm:text-base">
              <span className="font-semibold w-[75px] flex-shrink-0">Keywords: </span>
              <span className="overflow-hidden truncate">"{keywords}"</span>
            </div>
          </div>
          <Divider twStyle="mx-2 sm:mx-1" />
        </div>}
        {listTranscriptsResult?.items.length === 0 && <IconMessage
          iconStyle="icon-article text-purple-custom"
          messageText="You have no transcripts. Add a transcript by pressing the plus button at the top right."
        />}
        {listTranscriptsResult?.items.map((transcript, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col gap-1.5 px-4 sm:px-1">
              <div className="w-full">
                <TextLink to={`/transcribe/transcripts/${transcript.id}`} twStyle="sm:text-lg text-purple-custom w-fit">{transcript.title}</TextLink>
              </div>
              <span className="sm:text-base text-sm">{transcript.preview}</span>
              {transcript.updatedAt !== transcript.createdAt && <span className="text-gray-subtext text-xs">Created {formatUnixTimestamp(transcript.createdAt)} · Updated {formatUnixTimestamp(transcript.updatedAt)}</span>}
              {transcript.updatedAt === transcript.createdAt && <span className="text-gray-subtext text-xs">Created {formatUnixTimestamp(transcript.createdAt)}</span>}
            </div>
            {i !== listTranscriptsResult.items.length - 1 && <Divider twStyle="sm:mx-0 mx-3.5" />}
          </React.Fragment>
        ))}
        <Button
          twStyle="my-3 flex items-center gap-0.5 sm:gap-1 select-auto mx-auto text-purple-custom"
          onClick={() => dispatch(listTranscripts())}
          disabled={!listTranscriptsResult?.lastEvaluatedKey}
        >
          <span className='icon-down' />
          <span className="sm:text-base text-sm">Load more</span>
        </Button>
      </OverflowContainer>
      <div
        className="fixed top-11 bg-white w-full max-w-screen-sm transform -translate-x-1/2 left-1/2 backdrop-blur bg-opacity-80 transition-[opacity] duration-200"
        style={{ opacity: showSubNav() ? 1 : 0, pointerEvents: showSubNav() ? 'all' : 'none' }}
      >
        <div className="flex m-2 gap-2 items-center">
          <span className="sm:text-base text-sm font-semibold flex-shrink-0">Keywords:</span>
          <span className="sm:text-base text-sm overflow-hidden truncate">"{keywords}"</span>
        </div>
        <Divider twStyle="sm:my-0 my-0" />
      </div>
    </>
  );
}
