import IconButton from 'components/IconButton';
import LimitWidthContainer from 'components/LimitWidthContainer';
import Nav from 'components/Nav';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions, menuSelector } from 'slices/menuSlice';

// both in ms
const backdropTransitionDuration = 200;
const menuTransitionDuration = 100;

export default function Menu () {
  const dispatch = useDispatch();
  const { menuIsOpen, menuChildren, menuCanBeClosedByClickingOutside, menuChildrenAreHidden, menuCloseButtonIsDisabled } = useSelector(menuSelector);

  function onClose () {
    dispatch(menuActions.closeMenu());
  }

  // style for managing visibility and transition of menu children for when menu is open and when children are being switched
  const menuChildrenAreVisible = menuIsOpen && !menuChildrenAreHidden;
  const menuChildrenStyle: React.CSSProperties = {
    opacity: menuChildrenAreVisible ? 1 : 0,
    pointerEvents: menuChildrenAreVisible ? 'auto' : 'none',
    transition: `opacity ${menuTransitionDuration}ms`,
  };

  // style for managing visibility of backdrop and close button
  const commonStyle: React.CSSProperties = {
    opacity: menuIsOpen ? 1 : 0,
    pointerEvents: menuIsOpen ? 'auto' : 'none',
  };

  const backdropStyle: React.CSSProperties = {
    ...commonStyle,
    backgroundColor: menuCanBeClosedByClickingOutside ? 'transparent' : 'rgba(0,0,0,0.55)',
    transition: `opacity ${backdropTransitionDuration}ms`,
  };

  const menuStyle: React.CSSProperties = {
    ...commonStyle,
    transition: `opacity ${menuTransitionDuration}ms`,
  };

  return (
    <Fragment>
      <div
        className='h-screen w-[1000%] fixed top-0 left-0 z-[2] backdrop-blur'
        style={backdropStyle}
      />
      <div
        className='text-white overflow-y-auto h-full w-full overscroll-y-contain fixed top-0 left-0 z-[2]'
        onClick={menuCanBeClosedByClickingOutside ? onClose : undefined}
        style={menuStyle}
      >
        <div style={{ minHeight: 'calc(100vh + 1px)' }}>
          <Nav className='relative'>
            <LimitWidthContainer className='flex justify-end px-3'>
              <IconButton className='icon-close' onClick={onClose} disabled={menuCloseButtonIsDisabled} />
            </LimitWidthContainer>
          </Nav>
          <div style={menuChildrenStyle}>
            {menuChildren}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
