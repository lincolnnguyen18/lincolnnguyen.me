import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonActions } from 'slices/commonSlice';
import { wait } from 'utils/miscUtils';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// eslint-disable-next-line no-unused-vars
const fetchUser = createAsyncThunk<User | null , string> ('common/fetchUser', async (token: string, { dispatch }) => {
  // TODO: fetch user from server
  // const user = testUser;
  const user = null;
  await wait(2000);
  dispatch(commonActions.updateSlice({ user }));
  return user;
});

export type { User };
export { fetchUser };
