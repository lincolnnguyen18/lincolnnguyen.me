import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, sharedSelector } from '../../../../slices/main/sharedSlice';
import Cookies from 'js-cookie';

export function LoginScreen () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, loggingInTo } = useSelector(sharedSelector);

  function onCancel () {
    navigate('/');
  }

  React.useEffect(() => {
    if (userData) {
      // console.log('userData', userData);
      // console.log('loggingInTo', loggingInTo);
      navigate(loggingInTo || '/');
    }
  }, [userData]);

  return !userData && !Cookies.get('sessionToken') && (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden pt-16 space-y-4 px-4 max-w-screen-sm mx-auto bg-green-custom text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => dispatch(getUserData({
            tokenType: 'googleToken',
            token: credentialResponse.credential,
          }))}
          onError={() => console.error('Login Failed')}
          useOneTap
        />
        <span
          className="font-semibold cursor-pointer"
          onClick={onCancel}
        >Cancel</span>
      </div>
    </div>
  );
}
