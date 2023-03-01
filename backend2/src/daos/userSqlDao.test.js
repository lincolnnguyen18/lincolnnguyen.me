import { uuid } from '../common/stringUtils.js';
import { userSqlDao } from './userSqlDao.js';

describe('userSqlDao', () => {
  it('putUser', async () => {
    const timestamp = new Date().toISOString();
    const res = await userSqlDao.putUser({
      id: uuid(),
      username: 'username',
      password: 'password',
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    console.log('res', res);
  });
});
