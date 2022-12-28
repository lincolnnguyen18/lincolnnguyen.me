import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export function LoginScreen () {
  const navigate = useNavigate();

  function onCancel () {
    navigate('/');
  }

  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden pt-16 space-y-4 px-4 max-w-screen-sm mx-auto bg-green-custom text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
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
