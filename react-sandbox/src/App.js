import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AudioPlayerScreen } from './apps/audioPlayer/AudioPlayerScreen';
import { HomeScreen } from './apps/main/HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from './slices/commonSlice';
import { detect } from 'detect-browser';

export function App () {
  const dispatch = useDispatch();
  const { backgroundPosition } = useSelector(commonSelector);

  React.useEffect(() => {
    const browser = detect();
    dispatch(commonActions.setSlice({ browser }));
  }, []);

  return (
    <>
      <div className="z-[-1] fixed bottom-0 right-0 top-0 left-0 brightness-[0.85] bg-gray-background" style={{ backgroundSize: 'cover', backgroundImage: 'url(/bg.webp)', backgroundPosition }} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/audio-player" element={<AudioPlayerScreen />} />
      </Routes>
    </>
  );
}
