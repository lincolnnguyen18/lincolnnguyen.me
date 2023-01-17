import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { getContacts, messagesActions, messagesSelector } from '../../../slices/messagesSlice';
import { formatUnixTimestamp } from '../../../shared/utils/stringUtils';
import { Sidebar } from '../../../shared/components/Sidebar';
import { Spinner } from '../../../shared/components/Spinner';
import { colors } from '../../../shared/clients';
import { ScrollBox } from '../../../components/ScrollBox';
import { IconMessage } from '../../../components/IconMessage';

export function ContactsScreen () {
  React.useEffect(() => {
    document.title = 'Contacts - Messages';
  }, []);

  const dispatch = useDispatch();
  const { loggedIn } = useSelector(sharedSelector);
  const { contacts } = useSelector(messagesSelector);

  React.useEffect(() => {
    dispatch(messagesActions.setSlice({
      navbarMode: 'default',
      navbarTextInputValue: '',
    }));
    dispatch(sharedActions.setSlice({
      scrollboxTop: '2.75rem',
      scrollboxBottom: '0',
    }));
    if (!contacts) {
      // dispatch(messagesActions.setSlice({ contacts: [] }));
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
        <Spinner color={colors.red.custom} />
      </div>
    );
  } else if (contacts?.length === 0) {
    content = (
      <IconMessage
        iconStyle="icon-contacts text-red-custom"
        messageText="You have no contacts. Add a contact by pressing the plus button at the top right."
      />
    );
  } else if (contacts) {
    content = (
      <ScrollBox>
        <div className="flex flex-col gap-3 max-w-screen-sm mx-auto w-full py-2">
          {contacts.map((contact, index) => (
            <Link
              to={`/messages/contacts/${contact.id}`}
              key={index}
              onClick={() => onContactClick(contact)}
            >
              <div
                className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 cursor-pointer sm:rounded-xl sm:mx-2"
                key={index}
              >
                <img
                  src={contact.picture}
                  className="w-11 h-11 rounded-full flex-shrink-0"
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col w-full overflow-hidden">
                  <span className="text-sm sm:text-base transition-text duration-100 truncate">{contact.givenName} {contact.familyName}</span>
                  <span className="text-sm sm:text-base text-gray-500 transition-text duration-100 truncate">{contact.lastMessage?.text || 'Connection established'}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 min-w-fit transition-text duration-100">{formatUnixTimestamp(contact.updatedAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      </ScrollBox>
    );
  }

  return loggedIn && (
    <div className='relative w-full'>
      <Navbar />
      {content}
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
