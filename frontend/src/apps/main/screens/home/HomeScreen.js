import React from 'react';
import { Navbar } from './Navbar';
import { AppIcon } from './AppIcon';
import { Sidebar } from '../../../../shared/components/Sidebar';

export function HomeScreen () {
  return (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
        <AppIcon text="SpeechChat" bgColor="bg-red-custom" placeholderInitials="SC" path="/speech-chat/contacts" />
      </div>
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
