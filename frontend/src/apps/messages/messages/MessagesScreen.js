import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../shared/components/Sidebar';
import { getContact, messagesActions, messagesSelector } from '../../../slices/messagesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { actionStatus } from '../../../shared/utils/stateUtils';

export function MessagesScreen () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loggedIn } = useSelector(sharedSelector);
  const { selectedContact, statuses } = useSelector(messagesSelector);
  const messages = [];
  // fill messages array with 100 random numbers
  for (let i = 0; i < 100; i++) {
    messages.push(Math.floor(Math.random() * 20));
  }

  let content;
  if (messages?.length === 0) {
    content = (
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
        <div className="flex flex-col items-center space-y-4 mt-[40%]">
          <span className="icon-chat text-6xl text-red-custom" />
          <span className="text-center max-w-sm text-sm sm:text-base">
            You have no messages.
          </span>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col space-y-3 overflow-y-scroll fixed top-[6.75rem] bottom-0 w-full max-w-screen-sm pt-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex flex-col space-y-2 px-4 py-2"
          >
            {message}
          </div>
        ))}
      </div>
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

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      {selectedContact && (
        <div className="fixed top-11 w-full max-w-screen-sm p-2 border-b border-gray-200 flex justify-between items-center bg-white h-16">
          <div>
            <p className="text-sm sm:text-base">{selectedContact.givenName} {selectedContact.familyName}</p>
            <p className="text-gray-500 text-sm sm:text-base">{selectedContact.email}</p>
          </div>
          <span className="icon-more-horiz text-2xl cursor-pointer" />
        </div>
      )}
      {content}
      <Sidebar
        items={[
          { icon: 'icon-apps', label: 'Apps', path: '/' },
        ]}
      />
    </div>
  );
}