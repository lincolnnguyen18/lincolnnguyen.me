import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sharedActions, sharedSelector } from '../../../slices/sharedSlice';
import { Spinner } from '../../../shared/components/Spinner';
import { colors } from '../../../shared/clients';
import { Sidebar } from '../../../shared/components/Sidebar';
import { Navbar } from './Navbar';
import { transcribeSelector } from '../../../slices/transcribeSlice';
import { IconMessage } from '../../../components/IconMessage';

export function TranscriptionsScreen () {
  React.useEffect(() => {
    document.title = 'Transcriptions - Transcribe';
  }, []);

  const dispatch = useDispatch();
  const { loggedIn } = useSelector(sharedSelector);
  const { transcriptions } = useSelector(transcribeSelector);

  React.useEffect(() => {
    dispatch(sharedActions.setSlice({
      scrollboxTop: '2.75rem',
      scrollboxBottom: '0',
    }));
  }, []);

  let content;
  if (!transcriptions) {
    content = (
      <div className="w-full flex justify-center mt-16">
        <Spinner color={colors.red.custom} />
      </div>
    );
  } else if (transcriptions?.length === 0) {
    content = (
      <IconMessage
        iconStyle="icon-article text-purple-custom"
        messageText="You have no transcriptions. Add a transcription by pressing the plus button at the top right."
      />
    );
  }

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      {content}
      <Sidebar items={[
        { icon: 'icon-apps', label: 'Apps', path: '/' },
      ]} />
    </div>
  );
}
