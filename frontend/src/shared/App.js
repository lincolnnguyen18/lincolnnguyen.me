import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomeScreen } from '../apps/main/home/HomeScreen';
import { LoginScreen } from '../apps/main/login/LoginScreen';
import { ContactsScreen } from '../apps/messages/contacts/ContactsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, sharedActions, sharedSelector } from '../slices/sharedSlice';
import Cookies from 'js-cookie';
import { graphQLClient } from './clients';
import { Protected } from '../components/Protected';
import { Toast } from '../components/Toast';
import { AccountScreen } from '../apps/main/account/AccountScreen';
import { MessagesScreen } from '../apps/messages/messages/MessagesScreen';
import { getCurrentScreen, getNavColor, homeScreen, nonHomeScreens } from './utils/stateUtils';
import { TempScreen1 } from '../apps/testing/TempScreen1';
import { TranscriptionsScreen } from '../apps/transcribe/transcriptions/TranscriptionsScreen';
import { TranscriptionScreen } from '../apps/transcribe/transcription/TranscriptionScreen';

export function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn, sessionToken, history } = useSelector(sharedSelector);

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
    const screen = nonHomeScreens.find((screen) => path.startsWith(screen.path));
    if (screen) {
      color = screen.color;
      label = screen.label;
    } else if (path.startsWith('/account') && history.length > 1) {
      color = history[history.length - 1].color;
      label = history[history.length - 1].label;
    }

    if (getCurrentScreen(history).path !== path) {
      dispatch(sharedActions.pushHistory({ path, color, label }));
    }
  }, [location.pathname]);

  // React.useEffect(() => {
  //   console.log('history', history);
  // }, [history]);

  return loggedIn !== null && (
    <>
      <div className={`${getNavColor(location, history)} h-11 w-screen fixed top-0`} />
      {/*<div*/}
      {/*  className={`${getNavColor(location, history)} h-11 w-screen fixed top-0 z-10 transition-transform duration-300`}*/}
      {/*  style={{ transform: `translateY(-${navbar.position}%)` }}*/}
      {/*/>*/}
      <div className="overflow-hidden absolute top-0 bottom-0 left-0 right-0">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/account" element={<Protected><AccountScreen /></Protected>} />
          <Route path="/messages/contacts" element={<Protected><ContactsScreen /></Protected>} />
          <Route path="/messages/contacts/:id" element={<Protected><MessagesScreen /></Protected>} />
          <Route path="/transcribe/transcriptions" element={<Protected><TranscriptionsScreen /></Protected>} />
          <Route path="/transcribe/transcriptions/:id" element={<Protected><TranscriptionScreen /></Protected>} />
          <Route path="/testing" element={<TempScreen1 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toast />
    </>
  );
}
