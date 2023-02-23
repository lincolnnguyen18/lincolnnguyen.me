import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../slices/commonSlice.js';

export function Protected ({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn } = useSelector(commonSelector);

  React.useEffect(() => {
    if (!loggedIn) {
      dispatch(commonActions.setSlice({ showLogin: location.pathname }));
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (<Navigate to="/" replace />);
  } else {
    return children;
  }
}
