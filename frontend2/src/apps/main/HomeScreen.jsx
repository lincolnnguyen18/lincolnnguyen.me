import React from 'react';
import { AppIcon } from './AppIcon.jsx';
import { colors } from '../../../theme.js';
import { Button } from '../../components/Button.jsx';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../slices/commonSlice.js';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';

export function HomeScreen () {
  const dispatch = useDispatch();

  const dummyIcons = [];
  for (let i = 0; i < 50; i++) {
    dummyIcons.push(
      <AppIcon text="Placeholder" className="bg-gray-500 text-white" placeholderInitials="P" path="/placeholder" key={i} />,
    );
  }

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  return (
    <>
      <NavbarBlur />
      <div className="overflow-y-scroll fixed top-0 bottom-0 left-0 right-0 sm:relative sm:overflow-y-auto">
        <div className="max-w-screen-sm w-full mx-auto grid grid-cols-4 grid-flow-row gap-4 place-items-center w-full px-2 pt-12 pb-4">
          <AppIcon text="Messages" bgColor={colors.red.custom} placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Transcribe" bgColor={colors.purple.custom} placeholderInitials="T" path="/transcribe/transcriptions" />
          <AppIcon text="Resume" bgColor={colors.green.custom} placeholderInitials="R" path="/resume" />
          {dummyIcons}
        </div>
      </div>
      <nav className='text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1]'>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
      </nav>
    </>
  );
}
