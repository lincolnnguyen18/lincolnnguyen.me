import React from 'react';
import { Navbar } from './Navbar';
import { AppIcon } from './AppIcon';
import { Sidebar } from '../../../shared/components/Sidebar';
import { sharedActions } from '../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { ScrollBox } from '../../../components/ScrollBox';

export function HomeScreen () {
  React.useEffect(() => {
    document.title = 'Apps';
  }, []);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(sharedActions.setSlice({
      scrollboxTop: '2.75rem',
      scrollboxBottom: '0',
    }));
  }, []);

  return (
    <div className='relative w-full'>
      <Navbar />
      <ScrollBox>
        <div className="grid grid-cols-4 grid-flow-row gap-4 place-items-center w-full max-w-screen-sm py-2 mx-auto">
          <AppIcon text="Messages" bgColor="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
          <AppIcon text="Transcribe" bgColor="bg-purple-custom" placeholderInitials="T" path="/transcribe/transcriptions" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
          <AppIcon text="Resume" bgColor="bg-green-custom" placeholderInitials="R" path="/resume" />
        </div>
      </ScrollBox>
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
