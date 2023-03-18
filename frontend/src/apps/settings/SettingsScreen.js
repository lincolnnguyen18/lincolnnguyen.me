import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BackButton } from '../../components/BackButton';
import { Group } from '../../components/Group';
import { Navbar } from '../../components/Navbar';
import { NavbarBlur } from '../../components/NavbarBlur';
import { OverflowContainer } from '../../components/OverflowContainer';
import { WhiteButton } from '../../components/WhiteButton';
import { commonActions, openMenu } from '../../slices/commonSlice';
import { Confirm } from '../main/Confirm';

export function SettingsScreen () {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(commonActions.setSlice({ backgroundColor: '#F2F2F6' }));

    return () => {
      dispatch(commonActions.setSlice({ backgroundColor: 'white' }));
    };
  }, []);

  function onLogout () {
    Cookies.remove('token');
    dispatch(commonActions.setSlice({ showLogin: '/', loggedIn: false, token: null, user: null, loggingOut: true }));
  }

  function onLogoutClick () {
    dispatch(openMenu({
      children: <Confirm message='Are you sure you want to logout?' onConfirm={onLogout} />,
      easyClose: false,
    }));
  }

  return (
    <>
      <NavbarBlur className='bg-gray-custom' />
      <Navbar>
        <BackButton linkPath='/' text='Apps' />
        <span className='font-semibold absolute left-1/2 transform -translate-x-1/2'>Settings</span>
      </Navbar>
      <OverflowContainer className='px-3'>
        <Group title='Account' className='text-black'>
          <WhiteButton className='rounded-lg' onClick={onLogoutClick}>
            <span>Logout</span>
            <span className='icon-chevron-right text-2xl text-gray-subtext' />
          </WhiteButton>
          <span className='mt-2 text-sm text-gray-subtext3'>You are currently logged in as "lincoln"</span>
        </Group>
        <Group title='Storage Used' className='text-black'>
          <div className='flex flex-col gap-0'>
            <WhiteButton className='rounded-lg'>
              <span>Transcribe</span>
              <div className='flex items-center gap-1 text-gray-subtext'>
                <span>12 MB</span>
                <span className='icon-chevron-right text-2xl' />
              </div>
            </WhiteButton>
            {/* <WhiteButton className='rounded-t-lg'>
              <span>Transcribe</span>
              <div className='flex items-center gap-1 text-gray-subtext'>
                <span>12 MB</span>
                <span className='icon-chevron-right text-2xl' />
              </div>
            </WhiteButton>
            <Divider noMargin />
            <WhiteButton>
              <span>Messages</span>
              <div className='flex items-center gap-1 text-gray-subtext'>
                <span>12 MB</span>
                <span className='icon-chevron-right text-2xl' />
              </div>
            </WhiteButton>
            <Divider noMargin />
            <WhiteButton className='rounded-b-lg'>
              <span>Messages</span>
              <div className='flex items-center gap-1 text-gray-subtext'>
                <span>12 MB</span>
                <span className='icon-chevron-right text-2xl' />
              </div>
            </WhiteButton> */}
          </div>
        </Group>
      </OverflowContainer>
    </>
  );
}
