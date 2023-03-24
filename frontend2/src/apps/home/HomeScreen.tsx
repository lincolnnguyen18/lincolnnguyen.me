import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';
import AppContainer from 'components/AppContainer';
import FadeInOnLoad from 'components/FadeInOnLoad';
import LoginModal from 'apps/home/LoginModal';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { mockAppsData } from 'common/mockData';
import { AppData } from 'common/data';
import { openMenu } from 'slices/menuAsyncActions';
import { useAppDispatch } from 'common/store';
import { userActions, userSelector } from 'slices/userSlice';

export default function HomeScreen () {
  const dispatch = useAppDispatch();
  const { user } = useSelector(userSelector);

  function onAppIconClick (app: AppData) {
    // if app is protected and user is not logged in, set redirectToAfterLogin and open auth modal
    if (app.isProtected && user === null) {
      dispatch(userActions.updateSlice({ redirectToAfterLogin: `/${app.hyphenatedName}` }));
      dispatch(openMenu({ menuChildren: <LoginModal />, menuCanBeClosedByClickingOutside: false }));
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
    </Fragment>
  );
}
