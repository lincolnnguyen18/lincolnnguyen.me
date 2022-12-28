import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../../../../slices/main/sharedSlice';

export function ContactsScreen () {
  const { userData } = useSelector(sharedSelector);

  return userData && (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden pt-16 space-y-4 px-4 max-w-screen-sm mx-auto bg-green-custom text-white">
      <span className="font-semibold text-xl cursor-pointer">Contacts</span>
    </div>
  );
}
