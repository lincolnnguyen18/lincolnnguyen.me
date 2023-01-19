import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messagesSelector, messagesActions, addConnection } from '../../../slices/messagesSlice';
import { sharedActions } from '../../../slices/sharedSlice';
import { actionStatus } from '../../../shared/utils/stateUtils';
import { NavBarContainer } from '../../../components/NavBarContainer';
import { Button } from '../../../components/Button';
import { BackButton } from '../../../components/BackButton';
import { TextButton } from '../../../components/TextButton';

export function Navbar () {
  const dispatch = useDispatch();
  const { navbarMode, navbarTextInputValue, statuses } = useSelector(messagesSelector);

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
    console.log('onAddContact');
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
      <NavBarContainer twStyle='px-3 justify-between'>
        <Button
          twStyle="icon-menu"
          onClick={() => dispatch(sharedActions.openSidebar())}
        />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Contacts</span>
        <div className="flex items-center gap-4">
          {/*<span*/}
          {/*  className="icon-search text-2xl cursor-pointer"*/}
          {/*  onClick={() => setNavbarMode('search-contacts')}*/}
          {/*/>*/}
          {/*<span*/}
          {/*  className="icon-add text-2xl cursor-pointer active:opacity-50 transition-opacity duration-75"*/}
          {/*  onClick={() => setNavbarMode('add-contact')}*/}
          {/*/>*/}
          <Button
            twStyle="icon-add"
            onClick={() => setNavbarMode('add-contact')}
          />
        </div>
      </NavBarContainer>
    );
  } else if (navbarMode === 'add-contact') {
    return (
      <form
        className="text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between fixed top-0 transform -translate-x-1/2 left-1/2 z-10 bg-red-custom"
        onSubmit={onAddContact}
      >
        <BackButton onClick={() => setNavbarMode('default')} size="small" />
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
        <TextButton
          type="submit"
          disabled={statuses[addConnection.typePrefix] === actionStatus.pending || !navbarTextInputValue}
          twStyle="px-4 h-full"
        >
          Add
        </TextButton>
      </form>
    );
  } else if (navbarMode === 'search-contacts') {
    return (
      <NavBarContainer twStyle='bg-red-custom justify-between'>
        <BackButton onClick={() => setNavbarMode('default')} size="small" />
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
      </NavBarContainer>
    );
  }
}
