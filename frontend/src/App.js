import React from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { commonActions, commonSelector, getUser } from './slices/commonSlice';
import { HomeScreen } from './apps/main/HomeScreen';
import { ContactsScreen } from './apps/messages/ContactsScreen';
import { TranscriptsScreen } from './apps/transcribe/TranscriptsScreen/TranscriptsScreen';
import { TranscriptScreen } from './apps/transcribe/TranscriptScreen/TranscriptScreen';
import { Protected } from './components/Protected';
import { NavbarMenu } from './components/NavbarMenu';
import { detect } from 'detect-browser';
import { closeMenu } from './common/MenuUtils';
import { gqlClient } from './common/clients';
import { environment } from './common/environment';
import { Loading } from './apps/main/Loading';
import { Alert } from './apps/main/Alert';
import { ResumeScreen } from './apps/resume/ResumeScreen';
import { SettingsScreen } from './apps/settings/SettingsScreen';
import { Menu } from './components/Menu';

export function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { backgroundPosition, navMenu, browser, windowValues, token, showLogin, user } = useSelector(commonSelector);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (navMenu.open) {
      dispatch(commonActions.closeNavMenu());
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (!navMenu.open) {
      setTimeout(() => {
        dispatch(commonActions.clearNavMenuChildren());
      }, 100);
    }
  }, [navMenu.open]);

  React.useEffect(() => {
    if (token) {
      if (!user) {
        gqlClient.setHeader('Authorization', `Bearer ${token}`);
        dispatch(getUser());
      } else if (showLogin) {
        navigate(showLogin);
        closeMenu(dispatch);
      }
    }
  }, [user, token]);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log(environment.VERSION);
    }

    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const token = Cookies.get('token');
    if (token) {
      dispatch(commonActions.setSlice({ token: token }));
    } else {
      dispatch(commonActions.setSlice({ token: null, user: null }));
    }

    const browser = detect();
    // window.alert(JSON.stringify(browser));
    dispatch(commonActions.setSlice({ browser }));

    function handleResize () {
      const windowValues = { width: window.innerWidth, height: window.innerHeight };
      dispatch(commonActions.setSlice({ windowValues }));
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    function handleScroll () {
      const scrollPosition = window.scrollY;
      dispatch(commonActions.setSlice({ scrollPosition }));
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (browser?.os.startsWith('Android')) {
      document.body.style.overscrollBehaviorY = 'none';
    }

    if (browser?.name === 'chrome' && (browser?.os.startsWith('Mac') || browser?.os.startsWith('Windows') || browser?.os.startsWith('Linux'))) {
      dispatch(commonActions.setSlice({ transcriptionSupported: true }));
    } else {
      dispatch(commonActions.setSlice({ transcriptionSupported: false }));
    }
  }, [browser]);

  React.useEffect(() => {
    if (browser?.os.startsWith('Windows')) {
      document.body.style.overflowY = 'scroll';
    }
  }, [windowValues.width]);

  const imageUrl = '/bg.webp';

  return token !== undefined && user !== undefined && (
    <>
      <div className="z-[-1] fixed bottom-0 right-0 top-0 left-0 brightness-[0.85] bg-gray-background" style={{ backgroundSize: 'cover', backgroundImage: `url(${imageUrl})`, backgroundPosition }} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/messages" element={<Protected><ContactsScreen /></Protected>} />
        <Route path="/messages/:id" element={<Protected><ContactsScreen /></Protected>} />
        <Route path="/transcribe" element={<Protected><TranscriptsScreen /></Protected>} />
        <Route path="/transcribe/:id" element={<Protected><TranscriptScreen /></Protected>} />
        <Route path="/resume" element={<Protected><ResumeScreen /></Protected>} />
        <Route path="/settings" element={<Protected><SettingsScreen /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NavbarMenu />
      <Loading />
      <Alert />
      <Menu />
    </>
  );
}
