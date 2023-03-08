import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/Button';
import { openTranscriptsSearch } from '../../../slices/transcribeSlice';
import { useNavigate } from 'react-router-dom';
import { uuid } from '../../../common/stringUtils';

export function MoreMenu () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function openMoreMenu () {
  //   dispatch(commonActions.openNavMenu({
  //     position: 'right',
  //     isMainMenu: false,
  //     children: (
  //       <div className="flex flex-col">
  //         <NavbarButton linkPath="/transcribe/transcripts/new">
  //           <span className='icon-add text-2xl text-white' />
  //           <span className="text-white">Start new</span>
  //         </NavbarButton>
  //         <GroupDivider />
  //         <NavbarButton twStyle="rounded-b-lg" stopPropagation={true} onClick={() => dispatch(openTranscriptsSearch())}>
  //           <span className='icon-search text-2xl text-white' />
  //           <span className="text-white">Search</span>
  //         </NavbarButton>
  //       </div>
  //     ),
  //   }));
  // }

  return (
    // <Button twStyle="icon-more-horiz" onClick={openMoreMenu} />
    <>
      <Button twStyle="icon-search" onClick={() => dispatch(openTranscriptsSearch(navigate))} />
      <Button twStyle="icon-add" linkPath={`/transcribe/transcripts/${uuid()}`} />
    </>
  );
}
