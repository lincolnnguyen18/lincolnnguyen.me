import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../apps/main/screens/home/HomeScreen';
import { LoginScreen } from '../apps/main/screens/login/LoginScreen';
import { ContactsScreen } from '../apps/speech-chat/screens/contacts/ContactsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, sharedActions, sharedSelector } from '../slices/sharedSlice';
import Cookies from 'js-cookie';
import { graphQLClient } from './clients';
import { Protected } from '../apps/main/components/Protected';
import { Toast } from '../apps/main/components/Toast';

export function App () {
  const dispatch = useDispatch();
  const { loggedIn, sessionToken } = useSelector(sharedSelector);

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

  return loggedIn !== null && (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/speech-chat/contacts" element={<Protected><ContactsScreen /></Protected>} />
      </Routes>
      <Toast />
    </>
  );
}
