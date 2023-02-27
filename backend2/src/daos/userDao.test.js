import { userDao } from './userDao.js';

describe('userDao', () => {
  it('putUser', async () => {
    const res = await userDao.putUser({
      username: 'lincoln',
      password: 'pass123',
    });
    console.log('res', res);
  });
});
