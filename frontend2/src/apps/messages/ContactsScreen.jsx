import React from 'react';
import { Button } from '../../components/Button.jsx';
import { ContainerButton } from '../../components/ContainerButton.jsx';
import { commonActions } from '../../slices/commonSlice.js';
import { useDispatch } from 'react-redux';
import { OverflowContainer } from '../../components/OverflowContainer.jsx';
import { WhiteVignette } from '../../components/WhiteVignette.jsx';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';

export function ContactsScreen () {
  const dispatch = useDispatch();

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  return (
    <>
      <NavbarBlur twStyle="bg-red-custom" />
      <nav className='text-white max-w-screen-sm w-full h-11 flex items-center fixed top-0 transform -translate-x-1/2 left-1/2 px-3 z-[1] justify-between'>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Contacts</span>
        <Button twStyle="icon-add" />
      </nav>
      <WhiteVignette />
      <OverflowContainer>
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
      </OverflowContainer>
    </>
  );
}
