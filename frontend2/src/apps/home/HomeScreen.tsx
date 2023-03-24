import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';
import AppContainer from 'components/AppContainer';
import FadeInOnLoad from 'components/FadeInOnLoad';
import AuthModal from 'apps/home/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from 'slices/commonSlice';
import { Fragment, useState } from 'react';
import { mockAppsData } from 'common/mockData';
import { AppData } from 'common/data';

export default function HomeScreen () {
  const dispatch = useDispatch();
  const { user } = useSelector(commonSelector);
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false);

  function onAppIconClick (app: AppData) {
    // if app is protected and user is not logged in, set redirectToAfterLogin and open auth modal
    if (app.isProtected && user === null) {
      dispatch(commonActions.updateSlice({ redirectToAfterLogin: `/${app.hyphenatedName}` }));
      setAuthModalIsOpen(true);
    }
  }

  return (
    <Fragment>
      <AppContainer>
        <Nav className='text-white' text="Apps" />
        <FadeInOnLoad>
          <Apps apps={mockAppsData.map((app, index) => (
            <AppIcon
              abbreviation={app.abbreviation}
              name={app.name}
              style={{ backgroundColor: app.color }}
              disabled={user === null && app.isProtected}
              to={`/${app.hyphenatedName}`}
              onClick={() => onAppIconClick(app)}
              key={index}
            />
          ))} />
        </FadeInOnLoad>
      </AppContainer>
      <AuthModal isOpen={authModalIsOpen} onClose={() => setAuthModalIsOpen(false)} />
    </Fragment>
  );
}
