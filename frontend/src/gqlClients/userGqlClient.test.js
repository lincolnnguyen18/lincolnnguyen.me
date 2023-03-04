import { userGqlClient } from './userGqlClient.js';

describe('userGqlClient', () => {
  it('getToken', async () => {
    const res = await userGqlClient.getToken({
      username: 'thanh',
      password: 'password',
    });
    console.log(res);
  });

  it('getUser', async () => {
    const res = await userGqlClient.getUser();
    console.log(res);
  });

  it('registerUser', async () => {
    const res = await userGqlClient.registerUser({
      username: 'username',
      password: 'password',
      confirmPassword: 'password',
    });
    console.log(res);
  });

  it('updateUser', async () => {
    const res = await userGqlClient.updateUser({
      playbackSpeed: 3,
    });
    console.log(res);
  });
});
