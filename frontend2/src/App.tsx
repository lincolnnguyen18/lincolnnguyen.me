import React from 'react';
import Debug from 'apps/home/Debug';
import HomeScreen from 'apps/home/HomeScreen';
import InitialLoad from 'apps/home/InitialLoad';
import { Route, Routes } from 'react-router-dom';
import Wallpaper from 'apps/home/Wallpaper';

function App () {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
      <InitialLoad />
      <Debug />
      <Wallpaper imageUrl='/bg.webp' />
    </React.Fragment>
  );
}

export default App;
