import React from 'react';
import Debug from 'apps/home/Debug';
import HomeScreen from 'apps/home/HomeScreen';
import InitialLoad from 'apps/home/InitialLoad';
import Wallpaper from 'apps/home/Wallpaper';
import TvSchedulesScreen from 'apps/tv-schedules/TvSchedulesScreen';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function App () {
  return (
    <React.Fragment>
      <InitialLoad />
      <Debug />
      <Wallpaper imageUrl='/bg.webp' />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/tv-schedules' element={<TvSchedulesScreen />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </React.Fragment>
  );
}
