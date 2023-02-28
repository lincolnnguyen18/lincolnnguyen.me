import { uuid } from '../common/stringUtils.js';
import { userSqlDao } from './userSqlDao.js';

describe('userSqlDao', () => {
  it('putUser', async () => {
    const res = await userSqlDao.putUser({
      id: uuid(),
      username: 'lincoln',
      password: 'pass123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log('res', res);
  });
});
