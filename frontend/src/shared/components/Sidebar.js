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
    <HoverActiveContainer
      twStyle="flex items-center p-2 gap-2 mx-2 rounded-lg"
      onClick={onAccountClick}
    >
      <img
        src={userData.picture}
        className="w-8 h-8 rounded-full flex-shrink-0"
        alt="avatar"
        referrerPolicy="no-referrer"
      />
      <div className="flex flex-col overflow-hidden">
        <p className="text-xs sm:text-sm truncate transition-text duration-100">{userData.givenName} {userData.familyName}</p>
        <p className="text-xs sm:text-sm text-gray-500 truncate transition-text duration-100">{userData.email}</p>
      </div>
    </HoverActiveContainer>
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
      {sidebar.state === 'open' && (
        <div
          className='left-0 right-0 h-screen fixed top-0 bg-black opacity-50 cursor-pointer z-10'
          onMouseDown={() => closeSidebar(dispatch)}
        />
      )}
      <div className='bg-white fixed top-0 left-0 bottom-0 w-48 transition-transform duration-300 justify-between flex flex-col z-10 rounded-br-lg overflow-y-scroll' style={{ transform: `translateX(-${sidebar.position}%)` }}>
        <div>
          <span className={`${getNavColor(location, history)} flex items-center px-3 gap-2 font-semibold text-white h-11 mb-2`}>{getCurrentScreen(history).label}</span>
          {items.map((item, index) => (
            <HoverActiveContainer
              key={index}
              twStyle="flex items-center p-2 gap-2 mx-2 rounded-lg"
              onClick={() => closeSidebar(dispatch)}
              linkPath={item.path}
            >
              <span className={`${item.icon} text-2xl`} />
              <span>{item.label}</span>
            </HoverActiveContainer>
          ))}
        </div>
        <div className="fixed bottom-2 w-48">
          {loggedIn ? loggedInItem : loggedOutItem}
        </div>
      </div>
    </>
  );
}
