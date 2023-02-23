import React from 'react';
import { Button } from '../../components/Button';
import { ContainerButton } from '../../components/ContainerButton';
import { commonActions } from '../../slices/commonSlice.js';
import { useDispatch } from 'react-redux';
import { OverflowContainer } from '../../components/OverflowContainer';
import { WhiteVignette } from '../../components/WhiteVignette';
import { NavbarBlur } from '../../components/NavbarBlur';
import { Navbar } from '../../components/Navbar';

export function ContactsScreen () {
  const dispatch = useDispatch();

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  return (
    <>
      <NavbarBlur twStyle="bg-red-custom" />
      <Navbar>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Contacts</span>
        <Button twStyle="icon-add" />
      </Navbar>
      <WhiteVignette />
      <OverflowContainer>
        <div className="flex flex-col sm:gap-2 gap-1">
          {[...Array(50)].map((_, i) => (
            <ContainerButton
              twStyle="flex items-center gap-3 px-3 py-2 w-full justify-between"
              key={i}
            >
              <div className="flex gap-3">
                <img
                  src="https://lh3.googleusercontent.com/a/AEdFTp6DLp-mXUsRqVYJA7Pi8fgAzH-AaluJ-1KjeBaU=s96-c"
                  className="w-11 h-11 rounded-full flex-shrink-0 bg-gray-subtext select-none"
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col w-full items-start text-left">
                  <span className="text-sm sm:text-base transition-text duration-100 overflow-hidden truncate w-full max-w-[500px]">Lincoln Nguyen</span>
                  <span className="text-sm sm:text-base text-gray-subtext transition-text duration-100 overflow-hidden truncate w-full max-w-[500px]">Connection established</span>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-gray-subtext min-w-fit transition-text duration-100">Jan 8</span>
            </ContainerButton>
          ))}
        </div>
      </OverflowContainer>
    </>
  );
}
