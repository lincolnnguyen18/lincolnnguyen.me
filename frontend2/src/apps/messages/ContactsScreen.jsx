import React from 'react';
import { Button } from '../../components/Button.jsx';

export function ContactsScreen() {
  return (
    <>
      <div className='h-11 transform -translate-x-1/2 left-1/2 w-full fixed backdrop-blur bg-opacity-80 sm:rounded-b-3xl transition-[border-radius] duration-300 z-[1] bg-red-custom' />
      <nav className='text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between'>
        <Button twStyle="icon-menu" />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Contacts</span>
        <Button twStyle="icon-add" />
      </nav>
      <div className="w-full max-w-screen-2xl bg-white fixed left-1/2 transform -translate-x-1/2 xl:blur-3xl transition-[filter] duration-500 lg:blur-2xl md:blur-none top-[-50%] bottom-[-50%]" />
    </>
  );
}