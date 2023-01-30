import React from 'react';
import { commonActions, commonSelector } from '../slices/commonSlice.js';
import { Button } from './Button.jsx';
import { ContainerButton } from './ContainerButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

export function NavbarMenu () {
  const dispatch = useDispatch();
  const { navMenu } = useSelector(commonSelector);

  return (
    <>
      <div
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur transition-[opacity] duration-400 z-[1] transition-[opacity] duration-200'
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none' }}
        onMouseDown={() => dispatch(commonActions.closeNavMenu())}
      />
      <div
        className="fixed top-0 bottom-0 z-[1] w-full left-1/2 transform -translate-x-1/2 transition-[opacity] duration-200 overflow-y-scroll pb-3"
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none' }}
        onClick={() => dispatch(commonActions.closeNavMenu())}
        id="nav-menu"
      >
        <div className={twMerge('max-w-screen-sm mx-auto flex flex-col', navMenu.containerTwStyle)}>
          <Button onClick={() => dispatch(commonActions.closeNavMenu())} twStyle={twMerge('icon-close text-white h-11', navMenu.buttonTwStyle)} />
          <div className={twMerge('flex flex-col gap-3', navMenu.menuTwStyle)}>
            {[...Array(1)].map((_, i) => (
              <ContainerButton
                twStyle="flex items-center p-2 gap-2 rounded-lg mx-2 bg-black bg-opacity-50 active:bg-black hover:bg-black hover:bg-opacity-60 active:bg-opacity-75 w-48"
                linkPath="/"
                key={i}
              >
                <span className='icon-apps text-2xl text-white' />
                <span className="text-white">Apps</span>
              </ContainerButton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
