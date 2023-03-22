import DemosScreen from 'apps/demos/DemosScreen';
import Debug from 'apps/home/Debug';
import HomeScreen from 'apps/home/HomeScreen';
import InitialLoad from 'apps/home/InitialLoad';
import Wallpaper from 'apps/home/Wallpaper';
import TvSchedulesScreen from 'apps/tv-schedules/TvSchedulesScreen';
import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function App () {
  return (
    <Fragment>
      <InitialLoad />
      <Debug />
      <Wallpaper imageUrl='/bg.webp' className='bg-black' />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/tv-schedules' element={<TvSchedulesScreen />} />
        <Route path='/demos' element={<DemosScreen />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Fragment>
  );
}
