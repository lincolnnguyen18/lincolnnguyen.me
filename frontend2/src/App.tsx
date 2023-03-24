import Debug from 'apps/home/Debug';
import HomeScreen from 'apps/home/HomeScreen';
import InitialLoad from 'apps/home/InitialLoad';
import Wallpaper from 'apps/home/Wallpaper';
import Menu from 'components/Menu';
import { appsData } from 'common/data';
import { NavBlur } from 'components/Nav';
import { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function App () {
  return (
    <Fragment>
      <InitialLoad />
      <Debug />
      <Wallpaper imageUrl='/bg.webp' className='bg-black' />
      <NavBlur />
      <Menu />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        {appsData.map((app, index) => (
          <Route
            path={`/${app.hyphenatedName}`}
            element={app.mainScreen}
            key={index}
          />
        ))}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Fragment>
  );
}
