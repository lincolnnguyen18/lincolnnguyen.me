import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../../../../slices/sharedSlice';
import { Navbar } from '../shared/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { speechchatSelector } from '../../../../slices/speechchatSlice';

export function ContactsScreen () {
  const navigate = useNavigate();
  const { loggedIn } = useSelector(sharedSelector);
  const { contacts } = useSelector(speechchatSelector);
  const [sidebarPosition, setSidebarPosition] = React.useState('-12rem');

  let content;
  if (contacts.length === 0) {
    content = (
      <div className="flex flex-col items-center space-y-4 mt-[40%]">
        <span className="icon-contacts text-6xl text-red-custom" />
        <span className="text-center max-w-sm text-sm sm:text-base">
          You have no contacts. Add a contact by pressing the plus button at the top right.
        </span>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center space-y-4">
        {contacts.map((contact, index) => (
          <div className="flex items-center space-x-4" key={index}>
            <span className="icon-user text-2xl" />
            <span className="text-sm sm:text-base">{contact}</span>
          </div>
        ))}
      </div>
    );
  }

  function onCloseSidebar (e) {
    e.preventDefault();
    setSidebarPosition('-12rem');
  }

  function onOpenSidebar (e) {
    e.preventDefault();
    setSidebarPosition('0');
  }

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar onOpenSidebar={onOpenSidebar} />
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
        {content}
      </div>
      {sidebarPosition === '0' && (
        <div className='max-w-screen-sm w-full h-screen mx-auto fixed top-0 bg-black opacity-50 cursor-pointer' onMouseDown={onCloseSidebar} />
      )}
      <div
        className={`bg-white absolute top-0 h-screen w-48 transition-transform translate-x-[${sidebarPosition}] duration-300`}
        onClick={() => navigate('/')}
      >
        <div className="flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none">
          <span className="icon-apps text-2xl" />
          <span>Apps</span>
        </div>
      </div>
    </div>
  );
}
