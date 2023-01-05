import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../../shared/components/Sidebar';
import Cookies from 'js-cookie';
import { sharedActions } from '../../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function AccountScreen () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout () {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      Cookies.remove('sessionToken');
      dispatch(sharedActions.setSlice({ userData: null, loggedIn: false, sessionToken: null }));
      navigate('/');
    }
  }

  return (
    <div className='max-w-screen-sm mx-auto relative pt-14'>
      <Navbar />
      <div
        className='flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none'
        onClick={onLogout}
      >
        <span className={'icon-logout text-2xl'} />
        <span>Logout</span>
      </div>
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
