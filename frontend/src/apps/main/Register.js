import React from 'react';
import { commonSelector, openLogin, registerUser } from '../../slices/commonSlice';
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

export function Register () {
  const dispatch = useDispatch();
  const { pending } = useSelector(commonSelector);

  function onLogin () {
    dispatch(openLogin());
  }

  function onRegister (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password, confirmPassword } = Object.fromEntries(formData);
    dispatch(registerUser({ username, password, confirmPassword }));
  }

  const loading = pending['registerUser'];

  return (
    <FormScreen onSubmit={onRegister} isForm={true} twStyle="max-w-none">
      <Group title="Register">
        <div className="flex flex-col">
          <TextField placeholder="Username" autoFocus={true} type="username" dir="vert" name="username" />
          <GroupDivider dir="vert" />
          <TextField placeholder="Password" type="password" name="password" dir="vert" />
          <GroupDivider dir="vert" />
          <TextField placeholder="Confirm password" name="confirmPassword" type="password" dir="vert" />
        </div>
        <div className="flex flex-col items-start mt-2">
          <span>Already have an account?</span>
          <TextLink type="button" onClick={onLogin}>Login</TextLink>
        </div>
      </Group>
      <Errors />
      <FormScreenBottom>
        <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" disabled={loading}>Cancel</NavbarButton>
        <GroupDivider dir="horiz" />
        <NavbarButton twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit" disabled={loading}>Register</NavbarButton>
      </FormScreenBottom>
    </FormScreen>
  );
}