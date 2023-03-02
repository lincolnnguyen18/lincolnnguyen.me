import { userGqlClient } from './userGqlClient.js';

describe('userGqlClient', () => {
  it('getTokenFromUsernamePassword', async () => {
    const res = await userGqlClient.getTokenFromUsernamePassword({
      username: 'thanh',
      password: 'password',
    });
    console.log(res);
  });

  it('getUserFromToken', async () => {
    const res = await userGqlClient.getUserFromToken();
    console.log(res);
  });

  it('registerUser', async () => {
    const res = await userGqlClient.registerUser({
      username: 'thanh',
      password: 'password',
      confirmPassword: 'password',
    });
    console.log(res);
  });
});
