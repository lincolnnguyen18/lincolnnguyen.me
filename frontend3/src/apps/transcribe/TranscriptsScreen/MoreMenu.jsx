import { commonActions } from '../../../slices/commonSlice.js';
import { wait } from '../../../common/timeUtils.js';
import { NavbarButton } from '../../../components/NavbarButton.jsx';
import { GroupDivider } from '../../../components/GroupDivider.jsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/Button.jsx';
import { TextField } from '../../../components/TextField.jsx';

export function MoreMenu () {
  const dispatch = useDispatch();

  function closeMenu () {
    dispatch(commonActions.closeNavMenu());
  }

  async function handleSearch () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    function onSearch (e) {
      e.preventDefault();
      closeMenu();
    }

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <form className="flex flex-col w-full text-white items-center" onSubmit={onSearch}>
          <TextField twStyle="mt-3 mb-6" placeholder="Search" autoFocus={true} />
          <div className="flex">
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
            <GroupDivider dir="horiz" />
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Search</NavbarButton>
          </div>
        </form>
      ),
    }));
  }

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
          <NavbarButton twStyle="rounded-t-lg" stopPropagation={true} onClick={handleSearch}>
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
