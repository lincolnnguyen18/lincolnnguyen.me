import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomeScreen } from '../apps/main/home/HomeScreen';
import { LoginScreen } from '../apps/main/login/LoginScreen';
import { ContactsScreen } from '../apps/messages/contacts/ContactsScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, sharedActions, sharedSelector } from '../slices/sharedSlice';
import { graphQLClient } from './clients';
import { Protected } from '../components/Protected';
import { Toast } from '../components/Toast';
import { AccountScreen } from '../apps/main/account/AccountScreen';
import { MessagesScreen } from '../apps/messages/messages/MessagesScreen';
import { getCurrentScreen, getNavColor, homeScreen, nonHomeScreens } from './utils/stateUtils';
import { TranscriptionsScreen } from '../apps/transcribe/transcriptions/TranscriptionsScreen';
import { TranscriptionScreen } from '../apps/transcribe/transcription/TranscriptionScreen';
import { closeSidebar } from './components/Sidebar';

export function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn, sessionToken, history, sidebar } = useSelector(sharedSelector);

  React.useEffect(() => {
    if (sessionToken) {
      dispatch(getUserData());
    } else {
      // const sessionToken = Cookies.get('sessionToken');
      const sessionToken = 'eyJhbGciOiJIUzI1NiJ9.NDlhYzZjZTAtMDRmOS00MTI3LWI4OGItMjg4YTQyMjNhYjYy.Xk8X8Czmi3ndm4m7bfHdvzZ3cpe-q8y0MutGyk-sCS0';
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

  React.useEffect(() => {
    document.body.classList.add('overflow-x-hidden');
    function handleResize () {
      dispatch(sharedActions.setSlice({ screenWidth: window.innerWidth }));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // React.useEffect(() => {
  //   console.log('history', history);
  // }, [history]);

  React.useEffect(() => {
    if (sidebar.state === 'open') {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [sidebar.state]);

  const overlay = sidebar.state === 'open';

  return loggedIn !== null && (
    <>
      <div
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur z-20 cursor-pointer transition-[opacity] duration-400'
        style={{ opacity: sidebar.state === 'open' ? 1 : 0, pointerEvents: sidebar.state === 'open' ? 'all' : 'none' }}
        onMouseDown={() => closeSidebar(dispatch)}
      />
      <div className={`h-11 w-screen fixed top-0 backdrop-blur z-[2] bg-opacity-80 sm:rounded-b-3xl transition-[border-radius] duration-300 ${getNavColor(location, history)}`} />
      <div className="fixed bottom-0 right-0 top-0 left-0 brightness-[0.85]" style={{ backgroundSize: 'cover', backgroundImage: 'url(/bg.jpg)' }} />
      <div className="top-0 bottom-0 left-0 right-0 w-full">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/account" element={<Protected><AccountScreen /></Protected>} />
          <Route path="/messages/contacts" element={<Protected><ContactsScreen /></Protected>} />
          <Route path="/messages/contacts/:id" element={<Protected><MessagesScreen /></Protected>} />
          <Route path="/transcribe/transcriptions" element={<Protected><TranscriptionsScreen /></Protected>} />
          <Route path="/transcribe/transcriptions/:id" element={<Protected><TranscriptionScreen /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toast />
    </>
  );
}
