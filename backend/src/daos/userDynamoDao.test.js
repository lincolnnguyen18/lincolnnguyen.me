import { userDynamoDao } from './userDynamoDao.js';
import { uuid } from '../common/stringUtils.js';

describe('userDao', () => {
  it('putUser', async () => {
    const res = await userDynamoDao.putUser({
      id: uuid(),
      username: 'lincoln',
      password: 'password',
    });
    console.log('res', res);
  });

  it('updateUser', async () => {
    const res = await userDynamoDao.updateUser({
      id: '531c6978-c687-4992-a5f6-d77f2d314c84',
      username: 'changed',
    });
    console.log('res', res);
  });

  it('getIdFromUsername', async () => {
    const res = await userDynamoDao.getIdFromUsername('username');
    console.log('res', res);
  });

  it('getUserFromId', async () => {
    const res = await userDynamoDao.getUserFromId('3e16827b-e626-4334-9026-8dc544445114');
    console.log('res', res);
  });

  it('deleteUserById', async () => {
    const res = await userDynamoDao.deleteUserById('b0323876-a712-45a5-8897-6900663173b9');
    console.log('res', res);
  });
});
