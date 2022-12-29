import _ from 'lodash';
import { faker } from '@faker-js/faker';
import { speechchatDao } from './speechchatDao.js';
import { sharedDao } from '../shared/sharedDao.js';

describe('speechchatDao', function () {
  let users;
  beforeAll(async function () {
    users = await sharedDao.getAllUsers();
  });

  it('addConnection', async function () {
    // console.log('users', users);

    for (let i = 0; i < users.length * 2; i++) {
      const initiatorUserId = _.sample(users).id;
      const receiverUserId = _.sample(users).id;
      const timestamp = faker.date.recent().getTime().toString();
      try {
        await speechchatDao.addConnection({
          initiatorUserId,
          receiverUserId,
          timestamp,
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  it('addMessage', async function () {
    const senderUserId = _.sample(users).id;
    const receiverUserId = _.sample(users).id;
    const createdAt = faker.date.recent().getTime().toString();
    const text = faker.lorem.sentence();
    try {
      await speechchatDao.addMessage({
        senderUserId,
        receiverUserId,
        type: 'text',
        text,
        createdAt,
      });
    } catch (e) {
      console.error(e);
    }
  });

  it('getContacts', async function () {
    const userId = _.sample(users).id;
    console.log('userId', userId);
    const contacts = await speechchatDao.getContacts(userId);
    console.log('contacts', contacts);
  });
});
