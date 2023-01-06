import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../slices/sharedSlice';
import { getCurrentScreen } from '../utils/stateUtils';

export function closeSidebar (dispatch) {
  dispatch(sharedActions.setSlice({ sidebarPosition: '100' }));
}

export function Sidebar ({ items }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarPosition, loggedIn, userData, history } = useSelector(sharedSelector);

  function onAccountClick () {
    navigate('/account');
    closeSidebar(dispatch);
  }

  const loggedInItem = loggedIn && (
    <div
      className='flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none rounded-xl mx-2'
      onClick={onAccountClick}
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
  );

  const loggedOutItem = (
    <div
      className='flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none rounded-xl mx-2'
      onClick={() => closeSidebar(dispatch)}
    >
      <span className={'icon-login text-2xl'} />
      <span>Login</span>
    </div>
  );

  return (
    <>
      {sidebarPosition === '0' && (
        <div
          className='w-full h-screen fixed top-0 bg-black opacity-50 cursor-pointer z-10'
          onMouseDown={() => closeSidebar(dispatch)}
        />
      )}
      <div className='bg-white fixed top-0 bottom-0 w-48 transition-transform duration-300 justify-between flex flex-col z-10 rounded-br-xl overflow-y-scroll' style={{ transform: `translateX(-${sidebarPosition}%)` }}>
        <div>
          <span className={`${getCurrentScreen(history).color} flex items-center px-3 space-x-2 font-semibold text-white h-11 mb-2`}>{getCurrentScreen(history).label}</span>
          {items.map((item, index) => (
            <Link to={item.path} key={index}>
              <div
                key={index}
                className='flex items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer select-none rounded-xl mx-2'
                onClick={() => closeSidebar(dispatch)}
              >
                <span className={`${item.icon} text-2xl`} />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="fixed bottom-2 w-48">
          {loggedIn ? loggedInItem : loggedOutItem}
        </div>
      </div>
    </>
  );
}
