import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../../../../slices/main/sharedSlice';
import { useNavigate } from 'react-router-dom';

export function ContactsScreen () {
  const navigate = useNavigate();
  const { user } = useSelector(sharedSelector);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return user && (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden pt-16 space-y-4 px-4 max-w-screen-sm mx-auto bg-green-custom text-white">
      <span className="font-semibold text-xl cursor-pointer">Contacts</span>
    </div>
  );
}
