import { commonActions } from '../../../slices/commonSlice.js';
import { wait } from '../../../common/timeUtils.js';
import { NavbarButton } from '../../../components/NavbarButton';
import { GroupDivider } from '../../../components/GroupDivider';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/Button';
import { openTranscriptsSearch } from '../../../slices/transcribeSlice';

export function MoreMenu () {
  const dispatch = useDispatch();

  async function handleSort () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    const options = ['Created at', 'Updated at'];
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          {options.map((option, index) => (
            <>
              <NavbarButton key={index} twStyle="justify-between">
                <span className="text-white">{option}</span>
                {index === 0 && <span className="icon-check text-2xl text-white" />}
              </NavbarButton>
              {index !== options.length - 1 && <GroupDivider />}
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
          <NavbarButton linkPath="/transcribe/transcripts/new">
            <span className='icon-add text-2xl text-white' />
            <span className="text-white">Start new</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton twStyle="rounded-t-lg" stopPropagation={true} onClick={() => dispatch(openTranscriptsSearch())}>
            <span className='icon-search text-2xl text-white' />
            <span className="text-white">Search</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={handleSort}>
            <span className="icon-sort text-2xl text-white" />
            <span className="text-white">Sort</span>
          </NavbarButton>
        </div>
      ),
    }));
  }

  return (
    <Button twStyle="icon-more-horiz" onClick={openMoreMenu} />
  );
}
