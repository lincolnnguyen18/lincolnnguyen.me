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

export function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn, sessionToken } = useSelector(sharedSelector);
  const [previousScreen, setPreviousScreen] = React.useState(null);

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
    if (previousScreen) {
      dispatch(sharedActions.pushHistory(previousScreen));
    }
    const path = location.pathname;
    let color = 'bg-green-custom';
    if (path.startsWith('/speech-chat')) {
      color = 'bg-red-custom';
    }
    setPreviousScreen({ path, color });
  }, [location.pathname]);

  // React.useEffect(() => {
  //   console.log('history', history);
  // }, [history]);

  return loggedIn !== null && (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/account" element={<Protected><AccountScreen /></Protected>} />
        <Route path="/speech-chat/contacts" element={<Protected><ContactsScreen /></Protected>} />
        <Route path="/speech-chat/contacts/:contactId" element={<Protected><MessagesScreen /></Protected>} />
      </Routes>
      <Toast />
    </>
  );
}
