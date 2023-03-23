import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';
import AppContainer from 'components/AppContainer';
import FadeInOnLoad from 'components/FadeInOnLoad';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import { mockAppsData } from 'common/mockData';

export default function HomeScreen () {
  const { user } = useSelector(commonSelector);

  // TODO: create actual login modal component, use portal or redux state component to fix fade into transition
  let loginRoute = null;
  if (user === null) {
    loginRoute = (
      <FadeInOnLoad>
        <div className='fixed bg-white p-3 rounded text-black z-[2] flex flex-col gap-3 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[300px]'>
          <span>Login modal</span>
          <Link className='bg-black text-white rounded p-2 flex justify-center' to='/home'>Close</Link>
        </div>
      </FadeInOnLoad>
    );
  } else if (user !== undefined) {
    loginRoute = <Navigate to='/home' replace />;
  }

  return (
    <Fragment>
      <Routes>
        <Route path='login' element={loginRoute} />
      </Routes>
      <AppContainer>
        <Nav className='text-white' text="Apps" />
        <FadeInOnLoad fadeOnNavigationPop={false}>
          <Apps apps={mockAppsData.map((app, index) => (
            <AppIcon
              abbreviation={app.abbreviation}
              name={app.name}
              style={{ backgroundColor: app.color }}
              // if not logged in and app is protected, redirect to /login, else continue to app
              to={user === null && app.isProtected ? 'login' : `/${app.hyphenatedName}`}
              key={index}
            />
          ))} />
        </FadeInOnLoad>
      </AppContainer>
    </Fragment>
  );
}
