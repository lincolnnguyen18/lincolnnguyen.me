import IconButton from 'components/IconButton';
import LimitWidthContainer from 'components/LimitWidthContainer';
import Nav from 'components/Nav';
import { useRef } from 'react';
import { Transition } from 'react-transition-group';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose: () => void;
}

export default function Menu (props: MenuProps) {
  const { isOpen, onClose, children, ...rest } = props;
  const nodeRef = useRef(null);

  return (
    <Transition in={isOpen} timeout={200} nodeRef={nodeRef} unmountOnExit onExit={onClose}>
      {state => {
        const showMenu = state === 'entered' || state === 'entering';
        const menuStyle: React.CSSProperties = {
          opacity: showMenu ? 1 : 0,
          pointerEvents: showMenu ? 'auto' : 'none',
        };

        return (
          <div ref={nodeRef}>
            <div
              className='bg-black bg-opacity-50 backdrop-blur h-[1000%] w-[1000%] fixed top-0 left-0 z-[2] transition-opacity duration-200'
              style={menuStyle}
            />
            <div
              className='text-white overflow-y-auto h-full w-full overscroll-y-contain fixed top-0 left-0 z-[2] transition-opacity duration-100'
              style={menuStyle}
              {...rest}
            >
              <div style={{ minHeight: 'calc(100vh + 1px)' }}>
                <Nav className='relative'>
                  <LimitWidthContainer className='flex justify-end px-3'>
                    <IconButton className='icon-close' onClick={onClose} />
                  </LimitWidthContainer>
                </Nav>
                {children}
              </div>
            </div>
          </div>
        );
      }}
    </Transition>
  );
};
