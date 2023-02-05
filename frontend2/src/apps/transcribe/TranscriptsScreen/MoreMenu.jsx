import { commonActions } from '../../../slices/commonSlice.js';
import { wait } from '../../../common/timeUtils.js';
import { NavbarGroupButton } from '../../../components/NavbarGroupButton.jsx';
import { NavbarGroupDivider } from '../../../components/NavbarGroupDivider.jsx';
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
        <form className="flex flex-col w-full text-white items-center pl-1" onSubmit={onSearch}>
          <TextField twStyle="mt-3 mb-6" placeholder="Search" autoFocus={true} />
          <div className="flex">
            <NavbarGroupButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarGroupButton>
            <NavbarGroupDivider dir="horiz" />
            <NavbarGroupButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Search</NavbarGroupButton>
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
          <NavbarGroupButton linkPath="/transcribe/transcripts/new">
            <span className='icon-add text-2xl text-white' />
            <span className="text-white">Start new</span>
          </NavbarGroupButton>
          <NavbarGroupDivider />
          <NavbarGroupButton twStyle="rounded-t-lg" stopPropagation={true} onClick={handleSearch}>
            <span className='icon-search text-2xl text-white' />
            <span className="text-white">Search</span>
          </NavbarGroupButton>
          <NavbarGroupDivider />
          <NavbarGroupButton stopPropagation={true} onClick={handleSort}>
            <span className="icon-sort text-2xl text-white" />
            <span className="text-white">Sort</span>
          </NavbarGroupButton>
        </div>
      ),
    }));
  }

  return (
    <Button twStyle="icon-more-horiz" onClick={openMoreMenu} />
  );
}
