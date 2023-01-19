import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../shared/components/Sidebar';
import { getContact, messagesActions, messagesSelector } from '../../../slices/messagesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { actionStatus } from '../../../shared/utils/stateUtils';
import { ScrollBox } from '../../../components/ScrollBox';
import _ from 'lodash';
import { IconMessage } from '../../../components/IconMessage';
import { ScrollBoxContent } from '../../../components/ScrollBoxContent';

export function MessagesScreen () {
  React.useEffect(() => {
    document.title = 'Messages';
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loggedIn } = useSelector(sharedSelector);
  const { selectedContact, statuses } = useSelector(messagesSelector);

  React.useEffect(() => {
    dispatch(sharedActions.setSlice({
      scrollboxTop: '2.75rem',
      scrollboxBottom: '0',
    }));
  }, []);

  React.useEffect(() => {
    const messagesLength = selectedContact?.messages?.paginatedItems?.length;
    if (!messagesLength || messagesLength === 0) {
      const messages = [];
      for (let i = 0; i < 100; i++) {
        messages.push(Math.floor(Math.random() * 20));
      }
      let newSelectedContact = _.cloneDeep(selectedContact);
      console.log(newSelectedContact);
      newSelectedContact = _.set(newSelectedContact, 'messages.paginatedItems', messages);
      console.log(newSelectedContact);
      dispatch(messagesActions.setSlice({ selectedContact: newSelectedContact }));
    }
  }, [selectedContact]);

  let content;
  // console.log(selectedContact);
  const messages = selectedContact?.messages?.paginatedItems;
  if (!messages) {
    content = null;
  } else if (messages.length === 0) {
    content = (
      <>
        <IconMessage
          iconStyle="icon-chat text-red-custom"
          messageText="You have no messages."
        />
        <ScrollBoxContent>
          <Sidebar
            items={[
              { icon: 'icon-apps', label: 'Apps', path: '/' },
            ]}
          />
        </ScrollBoxContent>
      </>
    );
  } else {
    content = (
      <ScrollBox>
        <ScrollBoxContent>
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex flex-col space-y-2 px-4 py-2"
            >
              {message}
            </div>
          ))}
        </ScrollBoxContent>
      </ScrollBox>
    );
  }

  React.useEffect(() => {
    if (loggedIn && !selectedContact) {
      dispatch(getContact({ id }));
    }
  }, []);

  React.useEffect(() => {
    if (statuses[getContact.typePrefix] === actionStatus.rejected) {
      dispatch(messagesActions.clearStatus(getContact.typePrefix));
      navigate('/messages/contacts');
    }
  }, [statuses]);

  React.useEffect(() => {
    if (selectedContact) {
      document.title = `${selectedContact.givenName} ${selectedContact.familyName} - Messages`;
    }
  }, [selectedContact]);

  return loggedIn && (
    <div className='relative w-full'>
      <Navbar />
      {content}
      <ScrollBoxContent>
        <Sidebar
          items={[
            { icon: 'icon-apps', label: 'Apps', path: '/' },
          ]}
        />
      </ScrollBoxContent>
    </div>
  );
}
