import React from 'react';
import { openMenu } from '../../../slices/commonSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/Button';
import { MoreMenu } from './MoreMenu';
import { transcribeSelector } from '../../../slices/transcribeSlice';

export function MoreMenuButton ({ disabled }) {
  const dispatch = useDispatch();
  const { mode, playing } = useSelector(transcribeSelector);

  function openMoreMenu () {
    dispatch(openMenu({ children: <MoreMenu /> }));
  }

  return (
    <Button className='icon-more-horiz' onClick={openMoreMenu} disabled={disabled || playing || mode !== 'default'} />
  );
}
