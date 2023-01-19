import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { getContacts, messagesActions, messagesSelector } from '../../../slices/messagesSlice';
import { formatUnixTimestamp } from '../../../shared/utils/stringUtils';
import { Sidebar } from '../../../shared/components/Sidebar';
import { Spinner } from '../../../shared/components/Spinner';
import { colors } from '../../../shared/clients';
import { ScrollBox } from '../../../components/ScrollBox';
import { IconMessage } from '../../../components/IconMessage';
import { HoverActiveContainer } from '../../../components/HoverActiveContainer';
import { ScrollBoxContent } from '../../../components/ScrollBoxContent';

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
        <ScrollBoxContent>
          <Sidebar items={[
            { icon: 'icon-apps', label: 'Apps', path: '/' },
          ]} />
          {contacts.map((contact, index) => (
            <HoverActiveContainer
              twStyle="flex items-center gap-3 px-3 py-2 sm:mx-2"
              key={index}
              linkPath={`/messages/contacts/${contact.id}`}
              onClick={() => onContactClick(contact)}
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
            </HoverActiveContainer>
          ))}
        </ScrollBoxContent>
      </ScrollBox>
    );
  }

  return loggedIn && (
    <div className='relative w-full'>
      <Navbar />
      {content}
    </div>
  );
}
