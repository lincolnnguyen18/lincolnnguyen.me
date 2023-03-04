import React from 'react';
import { commonSelector, getToken, openRegister } from '../../slices/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '../../components/TextField';
import { GroupDivider } from '../../components/GroupDivider';
import { TextLink } from '../../components/TextLink';
import { NavbarButton } from '../../components/NavbarButton';
import { closeMenu } from '../../common/MenuUtils';
import { FormScreenBottom } from '../../components/FormScreenBottom';
import { FormScreen } from '../../components/FormScreen';
import { Group } from '../../components/Group';
import { Errors } from '../../components/Errors';

export function Login () {
  const dispatch = useDispatch();
  const { pending } = useSelector(commonSelector);

  function onLogin (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);
    dispatch(getToken({ username, password }));
  }

  function onRegister () {
    dispatch(openRegister());
  }

  const loading = pending['getUser'] || pending['getToken'];

  return (
    <FormScreen onSubmit={onLogin} isForm={true} twStyle="max-w-none">
      <Group title="Login">
        <div className="flex flex-col">
          <TextField placeholder="Username" autoFocus={true} type="username" name="username" dir="vert" />
          <GroupDivider dir="vert" />
          <TextField placeholder="Password" name="password" type="password" dir="vert" />
        </div>
        <div className="flex flex-col items-start mt-2">
          <span>No account?</span>
          <TextLink type="button" onClick={onRegister}>Register</TextLink>
        </div>
      </Group>
      <Errors />
      <FormScreenBottom>
        <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" disabled={loading}>Cancel</NavbarButton>
        <GroupDivider dir="horiz" />
        <NavbarButton twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit" disabled={loading}>Login</NavbarButton>
      </FormScreenBottom>
    </FormScreen>
  );
}
