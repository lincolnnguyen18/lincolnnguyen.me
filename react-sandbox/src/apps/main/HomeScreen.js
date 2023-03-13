import React from 'react';
import { AppIcon } from './AppIcon';
import { NavbarBlur } from '../../components/NavbarBlur';
import { Navbar } from '../../components/Navbar';
import { Grid } from './Grid';

export function HomeScreen () {
  const dummyIcons = [];
  for (let i = 0; i < 50; i++) {
    dummyIcons.push(
      <AppIcon text="Placeholder" twStyle="bg-gray-500 text-white" placeholderInitials="P" path="/placeholder" key={i} />,
    );
  }

  React.useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return (
    <>
      <NavbarBlur />
      <Grid>
        <AppIcon text="Audio Player" twStyle="bg-red-custom" placeholderInitials="A" path="/audio-player" />
        {dummyIcons}
      </Grid>
      <Navbar>
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Demos</span>
      </Navbar>
    </>
  );
}
