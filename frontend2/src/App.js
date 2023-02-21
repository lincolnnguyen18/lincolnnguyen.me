import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { commonActions, commonSelector } from './slices/commonSlice';
import { HomeScreen } from './apps/main/HomeScreen';
import { TestScreen } from './apps/main/TestScreen';
import { ContactsScreen } from './apps/messages/ContactsScreen';
import { TranscriptsScreen } from './apps/transcribe/TranscriptsScreen/TranscriptsScreen';
import { TranscriptScreen } from './apps/transcribe/TranscriptScreen/TranscriptScreen';
import { Protected } from './components/Protected';
import { NavbarMenu } from './components/NavbarMenu';
import { detect } from 'detect-browser';

export function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { backgroundPosition, navMenu, browser, windowValues } = useSelector(commonSelector);

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

  return (
    <>
      {location.pathname !== '/testing' && <div className="z-[-1] fixed bottom-0 right-0 top-0 left-0 brightness-[0.85]" style={{ backgroundSize: 'cover', backgroundImage: 'url(/bg.jpg)', backgroundPosition }} />}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/testing" element={<TestScreen />} />
        <Route path="/messages/contacts" element={<Protected><ContactsScreen /></Protected>} />
        <Route path="/messages/contacts/:id" element={<Protected><ContactsScreen /></Protected>} />
        <Route path="/transcribe/transcripts" element={<Protected><TranscriptsScreen /></Protected>} />
        <Route path="/transcribe/transcripts/:id" element={<Protected><TranscriptScreen /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NavbarMenu />
    </>
  );
}
