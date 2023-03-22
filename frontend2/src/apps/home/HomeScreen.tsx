import Nav from 'components/Nav';
import Apps from 'apps/home/Apps';
import AppIcon from 'apps/home/AppIcon';
import { appsData } from 'common/data';
import { useSelector } from 'react-redux';
import { commonSelector } from 'slices/commonSlice';
import { enablePropOnCondition } from 'utils/miscUtils';
import { Fragment, useEffect, useState } from 'react';
import { testApps } from 'common/testData';

export default function HomeScreen () {
  const { user } = useSelector(commonSelector);
  const [apps, setApps] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    console.log(appsData);
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
        onClick={enablePropOnCondition(user === null, () => {})}
      />
    )));
    // TODO: remove testApps
    apps.push(...testApps);
    setApps(apps);
  }, [user]);

  return (
    <Fragment>
      <Nav className='text-white justify-center'>
        <span className='font-semibold'>Apps</span>
      </Nav>
      <Apps apps={apps} />
    </Fragment>
  );
}
