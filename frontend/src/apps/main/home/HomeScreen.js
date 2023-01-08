import React from 'react';
import { Navbar } from './Navbar';
import { AppIcon } from './AppIcon';
import { Sidebar } from '../../../shared/components/Sidebar';

export function HomeScreen () {
  return (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      <div className="grid grid-cols-4 grid-flow-row gap-4 place-items-center fixed overflow-y-scroll top-11 bottom-0 w-full max-w-screen-sm p-2">
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Transcribe" bgColor="bg-purple-custom" placeholderInitials="T" path="/transcribe/transcriptions" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
      </div>
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
