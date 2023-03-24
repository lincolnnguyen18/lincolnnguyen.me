import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'slices/userSlice';
import { wait } from 'utils/miscUtils';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// eslint-disable-next-line no-unused-vars
const fetchUser = createAsyncThunk<User | null , string> ('user/fetchUser', async (token: string, { dispatch }) => {
  // TODO: fetch user from server
  // const user = mockUser;
  const user = null;
  await wait(500);
  dispatch(userActions.updateSlice({ user }));
  return user;
});

type FetchTokenProps = {
  email: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchToken = createAsyncThunk('user/fetchToken', async (props: FetchTokenProps, { dispatch }) => {
  const token = 'mockToken';
  await wait(500);
  // TODO: save token to cookies
  // Cookies.set('token', token);
  await dispatch(fetchUser(token));
  return token;
});

export type { User };
export { fetchUser, fetchToken };
