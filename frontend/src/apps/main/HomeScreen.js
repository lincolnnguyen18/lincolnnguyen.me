import React from 'react';
import { AppIcon } from './AppIcon';
import { NavbarBlur } from '../../components/NavbarBlur';
import { Navbar } from '../../components/Navbar';
import { Grid } from './Grid';

export function HomeScreen () {
  // const dummyIcons = [];
  // for (let i = 0; i < 50; i++) {
  //   dummyIcons.push(
  //     <AppIcon text="Placeholder" className="bg-gray-500 text-white" placeholderInitials="P" path="/placeholder" key={i} />,
  //   );
  // }

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
        <AppIcon text="Productivity" className="bg-orange-custom" placeholderInitials="P" path="/" />
        <AppIcon text="Notes" className="bg-yellow-custom" placeholderInitials="P" path="/" />
        <AppIcon text="Photos" className="bg-blue-custom" placeholderInitials="P" path="/" />
        <AppIcon text="Reader" className="bg-red-custom" placeholderInitials="P" path="/" />
        <AppIcon text="Resume" className="bg-green-custom" placeholderInitials="R" path="/resume" />
        <AppIcon text="Settings" className="bg-gray-custom text-white" placeholderInitials="S" path="/settings" />
        <AppIcon text="Transcribe" className="bg-purple-custom" placeholderInitials="T" path="/transcribe" />
        {/* {dummyIcons} */}
      </Grid>
      <Navbar>
        {/* <Button className="icon-menu" onClick={openNavMenu} /> */}
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
      </Navbar>
    </>
  );
}
