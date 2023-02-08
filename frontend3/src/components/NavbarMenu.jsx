import React from 'react';
import { commonActions, commonSelector } from '../slices/commonSlice.js';
import { Button } from './Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { NavbarButton } from './NavbarButton.jsx';
import { useLocation } from 'react-router-dom';

function MainMenu ({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn } = useSelector(commonSelector);

  function onLogin () {
    setTimeout(() => {
      dispatch(commonActions.setSlice({ showLogin: location.pathname }));
    }, 10);
  }

  function onLogout () {
    dispatch(commonActions.setSlice({ showLogin: '/', loggedIn: false }));
  }

  return (
    <>
      <NavbarButton linkPath="/" dir="single">
        <span className='icon-apps text-2xl text-white' />
        <span className="text-white">Apps</span>
      </NavbarButton>
      {children}
      {!loggedIn && <NavbarButton dir="single" onClick={onLogin}>
        <span className='icon-login text-2xl text-white' />
        <span className="text-white">Login</span>
      </NavbarButton>}
      {loggedIn && <NavbarButton dir="single" onClick={onLogout}>
        <span className='icon-logout text-2xl text-white' />
        <span className="text-white">Logout</span>
      </NavbarButton>}
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
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur transition-[opacity] z-[1] transition-all duration-200'
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none', backgroundColor: !navMenu.easyClose && 'rgba(0,0,0,0.55)' }}
        onClick={onBackdropClick}
      />
      <div
        className="fixed top-0 bottom-0 z-[1] w-full left-1/2 transform -translate-x-1/2 transition-[opacity] duration-200 overflow-y-auto pb-3 overscroll-contain"
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none' }}
        onClick={onBackdropClick}
        id="nav-menu"
      >
        <div className={twMerge('max-w-screen-sm mx-auto flex flex-col', navMenu.containerTwStyle)}>
          <Button onClick={() => dispatch(commonActions.closeNavMenu())} twStyle={twMerge('icon-close text-white h-11 mx-3')} />
          <div className={twMerge('flex flex-col gap-3 px-3 transition-[opacity] duration-200', navMenu.menuTwStyle)} style={{ opacity: navMenu.hideOnlyChildren ? 0 : 1, pointerEvents: navMenu.hideOnlyChildren || !navMenu.open ? 'none' : 'all' }}>
            {navMenu.isMainMenu ? <MainMenu>{navMenu.children}</MainMenu> : navMenu.children}
          </div>
        </div>
      </div>
    </>
  );
}
