import React from 'react';
import { useDispatch } from 'react-redux';
import { sharedActions } from '../../../slices/sharedSlice';
import { useNavigate } from 'react-router-dom';

export function Navbar () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onAddTranscription () {
    navigate('test');
  }

  return (
    <nav className="text-white max-w-screen-sm w-full mx-auto h-11 flex items-center justify-between px-2 fixed top-0 z-10">
      <span
        className="icon-menu text-2xl ml-2 cursor-pointer"
        onClick={() => dispatch(sharedActions.openSidebar())}
      />
      <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Transcriptions</span>
      <div className="flex items-center space-x-4">
        {/*<span*/}
        {/*  className="icon-search text-2xl cursor-pointer"*/}
        {/*  onClick={() => setNavbarMode('search-transcriptions')}*/}
        {/*/>*/}
        <span
          className="icon-add text-2xl cursor-pointer"
          onClick={onAddTranscription}
        />
      </div>
    </nav>
  );
}
