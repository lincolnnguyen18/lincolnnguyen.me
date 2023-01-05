import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionToken, sharedSelector } from '../../../../slices/sharedSlice';

export function LoginScreen () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, loggingInTo } = useSelector(sharedSelector);

  function onCancel () {
    navigate('/');
  }

  async function onSuccess (response) {
    console.log('response', response);
    const { credential: googleToken } = response;
    await dispatch(getSessionToken({ googleToken }));
  }

  React.useEffect(() => {
    if (loggedIn) {
      // console.log('userData', userData);
      // console.log('loggingInTo', loggingInTo);
      navigate(loggingInTo || '/');
    }
  }, [loggedIn]);

  return (
    <div className="h-screen w-screen bg-green-custom text-white flex flex-col items-center justify-center w-full space-y-4 z-20">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => console.error('Login Failed')}
        useOneTap
      />
      <span
        className="font-semibold cursor-pointer"
        onClick={onCancel}
      >Cancel</span>
    </div>
  );
}
