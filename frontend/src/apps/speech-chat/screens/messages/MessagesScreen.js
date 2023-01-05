import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../../shared/components/Sidebar';

export function MessagesScreen () {
  const { loggedIn } = useSelector(sharedSelector);
  const messages = [];

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
  }

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      {content}
      <Sidebar
        items={[
          { icon: 'icon-apps', label: 'Apps', path: '/' },
        ]}
      />
    </div>
  );
}
