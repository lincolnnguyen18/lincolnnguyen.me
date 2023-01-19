import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../slices/sharedSlice';
import { getCurrentScreen, getNavColor } from '../utils/stateUtils';
import { HoverActiveContainer } from '../../components/HoverActiveContainer';

export function closeSidebar (dispatch) {
  dispatch(sharedActions.closeSidebar());
}

export function Sidebar ({ items }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebar, loggedIn, userData, history } = useSelector(sharedSelector);

  function onAccountClick () {
    navigate('/account');
    closeSidebar(dispatch);
  }

  function onLoginClick () {
    navigate('/login');
    closeSidebar(dispatch);
  }

  const loggedInItem = loggedIn && (
    <div className="mx-2">
      <HoverActiveContainer
        twStyle="flex items-center p-2 gap-2 rounded-lg w-full bg-black bg-opacity-50 active:bg-black hover:bg-black hover:bg-opacity-60 active:bg-opacity-75"
        onClick={onAccountClick}
      >
        <img
          src={userData.picture}
          className="w-8 h-8 rounded-full flex-shrink-0"
          alt="avatar"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="text-xs sm:text-sm truncate transition-text duration-100 text-white">{userData.givenName} {userData.familyName}</p>
          <p className="text-xs sm:text-sm truncate transition-text duration-100 text-white">{userData.email}</p>
        </div>
      </HoverActiveContainer>
    </div>
  );

  const loggedOutItem = (
    <div
      className='flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer select-none rounded-lg mx-2'
      onClick={onLoginClick}
    >
      <span className={'icon-login text-2xl'} />
      <span>Login</span>
    </div>
  );

  return (
    <>
      <div
        className='fixed w-48 transition-[opacity] duration-100 flex flex-col z-30 rounded-br-lg overflow-y-scroll gap-3'
        style={{ opacity: sidebar.state === 'open' ? 1 : 0, pointerEvents: sidebar.state === 'open' ? 'all' : 'none' }}
      >
        {/*<span className='flex items-center px-3 gap-2 font-semibold text-white h-11'>{getCurrentScreen(history).label}</span>*/}
        {items.map((item, index) => (
          <HoverActiveContainer
            key={index}
            twStyle="flex items-center p-2 gap-2 rounded-lg mx-2 bg-black bg-opacity-50 active:bg-black hover:bg-black hover:bg-opacity-60 active:bg-opacity-75"
            onClick={() => closeSidebar(dispatch)}
            linkPath={item.path}
          >
            <span className={`${item.icon} text-2xl text-white`} />
            <span className="text-white">{item.label}</span>
          </HoverActiveContainer>
        ))}
        {loggedIn ? loggedInItem : loggedOutItem}
      </div>
    </>
  );
}
