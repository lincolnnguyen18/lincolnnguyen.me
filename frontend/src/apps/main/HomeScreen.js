import React from 'react';
import { AppIcon } from './AppIcon';
import { Button } from '../../components/Button';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../slices/commonSlice.js';
import { NavbarBlur } from '../../components/NavbarBlur';
import { Navbar } from '../../components/Navbar';
import { Grid } from './Grid';

export function HomeScreen () {
  const dispatch = useDispatch();

  const dummyIcons = [];
  for (let i = 0; i < 50; i++) {
    dummyIcons.push(
      <AppIcon text="Placeholder" className="bg-gray-500 text-white" placeholderInitials="P" path="/placeholder" key={i} />,
    );
  }

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
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
        <AppIcon text="Messages" className="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Resume" className="bg-green-custom" placeholderInitials="R" path="/resume" />
        <AppIcon text="Transcribe" className="bg-purple-custom" placeholderInitials="T" path="/transcribe/transcripts" />
        {dummyIcons}
      </Grid>
      <Navbar>
        <Button className="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
      </Navbar>
    </>
  );
}
