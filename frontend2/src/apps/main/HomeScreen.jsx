import React from 'react';
import { AppIcon } from './AppIcon.jsx';
import { colors } from '../../../theme.js';
import { Button } from '../../components/Button.jsx';

export function HomeScreen() {
  const dummyIcons = [];
  for (let i = 0; i < 50; i++) {
    dummyIcons.push(
      <AppIcon text="Resume" bgColor={colors.green.custom} placeholderInitials="R" path="/resume" key={i} />,
    );
  }

  return (
    <>
      <div className='h-11 transform -translate-x-1/2 left-1/2 w-full fixed backdrop-blur bg-opacity-80 sm:rounded-b-3xl transition-[border-radius] duration-300 z-[1]' />
      <div className="max-w-screen-sm w-full mx-auto grid grid-cols-4 grid-flow-row gap-4 place-items-center w-full px-2 pt-12 pb-4">
        <AppIcon text="Messages" bgColor={colors.red.custom}  placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Transcribe" bgColor={colors.purple.custom}  placeholderInitials="T" path="/transcribe/transcriptions" />
        {dummyIcons}
      </div>
      <nav className='text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1]'>
        <Button twStyle="icon-menu" />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
      </nav>
    </>
  );
}