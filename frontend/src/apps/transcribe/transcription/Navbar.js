import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Navbar () {
  const navigate = useNavigate();

  return (
    <nav className="text-white max-w-screen-sm w-full mx-auto h-11 flex items-center fixed top-0 z-10">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate('/transcribe/transcriptions')}
      >
        <span className="icon-back text-2xl ml-2" />
        <span>Back</span>
      </div>
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Messages</span>
    </nav>
  );
}
