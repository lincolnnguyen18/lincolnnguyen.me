import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../../../slices/sharedSlice';
import React from 'react';

export function Protected ({ children }) {
  const { loggedIn } = useSelector(sharedSelector);

  if (!loggedIn) {
    return (<Navigate to="/login" replace />);
  } else {
    return children;
  }
}
