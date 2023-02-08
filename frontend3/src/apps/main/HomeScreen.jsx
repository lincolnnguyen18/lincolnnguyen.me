import React from 'react';
import { AppIcon } from './AppIcon.jsx';
import { Button } from '../../components/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { commonActions, commonSelector } from '../../slices/commonSlice.js';
import { NavbarBlur } from '../../components/NavbarBlur.jsx';
import { Navbar } from '../../components/Navbar.jsx';
import { Grid } from './Grid.jsx';
import { wait } from '../../common/timeUtils.js';
import { TextField } from '../../components/TextField.jsx';
import { NavbarButton } from '../../components/NavbarButton.jsx';
import { GroupDivider } from '../../components/GroupDivider.jsx';
import { useNavigate } from 'react-router-dom';
import { TextLink } from '../../components/TextLink.jsx';

export function HomeScreen () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showLogin, loggedIn } = useSelector(commonSelector);

  const dummyIcons = [];
  for (let i = 0; i < 50; i++) {
    dummyIcons.push(
      <AppIcon text="Placeholder" twStyle="bg-gray-500 text-white" placeholderInitials="P" path="/placeholder" key={i} />,
    );
  }

  function openNavMenu () {
    dispatch(commonActions.openNavMenu());
  }

  function closeMenu () {
    dispatch(commonActions.closeNavMenu());
  }

  async function handleLogin () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    function onLogin (e) {
      e.preventDefault();
      navigate(showLogin);
      dispatch(commonActions.setSlice({ showLogin: null, loggedIn: true }));
      closeMenu();
    }

    dispatch(commonActions.openNavMenu({
      position: 'left',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <form className="flex flex-col w-full text-white items-center" onSubmit={onLogin}>
          <div className="flex flex-col w-full mt-3 gap-2 mb-6">
            <span className="font-semibold">Login</span>
            <div className="flex flex-col">
              <TextField placeholder="Username" autoFocus={true} type="username" name="title" dir="vert" />
              <GroupDivider dir="vert" />
              <TextField placeholder="Password" name="password" type="password" dir="vert" />
            </div>
            <div className="flex flex-col items-start">
              <span>No account?</span>
              <TextLink type="button" onClick={handleRegister}>Register</TextLink>
            </div>
          </div>
          <div className="flex">
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
            <GroupDivider dir="horiz" />
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit">Login</NavbarButton>
          </div>
        </form>
      ),
    }));
  }

  async function handleRegister () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    function onRegister (e) {
      e.preventDefault();
      dispatch(commonActions.setSlice({ showLogin: null, loggedIn: true }));
      closeMenu();
    }

    dispatch(commonActions.openNavMenu({
      position: 'left',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <form className="flex flex-col w-full text-white items-center" onSubmit={onRegister}>
          <div className="flex flex-col w-full mt-3 mb-6 gap-2">
            <span className="font-semibold">Register</span>
            <div className="flex flex-col">
              <TextField placeholder="Username" autoFocus={true} type="username" name="title" dir="vert" />
              <GroupDivider dir="vert" />
              <TextField placeholder="Password" type="password" name="password" dir="vert" />
              <GroupDivider dir="vert" />
              <TextField placeholder="Confirm password" name="password2" type="password" dir="vert" />
            </div>
          </div>
          <div className="flex">
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
            <GroupDivider dir="horiz" />
            <NavbarButton onClick={closeMenu} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit">Register</NavbarButton>
          </div>
        </form>
      ),
    }));
  }

  React.useEffect(() => {
    if (showLogin && !loggedIn) {
      setTimeout(() => {
        handleLogin();
      }, 10);
    }
  }, [showLogin]);

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
        <AppIcon text="Messages" twStyle="bg-red-custom" placeholderInitials="M" path="/messages/contacts" />
        <AppIcon text="Transcribe" twStyle="bg-purple-custom" placeholderInitials="T" path="/transcribe/transcripts" />
        <AppIcon text="Resume" twStyle="bg-green-custom" placeholderInitials="R" path="/resume" />
        {dummyIcons}
      </Grid>
      <Navbar>
        <Button twStyle="icon-menu" onClick={openNavMenu} />
        <span className="font-semibold absolute left-1/2 transform -translate-x-1/2">Apps</span>
      </Navbar>
    </>
  );
}
