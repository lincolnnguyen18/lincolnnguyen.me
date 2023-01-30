import './App.css';
import { HomeScreen } from './apps/main/HomeScreen.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ContactsScreen } from './apps/messages/ContactsScreen.jsx';
import { TranscriptionsScreen } from './apps/transcribe/TranscriptionsScreen.jsx';
import { TranscriptionScreen } from './apps/transcribe/TranscriptionScreen.jsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from './slices/commonSlice.js';
import { ContainerButton } from './components/ContainerButton.jsx';
import { Button } from './components/Button.jsx';

function App () {
  const dispatch = useDispatch();
  const { bodyScroll, navMenu, backgroundPosition } = useSelector(commonSelector);

  React.useEffect(() => {
    if (bodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [bodyScroll]);

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
      <div
        className='left-0 right-0 h-screen fixed top-0 backdrop-blur transition-[opacity] duration-400 z-[1] transition-[opacity] duration-200'
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none' }}
        onMouseDown={() => dispatch(commonActions.closeNavMenu())}
      />
      <div
        className="fixed top-0 bottom-0 z-[1] w-full left-1/2 transform -translate-x-1/2 transition-[opacity] duration-200 overflow-y-scroll pb-3"
        style={{ opacity: navMenu.open ? 1 : 0, pointerEvents: navMenu.open ? 'all' : 'none' }}
        onClick={() => dispatch(commonActions.closeNavMenu())}
        id="nav-menu"
      >
        <div className="max-w-screen-sm mx-auto flex flex-col items-start">
          <Button twStyle="icon-close text-white h-11 ml-3" onClick={() => dispatch(commonActions.closeNavMenu())} />
          <div className="flex flex-col gap-3">
            {[...Array(1)].map((_, i) => (
              <ContainerButton
                twStyle="flex items-center p-2 gap-2 rounded-lg mx-2 bg-black bg-opacity-50 active:bg-black hover:bg-black hover:bg-opacity-60 active:bg-opacity-75 w-48"
                linkPath="/"
                onClick={() => setTimeout(() => dispatch(commonActions.closeNavMenu()), 15)}
                key={i}
              >
                <span className='icon-apps text-2xl text-white' />
                <span className="text-white">Apps</span>
              </ContainerButton>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
