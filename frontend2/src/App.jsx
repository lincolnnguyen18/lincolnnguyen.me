import './App.css';
import { HomeScreen } from './apps/main/HomeScreen.jsx';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ContactsScreen } from './apps/messages/ContactsScreen.jsx';
import { TranscriptionsScreen } from './apps/transcribe/TranscriptionsScreen.jsx';
import { TranscriptionScreen } from './apps/transcribe/TranscriptionScreen.jsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { commonSelector } from './slices/commonSlice.js';
import { NavbarMenu } from './components/NavbarMenu.jsx';

function App () {
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
  }, [location.pathname]);

  return (
    <>
      <div className="z-[-1] fixed bottom-0 right-0 top-0 left-0 brightness-[0.85]" style={{ backgroundSize: 'cover', backgroundImage: 'url(/bg.jpg)', backgroundPosition }} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/messages/contacts" element={<ContactsScreen />} />
        <Route path="/messages/contacts/:id" element={<ContactsScreen />} />
        <Route path="/transcribe/transcriptions" element={<TranscriptionsScreen />} />
        <Route path="/transcribe/transcriptions/:id" element={<TranscriptionScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <NavbarMenu />
    </>
  );
}

export default App;
