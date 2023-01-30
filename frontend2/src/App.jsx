import './App.css'
import { HomeScreen } from './apps/main/HomeScreen.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ContactsScreen } from './apps/messages/ContactsScreen.jsx';
import { TranscriptionsScreen } from './apps/transcribe/TranscriptionsScreen.jsx';
import { TranscriptionScreen } from './apps/transcribe/TranscriptionScreen.jsx';
import React from 'react';

function App() {
  return (
    <>
      <div className="z-[-1] fixed bottom-0 right-0 top-0 left-0 brightness-[0.85]" style={{ backgroundSize: 'cover', backgroundImage: 'url(/bg.jpg)' }} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/messages/contacts" element={<ContactsScreen />} />
        <Route path="/messages/contacts/:id" element={<ContactsScreen />} />
        <Route path="/transcribe/transcriptions" element={<TranscriptionsScreen />} />
        <Route path="/transcribe/transcriptions/:id" element={<TranscriptionScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
