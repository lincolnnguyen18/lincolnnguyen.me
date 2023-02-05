import React from 'react';
import { commonActions, commonSelector } from '../slices/commonSlice.js';
import { Button } from './Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { NavMenuButton } from './NavMenuButton.jsx';

function MainMenu ({ children }) {
  return (
    <>
      <NavMenuButton linkPath="/">
        <span className='icon-apps text-2xl text-white' />
        <span className="text-white">Apps</span>
      </NavMenuButton>
      {children}
      <NavMenuButton linkPath="/">
        <span className='icon-login text-2xl text-white' />
        <span className="text-white">Login</span>
      </NavMenuButton>
    </>
  );
}

export function NavbarMenu () {
  const dispatch = useDispatch();
  const { navMenu } = useSelector(commonSelector);

  function onBackdropClick () {
    if (!navMenu.easyClose) return;
    dispatch(commonActions.closeNavMenu());
  }

  return (
    <>
      <div
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur transition-[opacity] duration-400 z-[1] transition-all duration-200'
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none', backgroundColor: !navMenu.easyClose && 'rgba(0,0,0,0.5)' }}
        onClick={onBackdropClick}
      />
      <div
        className="fixed top-0 bottom-0 z-[1] w-full left-1/2 transform -translate-x-1/2 transition-[opacity] duration-200 overflow-y-auto pb-3"
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none' }}
        onClick={onBackdropClick}
        id="nav-menu"
      >
        <div className={twMerge('max-w-screen-sm mx-auto flex flex-col', navMenu.containerTwStyle)}>
          <Button onClick={() => dispatch(commonActions.closeNavMenu())} twStyle={twMerge('icon-close text-white h-11', navMenu.buttonTwStyle)} />
          <div className={twMerge('flex flex-col gap-3 px-2 transition-[opacity] duration-200', navMenu.menuTwStyle)} style={{ opacity: navMenu.hideOnlyChildren ? 0 : 1, pointerEvents: navMenu.hideOnlyChildren || !navMenu.open ? 'none' : 'all' }}>
            {navMenu.isMainMenu ? <MainMenu>{navMenu.children}</MainMenu> : navMenu.children}
          </div>
        </div>
      </div>
    </>
  );
}
