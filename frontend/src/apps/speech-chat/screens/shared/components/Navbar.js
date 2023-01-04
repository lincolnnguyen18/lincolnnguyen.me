import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { speechchatSelector, speechchatActions } from '../../../../../slices/speechchatSlice';

export function Navbar ({ onOpenSidebar }) {
  const dispatch = useDispatch();
  const { navbarMode, navbarTextInputValue } = useSelector(speechchatSelector);

  function handleTextInputClear () {
    dispatch(speechchatActions.setSlice({ navbarTextInputValue: '' }));
  }

  function handleTextInputOnChange (e) {
    dispatch(speechchatActions.setSlice({ navbarTextInputValue: e.target.value }));
  }

  function setNavbarMode (navbarMode) {
    dispatch(speechchatActions.setSlice({ navbarMode, navbarTextInputValue: '' }));
  }

  if (navbarMode === 'default') {
    return (
      <nav className="bg-red-custom text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between px-2 fixed top-0">
        <div className="flex items-center space-x-4">
          <span className="icon-menu text-2xl ml-2 cursor-pointer" onClick={onOpenSidebar}></span>
          <span>SpeechChat</span>
        </div>
        <div className="flex items-center space-x-4 mr-1">
          <span
            className="icon-search text-2xl cursor-pointer"
            onClick={() => setNavbarMode('search-contacts')}
          />
          <span
            className="icon-add text-2xl cursor-pointer"
            onClick={() => setNavbarMode('add-contact')}
          />
        </div>
      </nav>
    );
  } else if (navbarMode === 'add-contact') {
    return (
      <nav className="bg-red-custom text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0">
        <span
          className="icon-back text-2xl cursor-pointer px-2"
          onClick={() => setNavbarMode('default')}
        ></span>
        <label className="relative block w-full h-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <span className="icon-add text-2xl" />
          </span>
          <input
            className="placeholder:text-white block bg-red-custom2 w-full py-2 px-9 focus:outline-none h-full rounded-none"
            placeholder="Add contact by email"
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleTextInputOnChange}
            value={navbarTextInputValue}
          />
          {navbarTextInputValue && <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <span
              className="icon-cancel text-2xl cursor-pointer"
              onClick={handleTextInputClear}
            />
          </span>}
        </label>
        <span className="cursor-pointer font-semibold px-4">Add</span>
      </nav>
    );
  } else if (navbarMode === 'search-contacts') {
    return (
      <nav className="bg-red-custom text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0">
        <span
          className="icon-back text-2xl cursor-pointer px-2"
          onClick={() => setNavbarMode('default')}
        ></span>
        <label className="relative block w-full h-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <span className="icon-search text-2xl" />
          </span>
          <input
            className="placeholder:text-white block bg-red-custom2 w-full py-2 px-10 focus:outline-none h-full rounded-none"
            placeholder="Search contacts by name"
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleTextInputOnChange}
            value={navbarTextInputValue}
          />
          {navbarTextInputValue && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <span
                className="icon-cancel text-2xl cursor-pointer"
                onClick={handleTextInputClear}
              />
            </span>
          )}
        </label>
      </nav>
    );
  }
}
