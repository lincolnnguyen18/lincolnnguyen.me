import React from 'react';
import { Button } from '../../components/Button.jsx';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../slices/commonSlice.js';
import { OverflowContainer } from '../../components/OverflowContainer.jsx';
import { WhiteVignette } from '../../components/WhiteVignette.jsx';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { TextLink } from '../../components/TextLink.jsx';
import { Divider } from '../../components/Divider.jsx';

export function TranscriptionsScreen () {
  const dispatch = useDispatch();

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  const testTitle = 'Untitled';
  const testPreview = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu tincidunt nunc. Vivamus viverra feugiat libero, ornare mollis risus tempus id. Aliquam erat volutpat. Etiam quis erat risus. Maecenas pellentesque in quam eu lobortis. Pellentesque vulputate egestas arcu, eu ultrices augue ultricies eu. Cras dolor urna, imperdiet eu ante non, maximus suscipit leo. In convallis mi at libero vestibulum hendrerit. Aliquam erat volutpat. Vestibulum lacinia ex sapien, quis feugiat quam aliquet quis. Sed porta, velit vel fringilla tristique, mi risus aliquam odio, et pretium nibh risus sit amet erat. Proin in massa massa. Sed at scelerisque lorem, nec sagittis elit. Etiam auctor erat ut sollicitudin condimentum.';
  const testTimestamp = 'Created Mon 4:02 AM · Updated 4:02 AM';

  return (
    <>
      <NavbarBlur twStyle="bg-purple-custom" />
      <Navbar>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Transcriptions</span>
        <Button twStyle="icon-add" linkPath="/transcribe/transcriptions/new" />
      </Navbar>
      <WhiteVignette />
      <OverflowContainer>
        {/*<IconMessage*/}
        {/*  iconStyle="icon-article text-purple-custom"*/}
        {/*  messageText="You have no transcriptions. Add a transcription by pressing the plus button at the top right."*/}
        {/*/>*/}
        {[...Array(30)].map((_, i) => (
          <>
            <div key={i} className="flex flex-col gap-1.5 px-4 sm:px-1">
              <TextLink to="/transcribe/transcriptions/1" twStyle="sm:text-lg font-semibold text-purple-custom w-fit">{testTitle}</TextLink>
              <span className="sm:text-base text-sm text-justify">{testPreview}</span>
              <span className="text-gray-subtext text-xs sm:text-sm">{testTimestamp}</span>
            </div>
            <Divider twStyle="sm:h-[2px] sm:mx-0 mx-3.5 h-[2px] last:hidden" />
          </>
        ))}
      </OverflowContainer>
    </>
  );
}
