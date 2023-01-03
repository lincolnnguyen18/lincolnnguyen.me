import { sharedDao } from './sharedDao.js';
import { getMockUserData } from './utils/sharedUtils.js';
import _ from 'lodash';

describe('sharedDao', function () {
  let users;
  beforeAll(async function () {
    users = await sharedDao.getAllUsers();
  });

  it('addUser', async function () {
    const user = getMockUserData();
    user.id = '11d2c394-fa99-451a-a246-9d4bbf90743f';
    user.familyName = 'Nguyen';
    const res = await sharedDao.addUser(user);
    console.log('res', res);
  });

  it('updateUser', async function () {
    // const id = _.sample(users).id;
    // console.log('id', id);
    const id = 'abc';
    const res = await sharedDao.updateUser(id, { givenName: 'Thanh' });
    console.log('res', res);
  });

  it('addUsers', async function () {
    for (let i = 0; i < 10; i++) {
      await sharedDao.addUser(getMockUserData());
    }
  });

  it('getIdFromEmail', async function () {
    const email = _.sample(users).email;
    // const email = 'Vivien25@hotmail.com';
    const id = await sharedDao.getIdFromEmail(email);
    console.log('id', id);
  });

  it('getUsers', async function () {
    console.log('users', users);
  });

  it('getUserById', async function () {
    // const id = _.sample(users).id;
    const id = '96039b07-475c-493e-830b-d329b3872115';
    const user = await sharedDao.getUserById(id);
    console.log('user', user);
  });

  it('deleteAllItemsInTable', async function () {
    await sharedDao.deleteAllItemsInTable();
  });
});
