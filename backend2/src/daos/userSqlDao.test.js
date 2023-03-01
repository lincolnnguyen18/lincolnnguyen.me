import { uuid } from '../common/stringUtils.js';
import { userSqlDao } from './userSqlDao.js';

describe('userSqlDao', () => {
  it('putUser', async () => {
    const res = await userSqlDao.putUser({
      id: uuid(),
      username: 'username',
      password: 'password',
    });
    console.log('res', res);
  });
});
