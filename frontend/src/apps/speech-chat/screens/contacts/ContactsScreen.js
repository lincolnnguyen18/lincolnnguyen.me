import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../../../../slices/main/sharedSlice';
import { Navbar } from '../shared/components/Navbar';
import { contactsSelector } from '../../../../slices/speech-chat/contactsSlice';

export function ContactsScreen () {
  const { userData } = useSelector(sharedSelector);
  const { navbarMode, contacts } = useSelector(contactsSelector);

  let content;
  if (navbarMode !== 'add-contact' && contacts.length === 0) {
    content = (
      <div className="flex flex-col items-center space-y-4 mt-[40%]">
        <span className="icon-contacts text-6xl text-red-custom" />
        <span className="text-center max-w-sm text-sm sm:text-base">
          You have no contacts. Add a contact by pressing the plus button at the top right.
        </span>
      </div>
    );
  }

  return userData && (
    <>
      <div className="max-w-screen-sm mx-auto">
        <Navbar />
      </div>
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
        {content}
      </div>
    </>
  );
}
