import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../slices/sharedSlice';

export function closeSidebar (e, dispatch, path, navigate) {
  e.preventDefault();
  if (path) {
    navigate(path);
  }
  dispatch(sharedActions.setSlice({ sidebarPosition: '48' }));
}

export function Sidebar ({ items }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sidebarPosition, loggedIn, userData } = useSelector(sharedSelector);

  const loggedInItem = loggedIn && (
    <>
      <div
        className='flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none'
        onClick={e => closeSidebar(e, dispatch, '/account', navigate)}
      >
        <img
          src={userData.picture}
          className="w-8 h-8 rounded-full flex-shrink-0"
          alt="avatar"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="text-xs sm:text-sm truncate">{userData.givenName} {userData.familyName}</p>
          <p className="text-xs sm:text-sm text-gray-500 truncate">{userData.email}</p>
        </div>
      </div>
    </>
  );

  const loggedOutItem = (
    <div
      className='flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none'
      onClick={e => closeSidebar(e, dispatch, '/login', navigate)}
    >
      <span className={'icon-login text-2xl'} />
      <span>Login</span>
    </div>
  );

  return (
    <>
      {sidebarPosition === '0' && (
        <div
          className='max-w-screen-sm w-full h-screen mx-auto fixed top-0 bg-black opacity-50 cursor-pointer'
          onMouseDown={e => closeSidebar(e, dispatch)}
        />
      )}
      <div className={`bg-white fixed top-0 h-screen w-48 transition-transform -translate-x-${sidebarPosition} duration-300 justify-between flex flex-col py-12`}>
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              className='flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none'
              onClick={(e) => closeSidebar(e, dispatch, item.path, navigate)}
            >
              <span className={`${item.icon} text-2xl`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div>
          {loggedIn ? loggedInItem : loggedOutItem}
        </div>
      </div>
    </>
  );
}
