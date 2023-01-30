import React from 'react';
import { Button } from '../../components/Button.jsx';
import { ContainerButton } from '../../components/ContainerButton.jsx';

export function ContactsScreen() {
  return (
    <>
      <div className='h-11 transform -translate-x-1/2 left-1/2 w-full fixed backdrop-blur bg-opacity-80 sm:rounded-b-3xl transition-[border-radius] duration-300 z-[1] bg-red-custom' />
      <nav className='text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between'>
        <Button twStyle="icon-menu" />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Contacts</span>
        <Button twStyle="icon-add" />
      </nav>
      <div className="w-full max-w-screen-2xl bg-white fixed left-1/2 transform -translate-x-1/2 xl:blur-3xl transition-[filter] duration-500 lg:blur-2xl md:blur-none top-[-50%] bottom-[-50%] z-[-1]" />
      <div className="max-w-screen-sm w-full mx-auto w-full sm:px-2 pt-14 pb-4 gap-2 flex flex-col">
        {[...Array(50)].map((_, i) => (
          <ContainerButton
            twStyle="flex items-center gap-3 px-3 py-2 w-full justify-between"
            key={i}
          >
            <div className="flex gap-3">
              <img
              src="https://lh3.googleusercontent.com/a/AEdFTp6DLp-mXUsRqVYJA7Pi8fgAzH-AaluJ-1KjeBaU=s96-c"
              className="w-11 h-11 rounded-full flex-shrink-0 bg-gray-300"
              alt="avatar"
              referrerPolicy="no-referrer"
              />
              <div className="flex flex-col w-full overflow-hidden items-start">
                <span className="text-sm sm:text-base transition-text duration-100 truncate">Lincoln Nguyen</span>
                <span className="text-sm sm:text-base text-gray-500 transition-text duration-100 truncate">Connection established</span>
              </div>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 min-w-fit transition-text duration-100">Jan 8</span>
          </ContainerButton>
        ))}
      </div>
    </>
  );
}