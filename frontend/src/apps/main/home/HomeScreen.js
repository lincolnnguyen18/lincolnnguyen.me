import React from 'react';
import { Navbar } from './Navbar';
import { AppIcon } from './AppIcon';
import { Sidebar } from '../../../shared/components/Sidebar';
import { sharedActions } from '../../../slices/sharedSlice';
import { useDispatch } from 'react-redux';
import { ScrollBox } from '../../../components/ScrollBox';
import { ScrollBoxContent } from '../../../components/ScrollBoxContent';

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

  const dummyIcons = [];
  for (let i = 0; i < 50; i++) {
    dummyIcons.push(
      <AppIcon text="Resume" bgColor="green-custom" placeholderInitials="R" path="/resume" key={i} />,
    );
  }

  return (
    <div className='relative w-full'>
      <Navbar />
      <ScrollBox>
        <ScrollBoxContent whiteBackground={false}>
          <Sidebar items={[
            { icon: 'icon-apps', label: 'Apps', path: '/' },
          ]} />
          <div className="grid grid-cols-4 grid-flow-row gap-4 place-items-center w-full px-2">
            <AppIcon text="Messages" bgColor="red-custom" placeholderInitials="M" path="/messages/contacts" />
            <AppIcon text="Transcribe" bgColor="purple-custom" placeholderInitials="T" path="/transcribe/transcriptions" />
            {dummyIcons}
          </div>
        </ScrollBoxContent>
      </ScrollBox>
    </div>
  );
}
