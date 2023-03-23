import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';
import AppContainer from 'components/AppContainer';
import { appsData } from 'common/data';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import { enableCallbackIfTrue } from 'utils/miscUtils';
import { useEffect, useState } from 'react';
import { mockApps } from 'common/mockData';

export default function HomeScreen () {
  const { user } = useSelector(commonSelector);
  const [apps, setApps] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const apps: React.ReactNode[] = [];
    apps.push(...appsData.map((app, index) => (
      <AppIcon
        abbreviation={app.abbreviation}
        name={app.name}
        style={{ backgroundColor: app.color }}
        to={`/${app.hyphenatedName}`}
        disabled={user === null && app.isProtected}
        key={index}
        // TODO: replace with navigate to /login
        onClick={enableCallbackIfTrue(user === null, () => {})}
      />
    )));
    // TODO: remove mockApps
    apps.push(...mockApps);
    setApps(apps);
  }, [user]);

  return (
    <AppContainer>
      <Nav className='text-white' text="Apps" />
      <Apps apps={apps} />
    </AppContainer>
  );
}
