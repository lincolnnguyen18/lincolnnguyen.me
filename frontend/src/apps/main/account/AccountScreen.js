import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../shared/components/Sidebar';
import Cookies from 'js-cookie';
import { sharedActions } from '../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HoverActiveContainer } from '../../../components/HoverActiveContainer';
import { ScrollBox } from '../../../components/ScrollBox';
import { ScrollBoxContent } from '../../../components/ScrollBoxContent';

export function AccountScreen () {
  React.useEffect(() => {
    document.title = 'Account';
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(sharedActions.setSlice({
      scrollboxTop: '2.75rem',
      scrollboxBottom: '0',
    }));
  }, []);

  function onLogout () {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      Cookies.remove('sessionToken');
      dispatch(sharedActions.setSlice({ userData: null, loggedIn: false, sessionToken: null }));
      navigate('/');
    }
  }

  return (
    <div className='relative w-full'>
      <Navbar />
      <ScrollBox>
        <ScrollBoxContent>
          <HoverActiveContainer
            twStyle='flex items-center p-2 gap-2 mx-2'
            onClick={onLogout}
          >
            <span className={'icon-logout text-2xl'} />
            <span>Logout</span>
          </HoverActiveContainer>
        </ScrollBoxContent>
      </ScrollBox>
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
