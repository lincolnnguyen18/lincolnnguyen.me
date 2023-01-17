import React from 'react';
import { useDispatch } from 'react-redux';
import { sharedActions } from '../../../slices/sharedSlice';
import { useNavigate } from 'react-router-dom';
import { NavBarContainer } from '../../../components/NavBarContainer';

export function Navbar () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onAddTranscription () {
    navigate('test');
  }

  return (
    <NavBarContainer twStyle="bg-purple-custom justify-between px-2">
      <span
        className="icon-menu text-2xl cursor-pointer"
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
    </NavBarContainer>
  );
}
