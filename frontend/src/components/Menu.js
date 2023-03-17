import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../slices/commonSlice';
import { BlurBackground } from './BlurBackground';
import { Button } from './Button';
import { MenuContainer } from './MenuContainer';
import { MenuNavbar } from './MenuNavbar';

export function Menu () {
  const dispatch = useDispatch();
  const { menuOpen, menuChildren, menuChildrenHidden, menuEasyClose } = useSelector(commonSelector);

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  return (
    <>
      <BlurBackground open={menuOpen} easyClose={menuEasyClose} />
      <MenuContainer open={menuOpen} onClick={menuEasyClose ? handleClose : undefined} className='items-end'>
        <MenuNavbar>
          <Button onClick={handleClose} className='icon-close text-white h-11 mx-3' />
        </MenuNavbar>
        <div
          className='mx-3 transition-[opacity] duration-200 w-full'
          style={{ opacity: menuChildrenHidden || !menuOpen ? 0 : 1, pointerEvents: menuChildrenHidden || !menuOpen ? 'none' : 'all' }}
        >
          {menuChildren}
        </div>
      </MenuContainer>
    </>
  );
}
