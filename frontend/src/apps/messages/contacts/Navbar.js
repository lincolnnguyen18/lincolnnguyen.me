import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messagesSelector, messagesActions, addConnection } from '../../../slices/messagesSlice';
import { sharedActions } from '../../../slices/sharedSlice';
import { actionStatus } from '../../../shared/utils/stateUtils';

export function Navbar () {
  const dispatch = useDispatch();
  const { navbarMode, navbarTextInputValue, statuses } = useSelector(messagesSelector);
  const formRef = React.useRef();

  function handleTextInputClear () {
    dispatch(messagesActions.setSlice({ navbarTextInputValue: '' }));
  }

  function handleTextInputOnChange (e) {
    dispatch(messagesActions.setSlice({ navbarTextInputValue: e.target.value }));
  }

  function setNavbarMode (navbarMode) {
    dispatch(messagesActions.setSlice({ navbarMode, navbarTextInputValue: '' }));
  }

  async function onAddContact (e) {
    e.preventDefault();
    if (!navbarTextInputValue) return;
    const { payload: errors } = await dispatch(addConnection({ email: navbarTextInputValue }));
    console.log('errors', errors);
    if (errors.length > 0) {
      dispatch(sharedActions.openToast({ message: errors[0].message }));
    }
  }

  if (navbarMode === 'default') {
    return (
      <nav className="text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between px-2 fixed top-0 z-10">
        <span
          className="icon-menu text-2xl ml-2 cursor-pointer"
          onClick={() => dispatch(sharedActions.openSidebar())}
        />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Contacts</span>
        <div className="flex items-center space-x-4 mr-1">
          {/*<span*/}
          {/*  className="icon-search text-2xl cursor-pointer"*/}
          {/*  onClick={() => setNavbarMode('search-contacts')}*/}
          {/*/>*/}
          <span
            className="icon-add text-2xl cursor-pointer"
            onClick={() => setNavbarMode('add-contact')}
          />
        </div>
      </nav>
    );
  } else if (navbarMode === 'add-contact') {
    return (
      <form
        className="text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0 z-10"
        onSubmit={onAddContact}
        ref={formRef}
      >
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
              className="icon-cancel text-xl cursor-pointer"
              onClick={handleTextInputClear}
            />
          </span>}
        </label>
        <button
          className="cursor-pointer font-semibold px-4 h-full disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={statuses[addConnection.typePrefix] === actionStatus.pending || !navbarTextInputValue}
        >Add</button>
      </form>
    );
  } else if (navbarMode === 'search-contacts') {
    return (
      <nav className="text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0 z-10">
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
