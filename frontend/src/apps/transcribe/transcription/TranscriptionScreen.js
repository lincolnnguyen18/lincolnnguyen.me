import React from 'react';
import { useSelector } from 'react-redux';
import { sharedSelector } from '../../../slices/sharedSlice';
import { Navbar } from './Navbar';
import { Sidebar } from '../../../shared/components/Sidebar';

export function TranscriptionScreen () {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { id } = useParams();
  const { loggedIn } = useSelector(sharedSelector);
  const transcriptions = [];
  // fill messages array with 100 random numbers
  for (let i = 0; i < 100; i++) {
    transcriptions.push(Math.floor(Math.random() * 20));
  }

  return loggedIn && (
    <div className='max-w-screen-sm mx-auto relative'>
      <Navbar />
      <Sidebar
        items={[
          { icon: 'icon-apps', label: 'Apps', path: '/' },
        ]}
      />
    </div>
  );
}
