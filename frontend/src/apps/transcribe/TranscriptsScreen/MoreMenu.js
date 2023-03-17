import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/Button';
import { uuid } from '../../../common/stringUtils';
import { openMenu } from '../../../slices/commonSlice';
import { Search } from './Search';

export function MoreMenu () {
  const dispatch = useDispatch();

  function handleOpenSearch () {
    dispatch(openMenu({
      children: <Search />,
      easyClose: false,
    }));
  }

  return (
    <>
      <Button className='icon-search' onClick={handleOpenSearch} />
      <Button className='icon-add' linkPath={`/transcribe/${uuid()}`} />
    </>
  );
}
