import { userDynamoDao } from './userDynamoDao.js';
import { uuid } from '../common/stringUtils.js';

describe('userDao', () => {
  it('putUser', async () => {
    const res = await userDynamoDao.putUser({
      id: uuid(),
      username: 'username',
      password: 'password',
    });
    console.log('res', res);
  });
});
