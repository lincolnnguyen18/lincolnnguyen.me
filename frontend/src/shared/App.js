import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomeScreen } from '../apps/main/screens/home/HomeScreen';
import { LoginScreen } from '../apps/main/screens/login/LoginScreen';
import { ContactsScreen } from '../apps/speech-chat/screens/contacts/ContactsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, sharedActions, sharedSelector } from '../slices/sharedSlice';
import Cookies from 'js-cookie';
import { graphQLClient } from './clients';
import { Protected } from '../apps/main/components/Protected';
import { Toast } from '../apps/main/components/Toast';
import { AccountScreen } from '../apps/main/screens/account/AccountScreen';
import { MessagesScreen } from '../apps/speech-chat/screens/messages/MessagesScreen';
import { getCurrentScreen, getPreviousScreen, homeScreen } from './utils/navUtils';
import { TempScreen1 } from '../apps/testing/TempScreen1';

export function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn, sessionToken, history } = useSelector(sharedSelector);
  const noNav = ['/login', '/testing'];
  const subScreens = ['/account'];

  React.useEffect(() => {
    if (sessionToken) {
      dispatch(getUserData());
    } else {
      const sessionToken = Cookies.get('sessionToken');
      if (sessionToken) {
        dispatch(sharedActions.setSlice({ sessionToken }));
        graphQLClient.setHeader('authorization', `Bearer ${sessionToken}`);
      } else {
        dispatch(sharedActions.setSlice({ loggedIn: false }));
      }
    }
  }, [sessionToken]);

  React.useEffect(() => {
    const path = location.pathname;
    let color = homeScreen.color;
    let label = homeScreen.label;
    if (path.startsWith('/speech-chat')) {
      color = 'bg-red-custom';
      label = 'SpeechChat';
    } else if (path.startsWith('/account') && history.length > 1) {
      color = history[history.length - 1].color;
      label = history[history.length - 1].label;
    }
    dispatch(sharedActions.pushHistory({ path, color, label }));
  }, [location.pathname]);

  // React.useEffect(() => {
  //   console.log('history', history);
  // }, [history]);

  let navbarBackground;
  if (!noNav.some(path => location.pathname.startsWith(path))) {
    let color;
    if (subScreens.some(path => location.pathname.startsWith(path))) {
      color = getPreviousScreen(history).color;
    } else {
      color = getCurrentScreen(history).color;
    }
    navbarBackground = (
      <div className={`${color} h-11 w-screen fixed top-0 z-10`} />
    );
  }

  return loggedIn !== null && (
    <>
      {navbarBackground}
      <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/account" element={<Protected><AccountScreen /></Protected>} />
          <Route path="/speech-chat/contacts" element={<Protected><ContactsScreen /></Protected>} />
          <Route path="/speech-chat/contacts/:contactId" element={<Protected><MessagesScreen /></Protected>} />
          <Route path="/testing" element={<TempScreen1 />} />
          <Route path="*" element={<div className="mt-16">404</div>} />
        </Routes>
      </div>
      <Toast />
    </>
  );
}
