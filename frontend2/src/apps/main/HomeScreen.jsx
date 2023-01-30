import React from 'react';
import { AppIcon } from './AppIcon.jsx';
import { colors } from '../../../theme.js';
import { Button } from '../../components/Button.jsx';
import { useDispatch } from 'react-redux';
import { commonActions } from '../../slices/commonSlice.js';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { Grid } from './Grid.jsx';

export function HomeScreen () {
  const dispatch = useDispatch();

  const dummyIcons = [];
  for (let i = 0; i < 50; i++) {
    dummyIcons.push(
      <AppIcon text="Placeholder" className="bg-gray-600 text-white" placeholderInitials="P" path="/placeholder" key={i} />,
    );
  }

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  return (
    <>
      <NavbarBlur />
      <Grid>
        <AppIcon text="Messages" bgColor={colors.red.custom} placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Transcribe" bgColor={colors.purple.custom} placeholderInitials="T" path="/transcribe/transcriptions" />
        <AppIcon text="Resume" bgColor={colors.green.custom} placeholderInitials="R" path="/resume" />
        {dummyIcons}
      </Grid>
      <Navbar>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
      </Navbar>
    </>
  );
}
