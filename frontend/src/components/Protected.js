import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../slices/sharedSlice';
import React from 'react';

export function Protected ({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn } = useSelector(sharedSelector);

  React.useEffect(() => {
    if (loggedIn === false) {
      dispatch(sharedActions.setSlice({ loggingInTo: location.pathname }));
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (<Navigate to="/login" replace />);
  } else {
    return children;
  }
}
