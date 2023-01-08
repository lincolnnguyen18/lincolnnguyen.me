import React from 'react';
import { Navbar } from './Navbar';
import { AppIcon } from './AppIcon';
import { Sidebar } from '../../../../shared/components/Sidebar';

export function HomeScreen () {
  return (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      <div className="flex flex-col space-y-3 overflow-y-scroll fixed top-11 bottom-0 w-full max-w-screen-sm py-2 px-2 sm:px-3">
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Transcribe" bgColor="bg-purple-custom" placeholderInitials="T" path="/transcribe/transcriptions" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
        <div className="flex flex-row justify-between">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        </div>
      </div>
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
