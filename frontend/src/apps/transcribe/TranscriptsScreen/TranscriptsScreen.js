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
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';

export function TranscriptsScreen () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { scrollPosition } = useSelector(commonSelector);
  const { keywords } = useSelector(transcribeSelector);

  React.useEffect(() => {
    dispatch(commonActions.scrollToTop({ useSmoothScroll: false }));
    const params = new URLSearchParams(location.search);
    const { keywords } = Object.fromEntries(params.entries());
    dispatch(transcribeActions.setSlice({ keywords }));
  }, [location]);

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  const testTitle = 'Untitled Transcript';
  const testPreview = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu tincidunt nunc. Vivamus viverra feugiat libero, ornare mollis risus tempus id. Aliquam erat volutpat. Etiam quis erat risus. Maecenas pellentesque in quam eu lobortis. Pellentesque vulputate egestas arcu, eu ultrices augue ultricies eu. Cras dolor urna, imperdiet eu ante non, maximus suscipit leo. In convallis mi at libero vestibulum hendrerit. Aliquam erat volutpat. Vestibulum lacinia ex sapien, quis feugiat quam aliquet quis. Sed porta, velit vel fringilla tristique, mi risus aliquam odio, et pretium nibh risus sit amet erat. Proin in massa massa. Sed at scelerisque lorem, nec sagittis elit. Etiam auctor erat ut sollicitudin condimentum.';
  const testTimestamp = 'Created Mon 4:02 AM · Updated 4:02 AM';
  // const testTags = ['journal', 'lecture'];

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
        {/*<IconMessage*/}
        {/*  iconStyle="icon-article text-purple-custom"*/}
        {/*  messageText="You have no transcripts. Add a transcript by pressing the plus button at the top right."*/}
        {/*/>*/}
        {keywords?.trim() && <div className="top-11" id="title-div">
          <div className="sm:px-1 px-4 flex flex-col gap-0.5 w-full">
            <span className="sm:text-xl text-lg font-semibold">Showing search results for</span>
            <div className="flex gap-2 items-center text-gray-subtext text-sm sm:text-base">
              <span className="font-semibold w-[75px] flex-shrink-0">Keywords: </span>
              <span className="overflow-hidden truncate">"{keywords}"</span>
            </div>
            {/*<div className="flex gap-2 items-center text-gray-subtext text-sm">*/}
            {/*  <span className="font-bold w-[75px] flex-shrink-0">Sorted by: </span>*/}
            {/*  <span className="overflow-hidden truncate">{sortMap[sort]}</span>*/}
            {/*</div>*/}
          </div>
          <Divider twStyle="mx-2 sm:mx-1" />
        </div>}
        {[...Array(30)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col gap-1.5 px-4 sm:px-1">
              <div className="w-full">
                <TextLink to="/transcribe/transcripts/1" twStyle="sm:text-lg text-purple-custom w-fit">{testTitle}</TextLink>
              </div>
              <span className="sm:text-base text-sm">{testPreview}</span>
              {/*<div className="flex flex-wrap gap-1.5">*/}
              {/*  {testTags.map((tag, i) => (*/}
              {/*    <TextLink to={`/transcribe/transcripts?keywords=${encodeURIComponent('#' + tag)}`} key={i} twStyle="text-purple-custom text-sm">#{tag}</TextLink>*/}
              {/*  ))}*/}
              {/*</div>*/}
              <span className="text-gray-subtext text-xs">{testTimestamp}</span>
            </div>
            <Divider twStyle="sm:mx-0 mx-3.5 last:hidden" />
          </React.Fragment>
        ))}
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
