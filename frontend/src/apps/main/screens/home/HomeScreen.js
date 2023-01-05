import React from 'react';
import { Navbar } from './Navbar';
import { AppIcon } from './AppIcon';

export function HomeScreen () {
  return (
    <>
      <div className="max-w-screen-sm mx-auto">
        <Navbar />
      </div>
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden flex flex-col pt-16 space-y-4 px-4 max-w-screen-sm mx-auto">
        <AppIcon text="SpeechChat" bgColor="bg-red-custom" placeholderInitials="SC" path="/speech-chat/contacts" />
      </div>
    </>
  );
}
