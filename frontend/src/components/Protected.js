import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector, openLogin } from '../slices/commonSlice.js';

export function Protected ({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn, loggingOut } = useSelector(commonSelector);

  React.useEffect(() => {
    if (!loggedIn) {
      dispatch(commonActions.setSlice({ showLogin: location.pathname }));
      if (!loggingOut) {
        dispatch(openLogin());
      }
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (<Navigate to='/' replace />);
  } else {
    return children;
  }
}
