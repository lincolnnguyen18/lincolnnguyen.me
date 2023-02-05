import './App.css';
import { HomeScreen } from './apps/main/HomeScreen.jsx';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ContactsScreen } from './apps/messages/ContactsScreen.jsx';
import { TranscriptsScreen } from './apps/transcribe/TranscriptsScreen/TranscriptsScreen.jsx';
import { TranscriptScreen } from './apps/transcribe/TranscriptScreen/TranscriptScreen.jsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from './slices/commonSlice.js';
import { NavbarMenu } from './components/NavbarMenu.jsx';
import { TestScreen } from './apps/main/TestScreen.jsx';

function App () {
  const dispatch = useDispatch();
  const location = useLocation();
  const { bodyScroll, backgroundPosition } = useSelector(commonSelector);

  React.useEffect(() => {
    if (bodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [bodyScroll]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(commonActions.closeNavMenu());
  }, [location.pathname]);

  React.useEffect(() => {
    if (navigator.userAgent.indexOf('Android') !== -1) {
      document.body.style.overscrollBehaviorY = 'none';
    }

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

  return (
    <>
      {location.pathname !== '/testing' && <div className="z-[-1] fixed bottom-0 right-0 top-0 left-0 brightness-[0.85]" style={{ backgroundSize: 'cover', backgroundImage: 'url(/bg.jpg)', backgroundPosition }} />}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/testing" element={<TestScreen />} />
        <Route path="/messages/contacts" element={<ContactsScreen />} />
        <Route path="/messages/contacts/:id" element={<ContactsScreen />} />
        <Route path="/transcribe/transcripts" element={<TranscriptsScreen />} />
        <Route path="/transcribe/transcripts/:id" element={<TranscriptScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NavbarMenu />
    </>
  );
}

export default App;
