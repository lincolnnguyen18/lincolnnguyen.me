import React from 'react';
import { fetchUser } from 'slices/commonAsyncActions';
import { useAppDispatch } from 'common/store';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { appsData } from 'common/data';

// check if pathname is in appsData as hypenatedName and isProtected
function isProtectedPath (pathname: string) {
  const path = pathname.slice(1);
  return appsData.some(app => app.hyphenatedName === path && app.isProtected);
}

export default function AppContainer ({ children }: any) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useSelector(commonSelector);

  async function onLoad () {
    // TODO: use actual cookie to get token
    // const token = Cookies.get('token');
    const token = 'token';
    if (token) {
      await dispatch(fetchUser(token));
    }
  }

  React.useEffect(() => {
    // TODO: save pathname in state before redirecting to /login
    onLoad();
  }, []);

  // if not protected path, return children
  if (!isProtectedPath(location.pathname)) {
    return children;
  // if waiting for fetchUser, return null
  } else if (user === undefined) {
    return null;
  // if result of fetchUser is null, redirect to /login
  } else if (user === null) {
    // TODO: replace with /login
    return (<Navigate to='/' replace />);
  // else, return children
  } else {
    return children;
  }
}
