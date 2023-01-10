import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { getContacts, messagesActions, messagesSelector } from '../../../slices/messagesSlice';
import { formatUnixTimestamp } from '../../../shared/utils/stringUtils';
import { Sidebar } from '../../../shared/components/Sidebar';
import { Spinner } from '../../../shared/components/Spinner';
import { twConfig } from '../../../shared/clients';

export function ContactsScreen () {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(sharedSelector);
  const { contacts } = useSelector(messagesSelector);

  React.useEffect(() => {
    dispatch(messagesActions.setSlice({
      navbarMode: 'default',
      navbarTextInputValue: '',
    }));
    if (!contacts) {
      dispatch(getContacts());
    }
  }, []);

  function onContactClick (contact) {
    dispatch(messagesActions.setSlice({
      selectedContact: contact,
    }));
  }

  let content;
  if (contacts === null) {
    content = (
      <div className="w-full flex justify-center mt-16">
        <Spinner color={twConfig.theme.colors.red.custom} />
      </div>
    );
  } else if (contacts?.length === 0) {
    content = (
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
        <div className="flex flex-col items-center space-y-4 mt-[40%]">
          <span className="icon-contacts text-6xl text-red-custom" />
          <span className="text-center max-w-sm text-sm sm:text-base">
            You have no contacts. Add a contact by pressing the plus button at the top right.
          </span>
        </div>
      </div>
    );
  } else if (contacts) {
    content = (
      <div className="h-screen w-screen overflow-x-hidden flex flex-col space-y-4 max-w-screen-sm mx-auto">
        <div className="flex flex-col space-y-3 overflow-y-scroll fixed top-11 bottom-0 w-full max-w-screen-sm py-2">
          {contacts.map((contact, index) => (
            <Link
              to={`/messages/contacts/${contact.id}`}
              key={index}
              onClick={() => onContactClick(contact)}
            >
              <div
                className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-xl mx-2"
                key={index}
              >
                <img
                  src={contact.picture}
                  className="w-11 h-11 rounded-full flex-shrink-0"
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col w-full">
                  <span className="text-sm sm:text-base">{contact.givenName} {contact.familyName}</span>
                  <span className="text-sm sm:text-base text-gray-500">{contact.lastMessage?.text || 'Connection established'}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 min-w-fit">{formatUnixTimestamp(contact.updatedAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      {content}
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
