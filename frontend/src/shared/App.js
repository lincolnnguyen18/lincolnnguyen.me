import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomeScreen } from '../apps/main/screens/home/HomeScreen';
import { LoginScreen } from '../apps/main/screens/login/LoginScreen';
import { ContactsScreen } from '../apps/speech-chat/screens/contacts/ContactsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, sharedActions, sharedSelector } from '../slices/main/sharedSlice';
import Cookies from 'js-cookie';
import { graphQLClient } from './clients';

export function App () {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(sharedSelector);
  const protectedRootRoutes = [
    '/speech-chat',
  ];

  React.useEffect(() => {
    // console.log('loading session token');
    const sessionToken = Cookies.get('sessionToken');
    if (sessionToken) {
      graphQLClient.setHeader('authorization', `Bearer ${sessionToken}`);
      dispatch(getUserData({
        tokenType: 'sessionToken',
        token: sessionToken,
      }));
    }
  }, []);

  React.useEffect(() => {
    const { pathname } = location;
    const sessionToken = Cookies.get('sessionToken');
    // console.log('sessionToken', sessionToken);
    if (
      protectedRootRoutes.some((protectedRootRoute) => pathname.startsWith(protectedRootRoute)) &&
      !userData && !sessionToken
    ) {
      dispatch(sharedActions.setSlice({ loggingInTo: pathname }));
      navigate('/login');
    }
  }, [location.pathname, userData]);

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/speech-chat/contacts" element={<ContactsScreen />} />
    </Routes>
  );
}
