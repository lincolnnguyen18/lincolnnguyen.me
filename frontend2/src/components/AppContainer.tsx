import { fetchUser } from 'slices/commonAsyncActions';
import { useAppDispatch } from 'common/store';
import { useSelector } from 'react-redux';
import { commonActions, commonSelector } from 'slices/commonSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { appsData } from 'common/data';
import { Fragment, useEffect } from 'react';

// check if pathname is in appsData as hypenatedName and isProtected
function isProtectedPath (pathname: string) {
  const path = pathname.slice(1);
  return appsData.some(app => app.hyphenatedName === path && app.isProtected);
}

export default function AppContainer (props: React.HTMLAttributes<HTMLDivElement>) {
  const { children } = props;

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useSelector(commonSelector);

  useEffect(() => {
    // if attempt to fetch user has not been made, attempt to fetch user
    if (user === undefined) {
      // TODO: use actual cookie to get token
      // const token = Cookies.get('token');
      const token = 'token';
      // const token = null;
      if (!token) {
        dispatch(commonActions.updateSlice({ user: null }));
      } else {
        dispatch(fetchUser(token));
      }
    // else if user is null and current path is protected, update redirectToAfterLogin before navigating to /
    } else if (user === null && isProtectedPath(location.pathname) && location.pathname !== '/') {
      dispatch(commonActions.updateSlice({ redirectToAfterLogin: location.pathname }));
    }
  }, [user, location.pathname]);  

  const wrappedChildren = (
    <Fragment>
      {children}
    </Fragment>
  );

  // if not protected path, return children
  if (!isProtectedPath(location.pathname)) {
    return wrappedChildren;
  // if waiting for fetchUser, return null
  } else if (user === undefined) {
    return null;
  // if result of fetchUser is null, redirect to /
  } else if (user === null) {
    return (<Navigate to='/' replace />);
  // else, return children
  } else {
    return wrappedChildren;
  }
}
